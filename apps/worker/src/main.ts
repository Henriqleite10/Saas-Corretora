import { Queue, Worker } from "bullmq";
import { carregarEnvRaiz, criarClienteApp, criarClienteSistema } from "@radar/db";
import { registroPadrao } from "@radar/parsers";
import {
  JuizConformidade,
  PipelineGuardrails,
  RedatorCobranca,
  criarClienteAnthropic,
} from "@radar/ai";
import { FILA_IA, FILA_NOTIFICACOES, FILA_PARSING, FILA_REGUA, conexaoRedis } from "./filas.js";
import type { JobParsing } from "./filas.js";
import { processarExtrato } from "./processors/parsing.js";
import { processarReguaTenant, processarReguaTodosTenants } from "./processors/regua.js";
import { criarMedidorUso, processarDraftStep } from "./processors/drafts.js";
import type { JobDraft } from "./processors/drafts.js";
import { processarEnvioMensagem } from "./processors/envio.js";
import type { JobEnvio } from "./processors/envio.js";
import { WhatsAppStubProvider, provedorEmailDoAmbiente } from "./notificacoes/provedores.js";

carregarEnvRaiz();

const app = criarClienteApp();
const sistema = criarClienteSistema();
const registro = registroPadrao();

const parsing = new Worker<JobParsing>(
  FILA_PARSING,
  async (job) => {
    console.log(`[parsing] processando extrato ${job.data.statementId}`);
    await processarExtrato(job.data, app, registro);
  },
  { connection: conexaoRedis(), concurrency: 2 },
);

parsing.on("failed", (job, erro) => {
  console.error(`[parsing] job ${job?.id} falhou:`, erro.message);
});

const filaIa = new Queue(FILA_IA, { connection: conexaoRedis() });
const enfileirarDraft = async (stepId: string, tenantId: string): Promise<void> => {
  await filaIa.add("draft", { stepId, tenantId } satisfies JobDraft, {
    jobId: `draft-${stepId}`,
    attempts: 3,
    backoff: { type: "exponential", delay: 10000 },
  });
};

const regua = new Worker<{ tenantId?: string }>(
  FILA_REGUA,
  async (job) => {
    if (job.data.tenantId) {
      console.log(`[regua] processando tenant ${job.data.tenantId}`);
      await processarReguaTenant(job.data.tenantId, app, new Date(), enfileirarDraft);
    } else {
      console.log("[regua] varredura diária de todos os tenants");
      await processarReguaTodosTenants(sistema, app, new Date(), enfileirarDraft);
    }
  },
  { connection: conexaoRedis(), concurrency: 1 },
);

// Fábrica de IA por tenant: drafter + guardrails com medidor de custo (AiUsage).
const fabricaIa = (tenantId: string) => {
  const cliente = criarClienteAnthropic();
  const medidor = criarMedidorUso(app, tenantId);
  return {
    redator: new RedatorCobranca(cliente, { medidor }),
    guardrails: new PipelineGuardrails(new JuizConformidade(cliente, { medidor })),
  };
};

const ia = new Worker<JobDraft>(
  FILA_IA,
  async (job) => {
    console.log(`[ia] redigindo mensagem da etapa ${job.data.stepId}`);
    await processarDraftStep(job.data, app, fabricaIa);
  },
  { connection: conexaoRedis(), concurrency: 2 },
);

ia.on("failed", (job, erro) => {
  console.error(`[ia] job ${job?.id} falhou:`, erro.message);
});

const filaNotificacoes = new Queue(FILA_NOTIFICACOES, { connection: conexaoRedis() });
const notificacoes = new Worker<JobEnvio>(
  FILA_NOTIFICACOES,
  async (job) => {
    console.log(`[notificacoes] enviando mensagem ${job.data.messageId}`);
    await processarEnvioMensagem(job.data, app, {
      email: provedorEmailDoAmbiente(),
      whatsapp: new WhatsAppStubProvider(),
      reagendar: async (dados, delayMs) => {
        await filaNotificacoes.add("envio", dados, {
          delay: delayMs,
          jobId: `envio-${dados.messageId}-${Date.now()}`,
        });
      },
    });
  },
  { connection: conexaoRedis(), concurrency: 2 },
);

notificacoes.on("failed", (job, erro) => {
  console.error(`[notificacoes] job ${job?.id} falhou:`, erro.message);
});

regua.on("failed", (job, erro) => {
  console.error(`[regua] job ${job?.id} falhou:`, erro.message);
});

// Varredura diária às 09:00 UTC (06:00 em Brasília).
const filaRegua = new Queue(FILA_REGUA, { connection: conexaoRedis() });
await filaRegua.upsertJobScheduler(
  "regua-diaria",
  { pattern: "0 9 * * *" },
  {
    name: "regua-diaria",
    data: {},
  },
);

console.log("Worker no ar — filas: parsing, regua, ia, notificacoes");

async function encerrar(): Promise<void> {
  await Promise.all([
    parsing.close(),
    regua.close(),
    ia.close(),
    notificacoes.close(),
    filaRegua.close(),
    filaIa.close(),
    filaNotificacoes.close(),
  ]);
  await Promise.all([app.$disconnect(), sistema.$disconnect()]);
  process.exit(0);
}
process.on("SIGINT", () => void encerrar());
process.on("SIGTERM", () => void encerrar());
