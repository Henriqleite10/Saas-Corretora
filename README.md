# radar-corretoras

SaaS B2B multi-tenant para corretoras de seguros PME brasileiras: **radar de
inadimplência** com régua de recuperação assistida por IA (Fase 0), e alicerce
pronto para **conciliação de comissões** e **copiloto de insights** (Fase 1) e
conectores automáticos (Fase 2).

> Nome comercial indefinido — a marca vem de `PRODUCT_NAME` (env); nada de
> marca hardcoded no código.

## O que a Fase 0 entrega

- **Carteira**: apólices e parcelas com PII cifrada (envelope encryption por
  tenant), importação por planilha com relatório de erros linha a linha.
- **Extratos de comissão**: upload (XLSX/CSV/PDF) → parsing para o schema
  canônico com detecção automática de versão de formato (Porto Seguro v1/v2,
  Tokio Marine, Bradesco Seguros) e fila de linhas rejeitadas revisável.
- **Módulo A — Radar de Inadimplência**: job diário marca atrasos, abre a
  régua de recuperação e mede o resultado ("X apólices salvas, R$ Y em
  comissão preservada").
- **Módulo C — Agente de Cobrança IA (human-in-the-loop)**: o agente redige
  cada mensagem da régua (personalizada por ramo, atraso, histórico e tom),
  passa por guardrails (regras CDC art. 42/71 + modelo juiz) e espera a
  aprovação do corretor antes do envio por e-mail. Edições do corretor são
  gravadas como dado de calibração.
- Multi-tenancy com RLS no Postgres, RBAC, rate limiting, auditoria completa
  e custo de IA medido por tenant.

## Stack

pnpm workspaces + Turborepo · NestJS · Next.js (App Router) + Tailwind ·
PostgreSQL + Prisma (+ RLS) · BullMQ + Redis · `@anthropic-ai/sdk` · Vitest.

```
apps/web      Next.js (UI pt-BR)          packages/core     domínio puro
apps/api      NestJS (REST)               packages/db       Prisma + RLS + crypto
apps/worker   BullMQ (jobs)               packages/parsers  extratos → canônico
                                          packages/connectors  upload (+ Fase 2)
                                          packages/ai       drafter + guardrails
                                          packages/ui       componentes
```

## Subindo local

```bash
# 1. Infra
docker compose up -d          # Postgres + Redis

# 2. Env
cp .env.example .env          # preencha MASTER_KEY, DOC_HASH_KEY, JWT_SECRET
                              # (openssl rand -base64 32 para cada)
                              # ANTHROPIC_API_KEY para o agente de cobrança
                              # RESEND_API_KEY ou SMTP_URL para envio de e-mail

# 3. Dependências, banco e seed
pnpm install
pnpm --filter @radar/db generate
pnpm --filter @radar/db migrate:dev     # exige CREATEROLE no usuário do banco
pnpm --filter @radar/db seed            # catálogo de seguradoras

# 4. Rodando (3 terminais, ou use turbo dev)
pnpm --filter @radar/api dev            # http://localhost:3001/api
pnpm --filter @radar/worker dev
pnpm --filter @radar/web dev            # http://localhost:3000
```

### Fluxo de demonstração

1. Acesse `/registrar` e cadastre a corretora (vira ADMIN).
2. Em **Configurações**, vincule seguradoras e revise a régua.
3. Em **Carteira**, importe a planilha modelo (colunas descritas na tela) —
   inclua parcelas com vencimento no passado.
4. No **Painel**, clique em "Atualizar radar": parcelas vencidas viram
   ATRASADA e a régua abre com a comissão em risco calculada.
5. Quando uma etapa vence, o worker redige a mensagem (requer
   `ANTHROPIC_API_KEY`) e ela aparece em **Cobranças** para aprovar/editar.
6. Aprovou → e-mail sai em nome da corretora; o desfecho alimenta o painel.
7. Em **Extratos**, envie uma fixture (`pnpm --filter @radar/parsers
gerar-fixtures` grava exemplos em `packages/parsers/fixtures/`).

## Qualidade

```bash
pnpm lint && pnpm typecheck && pnpm test
```

Os testes de integração usam o Postgres/Redis locais e provam, entre outros:
isolamento tenant A/B via RLS, PII nunca em claro no banco/logs, guardrails
barrando mensagens abusivas (fixtures adversariais) e opt-out respeitado até
o instante do envio.

## Limitações documentadas (Fase 0)

- **Sem OCR**: PDF escaneado (imagem) é rejeitado com orientação.
- **Baixa de pagamento manual** (ou via reimportação) — conectores
  automáticos são Fase 2.
- **WhatsApp** é stub atrás de `FEATURE_WHATSAPP` (API oficial Meta pendente).
- Módulo B (conciliação) e D (insights): tabelas e interfaces prontas,
  motor na Fase 1.

Mais contexto para desenvolvimento: `CLAUDE.md` (decisões e estado) e
`PLANO.md` (arquitetura e fases).
