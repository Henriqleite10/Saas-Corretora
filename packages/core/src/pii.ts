/** Máscaras de PII para exibição/logs — o valor completo só existe cifrado. */

export function mascararEmail(email: string): string {
  const [usuario, dominio] = email.split("@");
  if (!usuario || !dominio) return "***";
  const inicio = usuario.slice(0, 1);
  return `${inicio}***@${dominio}`;
}

export function mascararTelefone(telefone: string): string {
  const digitos = telefone.replace(/\D/g, "");
  if (digitos.length < 4) return "****";
  return `${"*".repeat(digitos.length - 4)}${digitos.slice(-4)}`;
}
