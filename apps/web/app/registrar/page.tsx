"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardTitulo, Input, Label } from "@radar/ui";
import { salvarSessao } from "../../lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export default function RegistrarPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nomeCorretora: "", nome: "", email: "", senha: "" });
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  function campo(nome: keyof typeof form) {
    return {
      value: form[nome],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [nome]: e.target.value })),
      required: true,
    };
  }

  async function registrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch(`${API_URL}/auth/registrar`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const corpo = await res.json();
      if (!res.ok) {
        const detalhe = corpo.erros?.[0]
          ? `${corpo.erros[0].campo}: ${corpo.erros[0].detalhe}`
          : corpo.message;
        setErro(detalhe ?? "Não foi possível concluir o cadastro");
        return;
      }
      salvarSessao(corpo.accessToken, corpo.usuario);
      router.push("/extratos");
    } catch {
      setErro("Falha de conexão com o servidor");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardTitulo>Cadastrar corretora</CardTitulo>
        <form onSubmit={registrar} className="space-y-4">
          <div>
            <Label htmlFor="nomeCorretora">Nome da corretora</Label>
            <Input id="nomeCorretora" {...campo("nomeCorretora")} />
          </div>
          <div>
            <Label htmlFor="nome">Seu nome</Label>
            <Input id="nome" {...campo("nome")} />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...campo("email")} />
          </div>
          <div>
            <Label htmlFor="senha">Senha (mín. 8 caracteres)</Label>
            <Input id="senha" type="password" minLength={8} {...campo("senha")} />
          </div>
          {erro && <p className="text-sm text-red-600">{erro}</p>}
          <Button type="submit" className="w-full" disabled={carregando}>
            {carregando ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-slate-900 underline">
            Entrar
          </Link>
        </p>
      </Card>
    </main>
  );
}
