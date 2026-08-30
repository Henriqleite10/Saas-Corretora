/**
 * Configuração da régua de recuperação por tenant (persistida em Tenant.configRegua
 * como JSON e validada aqui em toda borda).
 */
import { z } from "zod";

export const EtapaReguaSchema = z.object({
  /** Dias após o vencimento em que a etapa dispara. */
  diasAposVencimento: z.number().int().min(0).max(120),
  canal: z.enum(["EMAIL", "WHATSAPP"]),
});

export const ConfigReguaSchema = z
  .array(EtapaReguaSchema)
  .min(1)
  .max(10)
  .refine(
    (etapas) =>
      etapas.every((e, i) => i === 0 || e.diasAposVencimento > etapas[i - 1]!.diasAposVencimento),
    { message: "Etapas devem estar em ordem crescente de dias após o vencimento" },
  );

export type EtapaRegua = z.infer<typeof EtapaReguaSchema>;
export type ConfigRegua = z.infer<typeof ConfigReguaSchema>;

/** Default conservador: 3 contatos por e-mail antes do cancelamento típico (~60 dias). */
export const CONFIG_REGUA_PADRAO: ConfigRegua = [
  { diasAposVencimento: 3, canal: "EMAIL" },
  { diasAposVencimento: 12, canal: "EMAIL" },
  { diasAposVencimento: 25, canal: "EMAIL" },
];

export const TONS_COBRANCA = ["cordial", "formal", "proximo"] as const;
export type TomCobranca = (typeof TONS_COBRANCA)[number];

const MS_POR_DIA = 24 * 60 * 60 * 1000;

export interface EtapaAgendada {
  ordem: number;
  canal: EtapaRegua["canal"];
  agendadaPara: Date;
}

/** Projeta as etapas da régua a partir do vencimento da parcela. */
export function agendarEtapasRegua(config: ConfigRegua, vencimento: Date): EtapaAgendada[] {
  return config.map((etapa, i) => ({
    ordem: i + 1,
    canal: etapa.canal,
    agendadaPara: new Date(vencimento.getTime() + etapa.diasAposVencimento * MS_POR_DIA),
  }));
}

/**
 * Comissão futura em risco se a apólice for cancelada por inadimplência:
 * soma das parcelas ainda não pagas × % de comissão esperado.
 */
export function calcularComissaoEmRisco(
  parcelas: { valor: number; status: string }[],
  percentComissao: number,
): number {
  const aReceber = parcelas
    .filter((p) => p.status === "EM_DIA" || p.status === "ATRASADA")
    .reduce((soma, p) => soma + p.valor, 0);
  return Math.round(aReceber * percentComissao) / 100;
}
