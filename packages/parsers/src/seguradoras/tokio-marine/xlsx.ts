import type { ResultadoParsing } from "@radar/core";
import {
  celulaTexto,
  ehArquivoXlsx,
  lerMatrizXlsx,
  localizarCabecalho,
} from "../../helpers/planilha.js";
import { extrairCompetenciaDoTexto, parsearTabela } from "../../helpers/tabela.js";
import type { ArquivoBruto, MetaExtrato, StatementParser } from "../../tipos.js";

const COLUNAS = {
  apolice: "Nº Apólice",
  parcela: "Parc",
  segurado: "Nome do Segurado",
  documento: "Documento",
  competencia: "Competência",
  premio: "Prêmio Líquido",
  percent: "Comissão %",
  valorComissao: "Valor Comissão",
  dataPagamento: "Dt. Pagto",
};

export const tokioMarineXlsxV1: StatementParser = {
  insurerSlug: "tokio-marine",
  formatVersion: "xlsx-v1",

  async detectar(arquivo: ArquivoBruto): Promise<number> {
    if (!ehArquivoXlsx(arquivo.conteudo)) return 0;
    const matriz = lerMatrizXlsx(arquivo.conteudo);
    const temMarca = matriz
      .slice(0, 5)
      .some((linha) => linha.some((c) => celulaTexto(c).toUpperCase().includes("TOKIO MARINE")));
    if (!temMarca) return 0;
    return localizarCabecalho(matriz, [COLUNAS.apolice, COLUNAS.valorComissao]) ? 0.9 : 0.1;
  },

  async parsear(arquivo: ArquivoBruto, meta: MetaExtrato): Promise<ResultadoParsing> {
    const matriz = lerMatrizXlsx(arquivo.conteudo);
    return parsearTabela(matriz, COLUNAS, meta, extrairCompetenciaDoTexto(matriz));
  },
};
