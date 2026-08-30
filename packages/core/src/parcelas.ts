/**
 * Regras de domínio sobre parcelas. Datas de vencimento são tratadas como
 * datas civis (sem hora) no fuso do tenant — a comparação usa apenas ano/mês/dia.
 */

const MS_POR_DIA = 24 * 60 * 60 * 1000;

function inicioDoDiaUtc(data: Date): number {
  return Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate());
}

/** Dias de atraso de uma parcela. Zero quando ainda não venceu (inclusive no dia do vencimento). */
export function calcularDiasAtraso(vencimento: Date, referencia: Date): number {
  const diff = Math.floor((inicioDoDiaUtc(referencia) - inicioDoDiaUtc(vencimento)) / MS_POR_DIA);
  return Math.max(0, diff);
}
