-- Row Level Security: segunda camada de isolamento multi-tenant.
--
-- Modelo de acesso:
--   * `radar` (owner, DATABASE_URL): migrations, seed e operações de sistema
--     (onboarding, login por e-mail, enumeração de tenants em jobs). Owner não
--     passa por RLS — usar com critério, sempre via criarClienteSistema().
--   * `radar_app` (DATABASE_URL_APP): runtime em nome de um tenant, sujeita a
--     RLS. O contexto vem de set_config('app.tenant_id', <id>, true) dentro da
--     transação (ver packages/db/src/tenant.ts).
--
-- Deny by default: sem app.tenant_id definido, current_setting(..., true)
-- retorna NULL e a policy não libera linha alguma.
--
-- Em produção a role radar_app é provisionada fora das migrations (a senha
-- abaixo vale só para desenvolvimento local/CI).

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'radar_app') THEN
    CREATE ROLE radar_app LOGIN PASSWORD 'radar_app';
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO radar_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO radar_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO radar_app;
-- A tabela de controle do Prisma não existe na shadow database — revogar só quando houver.
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_prisma_migrations') THEN
    REVOKE ALL ON TABLE "_prisma_migrations" FROM radar_app;
  END IF;
END
$$;

-- Tabela de tenants: a app só enxerga o próprio tenant.
ALTER TABLE "tenants" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "tenants"
  USING (id = current_setting('app.tenant_id', true));

-- Tabelas tenant-scoped: isolamento por tenant_id.
-- (INSERT/UPDATE também são barrados: sem WITH CHECK explícito, o USING vale
-- para a checagem de escrita em policies FOR ALL.)
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'users',
    'insurer_accounts',
    'policies',
    'installments',
    'commission_statements',
    'commission_entries',
    'reconciliation_results',
    'recovery_flows',
    'recovery_steps',
    'agent_conversations',
    'agent_messages',
    'insights',
    'audit_logs',
    'ai_usage'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I USING (tenant_id = current_setting(''app.tenant_id'', true))',
      t
    );
  END LOOP;
END
$$;

-- Catálogo global de seguradoras: leitura liberada, escrita só pelo owner.
REVOKE INSERT, UPDATE, DELETE ON TABLE "insurers" FROM radar_app;
