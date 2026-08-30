/**
 * Utilidades puras para CPF/CNPJ. Regras LGPD: a UI e os logs só veem a forma
 * mascarada; o valor completo vive cifrado (packages/db) e o matching usa hash.
 */

/** Remove tudo que não é dígito. */
export function normalizarDocumento(documento: string): string {
  return documento.replace(/\D/g, "");
}

/**
 * Mascara para exibição: CPF `***.456.789-**`, CNPJ `**.345.678/0001-**`.
 * Documentos com tamanho inesperado são totalmente mascarados.
 */
export function mascararDocumento(documento: string): string {
  const d = normalizarDocumento(documento);
  if (d.length === 11) {
    return `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**`;
  }
  if (d.length === 14) {
    return `**.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-**`;
  }
  return "*".repeat(Math.max(d.length, 4));
}
