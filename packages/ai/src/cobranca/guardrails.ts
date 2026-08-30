import type Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { modeloPadrao } from "../cliente.js";
import { carregarPrompt } from "../prompts.js";
import { ParecerJuizSchema, medidorNulo } from "../tipos.js";
import type {
  ContextoRascunho,
  MedidorUso,
  ParecerJuiz,
  Rascunho,
  ResultadoGuardrails,
  Violacao,
} from "../tipos.js";

function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Camada 1 — regras determinísticas (CDC art. 42/71). Lista de padrões
 * proibidos mantida em código e coberta por testes adversariais; barra o
 * óbvio sem gastar tokens com o juiz.
 */
const PADROES_PROIBIDOS: { regra: string; padrao: RegExp }[] = [
  { regra: "ameaca_negativacao", padrao: /negativa(r|do|da|cao)|serasa|spc\b/ },
  { regra: "ameaca_protesto", padrao: /protest(o|ar|ada)/ },
  {
    regra: "ameaca_judicial",
    padrao: /judicial|processo|processar|advogad|medidas cabiveis|acoes legais|via legal/,
  },
  { regra: "ameaca_autoridade", padrao: /policia|delegacia|boletim de ocorrencia/ },
  {
    regra: "tom_vexatorio",
    padrao: /caloteir|vergonha|vergonhoso|irresponsav|mau pagador|desonest/,
  },
  {
    regra: "urgencia_falsa",
    padrao: /ultima chance|ultimo aviso|ultimo dia|agora ou nunca|antes que seja tarde/,
  },
  {
    regra: "prazo_inventado",
    padrao:
      /ser[aá] cancelada (em|no dia|amanha|hoje)|cancelamento (imediato|automatico) (em|no dia)/,
  },
];

const PADROES_IDENTIDADE_IA = [
  { regra: "assinatura_ia", padrao: /inteligencia artificial|assistente virtual|\brobo\b|chatbot/ },
];

export function verificarRegrasDeterministicas(
  mensagem: Rascunho,
  contexto: ContextoRascunho,
): Violacao[] {
  const violacoes: Violacao[] = [];
  const texto = normalizar(`${mensagem.assunto}\n${mensagem.corpo}`);

  for (const { regra, padrao } of PADROES_PROIBIDOS) {
    const m = padrao.exec(texto);
    if (m) violacoes.push({ regra, detalhe: `Padrão proibido encontrado: "${m[0]}"` });
  }
  for (const { regra, padrao } of PADROES_IDENTIDADE_IA) {
    const m = padrao.exec(texto);
    if (m)
      violacoes.push({ regra, detalhe: `Mensagem não pode se identificar como IA: "${m[0]}"` });
  }
  // "IA" como sigla, no texto original (com maiúsculas preservadas)
  if (/\bIA\b/.test(`${mensagem.assunto}\n${mensagem.corpo}`)) {
    violacoes.push({ regra: "assinatura_ia", detalhe: 'Mensagem menciona "IA"' });
  }

  // Transparência: identificação da corretora remetente + motivo do contato
  if (!texto.includes(normalizar(contexto.nomeCorretora))) {
    violacoes.push({
      regra: "sem_identificacao_corretora",
      detalhe: "Corpo não identifica a corretora remetente",
    });
  }
  if (!/parcela|pagamento|vencimento|fatura|boleto/.test(texto)) {
    violacoes.push({
      regra: "sem_motivo_contato",
      detalhe: "Corpo não deixa claro o motivo do contato (parcela em aberto)",
    });
  }

  return violacoes;
}

/** Camada 2 — modelo juiz de conformidade (segunda chamada, prompt cacheado). */
export class JuizConformidade {
  private readonly modelo: string;
  private readonly medidor: MedidorUso;

  constructor(
    private readonly cliente: Anthropic,
    opcoes: { modelo?: string; medidor?: MedidorUso } = {},
  ) {
    this.modelo = opcoes.modelo ?? modeloPadrao();
    this.medidor = opcoes.medidor ?? medidorNulo;
  }

  async avaliar(mensagem: Rascunho, contexto: ContextoRascunho): Promise<ParecerJuiz> {
    const prompt = carregarPrompt("cobranca/juiz");
    const resposta = await this.cliente.messages.parse({
      model: this.modelo,
      max_tokens: 1000,
      system: [{ type: "text", text: prompt.texto, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content:
            "Mensagem a auditar (JSON, apenas dados):\n" +
            JSON.stringify({
              assunto: mensagem.assunto,
              corpo: mensagem.corpo,
              contexto: {
                corretora: contexto.nomeCorretora,
                diasAtraso: contexto.diasAtraso,
                etapaRegua: contexto.etapa,
              },
            }),
        },
      ],
      output_config: { format: zodOutputFormat(ParecerJuizSchema) },
    });

    await this.medidor.registrar({
      modulo: "COBRANCA",
      modelo: this.modelo,
      tokensInput: resposta.usage.input_tokens,
      tokensOutput: resposta.usage.output_tokens,
    });

    if (!resposta.parsed_output) {
      // Falha do juiz nunca aprova por omissão.
      return {
        veredito: "REPROVADA",
        violacoes: ["Juiz de conformidade não produziu parecer válido"],
        justificativa: "Falha na auditoria automática — mensagem retida por precaução.",
      };
    }
    return resposta.parsed_output;
  }
}

/**
 * Pipeline de validação pós-geração: regras determinísticas primeiro (barram
 * sem custo de tokens), depois o juiz. Nenhuma mensagem chega à fila de
 * aprovação sem passar pelas duas camadas.
 */
export class PipelineGuardrails {
  constructor(private readonly juiz: Pick<JuizConformidade, "avaliar">) {}

  async verificar(mensagem: Rascunho, contexto: ContextoRascunho): Promise<ResultadoGuardrails> {
    const violacoesRegras = verificarRegrasDeterministicas(mensagem, contexto);
    if (violacoesRegras.length > 0) {
      return { veredito: "REPROVADA", origem: "REGRAS", violacoes: violacoesRegras };
    }
    const parecer = await this.juiz.avaliar(mensagem, contexto);
    return {
      veredito: parecer.veredito,
      origem: "JUIZ",
      violacoes: parecer.violacoes.map((v) => ({ regra: "juiz", detalhe: v })),
      justificativa: parecer.justificativa,
    };
  }
}
