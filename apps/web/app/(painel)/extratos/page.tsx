"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button, Card, CardTitulo, Input, Label, Select } from "@radar/ui";
import { api, apiUpload } from "../../../lib/api";

interface Seguradora {
  slug: string;
  nome: string;
}
interface Vinculo {
  insurer: Seguradora;
}
interface Extrato {
  id: string;
  competencia: string;
  arquivoNome: string;
  status: string;
  formatVersion: string | null;
  linhasTotais: number | null;
  linhasRejeitadas: { motivo: string }[] | null;
  criadoEm: string;
  insurer: Seguradora;
  _count: { entries: number };
}

const tomDoStatus: Record<string, "neutro" | "sucesso" | "alerta" | "erro" | "info"> = {
  RECEBIDO: "info",
  PROCESSANDO: "info",
  PROCESSADO: "sucesso",
  PROCESSADO_COM_ERROS: "alerta",
  FALHOU: "erro",
};

const rotuloStatus: Record<string, string> = {
  RECEBIDO: "Recebido",
  PROCESSANDO: "Processando",
  PROCESSADO: "Processado",
  PROCESSADO_COM_ERROS: "Processado com erros",
  FALHOU: "Falhou",
};

export default function ExtratosPage() {
  const [vinculos, setVinculos] = useState<Vinculo[]>([]);
  const [extratos, setExtratos] = useState<Extrato[]>([]);
  const [insurerSlug, setInsurerSlug] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const carregar = useCallback(async () => {
    const [v, e] = await Promise.all([
      api<Vinculo[]>("/seguradoras/vinculos"),
      api<Extrato[]>("/extratos"),
    ]);
    setVinculos(v);
    setExtratos(e);
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  // Atualização simples enquanto houver extrato em processamento.
  useEffect(() => {
    const pendentes = extratos.some((e) => e.status === "RECEBIDO" || e.status === "PROCESSANDO");
    if (!pendentes) return;
    const timer = setTimeout(() => void carregar(), 3000);
    return () => clearTimeout(timer);
  }, [extratos, carregar]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!arquivo || !insurerSlug || !competencia) return;
    setMensagem(null);
    setEnviando(true);
    try {
      const form = new FormData();
      form.set("insurerSlug", insurerSlug);
      form.set("competencia", competencia);
      form.set("arquivo", arquivo);
      await apiUpload("/extratos", form);
      setArquivo(null);
      setMensagem("Extrato enviado — processamento iniciado.");
      await carregar();
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : "Falha no envio");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Extratos de comissão</h1>

      <Card>
        <CardTitulo>Enviar extrato</CardTitulo>
        {vinculos.length === 0 ? (
          <p className="text-sm text-slate-600">
            Nenhuma seguradora vinculada ainda — vincule em{" "}
            <Link href="/configuracoes" className="underline">
              Configurações
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={enviar} className="grid gap-4 sm:grid-cols-4">
            <div>
              <Label htmlFor="seguradora">Seguradora</Label>
              <Select
                id="seguradora"
                value={insurerSlug}
                onChange={(e) => setInsurerSlug(e.target.value)}
                required
              >
                <option value="">Selecione…</option>
                {vinculos.map((v) => (
                  <option key={v.insurer.slug} value={v.insurer.slug}>
                    {v.insurer.nome}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="competencia">Competência</Label>
              <Input
                id="competencia"
                type="month"
                value={competencia}
                onChange={(e) => setCompetencia(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="arquivo">Arquivo (XLSX/CSV/PDF)</Label>
              <Input
                id="arquivo"
                type="file"
                accept=".xlsx,.xls,.csv,.pdf"
                onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
                required
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={enviando} className="w-full">
                {enviando ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        )}
        {mensagem && <p className="mt-3 text-sm text-slate-700">{mensagem}</p>}
        <p className="mt-3 text-xs text-slate-500">
          PDFs escaneados (imagem) não são suportados — exporte o extrato em planilha ou PDF com
          texto.
        </p>
      </Card>

      <Card>
        <CardTitulo>Enviados</CardTitulo>
        {extratos.length === 0 ? (
          <p className="text-sm text-slate-600">Nenhum extrato enviado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2 pr-4">Seguradora</th>
                  <th className="py-2 pr-4">Competência</th>
                  <th className="py-2 pr-4">Arquivo</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Linhas</th>
                  <th className="py-2 pr-4">Rejeitadas</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {extratos.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4">{e.insurer.nome}</td>
                    <td className="py-2 pr-4">{e.competencia}</td>
                    <td className="max-w-[16rem] truncate py-2 pr-4">{e.arquivoNome}</td>
                    <td className="py-2 pr-4">
                      <Badge tom={tomDoStatus[e.status] ?? "neutro"}>
                        {rotuloStatus[e.status] ?? e.status}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4">{e.linhasTotais ?? "—"}</td>
                    <td className="py-2 pr-4">
                      {e.linhasRejeitadas?.length ? (
                        <span className="font-medium text-amber-700">
                          {e.linhasRejeitadas.length}
                        </span>
                      ) : (
                        "0"
                      )}
                    </td>
                    <td className="py-2 text-right">
                      <Link href={`/extratos/${e.id}`} className="text-slate-900 underline">
                        Detalhes
                      </Link>
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
