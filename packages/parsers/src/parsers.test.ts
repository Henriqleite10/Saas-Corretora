import { describe, expect, it } from "vitest";
import { competenciaNormalizada, dataPtBr, numeroPtBr } from "@radar/core";
import {
  FormatoNaoReconhecidoError,
  bradescoSegurosPdfV1,
  portoSeguroXlsxV1,
  portoSeguroXlsxV2,
  registroPadrao,
  tokioMarineXlsxV1,
} from "./index.js";
import {
  fixtureBradescoSegurosPdfV1,
  fixturePdfEscaneado,
  fixturePortoSeguroXlsxV1,
  fixturePortoSeguroXlsxV2,
  fixtureTokioMarineXlsxV1,
} from "./fixtures/index.js";

const meta = (insurerSlug: string) => ({ insurerSlug, competencia: "2026-08" });

describe("normalização pt-BR", () => {
  it("converte números com milhar e vírgula", () => {
    expect(numeroPtBr("1.234,56")).toBe(1234.56);
    expect(numeroPtBr("R$ 2.000,00")).toBe(2000);
    expect(numeroPtBr("-75,60")).toBe(-75.6);
    expect(numeroPtBr("20,00%")).toBe(20);
    expect(numeroPtBr("ISENTO")).toBeNull();
  });

  it("converte datas dd/mm/aaaa", () => {
    expect(dataPtBr("15/08/2026")?.toISOString().slice(0, 10)).toBe("2026-08-15");
    expect(dataPtBr("salvo engano")).toBeNull();
  });

  it("normaliza competência", () => {
    expect(competenciaNormalizada("08/2026")).toBe("2026-08");
    expect(competenciaNormalizada("2026-08")).toBe("2026-08");
    expect(competenciaNormalizada("13/2026")).toBeNull();
  });
});

describe("Porto Seguro XLSX v1", () => {
  it("extrai lançamentos válidos e rejeita linhas problemáticas com motivo", async () => {
    const { entradas, rejeitadas } = await portoSeguroXlsxV1.parsear(
      { nome: "porto.xlsx", conteudo: fixturePortoSeguroXlsxV1() },
      meta("porto-seguro"),
    );
    expect(entradas).toHaveLength(5);
    expect(rejeitadas).toHaveLength(2);
    expect(rejeitadas[0]!.motivo).toContain("ISENTO");
    expect(rejeitadas[1]!.motivo).toContain("CPF/CNPJ inválido");

    const primeira = entradas[0]!;
    expect(primeira.numeroApolice).toBe("531.123.456");
    expect(primeira.numeroParcela).toBe(1);
    expect(primeira.seguradoDocumento).toBe("11144477735");
    expect(primeira.valorComissao).toBeCloseTo(37.1);
    expect(primeira.premioParcela).toBeCloseTo(185.5);
    expect(primeira.competencia).toBe("2026-08"); // extraída do cabeçalho do arquivo
    expect(primeira.dataPagamento?.toISOString().slice(0, 10)).toBe("2026-08-05");

    const cnpj = entradas.find((e) => e.numeroApolice === "531.555.000")!;
    expect(cnpj.seguradoDocumento).toBe("12345678000195");
    expect(cnpj.valorComissao).toBeCloseTo(435.11);
  });

  it("rastreia a linha de origem de cada entrada e rejeição", async () => {
    const { entradas, rejeitadas } = await portoSeguroXlsxV1.parsear(
      { nome: "porto.xlsx", conteudo: fixturePortoSeguroXlsxV1() },
      meta("porto-seguro"),
    );
    expect(entradas[0]!.linhaOrigem).toBe(6); // dados começam após 5 linhas de cabeçalho
    expect(rejeitadas[0]!.linha).toBe(11);
  });
});

describe("Porto Seguro XLSX v2 (layout renomeado)", () => {
  it("parseia o layout novo e herda a competência do arquivo", async () => {
    const { entradas, rejeitadas } = await portoSeguroXlsxV2.parsear(
      { nome: "porto-v2.xlsx", conteudo: fixturePortoSeguroXlsxV2() },
      meta("porto-seguro"),
    );
    expect(rejeitadas).toHaveLength(0);
    expect(entradas).toHaveLength(2);
    expect(entradas[0]!.competencia).toBe("2026-09");
  });
});

describe("Tokio Marine XLSX v1", () => {
  it("usa competência por linha e aceita estorno (valor negativo)", async () => {
    const { entradas, rejeitadas } = await tokioMarineXlsxV1.parsear(
      { nome: "tokio.xlsx", conteudo: fixtureTokioMarineXlsxV1() },
      meta("tokio-marine"),
    );
    expect(entradas).toHaveLength(4);
    expect(rejeitadas).toHaveLength(1);
    expect(rejeitadas[0]!.motivo).toContain("Data de pagamento inválida");

    const estorno = entradas.find((e) => e.valorComissao < 0)!;
    expect(estorno.valorComissao).toBeCloseTo(-75.6);
    expect(entradas[0]!.competencia).toBe("2026-08");
  });
});

describe("Bradesco Seguros PDF v1", () => {
  it("extrai lançamentos do PDF texto e rejeita os fora do padrão", async () => {
    const conteudo = await fixtureBradescoSegurosPdfV1();
    const { entradas, rejeitadas } = await bradescoSegurosPdfV1.parsear(
      { nome: "bradesco.pdf", conteudo },
      meta("bradesco-seguros"),
    );
    expect(entradas).toHaveLength(4);
    expect(rejeitadas).toHaveLength(1);
    expect(rejeitadas[0]!.conteudoBruto).toContain("AJUSTE DIVERSOS");

    const cnpj = entradas.find((e) => e.numeroApolice === "994002")!;
    expect(cnpj.seguradoDocumento).toBe("12345678000195");
    expect(cnpj.premioParcela).toBeCloseTo(3900);
    expect(cnpj.percentComissao).toBeCloseTo(8.5);
    expect(cnpj.valorComissao).toBeCloseTo(331.5);
  });
});

describe("registro e detecção automática", () => {
  it("resolve o parser certo por seguradora e versão de formato", async () => {
    const registro = registroPadrao();
    const v1 = await registro.resolver("porto-seguro", {
      nome: "a.xlsx",
      conteudo: fixturePortoSeguroXlsxV1(),
    });
    expect(v1.formatVersion).toBe("xlsx-v1");

    const v2 = await registro.resolver("porto-seguro", {
      nome: "b.xlsx",
      conteudo: fixturePortoSeguroXlsxV2(),
    });
    expect(v2.formatVersion).toBe("xlsx-v2");

    const bradesco = await registro.resolver("bradesco-seguros", {
      nome: "c.pdf",
      conteudo: await fixtureBradescoSegurosPdfV1(),
    });
    expect(bradesco.formatVersion).toBe("pdf-v1");
  });

  it("arquivo de outra seguradora não é aceito", async () => {
    await expect(
      registroPadrao().resolver("tokio-marine", {
        nome: "a.xlsx",
        conteudo: fixturePortoSeguroXlsxV1(),
      }),
    ).rejects.toThrow(FormatoNaoReconhecidoError);
  });

  it("PDF escaneado (sem texto) é recusado com orientação sobre OCR", async () => {
    await expect(
      registroPadrao().resolver("bradesco-seguros", {
        nome: "scan.pdf",
        conteudo: await fixturePdfEscaneado(),
      }),
    ).rejects.toThrow(/OCR/);
  });
});
