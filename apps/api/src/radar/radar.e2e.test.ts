/**
 * E2E do Radar de Inadimplência: resumo e listagem de atrasadas (dados de
 * régua semeados direto no banco — o avanço da régua é coberto no worker).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { PrismaClient, carregarEnvRaiz } from "@radar/db";
import { AppModule } from "../app.module";
import { FilaService } from "../fila/fila.service";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);
const sufixo = `radar-${Date.now().toString(36)}`;

class FilaFake {
  jobs: { fila: string; dados: object }[] = [];
  async enfileirar(fila: string, dados: object): Promise<void> {
    this.jobs.push({ fila, dados });
  }
  async onApplicationShutdown(): Promise<void> {}
}

describe.skipIf(!temBanco)("radar (e2e)", () => {
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
        nomeCorretora: "Corretora Radar E2E",
        nome: "Ana",
        email: `${sufixo}@teste.dev`,
        senha: "senha-forte-123",
      });
    token = reg.body.accessToken;
    tenantId = reg.body.usuario.tenantId;

    await request(http)
      .post("/api/seguradoras/vinculos")
      .set("Authorization", `Bearer ${token}`)
      .send({ insurerSlug: "porto-seguro" });

    // Apólice com parcela atrasada + flow em andamento
    const criada = await request(http)
      .post("/api/carteira/apolices")
      .set("Authorization", `Bearer ${token}`)
      .send({
        insurerSlug: "porto-seguro",
        numero: "RDE2E-1",
        ramo: "AUTO",
        seguradoNome: "Atrasado da Silva",
        seguradoDocumento: "111.444.777-35",
        inicioVigencia: "2026-01-01",
        fimVigencia: "2027-01-01",
        premioTotal: 1200,
        percentComissaoEsperado: 20,
        parcelas: [
          { numero: 1, valor: 100, vencimento: "2026-08-10" },
          { numero: 2, valor: 100, vencimento: "2026-12-10" },
        ],
      });
    const parcelaId = criada.body.parcelas[0].id;
    await limpeza.installment.update({
      where: { id: parcelaId },
      data: { status: "ATRASADA", diasAtraso: 20 },
    });
    await limpeza.recoveryFlow.create({
      data: {
        tenantId,
        installmentId: parcelaId,
        valorComissaoEmRisco: "40.00",
        steps: {
          create: [
            {
              tenantId,
              ordem: 1,
              canal: "EMAIL",
              agendadaPara: new Date("2026-08-13"),
              status: "AGENDADA",
            },
          ],
        },
      },
    });
    // Um flow já ganho neste mês (parcela 2 de outra apólice fictícia — usa a mesma)
    const outra = await request(http)
      .post("/api/carteira/apolices")
      .set("Authorization", `Bearer ${token}`)
      .send({
        insurerSlug: "porto-seguro",
        numero: "RDE2E-2",
        ramo: "VIDA",
        seguradoNome: "Recuperado Souza",
        seguradoDocumento: "529.982.247-25",
        inicioVigencia: "2026-01-01",
        fimVigencia: "2027-01-01",
        premioTotal: 600,
        percentComissaoEsperado: 15,
        parcelas: [{ numero: 1, valor: 50, vencimento: "2026-08-01" }],
      });
    await limpeza.recoveryFlow.create({
      data: {
        tenantId,
        installmentId: outra.body.parcelas[0].id,
        valorComissaoEmRisco: "90.00",
        desfecho: "PAGOU",
        encerradoEm: new Date(),
      },
    });
  });

  afterAll(async () => {
    await limpeza.auditLog.deleteMany({ where: { tenantId } });
    await limpeza.recoveryStep.deleteMany({ where: { tenantId } });
    await limpeza.recoveryFlow.deleteMany({ where: { tenantId } });
    await limpeza.installment.deleteMany({ where: { tenantId } });
    await limpeza.policy.deleteMany({ where: { tenantId } });
    await limpeza.insurerAccount.deleteMany({ where: { tenantId } });
    await limpeza.user.deleteMany({ where: { tenantId } });
    await limpeza.tenant.deleteMany({ where: { id: tenantId } });
    await limpeza.$disconnect();
    await app.close();
  });

  it("resumo traz atraso, risco e o painel de resultado do mês", async () => {
    const res = await request(http)
      .get("/api/radar/resumo")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.parcelasAtrasadas).toBe(1);
    expect(Number(res.body.valorEmAtraso)).toBe(100);
    expect(Number(res.body.comissaoEmRisco)).toBe(40);
    expect(res.body.mesAtual.apolicesSalvas).toBe(1);
    expect(Number(res.body.mesAtual.comissaoPreservada)).toBe(90);
  });

  it("lista parcelas atrasadas com documento mascarado e etapas da régua", async () => {
    const res = await request(http)
      .get("/api/radar/parcelas-atrasadas")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    const item = res.body[0];
    expect(item.diasAtraso).toBe(20);
    expect(item.apolice.seguradoDocumento).toBe("***.444.777-**");
    expect(item.regua.etapas).toHaveLength(1);
    expect(item.regua.comissaoEmRisco).toBe("40.00");
  });

  it("filtra por ramo", async () => {
    const res = await request(http)
      .get("/api/radar/parcelas-atrasadas?ramo=VIDA")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body).toHaveLength(0);
  });

  it("executar enfileira a varredura do tenant", async () => {
    const res = await request(http)
      .post("/api/radar/executar")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(201);
    const job = filaFake.jobs.find((j) => j.fila === "regua");
    expect(job?.dados).toMatchObject({ tenantId });
  });
});
