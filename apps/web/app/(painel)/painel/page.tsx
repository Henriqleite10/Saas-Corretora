"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, CardTitulo } from "@radar/ui";
import { api } from "../../../lib/api";

interface Resumo {
  parcelasAtrasadas: number;
  valorEmAtraso: string;
  flowsEmAndamento: number;
  comissaoEmRisco: string;
  mesAtual: { apolicesSalvas: number; comissaoPreservada: string; perdidas: number };
  total: { apolicesSalvas: number; comissaoPreservada: string };
}

interface ParcelaAtrasada {
  id: string;
  numero: number;
  valor: string;
  vencimento: string;
  diasAtraso: number;
  apolice: {
    numero: string;
    ramo: string;
    seguradoNome: string;
    seguradoDocumento: string;
    seguradoOptOut: boolean;
    seguradora: { nome: string };
  };
  regua: {
    desfecho: string;
    comissaoEmRisco: string;
    etapas: { ordem: number; canal: string; status: string; agendadaPara: string }[];
  } | null;
}

function brl(valor: string | number): string {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function proximaEtapa(regua: ParcelaAtrasada["regua"]): string {
  if (!regua) return "Fora da régua";
  const pendente = regua.etapas.find((e) => e.status === "AGENDADA");
  if (!pendente) return "Régua concluída";
  return `Etapa ${pendente.ordem} em ${new Date(pendente.agendadaPara).toLocaleDateString("pt-BR")}`;
}

export default function PainelPage() {
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [parcelas, setParcelas] = useState<ParcelaAtrasada[]>([]);
  const [atualizando, setAtualizando] = useState(false);

  const carregar = useCallback(async () => {
    const [r, p] = await Promise.all([
      api<Resumo>("/radar/resumo"),
      api<ParcelaAtrasada[]>("/radar/parcelas-atrasadas"),
    ]);
    setResumo(r);
    setParcelas(p);
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function atualizarRadar() {
    setAtualizando(true);
    try {
      await api("/radar/executar", { method: "POST" });
      // A varredura roda no worker — recarrega após alguns segundos.
      setTimeout(() => {
        void carregar().finally(() => setAtualizando(false));
      }, 3000);
    } catch {
      setAtualizando(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Radar de Inadimplência</h1>
        <Button variante="secundario" onClick={atualizarRadar} disabled={atualizando}>
          {atualizando ? "Atualizando..." : "Atualizar radar"}
        </Button>
      </div>

      {resumo && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-sm text-slate-500">Parcelas em atraso</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{resumo.parcelasAtrasadas}</p>
            <p className="mt-1 text-sm text-slate-500">{brl(resumo.valorEmAtraso)} em aberto</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Comissão em risco</p>
            <p className="mt-1 text-3xl font-semibold text-amber-600">
              {brl(resumo.comissaoEmRisco)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {resumo.flowsEmAndamento} réguas em andamento
            </p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Apólices salvas no mês</p>
            <p className="mt-1 text-3xl font-semibold text-emerald-600">
              {resumo.mesAtual.apolicesSalvas}
            </p>
            <p className="mt-1 text-sm text-slate-500">{resumo.mesAtual.perdidas} perdidas</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Comissão preservada no mês</p>
            <p className="mt-1 text-3xl font-semibold text-emerald-600">
              {brl(resumo.mesAtual.comissaoPreservada)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {brl(resumo.total.comissaoPreservada)} desde o início
            </p>
          </Card>
        </div>
      )}

      <Card>
        <CardTitulo>Parcelas em atraso</CardTitulo>
        {parcelas.length === 0 ? (
          <p className="text-sm text-slate-600">
            Nenhuma parcela em atraso no radar. Importe sua carteira e clique em “Atualizar radar”.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2 pr-4">Segurado</th>
                  <th className="py-2 pr-4">Apólice</th>
                  <th className="py-2 pr-4">Seguradora</th>
                  <th className="py-2 pr-4">Ramo</th>
                  <th className="py-2 pr-4">Parcela</th>
                  <th className="py-2 pr-4">Vencimento</th>
                  <th className="py-2 pr-4">Dias</th>
                  <th className="py-2 pr-4">Comissão em risco</th>
                  <th className="py-2">Régua</th>
                </tr>
              </thead>
              <tbody>
                {parcelas.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4">
                      <span className="font-medium text-slate-900">{p.apolice.seguradoNome}</span>
                      <span className="ml-2 font-mono text-xs text-slate-500">
                        {p.apolice.seguradoDocumento}
                      </span>
                      {p.apolice.seguradoOptOut && (
                        <Badge tom="erro" className="ml-2">
                          Opt-out
                        </Badge>
                      )}
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">{p.apolice.numero}</td>
                    <td className="py-2 pr-4">{p.apolice.seguradora.nome}</td>
                    <td className="py-2 pr-4">{p.apolice.ramo}</td>
                    <td className="py-2 pr-4">
                      {p.numero} · {brl(p.valor)}
                    </td>
                    <td className="py-2 pr-4">
                      {new Date(p.vencimento).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-2 pr-4">
                      <Badge tom={p.diasAtraso >= 20 ? "erro" : "alerta"}>{p.diasAtraso}d</Badge>
                    </td>
                    <td className="py-2 pr-4">{p.regua ? brl(p.regua.comissaoEmRisco) : "—"}</td>
                    <td className="py-2 text-xs text-slate-600">{proximaEtapa(p.regua)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
