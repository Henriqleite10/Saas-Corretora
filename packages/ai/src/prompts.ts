/**
 * Prompts de sistema versionados em packages/ai/prompts/*.md — nunca inline no
 * código. O frontmatter carrega a versão gravada em AgentMessage.promptVersao.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface PromptVersionado {
  versao: string;
  texto: string;
}

const cache = new Map<string, PromptVersionado>();

export function carregarPrompt(nome: string): PromptVersionado {
  const emCache = cache.get(nome);
  if (emCache) return emCache;

  // dist/ e src/ são irmãos de prompts/ — ../prompts funciona nos dois.
  const base = dirname(fileURLToPath(import.meta.url));
  const caminho = join(base, "..", "prompts", `${nome}.md`);
  const bruto = readFileSync(caminho, "utf8");

  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(bruto);
  if (!m) {
    throw new Error(`Prompt "${nome}" sem frontmatter de versão`);
  }
  const versaoLinha = /versao:\s*(.+)/.exec(m[1]!);
  if (!versaoLinha) {
    throw new Error(`Prompt "${nome}" sem campo "versao" no frontmatter`);
  }
  const prompt = { versao: versaoLinha[1]!.trim(), texto: m[2]!.trim() };
  cache.set(nome, prompt);
  return prompt;
}
