"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, Input, Label } from "@radar/ui";
import { api } from "../../../lib/api";

interface MensagemAprovacao {
  id: string;
  assunto: string | null;
  corpoGerado: string | null;
  justificativa: string | null;
  promptVersao: string | null;
  criadoEm: string;
  step: { ordem: number } | null;
  conversation: {
    canal: string;
    policy: { numero: string; ramo: string; seguradoNome: string };
    flow: {
      valorComissaoEmRisco: string;
      installment: { numero: number; valor: string; diasAtraso: number };
    };
  };
}

interface MensagemHistorico {
  id: string;
  assunto: string | null;
  statusAprovacao: string;
  editadaPeloCorretor: boolean;
  enviadaEm: string | null;
  criadoEm: string;
  aprovadaPor: { nome: string } | null;
  conversation: { canal: string; policy: { numero: string; seguradoNome: string } };
}

const rotuloStatus: Record<
  string,
  { texto: string; tom: "sucesso" | "neutro" | "info" | "alerta" }
> = {
  APROVADA: { texto: "Aprovada — envio na fila", tom: "info" },
  EDITADA_E_APROVADA: { texto: "Editada e aprovada", tom: "info" },
  ENVIADA: { texto: "Enviada", tom: "sucesso" },
  DESCARTADA: { texto: "Descartada", tom: "neutro" },
};

function brl(valor: string): string {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function CartaoAprovacao({
  mensagem,
  aoConcluir,
}: {
  mensagem: MensagemAprovacao;
  aoConcluir: () => void;
}) {
  const [assunto, setAssunto] = useState(mensagem.assunto ?? "");
  const [corpo, setCorpo] = useState(mensagem.corpoGerado ?? "");
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const p = mensagem.conversation;

  async function decidir(acao: "aprovar" | "descartar") {
    setOcupado(true);
    setErro(null);
    try {
      if (acao === "aprovar") {
        await api(`/cobrancas/mensagens/${mensagem.id}/aprovar`, {
          method: "POST",
          corpo: { assunto, corpo },
        });
      } else {
        await api(`/cobrancas/mensagens/${mensagem.id}/descartar`, { method: "POST" });
      }
      aoConcluir();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha na operação");
      setOcupado(false);
    }
  }

  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-slate-900">{p.policy.seguradoNome}</span>
        <span className="font-mono text-xs text-slate-500">{p.policy.numero}</span>
        <Badge>{p.policy.ramo}</Badge>
        <Badge tom="alerta">{p.flow.installment.diasAtraso} dias de atraso</Badge>
        <Badge tom="info">
          Parcela {p.flow.installment.numero} · {brl(p.flow.installment.valor)}
        </Badge>
        <Badge>Etapa {mensagem.step?.ordem ?? "—"}</Badge>
        <span className="ml-auto text-xs text-slate-400">
          {brl(p.flow.valorComissaoEmRisco)} de comissão em risco
        </span>
      </div>

      {mensagem.justificativa && (
        <p className="mb-3 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
          <span className="font-medium text-slate-800">Abordagem do agente:</span>{" "}
          {mensagem.justificativa}
        </p>
      )}

      <div className="space-y-3">
        <div>
          <Label htmlFor={`assunto-${mensagem.id}`}>Assunto</Label>
          <Input
            id={`assunto-${mensagem.id}`}
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`corpo-${mensagem.id}`}>Mensagem (edite à vontade)</Label>
          <textarea
            id={`corpo-${mensagem.id}`}
            value={corpo}
            onChange={(e) => setCorpo(e.target.value)}
            rows={8}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
      </div>

      {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}

      <div className="mt-4 flex gap-3">
        <Button onClick={() => decidir("aprovar")} disabled={ocupado}>
          {ocupado ? "Processando..." : "Aprovar e enviar"}
        </Button>
        <Button variante="secundario" onClick={() => decidir("descartar")} disabled={ocupado}>
          Descartar
        </Button>
        <span className="ml-auto self-center text-xs text-slate-400">{mensagem.promptVersao}</span>
      </div>
    </Card>
  );
}

export default function CobrancasPage() {
  const [fila, setFila] = useState<MensagemAprovacao[]>([]);
  const [historico, setHistorico] = useState<MensagemHistorico[]>([]);

  const carregar = useCallback(async () => {
    const [f, h] = await Promise.all([
      api<MensagemAprovacao[]>("/cobrancas/aprovacoes"),
      api<MensagemHistorico[]>("/cobrancas/historico"),
    ]);
    setFila(f);
    setHistorico(h);
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Cobranças</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-slate-900">
          Fila de aprovação{" "}
          <Badge tom={fila.length > 0 ? "alerta" : "neutro"} className="ml-1">
            {fila.length}
          </Badge>
        </h2>
        {fila.length === 0 ? (
          <Card>
            <p className="text-sm text-slate-600">
              Nenhuma mensagem aguardando aprovação. O agente redige automaticamente quando uma
              etapa da régua vence — as mensagens aparecem aqui para sua revisão antes do envio.
            </p>
          </Card>
        ) : (
          fila.map((m) => <CartaoAprovacao key={m.id} mensagem={m} aoConcluir={carregar} />)
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-slate-900">Histórico recente</h2>
        <Card>
          {historico.length === 0 ? (
            <p className="text-sm text-slate-600">Nada por aqui ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                    <th className="py-2 pr-4">Segurado</th>
                    <th className="py-2 pr-4">Apólice</th>
                    <th className="py-2 pr-4">Canal</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Editada</th>
                    <th className="py-2">Decidida por</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((m) => {
                    const rotulo = rotuloStatus[m.statusAprovacao] ?? {
                      texto: m.statusAprovacao,
                      tom: "neutro" as const,
                    };
                    return (
                      <tr key={m.id} className="border-b border-slate-100">
                        <td className="py-2 pr-4">{m.conversation.policy.seguradoNome}</td>
                        <td className="py-2 pr-4 font-mono text-xs">
                          {m.conversation.policy.numero}
                        </td>
                        <td className="py-2 pr-4">{m.conversation.canal}</td>
                        <td className="py-2 pr-4">
                          <Badge tom={rotulo.tom}>{rotulo.texto}</Badge>
                        </td>
                        <td className="py-2 pr-4">{m.editadaPeloCorretor ? "Sim" : "Não"}</td>
                        <td className="py-2">{m.aprovadaPor?.nome ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
