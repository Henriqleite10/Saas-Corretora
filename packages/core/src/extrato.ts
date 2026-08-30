/**
 * Schema canônico de linha de extrato de comissão — a "regra de ouro" do produto:
 * todo parser converte qualquer formato de qualquer seguradora para este shape.
 * Nenhuma lógica de negócio conhece formato de seguradora.
 */
import { z } from "zod";

export const CompetenciaSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Competência deve estar no formato "AAAA-MM"');

export const EntradaCanonicaSchema = z.object({
  numeroApolice: z.string().min(1),
  numeroParcela: z.number().int().min(1).nullable(),
  seguradoNome: z.string().min(1).nullable(),
  /** Documento já normalizado (apenas dígitos). Nunca é persistido em claro. */
  seguradoDocumento: z
    .string()
    .regex(/^\d{11}$|^\d{14}$/)
    .nullable(),
  competencia: CompetenciaSchema,
  premioParcela: z.number().nonnegative().nullable(),
  valorComissao: z.number(),
  percentComissao: z.number().min(0).max(100).nullable(),
  dataPagamento: z.date().nullable(),
  /** Número da linha no arquivo original (rastreabilidade). */
  linhaOrigem: z.number().int().min(1),
  /** Linha original bruta, para auditoria e revisão manual. */
  dadosBrutos: z.record(z.unknown()),
});

export type EntradaCanonica = z.infer<typeof EntradaCanonicaSchema>;

export interface LinhaRejeitada {
  linha: number;
  motivo: string;
  conteudoBruto: string;
}

export interface ResultadoParsing {
  entradas: EntradaCanonica[];
  rejeitadas: LinhaRejeitada[];
}

// ---------- utilidades de normalização pt-BR ----------

/** "1.234,56", "R$ 1.234,56", "-12,3" → número. Retorna null se não parseável. */
export function numeroPtBr(valor: unknown): number | null {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : null;
  }
  if (typeof valor !== "string") return null;
  const limpo = valor
    .replace(/R\$\s?/i, "")
    .replace(/%/g, "")
    .trim();
  if (!limpo) return null;
  const normalizado = limpo.replace(/\./g, "").replace(",", ".");
  const n = Number(normalizado);
  return Number.isFinite(n) ? n : null;
}

/** "15/08/2026" (ou Date) → Date UTC. Retorna null se inválida. */
export function dataPtBr(valor: unknown): Date | null {
  if (valor instanceof Date) {
    return Number.isNaN(valor.getTime()) ? null : valor;
  }
  if (typeof valor !== "string") return null;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(valor.trim());
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1])));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "08/2026" ou "2026-08" → "2026-08". Retorna null se inválida. */
export function competenciaNormalizada(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const v = valor.trim();
  const iso = /^(\d{4})-(\d{2})$/.exec(v);
  if (iso) return CompetenciaSchema.safeParse(v).success ? v : null;
  const br = /^(\d{2})\/(\d{4})$/.exec(v);
  if (br) {
    const candidato = `${br[2]}-${br[1]}`;
    return CompetenciaSchema.safeParse(candidato).success ? candidato : null;
  }
  return null;
}
