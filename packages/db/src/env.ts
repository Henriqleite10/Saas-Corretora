/**
 * Carrega o .env da raiz do monorepo (procurando pnpm-workspace.yaml a partir
 * do cwd) sem sobrescrever variáveis já definidas. Usado por testes e scripts;
 * no CI as variáveis vêm do workflow e este loader vira no-op.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

export function carregarEnvRaiz(): void {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) {
      const envPath = join(dir, ".env");
      if (!existsSync(envPath)) return;
      for (const linha of readFileSync(envPath, "utf8").split("\n")) {
        const m = /^([A-Z0-9_]+)="?([^"]*)"?$/.exec(linha.trim());
        if (m && m[1] && process.env[m[1]] === undefined) {
          process.env[m[1]] = m[2];
        }
      }
      return;
    }
    const pai = dirname(dir);
    if (pai === dir) return;
    dir = pai;
  }
}
