import { describe, expect, it } from "vitest";
import { mascararDocumento, normalizarDocumento } from "./documento.js";

describe("normalizarDocumento", () => {
  it("remove pontuação de CPF e CNPJ", () => {
    expect(normalizarDocumento("123.456.789-01")).toBe("12345678901");
    expect(normalizarDocumento("12.345.678/0001-99")).toBe("12345678000199");
  });
});

describe("mascararDocumento", () => {
  it("mascara CPF preservando o miolo", () => {
    expect(mascararDocumento("123.456.789-01")).toBe("***.456.789-**");
  });

  it("mascara CNPJ preservando o miolo", () => {
    expect(mascararDocumento("12.345.678/0001-99")).toBe("**.345.678/0001-**");
  });

  it("mascara integralmente documentos de tamanho inesperado", () => {
    expect(mascararDocumento("123")).toBe("****");
  });
});
