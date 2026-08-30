import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  PrismaClient,
  cifrarCampo,
  comTenant,
  decifrarCampo,
  hashDocumento,
  keyProviderDoAmbiente,
} from "@radar/db";
import { PRISMA_APP } from "../prisma/prisma.module";

/**
 * Cifra/decifra PII com a DEK do tenant (envelope encryption). A DEK
 * desembrulhada fica em cache de processo — nunca em log nem em resposta.
 */
@Injectable()
export class PiiService {
  private readonly deks = new Map<string, Buffer>();

  constructor(@Inject(PRISMA_APP) private readonly app: PrismaClient) {}

  private async dekDoTenant(tenantId: string): Promise<Buffer> {
    const emCache = this.deks.get(tenantId);
    if (emCache) return emCache;
    const tenant = await comTenant(this.app, tenantId, (tx) =>
      tx.tenant.findUnique({ where: { id: tenantId }, select: { dekEnc: true } }),
    );
    if (!tenant) throw new NotFoundException("Tenant não encontrado");
    const dek = keyProviderDoAmbiente().desembrulharDek(Buffer.from(tenant.dekEnc));
    this.deks.set(tenantId, dek);
    return dek;
  }

  async cifrar(tenantId: string, valor: string): Promise<Uint8Array<ArrayBuffer>> {
    return new Uint8Array(cifrarCampo(await this.dekDoTenant(tenantId), valor));
  }

  async decifrar(tenantId: string, blob: Uint8Array | null): Promise<string | null> {
    if (!blob) return null;
    return decifrarCampo(await this.dekDoTenant(tenantId), blob);
  }

  hashDoc(documento: string): string {
    return hashDocumento(documento);
  }
}
