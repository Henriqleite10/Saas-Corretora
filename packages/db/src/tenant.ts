/**
 * Contexto de tenant para RLS (segunda camada de isolamento, além do tenantId
 * nas queries): toda operação roda em transação com
 * `set_config('app.tenant_id', <id>, true)` — a policy nega tudo quando a
 * variável não está definida (deny by default).
 *
 * A conexão de runtime usa a role `radar_app` (sujeita a RLS). Operações de
 * sistema (onboarding, login por e-mail, enumeração de tenants em jobs) usam a
 * conexão de owner (DATABASE_URL), que não passa por RLS — usar com critério.
 */
import type { PrismaClient } from "@prisma/client";

export type TenantTx = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

/** Executa `fn` numa transação com o contexto de tenant aplicado (RLS ativa). */
export async function comTenant<T>(
  prisma: PrismaClient,
  tenantId: string,
  fn: (tx: TenantTx) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, true)`;
    return fn(tx as TenantTx);
  });
}

/**
 * Cliente com contexto de tenant embutido: cada operação roda numa transação
 * em lote com o set_config. Para sequências dependentes, prefira `comTenant`.
 */
export function clienteDoTenant(prisma: PrismaClient, tenantId: string) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const [, resultado] = await prisma.$transaction([
            prisma.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, true)`,
            query(args),
          ]);
          return resultado;
        },
      },
    },
  });
}

export type ClienteTenant = ReturnType<typeof clienteDoTenant>;
