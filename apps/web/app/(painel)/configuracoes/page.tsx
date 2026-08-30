"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, CardTitulo, Input, Label, Select } from "@radar/ui";
import { api, usuarioAtual } from "../../../lib/api";

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
interface EtapaRegua {
  diasAposVencimento: number;
  canal: "EMAIL" | "WHATSAPP";
}
interface Config {
  nome: string;
  plano: string;
  configRegua: EtapaRegua[];
  tomCobranca: string;
  maxContatosPorSeguradoPorSemana: number;
  limiteMensalTokensIa: number | null;
}
interface Usuario {
  id: string;
  nome: string;
  email: string;
  papel: string;
  ativo: boolean;
}

function SecaoSeguradoras() {
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
                <Badge tom={v.ativo ? "sucesso" : "neutro"}>{v.ativo ? "Ativa" : "Inativa"}</Badge>
              </span>
            </li>
          ))}
        </ul>
      )}
      {disponiveis.length > 0 && (
        <form onSubmit={vincular} className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="seguradora">Seguradora</Label>
            <Select id="seguradora" value={slug} onChange={(e) => setSlug(e.target.value)} required>
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
  );
}

function SecaoRegua({ souAdmin }: { souAdmin: boolean }) {
  const [config, setConfig] = useState<Config | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    void api<Config>("/configuracoes").then(setConfig);
  }, []);

  if (!config) return null;

  function alterarEtapa(i: number, campo: keyof EtapaRegua, valor: string) {
    setConfig((c) => {
      if (!c) return c;
      const etapas = c.configRegua.map((e, idx) =>
        idx === i ? { ...e, [campo]: campo === "diasAposVencimento" ? Number(valor) : valor } : e,
      );
      return { ...c, configRegua: etapas as EtapaRegua[] };
    });
  }

  async function salvar() {
    if (!config) return;
    setSalvando(true);
    setMensagem(null);
    try {
      await api("/configuracoes", {
        method: "PATCH",
        corpo: {
          configRegua: config.configRegua,
          tomCobranca: config.tomCobranca,
          maxContatosPorSeguradoPorSemana: config.maxContatosPorSeguradoPorSemana,
          limiteMensalTokensIa: config.limiteMensalTokensIa,
        },
      });
      setMensagem("Configurações salvas.");
    } catch (e) {
      setMensagem(e instanceof Error ? e.message : "Falha ao salvar");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Card>
      <CardTitulo>Régua de recuperação e agente de cobrança</CardTitulo>
      <div className="space-y-4">
        <div>
          <Label>Etapas da régua (dias após o vencimento)</Label>
          <div className="space-y-2">
            {config.configRegua.map((etapa, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-16 text-sm text-slate-500">Etapa {i + 1}</span>
                <Input
                  type="number"
                  min={0}
                  max={120}
                  className="w-24"
                  value={etapa.diasAposVencimento}
                  onChange={(e) => alterarEtapa(i, "diasAposVencimento", e.target.value)}
                  disabled={!souAdmin}
                />
                <span className="text-sm text-slate-500">dias ·</span>
                <Select
                  className="w-36"
                  value={etapa.canal}
                  onChange={(e) => alterarEtapa(i, "canal", e.target.value)}
                  disabled={!souAdmin}
                >
                  <option value="EMAIL">E-mail</option>
                  <option value="WHATSAPP">WhatsApp (em breve)</option>
                </Select>
                {souAdmin && config.configRegua.length > 1 && (
                  <Button
                    variante="fantasma"
                    type="button"
                    onClick={() =>
                      setConfig((c) =>
                        c ? { ...c, configRegua: c.configRegua.filter((_, x) => x !== i) } : c,
                      )
                    }
                  >
                    Remover
                  </Button>
                )}
              </div>
            ))}
            {souAdmin && config.configRegua.length < 10 && (
              <Button
                variante="secundario"
                type="button"
                onClick={() =>
                  setConfig((c) =>
                    c
                      ? {
                          ...c,
                          configRegua: [
                            ...c.configRegua,
                            {
                              diasAposVencimento:
                                (c.configRegua[c.configRegua.length - 1]?.diasAposVencimento ?? 0) +
                                10,
                              canal: "EMAIL",
                            },
                          ],
                        }
                      : c,
                  )
                }
              >
                Adicionar etapa
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="tom">Tom das mensagens</Label>
            <Select
              id="tom"
              value={config.tomCobranca}
              onChange={(e) => setConfig((c) => (c ? { ...c, tomCobranca: e.target.value } : c))}
              disabled={!souAdmin}
            >
              <option value="cordial">Cordial</option>
              <option value="formal">Formal</option>
              <option value="proximo">Próximo</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="freq">Máx. contatos por segurado/semana</Label>
            <Input
              id="freq"
              type="number"
              min={1}
              max={7}
              value={config.maxContatosPorSeguradoPorSemana}
              onChange={(e) =>
                setConfig((c) =>
                  c ? { ...c, maxContatosPorSeguradoPorSemana: Number(e.target.value) } : c,
                )
              }
              disabled={!souAdmin}
            />
          </div>
          <div>
            <Label htmlFor="limite">Limite mensal de tokens de IA</Label>
            <Input
              id="limite"
              type="number"
              min={1000}
              placeholder="Sem limite"
              value={config.limiteMensalTokensIa ?? ""}
              onChange={(e) =>
                setConfig((c) =>
                  c
                    ? { ...c, limiteMensalTokensIa: e.target.value ? Number(e.target.value) : null }
                    : c,
                )
              }
              disabled={!souAdmin}
            />
          </div>
        </div>

        {souAdmin ? (
          <div className="flex items-center gap-3">
            <Button onClick={salvar} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar configurações"}
            </Button>
            {mensagem && <span className="text-sm text-slate-600">{mensagem}</span>}
          </div>
        ) : (
          <p className="text-xs text-slate-500">Somente administradores alteram a régua.</p>
        )}
      </div>
    </Card>
  );
}

function SecaoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", papel: "CORRETOR" });
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const carregar = useCallback(async () => {
    setUsuarios(await api<Usuario[]>("/auth/usuarios"));
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);
    try {
      await api("/auth/usuarios", { method: "POST", corpo: form });
      setForm({ nome: "", email: "", senha: "", papel: "CORRETOR" });
      await carregar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Falha ao criar usuário");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Card>
      <CardTitulo>Equipe</CardTitulo>
      <ul className="mb-4 space-y-2">
        {usuarios.map((u) => (
          <li
            key={u.id}
            className="flex items-center justify-between rounded-md border border-slate-200 px-4 py-2 text-sm"
          >
            <span>
              <span className="font-medium text-slate-900">{u.nome}</span>{" "}
              <span className="text-slate-500">· {u.email}</span>
            </span>
            <Badge>{u.papel}</Badge>
          </li>
        ))}
      </ul>
      <form onSubmit={criar} className="grid gap-4 sm:grid-cols-4">
        <Input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
          required
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <Input
          type="password"
          placeholder="Senha inicial"
          minLength={8}
          value={form.senha}
          onChange={(e) => setForm((f) => ({ ...f, senha: e.target.value }))}
          required
        />
        <div className="flex gap-2">
          <Select
            value={form.papel}
            onChange={(e) => setForm((f) => ({ ...f, papel: e.target.value }))}
          >
            <option value="CORRETOR">Corretor</option>
            <option value="FINANCEIRO">Financeiro</option>
            <option value="ADMIN">Admin</option>
          </Select>
          <Button type="submit" disabled={salvando}>
            {salvando ? "..." : "Adicionar"}
          </Button>
        </div>
      </form>
      {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}
    </Card>
  );
}

export default function ConfiguracoesPage() {
  const papel = usuarioAtual()?.papel;
  const souAdmin = papel === "ADMIN";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Configurações</h1>
      <SecaoSeguradoras />
      <SecaoRegua souAdmin={souAdmin} />
      {souAdmin && <SecaoUsuarios />}
    </div>
  );
}
