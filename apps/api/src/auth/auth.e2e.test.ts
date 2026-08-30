/**
 * E2E de auth + RBAC + escopo de tenant, contra Postgres real (RLS aplicada).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { PrismaClient, carregarEnvRaiz } from "@radar/db";
import { AppModule } from "../app.module";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);
const sufixo = Date.now().toString(36);
const emailAdmin = `admin-${sufixo}@teste.dev`;
const emailCorretor = `corretor-${sufixo}@teste.dev`;
const emailAdmin2 = `admin2-${sufixo}@teste.dev`;

describe.skipIf(!temBanco)("auth e RBAC (e2e)", () => {
  let app: INestApplication;
  let http: ReturnType<INestApplication["getHttpServer"]>;
  const limpeza = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const tenantsCriados: string[] = [];

  let tokenAdmin = "";
  let tokenCorretor = "";
  let tokenAdmin2 = "";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    app.use(cookieParser());
    await app.init();
    http = app.getHttpServer();
  });

  afterAll(async () => {
    await limpeza.auditLog.deleteMany({ where: { tenantId: { in: tenantsCriados } } });
    await limpeza.user.deleteMany({ where: { tenantId: { in: tenantsCriados } } });
    await limpeza.tenant.deleteMany({ where: { id: { in: tenantsCriados } } });
    await limpeza.$disconnect();
    await app.close();
  });

  it("registra uma corretora e devolve access token + cookie de refresh", async () => {
    const res = await request(http).post("/api/auth/registrar").send({
      nomeCorretora: "Corretora E2E",
      nome: "Ana Admin",
      email: emailAdmin,
      senha: "senha-forte-123",
    });
    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.usuario.papel).toBe("ADMIN");
    expect(res.headers["set-cookie"]?.[0]).toContain("refresh_token=");
    expect(res.headers["set-cookie"]?.[0]).toContain("HttpOnly");
    tokenAdmin = res.body.accessToken;
    tenantsCriados.push(res.body.usuario.tenantId);
  });

  it("rejeita payload inválido com detalhe por campo (Zod)", async () => {
    const res = await request(http)
      .post("/api/auth/registrar")
      .send({ nomeCorretora: "X", nome: "", email: "não-email", senha: "curta" });
    expect(res.status).toBe(400);
    expect(res.body.erros?.length).toBeGreaterThan(0);
  });

  it("rejeita e-mail duplicado", async () => {
    const res = await request(http).post("/api/auth/registrar").send({
      nomeCorretora: "Outra",
      nome: "Bia",
      email: emailAdmin,
      senha: "senha-forte-123",
    });
    expect(res.status).toBe(409);
  });

  it("faz login com credenciais corretas e recusa senha errada", async () => {
    const ok = await request(http)
      .post("/api/auth/login")
      .send({ email: emailAdmin, senha: "senha-forte-123" });
    expect(ok.status).toBe(201);

    const errada = await request(http)
      .post("/api/auth/login")
      .send({ email: emailAdmin, senha: "senha-errada-999" });
    expect(errada.status).toBe(401);
  });

  it("bloqueia rota autenticada sem token e aceita com token", async () => {
    expect((await request(http).get("/api/auth/eu")).status).toBe(401);

    const res = await request(http)
      .get("/api/auth/eu")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(200);
    expect(res.body.usuario.nome).toBe("Ana Admin");
  });

  it("renova a sessão via cookie de refresh", async () => {
    const login = await request(http)
      .post("/api/auth/login")
      .send({ email: emailAdmin, senha: "senha-forte-123" });
    const cookie = login.headers["set-cookie"]![0]!;

    const res = await request(http).post("/api/auth/renovar").set("Cookie", cookie);
    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBeTruthy();

    const semCookie = await request(http).post("/api/auth/renovar");
    expect(semCookie.status).toBe(401);
  });

  it("refresh token não serve como access token", async () => {
    const login = await request(http)
      .post("/api/auth/login")
      .send({ email: emailAdmin, senha: "senha-forte-123" });
    const refresh = /refresh_token=([^;]+)/.exec(login.headers["set-cookie"]![0]!)![1]!;
    const res = await request(http).get("/api/auth/eu").set("Authorization", `Bearer ${refresh}`);
    expect(res.status).toBe(401);
  });

  it("ADMIN cria usuário CORRETOR no próprio tenant", async () => {
    const res = await request(http)
      .post("/api/auth/usuarios")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        nome: "Carlos Corretor",
        email: emailCorretor,
        senha: "senha-forte-123",
        papel: "CORRETOR",
      });
    expect(res.status).toBe(201);
    expect(res.body.senhaHash).toBeUndefined();

    const login = await request(http)
      .post("/api/auth/login")
      .send({ email: emailCorretor, senha: "senha-forte-123" });
    tokenCorretor = login.body.accessToken;
    expect(tokenCorretor).toBeTruthy();
  });

  it("CORRETOR não acessa rota de ADMIN (RBAC)", async () => {
    const res = await request(http)
      .get("/api/auth/usuarios")
      .set("Authorization", `Bearer ${tokenCorretor}`);
    expect(res.status).toBe(403);
  });

  it("listagem de usuários é isolada por tenant", async () => {
    const outra = await request(http).post("/api/auth/registrar").send({
      nomeCorretora: "Corretora B E2E",
      nome: "Beto Admin",
      email: emailAdmin2,
      senha: "senha-forte-123",
    });
    tokenAdmin2 = outra.body.accessToken;
    tenantsCriados.push(outra.body.usuario.tenantId);

    const listaA = await request(http)
      .get("/api/auth/usuarios")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    const listaB = await request(http)
      .get("/api/auth/usuarios")
      .set("Authorization", `Bearer ${tokenAdmin2}`);

    expect(listaA.body.map((u: { email: string }) => u.email).sort()).toEqual(
      [emailAdmin, emailCorretor].sort(),
    );
    expect(listaB.body.map((u: { email: string }) => u.email)).toEqual([emailAdmin2]);
  });

  it("onboarding gera AuditLog de tenant_criado", async () => {
    const logs = await limpeza.auditLog.findMany({
      where: { tenantId: tenantsCriados[0]!, acao: "tenant_criado" },
    });
    expect(logs.length).toBe(1);
  });
});
