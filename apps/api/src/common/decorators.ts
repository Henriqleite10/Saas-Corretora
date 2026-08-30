import { SetMetadata, createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { PapelUsuario } from "@radar/db";
import type { RequestComUsuario, UsuarioAutenticado } from "./auth.types";

export const CHAVE_PUBLICO = "rota_publica";
/** Marca rota como acessível sem autenticação (ex.: login, registro). */
export const Publico = () => SetMetadata(CHAVE_PUBLICO, true);

export const CHAVE_PAPEIS = "papeis_permitidos";
/** Restringe a rota aos papéis informados. Sem o decorator, basta estar autenticado. */
export const Papeis = (...papeis: PapelUsuario[]) => SetMetadata(CHAVE_PAPEIS, papeis);

/** Injeta o usuário autenticado (payload do JWT) no handler. */
export const UsuarioAtual = createParamDecorator(
  (_dados: unknown, ctx: ExecutionContext): UsuarioAutenticado => {
    const req = ctx.switchToHttp().getRequest<RequestComUsuario>();
    if (!req.usuario) {
      throw new Error("UsuarioAtual usado em rota sem JwtAuthGuard");
    }
    return req.usuario;
  },
);
