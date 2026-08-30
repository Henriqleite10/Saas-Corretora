import { readFile } from "node:fs/promises";
import type { PrismaClient } from "@radar/db";
import { comTenant, hashDocumento } from "@radar/db";
import { FormatoNaoReconhecidoError, registroPadrao } from "@radar/parsers";
import type { RegistroParsers } from "@radar/parsers";
import type { JobParsing } from "../filas.js";

/**
 * Processa um CommissionStatement: resolve o parser (com detecção de versão),
 * normaliza para o schema canônico e grava entradas + relatório de rejeições.
 *
 * Idempotente: reprocessar apaga as entradas anteriores do mesmo extrato.
 * Nunca falha silenciosamente: erro de formato marca FALHOU com motivo legível.
 */
export async function processarExtrato(
  job: JobParsing,
  app: PrismaClient,
  registro: RegistroParsers = registroPadrao(),
): Promise<void> {
  const { statementId, tenantId } = job;

  const statement = await comTenant(app, tenantId, (tx) =>
    tx.commissionStatement.findUnique({
      where: { id: statementId },
      include: { insurer: { select: { slug: true } } },
    }),
  );
  if (!statement) {
    throw new Error(`Extrato ${statementId} não encontrado para o tenant`);
  }

  await comTenant(app, tenantId, (tx) =>
    tx.commissionStatement.update({
      where: { id: statementId },
      data: { status: "PROCESSANDO" },
    }),
  );

  let conteudo: Buffer;
  try {
    conteudo = await readFile(statement.arquivoPath);
  } catch {
    await marcarFalha(app, tenantId, statementId, "Arquivo original não encontrado no storage");
    return;
  }

  const arquivo = { nome: statement.arquivoNome, conteudo };
  let parser;
  try {
    parser = await registro.resolver(statement.insurer.slug, arquivo);
  } catch (erro) {
    const motivo =
      erro instanceof FormatoNaoReconhecidoError
        ? erro.message
        : "Falha ao analisar o arquivo enviado";
    await marcarFalha(app, tenantId, statementId, motivo);
    return;
  }

  const { entradas, rejeitadas } = await parser.parsear(arquivo, {
    insurerSlug: statement.insurer.slug,
    competencia: statement.competencia,
  });

  await comTenant(app, tenantId, async (tx) => {
    await tx.commissionEntry.deleteMany({ where: { statementId } });
    if (entradas.length > 0) {
      await tx.commissionEntry.createMany({
        data: entradas.map((e) => ({
          tenantId,
          statementId,
          insurerId: statement.insurerId,
          numeroApolice: e.numeroApolice,
          numeroParcela: e.numeroParcela,
          seguradoNome: e.seguradoNome,
          // Documento nunca em claro: só o hash HMAC para matching.
          seguradoDocHash: e.seguradoDocumento ? hashDocumento(e.seguradoDocumento) : null,
          competencia: e.competencia,
          premioParcela: e.premioParcela,
          valorComissao: e.valorComissao,
          percentComissao: e.percentComissao,
          dataPagamento: e.dataPagamento,
          linhaOrigem: e.linhaOrigem,
          dadosBrutos: e.dadosBrutos as object,
        })),
      });
    }
    await tx.commissionStatement.update({
      where: { id: statementId },
      data: {
        status: rejeitadas.length > 0 ? "PROCESSADO_COM_ERROS" : "PROCESSADO",
        formatVersion: parser.formatVersion,
        linhasTotais: entradas.length + rejeitadas.length,
        linhasRejeitadas: rejeitadas as unknown as object,
        processadoEm: new Date(),
      },
    });
  });
}

async function marcarFalha(
  app: PrismaClient,
  tenantId: string,
  statementId: string,
  motivo: string,
): Promise<void> {
  await comTenant(app, tenantId, (tx) =>
    tx.commissionStatement.update({
      where: { id: statementId },
      data: {
        status: "FALHOU",
        linhasRejeitadas: [{ linha: 0, motivo, conteudoBruto: "" }],
        processadoEm: new Date(),
      },
    }),
  );
}
