// Agentes de IA (SDK oficial da Anthropic, modelo via env AI_MODEL).
//
// Fase 0: RedatorCobranca (MessageDrafter) + PipelineGuardrails
//   (regras determinísticas + juiz CDC art. 42/71) — Módulo C human-in-the-loop.
// Fase 1 (TODO): Copiloto de Insights — tool use com consultas pré-aprovadas,
//   relatório mensal, regra anti-alucinação (todo insight persiste com queries).
// Fase 2 (TODO): ConversationAgent autônomo com escalonamento humano
//   obrigatório (contestação, vulnerabilidade, opt-out, fora de escopo).
//
// Todo prompt de sistema vive versionado em prompts/ — nunca inline no código.
export * from "./tipos.js";
export * from "./prompts.js";
export * from "./cliente.js";
export * from "./cobranca/drafter.js";
export * from "./cobranca/guardrails.js";
