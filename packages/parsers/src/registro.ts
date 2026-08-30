import type { ArquivoBruto, StatementParser } from "./tipos.js";
import { FormatoNaoReconhecidoError } from "./tipos.js";

/**
 * Registro de parsers por seguradora com detecção automática de versão de
 * formato: o parser com maior score de detectar() vence.
 *
 * Adicionar seguradora nova = criar pasta em src/seguradoras/, implementar o
 * parser, registrar em registroPadrao() e adicionar fixtures.
 */
export class RegistroParsers {
  private readonly porSeguradora = new Map<string, StatementParser[]>();

  registrar(parser: StatementParser): this {
    const lista = this.porSeguradora.get(parser.insurerSlug) ?? [];
    lista.push(parser);
    this.porSeguradora.set(parser.insurerSlug, lista);
    return this;
  }

  listar(): { insurerSlug: string; formatVersion: string }[] {
    return [...this.porSeguradora.values()].flat().map((p) => ({
      insurerSlug: p.insurerSlug,
      formatVersion: p.formatVersion,
    }));
  }

  /** Resolve o parser para o arquivo; lança FormatoNaoReconhecidoError se nenhum reconhece. */
  async resolver(insurerSlug: string, arquivo: ArquivoBruto): Promise<StatementParser> {
    const candidatos = this.porSeguradora.get(insurerSlug) ?? [];
    let melhor: StatementParser | null = null;
    let melhorScore = 0;
    for (const parser of candidatos) {
      let score = 0;
      try {
        score = await parser.detectar(arquivo);
      } catch {
        score = 0; // arquivo ilegível para este parser — segue para o próximo
      }
      if (score > melhorScore) {
        melhor = parser;
        melhorScore = score;
      }
    }
    if (!melhor || melhorScore <= 0) {
      throw new FormatoNaoReconhecidoError(insurerSlug);
    }
    return melhor;
  }
}
