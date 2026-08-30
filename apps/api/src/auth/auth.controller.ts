import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type { Request, Response } from "express";
import { PapelUsuario } from "@radar/db";
import { Papeis, Publico, UsuarioAtual } from "../common/decorators";
import { ZodPipe } from "../common/zod.pipe";
import type { UsuarioAutenticado } from "../common/auth.types";
import { config } from "../config";
import { AuthService } from "./auth.service";
import type { Tokens } from "./auth.service";
import { CriarUsuarioSchema, LoginSchema, RegistrarSchema } from "./auth.dto";
import type { CriarUsuarioDto, LoginDto, RegistrarDto } from "./auth.dto";

const COOKIE_REFRESH = "refresh_token";

function aplicarCookieRefresh(res: Response, tokens: Tokens): void {
  res.cookie(COOKIE_REFRESH, tokens.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: config().NODE_ENV === "production",
    path: "/api/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Publico()
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @Post("registrar")
  async registrar(
    @Body(new ZodPipe(RegistrarSchema)) dto: RegistrarDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens, usuario } = await this.auth.registrar(dto);
    aplicarCookieRefresh(res, tokens);
    return { accessToken: tokens.accessToken, usuario };
  }

  @Publico()
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @Post("login")
  async login(
    @Body(new ZodPipe(LoginSchema)) dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens, usuario } = await this.auth.login(dto);
    aplicarCookieRefresh(res, tokens);
    return { accessToken: tokens.accessToken, usuario };
  }

  @Publico()
  @Post("renovar")
  async renovar(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies as Record<string, string> | undefined;
    const { tokens, usuario } = await this.auth.renovar(cookies?.[COOKIE_REFRESH]);
    aplicarCookieRefresh(res, tokens);
    return { accessToken: tokens.accessToken, usuario };
  }

  @Publico()
  @Post("sair")
  sair(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(COOKIE_REFRESH, { path: "/api/auth" });
    return { ok: true };
  }

  @Get("eu")
  eu(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return { usuario };
  }

  @Papeis(PapelUsuario.ADMIN)
  @Post("usuarios")
  criarUsuario(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Body(new ZodPipe(CriarUsuarioSchema)) dto: CriarUsuarioDto,
  ) {
    return this.auth.criarUsuario(usuario, dto);
  }

  @Papeis(PapelUsuario.ADMIN)
  @Get("usuarios")
  listarUsuarios(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return this.auth.listarUsuarios(usuario);
  }
}
