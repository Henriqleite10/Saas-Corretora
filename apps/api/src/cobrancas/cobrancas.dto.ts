import { z } from "zod";

export const AprovarMensagemSchema = z.object({
  assunto: z.string().min(1).max(160).optional(),
  corpo: z.string().min(1).max(8000).optional(),
});
export type AprovarMensagemDto = z.infer<typeof AprovarMensagemSchema>;
