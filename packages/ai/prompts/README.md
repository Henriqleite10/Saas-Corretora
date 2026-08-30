# Prompts versionados

Todo prompt de sistema do produto vive aqui, em arquivos Markdown com frontmatter
(`versao`, `data`, `modulo`), nunca inline no código. A versão usada em cada
geração é gravada em `AgentMessage.promptVersao` para rastreabilidade e
calibração (edições dos corretores viram dado de melhoria).

Estrutura prevista:

- `cobranca/drafter.md` — redação de mensagem da régua (Etapa 7)
- `cobranca/juiz.md` — juiz de conformidade CDC art. 42/71 (Etapa 7)
- `insights/relatorio-mensal.md` — Fase 1
- `insights/chat.md` — Fase 1
