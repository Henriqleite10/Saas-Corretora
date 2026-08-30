/**
 * Extração de texto de PDF com pdfjs-dist (build legacy p/ Node).
 * O import é dinâmico porque o pdfjs-dist é ESM-only e este package também
 * publica build CJS.
 *
 * PDFs escaneados (imagem) retornam texto vazio — OCR fora do escopo
 * (limitação documentada).
 */

interface ItemTexto {
  str: string;
  transform: number[];
}

export async function extrairTextoPdf(conteudo: Buffer): Promise<string> {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await getDocument({
    data: new Uint8Array(conteudo),
    isEvalSupported: false,
    useSystemFonts: true,
  }).promise;

  const linhasTotais: string[] = [];
  try {
    for (let p = 1; p <= doc.numPages; p++) {
      const pagina = await doc.getPage(p);
      const conteudoTexto = await pagina.getTextContent();
      // Reconstrói linhas visuais pela coordenada Y (transform[5]).
      const porY = new Map<number, { x: number; str: string }[]>();
      for (const item of conteudoTexto.items as ItemTexto[]) {
        if (!item.str || !item.str.trim()) continue;
        const y = Math.round(item.transform[5] ?? 0);
        const lista = porY.get(y) ?? [];
        lista.push({ x: item.transform[4] ?? 0, str: item.str });
        porY.set(y, lista);
      }
      const ys = [...porY.keys()].sort((a, b) => b - a); // topo → base
      for (const y of ys) {
        const pedacos = porY
          .get(y)!
          .sort((a, b) => a.x - b.x)
          .map((i) => i.str.trim());
        linhasTotais.push(pedacos.join(" "));
      }
    }
  } finally {
    await doc.destroy();
  }
  return linhasTotais.join("\n");
}

export function ehArquivoPdf(conteudo: Buffer): boolean {
  return conteudo.subarray(0, 5).toString("latin1") === "%PDF-";
}
