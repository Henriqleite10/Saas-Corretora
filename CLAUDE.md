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
- **Multi-tenancy em duas camadas**: `tenantId` em toda tabela tenant-scoped + RLS (`SET LOCAL app.tenant_id` via extensão do Prisma Client; role da app sem BYPASSRLS). `Insurer` é a única tabela global.
- **PII cifrada**: envelope encryption AES-256-GCM (DEK por tenant embrulhada por `MASTER_KEY` em env; interface `KeyProvider` KMS-ready). CPF/CNPJ também vira `docHash` (HMAC com `DOC_HASH_KEY`) para busca/matching sem descriptografar. UI mascara por padrão; logs sem PII em claro.
- **Dinheiro**: `Decimal(12,2)`, nunca float. IDs: `cuid()`.
- **Packages são source-only**: `main` aponta para `src/index.ts`; `apps/web` usa `transpilePackages`; api/worker rodarão via tsx (dev) e bundle (prod). Sem etapa de build por package.
- **Configs compartilhadas na raiz** (`tsconfig.base.json`, `eslint.config.mjs` flat, `.prettierrc`) em vez de um package `config` — menos indireção. Lint roda na raiz sobre o repo todo; typecheck/test por package via Turbo.
- **TS estrito**: `strict` + `noUncheckedIndexedAccess` + `verbatimModuleSyntax` (desligado só em `apps/web` por atrito com arquivos gerados pelo Next). `exactOptionalPropertyTypes` ficou de fora (atrito com libs de terceiros).
- **Prompts de IA**: versionados em `packages/ai/prompts/*.md` com frontmatter; versão gravada em `AgentMessage.promptVersao`.
- **Guardrails do agente**: regras determinísticas primeiro, depois modelo juiz (CDC art. 42/71), structured output; só então fila de aprovação.
- **Filas BullMQ**: `parsing`, `regua`, `ia`, `notificacoes`, `agendamentos`; jobs idempotentes com chave natural.
- **Sem OCR** (limitação documentada): PDF escaneado é rejeitado com orientação.
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
- [ ] Etapa 2 — banco + multi-tenancy (Prisma, RLS, crypto, testes de isolamento)
- [ ] Etapa 3 — API base (auth, onboarding, RBAC, rate limit)
- [ ] Etapa 4 — carteira + importação por planilha
- [ ] Etapa 5 — parsers Porto/Tokio/Bradesco + fila + UI upload
- [ ] Etapa 6 — Módulo A (radar de inadimplência)
- [ ] Etapa 7 — Módulo C (drafter + guardrails)
- [ ] Etapa 8 — Módulo C (fila de aprovação + envio e-mail)
- [ ] Etapa 9 — polimento e fechamento da Fase 0

Fases 1 e 2: **não implementar** — apenas estrutura/interfaces/TODOs já contemplados.
