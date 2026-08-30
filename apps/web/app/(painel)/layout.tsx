"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@radar/ui";
import { limparSessao, tokenAtual, usuarioAtual } from "../../lib/api";
import type { UsuarioSessao } from "../../lib/api";

const itens = [
  { href: "/painel", rotulo: "Painel" },
  { href: "/carteira", rotulo: "Carteira" },
  { href: "/extratos", rotulo: "Extratos" },
  { href: "/cobrancas", rotulo: "Cobranças" },
  { href: "/configuracoes", rotulo: "Configurações" },
];

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);

  useEffect(() => {
    if (!tokenAtual()) {
      router.replace("/login");
      return;
    }
    setUsuario(usuarioAtual());
  }, [router]);

  if (!usuario) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-56 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-900">
            {process.env.NEXT_PUBLIC_PRODUCT_NAME ?? "Radar Corretoras"}
          </p>
          <p className="mt-1 truncate text-xs text-slate-500">{usuario.nome}</p>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {itens.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium",
                pathname.startsWith(item.href)
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>
        <button
          className="border-t border-slate-200 p-4 text-left text-sm text-slate-500 hover:text-slate-900"
          onClick={() => {
            limparSessao();
            router.replace("/login");
          }}
        >
          Sair
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
