import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import { CHAVE_PUBLICO } from "../common/decorators";
import type { RequestComUsuario, UsuarioAutenticado } from "../common/auth.types";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const publica = this.reflector.getAllAndOverride<boolean>(CHAVE_PUBLICO, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (publica) return true;

    const req = ctx.switchToHttp().getRequest<Request & RequestComUsuario>();
    const [tipo, token] = req.headers.authorization?.split(" ") ?? [];
    if (tipo !== "Bearer" || !token) {
      throw new UnauthorizedException("Token de acesso ausente");
    }
    try {
      const payload = await this.jwt.verifyAsync<UsuarioAutenticado & { tipo?: string }>(token);
      if (payload.tipo === "refresh") {
        throw new Error("refresh token usado como access token");
      }
      req.usuario = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Token de acesso inválido ou expirado");
    }
  }
}
