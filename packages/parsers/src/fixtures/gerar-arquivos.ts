/** Exporta as fixtures para packages/parsers/fixtures/ (testes manuais da UI). */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  fixtureBradescoSegurosPdfV1,
  fixturePdfEscaneado,
  fixturePortoSeguroXlsxV1,
  fixturePortoSeguroXlsxV2,
  fixtureTokioMarineXlsxV1,
} from "./index.js";

const destino = join(process.cwd(), "fixtures");
mkdirSync(destino, { recursive: true });

writeFileSync(join(destino, "porto-seguro-v1.xlsx"), fixturePortoSeguroXlsxV1());
writeFileSync(join(destino, "porto-seguro-v2.xlsx"), fixturePortoSeguroXlsxV2());
writeFileSync(join(destino, "tokio-marine-v1.xlsx"), fixtureTokioMarineXlsxV1());
writeFileSync(join(destino, "bradesco-seguros-v1.pdf"), await fixtureBradescoSegurosPdfV1());
writeFileSync(join(destino, "pdf-escaneado.pdf"), await fixturePdfEscaneado());

console.log(`Fixtures gravadas em ${destino}`);
