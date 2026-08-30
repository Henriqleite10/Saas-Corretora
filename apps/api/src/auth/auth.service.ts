import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { CONFIG_REGUA_PADRAO } from "@radar/core";
import { PapelUsuario, PrismaClient, comTenant, gerarDek, keyProviderDoAmbiente } from "@radar/db";
import type { User } from "@radar/db";
import { PRISMA_APP, PRISMA_SISTEMA } from "../prisma/prisma.module";
import { AuditService } from "../audit/audit.service";
import type { UsuarioAutenticado } from "../common/auth.types";
import type { CriarUsuarioDto, LoginDto, RegistrarDto } from "./auth.dto";

const ACCESS_EXPIRA = "15m";
const REFRESH_EXPIRA = "7d";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(PRISMA_SISTEMA) private readonly sistema: PrismaClient,
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
    private readonly jwt: JwtService,
    private readonly audit: AuditService,
  ) {}

  /** Onboarding: cria a corretora (tenant + DEK) e o primeiro usuário (ADMIN). */
  async registrar(dto: RegistrarDto): Promise<{ tokens: Tokens; usuario: UsuarioAutenticado }> {
    const jaExiste = await this.sistema.user.findUnique({ where: { email: dto.email } });
    if (jaExiste) {
      throw new ConflictException("Já existe uma conta com este e-mail");
    }

    const dek = gerarDek();
    const dekEnc = keyProviderDoAmbiente().embrulharDek(dek);
    const senhaHash = await argon2.hash(dto.senha, { type: argon2.argon2id });

    const { usuario } = await this.sistema.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          nome: dto.nomeCorretora,
          configRegua: CONFIG_REGUA_PADRAO,
          dekEnc: new Uint8Array(dekEnc),
        },
      });
      const usuario = await tx.user.create({
        data: {
          tenantId: tenant.id,
          nome: dto.nome,
          email: dto.email,
          senhaHash,
          papel: PapelUsuario.ADMIN,
        },
      });
      return { usuario };
    });

    await this.audit.registrar(
      usuario.tenantId,
      usuario.id,
      "tenant_criado",
      "Tenant",
      usuario.tenantId,
      {
        nomeCorretora: dto.nomeCorretora,
      },
    );

    return this.sessaoPara(usuario);
  }

  async login(dto: LoginDto): Promise<{ tokens: Tokens; usuario: UsuarioAutenticado }> {
    const usuario = await this.sistema.user.findUnique({ where: { email: dto.email } });
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    const senhaOk = await argon2.verify(usuario.senhaHash, dto.senha);
    if (!senhaOk) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    return this.sessaoPara(usuario);
  }

  /** Valida refresh token e emite novo par (rotação). */
  async renovar(
    refreshToken: string | undefined,
  ): Promise<{ tokens: Tokens; usuario: UsuarioAutenticado }> {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token ausente");
    }
    let payload: { sub: string; tipo?: string };
    try {
      payload = await this.jwt.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException("Refresh token inválido ou expirado");
    }
    if (payload.tipo !== "refresh") {
      throw new UnauthorizedException("Token não é um refresh token");
    }
    const usuario = await this.sistema.user.findUnique({ where: { id: payload.sub } });
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException("Usuário inativo");
    }
    return this.sessaoPara(usuario);
  }

  /** ADMIN cria usuário adicional no próprio tenant (via conexão RLS). */
  async criarUsuario(
    atual: UsuarioAutenticado,
    dto: CriarUsuarioDto,
  ): Promise<Omit<User, "senhaHash">> {
    const jaExiste = await this.sistema.user.findUnique({ where: { email: dto.email } });
    if (jaExiste) {
      throw new ConflictException("Já existe uma conta com este e-mail");
    }
    const senhaHash = await argon2.hash(dto.senha, { type: argon2.argon2id });
    const criado = await comTenant(this.app, atual.tenantId, (tx) =>
      tx.user.create({
        data: {
          tenantId: atual.tenantId,
          nome: dto.nome,
          email: dto.email,
          senhaHash,
          papel: dto.papel,
        },
      }),
    );
    await this.audit.registrar(atual.tenantId, atual.sub, "usuario_criado", "User", criado.id, {
      papel: dto.papel,
    });
    const { senhaHash: _omitida, ...semSenha } = criado;
    return semSenha;
  }

  async listarUsuarios(atual: UsuarioAutenticado): Promise<Omit<User, "senhaHash">[]> {
    const usuarios = await comTenant(this.app, atual.tenantId, (tx) =>
      tx.user.findMany({ orderBy: { criadoEm: "asc" } }),
    );
    return usuarios.map(({ senhaHash: _s, ...resto }) => resto);
  }

  private sessaoPara(usuario: User): { tokens: Tokens; usuario: UsuarioAutenticado } {
    const payload: UsuarioAutenticado = {
      sub: usuario.id,
      tenantId: usuario.tenantId,
      papel: usuario.papel,
      nome: usuario.nome,
    };
    return {
      usuario: payload,
      tokens: {
        accessToken: this.jwt.sign(payload, { expiresIn: ACCESS_EXPIRA }),
        refreshToken: this.jwt.sign(
          { sub: usuario.id, tipo: "refresh" },
          { expiresIn: REFRESH_EXPIRA },
        ),
      },
    };
  }
}
