import { describe, expect, it } from "vitest";
import { calcularDiasAtraso } from "./parcelas.js";

describe("calcularDiasAtraso", () => {
  it("retorna 0 no dia do vencimento", () => {
    const dia = new Date("2026-08-10T15:00:00Z");
    expect(calcularDiasAtraso(dia, new Date("2026-08-10T23:59:00Z"))).toBe(0);
  });

  it("retorna 0 antes do vencimento", () => {
    expect(calcularDiasAtraso(new Date("2026-08-10"), new Date("2026-08-01"))).toBe(0);
  });

  it("conta dias corridos após o vencimento, ignorando horário", () => {
    expect(
      calcularDiasAtraso(new Date("2026-08-10T23:00:00Z"), new Date("2026-08-13T01:00:00Z")),
    ).toBe(3);
  });
});
