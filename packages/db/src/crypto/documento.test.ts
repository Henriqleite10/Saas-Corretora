import { describe, expect, it } from "vitest";
import { hashDocumento } from "./documento.js";

const CHAVE = Buffer.alloc(32, 7).toString("base64");

describe("hashDocumento", () => {
  it("é determinístico e independe de pontuação", () => {
    expect(hashDocumento("123.456.789-01", CHAVE)).toBe(hashDocumento("12345678901", CHAVE));
  });

  it("documentos diferentes têm hashes diferentes", () => {
    expect(hashDocumento("12345678901", CHAVE)).not.toBe(hashDocumento("12345678902", CHAVE));
  });

  it("não expõe o documento no hash", () => {
    expect(hashDocumento("12345678901", CHAVE)).not.toContain("123456789");
  });

  it("exige chave configurada", () => {
    const original = process.env.DOC_HASH_KEY;
    delete process.env.DOC_HASH_KEY;
    try {
      expect(() => hashDocumento("12345678901")).toThrow();
    } finally {
      if (original) process.env.DOC_HASH_KEY = original;
    }
  });
});
