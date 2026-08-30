import { z } from "zod";

const email = z
  .string()
  .email("E-mail inválido")
  .max(200)
  .transform((v) => v.toLowerCase());
const senha = z.string().min(8, "Senha deve ter ao menos 8 caracteres").max(128);

export const RegistrarSchema = z.object({
  nomeCorretora: z.string().min(2).max(120),
  nome: z.string().min(2).max(120),
  email,
  senha,
});
export type RegistrarDto = z.infer<typeof RegistrarSchema>;

export const LoginSchema = z.object({ email, senha: z.string().min(1).max(128) });
export type LoginDto = z.infer<typeof LoginSchema>;

export const CriarUsuarioSchema = z.object({
  nome: z.string().min(2).max(120),
  email,
  senha,
  papel: z.enum(["ADMIN", "CORRETOR", "FINANCEIRO"]),
});
export type CriarUsuarioDto = z.infer<typeof CriarUsuarioSchema>;
