/**
 * Integração do Radar de Inadimplência contra Postgres real:
 * parcelas vencidas → ATRASADA + flow + etapas; pagamento → PAGOU;
 * opt-out e apólice cancelada nunca entram na régua.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CONFIG_REGUA_PADRAO } from "@radar/core";
import { PrismaClient, RamoSeguro, carregarEnvRaiz, gerarDek } from "@radar/db";
import { processarReguaTenant } from "./regua.js";

carregarEnvRaiz();

const temBanco = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL_APP);
const HOJE = new Date("2026-08-30T12:00:00Z");

describe.skipIf(!temBanco)("processarReguaTenant (integração)", () => {
  const sistema = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const app = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL_APP });
  let tenantId = "";
  let insurerId = "";
  let parcelaAtrasadaId = "";
  let parcelaOptOutId = "";

  async function criarApolice(opts: {
    numero: string;
    optOut?: boolean;
    statusApolice?: "ATIVA" | "CANCELADA";
    vencimento: Date;
  }) {
    return sistema.policy.create({
      data: {
        tenantId,
        insurerId,
        numero: opts.numero,
        ramo: RamoSeguro.AUTO,
        status: opts.statusApolice ?? "ATIVA",
        seguradoNome: `Segurado ${opts.numero}`,
        seguradoDocEnc: new Uint8Array(Buffer.from("x")),
        seguradoDocHash: `hash-${opts.numero}`,
        seguradoOptOut: opts.optOut ?? false,
        inicioVigencia: new Date("2026-01-01"),
        fimVigencia: new Date("2027-01-01"),
        premioTotal: "1200.00",
        percentComissaoEsperado: "20.00",
        installments: {
          create: [
            { tenantId, numero: 1, valor: "100.00", vencimento: opts.vencimento },
            { tenantId, numero: 2, valor: "100.00", vencimento: new Date("2026-12-10") },
          ],
        },
      },
      include: { installments: { orderBy: { numero: "asc" } } },
    });
  }

  beforeAll(async () => {
    const insurer = await sistema.insurer.findFirstOrThrow({ where: { slug: "porto-seguro" } });
    insurerId = insurer.id;
    const tenant = await sistema.tenant.create({
      data: {
        nome: "Corretora Radar",
        configRegua: CONFIG_REGUA_PADRAO,
        dekEnc: new Uint8Array(gerarDek()),
      },
    });
    tenantId = tenant.id;

    const atrasada = await criarApolice({ numero: "RD-1", vencimento: new Date("2026-08-20") });
    parcelaAtrasadaId = atrasada.installments[0]!.id;
    const optOut = await criarApolice({
      numero: "RD-2",
      optOut: true,
      vencimento: new Date("2026-08-20"),
    });
    parcelaOptOutId = optOut.installments[0]!.id;
    await criarApolice({
      numero: "RD-3",
      statusApolice: "CANCELADA",
      vencimento: new Date("2026-08-20"),
    });
    await criarApolice({ numero: "RD-4", vencimento: new Date("2026-09-20") }); // em dia
  });

  afterAll(async () => {
    await sistema.auditLog.deleteMany({ where: { tenantId } });
    await sistema.recoveryStep.deleteMany({ where: { tenantId } });
    await sistema.recoveryFlow.deleteMany({ where: { tenantId } });
    await sistema.installment.deleteMany({ where: { tenantId } });
    await sistema.policy.deleteMany({ where: { tenantId } });
    await sistema.tenant.deleteMany({ where: { id: tenantId } });
    await Promise.all([sistema.$disconnect(), app.$disconnect()]);
  });

  it("marca atraso e abre flow com etapas só para parcelas elegíveis", async () => {
    const resultado = await processarReguaTenant(tenantId, app, HOJE);
    // RD-1, RD-2 e RD-3 vencidas → marcadas; mas régua só para RD-1
    expect(resultado.parcelasMarcadas).toBe(3);
    expect(resultado.flowsAbertos).toBe(1);

    const parcela = await sistema.installment.findUniqueOrThrow({
      where: { id: parcelaAtrasadaId },
    });
    expect(parcela.status).toBe("ATRASADA");
    expect(parcela.diasAtraso).toBe(10);

    const flows = await sistema.recoveryFlow.findMany({
      where: { tenantId },
      include: { steps: { orderBy: { ordem: "asc" } } },
    });
    expect(flows).toHaveLength(1);
    expect(flows[0]!.installmentId).toBe(parcelaAtrasadaId);
    // comissão em risco: 2 parcelas de R$100 não pagas × 20%
    expect(flows[0]!.valorComissaoEmRisco.toFixed(2)).toBe("40.00");
    expect(flows[0]!.steps).toHaveLength(CONFIG_REGUA_PADRAO.length);
    expect(flows[0]!.steps[0]!.agendadaPara.toISOString().slice(0, 10)).toBe("2026-08-23");

    // opt-out nunca entra na régua
    const flowOptOut = await sistema.recoveryFlow.findUnique({
      where: { installmentId: parcelaOptOutId },
    });
    expect(flowOptOut).toBeNull();
  });

  it("reexecução é idempotente", async () => {
    const resultado = await processarReguaTenant(tenantId, app, HOJE);
    expect(resultado.flowsAbertos).toBe(0);
    expect(await sistema.recoveryFlow.count({ where: { tenantId } })).toBe(1);
  });

  it("com várias etapas já vencidas, redige só a mais recente e pula as anteriores", async () => {
    // parcela venceu 2026-08-20; régua padrão: +3 (23/08) e +12 (01/09), +25 (14/09).
    // Em 05/09, etapas 1 e 2 estão vencidas → só a 2 vai para redação.
    const enfileirados: string[] = [];
    const resultado = await processarReguaTenant(
      tenantId,
      app,
      new Date("2026-09-05T12:00:00Z"),
      async (stepId) => {
        enfileirados.push(stepId);
      },
    );
    expect(resultado.draftsEnfileirados).toBe(1);
    expect(enfileirados).toHaveLength(1);

    const steps = await sistema.recoveryStep.findMany({
      where: { tenantId, flow: { installmentId: parcelaAtrasadaId } },
      orderBy: { ordem: "asc" },
    });
    expect(steps[0]!.status).toBe("CANCELADA"); // pulada
    expect(steps[1]!.id).toBe(enfileirados[0]); // a mais recente vencida
    expect(steps[2]!.status).toBe("AGENDADA"); // futura segue agendada
  });

  it("pagamento encerra o flow como PAGOU e cancela etapas pendentes", async () => {
    await sistema.installment.update({
      where: { id: parcelaAtrasadaId },
      data: { status: "PAGA", pagaEm: HOJE },
    });
    const resultado = await processarReguaTenant(tenantId, app, HOJE);
    expect(resultado.flowsEncerrados).toBe(1);

    const flow = await sistema.recoveryFlow.findUniqueOrThrow({
      where: { installmentId: parcelaAtrasadaId },
      include: { steps: true },
    });
    expect(flow.desfecho).toBe("PAGOU");
    expect(flow.encerradoEm).not.toBeNull();
    expect(flow.steps.every((s) => s.status === "CANCELADA")).toBe(true);
  });
});
