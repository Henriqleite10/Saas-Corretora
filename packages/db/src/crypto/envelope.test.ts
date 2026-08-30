import { describe, expect, it } from "vitest";
import { LocalKeyProvider, cifrarCampo, decifrarCampo, gerarDek } from "./envelope.js";

const MASTER_A = Buffer.alloc(32, 1).toString("base64");
const MASTER_B = Buffer.alloc(32, 2).toString("base64");

describe("envelope encryption", () => {
  it("faz round-trip de campo PII", () => {
    const dek = gerarDek();
    const blob = cifrarCampo(dek, "123.456.789-01");
    expect(decifrarCampo(dek, blob)).toBe("123.456.789-01");
  });

  it("gera blobs diferentes para o mesmo valor (IV aleatório)", () => {
    const dek = gerarDek();
    expect(cifrarCampo(dek, "x").equals(cifrarCampo(dek, "x"))).toBe(false);
  });

  it("falha ao decifrar com DEK errada", () => {
    const blob = cifrarCampo(gerarDek(), "segredo");
    expect(() => decifrarCampo(gerarDek(), blob)).toThrow();
  });

  it("falha ao decifrar blob adulterado", () => {
    const dek = gerarDek();
    const blob = cifrarCampo(dek, "segredo");
    blob[blob.length - 1] = blob[blob.length - 1]! ^ 0xff;
    expect(() => decifrarCampo(dek, blob)).toThrow();
  });

  it("embrulha e desembrulha DEK com a KEK mestre", () => {
    const kp = new LocalKeyProvider(MASTER_A);
    const dek = gerarDek();
    const dekEnc = kp.embrulharDek(dek);
    expect(kp.desembrulharDek(dekEnc).equals(dek)).toBe(true);
  });

  it("KEK errada não desembrulha a DEK", () => {
    const dekEnc = new LocalKeyProvider(MASTER_A).embrulharDek(gerarDek());
    expect(() => new LocalKeyProvider(MASTER_B).desembrulharDek(dekEnc)).toThrow();
  });

  it("rejeita KEK de tamanho inválido", () => {
    expect(() => new LocalKeyProvider("curta")).toThrow();
  });
});
