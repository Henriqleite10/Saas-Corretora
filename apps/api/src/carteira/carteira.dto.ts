import { normalizarDocumento } from "@radar/core";
import { z } from "zod";

export const documentoSchema = z
  .string()
  .transform(normalizarDocumento)
  .refine((d) => d.length === 11 || d.length === 14, "CPF/CNPJ inválido");

const dataSchema = z.coerce.date();
const dinheiroSchema = z.coerce
  .number()
  .nonnegative()
  .transform((n) => n.toFixed(2));
const percentualSchema = z.coerce
  .number()
  .min(0)
  .max(100)
  .transform((n) => n.toFixed(2));

export const RAMOS = ["AUTO", "VIDA", "SAUDE", "RESIDENCIAL", "EMPRESARIAL", "OUTROS"] as const;

export const ParcelaInputSchema = z.object({
  numero: z.number().int().min(1),
  valor: dinheiroSchema,
  vencimento: dataSchema,
});

export const CriarApoliceSchema = z.object({
  insurerSlug: z.string().min(1),
  numero: z.string().min(1).max(60),
  ramo: z.enum(RAMOS),
  seguradoNome: z.string().min(2).max(160),
  seguradoDocumento: documentoSchema,
  seguradoEmail: z.string().email().max(200).optional(),
  seguradoTelefone: z.string().max(30).optional(),
  inicioVigencia: dataSchema,
  fimVigencia: dataSchema,
  premioTotal: dinheiroSchema,
  percentComissaoEsperado: percentualSchema,
  parcelas: z.array(ParcelaInputSchema).min(1).max(60),
});
export type CriarApoliceDto = z.infer<typeof CriarApoliceSchema>;

export const AtualizarApoliceSchema = z.object({
  status: z.enum(["ATIVA", "CANCELADA", "SUSPENSA", "VENCIDA"]).optional(),
  percentComissaoEsperado: percentualSchema.optional(),
  seguradoEmail: z.string().email().max(200).optional(),
  seguradoTelefone: z.string().max(30).optional(),
  seguradoOptOut: z.boolean().optional(),
});
export type AtualizarApoliceDto = z.infer<typeof AtualizarApoliceSchema>;

export const RegistrarPagamentoSchema = z.object({
  pagaEm: dataSchema.optional(),
});
export type RegistrarPagamentoDto = z.infer<typeof RegistrarPagamentoSchema>;

export const ListarApolicesSchema = z.object({
  status: z.enum(["ATIVA", "CANCELADA", "SUSPENSA", "VENCIDA"]).optional(),
  busca: z.string().max(120).optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  porPagina: z.coerce.number().int().min(1).max(100).default(20),
});
export type ListarApolicesDto = z.infer<typeof ListarApolicesSchema>;
