/**
 * Carrega o .env da raiz do repo para testes de integração rodarem tanto
 * localmente quanto no CI (onde as variáveis já vêm do workflow).
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export function carregarEnvDeTeste(): void {
  const caminho = resolve(import.meta.dirname, "../../../../.env");
  if (!existsSync(caminho)) return;
  for (const linha of readFileSync(caminho, "utf8").split("\n")) {
    const m = /^([A-Z0-9_]+)="?([^"]*)"?$/.exec(linha.trim());
    if (m && m[1] && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2];
    }
  }
}
