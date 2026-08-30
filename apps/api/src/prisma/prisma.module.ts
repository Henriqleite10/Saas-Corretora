import { Global, Module } from "@nestjs/common";
import type { OnApplicationShutdown } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { PrismaClient, criarClienteApp, criarClienteSistema } from "@radar/db";
import { config } from "../config";

/**
 * Duas conexões (ver CLAUDE.md):
 * - PRISMA_SISTEMA: owner, sem RLS — onboarding, login por e-mail, jobs de sistema.
 * - PRISMA_APP: role radar_app, sujeita a RLS — todo acesso em nome de um tenant,
 *   sempre via comTenant/clienteDoTenant.
 */
export const PRISMA_SISTEMA = "PRISMA_SISTEMA";
export const PRISMA_APP = "PRISMA_APP";

@Global()
@Module({
  providers: [
    { provide: PRISMA_SISTEMA, useFactory: () => criarClienteSistema(config().DATABASE_URL) },
    { provide: PRISMA_APP, useFactory: () => criarClienteApp(config().DATABASE_URL_APP) },
  ],
  exports: [PRISMA_SISTEMA, PRISMA_APP],
})
export class PrismaModule implements OnApplicationShutdown {
  constructor(
    @Inject(PRISMA_SISTEMA) private readonly sistema: PrismaClient,
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
  ) {}

  async onApplicationShutdown(): Promise<void> {
    await Promise.all([this.sistema.$disconnect(), this.app.$disconnect()]);
  }
}
