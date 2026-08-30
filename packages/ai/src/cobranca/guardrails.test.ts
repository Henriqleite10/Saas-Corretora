/**
 * Guardrails do agente de cobrança — requisito não negociável (seção 6):
 * fixtures adversariais provam que ameaça, constrangimento, urgência falsa,
 * falta de transparência e assinatura como IA são barrados.
 */
import { describe, expect, it, vi } from "vitest";
import {
  JuizConformidade,
  PipelineGuardrails,
  verificarRegrasDeterministicas,
} from "./guardrails.js";
import type { ContextoRascunho, Rascunho } from "../tipos.js";

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

const mensagemLegitima: Rascunho = {
  assunto: "Sua proteção do carro está em aberto",
  corpo:
    "Olá, João! Aqui é a Corretora Confiança. Notamos que a parcela 3 do seu seguro auto, " +
    "de R$ 185,50, está em aberto há 12 dias. Sabemos que é fácil passar despercebido — " +
    "segue a 2ª via para regularizar e manter seu carro protegido. Qualquer dificuldade, " +
    "responda esta mensagem que a gente resolve junto. Abraço, Corretora Confiança.",
  justificativa: "Primeiro atraso: tom leve, presume esquecimento, facilita o pagamento.",
};

function comCorpo(corpo: string): Rascunho {
  return { ...mensagemLegitima, corpo };
}

describe("regras determinísticas (CDC art. 42/71)", () => {
  it("aprova mensagem legítima", () => {
    expect(verificarRegrasDeterministicas(mensagemLegitima, contexto)).toHaveLength(0);
  });

  const adversariais: { nome: string; corpo: string; regra: string }[] = [
    {
      nome: "ameaça de negativação",
      corpo:
        "Corretora Confiança: sua parcela está em aberto e seu nome será negativado no Serasa.",
      regra: "ameaca_negativacao",
    },
    {
      nome: "ameaça de protesto",
      corpo: "Corretora Confiança avisa: a parcela em aberto será levada a protesto em cartório.",
      regra: "ameaca_protesto",
    },
    {
      nome: "ameaça judicial",
      corpo:
        "Corretora Confiança: regularize a parcela ou tomaremos as medidas cabiveis com nosso advogado.",
      regra: "ameaca_judicial",
    },
    {
      nome: "tom vexatório",
      corpo:
        "Corretora Confiança: não seja um mau pagador, é uma vergonha deixar a parcela atrasar.",
      regra: "tom_vexatorio",
    },
    {
      nome: "urgência falsa",
      corpo:
        "Corretora Confiança: ÚLTIMA CHANCE de pagar sua parcela hoje, depois não haverá mais nada a fazer.",
      regra: "urgencia_falsa",
    },
    {
      nome: "prazo de cancelamento inventado",
      corpo:
        "Corretora Confiança: sua parcela está em aberto e a apólice será cancelada amanhã sem falta.",
      regra: "prazo_inventado",
    },
    {
      nome: "assinatura como IA",
      corpo:
        "Sou o assistente virtual da Corretora Confiança e vim lembrar da sua parcela em aberto.",
      regra: "assinatura_ia",
    },
  ];

  for (const caso of adversariais) {
    it(`reprova: ${caso.nome}`, () => {
      const violacoes = verificarRegrasDeterministicas(comCorpo(caso.corpo), contexto);
      expect(violacoes.map((v) => v.regra)).toContain(caso.regra);
    });
  }

  it('reprova menção a "IA" como sigla', () => {
    const violacoes = verificarRegrasDeterministicas(
      comCorpo("Mensagem gerada por IA para a Corretora Confiança sobre sua parcela."),
      contexto,
    );
    expect(violacoes.map((v) => v.regra)).toContain("assinatura_ia");
  });

  it("reprova mensagem sem identificação da corretora (transparência)", () => {
    const violacoes = verificarRegrasDeterministicas(
      comCorpo("Olá! Sua parcela está em aberto, pague o quanto antes."),
      contexto,
    );
    expect(violacoes.map((v) => v.regra)).toContain("sem_identificacao_corretora");
  });

  it("reprova mensagem sem motivo claro de contato", () => {
    const violacoes = verificarRegrasDeterministicas(
      comCorpo("Olá, aqui é a Corretora Confiança! Entre em contato conosco hoje."),
      contexto,
    );
    expect(violacoes.map((v) => v.regra)).toContain("sem_motivo_contato");
  });

  it("aversão à perda honesta NÃO é barrada", () => {
    const violacoes = verificarRegrasDeterministicas(
      comCorpo(
        "Corretora Confiança: sua parcela segue em aberto e, sem o pagamento, seu carro pode " +
          "ficar sem proteção contra roubo e acidentes. Vamos resolver juntos?",
      ),
      contexto,
    );
    expect(violacoes).toHaveLength(0);
  });
});

describe("pipeline de guardrails", () => {
  it("regras determinísticas barram sem chamar o juiz", async () => {
    const avaliar = vi.fn();
    const pipeline = new PipelineGuardrails({ avaliar });
    const resultado = await pipeline.verificar(
      comCorpo("Corretora Confiança: pague a parcela ou aciono o Serasa."),
      contexto,
    );
    expect(resultado.veredito).toBe("REPROVADA");
    expect(resultado.origem).toBe("REGRAS");
    expect(avaliar).not.toHaveBeenCalled();
  });

  it("mensagem limpa nas regras vai ao juiz, que pode reprovar", async () => {
    const avaliar = vi.fn().mockResolvedValue({
      veredito: "REPROVADA",
      violacoes: ["Constrangimento sutil"],
      justificativa: "Tom humilhante.",
    });
    const pipeline = new PipelineGuardrails({ avaliar });
    const resultado = await pipeline.verificar(mensagemLegitima, contexto);
    expect(avaliar).toHaveBeenCalledOnce();
    expect(resultado.veredito).toBe("REPROVADA");
    expect(resultado.origem).toBe("JUIZ");
    expect(resultado.violacoes[0]!.detalhe).toBe("Constrangimento sutil");
  });

  it("aprovada nas duas camadas", async () => {
    const avaliar = vi.fn().mockResolvedValue({
      veredito: "APROVADA",
      violacoes: [],
      justificativa: "Conforme.",
    });
    const pipeline = new PipelineGuardrails({ avaliar });
    const resultado = await pipeline.verificar(mensagemLegitima, contexto);
    expect(resultado.veredito).toBe("APROVADA");
    expect(resultado.origem).toBe("JUIZ");
  });
});

describe("JuizConformidade (cliente stub)", () => {
  function stubCliente(parsed: unknown) {
    return {
      messages: {
        parse: vi.fn().mockResolvedValue({
          parsed_output: parsed,
          usage: { input_tokens: 500, output_tokens: 80 },
        }),
      },
    };
  }

  it("registra uso de tokens e devolve o parecer", async () => {
    const registrar = vi.fn().mockResolvedValue(undefined);
    const cliente = stubCliente({
      veredito: "APROVADA",
      violacoes: [],
      justificativa: "ok",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const juiz = new JuizConformidade(cliente as any, {
      modelo: "claude-teste",
      medidor: { registrar },
    });
    const parecer = await juiz.avaliar(mensagemLegitima, contexto);
    expect(parecer.veredito).toBe("APROVADA");
    expect(registrar).toHaveBeenCalledWith({
      modulo: "COBRANCA",
      modelo: "claude-teste",
      tokensInput: 500,
      tokensOutput: 80,
    });
  });

  it("falha do parse nunca aprova por omissão", async () => {
    const cliente = stubCliente(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const juiz = new JuizConformidade(cliente as any, { modelo: "claude-teste" });
    const parecer = await juiz.avaliar(mensagemLegitima, contexto);
    expect(parecer.veredito).toBe("REPROVADA");
  });
});
