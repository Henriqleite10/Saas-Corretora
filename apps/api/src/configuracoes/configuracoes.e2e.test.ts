import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { PrismaClient, carregarEnvRaiz } from "@radar/db";
import { AppModule } from "../app.module";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);
const sufixo = `cfg-${Date.now().toString(36)}`;

describe.skipIf(!temBanco)("configurações (e2e)", () => {
  let app: INestApplication;
  let http: ReturnType<INestApplication["getHttpServer"]>;
  const limpeza = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  let tenantId = "";
  let tokenAdmin = "";
  let tokenCorretor = "";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
    http = app.getHttpServer();

    const reg = await request(http)
      .post("/api/auth/registrar")
      .send({
        nomeCorretora: "Corretora Config",
        nome: "Ana",
        email: `${sufixo}@teste.dev`,
        senha: "senha-forte-123",
      });
    tokenAdmin = reg.body.accessToken;
    tenantId = reg.body.usuario.tenantId;

    await request(http)
      .post("/api/auth/usuarios")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        nome: "Caio",
        email: `${sufixo}-c@teste.dev`,
        senha: "senha-forte-123",
        papel: "CORRETOR",
      });
    const login = await request(http)
      .post("/api/auth/login")
      .send({ email: `${sufixo}-c@teste.dev`, senha: "senha-forte-123" });
    tokenCorretor = login.body.accessToken;
  });

  afterAll(async () => {
    await limpeza.auditLog.deleteMany({ where: { tenantId } });
    await limpeza.user.deleteMany({ where: { tenantId } });
    await limpeza.tenant.deleteMany({ where: { id: tenantId } });
    await limpeza.$disconnect();
    await app.close();
  });

  it("devolve a configuração com a régua padrão do onboarding", async () => {
    const res = await request(http)
      .get("/api/configuracoes")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(200);
    expect(res.body.configRegua).toHaveLength(3);
    expect(res.body.tomCobranca).toBe("cordial");
    expect(res.body.autonomiaIaHabilitada).toBe(false);
  });

  it("ADMIN atualiza régua, tom e limites com validação Zod", async () => {
    const res = await request(http)
      .patch("/api/configuracoes")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        configRegua: [
          { diasAposVencimento: 2, canal: "EMAIL" },
          { diasAposVencimento: 9, canal: "EMAIL" },
        ],
        tomCobranca: "formal",
        maxContatosPorSeguradoPorSemana: 1,
        limiteMensalTokensIa: 50000,
      });
    expect(res.status).toBe(200);
    expect(res.body.tomCobranca).toBe("formal");

    const denovo = await request(http)
      .get("/api/configuracoes")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(denovo.body.configRegua).toHaveLength(2);
    expect(denovo.body.limiteMensalTokensIa).toBe(50000);
  });

  it("rejeita régua fora de ordem crescente", async () => {
    const res = await request(http)
      .patch("/api/configuracoes")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        configRegua: [
          { diasAposVencimento: 10, canal: "EMAIL" },
          { diasAposVencimento: 3, canal: "EMAIL" },
        ],
      });
    expect(res.status).toBe(400);
  });

  it("CORRETOR lê mas não altera (RBAC)", async () => {
    const leitura = await request(http)
      .get("/api/configuracoes")
      .set("Authorization", `Bearer ${tokenCorretor}`);
    expect(leitura.status).toBe(200);

    const escrita = await request(http)
      .patch("/api/configuracoes")
      .set("Authorization", `Bearer ${tokenCorretor}`)
      .send({ tomCobranca: "proximo" });
    expect(escrita.status).toBe(403);
  });
});
