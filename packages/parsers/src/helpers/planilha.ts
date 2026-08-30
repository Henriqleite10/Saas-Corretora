import * as XLSX from "xlsx";

/** Lê a primeira aba como matriz de células (linha 1 = índice 0). */
export function lerMatrizXlsx(conteudo: Buffer): unknown[][] {
  const wb = XLSX.read(conteudo, { type: "buffer", cellDates: true });
  const primeiraAba = wb.SheetNames[0];
  if (!primeiraAba) return [];
  return XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[primeiraAba]!, {
    header: 1,
    defval: "",
  });
}

export function ehArquivoXlsx(conteudo: Buffer): boolean {
  // XLSX é um ZIP (PK); XLS legado começa com D0 CF; CSV é texto.
  return (
    (conteudo[0] === 0x50 && conteudo[1] === 0x4b) || (conteudo[0] === 0xd0 && conteudo[1] === 0xcf)
  );
}

export function celulaTexto(valor: unknown): string {
  if (valor === null || valor === undefined) return "";
  if (valor instanceof Date) return valor.toISOString();
  return String(valor).trim();
}

/** Localiza a linha de cabeçalho que contenha todos os títulos exigidos. */
export function localizarCabecalho(
  matriz: unknown[][],
  titulosExigidos: string[],
  maxLinhas = 15,
): { indiceLinha: number; indices: Map<string, number> } | null {
  for (let i = 0; i < Math.min(matriz.length, maxLinhas); i++) {
    const linha = matriz[i]!.map((c) => celulaTexto(c).toLowerCase());
    const indices = new Map<string, number>();
    let todos = true;
    for (const titulo of titulosExigidos) {
      const idx = linha.findIndex((c) => c === titulo.toLowerCase());
      if (idx === -1) {
        todos = false;
        break;
      }
      indices.set(titulo, idx);
    }
    if (todos) return { indiceLinha: i, indices };
  }
  return null;
}
