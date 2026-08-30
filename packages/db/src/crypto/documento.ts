/**
 * Hash de documento (CPF/CNPJ) para busca e matching exato SEM descriptografar:
 * HMAC-SHA256 com chave dedicada (DOC_HASH_KEY). O documento em claro nunca vai
 * para colunas de busca, logs ou índices.
 */
import { createHmac } from "node:crypto";
import { normalizarDocumento } from "@radar/core";

export function hashDocumento(documento: string, chave?: string): string {
  const chaveHmac = chave ?? process.env.DOC_HASH_KEY;
  if (!chaveHmac) {
    throw new Error("DOC_HASH_KEY não configurada");
  }
  const normalizado = normalizarDocumento(documento);
  return createHmac("sha256", Buffer.from(chaveHmac, "base64")).update(normalizado).digest("hex");
}
