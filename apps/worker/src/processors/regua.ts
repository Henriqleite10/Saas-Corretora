import {
  ConfigReguaSchema,
  agendarEtapasRegua,
  calcularComissaoEmRisco,
  calcularDiasAtraso,
} from "@radar/core";
import type { PrismaClient } from "@radar/db";
import { comTenant } from "@radar/db";

/**
 * Job diário do Radar de Inadimplência (Módulo A). Idempotente — pode rodar
 * quantas vezes for preciso no dia:
 *
 * 1. Marca parcelas vencidas como ATRASADA e atualiza dias de atraso.
 * 2. Abre RecoveryFlow + etapas da régua para parcela atrasada de apólice
 *    ATIVA cujo segurado NÃO fez opt-out (respeito obrigatório, seção 8).
 * 3. Encerra flows: parcela paga → PAGOU (alimenta o painel "R$ preservados");
 *    parcela/apólice cancelada → PERDIDO. Etapas pendentes são canceladas.
 */
export async function processarReguaTenant(
  tenantId: string,
  app: PrismaClient,
  hoje: Date = new Date(),
): Promise<{ parcelasMarcadas: number; flowsAbertos: number; flowsEncerrados: number }> {
  const resultado = { parcelasMarcadas: 0, flowsAbertos: 0, flowsEncerrados: 0 };

  // 1. Atualiza atraso das parcelas vencidas não pagas.
  await comTenant(app, tenantId, async (tx) => {
    const vencidas = await tx.installment.findMany({
      where: { status: { in: ["EM_DIA", "ATRASADA"] }, vencimento: { lt: hoje } },
      select: { id: true, vencimento: true, status: true, diasAtraso: true },
    });
    for (const parcela of vencidas) {
      const dias = calcularDiasAtraso(parcela.vencimento, hoje);
      if (dias <= 0) continue;
      if (parcela.status !== "ATRASADA" || parcela.diasAtraso !== dias) {
        await tx.installment.update({
          where: { id: parcela.id },
          data: { status: "ATRASADA", diasAtraso: dias },
        });
        if (parcela.status !== "ATRASADA") resultado.parcelasMarcadas += 1;
      }
    }
  });

  // 2. Abre flows para atrasadas elegíveis sem flow.
  await comTenant(app, tenantId, async (tx) => {
    const tenant = await tx.tenant.findUniqueOrThrow({
      where: { id: tenantId },
      select: { configRegua: true },
    });
    const config = ConfigReguaSchema.parse(tenant.configRegua);

    const semFlow = await tx.installment.findMany({
      where: {
        status: "ATRASADA",
        recoveryFlow: null,
        policy: { status: "ATIVA", seguradoOptOut: false },
      },
      include: {
        policy: {
          select: {
            percentComissaoEsperado: true,
            installments: { select: { valor: true, status: true } },
          },
        },
      },
    });

    for (const parcela of semFlow) {
      const emRisco = calcularComissaoEmRisco(
        parcela.policy.installments.map((p) => ({ valor: Number(p.valor), status: p.status })),
        Number(parcela.policy.percentComissaoEsperado),
      );
      await tx.recoveryFlow.create({
        data: {
          tenantId,
          installmentId: parcela.id,
          valorComissaoEmRisco: emRisco.toFixed(2),
          steps: {
            create: agendarEtapasRegua(config, parcela.vencimento).map((e) => ({
              tenantId,
              ordem: e.ordem,
              canal: e.canal,
              agendadaPara: e.agendadaPara,
            })),
          },
        },
      });
      resultado.flowsAbertos += 1;
    }
  });

  // 3. Encerra flows resolvidos.
  await comTenant(app, tenantId, async (tx) => {
    const abertos = await tx.recoveryFlow.findMany({
      where: { desfecho: "EM_ANDAMENTO" },
      include: { installment: { include: { policy: { select: { status: true } } } } },
    });
    for (const flow of abertos) {
      let desfecho: "PAGOU" | "PERDIDO" | null = null;
      if (flow.installment.status === "PAGA") desfecho = "PAGOU";
      else if (
        flow.installment.status === "CANCELADA" ||
        flow.installment.policy.status === "CANCELADA"
      ) {
        desfecho = "PERDIDO";
      }
      if (!desfecho) continue;
      await tx.recoveryFlow.update({
        where: { id: flow.id },
        data: { desfecho, encerradoEm: hoje },
      });
      await tx.recoveryStep.updateMany({
        where: { flowId: flow.id, status: { in: ["AGENDADA", "AGUARDANDO_APROVACAO"] } },
        data: { status: "CANCELADA" },
      });
      resultado.flowsEncerrados += 1;
    }
  });

  await comTenant(app, tenantId, (tx) =>
    tx.auditLog.create({
      data: {
        tenantId,
        userId: null,
        acao: "radar_executado",
        entidade: "Tenant",
        entidadeId: tenantId,
        detalhes: resultado,
      },
    }),
  );

  return resultado;
}

/** Varre todos os tenants (job diário). Usa a conexão de sistema só para enumerar. */
export async function processarReguaTodosTenants(
  sistema: PrismaClient,
  app: PrismaClient,
  hoje: Date = new Date(),
): Promise<void> {
  const tenants = await sistema.tenant.findMany({ select: { id: true } });
  for (const tenant of tenants) {
    try {
      await processarReguaTenant(tenant.id, app, hoje);
    } catch (erro) {
      console.error(`[regua] falha no tenant ${tenant.id}:`, (erro as Error).message);
    }
  }
}
