/**
 * E2E da fila de aprovação (Módulo C, human-in-the-loop): listar, aprovar com
 * edição (calibração), descartar — e o envio só via fila após aprovação.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { PrismaClient, carregarEnvRaiz } from "@radar/db";
import { AppModule } from "../app.module";
import { FilaService } from "../fila/fila.service";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);
const sufixo = `cob-${Date.now().toString(36)}`;

class FilaFake {
  jobs: { fila: string; dados: object }[] = [];
  async enfileirar(fila: string, dados: object): Promise<void> {
    this.jobs.push({ fila, dados });
  }
  async onApplicationShutdown(): Promise<void> {}
}

describe.skipIf(!temBanco)("cobranças (e2e)", () => {
  let app: INestApplication;
  let http: ReturnType<INestApplication["getHttpServer"]>;
  const filaFake = new FilaFake();
  const limpeza = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  let tenantId = "";
  let token = "";
  let mensagemAprovarId = "";
  let mensagemDescartarId = "";

  async function semearMensagem(numero: string): Promise<string> {
    const insurer = await limpeza.insurer.findFirstOrThrow({ where: { slug: "porto-seguro" } });
    const policy = await limpeza.policy.create({
      data: {
        tenantId,
        insurerId: insurer.id,
        numero,
        ramo: "AUTO",
        seguradoNome: "Segurado Cob",
        seguradoDocEnc: new Uint8Array(Buffer.from("x")),
        seguradoDocHash: `hash-cob-${numero}`,
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
    const flow = await limpeza.recoveryFlow.create({
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
              status: "AGUARDANDO_APROVACAO",
            },
          ],
        },
      },
      include: { steps: true },
    });
    const conversation = await limpeza.agentConversation.create({
      data: { tenantId, flowId: flow.id, policyId: policy.id, canal: "EMAIL" },
    });
    const mensagem = await limpeza.agentMessage.create({
      data: {
        tenantId,
        conversationId: conversation.id,
        stepId: flow.steps[0]!.id,
        papel: "AGENTE",
        assunto: "Sua parcela em aberto",
        corpoGerado: "Corpo redigido pela IA...",
        justificativa: "Primeiro atraso, tom leve.",
        statusAprovacao: "AGUARDANDO_APROVACAO",
        guardrailVeredito: "APROVADA",
        promptVersao: "cobranca-drafter@1.0.0",
      },
    });
    return mensagem.id;
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(FilaService)
      .useValue(filaFake)
      .compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
    http = app.getHttpServer();

    const reg = await request(http)
      .post("/api/auth/registrar")
      .send({
        nomeCorretora: "Corretora Cobranças",
        nome: "Ana",
        email: `${sufixo}@teste.dev`,
        senha: "senha-forte-123",
      });
    token = reg.body.accessToken;
    tenantId = reg.body.usuario.tenantId;

    mensagemAprovarId = await semearMensagem("CB-1");
    mensagemDescartarId = await semearMensagem("CB-2");
  });

  afterAll(async () => {
    await limpeza.auditLog.deleteMany({ where: { tenantId } });
    await limpeza.agentMessage.deleteMany({ where: { tenantId } });
    await limpeza.agentConversation.deleteMany({ where: { tenantId } });
    await limpeza.recoveryStep.deleteMany({ where: { tenantId } });
    await limpeza.recoveryFlow.deleteMany({ where: { tenantId } });
    await limpeza.installment.deleteMany({ where: { tenantId } });
    await limpeza.policy.deleteMany({ where: { tenantId } });
    await limpeza.user.deleteMany({ where: { tenantId } });
    await limpeza.tenant.deleteMany({ where: { id: tenantId } });
    await limpeza.$disconnect();
    await app.close();
  });

  it("lista a fila de aprovação com mensagem, justificativa e contexto da parcela", async () => {
    const res = await request(http)
      .get("/api/cobrancas/aprovacoes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    const item = res.body[0];
    expect(item.corpoGerado).toContain("IA");
    expect(item.justificativa).toContain("Primeiro atraso");
    expect(item.conversation.policy.seguradoNome).toBe("Segurado Cob");
    expect(item.conversation.flow.installment.diasAtraso).toBe(10);
  });

  it("aprovar com edição grava corpoFinal, marca calibração e enfileira o envio", async () => {
    const res = await request(http)
      .post(`/api/cobrancas/mensagens/${mensagemAprovarId}/aprovar`)
      .set("Authorization", `Bearer ${token}`)
      .send({ corpo: "Corpo ajustado pelo corretor." });
    expect(res.status).toBe(201);
    expect(res.body.statusAprovacao).toBe("EDITADA_E_APROVADA");
    expect(res.body.corpoFinal).toBe("Corpo ajustado pelo corretor.");
    expect(res.body.editadaPeloCorretor).toBe(true);

    const job = filaFake.jobs.find((j) => j.fila === "notificacoes");
    expect(job?.dados).toMatchObject({ messageId: mensagemAprovarId, tenantId });

    const step = await limpeza.recoveryStep.findFirstOrThrow({
      where: { tenantId, messages: { some: { id: mensagemAprovarId } } },
    });
    expect(step.status).toBe("APROVADA");

    const trilha = await limpeza.auditLog.findFirst({
      where: { tenantId, acao: "mensagem_aprovada", entidadeId: mensagemAprovarId },
    });
    expect(trilha).not.toBeNull();
  });

  it("não aprova duas vezes", async () => {
    const res = await request(http)
      .post(`/api/cobrancas/mensagens/${mensagemAprovarId}/aprovar`)
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });

  it("descartar remove da fila e cancela a etapa", async () => {
    const res = await request(http)
      .post(`/api/cobrancas/mensagens/${mensagemDescartarId}/descartar`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(201);

    const restante = await request(http)
      .get("/api/cobrancas/aprovacoes")
      .set("Authorization", `Bearer ${token}`);
    expect(restante.body).toHaveLength(0);

    const step = await limpeza.recoveryStep.findFirstOrThrow({
      where: { tenantId, messages: { some: { id: mensagemDescartarId } } },
    });
    expect(step.status).toBe("CANCELADA");
  });

  it("histórico mostra aprovadas e descartadas com quem decidiu", async () => {
    const res = await request(http)
      .get("/api/cobrancas/historico")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(
      res.body.some((m: { aprovadaPor: { nome: string } | null }) => m.aprovadaPor?.nome === "Ana"),
    ).toBe(true);
  });
});
