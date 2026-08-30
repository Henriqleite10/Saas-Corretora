import type { PrismaClient } from "@radar/db";
import { comTenant } from "@radar/db";
import type {
  ContextoRascunho,
  MedidorUso,
  MensagemRedigida,
  ResultadoGuardrails,
} from "@radar/ai";

export interface JobDraft {
  stepId: string;
  tenantId: string;
}

export interface RedatorLike {
  redigir(ctx: ContextoRascunho): Promise<MensagemRedigida>;
}
export interface GuardrailsLike {
  verificar(
    mensagem: MensagemRedigida["mensagem"],
    ctx: ContextoRascunho,
  ): Promise<ResultadoGuardrails>;
}

export interface FabricaIa {
  (tenantId: string): { redator: RedatorLike; guardrails: GuardrailsLike };
}

/** Medidor que persiste AiUsage por tenant/módulo (custo monitorado, seção 8). */
export function criarMedidorUso(app: PrismaClient, tenantId: string): MedidorUso {
  return {
    async registrar(uso) {
      await comTenant(app, tenantId, (tx) =>
        tx.aiUsage.create({
          data: {
            tenantId,
            modulo: uso.modulo,
            modelo: uso.modelo,
            tokensInput: uso.tokensInput,
            tokensOutput: uso.tokensOutput,
          },
        }),
      );
    },
  };
}

async function tokensNoMes(app: PrismaClient, tenantId: string): Promise<number> {
  const inicioDoMes = new Date();
  inicioDoMes.setUTCDate(1);
  inicioDoMes.setUTCHours(0, 0, 0, 0);
  const soma = await comTenant(app, tenantId, (tx) =>
    tx.aiUsage.aggregate({
      where: { criadoEm: { gte: inicioDoMes } },
      _sum: { tokensInput: true, tokensOutput: true },
    }),
  );
  return (soma._sum.tokensInput ?? 0) + (soma._sum.tokensOutput ?? 0);
}

/**
 * Redige a mensagem de uma etapa da régua (Módulo C, human-in-the-loop):
 * monta o contexto (PII mínima — nunca CPF/contatos), chama o drafter, roda o
 * pipeline de guardrails e deixa a mensagem AGUARDANDO_APROVACAO do corretor.
 * Mensagem reprovada nos guardrails NUNCA chega à fila de aprovação.
 */
export async function processarDraftStep(
  job: JobDraft,
  app: PrismaClient,
  fabrica: FabricaIa,
): Promise<void> {
  const { stepId, tenantId } = job;

  const step = await comTenant(app, tenantId, (tx) =>
    tx.recoveryStep.findUnique({
      where: { id: stepId },
      include: {
        flow: {
          include: {
            installment: {
              include: {
                policy: {
                  select: {
                    id: true,
                    ramo: true,
                    status: true,
                    seguradoNome: true,
                    seguradoOptOut: true,
                  },
                },
              },
            },
            steps: { select: { id: true } },
          },
        },
      },
    }),
  );
  if (!step || step.status !== "AGENDADA") return; // já tratada — idempotente
  const { flow } = step;
  const { installment } = flow;
  const { policy } = installment;

  // Elegibilidade pode ter mudado desde o agendamento.
  if (flow.desfecho !== "EM_ANDAMENTO" || policy.status !== "ATIVA" || policy.seguradoOptOut) {
    await comTenant(app, tenantId, (tx) =>
      tx.recoveryStep.update({ where: { id: stepId }, data: { status: "CANCELADA" } }),
    );
    return;
  }

  const tenant = await comTenant(app, tenantId, (tx) =>
    tx.tenant.findUniqueOrThrow({
      where: { id: tenantId },
      select: { nome: true, tomCobranca: true, limiteMensalTokensIa: true },
    }),
  );

  // Limite de custo de IA por tenant: atingiu → não gasta; tenta de novo amanhã.
  if (tenant.limiteMensalTokensIa) {
    const consumidos = await tokensNoMes(app, tenantId);
    if (consumidos >= tenant.limiteMensalTokensIa) {
      await comTenant(app, tenantId, (tx) =>
        tx.auditLog.create({
          data: {
            tenantId,
            userId: null,
            acao: "limite_ia_atingido",
            entidade: "RecoveryStep",
            entidadeId: stepId,
            detalhes: { consumidos, limite: tenant.limiteMensalTokensIa },
          },
        }),
      );
      return;
    }
  }

  // Reincidência: qualquer outra régua já aberta para o mesmo segurado/apólice.
  const outrosFlows = await comTenant(app, tenantId, (tx) =>
    tx.recoveryFlow.count({
      where: { id: { not: flow.id }, installment: { policyId: policy.id } },
    }),
  );

  const contexto: ContextoRascunho = {
    nomeCorretora: tenant.nome,
    nomeSegurado: policy.seguradoNome,
    ramo: policy.ramo,
    valorParcela: installment.valor.toFixed(2),
    numeroParcela: installment.numero,
    diasAtraso: installment.diasAtraso,
    historico: outrosFlows > 0 ? "REINCIDENTE" : "PRIMEIRO_ATRASO",
    etapa: { ordem: step.ordem, total: flow.steps.length },
    tom: (["cordial", "formal", "proximo"] as const).includes(
      tenant.tomCobranca as "cordial" | "formal" | "proximo",
    )
      ? (tenant.tomCobranca as "cordial" | "formal" | "proximo")
      : "cordial",
    canal: step.canal,
  };

  const { redator, guardrails } = fabrica(tenantId);
  const redigida = await redator.redigir(contexto);
  const resultado = await guardrails.verificar(redigida.mensagem, contexto);

  await comTenant(app, tenantId, async (tx) => {
    let conversation = await tx.agentConversation.findFirst({
      where: { flowId: flow.id, canal: step.canal, desfecho: "EM_ANDAMENTO" },
    });
    conversation ??= await tx.agentConversation.create({
      data: { tenantId, flowId: flow.id, policyId: policy.id, canal: step.canal },
    });

    const reprovada = resultado.veredito === "REPROVADA";
    await tx.agentMessage.create({
      data: {
        tenantId,
        conversationId: conversation.id,
        stepId,
        papel: "AGENTE",
        assunto: redigida.mensagem.assunto,
        corpoGerado: redigida.mensagem.corpo,
        justificativa: redigida.mensagem.justificativa,
        statusAprovacao: reprovada ? "DESCARTADA" : "AGUARDANDO_APROVACAO",
        guardrailVeredito: resultado.veredito,
        guardrailDetalhes: JSON.parse(
          JSON.stringify({
            origem: resultado.origem,
            violacoes: resultado.violacoes,
            ...(resultado.justificativa ? { justificativa: resultado.justificativa } : {}),
          }),
        ) as object,
        promptVersao: redigida.promptVersao,
      },
    });
    await tx.recoveryStep.update({
      where: { id: stepId },
      data: { status: reprovada ? "FALHOU" : "AGUARDANDO_APROVACAO" },
    });
    await tx.auditLog.create({
      data: {
        tenantId,
        userId: null,
        acao: reprovada ? "mensagem_ia_reprovada_guardrails" : "mensagem_ia_redigida",
        entidade: "RecoveryStep",
        entidadeId: stepId,
        detalhes: {
          veredito: resultado.veredito,
          origem: resultado.origem,
          promptVersao: redigida.promptVersao,
        },
      },
    });
  });
}
