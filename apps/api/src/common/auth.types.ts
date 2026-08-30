import type { PapelUsuario } from "@radar/db";

/** Payload do access token — a única fonte de tenantId do request autenticado. */
export interface UsuarioAutenticado {
  sub: string;
  tenantId: string;
  papel: PapelUsuario;
  nome: string;
}

export interface RequestComUsuario {
  usuario?: UsuarioAutenticado;
}
