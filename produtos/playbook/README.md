# produtos/playbook/

Degrau 1 da esteira: Playbook NID · Desenhe para Vender (R$ 29,90). Responsável pelo conteúdo: agente `metodo`. Responsável pela página e checkout: agente `copy`.

Arquivos:

- `01-playbook.md`: texto integral do playbook (fonte do PDF).
- `02-templates-fluxo.md`: os cinco templates de fluxo com campos, instruções e exemplo preenchido do caso conduzido (fonte dos arquivos em `templates/`).
- `03-playbook.html` e `03-playbook.pdf`: o playbook diagramado na identidade NID, A4 retrato, gerado a partir de `01-playbook.md`.
- `templates/`: um template por arquivo, em HTML (A4, pronto para imprimir), PDF e Markdown.
- `build/build.py` e `build/render.mjs`: geram o HTML e os PDFs a partir dos `.md` (`python3 produtos/playbook/build/build.py`, na raiz do repositório; requer o pacote `playwright` do Node, o Chromium em `PLAYWRIGHT_BROWSERS_PATH` e o PyMuPDF para numerar o sumário). Ao editar os `.md`, rode o build para regenerar HTML e PDF.
- `pagina-de-vendas.md` e `checkout-e-order-bump.md`: copy da página e do checkout (agente `copy`).
