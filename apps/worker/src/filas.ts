/**
 * Nomes das filas BullMQ (compartilhados com a API, que enfileira).
 * Jobs são idempotentes e usam chave natural como jobId quando possível.
 */
import IORedis from "ioredis";

export const FILA_PARSING = "parsing";
export const FILA_REGUA = "regua";
export const FILA_IA = "ia";
export const FILA_NOTIFICACOES = "notificacoes";
export const FILA_AGENDAMENTOS = "agendamentos";

export interface JobParsing {
  statementId: string;
  tenantId: string;
}

export function conexaoRedis(): IORedis {
  // maxRetriesPerRequest: null é exigência do BullMQ para workers.
  return new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    maxRetriesPerRequest: null,
  });
}
