-- CreateEnum
CREATE TYPE "PapelUsuario" AS ENUM ('ADMIN', 'CORRETOR', 'FINANCEIRO');

-- CreateEnum
CREATE TYPE "PlanoTenant" AS ENUM ('TRIAL', 'ESSENCIAL', 'PRO');

-- CreateEnum
CREATE TYPE "RamoSeguro" AS ENUM ('AUTO', 'VIDA', 'SAUDE', 'RESIDENCIAL', 'EMPRESARIAL', 'OUTROS');

-- CreateEnum
CREATE TYPE "StatusApolice" AS ENUM ('ATIVA', 'CANCELADA', 'SUSPENSA', 'VENCIDA');

-- CreateEnum
CREATE TYPE "StatusParcela" AS ENUM ('EM_DIA', 'ATRASADA', 'PAGA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusProcessamentoExtrato" AS ENUM ('RECEBIDO', 'PROCESSANDO', 'PROCESSADO', 'PROCESSADO_COM_ERROS', 'FALHOU');

-- CreateEnum
CREATE TYPE "TipoDivergencia" AS ENUM ('OK', 'COMISSAO_NAO_PAGA', 'PERCENTUAL_DIVERGENTE', 'VALOR_DIVERGENTE', 'PARCELA_AUSENTE', 'SEM_APOLICE_CORRESPONDENTE');

-- CreateEnum
CREATE TYPE "StatusDisputa" AS ENUM ('NAO_APLICAVEL', 'ABERTA', 'EM_ANDAMENTO', 'RESOLVIDA', 'PERDIDA');

-- CreateEnum
CREATE TYPE "StatusEtapaRegua" AS ENUM ('AGENDADA', 'AGUARDANDO_APROVACAO', 'APROVADA', 'ENVIADA', 'RESPONDIDA', 'CONCLUIDA', 'CANCELADA', 'FALHOU');

-- CreateEnum
CREATE TYPE "CanalContato" AS ENUM ('EMAIL', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "DesfechoRecuperacao" AS ENUM ('EM_ANDAMENTO', 'PAGOU', 'NEGOCIOU', 'ESCALADO', 'PERDIDO', 'OPT_OUT');

-- CreateEnum
CREATE TYPE "PapelMensagemAgente" AS ENUM ('AGENTE', 'SEGURADO', 'CORRETOR', 'SISTEMA');

-- CreateEnum
CREATE TYPE "StatusAprovacaoMensagem" AS ENUM ('RASCUNHO', 'AGUARDANDO_APROVACAO', 'APROVADA', 'EDITADA_E_APROVADA', 'DESCARTADA', 'ENVIADA');

-- CreateEnum
CREATE TYPE "VereditoGuardrail" AS ENUM ('APROVADA', 'REPROVADA');

-- CreateEnum
CREATE TYPE "CategoriaInsight" AS ENUM ('INADIMPLENCIA', 'CONCILIACAO', 'CARTEIRA', 'OPERACIONAL');

-- CreateEnum
CREATE TYPE "StatusInsight" AS ENUM ('NOVO', 'ACEITO', 'DISPENSADO', 'CONCLUIDO');

-- CreateEnum
CREATE TYPE "ModuloIa" AS ENUM ('COBRANCA', 'INSIGHTS', 'CONCILIACAO');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj_enc" BYTEA,
    "cnpj_hash" TEXT,
    "plano" "PlanoTenant" NOT NULL DEFAULT 'TRIAL',
    "config_regua" JSONB NOT NULL,
    "tom_cobranca" TEXT NOT NULL DEFAULT 'cordial',
    "max_contatos_por_segurado_por_semana" INTEGER NOT NULL DEFAULT 2,
    "autonomia_ia_habilitada" BOOLEAN NOT NULL DEFAULT false,
    "limite_mensal_tokens_ia" INTEGER,
    "dek_enc" BYTEA NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "papel" "PapelUsuario" NOT NULL DEFAULT 'CORRETOR',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurers" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "insurers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurer_accounts" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "insurer_id" TEXT NOT NULL,
    "codigo_susep" TEXT,
    "credenciais_enc" BYTEA,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "insurer_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policies" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "insurer_id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "ramo" "RamoSeguro" NOT NULL,
    "status" "StatusApolice" NOT NULL DEFAULT 'ATIVA',
    "segurado_nome" TEXT NOT NULL,
    "segurado_doc_enc" BYTEA NOT NULL,
    "segurado_doc_hash" TEXT NOT NULL,
    "segurado_email_enc" BYTEA,
    "segurado_fone_enc" BYTEA,
    "segurado_opt_out" BOOLEAN NOT NULL DEFAULT false,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3) NOT NULL,
    "premio_total" DECIMAL(12,2) NOT NULL,
    "percent_comissao_esperado" DECIMAL(5,2) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "installments" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "policy_id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "status" "StatusParcela" NOT NULL DEFAULT 'EM_DIA',
    "paga_em" TIMESTAMP(3),
    "dias_atraso" INTEGER NOT NULL DEFAULT 0,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "installments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commission_statements" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "insurer_id" TEXT NOT NULL,
    "competencia" TEXT NOT NULL,
    "arquivo_nome" TEXT NOT NULL,
    "arquivo_path" TEXT NOT NULL,
    "arquivo_hash" TEXT NOT NULL,
    "format_version" TEXT,
    "status" "StatusProcessamentoExtrato" NOT NULL DEFAULT 'RECEBIDO',
    "linhas_totais" INTEGER,
    "linhas_rejeitadas" JSONB,
    "processado_em" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commission_statements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commission_entries" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "statement_id" TEXT NOT NULL,
    "insurer_id" TEXT NOT NULL,
    "numero_apolice" TEXT NOT NULL,
    "numero_parcela" INTEGER,
    "segurado_nome" TEXT,
    "segurado_doc_hash" TEXT,
    "competencia" TEXT NOT NULL,
    "premio_parcela" DECIMAL(12,2),
    "valor_comissao" DECIMAL(12,2) NOT NULL,
    "percent_comissao" DECIMAL(5,2),
    "data_pagamento" TIMESTAMP(3),
    "linha_origem" INTEGER NOT NULL,
    "dados_brutos" JSONB NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commission_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reconciliation_results" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "entry_id" TEXT,
    "policy_id" TEXT,
    "installment_id" TEXT,
    "tipo" "TipoDivergencia" NOT NULL,
    "score_confianca" DECIMAL(4,3),
    "valor_esperado" DECIMAL(12,2),
    "valor_recebido" DECIMAL(12,2),
    "diferenca" DECIMAL(12,2),
    "status_disputa" "StatusDisputa" NOT NULL DEFAULT 'NAO_APLICAVEL',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reconciliation_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recovery_flows" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "installment_id" TEXT NOT NULL,
    "desfecho" "DesfechoRecuperacao" NOT NULL DEFAULT 'EM_ANDAMENTO',
    "valor_comissao_em_risco" DECIMAL(12,2) NOT NULL,
    "iniciado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "encerrado_em" TIMESTAMP(3),

    CONSTRAINT "recovery_flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recovery_steps" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "flow_id" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "canal" "CanalContato" NOT NULL,
    "agendada_para" TIMESTAMP(3) NOT NULL,
    "status" "StatusEtapaRegua" NOT NULL DEFAULT 'AGENDADA',
    "executada_em" TIMESTAMP(3),

    CONSTRAINT "recovery_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_conversations" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "flow_id" TEXT NOT NULL,
    "policy_id" TEXT NOT NULL,
    "canal" "CanalContato" NOT NULL,
    "desfecho" "DesfechoRecuperacao" NOT NULL DEFAULT 'EM_ANDAMENTO',
    "escalada_em" TIMESTAMP(3),
    "motivo_escalonamento" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_messages" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "step_id" TEXT,
    "papel" "PapelMensagemAgente" NOT NULL,
    "assunto" TEXT,
    "corpo_gerado" TEXT,
    "corpo_final" TEXT,
    "justificativa" TEXT,
    "editada_pelo_corretor" BOOLEAN NOT NULL DEFAULT false,
    "status_aprovacao" "StatusAprovacaoMensagem" NOT NULL DEFAULT 'RASCUNHO',
    "aprovada_por_id" TEXT,
    "guardrail_veredito" "VereditoGuardrail",
    "guardrail_detalhes" JSONB,
    "prompt_versao" TEXT,
    "enviada_em" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insights" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "categoria" "CategoriaInsight" NOT NULL,
    "titulo" TEXT NOT NULL,
    "corpo" TEXT NOT NULL,
    "dados_suporte" JSONB NOT NULL,
    "impacto_estimado" DECIMAL(12,2),
    "prioridade" INTEGER NOT NULL,
    "status" "StatusInsight" NOT NULL DEFAULT 'NOVO',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "user_id" TEXT,
    "acao" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "entidade_id" TEXT NOT NULL,
    "detalhes" JSONB NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_usage" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "modulo" "ModuloIa" NOT NULL,
    "modelo" TEXT NOT NULL,
    "tokens_input" INTEGER NOT NULL,
    "tokens_output" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_cnpj_hash_key" ON "tenants"("cnpj_hash");

-- CreateIndex
CREATE INDEX "users_tenant_id_idx" ON "users"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenant_id_email_key" ON "users"("tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "insurers_slug_key" ON "insurers"("slug");

-- CreateIndex
CREATE INDEX "insurer_accounts_tenant_id_idx" ON "insurer_accounts"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "insurer_accounts_tenant_id_insurer_id_key" ON "insurer_accounts"("tenant_id", "insurer_id");

-- CreateIndex
CREATE INDEX "policies_tenant_id_status_idx" ON "policies"("tenant_id", "status");

-- CreateIndex
CREATE INDEX "policies_tenant_id_segurado_doc_hash_idx" ON "policies"("tenant_id", "segurado_doc_hash");

-- CreateIndex
CREATE UNIQUE INDEX "policies_tenant_id_insurer_id_numero_key" ON "policies"("tenant_id", "insurer_id", "numero");

-- CreateIndex
CREATE INDEX "installments_tenant_id_status_vencimento_idx" ON "installments"("tenant_id", "status", "vencimento");

-- CreateIndex
CREATE UNIQUE INDEX "installments_tenant_id_policy_id_numero_key" ON "installments"("tenant_id", "policy_id", "numero");

-- CreateIndex
CREATE INDEX "commission_statements_tenant_id_insurer_id_competencia_idx" ON "commission_statements"("tenant_id", "insurer_id", "competencia");

-- CreateIndex
CREATE UNIQUE INDEX "commission_statements_tenant_id_arquivo_hash_key" ON "commission_statements"("tenant_id", "arquivo_hash");

-- CreateIndex
CREATE INDEX "commission_entries_tenant_id_statement_id_idx" ON "commission_entries"("tenant_id", "statement_id");

-- CreateIndex
CREATE INDEX "commission_entries_tenant_id_numero_apolice_idx" ON "commission_entries"("tenant_id", "numero_apolice");

-- CreateIndex
CREATE UNIQUE INDEX "reconciliation_results_entry_id_key" ON "reconciliation_results"("entry_id");

-- CreateIndex
CREATE INDEX "reconciliation_results_tenant_id_tipo_status_disputa_idx" ON "reconciliation_results"("tenant_id", "tipo", "status_disputa");

-- CreateIndex
CREATE UNIQUE INDEX "recovery_flows_installment_id_key" ON "recovery_flows"("installment_id");

-- CreateIndex
CREATE INDEX "recovery_flows_tenant_id_desfecho_idx" ON "recovery_flows"("tenant_id", "desfecho");

-- CreateIndex
CREATE INDEX "recovery_steps_tenant_id_status_agendada_para_idx" ON "recovery_steps"("tenant_id", "status", "agendada_para");

-- CreateIndex
CREATE UNIQUE INDEX "recovery_steps_tenant_id_flow_id_ordem_key" ON "recovery_steps"("tenant_id", "flow_id", "ordem");

-- CreateIndex
CREATE INDEX "agent_conversations_tenant_id_desfecho_idx" ON "agent_conversations"("tenant_id", "desfecho");

-- CreateIndex
CREATE INDEX "agent_messages_tenant_id_status_aprovacao_idx" ON "agent_messages"("tenant_id", "status_aprovacao");

-- CreateIndex
CREATE INDEX "agent_messages_tenant_id_conversation_id_idx" ON "agent_messages"("tenant_id", "conversation_id");

-- CreateIndex
CREATE INDEX "insights_tenant_id_status_prioridade_idx" ON "insights"("tenant_id", "status", "prioridade");

-- CreateIndex
CREATE INDEX "audit_logs_tenant_id_criado_em_idx" ON "audit_logs"("tenant_id", "criado_em");

-- CreateIndex
CREATE INDEX "audit_logs_tenant_id_entidade_entidade_id_idx" ON "audit_logs"("tenant_id", "entidade", "entidade_id");

-- CreateIndex
CREATE INDEX "ai_usage_tenant_id_modulo_criado_em_idx" ON "ai_usage"("tenant_id", "modulo", "criado_em");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurer_accounts" ADD CONSTRAINT "insurer_accounts_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurer_accounts" ADD CONSTRAINT "insurer_accounts_insurer_id_fkey" FOREIGN KEY ("insurer_id") REFERENCES "insurers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_insurer_id_fkey" FOREIGN KEY ("insurer_id") REFERENCES "insurers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_policy_id_fkey" FOREIGN KEY ("policy_id") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_statements" ADD CONSTRAINT "commission_statements_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_statements" ADD CONSTRAINT "commission_statements_insurer_id_fkey" FOREIGN KEY ("insurer_id") REFERENCES "insurers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_entries" ADD CONSTRAINT "commission_entries_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_entries" ADD CONSTRAINT "commission_entries_statement_id_fkey" FOREIGN KEY ("statement_id") REFERENCES "commission_statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commission_entries" ADD CONSTRAINT "commission_entries_insurer_id_fkey" FOREIGN KEY ("insurer_id") REFERENCES "insurers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reconciliation_results" ADD CONSTRAINT "reconciliation_results_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reconciliation_results" ADD CONSTRAINT "reconciliation_results_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "commission_entries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reconciliation_results" ADD CONSTRAINT "reconciliation_results_policy_id_fkey" FOREIGN KEY ("policy_id") REFERENCES "policies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reconciliation_results" ADD CONSTRAINT "reconciliation_results_installment_id_fkey" FOREIGN KEY ("installment_id") REFERENCES "installments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recovery_flows" ADD CONSTRAINT "recovery_flows_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recovery_flows" ADD CONSTRAINT "recovery_flows_installment_id_fkey" FOREIGN KEY ("installment_id") REFERENCES "installments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recovery_steps" ADD CONSTRAINT "recovery_steps_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recovery_steps" ADD CONSTRAINT "recovery_steps_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "recovery_flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_conversations" ADD CONSTRAINT "agent_conversations_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_conversations" ADD CONSTRAINT "agent_conversations_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "recovery_flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_conversations" ADD CONSTRAINT "agent_conversations_policy_id_fkey" FOREIGN KEY ("policy_id") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_messages" ADD CONSTRAINT "agent_messages_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_messages" ADD CONSTRAINT "agent_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "agent_conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_messages" ADD CONSTRAINT "agent_messages_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "recovery_steps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_messages" ADD CONSTRAINT "agent_messages_aprovada_por_id_fkey" FOREIGN KEY ("aprovada_por_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insights" ADD CONSTRAINT "insights_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
