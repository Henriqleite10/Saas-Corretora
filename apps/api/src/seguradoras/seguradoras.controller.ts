import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { PapelUsuario, PrismaClient, comTenant } from "@radar/db";
import { z } from "zod";
import { Papeis, UsuarioAtual } from "../common/decorators";
import { ZodPipe } from "../common/zod.pipe";
import type { UsuarioAutenticado } from "../common/auth.types";
import { PRISMA_APP, PRISMA_SISTEMA } from "../prisma/prisma.module";

const CriarVinculoSchema = z.object({
  insurerSlug: z.string().min(1),
  codigoSusep: z.string().max(40).optional(),
});
type CriarVinculoDto = z.infer<typeof CriarVinculoSchema>;

@Controller("seguradoras")
export class SeguradorasController {
  constructor(
    @Inject(PRISMA_SISTEMA) private readonly sistema: PrismaClient,
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
  ) {}

  /** Catálogo global de seguradoras suportadas. */
  @Get()
  listarCatalogo() {
    return this.sistema.insurer.findMany({ where: { ativo: true }, orderBy: { nome: "asc" } });
  }

  /** Seguradoras vinculadas à corretora. */
  @Get("vinculos")
  listarVinculos(@UsuarioAtual() usuario: UsuarioAutenticado) {
    return comTenant(this.app, usuario.tenantId, (tx) =>
      tx.insurerAccount.findMany({ include: { insurer: true } }),
    );
  }

  @Papeis(PapelUsuario.ADMIN, PapelUsuario.FINANCEIRO)
  @Post("vinculos")
  async criarVinculo(
    @UsuarioAtual() usuario: UsuarioAutenticado,
    @Body(new ZodPipe(CriarVinculoSchema)) dto: CriarVinculoDto,
  ) {
    const insurer = await this.sistema.insurer.findUnique({ where: { slug: dto.insurerSlug } });
    if (!insurer || !insurer.ativo) {
      throw new NotFoundException("Seguradora não encontrada no catálogo");
    }
    return comTenant(this.app, usuario.tenantId, (tx) =>
      tx.insurerAccount.upsert({
        where: { tenantId_insurerId: { tenantId: usuario.tenantId, insurerId: insurer.id } },
        create: {
          tenantId: usuario.tenantId,
          insurerId: insurer.id,
          codigoSusep: dto.codigoSusep ?? null,
        },
        update: { codigoSusep: dto.codigoSusep ?? null, ativo: true },
        include: { insurer: true },
      }),
    );
  }
}
