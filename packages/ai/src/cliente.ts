import Anthropic from "@anthropic-ai/sdk";

/** Modelo configurável por env; default: Claude Sonnet mais recente. */
export function modeloPadrao(): string {
  return process.env.AI_MODEL ?? "claude-sonnet-5";
}

export function criarClienteAnthropic(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY não configurada — necessária para o agente de cobrança");
  }
  return new Anthropic();
}

export type { Anthropic };
