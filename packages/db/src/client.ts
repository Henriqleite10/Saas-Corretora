import { PrismaClient } from "@prisma/client";

/**
 * Conexão de SISTEMA (owner do schema; não sujeita a RLS): migrations, seed,
 * onboarding de tenant, login por e-mail e enumeração de tenants em jobs.
 */
export function criarClienteSistema(url?: string): PrismaClient {
  return new PrismaClient({
    datasourceUrl: url ?? process.env.DATABASE_URL,
  });
}

/**
 * Conexão de APLICAÇÃO (role radar_app, sujeita a RLS): todo acesso em nome de
 * um tenant. Combine com `comTenant`/`clienteDoTenant` para definir o contexto.
 */
export function criarClienteApp(url?: string): PrismaClient {
  const appUrl = url ?? process.env.DATABASE_URL_APP;
  if (!appUrl) {
    throw new Error("DATABASE_URL_APP não configurada");
  }
  return new PrismaClient({ datasourceUrl: appUrl });
}
