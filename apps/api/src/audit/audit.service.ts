import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient, comTenant } from "@radar/db";
import type { Prisma } from "@radar/db";
import { PRISMA_APP } from "../prisma/prisma.module";

/**
 * Toda ação relevante vira AuditLog por tenant — incluindo toda mensagem enviada
 * por IA e quem aprovou (requisito do briefing). `detalhes` NUNCA leva PII em
 * claro: use máscaras/hashes de @radar/core antes de chamar.
 */
@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(@Inject(PRISMA_APP) private readonly app: PrismaClient) {}

  async registrar(
    tenantId: string,
    userId: string | null,
    acao: string,
    entidade: string,
    entidadeId: string,
    detalhes: Prisma.InputJsonValue = {},
  ): Promise<void> {
    try {
      await comTenant(this.app, tenantId, (tx) =>
        tx.auditLog.create({ data: { tenantId, userId, acao, entidade, entidadeId, detalhes } }),
      );
    } catch (erro) {
      // Auditoria nunca derruba a operação principal — mas fica visível no log.
      this.logger.error(`Falha ao gravar AuditLog (${acao}/${entidade})`, erro as Error);
    }
  }
}
