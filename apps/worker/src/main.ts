import { Queue, Worker } from "bullmq";
import { carregarEnvRaiz, criarClienteApp, criarClienteSistema } from "@radar/db";
import { registroPadrao } from "@radar/parsers";
import { FILA_PARSING, FILA_REGUA, conexaoRedis } from "./filas.js";
import type { JobParsing } from "./filas.js";
import { processarExtrato } from "./processors/parsing.js";
import { processarReguaTenant, processarReguaTodosTenants } from "./processors/regua.js";

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

const regua = new Worker<{ tenantId?: string }>(
  FILA_REGUA,
  async (job) => {
    if (job.data.tenantId) {
      console.log(`[regua] processando tenant ${job.data.tenantId}`);
      await processarReguaTenant(job.data.tenantId, app);
    } else {
      console.log("[regua] varredura diária de todos os tenants");
      await processarReguaTodosTenants(sistema, app);
    }
  },
  { connection: conexaoRedis(), concurrency: 1 },
);

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

console.log("Worker no ar — filas: parsing, regua");

// TODO(Etapa 7): consumidor da fila "ia" (drafts do agente de cobrança)
// TODO(Etapa 8): consumidor da fila "notificacoes" (envio de e-mail aprovado)

async function encerrar(): Promise<void> {
  await Promise.all([parsing.close(), regua.close(), filaRegua.close()]);
  await Promise.all([app.$disconnect(), sistema.$disconnect()]);
  process.exit(0);
}
process.on("SIGINT", () => void encerrar());
process.on("SIGTERM", () => void encerrar());
