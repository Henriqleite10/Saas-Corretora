# CLAUDE.md — radar-corretoras

Contexto para qualquer sessão futura retomar o fio. Mantenha este arquivo atualizado ao fim de cada etapa.

## Visão do produto (resumo do briefing)

SaaS B2B multi-tenant para corretoras de seguros PME brasileiras (2–50 corretores). Ataca duas perdas silenciosas de comissão:

1. **Inadimplência do segurado** → apólice cancelada → comissão futura perdida.
2. **Erro de repasse das seguradoras** → extratos (PDF/XLSX/CSV) de 8–15 cias nunca auditados.

Quatro módulos sobre o mesmo alicerce (modelo de dados canônico):

- **A — Radar de Inadimplência**: parcelas em atraso em todas as seguradoras + régua de recuperação + painel "X apólices salvas, R$ Y preservados".
- **B — Conciliação de Comissões** (Fase 1): extratos → schema canônico → cruzamento com carteira → divergências + fila de disputa.
- **C — Agente de Cobrança IA**: redige/conduz recuperação empática e personalizada. Fase 0 = human-in-the-loop (corretor aprova cada mensagem). Nunca assina como IA; assina como a corretora.
- **D — Copiloto de Insights** (Fase 1): relatório mensal + chat com os dados via tools pré-aprovadas; jamais inventa número.

Moat: malha de conectores + agentes treinados no nicho + histórico de conversas/desfechos.

**Regra de ouro**: parsers convertem qualquer formato de qualquer seguradora para `CommissionEntry` canônico. Nenhuma lógica de negócio conhece formato de seguradora.

O plano completo (schema Prisma, fluxos, etapas) está em `PLANO.md`.

## Stack (decisão fechada)

pnpm workspaces + Turborepo · NestJS (API) · Next.js App Router + Tailwind + shadcn/ui (web, pt-BR) · PostgreSQL + Prisma + RLS · BullMQ + Redis · `@anthropic-ai/sdk` (modelo via env `AI_MODEL`) · Vitest · docker-compose local · CI GitHub Actions.

## Decisões de arquitetura tomadas

- **Auth própria** na API (Argon2id + JWT curto + refresh httpOnly) — sem SaaS de auth. Aprovado no plano.
- **Multi-tenancy em duas camadas**: `tenantId` em toda tabela tenant-scoped + RLS (`set_config('app.tenant_id', ..., true)` em transação, via `comTenant`/`clienteDoTenant` de `@radar/db`). `Insurer` é a única tabela global (leitura liberada, escrita só owner).
- **Duas conexões de banco**: `DATABASE_URL` (owner `radar` — migrations, seed, onboarding, login por e-mail, enumeração de tenants em jobs; NÃO passa por RLS) e `DATABASE_URL_APP` (role `radar_app`, sujeita a RLS — todo acesso em nome de um tenant). A migration de RLS cria a role `radar_app` (senha local/CI apenas; produção provisiona fora). Dev/CI: o usuário `radar` precisa de `CREATEROLE` (shadow database do Prisma).
- **PII cifrada**: envelope encryption AES-256-GCM (DEK por tenant embrulhada por `MASTER_KEY` em env; interface `KeyProvider` KMS-ready). CPF/CNPJ também vira `docHash` (HMAC com `DOC_HASH_KEY`) para busca/matching sem descriptografar. UI mascara por padrão; logs sem PII em claro.
- **Dinheiro**: `Decimal(12,2)`, nunca float. IDs: `cuid()`.
- **Packages são source-only**: `main` aponta para `src/index.ts`; `apps/web` usa `transpilePackages`; api/worker rodarão via tsx (dev) e bundle (prod). Sem etapa de build por package.
- **Configs compartilhadas na raiz** (`tsconfig.base.json`, `eslint.config.mjs` flat, `.prettierrc`) em vez de um package `config` — menos indireção. Lint roda na raiz sobre o repo todo; typecheck/test por package via Turbo.
- **TS estrito**: `strict` + `noUncheckedIndexedAccess` + `verbatimModuleSyntax` (desligado só em `apps/web` por atrito com arquivos gerados pelo Next). `exactOptionalPropertyTypes` ficou de fora (atrito com libs de terceiros).
- **Prompts de IA**: versionados em `packages/ai/prompts/*.md` com frontmatter; versão gravada em `AgentMessage.promptVersao`.
- **Guardrails do agente**: regras determinísticas primeiro (barram sem custo de tokens; lista de padrões CDC coberta por testes adversariais), depois modelo juiz; mensagem reprovada vira `DESCARTADA` + step `FALHOU` e NUNCA entra na fila de aprovação. Falha de parse do juiz nunca aprova por omissão.
- **IA — saída estruturada**: `client.messages.parse` + `zodOutputFormat` (`output_config.format`), não tool-forcing (conflita com thinking). Schemas do package ai importam de `zod/v4` (exigência do helper do SDK). Modelo default `claude-sonnet-5` (env `AI_MODEL`); SEM `temperature` (removido nos modelos atuais). Prompt de sistema com `cache_control: ephemeral`.
- **Contexto do drafter tem PII mínima**: nome do segurado + dados da parcela; nunca CPF/e-mail/telefone (testado).
- **Custo de IA**: cada chamada grava `AiUsage`; `Tenant.limiteMensalTokensIa` barra novas redações quando estourado (audit `limite_ia_atingido`, step continua AGENDADA e tenta no ciclo seguinte).
- **Filas BullMQ**: `parsing`, `regua`, `ia`, `notificacoes`, `agendamentos`; jobs idempotentes com chave natural.
- **Sem OCR** (limitação documentada): PDF escaneado é rejeitado com orientação (detecção: PDF sem camada de texto → `FormatoNaoReconhecidoError` → extrato FALHOU com motivo).
- **PDF: pdfjs-dist, não pdf-parse** — o pdf-parse embute um pdf.js de 2018 e falhou de forma instável com PDFs modernos ("bad XRef entry" dependente do estado do processo). `extrairTextoPdf` usa `pdfjs-dist/legacy` com import dinâmico (o pacote é ESM-only e @radar/parsers publica CJS+ESM) e reconstrói linhas visuais pela coordenada Y.
- **Parsers multi-linha em PDF**: lançamentos quebrados pelo wrap do PDF são reagrupados (registro começa em "APOLICE" e absorve linhas seguintes) — PDFs reais quebram linhas.
- **Fixtures sintéticas geradas** (não commitadas): `@radar/parsers/fixtures` (subpath export) gera XLSX (Porto v1/v2, Tokio) e PDF (Bradesco, escaneado) em memória; `pnpm --filter @radar/parsers gerar-fixtures` grava em `packages/parsers/fixtures/` para teste manual da UI. Toda fixture inclui linhas ruins de propósito.
- **UI**: componentes estilo shadcn/ui copy-in em `packages/ui` (source-only, via `transpilePackages`; imports internos SEM extensão — webpack não resolve `./x.js`→`.tsx`). Tailwind v4 com `@source` apontando para `packages/ui/src`. Sessão no front: accessToken em localStorage + renovação via cookie httpOnly em 401.
- **Storage de uploads**: disco local (`STORAGE_DIR`, default `./uploads`), S3-ready pela indireção de `arquivoPath`; dedup por SHA-256 (`arquivoHash` unique por tenant).
- **Marca não hardcoded**: nome comercial via `PRODUCT_NAME` (env); "radar-corretoras" é só nome de trabalho.

## Convenções

- Commits pequenos, mensagens em português (`tipo: descrição` — feat/fix/docs/chore/test/refactor).
- Código e identificadores de domínio em português quando fizer sentido (enums, campos), APIs técnicas em inglês quando padrão do ecossistema.
- UI 100% pt-BR.
- Zod em todas as bordas (DTOs, payloads de job, arquivos importados, saídas de IA).
- Nenhuma linha de extrato falha silenciosamente: linha não parseada vira item revisável.
- Testes: parsers, conciliação e guardrails com cobertura alta via fixtures; resto cobre fluxos críticos.
- Ao fim de cada etapa: `pnpm lint && pnpm typecheck && pnpm test` verdes antes do commit final da etapa.

## Estado atual

- [x] PLANO.md aprovado pelo Henrique
- [x] **Etapa 1** — fundação do monorepo (workspaces, Turbo, TS, ESLint, Vitest, docker-compose, CI, esqueletos; Fases 1/2 só como TODOs)
- [x] **Etapa 2** — banco + multi-tenancy: schema Prisma completo (16 modelos), migrations (inicial + RLS), envelope encryption (`LocalKeyProvider`, KMS-ready), `hashDocumento` HMAC, `comTenant`/`clienteDoTenant`, seed de seguradoras, 19 testes (8 provam isolamento A/B via RLS contra Postgres real)
- [x] **Etapa 3** — API NestJS: registro de corretora, login Argon2id + JWT/refresh httpOnly com rotação, guards globais (throttler → JWT → papéis), Zod pipes, AuditService; 11 testes e2e. Decisão: packages compartilhados buildam com tsup (Nest exige emitDecoratorMetadata; testes da API via unplugin-swc); e-mail globalmente único.
- [x] **Etapa 4** — carteira: vínculos tenant↔seguradora, CRUD de apólices/parcelas com PII cifrada e mascarada (revelação só ADMIN/FINANCEIRO com auditoria), pagamento de parcela, importação XLSX/CSV com relatório linha a linha; 9 testes e2e.
- [x] **Etapa 5** — parsers + fila + UI: schema canônico (`EntradaCanonica` em @radar/core), RegistroParsers com detecção automática de formatVersion, parsers Porto (xlsx v1+v2), Tokio (xlsx), Bradesco (pdf), UploadConnector, worker BullMQ (fila `parsing`, idempotente), endpoints /extratos (upload+dedup+reprocessar), web app (login/registro, shell, Extratos com fila de linhas rejeitadas, Carteira com importação, Configurações com vínculos). 11 testes de parser + 4 de worker + 4 e2e; smoke real API+Redis+worker validado.
- [x] **Etapa 6** — Módulo A: job diário da régua (marca atraso → abre flows+etapas → encerra PAGOU/PERDIDO), scheduler BullMQ 09h UTC, API /radar (resumo + atrasadas + executar), painel web com cards de resultado.
- [x] **Etapa 7** — Módulo C (drafter+guardrails): `RedatorCobranca` + `JuizConformidade` + `PipelineGuardrails` em @radar/ai (prompts versionados `cobranca-drafter@1.0.0` / `cobranca-juiz@1.0.0`), worker fila `ia` (régua enfileira etapas vencidas → draft → guardrails → AGUARDANDO_APROVACAO), medidor AiUsage + limite por tenant. 21 testes no ai (fixtures adversariais) + 5 de integração no worker.
- [x] **Etapa 8** — Módulo C (fila de aprovação + envio): API /cobrancas (aprovações com contexto+justificativa, aprovar com edição → `EDITADA_E_APROVADA`+`corpoFinal` como dado de calibração, descartar, histórico), worker fila `notificacoes` (decifra e-mail com DEK, envia via `EmailProvider` — Resend ou SMTP/nodemailer —, WhatsApp stub atrás de `FEATURE_WHATSAPP`), reforços no envio: opt-out até o último instante, limite de frequência semanal por segurado (docHash, checado no draft E no envio; envio excedente é reagendado +24h), audit `mensagem_ia_enviada` com destinatário mascarado. UI da fila de aprovação com edição inline. 5 testes de envio + 5 e2e.
- [x] **Etapa 9** — fechamento: API/UI de configurações (régua, tom, frequência, limite de tokens — PATCH só ADMIN; autonomia IA travada em false na Fase 0), onboarding guiado no painel (checklist some quando completo), gestão de equipe na UI, README com setup e fluxo de demonstração, refinamento da régua (apólice que entra atrasada redige só a etapa vencida mais recente; anteriores viram CANCELADA), smoke ponta a ponta com filas reais validado.

**FASE 0 COMPLETA.** Totais: ~150 testes (core 12 · db 19 · parsers 11 · ai 21 · worker 18 · api 37 + web build). CI roda tudo com Postgres+Redis.

## Próximos passos (Fase 1 — não iniciar sem OK)

- Módulo B: motor de matching extrato↔apólice/parcela (determinístico por `seguradoDocHash`+numeroApolice+parcela; fuzzy fallback com score em `ReconciliationResult.scoreConfianca`), relatório de divergências + fila de disputa (tabelas prontas).
- Módulo D: relatório mensal por job + chat com tools de consulta pré-aprovadas (`tenant_id` SEMPRE do contexto autenticado, nunca do input do modelo); persistir todo insight com queries de suporte (`Insight.dadosSuporte`).
- Pendências conhecidas da Fase 0: e-mail de verificação/reset de senha; revogação de refresh token (hoje só expira); UI de detalhe de apólice; baixa de pagamento em massa via reimportação.

Fase 2: **não implementar** — interfaces reservadas em `packages/connectors/src/fase2/`.
