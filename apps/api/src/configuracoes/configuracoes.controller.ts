import { Body, Controller, Get, Inject, Patch } from "@nestjs/common";
import { CONFIG_REGUA_PADRAO, ConfigReguaSchema, TONS_COBRANCA } from "@radar/core";
import { PapelUsuario, PrismaClient, comTenant } from "@radar/db";
import { z } from "zod";
import { AuditService } from "../audit/audit.service";
import { Papeis, UsuarioAtual } from "../common/decorators";
import { ZodPipe } from "../common/zod.pipe";
import type { UsuarioAutenticado } from "../common/auth.types";
import { PRISMA_APP } from "../prisma/prisma.module";

const AtualizarConfigSchema = z.object({
  configRegua: ConfigReguaSchema.optional(),
  tomCobranca: z.enum(TONS_COBRANCA).optional(),
  maxContatosPorSeguradoPorSemana: z.number().int().min(1).max(7).optional(),
  limiteMensalTokensIa: z.number().int().min(1000).nullable().optional(),
});
type AtualizarConfigDto = z.infer<typeof AtualizarConfigSchema>;

@Controller("configuracoes")
export class ConfiguracoesController {
  constructor(
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
    private readonly audit: AuditService,
  ) {}

  @Get()
  async obter(@UsuarioAtual() usuario: UsuarioAutenticado) {
    const tenant = await comTenant(this.app, usuario.tenantId, (tx) =>
      tx.tenant.findUniqueOrThrow({
        where: { id: usuario.tenantId },
        select: {
          nome: true,
          plano: true,
          configRegua: true,
          tomCobranca: true,
          maxContatosPorSeguradoPorSemana: true,
          limiteMensalTokensIa: true,
          autonomiaIaHabilitada: true,
        },
      }),
    );
    const regua = ConfigReguaSchema.safeParse(tenant.configRegua);
    return { ...tenant, configRegua: regua.success ? regua.data : CONFIG_REGUA_PADRAO };
  }

  @Papeis(PapelUsuario.ADMIN)
  @Patch()
  async atualizar(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Body(new ZodPipe(AtualizarConfigSchema)) dto: AtualizarConfigDto,
  ) {
    const atualizado = await comTenant(this.app, usuario.tenantId, (tx) =>
      tx.tenant.update({
        where: { id: usuario.tenantId },
        data: {
          ...(dto.configRegua ? { configRegua: dto.configRegua } : {}),
          ...(dto.tomCobranca ? { tomCobranca: dto.tomCobranca } : {}),
          ...(dto.maxContatosPorSeguradoPorSemana !== undefined
            ? { maxContatosPorSeguradoPorSemana: dto.maxContatosPorSeguradoPorSemana }
            : {}),
          ...(dto.limiteMensalTokensIa !== undefined
            ? { limiteMensalTokensIa: dto.limiteMensalTokensIa }
            : {}),
          // autonomiaIaHabilitada fica travada em false na Fase 0 (modo autônomo é Fase 2).
        },
        select: {
          configRegua: true,
          tomCobranca: true,
          maxContatosPorSeguradoPorSemana: true,
          limiteMensalTokensIa: true,
        },
      }),
    );
    await this.audit.registrar(
      usuario.tenantId,
      usuario.sub,
      "configuracoes_atualizadas",
      "Tenant",
      usuario.tenantId,
      { campos: Object.keys(dto) },
    );
    return atualizado;
  }
}
