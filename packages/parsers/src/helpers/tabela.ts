import {
  EntradaCanonicaSchema,
  competenciaNormalizada,
  dataPtBr,
  numeroPtBr,
  normalizarDocumento,
} from "@radar/core";
import type { EntradaCanonica, LinhaRejeitada, ResultadoParsing } from "@radar/core";
import { celulaTexto, localizarCabecalho } from "./planilha.js";
import type { MetaExtrato } from "../tipos.js";

/**
 * Motor genérico de tabela XLSX: cada parser declara apenas os títulos das
 * colunas do seu formato. Linhas problemáticas viram LinhaRejeitada com motivo
 * — nunca exceção, nunca silêncio.
 */
export interface EspecColunas {
  apolice: string;
  valorComissao: string;
  parcela?: string;
  segurado?: string;
  documento?: string;
  premio?: string;
  percent?: string;
  dataPagamento?: string;
  competencia?: string;
}

export function extrairCompetenciaDoTexto(matriz: unknown[][], maxLinhas = 10): string | null {
  for (let i = 0; i < Math.min(matriz.length, maxLinhas); i++) {
    for (const celula of matriz[i]!) {
      const texto = celulaTexto(celula);
      const m = /compet[êe]ncia[:\s]*([\d/ -]+)/i.exec(texto);
      if (m) {
        const norm = competenciaNormalizada(m[1]!.trim());
        if (norm) return norm;
      }
    }
  }
  return null;
}

export function parsearTabela(
  matriz: unknown[][],
  colunas: EspecColunas,
  meta: MetaExtrato,
  competenciaArquivo: string | null,
): ResultadoParsing {
  const titulosExigidos = [colunas.apolice, colunas.valorComissao];
  const cabecalho = localizarCabecalho(matriz, titulosExigidos);
  const entradas: EntradaCanonica[] = [];
  const rejeitadas: LinhaRejeitada[] = [];
  if (!cabecalho) {
    return {
      entradas,
      rejeitadas: [
        { linha: 1, motivo: "Cabeçalho esperado não encontrado na planilha", conteudoBruto: "" },
      ],
    };
  }

  // Índices de todas as colunas declaradas (as opcionais podem não existir).
  const todas = localizarCabecalho(
    [matriz[cabecalho.indiceLinha]!],
    Object.values(colunas).filter((t): t is string => Boolean(t)),
  );
  const indice = (titulo: string | undefined): number | undefined =>
    titulo !== undefined ? todas?.indices.get(titulo) : undefined;

  const idx = {
    apolice: cabecalho.indices.get(colunas.apolice)!,
    valor: cabecalho.indices.get(colunas.valorComissao)!,
    parcela: indice(colunas.parcela),
    segurado: indice(colunas.segurado),
    documento: indice(colunas.documento),
    premio: indice(colunas.premio),
    percent: indice(colunas.percent),
    dataPagamento: indice(colunas.dataPagamento),
    competencia: indice(colunas.competencia),
  };

  for (let i = cabecalho.indiceLinha + 1; i < matriz.length; i++) {
    const linha = matriz[i]!;
    const numeroLinha = i + 1;
    const vazia = linha.every((c) => celulaTexto(c) === "");
    if (vazia) continue;

    const bruto = Object.fromEntries(
      matriz[cabecalho.indiceLinha]!.map((titulo, col) => [
        celulaTexto(titulo) || `coluna_${col + 1}`,
        celulaTexto(linha[col]),
      ]),
    );
    const rejeitar = (motivo: string) =>
      rejeitadas.push({ linha: numeroLinha, motivo, conteudoBruto: JSON.stringify(bruto) });

    const numeroApolice = celulaTexto(linha[idx.apolice]);
    if (!numeroApolice) {
      rejeitar("Número de apólice ausente");
      continue;
    }
    const valorComissao = numeroPtBr(linha[idx.valor]);
    if (valorComissao === null) {
      rejeitar(`Valor de comissão inválido: "${celulaTexto(linha[idx.valor])}"`);
      continue;
    }

    let numeroParcela: number | null = null;
    if (idx.parcela !== undefined && celulaTexto(linha[idx.parcela]) !== "") {
      const p = numeroPtBr(linha[idx.parcela]);
      if (p === null || !Number.isInteger(p) || p < 1) {
        rejeitar(`Número de parcela inválido: "${celulaTexto(linha[idx.parcela])}"`);
        continue;
      }
      numeroParcela = p;
    }

    let seguradoDocumento: string | null = null;
    if (idx.documento !== undefined && celulaTexto(linha[idx.documento]) !== "") {
      const doc = normalizarDocumento(celulaTexto(linha[idx.documento]));
      if (doc.length !== 11 && doc.length !== 14) {
        rejeitar(`CPF/CNPJ inválido: "${celulaTexto(linha[idx.documento])}"`);
        continue;
      }
      seguradoDocumento = doc;
    }

    let premioParcela: number | null = null;
    if (idx.premio !== undefined && celulaTexto(linha[idx.premio]) !== "") {
      premioParcela = numeroPtBr(linha[idx.premio]);
      if (premioParcela === null) {
        rejeitar(`Prêmio inválido: "${celulaTexto(linha[idx.premio])}"`);
        continue;
      }
    }

    let percentComissao: number | null = null;
    if (idx.percent !== undefined && celulaTexto(linha[idx.percent]) !== "") {
      percentComissao = numeroPtBr(linha[idx.percent]);
      if (percentComissao === null) {
        rejeitar(`Percentual de comissão inválido: "${celulaTexto(linha[idx.percent])}"`);
        continue;
      }
    }

    let dataPagamento: Date | null = null;
    if (idx.dataPagamento !== undefined && celulaTexto(linha[idx.dataPagamento]) !== "") {
      dataPagamento = dataPtBr(linha[idx.dataPagamento]);
      if (dataPagamento === null) {
        rejeitar(`Data de pagamento inválida: "${celulaTexto(linha[idx.dataPagamento])}"`);
        continue;
      }
    }

    let competencia = competenciaArquivo ?? meta.competencia;
    if (idx.competencia !== undefined && celulaTexto(linha[idx.competencia]) !== "") {
      const c = competenciaNormalizada(celulaTexto(linha[idx.competencia]));
      if (!c) {
        rejeitar(`Competência inválida: "${celulaTexto(linha[idx.competencia])}"`);
        continue;
      }
      competencia = c;
    }

    const candidata = {
      numeroApolice,
      numeroParcela,
      seguradoNome: idx.segurado !== undefined ? celulaTexto(linha[idx.segurado]) || null : null,
      seguradoDocumento,
      competencia,
      premioParcela,
      valorComissao,
      percentComissao,
      dataPagamento,
      linhaOrigem: numeroLinha,
      dadosBrutos: bruto,
    };
    const valida = EntradaCanonicaSchema.safeParse(candidata);
    if (!valida.success) {
      rejeitar(`Linha não passa no schema canônico: ${valida.error.issues[0]!.message}`);
      continue;
    }
    entradas.push(valida.data);
  }

  return { entradas, rejeitadas };
}
