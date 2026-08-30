import { Inject, Injectable } from "@nestjs/common";
import { mascararDocumento } from "@radar/core";
import { PrismaClient, comTenant, decifrarCampo, keyProviderDoAmbiente } from "@radar/db";
import { FilaService } from "../fila/fila.service";
import { PRISMA_APP } from "../prisma/prisma.module";
import type { UsuarioAutenticado } from "../common/auth.types";
import type { FiltrosRadarDto } from "./radar.dto";

const FILA_REGUA = "regua";

@Injectable()
export class RadarService {
  constructor(
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
    private readonly fila: FilaService,
  ) {}

  /** Painel de resultado: "X apólices salvas, R$ Y em comissão preservada". */
  async resumo(usuario: UsuarioAutenticado) {
    const inicioDoMes = new Date();
    inicioDoMes.setUTCDate(1);
    inicioDoMes.setUTCHours(0, 0, 0, 0);

    return comTenant(this.app, usuario.tenantId, async (tx) => {
      const [atrasadas, emRisco, salvasMes, salvasTotal, perdidasMes] = await Promise.all([
        tx.installment.aggregate({
          where: { status: "ATRASADA" },
          _count: true,
          _sum: { valor: true },
        }),
        tx.recoveryFlow.aggregate({
          where: { desfecho: "EM_ANDAMENTO" },
          _count: true,
          _sum: { valorComissaoEmRisco: true },
        }),
        tx.recoveryFlow.aggregate({
          where: { desfecho: "PAGOU", encerradoEm: { gte: inicioDoMes } },
          _count: true,
          _sum: { valorComissaoEmRisco: true },
        }),
        tx.recoveryFlow.aggregate({
          where: { desfecho: "PAGOU" },
          _count: true,
          _sum: { valorComissaoEmRisco: true },
        }),
        tx.recoveryFlow.aggregate({
          where: { desfecho: "PERDIDO", encerradoEm: { gte: inicioDoMes } },
          _count: true,
        }),
      ]);
      return {
        parcelasAtrasadas: atrasadas._count,
        valorEmAtraso: (atrasadas._sum.valor ?? 0).toString(),
        flowsEmAndamento: emRisco._count,
        comissaoEmRisco: (emRisco._sum.valorComissaoEmRisco ?? 0).toString(),
        mesAtual: {
          apolicesSalvas: salvasMes._count,
          comissaoPreservada: (salvasMes._sum.valorComissaoEmRisco ?? 0).toString(),
          perdidas: perdidasMes._count,
        },
        total: {
          apolicesSalvas: salvasTotal._count,
          comissaoPreservada: (salvasTotal._sum.valorComissaoEmRisco ?? 0).toString(),
        },
      };
    });
  }

  async parcelasAtrasadas(usuario: UsuarioAutenticado, filtros: FiltrosRadarDto) {
    const tenantId = usuario.tenantId;
    const parcelas = await comTenant(this.app, tenantId, (tx) =>
      tx.installment.findMany({
        where: {
          status: "ATRASADA",
          ...(filtros.diasMin ? { diasAtraso: { gte: filtros.diasMin } } : {}),
          policy: {
            ...(filtros.ramo ? { ramo: filtros.ramo } : {}),
            ...(filtros.insurerSlug ? { insurer: { slug: filtros.insurerSlug } } : {}),
          },
        },
        include: {
          policy: {
            select: {
              id: true,
              numero: true,
              ramo: true,
              seguradoNome: true,
              seguradoDocEnc: true,
              seguradoOptOut: true,
              insurer: { select: { slug: true, nome: true } },
            },
          },
          recoveryFlow: {
            select: {
              id: true,
              desfecho: true,
              valorComissaoEmRisco: true,
              steps: {
                orderBy: { ordem: "asc" },
                select: { ordem: true, canal: true, status: true, agendadaPara: true },
              },
            },
          },
        },
        orderBy: { diasAtraso: "desc" },
        take: 200,
      }),
    );

    // Máscara de documento (decifra somente para mascarar — nunca sai em claro).
    const dek = await this.dekDoTenant(tenantId);
    return parcelas.map((p) => ({
      id: p.id,
      numero: p.numero,
      valor: p.valor.toFixed(2),
      vencimento: p.vencimento,
      diasAtraso: p.diasAtraso,
      apolice: {
        id: p.policy.id,
        numero: p.policy.numero,
        ramo: p.policy.ramo,
        seguradoNome: p.policy.seguradoNome,
        seguradoDocumento: mascararDocumento(decifrarCampo(dek, p.policy.seguradoDocEnc)),
        seguradoOptOut: p.policy.seguradoOptOut,
        seguradora: p.policy.insurer,
      },
      regua: p.recoveryFlow
        ? {
            id: p.recoveryFlow.id,
            desfecho: p.recoveryFlow.desfecho,
            comissaoEmRisco: p.recoveryFlow.valorComissaoEmRisco.toFixed(2),
            etapas: p.recoveryFlow.steps,
          }
        : null,
    }));
  }

  /** Dispara a varredura do radar para o tenant (sob demanda). */
  async executar(usuario: UsuarioAutenticado) {
    await this.fila.enfileirar(
      FILA_REGUA,
      { tenantId: usuario.tenantId },
      `regua-${usuario.tenantId}-${Date.now()}`,
    );
    return { ok: true };
  }

  private async dekDoTenant(tenantId: string): Promise<Buffer> {
    const tenant = await comTenant(this.app, tenantId, (tx) =>
      tx.tenant.findUniqueOrThrow({ where: { id: tenantId }, select: { dekEnc: true } }),
    );
    return keyProviderDoAmbiente().desembrulharDek(Buffer.from(tenant.dekEnc));
  }
}
