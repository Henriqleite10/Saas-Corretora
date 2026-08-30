import { Card, CardTitulo } from "@radar/ui";

// TODO(Etapa 6): dashboard do Radar de Inadimplência — parcelas em atraso,
// régua de recuperação e painel "X apólices salvas, R$ Y preservados".
export default function PainelPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Painel</h1>
      <Card>
        <CardTitulo>Radar de Inadimplência</CardTitulo>
        <p className="text-sm text-slate-600">
          Em construção — em breve: parcelas em atraso em todas as seguradoras, régua de recuperação
          e comissão preservada.
        </p>
      </Card>
    </div>
  );
}
