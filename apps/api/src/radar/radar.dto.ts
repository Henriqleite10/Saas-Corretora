import { z } from "zod";

export const FiltrosRadarSchema = z.object({
  ramo: z.enum(["AUTO", "VIDA", "SAUDE", "RESIDENCIAL", "EMPRESARIAL", "OUTROS"]).optional(),
  insurerSlug: z.string().max(60).optional(),
  diasMin: z.coerce.number().int().min(1).optional(),
});
export type FiltrosRadarDto = z.infer<typeof FiltrosRadarSchema>;
