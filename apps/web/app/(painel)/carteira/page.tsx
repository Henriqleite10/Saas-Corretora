"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, CardTitulo, Input } from "@radar/ui";
import { api, apiUpload } from "../../../lib/api";

interface Apolice {
  id: string;
  numero: string;
  ramo: string;
  status: string;
  seguradoNome: string;
  seguradoDocumento: string;
  seguradora: { nome: string };
  premioTotal: string;
  percentComissaoEsperado: string;
}

interface Relatorio {
  totalLinhas: number;
  importadas: number;
  rejeitadas: { linha: number; motivo: string }[];
}

const tomStatus: Record<string, "sucesso" | "erro" | "alerta" | "neutro"> = {
  ATIVA: "sucesso",
  CANCELADA: "erro",
  SUSPENSA: "alerta",
  VENCIDA: "neutro",
};

export default function CarteiraPage() {
  const [apolices, setApolices] = useState<Apolice[]>([]);
  const [total, setTotal] = useState(0);
  const [busca, setBusca] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [importando, setImportando] = useState(false);

  const carregar = useCallback(async (filtroBusca = "") => {
    const query = filtroBusca ? `?busca=${encodeURIComponent(filtroBusca)}` : "";
    const res = await api<{ itens: Apolice[]; total: number }>(`/carteira/apolices${query}`);
    setApolices(res.itens);
    setTotal(res.total);
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function importar(e: React.FormEvent) {
    e.preventDefault();
    if (!arquivo) return;
    setErro(null);
    setRelatorio(null);
    setImportando(true);
    try {
      const form = new FormData();
      form.set("arquivo", arquivo);
      const res = await apiUpload<Relatorio>("/carteira/importar", form);
      setRelatorio(res);
      setArquivo(null);
      await carregar(busca);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Falha na importação");
    } finally {
      setImportando(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Carteira</h1>

      <Card>
        <CardTitulo>Importar carteira (planilha)</CardTitulo>
        <form onSubmit={importar} className="flex flex-wrap items-end gap-4">
          <div className="min-w-64 flex-1">
            <Input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
            />
          </div>
          <Button type="submit" disabled={!arquivo || importando}>
            {importando ? "Importando..." : "Importar"}
          </Button>
        </form>
        <p className="mt-2 text-xs text-slate-500">
          Colunas esperadas: seguradora, numero_apolice, ramo, segurado_nome, segurado_documento,
          segurado_email, segurado_telefone, inicio_vigencia, fim_vigencia, premio_total,
          percent_comissao, qtd_parcelas, valor_parcela, primeiro_vencimento.
        </p>
        {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}
        {relatorio && (
          <div className="mt-4 rounded-md bg-slate-50 p-4 text-sm">
            <p className="font-medium text-slate-900">
              {relatorio.importadas} de {relatorio.totalLinhas} linhas importadas
            </p>
            {relatorio.rejeitadas.length > 0 && (
              <ul className="mt-2 list-inside list-disc space-y-1 text-amber-800">
                {relatorio.rejeitadas.map((r, i) => (
                  <li key={i}>
                    Linha {r.linha}: {r.motivo}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-4">
          <CardTitulo className="mb-0">
            Apólices <Badge className="ml-2">{total}</Badge>
          </CardTitulo>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void carregar(busca);
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Buscar por segurado ou nº"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-64"
            />
            <Button variante="secundario" type="submit">
              Buscar
            </Button>
          </form>
        </div>
        {apolices.length === 0 ? (
          <p className="text-sm text-slate-600">Nenhuma apólice na carteira ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2 pr-4">Apólice</th>
                  <th className="py-2 pr-4">Seguradora</th>
                  <th className="py-2 pr-4">Ramo</th>
                  <th className="py-2 pr-4">Segurado</th>
                  <th className="py-2 pr-4">Documento</th>
                  <th className="py-2 pr-4">Prêmio</th>
                  <th className="py-2 pr-4">% Com.</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {apolices.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-mono text-xs">{a.numero}</td>
                    <td className="py-2 pr-4">{a.seguradora.nome}</td>
                    <td className="py-2 pr-4">{a.ramo}</td>
                    <td className="max-w-[14rem] truncate py-2 pr-4">{a.seguradoNome}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{a.seguradoDocumento}</td>
                    <td className="py-2 pr-4">
                      {Number(a.premioTotal).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-2 pr-4">{a.percentComissaoEsperado}%</td>
                    <td className="py-2">
                      <Badge tom={tomStatus[a.status] ?? "neutro"}>{a.status}</Badge>
                    </td>
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
