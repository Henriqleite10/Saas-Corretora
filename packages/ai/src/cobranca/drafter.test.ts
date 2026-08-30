import { describe, expect, it, vi } from "vitest";
import { RedatorCobranca } from "./drafter.js";
import { carregarPrompt } from "../prompts.js";
import type { ContextoRascunho } from "../tipos.js";

const contexto: ContextoRascunho = {
  nomeCorretora: "Corretora Confiança",
  nomeSegurado: "João",
  ramo: "AUTO",
  valorParcela: "185.50",
  numeroParcela: 3,
  diasAtraso: 12,
  historico: "PRIMEIRO_ATRASO",
  etapa: { ordem: 2, total: 3 },
  tom: "cordial",
  canal: "EMAIL",
};

describe("prompts versionados", () => {
  it("carrega frontmatter com versão", () => {
    const drafter = carregarPrompt("cobranca/drafter");
    expect(drafter.versao).toMatch(/^cobranca-drafter@\d+\.\d+\.\d+$/);
    expect(drafter.texto).toContain("CDC");
    const juiz = carregarPrompt("cobranca/juiz");
    expect(juiz.versao).toMatch(/^cobranca-juiz@/);
  });
});

describe("RedatorCobranca (cliente stub)", () => {
  it("envia contexto validado, usa prompt cacheado e devolve rascunho + versão", async () => {
    const parse = vi.fn().mockResolvedValue({
      parsed_output: {
        assunto: "Sua proteção está em aberto",
        corpo: "Olá João... Corretora Confiança",
        justificativa: "Primeiro atraso, tom leve.",
      },
      usage: { input_tokens: 900, output_tokens: 250 },
    });
    const registrar = vi.fn().mockResolvedValue(undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const redator = new RedatorCobranca({ messages: { parse } } as any, {
      modelo: "claude-teste",
      medidor: { registrar },
    });

    const resultado = await redator.redigir(contexto);
    expect(resultado.mensagem.assunto).toContain("proteção");
    expect(resultado.promptVersao).toMatch(/^cobranca-drafter@/);

    const chamada = parse.mock.calls[0]![0];
    expect(chamada.model).toBe("claude-teste");
    expect(chamada.system[0].cache_control).toEqual({ type: "ephemeral" });
    expect(chamada.messages[0].content).toContain('"diasAtraso":12');
    // PII mínima: contexto nunca leva CPF/contatos (canal "EMAIL" é permitido)
    expect(chamada.messages[0].content).not.toMatch(/cpf|cnpj|documento|telefone|seguradoEmail/i);

    expect(registrar).toHaveBeenCalledWith({
      modulo: "COBRANCA",
      modelo: "claude-teste",
      tokensInput: 900,
      tokensOutput: 250,
    });
  });

  it("lança erro se a saída estruturada não vier", async () => {
    const parse = vi.fn().mockResolvedValue({
      parsed_output: null,
      usage: { input_tokens: 10, output_tokens: 0 },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const redator = new RedatorCobranca({ messages: { parse } } as any, { modelo: "m" });
    await expect(redator.redigir(contexto)).rejects.toThrow(/estruturada/);
  });

  it("rejeita contexto inválido antes de chamar o modelo", async () => {
    const parse = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const redator = new RedatorCobranca({ messages: { parse } } as any, { modelo: "m" });
    await expect(
      redator.redigir({ ...contexto, diasAtraso: -1 } as ContextoRascunho),
    ).rejects.toThrow();
    expect(parse).not.toHaveBeenCalled();
  });
});
