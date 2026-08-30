# PLANO.md — radar-corretoras

> Plano de arquitetura e implementação da Fase 0. Produzido antes de qualquer código, conforme o fluxo de trabalho acordado. **Aguardando aprovação para iniciar a implementação.**

---

## 1. Visão geral

SaaS B2B multi-tenant para corretoras de seguros PME brasileiras, atacando duas perdas silenciosas de comissão:

1. **Inadimplência do segurado** → apólice cancelada → comissão futura perdida (Módulo A + C).
2. **Erro de repasse das seguradoras** → extratos não auditados (Módulo B, Fase 1).

O alicerce comum é o **modelo de dados canônico**: parsers convertem qualquer formato de qualquer seguradora para `CommissionEntry` canônico; nenhuma lógica de negócio conhece formato de seguradora.

**Escopo desta entrega (Fase 0):**

- Monorepo completo com todas as estruturas de pastas (Fases 1 e 2 apenas como interfaces + TODOs).
- Modelo de dados canônico completo (Prisma + RLS).
- Framework de conectores com `UploadConnector` implementado.
- Parsers para Porto Seguro, Tokio Marine e Bradesco Seguros (XLSX e PDF, fixtures sintéticas).
- Módulo A: dashboard de inadimplência, régua de recuperação, painel de resultado.
- Módulo C em modo human-in-the-loop: `MessageDrafter` + fila de aprovação + envio por e-mail (WhatsApp como stub atrás de flag).
- Autenticação, multi-tenancy, onboarding, importação de carteira via planilha.

---

## 2. Arquitetura do monorepo

```
radar-corretoras/
├── apps/
│   ├── web/            # Next.js (App Router) + Tailwind + shadcn/ui — UI em pt-BR
│   ├── api/            # NestJS — REST, auth, RBAC, rate limiting, Zod nas bordas
│   └── worker/         # Consumidores BullMQ — parsing, régua, drafts de IA, agendamentos
├── packages/
│   ├── core/           # Domínio puro: entidades, serviços, regras de negócio, tipos compartilhados
│   ├── db/             # Prisma schema, migrations, client, RLS helpers, seed
│   ├── connectors/     # Interface Connector + registro + UploadConnector (+ stubs Fase 2)
│   ├── parsers/        # Interface StatementParser + registro + parsers por seguradora + fixtures
│   ├── ai/             # MessageDrafter, guardrails (juiz + regras), insights (Fase 1), prompts/
│   ├── ui/             # Componentes shadcn/ui compartilhados, tema
│   └── config/         # ESLint, TS, Tailwind configs compartilhados
├── docker-compose.yml  # Postgres + Redis
├── turbo.json
├── pnpm-workspace.yaml
├── CLAUDE.md           # visão, decisões, convenções, estado atual (criado na Etapa 1)
└── .github/workflows/ci.yml  # lint + typecheck + testes (Vitest)
```

### 2.1 Fluxo de dependências

```
apps/web ──► apps/api ──► packages/core ◄── apps/worker
                │              │
                ▼              ▼
          packages/db    packages/{connectors,parsers,ai}
```

- `packages/core` não importa nada de apps nem de Prisma diretamente (recebe repositórios via interfaces) — mantém o domínio testável.
- `packages/parsers` e `packages/connectors` só conhecem o schema canônico exportado por `core`.
- `packages/ai` só recebe contexto já montado (DTOs), nunca acessa o banco.

### 2.2 Fluxos principais

**Ingestão de extrato (Fase 0, upload manual):**

```
Upload (web) → api valida (Zod) e grava CommissionStatement (status: RECEBIDO)
  → job "parse-statement" na fila → worker:
      detecta seguradora/formatVersion → StatementParser
      → CommissionEntry[] + linhas rejeitadas (nunca falha silenciosamente)
      → grava entries + relatório de rejeições → status: PROCESSADO | PROCESSADO_COM_ERROS
```

**Régua de recuperação (Módulos A + C):**

```
Job diário "detect-overdue" → marca Installments atrasadas → cria/avança RecoveryFlow
  → para cada RecoveryStep devido: job "draft-message" → MessageDrafter (Claude)
      → guardrails (regras determinísticas + modelo juiz) → AgentMessage (status: AGUARDANDO_APROVACAO)
  → corretor aprova/edita/descarta na fila de aprovação (edições gravadas p/ calibração)
  → aprovado → job "send-message" → EmailProvider (Resend/SMTP) → AuditLog
  → pagamento registrado → flow encerrado com desfecho → painel "R$ preservados"
```

**Importação de carteira:** planilha modelo (XLSX/CSV) → validação linha a linha com relatório de erros → upsert de Policy + Installments.

---

## 3. Decisões de arquitetura (registradas)

| Tema | Decisão | Racional |
|---|---|---|
| Auth | E-mail + senha (Argon2) com sessão JWT curta + refresh token httpOnly, implementado na API NestJS | Sem dependência de SaaS de auth; multi-tenant nativo; simples de testar |
| Multi-tenancy | `tenant_id` em toda tabela tenant-scoped + RLS no Postgres (`SET app.tenant_id` por request/job via extensão do Prisma Client) | Duas camadas independentes; RLS protege contra bug de aplicação |
| RBAC | Papéis `ADMIN`, `CORRETOR`, `FINANCEIRO` como enum em `User` + guard NestJS | Suficiente para PME; granularidade fina fica para depois |
| IDs | `cuid()` em todas as PKs | Não sequencial (não vaza volume), ordenável, gerado no client |
| Dinheiro | `Decimal(12,2)` no Prisma, nunca float | Produto financeiro |
| Criptografia de PII | Envelope encryption AES-256-GCM: DEK por tenant, embrulhada por KEK em env (`MASTER_KEY`); interface `KeyProvider` KMS-ready | Requisito da seção 8; troca por KMS sem tocar no domínio |
| CPF/CNPJ | Armazenado cifrado + coluna `documentoHash` (HMAC-SHA256) para busca/matching exato; UI mascara por padrão; logs só com hash/últimos 3 dígitos | Busca sem descriptografar; LGPD |
| Parsers | Detecção de formato em duas etapas: sniff da seguradora (nome no cabeçalho/estrutura) → `formatVersion` por heurística declarada no parser | Seguradoras mudam layout sem avisar |
| Fila | BullMQ; filas: `parsing`, `regua`, `ia`, `notificacoes`, `agendamentos`; jobs idempotentes com chave natural | Retry seguro |
| IA | `@anthropic-ai/sdk`; modelo por env (`AI_MODEL`, default Sonnet mais recente); prompts versionados em `packages/ai/prompts/*.md` com frontmatter (versão, data); prompt caching no system prompt; structured outputs p/ classificação do juiz | Requisito fechado da stack |
| Guardrails | Pipeline: (1) regras determinísticas (lista de padrões proibidos, presença de identificação da corretora, limite de frequência) → (2) modelo juiz (CDC art. 42/71) com saída JSON → só então mensagem entra na fila de aprovação | Duas camadas; testável com fixtures |
| Custo de IA | Tabela `AiUsage` (tenant, módulo, tokens in/out, timestamp) + limite configurável por tenant com corte suave (alerta) e duro (bloqueio) | Requisito seção 8 |
| Notificações | Adapter `NotificationProvider`: `EmailProvider` (Resend se `RESEND_API_KEY`, senão SMTP) implementado; `WhatsAppProvider` interface + stub atrás de `FEATURE_WHATSAPP` | Requisito |
| Validação | Zod em todas as bordas (API DTOs, payloads de jobs, arquivos importados, saídas estruturadas da IA) | Requisito |
| Rate limiting | `@nestjs/throttler` por IP + por tenant | Requisito |
| OCR | Fora de escopo: PDFs escaneados são rejeitados com mensagem clara e viram item revisável | Limitação documentada |
| i18n | UI hardcoded pt-BR (sem framework de i18n por ora); marca não hardcoded (nome do produto via env/config) | Nome comercial indefinido |

---

## 4. Schema Prisma proposto

Convenções: toda tabela tenant-scoped tem `tenantId` + índice composto começando por `tenantId` + política RLS. Campos cifrados têm sufixo `Enc` (bytes) e, quando buscáveis, um hash companion. `@@map` em snake_case.

```prisma
// ============ ENUMS ============
enum PapelUsuario { ADMIN CORRETOR FINANCEIRO }
enum PlanoTenant { TRIAL ESSENCIAL PRO }
enum RamoSeguro { AUTO VIDA SAUDE RESIDENCIAL EMPRESARIAL OUTROS }
enum StatusApolice { ATIVA CANCELADA SUSPENSA VENCIDA }
enum StatusParcela { EM_DIA ATRASADA PAGA CANCELADA }
enum StatusProcessamentoExtrato { RECEBIDO PROCESSANDO PROCESSADO PROCESSADO_COM_ERROS FALHOU }
enum TipoDivergencia { COMISSAO_NAO_PAGA PERCENTUAL_DIVERGENTE PARCELA_AUSENTE VALOR_DIVERGENTE SEM_APOLICE_CORRESPONDENTE OK }
enum StatusDisputa { NAO_APLICAVEL ABERTA EM_ANDAMENTO RESOLVIDA PERDIDA }
enum StatusEtapaRegua { AGENDADA AGUARDANDO_APROVACAO APROVADA ENVIADA RESPONDIDA CONCLUIDA CANCELADA FALHOU }
enum CanalContato { EMAIL WHATSAPP }
enum DesfechoRecuperacao { PAGOU NEGOCIOU ESCALADO PERDIDO OPT_OUT EM_ANDAMENTO }
enum PapelMensagemAgente { AGENTE SEGURADO CORRETOR SISTEMA }
enum StatusAprovacaoMensagem { RASCUNHO AGUARDANDO_APROVACAO APROVADA EDITADA_E_APROVADA DESCARTADA ENVIADA }
enum VereditoGuardrail { APROVADA REPROVADA }
enum CategoriaInsight { INADIMPLENCIA CONCILIACAO CARTEIRA OPERACIONAL }
enum StatusInsight { NOVO ACEITO DISPENSADO CONCLUIDO }
enum ModuloIa { COBRANCA INSIGHTS CONCILIACAO }

// ============ TENANT / IDENTIDADE ============
model Tenant {
  id            String      @id @default(cuid())
  nome          String
  cnpjEnc       Bytes?
  cnpjHash      String?     @unique
  plano         PlanoTenant @default(TRIAL)
  // configurações de régua e autonomia
  configRegua   Json        // etapas default: [{diasAposVencimento, canal, tom}], validado por Zod
  tomCobranca   String      @default("cordial")  // cordial | formal | proximo
  maxContatosPorSeguradoPorSemana Int @default(2)
  autonomiaIaHabilitada Boolean @default(false)  // Fase 2, sempre false na Fase 0
  limiteMensalTokensIa  Int?
  dekEnc        Bytes       // DEK do tenant embrulhada pela KEK mestre
  criadoEm      DateTime    @default(now())
  atualizadoEm  DateTime    @updatedAt
  // relações omitidas por brevidade: users, policies, statements, flows, insights, auditLogs...
}

model User {
  id           String       @id @default(cuid())
  tenantId     String
  nome         String
  email        String
  senhaHash    String       // Argon2id
  papel        PapelUsuario @default(CORRETOR)
  ativo        Boolean      @default(true)
  criadoEm     DateTime     @default(now())
  atualizadoEm DateTime     @updatedAt
  @@unique([tenantId, email])
  @@index([tenantId])
}

// ============ SEGURADORAS ============
model Insurer {              // catálogo GLOBAL, sem tenantId, sem RLS
  id        String  @id @default(cuid())
  slug      String  @unique   // "porto-seguro", "tokio-marine", "bradesco-seguros"
  nome      String
  ativo     Boolean @default(true)
}

model InsurerAccount {       // vínculo tenant ↔ seguradora
  id              String  @id @default(cuid())
  tenantId        String
  insurerId       String
  codigoSusep     String? // código do corretor na cia
  credenciaisEnc  Bytes?  // Fase 2 (portal scraping); null na Fase 0
  ativo           Boolean @default(true)
  @@unique([tenantId, insurerId])
  @@index([tenantId])
}

// ============ CARTEIRA ============
model Policy {
  id                 String        @id @default(cuid())
  tenantId           String
  insurerId          String
  numero             String        // número da apólice na seguradora
  ramo               RamoSeguro
  status             StatusApolice @default(ATIVA)
  // segurado (PII cifrada)
  seguradoNome       String
  seguradoDocEnc     Bytes         // CPF/CNPJ cifrado
  seguradoDocHash    String        // HMAC p/ matching e busca exata
  seguradoEmailEnc   Bytes?
  seguradoFoneEnc    Bytes?
  seguradoOptOut     Boolean       @default(false)  // opt-out de contato, persistido
  inicioVigencia     DateTime
  fimVigencia        DateTime
  premioTotal        Decimal       @db.Decimal(12, 2)
  percentComissaoEsperado Decimal  @db.Decimal(5, 2)
  criadoEm           DateTime      @default(now())
  atualizadoEm       DateTime      @updatedAt
  @@unique([tenantId, insurerId, numero])
  @@index([tenantId, status])
  @@index([tenantId, seguradoDocHash])
}

model Installment {
  id            String        @id @default(cuid())
  tenantId      String
  policyId      String
  numero        Int           // 1..N
  valor         Decimal       @db.Decimal(12, 2)
  vencimento    DateTime
  status        StatusParcela @default(EM_DIA)
  pagaEm        DateTime?
  diasAtraso    Int           @default(0)  // recalculado pelo job diário
  criadoEm      DateTime      @default(now())
  atualizadoEm  DateTime      @updatedAt
  @@unique([tenantId, policyId, numero])
  @@index([tenantId, status, vencimento])
}

// ============ EXTRATOS / CONCILIAÇÃO ============
model CommissionStatement {
  id             String  @id @default(cuid())
  tenantId       String
  insurerId      String
  competencia    String  // "2026-08"
  arquivoNome    String
  arquivoPath    String  // storage local na Fase 0 (volume docker); S3-ready
  arquivoHash    String  // dedup de upload
  formatVersion  String?
  status         StatusProcessamentoExtrato @default(RECEBIDO)
  linhasTotais    Int?
  linhasRejeitadas Json?  // [{linha, motivo, conteudoBruto}] — vira fila revisável na UI
  processadoEm   DateTime?
  criadoEm       DateTime @default(now())
  @@unique([tenantId, arquivoHash])
  @@index([tenantId, insurerId, competencia])
}

model CommissionEntry {      // SCHEMA CANÔNICO — independente da seguradora
  id                String   @id @default(cuid())
  tenantId          String
  statementId       String
  insurerId         String
  numeroApolice     String
  numeroParcela     Int?
  seguradoNome      String?
  seguradoDocHash   String?  // já normalizado no parsing (nunca doc em claro)
  competencia       String
  premioParcela     Decimal? @db.Decimal(12, 2)
  valorComissao     Decimal  @db.Decimal(12, 2)
  percentComissao   Decimal? @db.Decimal(5, 2)
  dataPagamento     DateTime?
  linhaOrigem       Int      // rastreabilidade até o arquivo bruto
  dadosBrutos       Json     // linha original p/ auditoria
  criadoEm          DateTime @default(now())
  @@index([tenantId, statementId])
  @@index([tenantId, numeroApolice])
}

model ReconciliationResult { // Fase 1 — tabela criada agora, motor depois
  id             String          @id @default(cuid())
  tenantId       String
  entryId        String?         @unique
  policyId       String?
  installmentId  String?
  tipo           TipoDivergencia
  scoreConfianca Decimal?        @db.Decimal(4, 3) // matching fuzzy
  valorEsperado  Decimal?        @db.Decimal(12, 2)
  valorRecebido  Decimal?        @db.Decimal(12, 2)
  diferenca      Decimal?        @db.Decimal(12, 2)
  statusDisputa  StatusDisputa   @default(NAO_APLICAVEL)
  criadoEm       DateTime        @default(now())
  atualizadoEm   DateTime        @updatedAt
  @@index([tenantId, tipo, statusDisputa])
}

// ============ RÉGUA DE RECUPERAÇÃO ============
model RecoveryFlow {
  id            String              @id @default(cuid())
  tenantId      String
  installmentId String              @unique
  desfecho      DesfechoRecuperacao @default(EM_ANDAMENTO)
  valorComissaoEmRisco Decimal      @db.Decimal(12, 2) // p/ painel "R$ preservados"
  iniciadoEm    DateTime            @default(now())
  encerradoEm   DateTime?
  @@index([tenantId, desfecho])
}

model RecoveryStep {
  id           String           @id @default(cuid())
  tenantId     String
  flowId       String
  ordem        Int
  canal        CanalContato
  agendadaPara DateTime
  status       StatusEtapaRegua @default(AGENDADA)
  executadaEm  DateTime?
  @@unique([tenantId, flowId, ordem])
  @@index([tenantId, status, agendadaPara])
}

// ============ AGENTE DE COBRANÇA ============
model AgentConversation {
  id            String              @id @default(cuid())
  tenantId      String
  flowId        String
  policyId      String
  canal         CanalContato
  desfecho      DesfechoRecuperacao @default(EM_ANDAMENTO)
  escaladaEm    DateTime?
  motivoEscalonamento String?
  criadoEm      DateTime            @default(now())
  @@index([tenantId, desfecho])
}

model AgentMessage {
  id               String                  @id @default(cuid())
  tenantId         String
  conversationId   String
  stepId           String?
  papel            PapelMensagemAgente
  assunto          String?
  corpoGerado      String?                 // o que a IA redigiu
  corpoFinal       String?                 // o que foi (ou será) enviado
  justificativa    String?                 // abordagem explicada, visível ao corretor
  editadaPeloCorretor Boolean              @default(false)  // ativo de calibração
  statusAprovacao  StatusAprovacaoMensagem @default(RASCUNHO)
  aprovadaPorId    String?                 // User
  guardrailVeredito VereditoGuardrail?
  guardrailDetalhes Json?                  // regras acionadas + parecer do juiz
  promptVersao     String?                 // versão do prompt usada
  enviadaEm        DateTime?
  criadoEm         DateTime                @default(now())
  @@index([tenantId, statusAprovacao])
  @@index([tenantId, conversationId])
}

// ============ INSIGHTS (Fase 1 — tabela criada agora) ============
model Insight {
  id             String          @id @default(cuid())
  tenantId       String
  categoria      CategoriaInsight
  titulo         String
  corpo          String
  dadosSuporte   Json            // {ferramentasChamadas: [{nome, params, resultado}]} — anti-alucinação
  impactoEstimado Decimal?       @db.Decimal(12, 2)
  prioridade     Int
  status         StatusInsight   @default(NOVO)
  criadoEm       DateTime        @default(now())
  @@index([tenantId, status, prioridade])
}

// ============ OBSERVABILIDADE ============
model AuditLog {
  id        String   @id @default(cuid())
  tenantId  String
  userId    String?  // null quando ação do sistema/IA
  acao      String   // "mensagem_ia_enviada", "mensagem_aprovada", "extrato_importado"...
  entidade  String
  entidadeId String
  detalhes  Json     // SEM PII em claro (política aplicada na escrita)
  criadoEm  DateTime @default(now())
  @@index([tenantId, criadoEm])
  @@index([tenantId, entidade, entidadeId])
}

model AiUsage {
  id           String   @id @default(cuid())
  tenantId     String
  modulo       ModuloIa
  modelo       String
  tokensInput  Int
  tokensOutput Int
  criadoEm     DateTime @default(now())
  @@index([tenantId, modulo, criadoEm])
}
```

**RLS:** migration SQL manual (Prisma não gera policies) cria, para cada tabela tenant-scoped:
`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` + policy `USING (tenant_id = current_setting('app.tenant_id')::text)`. A API/worker conecta com role sem `BYPASSRLS`; extensão do Prisma Client executa `SET LOCAL app.tenant_id` em transação por request/job. `Insurer` é a única tabela global (leitura liberada, escrita só por seed/admin interno).

---

## 5. Contratos principais (interfaces)

```ts
// packages/connectors
interface Connector {
  readonly insurerSlug: string;
  readonly capabilities: { statements: boolean; installmentStatus: boolean };
  fetchStatements(ctx: ConnectorContext): Promise<RawStatement[]>;
  fetchInstallmentStatus(ctx: ConnectorContext): Promise<InstallmentStatusUpdate[]>;
}
// Fase 0: UploadConnector (recebe arquivo do usuário). Fase 2: PortalScraperConnector, ApiConnector (interfaces + TODO).

// packages/parsers
interface StatementParser {
  readonly insurerSlug: string;
  readonly formatVersion: string;
  detect(file: RawFile): number; // score 0..1 — detecção automática de versão
  parse(file: RawFile, meta: StatementMeta): Promise<{
    entries: CanonicalCommissionEntry[];   // Zod-validado
    rejectedRows: RejectedRow[];           // nunca falhe silenciosamente
  }>;
}
// Registro: ParserRegistry.resolve(insurerSlug, file) → maior score de detect() vence.
// Nova seguradora = criar pasta, implementar parser, registrar, adicionar fixtures.

// packages/ai
interface MessageDrafter {
  draft(ctx: DraftContext): Promise<DraftedMessage>;
  // DraftContext: ramo, valor, diasAtraso, histórico (primeiro atraso vs reincidente),
  // etapa da régua, tom do tenant, nome da corretora. SEM CPF, SEM contatos.
  // DraftedMessage: { assunto, corpo, canal, justificativa }
}
interface GuardrailPipeline {
  check(msg: DraftedMessage, ctx: DraftContext): Promise<GuardrailResult>;
  // camada 1: regras determinísticas (padrões proibidos, identificação obrigatória, frequência)
  // camada 2: modelo juiz (CDC 42/71) com structured output
}
```

---

## 6. Sequência de implementação da Fase 0

Cada etapa termina com lint + typecheck + testes verdes, commit(s) pequenos em português, e resumo do feito/próximo.

| # | Etapa | Conteúdo | Critério de pronto |
|---|---|---|---|
| 1 | **Fundação do monorepo** | pnpm workspaces, Turborepo, TS estrito, ESLint/Prettier, Vitest, docker-compose (Postgres+Redis), CI GitHub Actions, `CLAUDE.md` inicial, esqueleto de todas as pastas (Fases 1/2 com TODOs) | `pnpm lint && pnpm typecheck && pnpm test` verdes no CI |
| 2 | **Banco + multi-tenancy** | Schema Prisma completo (seção 4), migrations, migration RLS manual, extensão de tenant-context do client, crypto (envelope AES-GCM + KeyProvider), seed de `Insurer` | Testes de isolamento: tenant A nunca lê B (via app E via SQL direto com role da app); round-trip de criptografia |
| 3 | **API base: auth + tenants** | NestJS bootstrap, registro de corretora (onboarding), login (Argon2 + JWT/refresh), RBAC guard, rate limiting, Zod pipes, AuditLog service | Testes e2e de auth e escopo de tenant |
| 4 | **Carteira** | CRUD de apólices/parcelas, importação via planilha modelo (XLSX/CSV) com relatório de erros linha a linha, mascaramento de PII na leitura | Importa fixture de carteira com linhas boas e ruins; erros viram relatório |
| 5 | **Framework de parsers + 3 seguradoras** | Interfaces, registry com detecção de versão, gerador de fixtures sintéticas (XLSX + PDF texto) p/ Porto, Tokio e Bradesco, parsers, fila `parsing` no worker, UI de upload + fila de linhas rejeitadas | Cobertura alta nos parsers; arquivo com linhas inválidas produz entries + rejeições, nunca exceção silenciosa |
| 6 | **Módulo A: radar de inadimplência** | Job diário `detect-overdue`, criação/avanço de `RecoveryFlow`/`RecoverySteps` a partir da config de régua do tenant, dashboard de parcelas em atraso (filtros por ramo/seguradora/dias), painel "X apólices salvas / R$ Y preservados" | Job idempotente testado; dashboard funcional com dados de seed |
| 7 | **Módulo C: drafter + guardrails** | `MessageDrafter` com prompts versionados em `packages/ai/prompts/`, prompt caching, structured outputs, pipeline de guardrails (regras + juiz), contadores `AiUsage` com limite por tenant, defesa de prompt injection (conteúdo do segurado sempre como dado) | Suite de guardrails com fixtures adversariais (ameaça, urgência falsa, tom vexatório → REPROVADA); mensagens válidas passam |
| 8 | **Módulo C: fila de aprovação + envio** | UI da fila (mensagem + justificativa, editar/aprovar/descartar), gravação de edições, `EmailProvider` (Resend/SMTP), `WhatsAppProvider` stub atrás de `FEATURE_WHATSAPP`, limites de frequência, opt-out imediato e persistido, AuditLog de todo envio | E2e: parcela atrasada → draft → aprovação → e-mail enviado (mailhog/captura) → desfecho registrado no painel |
| 9 | **Polimento e fechamento da Fase 0** | Onboarding guiado (cadastro → seguradoras → importar carteira → configurar régua), telas de configuração (tom, frequência, régua), revisão de segurança (headers, CORS, masking), README, `CLAUDE.md` atualizado | Fluxo completo demonstrável do zero: cadastrar corretora → importar carteira → parcela atrasada → mensagem aprovada → enviada → resultado no painel |

**Fases 1 e 2 nesta entrega:** apenas pastas, interfaces (`ReconciliationEngine`, `ConversationAgent`, `PortalScraperConnector`, `ApiConnector`, ferramentas de insight), tabelas já no schema e TODOs documentados. Nenhuma implementação.

---

## 7. Segurança e LGPD — como cada requisito é atendido

- **PII cifrada at-rest**: envelope encryption por tenant (seção 3); mascaramento por padrão na UI (`***.456.789-**`); logs e AuditLog sem PII em claro.
- **Isolamento de tenant**: RLS + `tenant_id` + testes dedicados (etapa 2) — incluindo, na Fase 1, as tools do copiloto recebendo `tenant_id` só do contexto autenticado.
- **Guardrails CDC**: lista de padrões proibidos versionada + juiz IA + testes automatizados adversariais (etapa 7).
- **Opt-out**: flag persistida em `Policy.seguradoOptOut`; qualquer job de régua verifica antes de agendar/enviar.
- **Rate limiting + Zod**: etapas 3 e transversal.
- **Custo IA**: `AiUsage` + limites por tenant (etapa 7).
- **Limitação documentada**: sem OCR — PDF escaneado é rejeitado com orientação ao usuário.

## 8. Riscos e pontos de atenção

1. **Fixtures sintéticas ≠ formatos reais** — parsers ficarão prontos na arquitetura, mas o primeiro cliente real exigirá ajuste fino dos parsers. Mitigação: relatório de rejeições robusto + `formatVersion`.
2. **Detecção de pagamento** — na Fase 0 não há conector automático; baixa de parcela é manual (ou via reimportação de relatório). O painel de "comissão preservada" depende disso; documentado na UI.
3. **Juiz de IA custa tokens** — cada draft gera 2 chamadas. Mitigação: prompt caching + regras determinísticas primeiro (barram o óbvio sem chamar o juiz... o juiz roda sempre, mas com prompt cacheado; medido em `AiUsage`).
4. **RLS + Prisma** exige disciplina de transação (`SET LOCAL`); coberto por helper único e testes.

---

*Aguardando OK para iniciar a Etapa 1.*
