import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

type Variante = "primario" | "secundario" | "perigo" | "fantasma";

const estilos: Record<Variante, string> = {
  primario: "bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-300",
  secundario: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  perigo: "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300",
  fantasma: "text-slate-600 hover:bg-slate-100",
};

export function Button({
  variante = "primario",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed",
        estilos[variante],
        className,
      )}
      {...props}
    />
  );
}
