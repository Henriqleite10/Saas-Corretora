# Fase 2 — Conectores automáticos (não implementar na Fase 0)

- `PortalScraperConnector`: Playwright + credenciais criptografadas de `InsurerAccount`
  - rotina agendada (fila `agendamentos`). Um scraper de exemplo rodará contra um
    portal fake local para validar a arquitetura.
- `ApiConnector`: para seguradoras que expõem API.
- Ambos implementam a mesma interface `Connector` do `UploadConnector` (Etapa 5),
  com `capabilities` declaradas.
