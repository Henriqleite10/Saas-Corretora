import { z } from "zod/v4";

// ---------- contexto de rascunho (Módulo C) ----------
// PII mínima: primeiro nome + dados da parcela. NUNCA CPF, e-mail ou telefone.

export const ContextoRascunhoSchema = z.object({
  nomeCorretora: z.string().min(1),
  nomeSegurado: z.string().min(1),
  ramo: z.enum(["AUTO", "VIDA", "SAUDE", "RESIDENCIAL", "EMPRESARIAL", "OUTROS"]),
  valorParcela: z.string(),
  numeroParcela: z.number().int().min(1),
  diasAtraso: z.number().int().min(0),
  historico: z.enum(["PRIMEIRO_ATRASO", "REINCIDENTE"]),
  etapa: z.object({ ordem: z.number().int().min(1), total: z.number().int().min(1) }),
  tom: z.enum(["cordial", "formal", "proximo"]),
  canal: z.enum(["EMAIL", "WHATSAPP"]),
  linkPagamento: z.string().optional(),
});
export type ContextoRascunho = z.infer<typeof ContextoRascunhoSchema>;

export const RascunhoSchema = z.object({
  assunto: z.string().min(1).max(160),
  corpo: z.string().min(1),
  justificativa: z.string().min(1),
});
export type Rascunho = z.infer<typeof RascunhoSchema>;

export const ParecerJuizSchema = z.object({
  veredito: z.enum(["APROVADA", "REPROVADA"]),
  violacoes: z.array(z.string()),
  justificativa: z.string(),
});
export type ParecerJuiz = z.infer<typeof ParecerJuizSchema>;

export interface Violacao {
  regra: string;
  detalhe: string;
}

export interface ResultadoGuardrails {
  veredito: "APROVADA" | "REPROVADA";
  /** Camada que decidiu: regras determinísticas barram antes do juiz (mais barato). */
  origem: "REGRAS" | "JUIZ";
  violacoes: Violacao[];
  justificativa?: string;
}

// ---------- medição de custo (seção 8 do briefing) ----------

export interface UsoIa {
  modulo: "COBRANCA" | "INSIGHTS" | "CONCILIACAO";
  modelo: string;
  tokensInput: number;
  tokensOutput: number;
}

export interface MedidorUso {
  registrar(uso: UsoIa): Promise<void>;
}

/** Medidor nulo para testes/uso avulso. */
export const medidorNulo: MedidorUso = { registrar: async () => {} };
