/**
 * Testes de isolamento multi-tenant (requisito não negociável, seção 8 do briefing):
 * provam, contra um Postgres real com RLS aplicada, que o tenant A jamais lê ou
 * escreve dados do tenant B — mesmo com bug de aplicação (query sem filtro).
 *
 * Requer DATABASE_URL e DATABASE_URL_APP (docker-compose local ou service do CI).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PrismaClient, RamoSeguro } from "@prisma/client";
import { carregarEnvDeTeste } from "./test/env.js";
import { clienteDoTenant, comTenant } from "./tenant.js";
import { gerarDek } from "./crypto/envelope.js";

carregarEnvDeTeste();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);

describe.skipIf(!temBanco)("isolamento de tenant via RLS", () => {
  const sistema = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const app = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL_APP });

  let tenantA = "";
  let tenantB = "";
  let apoliceB = "";
  let insurerId = "";

  beforeAll(async () => {
    const insurer = await sistema.insurer.upsert({
      where: { slug: "rls-teste" },
      create: { slug: "rls-teste", nome: "Seguradora de Teste RLS" },
      update: {},
    });
    insurerId = insurer.id;

    const criarTenant = (nome: string) =>
      sistema.tenant.create({
        data: { nome, configRegua: [], dekEnc: new Uint8Array(gerarDek()) },
      });
    const [a, b] = await Promise.all([criarTenant("Corretora A"), criarTenant("Corretora B")]);
    tenantA = a.id;
    tenantB = b.id;

    const criarApolice = (tenantId: string, numero: string) =>
      sistema.policy.create({
        data: {
          tenantId,
          insurerId,
          numero,
          ramo: RamoSeguro.AUTO,
          seguradoNome: "Segurado Teste",
          seguradoDocEnc: new Uint8Array(Buffer.from("cifrado")),
          seguradoDocHash: `hash-${tenantId}-${numero}`,
          inicioVigencia: new Date("2026-01-01"),
          fimVigencia: new Date("2027-01-01"),
          premioTotal: "1200.00",
          percentComissaoEsperado: "20.00",
        },
      });
    await criarApolice(tenantA, "A-001");
    apoliceB = (await criarApolice(tenantB, "B-001")).id;
  });

  afterAll(async () => {
    await sistema.policy.deleteMany({ where: { tenantId: { in: [tenantA, tenantB] } } });
    await sistema.tenant.deleteMany({ where: { id: { in: [tenantA, tenantB] } } });
    await Promise.all([sistema.$disconnect(), app.$disconnect()]);
  });

  it("sem contexto de tenant, a role da aplicação não vê linha alguma (deny by default)", async () => {
    expect(await app.tenant.count()).toBe(0);
    expect(await app.policy.count()).toBe(0);
  });

  it("no contexto do tenant A, uma query SEM filtro só devolve dados de A", async () => {
    const apolices = await comTenant(app, tenantA, (tx) => tx.policy.findMany());
    expect(apolices.length).toBe(1);
    expect(apolices[0]?.tenantId).toBe(tenantA);
  });

  it("tenant A não lê apólice do tenant B nem por id direto", async () => {
    const resultado = await comTenant(app, tenantA, (tx) =>
      tx.policy.findUnique({ where: { id: apoliceB } }),
    );
    expect(resultado).toBeNull();
  });

  it("tenant A não enxerga o cadastro do tenant B", async () => {
    const tenants = await comTenant(app, tenantA, (tx) => tx.tenant.findMany());
    expect(tenants.map((t) => t.id)).toEqual([tenantA]);
  });

  it("no contexto de A, é impossível ESCREVER linha com tenant_id de B (WITH CHECK)", async () => {
    await expect(
      comTenant(app, tenantA, (tx) =>
        tx.policy.create({
          data: {
            tenantId: tenantB,
            insurerId,
            numero: "INTRUSA-001",
            ramo: RamoSeguro.AUTO,
            seguradoNome: "Intruso",
            seguradoDocEnc: new Uint8Array(Buffer.from("x")),
            seguradoDocHash: "hash-intruso",
            inicioVigencia: new Date("2026-01-01"),
            fimVigencia: new Date("2027-01-01"),
            premioTotal: "1.00",
            percentComissaoEsperado: "1.00",
          },
        }),
      ),
    ).rejects.toThrow();
  });

  it("no contexto de A, UPDATE em massa não alcança linhas de B", async () => {
    const { count } = await comTenant(app, tenantA, (tx) =>
      tx.policy.updateMany({ data: { seguradoNome: "Renomeado" } }),
    );
    expect(count).toBe(1);
    const deB = await sistema.policy.findUniqueOrThrow({ where: { id: apoliceB } });
    expect(deB.seguradoNome).toBe("Segurado Teste");
  });

  it("clienteDoTenant aplica o contexto em operações avulsas", async () => {
    const clienteA = clienteDoTenant(app, tenantA);
    expect(await clienteA.policy.count()).toBe(1);
    const clienteB = clienteDoTenant(app, tenantB);
    expect(await clienteB.policy.count()).toBe(1);
  });

  it("a role da aplicação não escreve no catálogo global de seguradoras", async () => {
    await expect(app.insurer.create({ data: { slug: "hack", nome: "Hack" } })).rejects.toThrow();
  });
});
