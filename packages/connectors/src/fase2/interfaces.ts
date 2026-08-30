/**
 * FASE 2 — NÃO IMPLEMENTAR AGORA (apenas contrato reservado).
 *
 * TODO(Fase 2): PortalScraperConnector — Playwright, credenciais criptografadas
 * de InsurerAccount (decifradas na borda do job), rotina agendada na fila
 * "agendamentos", scraper de exemplo contra portal fake local.
 * TODO(Fase 2): ApiConnector — para seguradoras com API oficial.
 */
import type { Connector } from "../tipos.js";

export interface ConfiguracaoScraper {
  urlPortal: string;
  /** Seletores/fluxo específicos do portal da seguradora. */
  fluxo: string;
}

export interface PortalScraperConnector extends Connector {
  readonly tipo: "portal-scraper";
  readonly configuracao: ConfiguracaoScraper;
}

export interface ApiConnector extends Connector {
  readonly tipo: "api";
  readonly baseUrl: string;
}
