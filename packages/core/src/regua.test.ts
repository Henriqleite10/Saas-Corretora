import { describe, expect, it } from "vitest";
import {
  CONFIG_REGUA_PADRAO,
  ConfigReguaSchema,
  agendarEtapasRegua,
  calcularComissaoEmRisco,
} from "./regua.js";

describe("ConfigReguaSchema", () => {
  it("aceita a régua padrão", () => {
    expect(ConfigReguaSchema.safeParse(CONFIG_REGUA_PADRAO).success).toBe(true);
  });

  it("rejeita etapas fora de ordem crescente", () => {
    const invalida = [
      { diasAposVencimento: 10, canal: "EMAIL" },
      { diasAposVencimento: 3, canal: "EMAIL" },
    ];
    expect(ConfigReguaSchema.safeParse(invalida).success).toBe(false);
  });
});

describe("agendarEtapasRegua", () => {
  it("projeta datas a partir do vencimento", () => {
    const etapas = agendarEtapasRegua(CONFIG_REGUA_PADRAO, new Date("2026-08-10T12:00:00Z"));
    expect(etapas).toHaveLength(3);
    expect(etapas[0]!.ordem).toBe(1);
    expect(etapas[0]!.agendadaPara.toISOString().slice(0, 10)).toBe("2026-08-13");
    expect(etapas[2]!.agendadaPara.toISOString().slice(0, 10)).toBe("2026-09-04");
  });
});

describe("calcularComissaoEmRisco", () => {
  it("soma apenas parcelas não pagas", () => {
    const parcelas = [
      { valor: 200, status: "PAGA" },
      { valor: 200, status: "ATRASADA" },
      { valor: 200, status: "EM_DIA" },
      { valor: 200, status: "CANCELADA" },
    ];
    expect(calcularComissaoEmRisco(parcelas, 20)).toBe(80);
  });

  it("arredonda para centavos", () => {
    expect(calcularComissaoEmRisco([{ valor: 99.99, status: "EM_DIA" }], 15)).toBe(15);
  });
});
