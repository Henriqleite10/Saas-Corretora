/**
 * E2E da carteira: vínculo com seguradora, CRUD de apólice com PII mascarada,
 * revelação auditada de documento, pagamento e importação de planilha
 * (linhas boas importam; linhas ruins viram relatório, nunca falha silenciosa).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import * as XLSX from "xlsx";
import { PrismaClient, carregarEnvRaiz } from "@radar/db";
import { AppModule } from "../app.module";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);
const sufixo = `cart-${Date.now().toString(36)}`;

describe.skipIf(!temBanco)("carteira (e2e)", () => {
  let app: INestApplication;
  let http: ReturnType<INestApplication["getHttpServer"]>;
  const limpeza = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  let tenantId = "";
  let tokenAdmin = "";
  let tokenCorretor = "";
  let apoliceId = "";
  let parcelaId = "";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
    http = app.getHttpServer();

    const reg = await request(http)
      .post("/api/auth/registrar")
      .send({
        nomeCorretora: "Corretora Carteira",
        nome: "Ana Admin",
        email: `${sufixo}-admin@teste.dev`,
        senha: "senha-forte-123",
      });
    tokenAdmin = reg.body.accessToken;
    tenantId = reg.body.usuario.tenantId;

    await request(http)
      .post("/api/auth/usuarios")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        nome: "Carlos Corretor",
        email: `${sufixo}-corretor@teste.dev`,
        senha: "senha-forte-123",
        papel: "CORRETOR",
      });
    const login = await request(http)
      .post("/api/auth/login")
      .send({ email: `${sufixo}-corretor@teste.dev`, senha: "senha-forte-123" });
    tokenCorretor = login.body.accessToken;
  });

  afterAll(async () => {
    await limpeza.auditLog.deleteMany({ where: { tenantId } });
    await limpeza.installment.deleteMany({ where: { tenantId } });
    await limpeza.policy.deleteMany({ where: { tenantId } });
    await limpeza.insurerAccount.deleteMany({ where: { tenantId } });
    await limpeza.user.deleteMany({ where: { tenantId } });
    await limpeza.tenant.deleteMany({ where: { id: tenantId } });
    await limpeza.$disconnect();
    await app.close();
  });

  it("lista o catálogo global e cria vínculo com seguradora", async () => {
    const catalogo = await request(http)
      .get("/api/seguradoras")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(catalogo.status).toBe(200);
    const slugs = catalogo.body.map((s: { slug: string }) => s.slug);
    expect(slugs).toContain("porto-seguro");

    const vinculo = await request(http)
      .post("/api/seguradoras/vinculos")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ insurerSlug: "porto-seguro", codigoSusep: "12345" });
    expect(vinculo.status).toBe(201);
    expect(vinculo.body.insurer.slug).toBe("porto-seguro");
  });

  it("cria apólice com parcelas e devolve PII mascarada", async () => {
    const res = await request(http)
      .post("/api/carteira/apolices")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        insurerSlug: "porto-seguro",
        numero: "AP-0001",
        ramo: "AUTO",
        seguradoNome: "João da Silva",
        seguradoDocumento: "123.456.789-01",
        seguradoEmail: "joao@exemplo.com",
        seguradoTelefone: "(11) 91234-5678",
        inicioVigencia: "2026-01-01",
        fimVigencia: "2027-01-01",
        premioTotal: 2400,
        percentComissaoEsperado: 20,
        parcelas: [
          { numero: 1, valor: 200, vencimento: "2026-01-10" },
          { numero: 2, valor: 200, vencimento: "2026-02-10" },
        ],
      });
    expect(res.status).toBe(201);
    expect(res.body.seguradoDocumento).toBe("***.456.789-**");
    expect(res.body.seguradoEmail).toBe("j***@exemplo.com");
    expect(res.body.seguradoTelefone).toBe("*******5678");
    expect(res.body.parcelas).toHaveLength(2);
    apoliceId = res.body.id;
    parcelaId = res.body.parcelas[0].id;
  });

  it("nunca persiste documento em claro no banco", async () => {
    const linha = await limpeza.policy.findUniqueOrThrow({ where: { id: apoliceId } });
    const bruto = Buffer.from(linha.seguradoDocEnc).toString("utf8");
    expect(bruto).not.toContain("12345678901");
    expect(linha.seguradoDocHash).not.toContain("12345678901");
  });

  it("rejeita apólice duplicada (mesma seguradora + número)", async () => {
    const res = await request(http)
      .post("/api/carteira/apolices")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        insurerSlug: "porto-seguro",
        numero: "AP-0001",
        ramo: "VIDA",
        seguradoNome: "Outra Pessoa",
        seguradoDocumento: "987.654.321-00",
        inicioVigencia: "2026-01-01",
        fimVigencia: "2027-01-01",
        premioTotal: 100,
        percentComissaoEsperado: 10,
        parcelas: [{ numero: 1, valor: 100, vencimento: "2026-01-10" }],
      });
    expect(res.status).toBe(409);
  });

  it("ADMIN revela documento completo (com auditoria); CORRETOR não", async () => {
    const ok = await request(http)
      .get(`/api/carteira/apolices/${apoliceId}/documento`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(ok.status).toBe(200);
    expect(ok.body.documento).toBe("12345678901");

    const negado = await request(http)
      .get(`/api/carteira/apolices/${apoliceId}/documento`)
      .set("Authorization", `Bearer ${tokenCorretor}`);
    expect(negado.status).toBe(403);

    const trilha = await limpeza.auditLog.findMany({
      where: { tenantId, acao: "pii_revelada", entidadeId: apoliceId },
    });
    expect(trilha.length).toBe(1);
  });

  it("registra pagamento de parcela", async () => {
    const res = await request(http)
      .post(`/api/carteira/parcelas/${parcelaId}/pagamento`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({});
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("PAGA");

    const denovo = await request(http)
      .post(`/api/carteira/parcelas/${parcelaId}/pagamento`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({});
    expect(denovo.status).toBe(409);
  });

  it("importa planilha: linhas válidas entram, inválidas viram relatório", async () => {
    const linhas = [
      {
        seguradora: "Tokio Marine",
        numero_apolice: "TK-100",
        ramo: "vida",
        segurado_nome: "Maria Souza",
        segurado_documento: "111.444.777-35",
        segurado_email: "maria@exemplo.com",
        segurado_telefone: "11988887777",
        inicio_vigencia: "01/03/2026",
        fim_vigencia: "01/03/2027",
        premio_total: 1200,
        percent_comissao: 15,
        qtd_parcelas: 3,
        valor_parcela: 100,
        primeiro_vencimento: "10/03/2026",
      },
      {
        seguradora: "Seguradora Fantasma",
        numero_apolice: "XX-1",
        ramo: "AUTO",
        segurado_nome: "Pedro Teste",
        segurado_documento: "22233344405",
        inicio_vigencia: "01/03/2026",
        fim_vigencia: "01/03/2027",
        premio_total: 500,
        percent_comissao: 10,
        qtd_parcelas: 1,
        valor_parcela: 500,
        primeiro_vencimento: "10/03/2026",
      },
      {
        seguradora: "bradesco-seguros",
        numero_apolice: "BR-200",
        ramo: "SAÚDE",
        segurado_nome: "Empresa XPTO Ltda",
        segurado_documento: "12.345.678/0001-99",
        inicio_vigencia: "15/02/2026",
        fim_vigencia: "15/02/2027",
        premio_total: 6000,
        percent_comissao: 8,
        qtd_parcelas: 2,
        valor_parcela: 500,
        primeiro_vencimento: "20/02/2026",
      },
      {
        seguradora: "porto-seguro",
        numero_apolice: "AP-0001", // duplicada — já existe
        ramo: "AUTO",
        segurado_nome: "Duplicado da Silva",
        segurado_documento: "55566677705",
        inicio_vigencia: "01/01/2026",
        fim_vigencia: "01/01/2027",
        premio_total: 100,
        percent_comissao: 5,
        qtd_parcelas: 1,
        valor_parcela: 100,
        primeiro_vencimento: "05/01/2026",
      },
      {
        seguradora: "tokio-marine",
        numero_apolice: "TK-101",
        ramo: "RAMO_INEXISTENTE",
        segurado_nome: "Linha Inválida",
        segurado_documento: "123",
        inicio_vigencia: "01/01/2026",
        fim_vigencia: "01/01/2027",
        premio_total: 100,
        percent_comissao: 5,
        qtd_parcelas: 1,
        valor_parcela: 100,
        primeiro_vencimento: "05/01/2026",
      },
    ];
    const aba = XLSX.utils.json_to_sheet(linhas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, aba, "Carteira");
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;

    const res = await request(http)
      .post("/api/carteira/importar")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .attach("arquivo", buffer, "carteira.xlsx");

    expect(res.status).toBe(201);
    expect(res.body.totalLinhas).toBe(5);
    expect(res.body.importadas).toBe(2); // TK-100 e BR-200
    expect(res.body.rejeitadas).toHaveLength(3);
    const motivos = res.body.rejeitadas.map((r: { motivo: string }) => r.motivo).join(" | ");
    expect(motivos).toContain("Fantasma");

    // parcelas geradas mensalmente a partir do primeiro vencimento
    const tk = await limpeza.policy.findFirstOrThrow({
      where: { tenantId, numero: "TK-100" },
      include: { installments: { orderBy: { numero: "asc" } } },
    });
    expect(tk.installments).toHaveLength(3);
    expect(tk.installments[1]!.vencimento.toISOString().slice(0, 10)).toBe("2026-04-10");
  });

  it("lista apólices com filtro e busca", async () => {
    const res = await request(http)
      .get("/api/carteira/apolices?busca=Maria")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(1);
    expect(res.body.itens[0].numero).toBe("TK-100");
  });

  it("marca opt-out do segurado via PATCH", async () => {
    const res = await request(http)
      .patch(`/api/carteira/apolices/${apoliceId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ seguradoOptOut: true });
    expect(res.status).toBe(200);
    expect(res.body.seguradoOptOut).toBe(true);
  });
});
