/**
 * Fixtures sintéticas realistas dos extratos das seguradoras iniciais.
 * São a base dos testes de parser e podem ser exportadas para arquivo com
 * `pnpm --filter @radar/parsers gerar-fixtures` (útil para testar a UI à mão).
 *
 * Cada fixture inclui de propósito linhas problemáticas (valor inválido,
 * CPF quebrado, lançamento fora do padrão) para exercitar o relatório de
 * rejeições — nenhuma linha pode falhar silenciosamente.
 */
import PDFDocument from "pdfkit";
import * as XLSX from "xlsx";

function planilhaParaBuffer(linhas: unknown[][], nomeAba: string): Buffer {
  const aba = XLSX.utils.aoa_to_sheet(linhas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, aba, nomeAba);
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

/** 5 lançamentos válidos + 2 linhas inválidas (comissão não numérica, CPF quebrado). */
export function fixturePortoSeguroXlsxV1(): Buffer {
  return planilhaParaBuffer(
    [
      ["PORTO SEGURO CIA DE SEGUROS GERAIS", "", "", "", "", "", "", ""],
      ["Extrato de Comissões — Corretor 12345-J", "", "", "", "", "", "", ""],
      ["Competência: 08/2026", "", "", "", "", "", "", ""],
      [],
      [
        "Apólice",
        "Parcela",
        "Segurado",
        "CPF/CNPJ",
        "Prêmio (R$)",
        "% Comissão",
        "Comissão (R$)",
        "Data Pagamento",
      ],
      [
        "531.123.456",
        "1",
        "JOÃO CARLOS PEREIRA",
        "111.444.777-35",
        "185,50",
        "20,00",
        "37,10",
        "05/08/2026",
      ],
      [
        "531.123.456",
        "2",
        "JOÃO CARLOS PEREIRA",
        "111.444.777-35",
        "185,50",
        "20,00",
        "37,10",
        "28/08/2026",
      ],
      [
        "531.987.654",
        "4",
        "ANA BEATRIZ LIMA",
        "529.982.247-25",
        "1.250,00",
        "15,00",
        "187,50",
        "12/08/2026",
      ],
      [
        "531.555.000",
        "1",
        "TRANSPORTES XYZ LTDA",
        "12.345.678/0001-95",
        "3.480,90",
        "12,50",
        "435,11",
        "20/08/2026",
      ],
      [
        "531.222.333",
        "6",
        "CARLOS EDUARDO SANTOS",
        "390.533.447-05",
        "98,00",
        "22,00",
        "21,56",
        "31/08/2026",
      ],
      [
        "531.444.111",
        "2",
        "LINHA COM ERRO",
        "111.444.777-35",
        "100,00",
        "20,00",
        "ISENTO",
        "10/08/2026",
      ],
      ["531.444.222", "3", "CPF QUEBRADO", "123.45", "100,00", "20,00", "20,00", "10/08/2026"],
    ],
    "Comissões",
  );
}

/** Mesmo conteúdo em layout v2 (colunas renomeadas) — prova a detecção de versão. */
export function fixturePortoSeguroXlsxV2(): Buffer {
  return planilhaParaBuffer(
    [
      ["PORTO SEGURO CIA DE SEGUROS GERAIS — DEMONSTRATIVO", "", "", "", "", "", "", ""],
      ["Competência: 09/2026", "", "", "", "", "", "", ""],
      [
        "Nr. Apólice",
        "Nº Parc.",
        "Nome Segurado",
        "Documento",
        "Prêmio Tarifário",
        "Percentual",
        "Valor Comissão",
        "Dt. Pagamento",
      ],
      [
        "531.123.456",
        "3",
        "JOÃO CARLOS PEREIRA",
        "111.444.777-35",
        "185,50",
        "20,00",
        "37,10",
        "05/09/2026",
      ],
      [
        "531.987.654",
        "5",
        "ANA BEATRIZ LIMA",
        "529.982.247-25",
        "1.250,00",
        "15,00",
        "187,50",
        "12/09/2026",
      ],
    ],
    "Demonstrativo",
  );
}

/** Tokio Marine: competência por linha; inclui estorno (valor negativo) e 1 linha inválida. */
export function fixtureTokioMarineXlsxV1(): Buffer {
  return planilhaParaBuffer(
    [
      ["TOKIO MARINE SEGURADORA S.A.", "", "", "", "", "", "", "", ""],
      [
        "Nº Apólice",
        "Parc",
        "Nome do Segurado",
        "Documento",
        "Competência",
        "Prêmio Líquido",
        "Comissão %",
        "Valor Comissão",
        "Dt. Pagto",
      ],
      [
        "TM-88.001",
        "1",
        "FERNANDA COSTA",
        "852.741.963-09",
        "08/2026",
        "420,00",
        "18,00",
        "75,60",
        "08/08/2026",
      ],
      [
        "TM-88.002",
        "2",
        "RICARDO ALMEIDA",
        "741.852.963-70",
        "08/2026",
        "2.150,75",
        "10,00",
        "215,08",
        "15/08/2026",
      ],
      [
        "TM-88.003",
        "1",
        "PADARIA PÃO BOM LTDA",
        "98.765.432/0001-10",
        "08/2026",
        "890,00",
        "14,00",
        "124,60",
        "22/08/2026",
      ],
      [
        "TM-88.001",
        "1",
        "FERNANDA COSTA (ESTORNO)",
        "852.741.963-09",
        "08/2026",
        "420,00",
        "18,00",
        "-75,60",
        "29/08/2026",
      ],
      [
        "TM-88.004",
        "1",
        "SEM DATA VÁLIDA",
        "852.741.963-09",
        "08/2026",
        "100,00",
        "18,00",
        "18,00",
        "salvo engano",
      ],
    ],
    "Comissões",
  );
}

/** Bradesco em PDF texto; inclui 1 lançamento fora do padrão. */
export async function fixtureBradescoSegurosPdfV1(): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const pedacos: Buffer[] = [];
  doc.on("data", (p: Buffer) => pedacos.push(p));
  const pronto = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(pedacos)));
  });

  doc.fontSize(14).text("BRADESCO SEGUROS S.A.");
  doc.fontSize(11).text("DEMONSTRATIVO DE COMISSÕES");
  doc.text("Competência: 08/2026    Corretor: 98.765-J");
  doc.moveDown();
  doc.fontSize(9);
  const lancamentos = [
    "APOLICE 993377 PARC 02 SEGURADO MARIA OLIVEIRA CPF 111.444.777-35 PREMIO 250,00 COM 20,00% VALOR 50,00 PAGO 15/08/2026",
    "APOLICE 993401 PARC 01 SEGURADO JOSE HENRIQUE BRAGA CPF 529.982.247-25 PREMIO 1.180,40 COM 12,00% VALOR 141,65 PAGO 18/08/2026",
    "APOLICE 994002 PARC 05 SEGURADO MERCADO CENTRAL LTDA CNPJ 12.345.678/0001-95 PREMIO 3.900,00 COM 8,50% VALOR 331,50 PAGO 25/08/2026",
    "APOLICE 993377 PARC 03 SEGURADO MARIA OLIVEIRA CPF 111.444.777-35 PREMIO 250,00 COM 20,00% VALOR 50,00 PAGO 29/08/2026",
    "APOLICE 990001 LANÇAMENTO MANUAL AJUSTE DIVERSOS", // fora do padrão → rejeitada
  ];
  for (const l of lancamentos) {
    doc.text(l);
  }
  doc.end();
  return pronto;
}

/** PDF "escaneado": só imagem, sem camada de texto útil. */
export async function fixturePdfEscaneado(): Promise<Buffer> {
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const pedacos: Buffer[] = [];
  doc.on("data", (p: Buffer) => pedacos.push(p));
  const pronto = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(pedacos)));
  });
  doc.rect(50, 50, 500, 700).stroke(); // nenhuma linha de texto
  doc.end();
  return pronto;
}
