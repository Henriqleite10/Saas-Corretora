import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClient, comTenant } from "@radar/db";
import { AuditService } from "../audit/audit.service";
import { FilaService } from "../fila/fila.service";
import { PRISMA_APP, PRISMA_SISTEMA } from "../prisma/prisma.module";
import type { UsuarioAutenticado } from "../common/auth.types";

const FILA_PARSING = "parsing";

@Injectable()
export class ExtratosService {
  constructor(
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
    @Inject(PRISMA_SISTEMA) private readonly sistema: PrismaClient,
    private readonly fila: FilaService,
    private readonly audit: AuditService,
  ) {}

  private storageDir(): string {
    return process.env.STORAGE_DIR ?? join(process.cwd(), "uploads");
  }

  async receberUpload(
    usuario: UsuarioAutenticado,
    insurerSlug: string,
    competencia: string,
    arquivoNome: string,
    conteudo: Buffer,
  ) {
    const tenantId = usuario.tenantId;
    const insurer = await this.sistema.insurer.findUnique({ where: { slug: insurerSlug } });
    if (!insurer || !insurer.ativo) {
      throw new NotFoundException(`Seguradora "${insurerSlug}" não encontrada`);
    }
    const vinculo = await comTenant(this.app, tenantId, (tx) =>
      tx.insurerAccount.findUnique({
        where: { tenantId_insurerId: { tenantId, insurerId: insurer.id } },
      }),
    );
    if (!vinculo || !vinculo.ativo) {
      throw new BadRequestException(
        `Vincule a seguradora "${insurer.nome}" à corretora antes de enviar extratos`,
      );
    }

    const arquivoHash = createHash("sha256").update(conteudo).digest("hex");
    const duplicado = await comTenant(this.app, tenantId, (tx) =>
      tx.commissionStatement.findUnique({
        where: { tenantId_arquivoHash: { tenantId, arquivoHash } },
      }),
    );
    if (duplicado) {
      throw new ConflictException("Este arquivo já foi enviado anteriormente");
    }

    const dir = join(this.storageDir(), tenantId);
    await mkdir(dir, { recursive: true });
    const arquivoPath = join(dir, `${arquivoHash}-${arquivoNome}`);
    await writeFile(arquivoPath, conteudo);

    const statement = await comTenant(this.app, tenantId, (tx) =>
      tx.commissionStatement.create({
        data: {
          tenantId,
          insurerId: insurer.id,
          competencia,
          arquivoNome,
          arquivoPath,
          arquivoHash,
        },
        include: { insurer: { select: { slug: true, nome: true } } },
      }),
    );

    await this.fila.enfileirar(
      FILA_PARSING,
      { statementId: statement.id, tenantId },
      `parsing-${statement.id}`,
    );
    await this.audit.registrar(
      tenantId,
      usuario.sub,
      "extrato_enviado",
      "CommissionStatement",
      statement.id,
      {
        seguradora: insurerSlug,
        competencia,
        arquivo: arquivoNome,
      },
    );

    return statement;
  }

  listar(usuario: UsuarioAutenticado) {
    return comTenant(this.app, usuario.tenantId, (tx) =>
      tx.commissionStatement.findMany({
        include: {
          insurer: { select: { slug: true, nome: true } },
          _count: { select: { entries: true } },
        },
        orderBy: { criadoEm: "desc" },
        take: 100,
      }),
    );
  }

  async detalhar(usuario: UsuarioAutenticado, id: string) {
    const statement = await comTenant(this.app, usuario.tenantId, (tx) =>
      tx.commissionStatement.findUnique({
        where: { id },
        include: {
          insurer: { select: { slug: true, nome: true } },
          entries: { orderBy: { linhaOrigem: "asc" }, take: 200 },
          _count: { select: { entries: true } },
        },
      }),
    );
    if (!statement) throw new NotFoundException("Extrato não encontrado");
    return statement;
  }

  /** Reenfileira o parsing (ex.: após atualização de parser). */
  async reprocessar(usuario: UsuarioAutenticado, id: string) {
    const statement = await comTenant(this.app, usuario.tenantId, (tx) =>
      tx.commissionStatement.findUnique({ where: { id }, select: { id: true } }),
    );
    if (!statement) throw new NotFoundException("Extrato não encontrado");
    await this.fila.enfileirar(
      FILA_PARSING,
      { statementId: id, tenantId: usuario.tenantId },
      `parsing-${id}-${Date.now()}`,
    );
    return { ok: true };
  }
}
