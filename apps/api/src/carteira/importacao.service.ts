import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@radar/db";
import * as XLSX from "xlsx";
import { z } from "zod";
import { AuditService } from "../audit/audit.service";
import { PRISMA_SISTEMA } from "../prisma/prisma.module";
import type { UsuarioAutenticado } from "../common/auth.types";
import { CarteiraService } from "./carteira.service";
import { RAMOS, documentoSchema } from "./carteira.dto";

/**
 * Importação de carteira via planilha (XLSX/CSV).
 * Nenhuma linha falha silenciosamente: cada linha rejeitada vira item do
 * relatório com o motivo, e as demais são importadas normalmente.
 */

const dataFlexivel = z.preprocess((v) => {
  if (v instanceof Date) return v;
  if (typeof v === "string") {
    const br = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(v.trim());
    if (br) return new Date(Date.UTC(Number(br[3]), Number(br[2]) - 1, Number(br[1])));
    return new Date(v);
  }
  return v;
}, z.date());

const ramoFlexivel = z.preprocess((v) => {
  if (typeof v !== "string") return v;
  const semAcento = v.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().trim();
  return semAcento === "SAUDE" || RAMOS.includes(semAcento as (typeof RAMOS)[number])
    ? semAcento
    : v;
}, z.enum(RAMOS));

const LinhaSchema = z.object({
  seguradora: z.coerce.string().min(1),
  numero_apolice: z.coerce.string().min(1).max(60),
  ramo: ramoFlexivel,
  segurado_nome: z.coerce.string().min(2).max(160),
  segurado_documento: z.coerce.string().pipe(documentoSchema),
  segurado_email: z
    .string()
    .email()
    .max(200)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  segurado_telefone: z.coerce.string().max(30).optional(),
  inicio_vigencia: dataFlexivel,
  fim_vigencia: dataFlexivel,
  premio_total: z.coerce.number().positive(),
  percent_comissao: z.coerce.number().min(0).max(100),
  qtd_parcelas: z.coerce.number().int().min(1).max(60),
  valor_parcela: z.coerce.number().positive(),
  primeiro_vencimento: dataFlexivel,
});

export interface RelatorioImportacao {
  totalLinhas: number;
  importadas: number;
  rejeitadas: { linha: number; motivo: string }[];
}

function normalizarCabecalho(nome: string): string {
  return nome.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, "_");
}

function adicionarMeses(data: Date, meses: number): Date {
  const d = new Date(data);
  d.setUTCMonth(d.getUTCMonth() + meses);
  return d;
}

@Injectable()
export class ImportacaoService {
  constructor(
    @Inject(PRISMA_SISTEMA) private readonly sistema: PrismaClient,
    private readonly carteira: CarteiraService,
    private readonly audit: AuditService,
  ) {}

  async importarPlanilha(
    usuario: UsuarioAutenticado,
    arquivo: Buffer,
  ): Promise<RelatorioImportacao> {
    let planilha: XLSX.WorkBook;
    try {
      planilha = XLSX.read(arquivo, { type: "buffer", cellDates: true });
    } catch {
      throw new BadRequestException("Arquivo inválido: envie uma planilha XLSX ou CSV");
    }
    const primeiraAba = planilha.SheetNames[0];
    if (!primeiraAba) {
      throw new BadRequestException("Planilha vazia");
    }
    const linhasBrutas = XLSX.utils.sheet_to_json<Record<string, unknown>>(
      planilha.Sheets[primeiraAba]!,
      { defval: "" },
    );
    if (linhasBrutas.length === 0) {
      throw new BadRequestException("Planilha sem linhas de dados");
    }

    // Catálogo: aceita slug ("porto-seguro") ou nome ("Porto Seguro"), sem case/acentos.
    const catalogo = await this.sistema.insurer.findMany({ where: { ativo: true } });
    const porChave = new Map<string, string>();
    for (const seg of catalogo) {
      porChave.set(normalizarCabecalho(seg.slug), seg.slug);
      porChave.set(normalizarCabecalho(seg.nome), seg.slug);
    }

    const relatorio: RelatorioImportacao = {
      totalLinhas: linhasBrutas.length,
      importadas: 0,
      rejeitadas: [],
    };

    for (const [indice, bruta] of linhasBrutas.entries()) {
      const numeroLinha = indice + 2; // 1 = cabeçalho
      const normalizada = Object.fromEntries(
        Object.entries(bruta).map(([k, v]) => [normalizarCabecalho(k), v]),
      );
      const parse = LinhaSchema.safeParse(normalizada);
      if (!parse.success) {
        const primeiro = parse.error.issues[0]!;
        relatorio.rejeitadas.push({
          linha: numeroLinha,
          motivo: `${primeiro.path.join(".")}: ${primeiro.message}`,
        });
        continue;
      }
      const linha = parse.data;
      const slug = porChave.get(normalizarCabecalho(linha.seguradora));
      if (!slug) {
        relatorio.rejeitadas.push({
          linha: numeroLinha,
          motivo: `seguradora "${linha.seguradora}" não encontrada no catálogo`,
        });
        continue;
      }
      try {
        await this.carteira.criarApolice(usuario, {
          insurerSlug: slug,
          numero: linha.numero_apolice,
          ramo: linha.ramo,
          seguradoNome: linha.segurado_nome,
          seguradoDocumento: linha.segurado_documento,
          ...(linha.segurado_email ? { seguradoEmail: linha.segurado_email } : {}),
          ...(linha.segurado_telefone ? { seguradoTelefone: linha.segurado_telefone } : {}),
          inicioVigencia: linha.inicio_vigencia,
          fimVigencia: linha.fim_vigencia,
          premioTotal: linha.premio_total.toFixed(2),
          percentComissaoEsperado: linha.percent_comissao.toFixed(2),
          parcelas: Array.from({ length: linha.qtd_parcelas }, (_, i) => ({
            numero: i + 1,
            valor: linha.valor_parcela.toFixed(2),
            vencimento: adicionarMeses(linha.primeiro_vencimento, i),
          })),
        });
        relatorio.importadas += 1;
      } catch (erro) {
        relatorio.rejeitadas.push({
          linha: numeroLinha,
          motivo: erro instanceof Error ? erro.message : "erro desconhecido",
        });
      }
    }

    await this.audit.registrar(
      usuario.tenantId,
      usuario.sub,
      "carteira_importada",
      "Tenant",
      usuario.tenantId,
      {
        totalLinhas: relatorio.totalLinhas,
        importadas: relatorio.importadas,
        rejeitadas: relatorio.rejeitadas.length,
      },
    );

    return relatorio;
  }
}
