import type {
  AtualizacaoStatusParcela,
  Connector,
  ContextoConector,
  ExtratoBruto,
} from "./tipos.js";

/**
 * Conector da Fase 0: o corretor sobe o extrato manualmente e o conector
 * apenas o entrega ao pipeline de parsing — a mesma interface que os
 * conectores automáticos da Fase 2 implementarão.
 */
export class UploadConnector implements Connector {
  readonly tipo = "upload";
  readonly capacidades = { extratos: true, statusParcelas: false };

  constructor(private readonly extratos: ExtratoBruto[]) {}

  async buscarExtratos(_ctx: ContextoConector): Promise<ExtratoBruto[]> {
    return this.extratos;
  }

  async buscarStatusParcelas(_ctx: ContextoConector): Promise<AtualizacaoStatusParcela[]> {
    return []; // sem capacidade de status na Fase 0
  }
}
