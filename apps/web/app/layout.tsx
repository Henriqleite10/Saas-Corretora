import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  // Nome comercial indefinido — nunca hardcodar marca.
  title: process.env.PRODUCT_NAME ?? "Radar Corretoras",
  description: "Gestão de inadimplência e comissões para corretoras de seguros",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
