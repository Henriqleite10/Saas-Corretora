"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge, Card, CardTitulo } from "@radar/ui";
import { api } from "../../../../lib/api";

interface Entrada {
  id: string;
  numeroApolice: string;
  numeroParcela: number | null;
  seguradoNome: string | null;
  competencia: string;
  premioParcela: string | null;
  valorComissao: string;
  percentComissao: string | null;
  dataPagamento: string | null;
  linhaOrigem: number;
}

interface Detalhe {
  id: string;
  competencia: string;
  arquivoNome: string;
  status: string;
  formatVersion: string | null;
  linhasTotais: number | null;
  linhasRejeitadas: { linha: number; motivo: string; conteudoBruto: string }[] | null;
  insurer: { nome: string };
  entries: Entrada[];
  _count: { entries: number };
}

function dinheiro(valor: string | null): string {
  if (valor === null) return "—";
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ExtratoDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const [detalhe, setDetalhe] = useState<Detalhe | null>(null);

  useEffect(() => {
    void api<Detalhe>(`/extratos/${id}`).then(setDetalhe);
  }, [id]);

  if (!detalhe) return <p className="text-sm text-slate-600">Carregando…</p>;

  const rejeitadas = detalhe.linhasRejeitadas ?? [];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link href="/extratos" className="text-sm text-slate-500 underline">
          ← Extratos
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          {detalhe.insurer.nome} — {detalhe.competencia}
        </h1>
        <p className="text-sm text-slate-500">
          {detalhe.arquivoNome}
          {detalhe.formatVersion ? ` · formato ${detalhe.formatVersion}` : ""} ·{" "}
          {detalhe._count.entries} lançamentos
        </p>
      </div>

      {rejeitadas.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardTitulo className="text-amber-900">
            Linhas para revisão ({rejeitadas.length})
          </CardTitulo>
          <p className="mb-3 text-sm text-amber-800">
            Estas linhas não puderam ser importadas automaticamente. Corrija no arquivo de origem e
            reenvie, ou lance manualmente na carteira.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-amber-200 text-xs uppercase text-amber-700">
                  <th className="py-2 pr-4">Linha</th>
                  <th className="py-2 pr-4">Motivo</th>
                  <th className="py-2">Conteúdo</th>
                </tr>
              </thead>
              <tbody>
                {rejeitadas.map((r, i) => (
                  <tr key={i} className="border-b border-amber-100 align-top">
                    <td className="py-2 pr-4">{r.linha || "—"}</td>
                    <td className="py-2 pr-4">{r.motivo}</td>
                    <td className="max-w-[24rem] truncate py-2 font-mono text-xs">
                      {r.conteudoBruto}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card>
        <CardTitulo>
          Lançamentos normalizados{" "}
          <Badge tom="neutro" className="ml-2">
            {detalhe._count.entries}
          </Badge>
        </CardTitulo>
        {detalhe.entries.length === 0 ? (
          <p className="text-sm text-slate-600">Nenhum lançamento importado deste arquivo.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2 pr-4">Apólice</th>
                  <th className="py-2 pr-4">Parcela</th>
                  <th className="py-2 pr-4">Segurado</th>
                  <th className="py-2 pr-4">Prêmio</th>
                  <th className="py-2 pr-4">%</th>
                  <th className="py-2 pr-4">Comissão</th>
                  <th className="py-2 pr-4">Pagamento</th>
                  <th className="py-2">Linha</th>
                </tr>
              </thead>
              <tbody>
                {detalhe.entries.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-mono text-xs">{e.numeroApolice}</td>
                    <td className="py-2 pr-4">{e.numeroParcela ?? "—"}</td>
                    <td className="max-w-[14rem] truncate py-2 pr-4">{e.seguradoNome ?? "—"}</td>
                    <td className="py-2 pr-4">{dinheiro(e.premioParcela)}</td>
                    <td className="py-2 pr-4">
                      {e.percentComissao ? `${e.percentComissao}%` : "—"}
                    </td>
                    <td
                      className={`py-2 pr-4 ${Number(e.valorComissao) < 0 ? "text-red-600" : ""}`}
                    >
                      {dinheiro(e.valorComissao)}
                    </td>
                    <td className="py-2 pr-4">
                      {e.dataPagamento
                        ? new Date(e.dataPagamento).toLocaleDateString("pt-BR")
                        : "—"}
                    </td>
                    <td className="py-2 text-xs text-slate-500">{e.linhaOrigem}</td>
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
