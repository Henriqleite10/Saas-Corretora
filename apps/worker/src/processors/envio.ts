import { mascararEmail } from "@radar/core";
import type { PrismaClient } from "@radar/db";
import { comTenant, decifrarCampo, keyProviderDoAmbiente } from "@radar/db";
import type { EmailProvider, WhatsAppProvider } from "../notificacoes/provedores.js";

export interface JobEnvio {
  messageId: string;
  tenantId: string;
}

export interface DepsEnvio {
  email: EmailProvider;
  whatsapp: WhatsAppProvider;
  /** Reagenda o envio (limite de frequência); se ausente, apenas audita e mantém aprovada. */
  reagendar?: (job: JobEnvio, delayMs: number) => Promise<void>;
}

const UMA_SEMANA_MS = 7 * 24 * 60 * 60 * 1000;
const UM_DIA_MS = 24 * 60 * 60 * 1000;

/**
 * Envia mensagem APROVADA pelo corretor. Reforça na borda do envio:
 * opt-out (imediato e persistido), limite de frequência por segurado e
 * trilha de auditoria completa (toda mensagem enviada por IA + quem aprovou).
 */
export async function processarEnvioMensagem(
  job: JobEnvio,
  app: PrismaClient,
  deps: DepsEnvio,
): Promise<void> {
  const { messageId, tenantId } = job;

  const mensagem = await comTenant(app, tenantId, (tx) =>
    tx.agentMessage.findUnique({
      where: { id: messageId },
      include: {
        conversation: {
          include: {
            policy: {
              select: {
                id: true,
                seguradoNome: true,
                seguradoDocHash: true,
                seguradoEmailEnc: true,
                seguradoFoneEnc: true,
                seguradoOptOut: true,
              },
            },
          },
        },
        step: { select: { id: true } },
      },
    }),
  );
  if (!mensagem) return;
  if (
    mensagem.statusAprovacao !== "APROVADA" &&
    mensagem.statusAprovacao !== "EDITADA_E_APROVADA"
  ) {
    return; // já enviada/descartada — idempotente
  }
  const { policy } = mensagem.conversation;

  const audit = (acao: string, detalhes: object) =>
    comTenant(app, tenantId, (tx) =>
      tx.auditLog.create({
        data: {
          tenantId,
          userId: null,
          acao,
          entidade: "AgentMessage",
          entidadeId: messageId,
          detalhes: detalhes as never,
        },
      }),
    );

  const falhar = async (motivo: string) => {
    await comTenant(app, tenantId, async (tx) => {
      if (mensagem.stepId) {
        await tx.recoveryStep.update({
          where: { id: mensagem.stepId },
          data: { status: "FALHOU" },
        });
      }
    });
    await audit("envio_falhou", { motivo });
  };

  // Opt-out é respeitado até o último instante.
  if (policy.seguradoOptOut) {
    await comTenant(app, tenantId, async (tx) => {
      await tx.agentMessage.update({
        where: { id: messageId },
        data: { statusAprovacao: "DESCARTADA" },
      });
      if (mensagem.stepId) {
        await tx.recoveryStep.update({
          where: { id: mensagem.stepId },
          data: { status: "CANCELADA" },
        });
      }
    });
    await audit("envio_bloqueado_opt_out", {});
    return;
  }

  // Limite de frequência por segurado (todas as apólices do mesmo documento).
  const tenant = await comTenant(app, tenantId, (tx) =>
    tx.tenant.findUniqueOrThrow({
      where: { id: tenantId },
      select: { nome: true, dekEnc: true, maxContatosPorSeguradoPorSemana: true },
    }),
  );
  const enviadasNaSemana = await comTenant(app, tenantId, (tx) =>
    tx.agentMessage.count({
      where: {
        statusAprovacao: "ENVIADA",
        enviadaEm: { gte: new Date(Date.now() - UMA_SEMANA_MS) },
        conversation: { policy: { seguradoDocHash: policy.seguradoDocHash } },
      },
    }),
  );
  if (enviadasNaSemana >= tenant.maxContatosPorSeguradoPorSemana) {
    await audit("envio_adiado_frequencia", {
      enviadasNaSemana,
      limite: tenant.maxContatosPorSeguradoPorSemana,
    });
    if (deps.reagendar) await deps.reagendar(job, UM_DIA_MS);
    return;
  }

  const corpo = mensagem.corpoFinal ?? mensagem.corpoGerado;
  if (!corpo) {
    await falhar("Mensagem sem corpo");
    return;
  }

  const dek = keyProviderDoAmbiente().desembrulharDek(Buffer.from(tenant.dekEnc));

  if (mensagem.conversation.canal === "EMAIL") {
    if (!policy.seguradoEmailEnc) {
      await falhar("Segurado sem e-mail cadastrado");
      return;
    }
    const email = decifrarCampo(dek, policy.seguradoEmailEnc);
    await deps.email.enviar({
      para: email,
      assunto: mensagem.assunto ?? "Sua parcela em aberto",
      corpo,
      nomeRemetente: tenant.nome,
    });
    await audit("mensagem_ia_enviada", {
      canal: "EMAIL",
      destinatarioMascarado: mascararEmail(email), // LGPD: log sem PII em claro
      aprovadaPorId: mensagem.aprovadaPorId,
      promptVersao: mensagem.promptVersao,
      editadaPeloCorretor: mensagem.editadaPeloCorretor,
    });
  } else {
    if (!policy.seguradoFoneEnc) {
      await falhar("Segurado sem telefone cadastrado");
      return;
    }
    const fone = decifrarCampo(dek, policy.seguradoFoneEnc);
    await deps.whatsapp.enviar({ para: fone, corpo });
    await audit("mensagem_ia_enviada", {
      canal: "WHATSAPP",
      aprovadaPorId: mensagem.aprovadaPorId,
      promptVersao: mensagem.promptVersao,
      editadaPeloCorretor: mensagem.editadaPeloCorretor,
    });
  }

  await comTenant(app, tenantId, async (tx) => {
    await tx.agentMessage.update({
      where: { id: messageId },
      data: { statusAprovacao: "ENVIADA", enviadaEm: new Date() },
    });
    if (mensagem.stepId) {
      await tx.recoveryStep.update({
        where: { id: mensagem.stepId },
        data: { status: "ENVIADA", executadaEm: new Date() },
      });
    }
  });
}
