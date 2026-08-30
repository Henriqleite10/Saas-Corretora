import { Card, CardTitulo } from "@radar/ui";

// TODO(Etapa 8): fila de aprovação do Agente de Cobrança IA — mensagem
// redigida + justificativa, editar/aprovar/descartar.
export default function CobrancasPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Cobranças</h1>
      <Card>
        <CardTitulo>Fila de aprovação</CardTitulo>
        <p className="text-sm text-slate-600">
          Em construção — as mensagens redigidas pelo agente de cobrança aparecerão aqui para sua
          aprovação antes do envio.
        </p>
      </Card>
    </div>
  );
}
