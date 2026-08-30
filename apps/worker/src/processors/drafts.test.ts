/**
 * Integração do processador de drafts (Módulo C) contra Postgres real, com
 * drafter/guardrails stubados (sem chamadas de rede): mensagem aprovada vai à
 * fila de aprovação; reprovada nunca chega lá; limite de tokens barra o gasto.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { CONFIG_REGUA_PADRAO } from "@radar/core";
import { PrismaClient, carregarEnvRaiz, gerarDek } from "@radar/db";
import { processarDraftStep } from "./drafts.js";
import type { FabricaIa } from "./drafts.js";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);

describe.skipIf(!temBanco)("processarDraftStep (integração)", () => {
  const sistema = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const app = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL_APP });
  let tenantId = "";
  let stepAprovadaId = "";
  let stepReprovadaId = "";
  let stepLimiteId = "";

  const mensagemFake = {
    assunto: "Sua proteção está em aberto",
    corpo: "Olá! Aqui é a Corretora Drafts sobre a parcela em aberto...",
    justificativa: "Primeiro atraso, tom leve.",
  };

  function fabricaStub(veredito: "APROVADA" | "REPROVADA"): {
    fabrica: FabricaIa;
    redigir: ReturnType<typeof vi.fn>;
  } {
    const redigir = vi.fn().mockResolvedValue({
      mensagem: mensagemFake,
      promptVersao: "cobranca-drafter@1.0.0",
      modelo: "claude-teste",
    });
    const fabrica: FabricaIa = () => ({
      redator: { redigir },
      guardrails: {
        verificar: vi.fn().mockResolvedValue({
          veredito,
          origem: veredito === "APROVADA" ? "JUIZ" : "REGRAS",
          violacoes:
            veredito === "REPROVADA" ? [{ regra: "ameaca_negativacao", detalhe: "Serasa" }] : [],
        }),
      },
    });
    return { fabrica, redigir };
  }

  beforeAll(async () => {
    const insurer = await sistema.insurer.findFirstOrThrow({ where: { slug: "porto-seguro" } });
    const tenant = await sistema.tenant.create({
      data: {
        nome: "Corretora Drafts",
        configRegua: CONFIG_REGUA_PADRAO,
        dekEnc: new Uint8Array(gerarDek()),
      },
    });
    tenantId = tenant.id;

    async function criarFlowComStep(numero: string): Promise<string> {
      const policy = await sistema.policy.create({
        data: {
          tenantId,
          insurerId: insurer.id,
          numero,
          ramo: "AUTO",
          seguradoNome: "Segurado Draft",
          seguradoDocEnc: new Uint8Array(Buffer.from("x")),
          seguradoDocHash: `hash-draft-${numero}`,
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
            create: [{ tenantId, ordem: 1, canal: "EMAIL", agendadaPara: new Date("2026-08-23") }],
          },
        },
        include: { steps: true },
      });
      return flow.steps[0]!.id;
    }

    stepAprovadaId = await criarFlowComStep("DR-1");
    stepReprovadaId = await criarFlowComStep("DR-2");
    stepLimiteId = await criarFlowComStep("DR-3");
  });

  afterAll(async () => {
    await sistema.auditLog.deleteMany({ where: { tenantId } });
    await sistema.agentMessage.deleteMany({ where: { tenantId } });
    await sistema.agentConversation.deleteMany({ where: { tenantId } });
    await sistema.aiUsage.deleteMany({ where: { tenantId } });
    await sistema.recoveryStep.deleteMany({ where: { tenantId } });
    await sistema.recoveryFlow.deleteMany({ where: { tenantId } });
    await sistema.installment.deleteMany({ where: { tenantId } });
    await sistema.policy.deleteMany({ where: { tenantId } });
    await sistema.tenant.deleteMany({ where: { id: tenantId } });
    await Promise.all([sistema.$disconnect(), app.$disconnect()]);
  });

  it("mensagem aprovada entra na fila de aprovação com justificativa e versão do prompt", async () => {
    const { fabrica } = fabricaStub("APROVADA");
    await processarDraftStep({ stepId: stepAprovadaId, tenantId }, app, fabrica);

    const step = await sistema.recoveryStep.findUniqueOrThrow({ where: { id: stepAprovadaId } });
    expect(step.status).toBe("AGUARDANDO_APROVACAO");

    const mensagem = await sistema.agentMessage.findFirstOrThrow({
      where: { stepId: stepAprovadaId },
    });
    expect(mensagem.statusAprovacao).toBe("AGUARDANDO_APROVACAO");
    expect(mensagem.guardrailVeredito).toBe("APROVADA");
    expect(mensagem.justificativa).toContain("Primeiro atraso");
    expect(mensagem.promptVersao).toBe("cobranca-drafter@1.0.0");
    expect(mensagem.corpoGerado).toContain("Corretora Drafts");
  });

  it("reprocessar a mesma etapa é no-op (idempotente)", async () => {
    const { fabrica, redigir } = fabricaStub("APROVADA");
    await processarDraftStep({ stepId: stepAprovadaId, tenantId }, app, fabrica);
    expect(redigir).not.toHaveBeenCalled();
    expect(await sistema.agentMessage.count({ where: { stepId: stepAprovadaId } })).toBe(1);
  });

  it("mensagem reprovada nos guardrails NUNCA chega à fila de aprovação", async () => {
    const { fabrica } = fabricaStub("REPROVADA");
    await processarDraftStep({ stepId: stepReprovadaId, tenantId }, app, fabrica);

    const step = await sistema.recoveryStep.findUniqueOrThrow({ where: { id: stepReprovadaId } });
    expect(step.status).toBe("FALHOU");

    const mensagem = await sistema.agentMessage.findFirstOrThrow({
      where: { stepId: stepReprovadaId },
    });
    expect(mensagem.statusAprovacao).toBe("DESCARTADA");
    expect(mensagem.guardrailVeredito).toBe("REPROVADA");

    const aguardando = await sistema.agentMessage.count({
      where: { tenantId, stepId: stepReprovadaId, statusAprovacao: "AGUARDANDO_APROVACAO" },
    });
    expect(aguardando).toBe(0);
  });

  it("limite mensal de tokens barra a redação e audita", async () => {
    await sistema.tenant.update({
      where: { id: tenantId },
      data: { limiteMensalTokensIa: 100 },
    });
    await sistema.aiUsage.create({
      data: {
        tenantId,
        modulo: "COBRANCA",
        modelo: "claude-teste",
        tokensInput: 90,
        tokensOutput: 20,
      },
    });

    const { fabrica, redigir } = fabricaStub("APROVADA");
    await processarDraftStep({ stepId: stepLimiteId, tenantId }, app, fabrica);

    expect(redigir).not.toHaveBeenCalled();
    const step = await sistema.recoveryStep.findUniqueOrThrow({ where: { id: stepLimiteId } });
    expect(step.status).toBe("AGENDADA"); // tenta de novo no próximo ciclo

    const audit = await sistema.auditLog.findFirst({
      where: { tenantId, acao: "limite_ia_atingido" },
    });
    expect(audit).not.toBeNull();
  });

  it("segurado com opt-out posterior cancela a etapa sem redigir", async () => {
    await sistema.tenant.update({
      where: { id: tenantId },
      data: { limiteMensalTokensIa: null },
    });
    await sistema.policy.updateMany({
      where: { tenantId, numero: "DR-3" },
      data: { seguradoOptOut: true },
    });

    const { fabrica, redigir } = fabricaStub("APROVADA");
    await processarDraftStep({ stepId: stepLimiteId, tenantId }, app, fabrica);

    expect(redigir).not.toHaveBeenCalled();
    const step = await sistema.recoveryStep.findUniqueOrThrow({ where: { id: stepLimiteId } });
    expect(step.status).toBe("CANCELADA");
  });
});
