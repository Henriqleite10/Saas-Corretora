import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient, comTenant } from "@radar/db";
import { AuditService } from "../audit/audit.service";
import { FilaService } from "../fila/fila.service";
import { PRISMA_APP } from "../prisma/prisma.module";
import type { UsuarioAutenticado } from "../common/auth.types";
import type { AprovarMensagemDto } from "./cobrancas.dto";

const FILA_NOTIFICACOES = "notificacoes";

@Injectable()
export class CobrancasService {
  constructor(
    @Inject(PRISMA_APP) private readonly app: PrismaClient,
    private readonly fila: FilaService,
    private readonly audit: AuditService,
  ) {}

  /** Fila de aprovação: mensagem redigida + justificativa, com o contexto da parcela. */
  listarAprovacoes(usuario: UsuarioAutenticado) {
    return comTenant(this.app, usuario.tenantId, (tx) =>
      tx.agentMessage.findMany({
        where: { statusAprovacao: "AGUARDANDO_APROVACAO" },
        include: {
          conversation: {
            select: {
              canal: true,
              policy: { select: { numero: true, ramo: true, seguradoNome: true } },
              flow: {
                select: {
                  valorComissaoEmRisco: true,
                  installment: { select: { numero: true, valor: true, diasAtraso: true } },
                },
              },
            },
          },
          step: { select: { ordem: true } },
        },
        orderBy: { criadoEm: "asc" },
      }),
    );
  }

  /** Histórico recente (enviadas/descartadas) para acompanhamento. */
  listarHistorico(usuario: UsuarioAutenticado) {
    return comTenant(this.app, usuario.tenantId, (tx) =>
      tx.agentMessage.findMany({
        where: {
          statusAprovacao: { in: ["APROVADA", "EDITADA_E_APROVADA", "ENVIADA", "DESCARTADA"] },
        },
        include: {
          conversation: {
            select: { canal: true, policy: { select: { numero: true, seguradoNome: true } } },
          },
          aprovadaPor: { select: { nome: true } },
        },
        orderBy: { criadoEm: "desc" },
        take: 50,
      }),
    );
  }

  /**
   * Aprova (com ou sem edição) e enfileira o envio. Edições do corretor são
   * gravadas — viram dado de calibração dos prompts (ativo estratégico).
   */
  async aprovar(usuario: UsuarioAutenticado, id: string, dto: AprovarMensagemDto) {
    const tenantId = usuario.tenantId;
    const mensagem = await comTenant(this.app, tenantId, (tx) =>
      tx.agentMessage.findUnique({ where: { id } }),
    );
    if (!mensagem) throw new NotFoundException("Mensagem não encontrada");
    if (mensagem.statusAprovacao !== "AGUARDANDO_APROVACAO") {
      throw new BadRequestException("Mensagem não está aguardando aprovação");
    }

    const corpoFinal = dto.corpo ?? mensagem.corpoGerado;
    const assuntoFinal = dto.assunto ?? mensagem.assunto;
    const editada =
      (dto.corpo !== undefined && dto.corpo !== mensagem.corpoGerado) ||
      (dto.assunto !== undefined && dto.assunto !== mensagem.assunto);

    const atualizada = await comTenant(this.app, tenantId, (tx) =>
      tx.agentMessage.update({
        where: { id },
        data: {
          corpoFinal,
          assunto: assuntoFinal,
          editadaPeloCorretor: editada,
          statusAprovacao: editada ? "EDITADA_E_APROVADA" : "APROVADA",
          aprovadaPorId: usuario.sub,
        },
      }),
    );
    if (mensagem.stepId) {
      await comTenant(this.app, tenantId, (tx) =>
        tx.recoveryStep.update({ where: { id: mensagem.stepId! }, data: { status: "APROVADA" } }),
      );
    }

    await this.fila.enfileirar(FILA_NOTIFICACOES, { messageId: id, tenantId }, `envio-${id}`);
    await this.audit.registrar(tenantId, usuario.sub, "mensagem_aprovada", "AgentMessage", id, {
      editadaPeloCorretor: editada,
      promptVersao: mensagem.promptVersao,
    });
    return atualizada;
  }

  async descartar(usuario: UsuarioAutenticado, id: string) {
    const tenantId = usuario.tenantId;
    const mensagem = await comTenant(this.app, tenantId, (tx) =>
      tx.agentMessage.findUnique({ where: { id } }),
    );
    if (!mensagem) throw new NotFoundException("Mensagem não encontrada");
    if (mensagem.statusAprovacao !== "AGUARDANDO_APROVACAO") {
      throw new BadRequestException("Mensagem não está aguardando aprovação");
    }
    await comTenant(this.app, tenantId, async (tx) => {
      await tx.agentMessage.update({
        where: { id },
        data: { statusAprovacao: "DESCARTADA", aprovadaPorId: usuario.sub },
      });
      if (mensagem.stepId) {
        await tx.recoveryStep.update({
          where: { id: mensagem.stepId },
          data: { status: "CANCELADA" },
        });
      }
    });
    await this.audit.registrar(tenantId, usuario.sub, "mensagem_descartada", "AgentMessage", id, {
      promptVersao: mensagem.promptVersao,
    });
    return { ok: true };
  }
}
