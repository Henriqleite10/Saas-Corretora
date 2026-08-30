// Agentes de IA (SDK oficial da Anthropic, modelo configurável por env).
//
// Fase 0 (Etapa 7): MessageDrafter + pipeline de guardrails (regras
// determinísticas + modelo juiz) + contadores de uso por tenant/módulo.
// Fase 1: Copiloto de Insights (tool use com consultas pré-aprovadas).
// Fase 2: ConversationAgent autônomo com escalonamento humano.
//
// Todo prompt de sistema vive versionado em prompts/ — nunca inline no código.
export {};
