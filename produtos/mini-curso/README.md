# produtos/mini-curso/

Degrau 2 da esteira do Funil 2: **Mini curso NID · Apresente para Fechar** (R$ 147 avulso; order bump no checkout do playbook). Responsável pelo conteúdo: agente `roteiro`. Página de vendas: agente `copy`. Henrique grava.

O mini curso ensina a apresentar e vender o projeto desenhado com o Método NID de Desenho de Projetos (Playbook NID · Desenhe para Vender). Oito aulas, cerca de 108 minutos, sete materiais do aluno.

## Arquivos

| Arquivo | O que é |
|---|---|
| `00-grade.md` | Grade do curso: promessa, enquadramento, caso conduzido, as oito aulas (objetivo, duração, entregável), materiais, CTAs e ordem de gravação |
| `aulas/aula-01.md` a `aula-08.md` | Roteiro palavra por palavra de cada aula, com marcações `[SLIDE N]` e `[TELA: ...]`, entregável, ponte e CTA (aula 8) |
| `slides/aula-01.html` a `aula-08.html` | Slides de apoio de cada aula, na identidade NID (fonte do PDF) |
| `slides/aula-01.pdf` a `aula-08.pdf` | Slides em PDF 16:9 (8, 8, 9, 10, 9, 9, 10 e 10 páginas), para a gravação e para a área de membros |
| `materiais/01-roteiro-de-apresentacao.md` | Roteiro de apresentação de projeto: o que dizer em cada página da proposta (aulas 2 a 7) |
| `materiais/02-checklist-de-reuniao.md` | Checklist de reunião: antes, durante e depois (aula 1) |
| `materiais/03-modelo-de-proposta.md`, `.html`, `.pdf` | Modelo de proposta em nove páginas, na ordem do roteiro de proposta do playbook, com regra, campos e exemplo do caso conduzido; PDF A4 de 13 páginas (aula 4) |
| `materiais/04-banco-de-objecoes.md` | Banco de objeções: a objeção, a pergunta que devolve, a página que responde e a frase (aula 6) |
| `materiais/05-follow-up-pos-reuniao.md` | Régua de follow-up: mesmo dia, D+2, D+7 e D+14 (aula 8) |
| `guia-de-gravacao.md` | Orientações para o Henrique gravar: equipamento, enquadramento, ritmo, o que vai na tela, ordem de gravação, checklist e o que fazer se errar |
| `pagina-de-vendas.md` | Página do mini curso como degrau 2 (agente `copy`) |
| `build/build.py`, `build/specs.py` | Pipeline dos slides: conteúdo de cada slide em `specs.py`, HTML e PDF gerados por `build.py` |
| `build/build_proposta.py` | Pipeline do modelo de proposta em HTML e PDF A4 |
| `build/render.mjs`, `build/template_css.css`, `build/logo_nid_base64.txt` | Renderizador (Playwright com o Chromium do ambiente; nunca rodar `playwright install`), CSS oficial da skill `nid-apresentacoes` e logo da NID |

## Como regerar

A partir da raiz do repositório:

```
python3 produtos/mini-curso/build/build.py            # slides de todas as aulas (HTML + PDF)
python3 produtos/mini-curso/build/build.py 4          # só a aula 4
python3 produtos/mini-curso/build/build_proposta.py   # modelo de proposta (HTML + PDF A4)
```

`--raster` em qualquer um dos dois também rasteriza as páginas para conferência visual.

## Estado

Sprint 3. Conteúdo completo, aguardando aprovação do Henrique e gravação. Um caso real está marcado como `[CASO REAL A CONFIRMAR COM HENRIQUE]` na aula 7.
