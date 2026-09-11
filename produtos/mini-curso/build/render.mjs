// Renderiza um HTML em PDF A4 com o Chromium do Playwright (Node).
// Uso: node render.mjs <entrada.html> <saida.pdf>
// Requer o pacote playwright disponível globalmente (ex.: /opt/node22/lib/node_modules/playwright)
// e o Chromium em PLAYWRIGHT_BROWSERS_PATH.
import { createRequire } from 'node:module';
import path from 'node:path';
import { execSync } from 'node:child_process';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  try { return require('playwright'); } catch {}
  const root = execSync('npm root -g').toString().trim();
  return require(path.join(root, 'playwright'));
}
const { chromium } = loadPlaywright();
const [,, inp, out] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + path.resolve(inp), { waitUntil: 'networkidle' });
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('PDF gerado:', out);
