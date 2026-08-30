/**
 * Framework de conectores por seguradora. Fase 0 implementa apenas o
 * UploadConnector (usuário sobe o arquivo); Fase 2 adiciona
 * PortalScraperConnector (Playwright) e ApiConnector — ver fase2/.
 */

export interface ArquivoConector {
  nome: string;
  conteudo: Buffer;
}

export interface ContextoConector {
  tenantId: string;
  insurerSlug: string;
  /** Credenciais decifradas do InsurerAccount — só na Fase 2. */
  credenciais?: Record<string, string>;
}

export interface ExtratoBruto {
  arquivo: ArquivoConector;
  competencia: string; // "AAAA-MM"
}

export interface AtualizacaoStatusParcela {
  numeroApolice: string;
  numeroParcela: number;
  status: "EM_DIA" | "ATRASADA" | "PAGA" | "CANCELADA";
  dataReferencia: Date;
}

export interface CapacidadesConector {
  extratos: boolean;
  statusParcelas: boolean;
}

export interface Connector {
  readonly tipo: string;
  readonly capacidades: CapacidadesConector;
  buscarExtratos(ctx: ContextoConector): Promise<ExtratoBruto[]>;
  buscarStatusParcelas(ctx: ContextoConector): Promise<AtualizacaoStatusParcela[]>;
}
