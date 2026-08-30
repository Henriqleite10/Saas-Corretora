import type { ResultadoParsing } from "@radar/core";

export interface ArquivoBruto {
  nome: string;
  conteudo: Buffer;
}

export interface MetaExtrato {
  insurerSlug: string;
  /** Competência declarada no upload ("AAAA-MM") — fallback quando o arquivo não traz a própria. */
  competencia: string;
}

/**
 * Contrato de parser de extrato: recebe arquivo bruto + metadados e devolve
 * entradas canônicas + relatório de linhas rejeitadas. NUNCA falha silenciosamente:
 * linha não parseada vira LinhaRejeitada (revisável na UI).
 */
export interface StatementParser {
  readonly insurerSlug: string;
  readonly formatVersion: string;
  /** Score 0..1 de confiança de que este parser entende o arquivo (detecção automática de versão). */
  detectar(arquivo: ArquivoBruto): Promise<number>;
  parsear(arquivo: ArquivoBruto, meta: MetaExtrato): Promise<ResultadoParsing>;
}

export class FormatoNaoReconhecidoError extends Error {
  constructor(insurerSlug: string) {
    super(
      `Nenhum parser reconheceu o arquivo para a seguradora "${insurerSlug}". ` +
        "Se for um PDF escaneado (imagem), converta para planilha — OCR está fora do escopo atual.",
    );
    this.name = "FormatoNaoReconhecidoError";
  }
}
