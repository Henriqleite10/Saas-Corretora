import { ForbiddenException, Injectable } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { PapelUsuario } from "@radar/db";
import { CHAVE_PAPEIS } from "../common/decorators";
import type { RequestComUsuario } from "../common/auth.types";

@Injectable()
export class PapeisGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const papeis = this.reflector.getAllAndOverride<PapelUsuario[] | undefined>(CHAVE_PAPEIS, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!papeis || papeis.length === 0) return true;

    const req = ctx.switchToHttp().getRequest<RequestComUsuario>();
    if (!req.usuario) return true; // rota pública — JwtAuthGuard decide
    if (!papeis.includes(req.usuario.papel)) {
      throw new ForbiddenException("Seu papel não permite esta ação");
    }
    return true;
  }
}
