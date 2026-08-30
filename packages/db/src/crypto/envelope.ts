/**
 * Envelope encryption para PII (LGPD):
 * - Cada tenant tem uma DEK (data encryption key) de 32 bytes, gerada no onboarding.
 * - A DEK é armazenada em Tenant.dekEnc, embrulhada (wrap) pela KEK mestre.
 * - Localmente a KEK vem de env (MASTER_KEY); em produção, KeyProvider troca por KMS
 *   sem tocar no restante do código.
 *
 * Formato do blob cifrado: [versao(1)] [iv(12)] [tag(16)] [ciphertext...]
 */
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const VERSAO_BLOB = 1;
const TAM_IV = 12;
const TAM_TAG = 16;
const ALGORITMO = "aes-256-gcm";

export interface KeyProvider {
  /** Embrulha uma DEK com a chave mestre (KEK). */
  embrulharDek(dek: Buffer): Buffer;
  /** Desembrulha uma DEK previamente embrulhada. */
  desembrulharDek(dekEnc: Buffer): Buffer;
}

function cifrarComChave(chave: Buffer, plaintext: Buffer): Buffer {
  const iv = randomBytes(TAM_IV);
  const cipher = createCipheriv(ALGORITMO, chave, iv);
  const ct = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([Buffer.from([VERSAO_BLOB]), iv, cipher.getAuthTag(), ct]);
}

function decifrarComChave(chave: Buffer, blob: Buffer): Buffer {
  const versao = blob[0];
  if (versao !== VERSAO_BLOB) {
    throw new Error(`Versão de blob cifrado desconhecida: ${versao}`);
  }
  const iv = blob.subarray(1, 1 + TAM_IV);
  const tag = blob.subarray(1 + TAM_IV, 1 + TAM_IV + TAM_TAG);
  const ct = blob.subarray(1 + TAM_IV + TAM_TAG);
  const decipher = createDecipheriv(ALGORITMO, chave, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ct), decipher.final()]);
}

/** KeyProvider local: KEK de 32 bytes em base64 na env MASTER_KEY. KMS-ready via interface. */
export class LocalKeyProvider implements KeyProvider {
  private readonly kek: Buffer;

  constructor(masterKeyBase64: string) {
    const kek = Buffer.from(masterKeyBase64, "base64");
    if (kek.length !== 32) {
      throw new Error("MASTER_KEY deve ter 32 bytes em base64 (openssl rand -base64 32)");
    }
    this.kek = kek;
  }

  embrulharDek(dek: Buffer): Buffer {
    return cifrarComChave(this.kek, dek);
  }

  desembrulharDek(dekEnc: Buffer): Buffer {
    return decifrarComChave(this.kek, dekEnc);
  }
}

export function gerarDek(): Buffer {
  return randomBytes(32);
}

/** Cifra um campo PII com a DEK (já desembrulhada) do tenant. */
export function cifrarCampo(dek: Buffer, valor: string): Buffer {
  return cifrarComChave(dek, Buffer.from(valor, "utf8"));
}

/** Decifra um campo PII. Lança erro se a chave estiver errada ou o blob adulterado. */
export function decifrarCampo(dek: Buffer, blob: Buffer | Uint8Array): string {
  return decifrarComChave(dek, Buffer.from(blob)).toString("utf8");
}

export function keyProviderDoAmbiente(): KeyProvider {
  const masterKey = process.env.MASTER_KEY;
  if (!masterKey) {
    throw new Error("MASTER_KEY não configurada");
  }
  return new LocalKeyProvider(masterKey);
}
