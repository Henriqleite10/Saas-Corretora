/**
 * Integração do pipeline de parsing contra Postgres real:
 * upload fixture → processarExtrato → entradas canônicas + rejeições no banco.
 */
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PrismaClient, carregarEnvRaiz, gerarDek } from "@radar/db";
import {
  fixturePdfEscaneado,
  fixturePortoSeguroXlsxV1,
  fixtureTokioMarineXlsxV1,
} from "@radar/parsers/fixtures";
import { processarExtrato } from "./parsing.js";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);

describe.skipIf(!temBanco)("processarExtrato (integração)", () => {
  const sistema = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const app = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL_APP });
  const dir = mkdtempSync(join(tmpdir(), "radar-extratos-"));
  let tenantId = "";
  let portoId = "";
  let tokioId = "";
  let bradescoId = "";

  async function criarStatement(
    insurerSlug: string,
    nome: string,
    conteudo: Buffer,
  ): Promise<string> {
    const insurer = await sistema.insurer.findUniqueOrThrow({ where: { slug: insurerSlug } });
    const caminho = join(dir, nome);
    writeFileSync(caminho, conteudo);
    const statement = await sistema.commissionStatement.create({
      data: {
        tenantId,
        insurerId: insurer.id,
        competencia: "2026-08",
        arquivoNome: nome,
        arquivoPath: caminho,
        arquivoHash: `${insurerSlug}-${nome}-${Date.now()}`,
      },
    });
    return statement.id;
  }

  beforeAll(async () => {
    const tenant = await sistema.tenant.create({
      data: {
        nome: "Corretora Parsing",
        configRegua: [],
        dekEnc: new Uint8Array(gerarDek()),
      },
    });
    tenantId = tenant.id;
    portoId = await criarStatement("porto-seguro", "porto.xlsx", fixturePortoSeguroXlsxV1());
    tokioId = await criarStatement("tokio-marine", "tokio.xlsx", fixtureTokioMarineXlsxV1());
    bradescoId = await criarStatement("bradesco-seguros", "scan.pdf", await fixturePdfEscaneado());
  });

  afterAll(async () => {
    await sistema.commissionEntry.deleteMany({ where: { tenantId } });
    await sistema.commissionStatement.deleteMany({ where: { tenantId } });
    await sistema.tenant.deleteMany({ where: { id: tenantId } });
    await Promise.all([sistema.$disconnect(), app.$disconnect()]);
  });

  it("normaliza extrato Porto (v1): 5 entradas + 2 rejeições, com hash de documento", async () => {
    await processarExtrato({ statementId: portoId, tenantId }, app);

    const statement = await sistema.commissionStatement.findUniqueOrThrow({
      where: { id: portoId },
    });
    expect(statement.status).toBe("PROCESSADO_COM_ERROS");
    expect(statement.formatVersion).toBe("xlsx-v1");
    expect(statement.linhasTotais).toBe(7);
    expect(statement.linhasRejeitadas).toHaveLength(2);

    const entradas = await sistema.commissionEntry.findMany({
      where: { statementId: portoId },
      orderBy: { linhaOrigem: "asc" },
    });
    expect(entradas).toHaveLength(5);
    expect(entradas[0]!.numeroApolice).toBe("531.123.456");
    expect(entradas[0]!.seguradoDocHash).toMatch(/^[0-9a-f]{64}$/); // HMAC, nunca o CPF
    expect(entradas[0]!.valorComissao.toFixed(2)).toBe("37.10");
  });

  it("reprocessamento é idempotente (não duplica entradas)", async () => {
    await processarExtrato({ statementId: portoId, tenantId }, app);
    const total = await sistema.commissionEntry.count({ where: { statementId: portoId } });
    expect(total).toBe(5);
  });

  it("extrato Tokio processa com competência por linha", async () => {
    await processarExtrato({ statementId: tokioId, tenantId }, app);
    const entradas = await sistema.commissionEntry.findMany({ where: { statementId: tokioId } });
    expect(entradas).toHaveLength(4);
    expect(entradas.every((e) => e.competencia === "2026-08")).toBe(true);
  });

  it("PDF escaneado marca FALHOU com orientação sobre OCR", async () => {
    await processarExtrato({ statementId: bradescoId, tenantId }, app);
    const statement = await sistema.commissionStatement.findUniqueOrThrow({
      where: { id: bradescoId },
    });
    expect(statement.status).toBe("FALHOU");
    const rejeitadas = statement.linhasRejeitadas as { motivo: string }[];
    expect(rejeitadas[0]!.motivo).toContain("OCR");
  });
});
