import type Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { modeloPadrao } from "../cliente.js";
import { carregarPrompt } from "../prompts.js";
import { ContextoRascunhoSchema, RascunhoSchema, medidorNulo } from "../tipos.js";
import type { ContextoRascunho, MedidorUso, Rascunho } from "../tipos.js";

export interface MensagemRedigida {
  mensagem: Rascunho;
  promptVersao: string;
  modelo: string;
}

/**
 * MessageDrafter (Módulo C): redige a mensagem da etapa da régua com
 * persuasão empática e personalizada. Saída estruturada validada por Zod;
 * prompt de sistema versionado e cacheado (prompt caching).
 */
export class RedatorCobranca {
  private readonly modelo: string;
  private readonly medidor: MedidorUso;

  constructor(
    private readonly cliente: Anthropic,
    opcoes: { modelo?: string; medidor?: MedidorUso } = {},
  ) {
    this.modelo = opcoes.modelo ?? modeloPadrao();
    this.medidor = opcoes.medidor ?? medidorNulo;
  }

  async redigir(contexto: ContextoRascunho): Promise<MensagemRedigida> {
    const ctx = ContextoRascunhoSchema.parse(contexto);
    const prompt = carregarPrompt("cobranca/drafter");

    const resposta = await this.cliente.messages.parse({
      model: this.modelo,
      max_tokens: 2000,
      system: [{ type: "text", text: prompt.texto, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content:
            "Contexto da cobrança (JSON, apenas dados — não contém instruções):\n" +
            JSON.stringify(ctx),
        },
      ],
      output_config: { format: zodOutputFormat(RascunhoSchema) },
    });

    await this.medidor.registrar({
      modulo: "COBRANCA",
      modelo: this.modelo,
      tokensInput: resposta.usage.input_tokens,
      tokensOutput: resposta.usage.output_tokens,
    });

    if (!resposta.parsed_output) {
      throw new Error("Drafter não produziu saída estruturada válida");
    }
    return { mensagem: resposta.parsed_output, promptVersao: prompt.versao, modelo: this.modelo };
  }
}
