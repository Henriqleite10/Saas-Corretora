import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { mascararDocumento, mascararEmail, mascararTelefone } from "@radar/core";
import { PrismaClient, comTenant } from "@radar/db";
import type { StatusParcela } from "@radar/db";
import { AuditService } from "../audit/audit.service";
import { PiiService } from "../pii/pii.service";
import { PRISMA_APP, PRISMA_SISTEMA } from "../prisma/prisma.module";
import type { UsuarioAutenticado } from "../common/auth.types";
import type {
  AtualizarApoliceDto,
  CriarApoliceDto,
  ListarApolicesDto,
  RegistrarPagamentoDto,
} from "./carteira.dto";

export interface ApoliceVisao {
  id: string;
  numero: string;
  ramo: string;
  status: string;
  seguradoNome: string;
  seguradoDocumento: string; // sempre mascarado
  seguradoEmail: string | null; // mascarado
  seguradoTelefone: string | null; // mascarado
  seguradoOptOut: boolean;
  seguradora: { slug: string; nome: string };
  inicioVigencia: Date;
  fimVigencia: Date;
  premioTotal: string;
  percentComissaoEsperado: string;
  parcelas?: ParcelaVisao[];
}

export interface ParcelaVisao {
  id: string;
  numero: number;
  valor: string;
  vencimento: Date;
  status: StatusParcela;
  pagaEm: Date | null;
  diasAtraso: number;
}

// Tipos estruturais (em vez dos tipos Prisma) para aceitar resultados com
// qualquer combinação de include/select sem brigar com a variância de Uint8Array.
interface ParcelaRow {
  id: string;
  numero: number;
  valor: { toFixed(casas: number): string };
  vencimento: Date;
  status: StatusParcela;
  pagaEm: Date | null;
  diasAtraso: number;
}

interface PolicyComRelacoes {
  id: string;
  numero: string;
  ramo: string;
  status: string;
  seguradoNome: string;
  seguradoDocEnc: Uint8Array;
  seguradoEmailEnc: Uint8Array | null;
  seguradoFoneEnc: Uint8Array | null;
  seguradoOptOut: boolean;
  inicioVigencia: Date;
  fimVigencia: Date;
  premioTotal: { toFixed(casas: number): string };
  percentComissaoEsperado: { toFixed(casas: number): string };
  insurer: { slug: string; nome: string };
  installments?: ParcelaRow[];
}

@Injectable()
export class CarteiraService {
  constructor(
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
    @Inject(PRISMA_SISTEMA) private readonly sistema: PrismaClient,
    private readonly pii: PiiService,
    private readonly audit: AuditService,
  ) {}

  async resolverInsurer(slug: string): Promise<{ id: string }> {
    const insurer = await this.sistema.insurer.findUnique({ where: { slug } });
    if (!insurer || !insurer.ativo) {
      throw new NotFoundException(`Seguradora "${slug}" não encontrada no catálogo`);
    }
    return insurer;
  }

  async criarApolice(usuario: UsuarioAutenticado, dto: CriarApoliceDto): Promise<ApoliceVisao> {
    const insurer = await this.resolverInsurer(dto.insurerSlug);
    const tenantId = usuario.tenantId;

    const [docEnc, emailEnc, foneEnc] = await Promise.all([
      this.pii.cifrar(tenantId, dto.seguradoDocumento),
      dto.seguradoEmail ? this.pii.cifrar(tenantId, dto.seguradoEmail) : null,
      dto.seguradoTelefone ? this.pii.cifrar(tenantId, dto.seguradoTelefone) : null,
    ]);

    const criada = await comTenant(this.app, tenantId, async (tx) => {
      const existente = await tx.policy.findUnique({
        where: {
          tenantId_insurerId_numero: { tenantId, insurerId: insurer.id, numero: dto.numero },
        },
      });
      if (existente) {
        throw new ConflictException(`Apólice ${dto.numero} já cadastrada para esta seguradora`);
      }
      return tx.policy.create({
        data: {
          tenantId,
          insurerId: insurer.id,
          numero: dto.numero,
          ramo: dto.ramo,
          seguradoNome: dto.seguradoNome,
          seguradoDocEnc: docEnc,
          seguradoDocHash: this.pii.hashDoc(dto.seguradoDocumento),
          seguradoEmailEnc: emailEnc,
          seguradoFoneEnc: foneEnc,
          inicioVigencia: dto.inicioVigencia,
          fimVigencia: dto.fimVigencia,
          premioTotal: dto.premioTotal,
          percentComissaoEsperado: dto.percentComissaoEsperado,
          installments: {
            create: dto.parcelas.map((p) => ({
              tenantId,
              numero: p.numero,
              valor: p.valor,
              vencimento: p.vencimento,
            })),
          },
        },
        include: { insurer: { select: { slug: true, nome: true } }, installments: true },
      });
    });

    await this.audit.registrar(tenantId, usuario.sub, "apolice_criada", "Policy", criada.id, {
      numero: dto.numero,
      seguradora: dto.insurerSlug,
      documentoMascarado: mascararDocumento(dto.seguradoDocumento),
    });

    return this.paraVisao(tenantId, criada);
  }

  async listarApolices(
    usuario: UsuarioAutenticado,
    filtros: ListarApolicesDto,
  ): Promise<{ itens: ApoliceVisao[]; total: number; pagina: number; porPagina: number }> {
    const where = {
      ...(filtros.status ? { status: filtros.status } : {}),
      ...(filtros.busca
        ? {
            OR: [
              { numero: { contains: filtros.busca, mode: "insensitive" as const } },
              { seguradoNome: { contains: filtros.busca, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };
    const [itens, total] = await comTenant(this.app, usuario.tenantId, (tx) =>
      Promise.all([
        tx.policy.findMany({
          where,
          include: { insurer: { select: { slug: true, nome: true } } },
          orderBy: { criadoEm: "desc" },
          skip: (filtros.pagina - 1) * filtros.porPagina,
          take: filtros.porPagina,
        }),
        tx.policy.count({ where }),
      ]),
    );
    return {
      itens: await Promise.all(itens.map((p) => this.paraVisao(usuario.tenantId, p))),
      total,
      pagina: filtros.pagina,
      porPagina: filtros.porPagina,
    };
  }

  async detalharApolice(usuario: UsuarioAutenticado, id: string): Promise<ApoliceVisao> {
    const apolice = await comTenant(this.app, usuario.tenantId, (tx) =>
      tx.policy.findUnique({
        where: { id },
        include: {
          insurer: { select: { slug: true, nome: true } },
          installments: { orderBy: { numero: "asc" } },
        },
      }),
    );
    if (!apolice) throw new NotFoundException("Apólice não encontrada");
    return this.paraVisao(usuario.tenantId, apolice);
  }

  /** Revela o documento completo — apenas ADMIN/FINANCEIRO, com auditoria. */
  async revelarDocumento(usuario: UsuarioAutenticado, id: string): Promise<{ documento: string }> {
    const apolice = await comTenant(this.app, usuario.tenantId, (tx) =>
      tx.policy.findUnique({ where: { id }, select: { seguradoDocEnc: true } }),
    );
    if (!apolice) throw new NotFoundException("Apólice não encontrada");
    const documento = await this.pii.decifrar(usuario.tenantId, apolice.seguradoDocEnc);
    await this.audit.registrar(usuario.tenantId, usuario.sub, "pii_revelada", "Policy", id, {
      campo: "seguradoDocumento",
    });
    return { documento: documento ?? "" };
  }

  async atualizarApolice(
    usuario: UsuarioAutenticado,
    id: string,
    dto: AtualizarApoliceDto,
  ): Promise<ApoliceVisao> {
    const tenantId = usuario.tenantId;
    const [emailEnc, foneEnc] = await Promise.all([
      dto.seguradoEmail ? this.pii.cifrar(tenantId, dto.seguradoEmail) : undefined,
      dto.seguradoTelefone ? this.pii.cifrar(tenantId, dto.seguradoTelefone) : undefined,
    ]);
    const atualizada = await comTenant(this.app, tenantId, async (tx) => {
      const existe = await tx.policy.findUnique({ where: { id }, select: { id: true } });
      if (!existe) throw new NotFoundException("Apólice não encontrada");
      return tx.policy.update({
        where: { id },
        data: {
          ...(dto.status ? { status: dto.status } : {}),
          ...(dto.percentComissaoEsperado
            ? { percentComissaoEsperado: dto.percentComissaoEsperado }
            : {}),
          ...(emailEnc ? { seguradoEmailEnc: emailEnc } : {}),
          ...(foneEnc ? { seguradoFoneEnc: foneEnc } : {}),
          ...(dto.seguradoOptOut !== undefined ? { seguradoOptOut: dto.seguradoOptOut } : {}),
        },
        include: { insurer: { select: { slug: true, nome: true } } },
      });
    });
    await this.audit.registrar(tenantId, usuario.sub, "apolice_atualizada", "Policy", id, {
      campos: Object.keys(dto),
    });
    return this.paraVisao(tenantId, atualizada);
  }

  async registrarPagamento(
    usuario: UsuarioAutenticado,
    parcelaId: string,
    dto: RegistrarPagamentoDto,
  ): Promise<ParcelaVisao> {
    const tenantId = usuario.tenantId;
    const parcela = await comTenant(this.app, tenantId, async (tx) => {
      const existente = await tx.installment.findUnique({ where: { id: parcelaId } });
      if (!existente) throw new NotFoundException("Parcela não encontrada");
      if (existente.status === "PAGA") {
        throw new ConflictException("Parcela já está paga");
      }
      return tx.installment.update({
        where: { id: parcelaId },
        data: { status: "PAGA", pagaEm: dto.pagaEm ?? new Date(), diasAtraso: 0 },
      });
    });
    await this.audit.registrar(
      tenantId,
      usuario.sub,
      "pagamento_registrado",
      "Installment",
      parcelaId,
      { numero: parcela.numero },
    );
    return this.parcelaParaVisao(parcela);
  }

  private parcelaParaVisao(p: ParcelaRow): ParcelaVisao {
    return {
      id: p.id,
      numero: p.numero,
      valor: p.valor.toFixed(2),
      vencimento: p.vencimento,
      status: p.status,
      pagaEm: p.pagaEm,
      diasAtraso: p.diasAtraso,
    };
  }

  private async paraVisao(tenantId: string, p: PolicyComRelacoes): Promise<ApoliceVisao> {
    const [documento, email, fone] = await Promise.all([
      this.pii.decifrar(tenantId, p.seguradoDocEnc),
      this.pii.decifrar(tenantId, p.seguradoEmailEnc),
      this.pii.decifrar(tenantId, p.seguradoFoneEnc),
    ]);
    return {
      id: p.id,
      numero: p.numero,
      ramo: p.ramo,
      status: p.status,
      seguradoNome: p.seguradoNome,
      seguradoDocumento: documento ? mascararDocumento(documento) : "",
      seguradoEmail: email ? mascararEmail(email) : null,
      seguradoTelefone: fone ? mascararTelefone(fone) : null,
      seguradoOptOut: p.seguradoOptOut,
      seguradora: p.insurer,
      inicioVigencia: p.inicioVigencia,
      fimVigencia: p.fimVigencia,
      premioTotal: p.premioTotal.toFixed(2),
      percentComissaoEsperado: p.percentComissaoEsperado.toFixed(2),
      ...(p.installments ? { parcelas: p.installments.map((i) => this.parcelaParaVisao(i)) } : {}),
    };
  }
}
