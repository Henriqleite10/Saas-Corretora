import type { ResultadoParsing } from "@radar/core";
import {
  celulaTexto,
  ehArquivoXlsx,
  lerMatrizXlsx,
  localizarCabecalho,
} from "../../helpers/planilha.js";
import { extrairCompetenciaDoTexto, parsearTabela } from "../../helpers/tabela.js";
import type { EspecColunas } from "../../helpers/tabela.js";
import type { ArquivoBruto, MetaExtrato, StatementParser } from "../../tipos.js";

const SLUG = "porto-seguro";

/**
 * Porto Seguro muda o layout do extrato sem avisar — cada versão vira um
 * parser registrado; a detecção automática escolhe pelo cabeçalho presente.
 */
function criarParserPorto(formatVersion: string, colunas: EspecColunas): StatementParser {
  return {
    insurerSlug: SLUG,
    formatVersion,

    async detectar(arquivo: ArquivoBruto): Promise<number> {
      if (!ehArquivoXlsx(arquivo.conteudo)) return 0;
      const matriz = lerMatrizXlsx(arquivo.conteudo);
      const temMarca = matriz
        .slice(0, 5)
        .some((linha) => linha.some((c) => celulaTexto(c).toUpperCase().includes("PORTO SEGURO")));
      if (!temMarca) return 0;
      const temCabecalho = localizarCabecalho(matriz, [colunas.apolice, colunas.valorComissao]);
      return temCabecalho ? 0.9 : 0.1;
    },

    async parsear(arquivo: ArquivoBruto, meta: MetaExtrato): Promise<ResultadoParsing> {
      const matriz = lerMatrizXlsx(arquivo.conteudo);
      const competenciaArquivo = extrairCompetenciaDoTexto(matriz);
      return parsearTabela(matriz, colunas, meta, competenciaArquivo);
    },
  };
}

export const portoSeguroXlsxV1 = criarParserPorto("xlsx-v1", {
  apolice: "Apólice",
  parcela: "Parcela",
  segurado: "Segurado",
  documento: "CPF/CNPJ",
  premio: "Prêmio (R$)",
  percent: "% Comissão",
  valorComissao: "Comissão (R$)",
  dataPagamento: "Data Pagamento",
});

export const portoSeguroXlsxV2 = criarParserPorto("xlsx-v2", {
  apolice: "Nr. Apólice",
  parcela: "Nº Parc.",
  segurado: "Nome Segurado",
  documento: "Documento",
  premio: "Prêmio Tarifário",
  percent: "Percentual",
  valorComissao: "Valor Comissão",
  dataPagamento: "Dt. Pagamento",
});
