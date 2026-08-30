/**
 * E2E do fluxo de extratos: upload → statement RECEBIDO + job na fila;
 * dedup por hash; exigência de vínculo com a seguradora.
 * (O processamento em si é coberto pelo teste de integração do worker.)
 */
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { PrismaClient, carregarEnvRaiz } from "@radar/db";
import { fixturePortoSeguroXlsxV1 } from "@radar/parsers/fixtures";
import { AppModule } from "../app.module";
import { FilaService } from "../fila/fila.service";

carregarEnvRaiz();
process.env.STORAGE_DIR = mkdtempSync(join(tmpdir(), "radar-uploads-"));

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);
const sufixo = `ext-${Date.now().toString(36)}`;

class FilaFake {
  jobs: { fila: string; dados: object }[] = [];
  async enfileirar(fila: string, dados: object): Promise<void> {
    this.jobs.push({ fila, dados });
  }
  async onApplicationShutdown(): Promise<void> {}
}

describe.skipIf(!temBanco)("extratos (e2e)", () => {
  let app: INestApplication;
  let http: ReturnType<INestApplication["getHttpServer"]>;
  const filaFake = new FilaFake();
  const limpeza = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  let tenantId = "";
  let token = "";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(FilaService)
      .useValue(filaFake)
      .compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
    http = app.getHttpServer();

    const reg = await request(http)
      .post("/api/auth/registrar")
      .send({
        nomeCorretora: "Corretora Extratos",
        nome: "Ana",
        email: `${sufixo}@teste.dev`,
        senha: "senha-forte-123",
      });
    token = reg.body.accessToken;
    tenantId = reg.body.usuario.tenantId;
  });

  afterAll(async () => {
    await limpeza.auditLog.deleteMany({ where: { tenantId } });
    await limpeza.commissionStatement.deleteMany({ where: { tenantId } });
    await limpeza.insurerAccount.deleteMany({ where: { tenantId } });
    await limpeza.user.deleteMany({ where: { tenantId } });
    await limpeza.tenant.deleteMany({ where: { id: tenantId } });
    await limpeza.$disconnect();
    await app.close();
  });

  it("recusa upload de seguradora não vinculada", async () => {
    const res = await request(http)
      .post("/api/extratos")
      .set("Authorization", `Bearer ${token}`)
      .field("insurerSlug", "porto-seguro")
      .field("competencia", "2026-08")
      .attach("arquivo", fixturePortoSeguroXlsxV1(), "porto.xlsx");
    expect(res.status).toBe(400);
    expect(res.body.message).toContain("Vincule");
  });

  it("aceita upload, grava arquivo e enfileira parsing", async () => {
    await request(http)
      .post("/api/seguradoras/vinculos")
      .set("Authorization", `Bearer ${token}`)
      .send({ insurerSlug: "porto-seguro" });

    const res = await request(http)
      .post("/api/extratos")
      .set("Authorization", `Bearer ${token}`)
      .field("insurerSlug", "porto-seguro")
      .field("competencia", "2026-08")
      .attach("arquivo", fixturePortoSeguroXlsxV1(), "porto.xlsx");

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("RECEBIDO");
    expect(filaFake.jobs).toHaveLength(1);
    expect(filaFake.jobs[0]!.fila).toBe("parsing");
    expect(filaFake.jobs[0]!.dados).toMatchObject({ statementId: res.body.id, tenantId });
  });

  it("deduplica o mesmo arquivo por hash", async () => {
    const res = await request(http)
      .post("/api/extratos")
      .set("Authorization", `Bearer ${token}`)
      .field("insurerSlug", "porto-seguro")
      .field("competencia", "2026-08")
      .attach("arquivo", fixturePortoSeguroXlsxV1(), "porto-de-novo.xlsx");
    expect(res.status).toBe(409);
  });

  it("lista e detalha extratos do tenant", async () => {
    const lista = await request(http).get("/api/extratos").set("Authorization", `Bearer ${token}`);
    expect(lista.status).toBe(200);
    expect(lista.body).toHaveLength(1);

    const detalhe = await request(http)
      .get(`/api/extratos/${lista.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(detalhe.status).toBe(200);
    expect(detalhe.body.insurer.slug).toBe("porto-seguro");
  });
});
