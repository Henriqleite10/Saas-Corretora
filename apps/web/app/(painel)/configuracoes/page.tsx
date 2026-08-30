"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, CardTitulo, Input, Label, Select } from "@radar/ui";
import { api } from "../../../lib/api";

interface Seguradora {
  slug: string;
  nome: string;
}
interface Vinculo {
  id: string;
  codigoSusep: string | null;
  ativo: boolean;
  insurer: Seguradora;
}

// TODO(Etapa 9): configurações da régua (etapas, tom, frequência) e usuários.
export default function ConfiguracoesPage() {
  const [catalogo, setCatalogo] = useState<Seguradora[]>([]);
  const [vinculos, setVinculos] = useState<Vinculo[]>([]);
  const [slug, setSlug] = useState("");
  const [codigoSusep, setCodigoSusep] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    const [c, v] = await Promise.all([
      api<Seguradora[]>("/seguradoras"),
      api<Vinculo[]>("/seguradoras/vinculos"),
    ]);
    setCatalogo(c);
    setVinculos(v);
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function vincular(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);
    try {
      await api("/seguradoras/vinculos", {
        method: "POST",
        corpo: { insurerSlug: slug, ...(codigoSusep ? { codigoSusep } : {}) },
      });
      setSlug("");
      setCodigoSusep("");
      await carregar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Falha ao vincular");
    } finally {
      setSalvando(false);
    }
  }

  const disponiveis = catalogo.filter((c) => !vinculos.some((v) => v.insurer.slug === c.slug));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Configurações</h1>

      <Card>
        <CardTitulo>Seguradoras vinculadas</CardTitulo>
        {vinculos.length === 0 ? (
          <p className="mb-4 text-sm text-slate-600">
            Vincule as seguradoras com que sua corretora trabalha para enviar extratos.
          </p>
        ) : (
          <ul className="mb-4 space-y-2">
            {vinculos.map((v) => (
              <li
                key={v.id}
                className="flex items-center justify-between rounded-md border border-slate-200 px-4 py-2 text-sm"
              >
                <span className="font-medium text-slate-900">{v.insurer.nome}</span>
                <span className="flex items-center gap-3 text-slate-500">
                  {v.codigoSusep && <span>SUSEP {v.codigoSusep}</span>}
                  <Badge tom={v.ativo ? "sucesso" : "neutro"}>
                    {v.ativo ? "Ativa" : "Inativa"}
                  </Badge>
                </span>
              </li>
            ))}
          </ul>
        )}

        {disponiveis.length > 0 && (
          <form onSubmit={vincular} className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="seguradora">Seguradora</Label>
              <Select
                id="seguradora"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              >
                <option value="">Selecione…</option>
                {disponiveis.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.nome}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="susep">Código SUSEP (opcional)</Label>
              <Input
                id="susep"
                value={codigoSusep}
                onChange={(e) => setCodigoSusep(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={salvando || !slug} className="w-full">
                {salvando ? "Vinculando..." : "Vincular"}
              </Button>
            </div>
          </form>
        )}
        {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}
      </Card>
    </div>
  );
}
