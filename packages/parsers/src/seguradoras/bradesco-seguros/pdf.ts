import {
  EntradaCanonicaSchema,
  competenciaNormalizada,
  dataPtBr,
  numeroPtBr,
  normalizarDocumento,
} from "@radar/core";
import type { EntradaCanonica, LinhaRejeitada, ResultadoParsing } from "@radar/core";
import { ehArquivoPdf, extrairTextoPdf } from "../../helpers/pdf.js";
import type { ArquivoBruto, MetaExtrato, StatementParser } from "../../tipos.js";

/**
 * Demonstrativo de comissões da Bradesco em PDF (com camada de texto).
 * Cada lançamento é uma linha no padrão:
 *   APOLICE 993377 PARC 02 SEGURADO MARIA OLIVEIRA CPF 111.444.777-35
 *   PREMIO 250,00 COM 20,00% VALOR 50,00 PAGO 15/08/2026
 * PDFs escaneados (sem texto) não são suportados — OCR fora do escopo.
 */
const LANCAMENTO =
  /^APOLICE\s+(\S+)\s+PARC\s+(\d+)\s+SEGURADO\s+(.+?)\s+(CPF|CNPJ)\s+([\d./-]+)\s+PREMIO\s+([\d.,]+)\s+COM\s+([\d.,]+)%\s+VALOR\s+(-?[\d.,]+)\s+PAGO\s+(\d{2}\/\d{2}\/\d{4})\s*$/;

/**
 * PDFs quebram lançamentos longos em múltiplas linhas visuais. Reagrupa:
 * cada registro começa em "APOLICE" e absorve as linhas seguintes até o próximo.
 */
function reagruparLancamentos(linhas: string[]): { texto: string; linha: number }[] {
  const registros: { texto: string; linha: number }[] = [];
  let atual: { texto: string; linha: number } | null = null;
  linhas.forEach((linha, i) => {
    if (linha.toUpperCase().startsWith("APOLICE")) {
      if (atual) registros.push(atual);
      atual = { texto: linha, linha: i + 1 };
    } else if (atual && linha) {
      atual.texto += ` ${linha}`;
    }
  });
  if (atual) registros.push(atual);
  return registros;
}

export const bradescoSegurosPdfV1: StatementParser = {
  insurerSlug: "bradesco-seguros",
  formatVersion: "pdf-v1",

  async detectar(arquivo: ArquivoBruto): Promise<number> {
    if (!ehArquivoPdf(arquivo.conteudo)) return 0;
    const texto = await extrairTextoPdf(arquivo.conteudo);
    if (!texto.trim()) return 0; // PDF escaneado/sem camada de texto
    if (!texto.toUpperCase().includes("BRADESCO")) return 0;
    return texto.includes("DEMONSTRATIVO DE COMISS") ? 0.9 : 0.3;
  },

  async parsear(arquivo: ArquivoBruto, meta: MetaExtrato): Promise<ResultadoParsing> {
    const texto = await extrairTextoPdf(arquivo.conteudo);
    const linhas = texto.split("\n").map((l) => l.trim());
    const entradas: EntradaCanonica[] = [];
    const rejeitadas: LinhaRejeitada[] = [];

    let competencia = meta.competencia;
    for (const linha of linhas) {
      const m = /compet[êe]ncia[:\s]*([\d/ -]+)/i.exec(linha);
      if (m) {
        const norm = competenciaNormalizada(m[1]!.trim());
        if (norm) competencia = norm;
        break;
      }
    }

    for (const registro of reagruparLancamentos(linhas)) {
      const numeroLinha = registro.linha;
      const texto = registro.texto.replace(/\s+/g, " ").trim();
      const m = LANCAMENTO.exec(texto);
      if (!m) {
        rejeitadas.push({
          linha: numeroLinha,
          motivo: "Lançamento fora do padrão esperado do demonstrativo",
          conteudoBruto: texto,
        });
        continue;
      }
      const documento = normalizarDocumento(m[5]!);
      const candidata = {
        numeroApolice: m[1]!,
        numeroParcela: Number(m[2]!),
        seguradoNome: m[3]!,
        seguradoDocumento: documento.length === 11 || documento.length === 14 ? documento : null,
        competencia,
        premioParcela: numeroPtBr(m[6]!),
        valorComissao: numeroPtBr(m[8]!) ?? Number.NaN,
        percentComissao: numeroPtBr(m[7]!),
        dataPagamento: dataPtBr(m[9]!),
        linhaOrigem: numeroLinha,
        dadosBrutos: { linha: texto },
      };
      const valida = EntradaCanonicaSchema.safeParse(candidata);
      if (!valida.success) {
        rejeitadas.push({
          linha: numeroLinha,
          motivo: `Lançamento não passa no schema canônico: ${valida.error.issues[0]!.message}`,
          conteudoBruto: texto,
        });
        continue;
      }
      entradas.push(valida.data);
    }

    return { entradas, rejeitadas };
  },
};
