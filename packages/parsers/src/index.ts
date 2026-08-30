// Motor de parsing de extratos de comissão → schema canônico (EntradaCanonica).
//
// Limitação documentada: OCR fora do escopo — PDFs escaneados (sem camada de
// texto) são rejeitados com orientação ao usuário.
export * from "./tipos.js";
export * from "./registro.js";
export { portoSeguroXlsxV1, portoSeguroXlsxV2 } from "./seguradoras/porto-seguro/xlsx.js";
export { tokioMarineXlsxV1 } from "./seguradoras/tokio-marine/xlsx.js";
export { bradescoSegurosPdfV1 } from "./seguradoras/bradesco-seguros/pdf.js";

import { RegistroParsers } from "./registro.js";
import { portoSeguroXlsxV1, portoSeguroXlsxV2 } from "./seguradoras/porto-seguro/xlsx.js";
import { tokioMarineXlsxV1 } from "./seguradoras/tokio-marine/xlsx.js";
import { bradescoSegurosPdfV1 } from "./seguradoras/bradesco-seguros/pdf.js";

/** Registro com todos os parsers suportados. Nova seguradora: registrar aqui. */
export function registroPadrao(): RegistroParsers {
  return new RegistroParsers()
    .registrar(portoSeguroXlsxV1)
    .registrar(portoSeguroXlsxV2)
    .registrar(tokioMarineXlsxV1)
    .registrar(bradescoSegurosPdfV1);
}
