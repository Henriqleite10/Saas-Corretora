import { Worker } from "bullmq";
import { carregarEnvRaiz, criarClienteApp } from "@radar/db";
import { registroPadrao } from "@radar/parsers";
import { FILA_PARSING, conexaoRedis } from "./filas.js";
import type { JobParsing } from "./filas.js";
import { processarExtrato } from "./processors/parsing.js";

carregarEnvRaiz();

const app = criarClienteApp();
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

console.log("Worker no ar — filas: parsing");

// TODO(Etapa 6): consumidor da fila "regua" (detect-overdue diário + avanço de etapas)
// TODO(Etapa 7): consumidor da fila "ia" (drafts do agente de cobrança)
// TODO(Etapa 8): consumidor da fila "notificacoes" (envio de e-mail aprovado)

async function encerrar(): Promise<void> {
  await parsing.close();
  await app.$disconnect();
  process.exit(0);
}
process.on("SIGINT", () => void encerrar());
process.on("SIGTERM", () => void encerrar());
