/**
 * Integração do envio (Módulo C): decifra o e-mail com a DEK do tenant,
 * envia via provider, marca ENVIADA e audita SEM PII em claro; opt-out
 * bloqueia; limite de frequência adia; sem e-mail → FALHOU.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { CONFIG_REGUA_PADRAO } from "@radar/core";
import { LocalKeyProvider, PrismaClient, carregarEnvRaiz, cifrarCampo, gerarDek } from "@radar/db";
import { processarEnvioMensagem } from "./envio.js";
import type { DepsEnvio } from "./envio.js";

carregarEnvRaiz();

const temBanco = Boolean(
  process.env.DATABASE_URL && process.env.DATABASE_URL_APP && process.env.MASTER_KEY,
);

describe.skipIf(!temBanco)("processarEnvioMensagem (integração)", () => {
  const sistema = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const app = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL_APP });
  let tenantId = "";
  const dek = gerarDek();

  const enviados: { para: string; assunto: string; corpo: string; nomeRemetente: string }[] = [];
  const deps: DepsEnvio = {
    email: {
      enviar: async (m) => {
        enviados.push(m);
      },
    },
    whatsapp: { enviar: vi.fn() },
    reagendar: vi.fn().mockResolvedValue(undefined),
  };

  async function criarMensagemAprovada(opts: {
    numero: string;
    comEmail?: boolean;
    optOut?: boolean;
    corpoFinal?: string;
  }): Promise<string> {
    const insurer = await sistema.insurer.findFirstOrThrow({ where: { slug: "porto-seguro" } });
    const policy = await sistema.policy.create({
      data: {
        tenantId,
        insurerId: insurer.id,
        numero: opts.numero,
        ramo: "AUTO",
        seguradoNome: "Segurado Envio",
        seguradoDocEnc: new Uint8Array(cifrarCampo(dek, "11144477735")),
        seguradoDocHash: `hash-envio-${opts.numero}`,
        seguradoEmailEnc:
          opts.comEmail === false ? null : new Uint8Array(cifrarCampo(dek, "segurado@exemplo.com")),
        seguradoOptOut: opts.optOut ?? false,
        inicioVigencia: new Date("2026-01-01"),
        fimVigencia: new Date("2027-01-01"),
        premioTotal: "1200.00",
        percentComissaoEsperado: "20.00",
        installments: {
          create: [
            {
              tenantId,
              numero: 1,
              valor: "100.00",
              vencimento: new Date("2026-08-20"),
              status: "ATRASADA",
              diasAtraso: 10,
            },
          ],
        },
      },
      include: { installments: true },
    });
    const flow = await sistema.recoveryFlow.create({
      data: {
        tenantId,
        installmentId: policy.installments[0]!.id,
        valorComissaoEmRisco: "20.00",
        steps: {
          create: [
            {
              tenantId,
              ordem: 1,
              canal: "EMAIL",
              agendadaPara: new Date("2026-08-23"),
              status: "APROVADA",
            },
          ],
        },
      },
      include: { steps: true },
    });
    const conversation = await sistema.agentConversation.create({
      data: { tenantId, flowId: flow.id, policyId: policy.id, canal: "EMAIL" },
    });
    const mensagem = await sistema.agentMessage.create({
      data: {
        tenantId,
        conversationId: conversation.id,
        stepId: flow.steps[0]!.id,
        papel: "AGENTE",
        assunto: "Sua parcela em aberto",
        corpoGerado: "Corpo gerado pela IA...",
        corpoFinal: opts.corpoFinal ?? null,
        statusAprovacao: "APROVADA",
        guardrailVeredito: "APROVADA",
        promptVersao: "cobranca-drafter@1.0.0",
      },
    });
    return mensagem.id;
  }

  beforeAll(async () => {
    const kp = new LocalKeyProvider(process.env.MASTER_KEY!);
    const tenant = await sistema.tenant.create({
      data: {
        nome: "Corretora Envio",
        configRegua: CONFIG_REGUA_PADRAO,
        dekEnc: new Uint8Array(kp.embrulharDek(dek)),
        maxContatosPorSeguradoPorSemana: 2,
      },
    });
    tenantId = tenant.id;
  });

  afterAll(async () => {
    await sistema.auditLog.deleteMany({ where: { tenantId } });
    await sistema.agentMessage.deleteMany({ where: { tenantId } });
    await sistema.agentConversation.deleteMany({ where: { tenantId } });
    await sistema.recoveryStep.deleteMany({ where: { tenantId } });
    await sistema.recoveryFlow.deleteMany({ where: { tenantId } });
    await sistema.installment.deleteMany({ where: { tenantId } });
    await sistema.policy.deleteMany({ where: { tenantId } });
    await sistema.tenant.deleteMany({ where: { id: tenantId } });
    await Promise.all([sistema.$disconnect(), app.$disconnect()]);
  });

  it("envia com o corpo editado pelo corretor, assina como a corretora e audita sem PII", async () => {
    const id = await criarMensagemAprovada({ numero: "EV-1", corpoFinal: "Corpo EDITADO final" });
    await processarEnvioMensagem({ messageId: id, tenantId }, app, deps);

    expect(enviados).toHaveLength(1);
    expect(enviados[0]!.para).toBe("segurado@exemplo.com");
    expect(enviados[0]!.corpo).toBe("Corpo EDITADO final");
    expect(enviados[0]!.nomeRemetente).toBe("Corretora Envio");

    const mensagem = await sistema.agentMessage.findUniqueOrThrow({ where: { id } });
    expect(mensagem.statusAprovacao).toBe("ENVIADA");
    expect(mensagem.enviadaEm).not.toBeNull();

    const step = await sistema.recoveryStep.findFirstOrThrow({
      where: { tenantId, messages: { some: { id } } },
    });
    expect(step.status).toBe("ENVIADA");

    const audit = await sistema.auditLog.findFirstOrThrow({
      where: { tenantId, acao: "mensagem_ia_enviada", entidadeId: id },
    });
    const detalhes = audit.detalhes as { destinatarioMascarado: string };
    expect(detalhes.destinatarioMascarado).toBe("s***@exemplo.com");
    expect(JSON.stringify(audit.detalhes)).not.toContain("segurado@exemplo.com");
  });

  it("reenvio é no-op (idempotente)", async () => {
    const antes = enviados.length;
    const mensagem = await sistema.agentMessage.findFirstOrThrow({
      where: { tenantId, statusAprovacao: "ENVIADA" },
    });
    await processarEnvioMensagem({ messageId: mensagem.id, tenantId }, app, deps);
    expect(enviados.length).toBe(antes);
  });

  it("opt-out bloqueia o envio até o último instante", async () => {
    const id = await criarMensagemAprovada({ numero: "EV-2", optOut: true });
    await processarEnvioMensagem({ messageId: id, tenantId }, app, deps);

    const mensagem = await sistema.agentMessage.findUniqueOrThrow({ where: { id } });
    expect(mensagem.statusAprovacao).toBe("DESCARTADA");
    const audit = await sistema.auditLog.findFirst({
      where: { tenantId, acao: "envio_bloqueado_opt_out", entidadeId: id },
    });
    expect(audit).not.toBeNull();
  });

  it("segurado sem e-mail cadastrado marca a etapa como FALHOU", async () => {
    const id = await criarMensagemAprovada({ numero: "EV-3", comEmail: false });
    await processarEnvioMensagem({ messageId: id, tenantId }, app, deps);
    const audit = await sistema.auditLog.findFirst({
      where: { tenantId, acao: "envio_falhou", entidadeId: id },
    });
    expect(audit).not.toBeNull();
  });

  it("limite de frequência semanal adia o envio (reagenda)", async () => {
    // já existe 1 ENVIADA para hash-envio-EV-1; o limite considera por segurado (hash).
    // criamos 2 mensagens para o MESMO segurado (mesmo docHash) para estourar o limite de 2.
    const insurer = await sistema.insurer.findFirstOrThrow({ where: { slug: "porto-seguro" } });
    const policy = await sistema.policy.findFirstOrThrow({
      where: { tenantId, numero: "EV-1" },
      include: { installments: true },
    });
    // marca mais uma ENVIADA recente para o mesmo segurado
    const conv = await sistema.agentConversation.findFirstOrThrow({
      where: { tenantId, policyId: policy.id },
    });
    await sistema.agentMessage.create({
      data: {
        tenantId,
        conversationId: conv.id,
        papel: "AGENTE",
        corpoGerado: "x",
        statusAprovacao: "ENVIADA",
        enviadaEm: new Date(),
      },
    });
    // nova mensagem aprovada para o mesmo segurado — o docHash precisa coincidir
    const flow2 = await sistema.recoveryFlow.findFirstOrThrow({
      where: { tenantId, installment: { policyId: policy.id } },
    });
    const mensagem = await sistema.agentMessage.create({
      data: {
        tenantId,
        conversationId: conv.id,
        papel: "AGENTE",
        assunto: "Nova tentativa",
        corpoGerado: "Corpo",
        statusAprovacao: "APROVADA",
      },
    });
    expect(insurer).toBeTruthy();
    expect(flow2).toBeTruthy();

    const antes = enviados.length;
    await processarEnvioMensagem({ messageId: mensagem.id, tenantId }, app, deps);

    expect(enviados.length).toBe(antes); // não enviou
    expect(deps.reagendar).toHaveBeenCalledOnce();
    const atual = await sistema.agentMessage.findUniqueOrThrow({ where: { id: mensagem.id } });
    expect(atual.statusAprovacao).toBe("APROVADA"); // segue aprovada, só adiada
  });
});
