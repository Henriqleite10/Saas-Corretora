#!/usr/bin/env python3
"""
Constrói o HTML e o PDF do Playbook NID · Desenhe para Vender e dos templates de fluxo.

Uso (a partir da raiz do repositório):
    python3 produtos/playbook/build/build.py

Entradas:  produtos/playbook/01-playbook.md, produtos/playbook/02-templates-fluxo.md
Saídas:    produtos/playbook/03-playbook.html, 03-playbook.pdf,
           produtos/playbook/templates/0N-*.html, .pdf, .md

Renderização: Playwright (Node) com o Chromium instalado em PLAYWRIGHT_BROWSERS_PATH.
O sumário é numerado em duas passagens (renderiza, lê as páginas com PyMuPDF, injeta os números e renderiza de novo).
"""
import html
import json
import os
import re
import subprocess
import sys
import glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(BASE, "templates")
SKILL_GLOB = os.path.expanduser("~/.claude/skills/synced/*/nid-apresentacoes/assets/logo_nid_base64.txt")


def logo_b64():
    paths = glob.glob(SKILL_GLOB)
    if paths:
        return open(paths[0]).read().strip()
    local = os.path.join(BUILD, "logo_nid_base64.txt")
    return open(local).read().strip()


LOGO = logo_b64()

# ----------------------------------------------------------------------------
# Conversor de Markdown (subconjunto usado nos arquivos do playbook)
# ----------------------------------------------------------------------------

def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"`(.+?)`", r"<code>\1</code>", text)
    return text


def parse_blocks(md):
    """Converte markdown em uma lista de blocos: (tipo, dados)."""
    lines = md.split("\n")
    blocks = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        s = line.strip()
        if not s:
            i += 1
            continue
        if s == "---":
            blocks.append(("hr", None))
            i += 1
            continue
        m = re.match(r"^(#{1,3})\s+(.*)$", s)
        if m:
            blocks.append(("h%d" % len(m.group(1)), m.group(2).strip()))
            i += 1
            continue
        if s.startswith("|"):
            rows = []
            while i < n and lines[i].strip().startswith("|"):
                row = lines[i].strip().strip("|")
                cells = [c.strip() for c in row.split("|")]
                if not all(re.match(r"^:?-+:?$", c) for c in cells):
                    rows.append(cells)
                i += 1
            blocks.append(("table", rows))
            continue
        if re.match(r"^- \[ \]\s+", s):
            items = []
            while i < n and re.match(r"^- \[ \]\s+", lines[i].strip()):
                items.append(re.sub(r"^- \[ \]\s+", "", lines[i].strip()))
                i += 1
            blocks.append(("check", items))
            continue
        if re.match(r"^- ", s):
            items = []
            while i < n and re.match(r"^- ", lines[i].strip()):
                items.append(lines[i].strip()[2:])
                i += 1
            blocks.append(("ul", items))
            continue
        if re.match(r"^\d+\. ", s):
            items = []
            while i < n and re.match(r"^\d+\. ", lines[i].strip()):
                items.append(re.sub(r"^\d+\. ", "", lines[i].strip()))
                i += 1
            blocks.append(("ol", items))
            continue
        # parágrafo: até linha em branco
        para = []
        while i < n and lines[i].strip() and not re.match(r"^(#{1,3}\s|\||- |\d+\. |---$)", lines[i].strip()):
            para.append(lines[i].strip())
            i += 1
        blocks.append(("p", " ".join(para)))
    return blocks


def render_table(rows, cls=""):
    if not rows:
        return ""
    head, body = rows[0], rows[1:]
    ncols = len(head)
    out = ['<table class="tb %s cols%d">' % (cls, ncols), "<thead><tr>"]
    for c in head:
        out.append("<th>%s</th>" % inline(c))
    out.append("</tr></thead><tbody>")
    for r in body:
        out.append("<tr>")
        for j in range(ncols):
            c = r[j] if j < len(r) else ""
            out.append("<td>%s</td>" % inline(c))
        out.append("</tr>")
    out.append("</tbody></table>")
    return "".join(out)


def render_block(b):
    t, d = b
    if t == "p":
        return "<p>%s</p>" % inline(d)
    if t == "h2":
        return '<h2>%s</h2>' % inline(d)
    if t == "h3":
        return '<h3>%s</h3>' % inline(d)
    if t == "ul":
        return "<ul>%s</ul>" % "".join("<li>%s</li>" % inline(x) for x in d)
    if t == "ol":
        return "<ol>%s</ol>" % "".join("<li>%s</li>" % inline(x) for x in d)
    if t == "check":
        return '<ul class="check">%s</ul>' % "".join('<li><span class="box"></span><span>%s</span></li>' % inline(x) for x in d)
    if t == "table":
        return render_table(d)
    if t == "hr":
        return ""
    return ""


# ----------------------------------------------------------------------------
# CSS compartilhado (identidade NID, adaptada para A4 retrato)
# ----------------------------------------------------------------------------

CSS = r"""
:root{--laranja:#F26522;--laranja2:#FF8A4C;--escuro:#373737;--escuro2:#2A2A2A;--cinza:#6B6B6B;--off:#F5F4F2;--branco:#FFFFFF;--linha:#E4E2DE;}
*{margin:0;padding:0;box-sizing:border-box;}
html,body{font-family:'Liberation Sans',Arial,Helvetica,sans-serif;color:var(--escuro);background:#fff;-webkit-font-smoothing:antialiased;font-size:10.5pt;line-height:1.5;}
@page{size:A4;margin:20mm 18mm 22mm 18mm;
  @bottom-left{content:"Playbook NID · Desenhe para Vender";font-family:'Liberation Sans',Arial,sans-serif;font-size:8pt;letter-spacing:.4px;color:#6B6B6B;}
  @bottom-right{content:counter(page);font-family:'Liberation Sans',Arial,sans-serif;font-size:8.5pt;font-weight:700;color:#373737;}
}
@page full{margin:0; @bottom-left{content:none} @bottom-right{content:none}}
.full{page:full;width:210mm;height:297mm;overflow:hidden;position:relative;page-break-after:always;background:var(--escuro);color:#fff;}
.full.last{page-break-after:auto;}
.glow{position:absolute;border-radius:50%;filter:blur(6px);}
.g1{width:150mm;height:150mm;right:-45mm;top:-50mm;background:radial-gradient(circle,rgba(242,101,34,.55),transparent 65%);}
.g2{width:120mm;height:120mm;left:-40mm;bottom:-45mm;background:radial-gradient(circle,rgba(242,101,34,.30),transparent 65%);}
.cover .inner{position:absolute;left:22mm;right:22mm;top:24mm;bottom:22mm;}
.logoImg{height:15mm;width:auto;display:block;}
.logoRow{display:flex;align-items:center;gap:5mm;}
.logoDiv{width:1px;height:11mm;background:rgba(255,255,255,.22);}
.txt2{font-size:7.5pt;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9C9C9C;line-height:1.45;}
.cover .label{font-size:9.5pt;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--laranja2);margin-bottom:8mm;}
.cover h1{font-size:44pt;line-height:1.02;font-weight:800;letter-spacing:-1.5pt;max-width:150mm;}
.cover h1 .or{color:var(--laranja2);}
.cover .sub{margin-top:9mm;font-size:14pt;color:#C9C9C9;max-width:130mm;line-height:1.45;}
.cover .title{position:absolute;top:62mm;left:0;}
.cover .desc{position:absolute;top:150mm;left:0;max-width:135mm;font-size:10.5pt;color:#BDBDBD;line-height:1.55;}
.cover .desc b{color:#fff;}
.cover .bottom{position:absolute;left:0;bottom:0;display:flex;align-items:center;gap:5mm;}
.cover .bottom .ln{width:14mm;height:3px;background:var(--laranja);}
.cover .bottom .who small{display:block;font-size:8pt;letter-spacing:2px;text-transform:uppercase;color:#9C9C9C;margin-bottom:1mm;}
.cover .bottom .who b{font-size:13pt;font-weight:800;color:#fff;display:block;}
.cover .bottom .who span{font-size:9.5pt;color:#BDBDBD;}
.cover .steps{position:absolute;top:108mm;left:0;display:flex;gap:3mm;}
.cover .steps .s{flex:1;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);border-radius:3mm;padding:3.5mm 3.5mm 3mm;min-width:36mm;}
.cover .steps .s .n{font-size:8pt;letter-spacing:2px;color:var(--laranja2);font-weight:700;text-transform:uppercase;}
.cover .steps .s .t{font-size:13pt;font-weight:800;margin-top:1mm;}
.cover .steps .arrow{align-self:center;color:var(--laranja2);font-size:14pt;font-weight:800;}

/* sumário */
.toc h2{font-size:24pt;font-weight:800;letter-spacing:-.8pt;margin-bottom:8mm;}
.toc .kick{display:inline-block;font-size:8.5pt;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--laranja);margin-bottom:3mm;}
.toc ol{list-style:none;}
.toc li{display:flex;align-items:baseline;gap:3mm;padding:2.6mm 0;border-bottom:1px solid var(--linha);font-size:10.5pt;}
.toc li .k{flex:0 0 34mm;font-size:8pt;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--laranja);}
.toc li .t{flex:1;font-weight:700;color:var(--escuro);}
.toc li .pg{font-weight:700;color:var(--cinza);font-variant-numeric:tabular-nums;}
.toc .note{margin-top:8mm;padding:5mm 6mm;background:var(--off);border:1px solid var(--linha);border-radius:3mm;color:var(--cinza);font-size:9.5pt;}
.toc .note b{color:var(--escuro);}

/* capítulo */
.chapter{page-break-before:always;}
.chapHead{background:var(--escuro);color:#fff;border-radius:4mm;padding:10mm 10mm 9mm;margin-bottom:8mm;position:relative;overflow:hidden;}
.chapHead .bar{position:absolute;left:0;top:0;height:2.2mm;width:100%;background:linear-gradient(90deg,var(--laranja),var(--laranja2));}
.chapHead .kick{font-size:8.5pt;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--laranja2);margin-bottom:3mm;display:block;}
.chapHead h1{font-size:24pt;line-height:1.08;font-weight:800;letter-spacing:-.8pt;color:#fff;}
.chapHead .num{position:absolute;right:8mm;top:6mm;font-size:52pt;font-weight:800;color:rgba(255,255,255,.07);letter-spacing:-2pt;line-height:1;}

h2{font-size:14.5pt;font-weight:800;letter-spacing:-.3pt;margin:7mm 0 2.5mm;color:var(--escuro);page-break-after:avoid;}
h3{font-size:11pt;font-weight:700;margin:5mm 0 1.5mm;color:var(--escuro);page-break-after:avoid;}
p{margin:0 0 3mm;}
ul,ol{margin:0 0 3.5mm 5.5mm;}
li{margin-bottom:1.4mm;}
li::marker{color:var(--laranja);font-weight:700;}
strong{font-weight:700;color:var(--escuro);}
code{font-family:'Liberation Mono',Menlo,monospace;font-size:9pt;background:var(--off);padding:0 1mm;border-radius:1mm;}

.tb{width:100%;border-collapse:collapse;margin:2mm 0 5mm;font-size:8.6pt;line-height:1.35;page-break-inside:auto;}
.tb th{background:var(--escuro);color:#fff;text-align:left;padding:2.2mm 2.4mm;font-size:8pt;letter-spacing:.3px;vertical-align:bottom;}
.tb td{padding:2.2mm 2.4mm;border-bottom:1px solid var(--linha);vertical-align:top;}
.tb tbody tr:nth-child(even) td{background:#FAF9F7;}
.tb tr{page-break-inside:avoid;}
.tb td:first-child{font-weight:700;color:var(--escuro);}
.tb.cols2 td:first-child{width:34%;}
.tb.cols3 td:first-child{width:22%;}
.tb.cols4 td:first-child{width:16%;}
.tb.cols5{font-size:8pt;}
.tb.cols6,.tb.cols7{font-size:7.6pt;}
.tb.cols6 td,.tb.cols7 td,.tb.cols6 th,.tb.cols7 th{padding:1.8mm 1.6mm;}

/* blocos especiais */
.callout{border-radius:3mm;padding:5mm 6mm;margin:3mm 0 5mm;page-break-inside:auto;}
.guide{page-break-inside:avoid;}
.keep{page-break-inside:avoid;}
p,li{orphans:3;widows:3;}
.ctaFlow{border:1px solid var(--linha);border-left:2.5mm solid var(--laranja);background:var(--off);border-radius:3mm;padding:4.5mm 6mm 4.5mm;margin:4mm 0 5mm;page-break-inside:avoid;}
.ctaFlow .lab{display:block;font-size:8pt;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--laranja);margin-bottom:1.5mm;}
.ctaFlow p{margin-bottom:3mm;}
.ctaFlow .btn{display:inline-block;background:var(--laranja);color:#fff;font-weight:700;font-size:9.5pt;padding:2.6mm 5mm;border-radius:2mm;}
.callout .lab{display:block;font-size:8pt;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:2mm;}
.callout p:last-child{margin-bottom:0;}
.guide{background:linear-gradient(135deg,var(--laranja),#E2571A);color:#fff;}
.guide .lab{color:#fff;opacity:.85;}
.guide p{font-size:14pt;font-weight:800;line-height:1.3;letter-spacing:-.2pt;color:#fff;}
.saida{background:var(--off);border:1px solid var(--linha);}
.saida .lab{color:var(--laranja);}
.erro{border:1px solid var(--linha);border-left:2.5mm solid var(--escuro);background:#fff;}
.erro .lab{color:var(--escuro);}
.erro p, .saida p{margin-bottom:2.5mm;}
.erro ul, .saida ul, .saida ol{margin-bottom:1mm;}
.frase{background:var(--off);border-left:2.5mm solid var(--laranja);padding:4mm 5mm;margin:2mm 0 4mm;font-weight:700;color:var(--escuro);page-break-inside:avoid;}
.tpl{border:1px solid var(--linha);border-radius:3mm;padding:5mm 6mm 3mm;margin:3mm 0 4mm;background:#fff;page-break-inside:avoid;}
.tpl .lab{display:block;font-size:8pt;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:2mm;color:var(--laranja);}

ul.check{list-style:none;margin-left:0;}
ul.check li{display:flex;gap:3mm;align-items:flex-start;margin-bottom:2mm;}
ul.check .box{flex:0 0 4.2mm;height:4.2mm;border:1.5px solid var(--escuro);border-radius:1mm;margin-top:1mm;}

.stepsRow{display:flex;gap:2.5mm;margin:4mm 0 6mm;}
.stepsRow .s{flex:1;background:var(--off);border:1px solid var(--linha);border-radius:3mm;padding:4mm 3.5mm;position:relative;}
.stepsRow .s .n{width:8mm;height:8mm;border-radius:2mm;background:linear-gradient(135deg,var(--laranja),var(--laranja2));color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11pt;margin-bottom:2.5mm;}
.stepsRow .s .t{font-weight:800;font-size:11.5pt;margin-bottom:1mm;}
.stepsRow .s .d{font-size:8.5pt;color:var(--cinza);line-height:1.4;}

/* contracapa */
.back .inner{position:absolute;left:22mm;right:22mm;top:30mm;bottom:22mm;}
.back .big{font-size:24pt;font-weight:800;letter-spacing:-.8pt;line-height:1.15;margin-top:14mm;max-width:150mm;}
.back .big .or{color:var(--laranja2);}
.back .ficha{position:absolute;left:0;bottom:0;font-size:8.5pt;color:#BDBDBD;line-height:1.55;max-width:160mm;}
.back .ficha b{color:#fff;}
.back .ficha p{margin-bottom:2.5mm;}
.back .slogan{margin-top:10mm;font-size:12pt;color:#C9C9C9;}
"""

# ----------------------------------------------------------------------------
# Playbook
# ----------------------------------------------------------------------------

SPECIAL_H2 = {
    "Pergunta-guia": "guide",
    "Saída esperada": "saida",
    "Erro comum": "erro",
}


def split_chapters(blocks):
    """Separa o cover (antes do primeiro hr) e os capítulos (cada h1)."""
    chapters = []
    cur = None
    for b in blocks:
        if b[0] == "h1":
            cur = {"title": b[1], "blocks": []}
            chapters.append(cur)
        elif cur is not None:
            cur["blocks"].append(b)
    return chapters


def chapter_meta(title):
    parts = [p.strip() for p in title.split(" · ")]
    if len(parts) >= 3:
        return " · ".join(parts[:-1]), parts[-1]
    if len(parts) == 2:
        return parts[0], parts[1]
    return "", title


def render_sections(blocks, chapter_title=""):
    """Renderiza os blocos de um capítulo, agrupando seções h2 especiais em callouts."""
    out = []
    i = 0
    n = len(blocks)
    while i < n:
        b = blocks[i]
        if b[0] == "h2" and b[1] in SPECIAL_H2:
            cls = SPECIAL_H2[b[1]]
            i += 1
            content = []
            while i < n and blocks[i][0] not in ("h2", "h1"):
                content.append(blocks[i])
                i += 1
            out.append('<div class="callout %s"><span class="lab">%s</span>%s</div>' % (
                cls, inline(b[1]), render_sections(content)))
            continue
        if b[0] == "h2" and b[1].startswith("Template: "):
            i += 1
            content = []
            while i < n and blocks[i][0] not in ("h2", "h1"):
                content.append(blocks[i])
                i += 1
            out.append('<div class="tpl"><span class="lab">Template de fluxo</span><h3 style="margin-top:0">%s</h3>%s</div>' % (
                inline(b[1][len("Template: "):]).capitalize(), render_sections(content)))
            continue
        if b[0] == "p" and b[1].startswith("**Preencha este template no NIDflow.**"):
            btn = ""
            if i + 1 < n and blocks[i + 1][0] == "p" and blocks[i + 1][1].startswith("**Quero desenhar"):
                btn = '<span class="btn">%s</span>' % inline(blocks[i + 1][1].strip("*"))
                i += 1
            out.append('<div class="ctaFlow"><span class="lab">NIDflow</span>%s%s</div>' % (render_block(b), btn))
            i += 1
            continue
        if b[0] == "p" and re.match(r'^\*\*[^*]+\(a saída da etapa\)[^*]*\*\*$', b[1]):
            # rótulo "Diagnóstico em uma frase (a saída da etapa):" seguido da frase em aspas
            if i + 1 < n and blocks[i + 1][0] == "p":
                out.append('<div class="keep">%s<div class="frase">%s</div></div>' % (render_block(b), inline(blocks[i + 1][1])))
                i += 2
                continue
            out.append(render_block(b))
        if b[0] == "p" and re.match(r'^\*\*(Diagnóstico em uma frase|Frase de solução registrada)[^*]*\*\*$', b[1]):
            if i + 1 < n and blocks[i + 1][0] == "p":
                out.append('<div class="keep">%s<div class="frase">%s</div></div>' % (render_block(b), inline(blocks[i + 1][1])))
                i += 2
                continue
            out.append(render_block(b))
        out.append(render_block(b))
        i += 1
    return "".join(out)


def build_playbook(toc_pages=None):
    md = open(os.path.join(BASE, "01-playbook.md"), encoding="utf-8").read()
    blocks = parse_blocks(md)
    chapters = split_chapters(blocks)
    cover = chapters[0]
    body_chapters = chapters[1:]

    # capa
    sub = next(b[1] for b in cover["blocks"] if b[0] == "h2")
    desc = [b[1] for b in cover["blocks"] if b[0] == "p"]
    cover_html = f'''
<section class="full cover">
  <div class="glow g1"></div><div class="glow g2"></div>
  <div class="inner">
    <div class="logoRow"><img class="logoImg" src="data:image/png;base64,{LOGO}" alt="NID"><div class="logoDiv"></div><div class="txt2">Núcleo de Inteligência<br>Digital</div></div>
    <div class="title">
      <div class="label">Playbook NID</div>
      <h1>Desenhe para <span class="or">Vender</span></h1>
      <div class="sub">{inline(sub)}</div>
    </div>
    <div class="steps">
      <div class="s"><div class="n">Etapa 1</div><div class="t">Dor</div></div><div class="arrow">›</div>
      <div class="s"><div class="n">Etapa 2</div><div class="t">Solução</div></div><div class="arrow">›</div>
      <div class="s"><div class="n">Etapa 3</div><div class="t">Arquitetura</div></div><div class="arrow">›</div>
      <div class="s"><div class="n">Etapa 4</div><div class="t">Valor</div></div>
    </div>
    <div class="desc">{inline(desc[0])}</div>
    <div class="bottom"><div class="ln"></div><div class="who"><small>Método NID de Desenho de Projetos</small><b>Quem desenha o projeto, conduz a venda.</b><span>NID · Consultoria de Performance Comercial</span></div></div>
  </div>
</section>'''

    # sumário
    toc_items = []
    for idx, ch in enumerate(body_chapters):
        kick, title = chapter_meta(ch["title"])
        pg = ""
        if toc_pages and ch["title"] in toc_pages:
            pg = str(toc_pages[ch["title"]])
        toc_items.append('<li><span class="k">%s</span><span class="t">%s</span><span class="pg">%s</span></li>' % (inline(kick), inline(title), pg))
    toc_html = '''
<section class="toc chapter" style="page-break-before:auto">
  <span class="kick">Sumário</span>
  <h2>O que você vai encontrar</h2>
  <ol>%s</ol>
  <div class="note"><b>Com uma proposta para entregar esta semana?</b> Leia os capítulos 2 a 6, preencha os templates de fluxo com o seu caso e volte ao restante depois. Os templates estão em arquivos próprios, prontos para imprimir e preencher.</div>
</section>''' % "".join(toc_items)

    # capítulos
    ch_html = []
    back_ficha = None
    for idx, ch in enumerate(body_chapters):
        kick, title = chapter_meta(ch["title"])
        blocks_ch = ch["blocks"]
        # separa a ficha técnica do último capítulo
        if any(b[0] == "h2" and b[1] == "Ficha técnica" for b in blocks_ch):
            j = next(k for k, b in enumerate(blocks_ch) if b[0] == "h2" and b[1] == "Ficha técnica")
            back_ficha = blocks_ch[j + 1:]
            blocks_ch = blocks_ch[:j]
        num = ""
        m = re.match(r"Capítulo (\d+)", kick)
        if m:
            num = m.group(1)
        # marcador invisível para localizar a página do capítulo no PDF
        marker = "NIDCAP%02d" % idx
        ch_html.append(f'''
<section class="chapter">
  <div class="chapHead"><div class="bar"></div><span class="kick">{inline(kick)}</span><h1>{inline(title)}</h1><div class="num">{num}</div><span style="position:absolute;left:0;top:0;font-size:1pt;color:rgba(55,55,55,0.01)">{marker}</span></div>
  {render_sections(blocks_ch, ch["title"])}
</section>''')

    # contracapa
    ficha_html = "".join(render_block(b) for b in (back_ficha or []))
    back_html = f'''
<section class="full back last">
  <div class="glow g1"></div>
  <div class="inner">
    <div class="logoRow"><img class="logoImg" src="data:image/png;base64,{LOGO}" alt="NID"><div class="logoDiv"></div><div class="txt2">Núcleo de Inteligência<br>Digital</div></div>
    <div class="big">Quem desenha o projeto,<br><span class="or">conduz a venda.</span></div>
    <div class="slogan">Enquanto o mercado vende IA de prateleira, a gente constrói a sua.</div>
    <div class="ficha">{ficha_html}</div>
  </div>
</section>'''

    doc = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Playbook NID · Desenhe para Vender</title>
<style>{CSS}</style>
</head>
<body>
{cover_html}
{toc_html}
{"".join(ch_html)}
{back_html}
</body>
</html>'''
    return doc, [ch["title"] for ch in body_chapters]


# ----------------------------------------------------------------------------
# Templates de fluxo (um arquivo por template)
# ----------------------------------------------------------------------------

TPL_CSS = CSS + r"""
@page{margin:15mm 16mm 18mm 16mm; @bottom-left{content:"Templates de fluxo · Método NID de Desenho de Projetos"} }
@page land{size:A4 landscape;margin:16mm 16mm 18mm 16mm; @bottom-left{content:"Templates de fluxo · Método NID de Desenho de Projetos";font-family:'Liberation Sans',Arial,sans-serif;font-size:8pt;color:#6B6B6B;} @bottom-right{content:counter(page);font-family:'Liberation Sans',Arial,sans-serif;font-size:8.5pt;font-weight:700;color:#373737;}}
.land{page:land;}
.tplHead{background:var(--escuro);color:#fff;border-radius:4mm;padding:7mm 9mm 6mm;margin-bottom:5mm;position:relative;overflow:hidden;}
.tplHead .bar{position:absolute;left:0;top:0;height:2.2mm;width:100%;background:linear-gradient(90deg,var(--laranja),var(--laranja2));}
.tplHead .kick{font-size:8.5pt;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--laranja2);display:block;margin-bottom:2mm;}
.tplHead h1{font-size:20pt;font-weight:800;letter-spacing:-.6pt;line-height:1.1;}
.tplHead .brand{position:absolute;right:9mm;top:8mm;font-size:8pt;letter-spacing:2px;text-transform:uppercase;color:#9C9C9C;font-weight:700;}
.tplHead .brand b{color:#fff;}
.meta{display:flex;gap:4mm;margin-bottom:4mm;}
.meta .m{flex:1;border:1px solid var(--linha);border-radius:2.5mm;padding:2.5mm 3.5mm;font-size:8.5pt;color:var(--cinza);}
.meta .m b{display:block;font-size:7.5pt;letter-spacing:2px;text-transform:uppercase;color:var(--laranja);margin-bottom:1mm;}
.meta .m .line{border-bottom:1px solid var(--escuro);height:5mm;}
.field{border:1px solid var(--escuro);border-radius:2.5mm;padding:2mm 3.5mm 2.2mm;margin-bottom:2.5mm;page-break-inside:avoid;}
.field .fl{font-weight:800;font-size:10.5pt;}
.field .fh{font-size:8.3pt;color:var(--cinza);line-height:1.35;margin-top:.5mm;}
.field .fa{margin-top:1.5mm;background:repeating-linear-gradient(to bottom,transparent 0,transparent 6.5mm,var(--linha) 6.5mm,var(--linha) calc(6.5mm + 1px));}
.h0{height:7mm}.h15{height:16mm}.h1{height:13mm}.h2{height:20mm}.h3{height:27mm}.h4{height:34mm}.h5{height:41mm}
.grid td.r19{height:18.5mm;}
.grid{width:100%;border-collapse:collapse;font-size:8pt;margin-bottom:4mm;}
.grid th{background:var(--escuro);color:#fff;padding:2mm 2mm;text-align:left;font-size:7.8pt;vertical-align:bottom;}
.grid td{border:1px solid var(--escuro);padding:2mm;vertical-align:top;height:22mm;}
.grid td.lab{font-weight:800;background:var(--off);width:18mm;}
.grid td .hint{font-size:7pt;color:var(--cinza);line-height:1.3;}
.two{display:flex;gap:5mm;}
.two > div{flex:1;}
.exemplo h2{margin-top:5mm;}
.exemplo .tb{font-size:8pt;}
.exTitle{display:inline-block;font-size:8pt;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--laranja);margin-bottom:1mm;}
"""


def split_templates(md):
    blocks = parse_blocks(md)
    intro = []
    tpls = []
    cur = None
    for b in blocks:
        if b[0] == "h1":
            if b[1].startswith("Template "):
                cur = {"title": b[1], "blocks": []}
                tpls.append(cur)
            else:
                cur = None
            continue
        if cur is None:
            intro.append(b)
        else:
            cur["blocks"].append(b)
    return intro, tpls


def sections_of(blocks):
    """Retorna dict nome_da_secao_h2 -> lista de blocos."""
    secs = {}
    order = []
    cur = None
    for b in blocks:
        if b[0] == "h2":
            cur = b[1]
            secs[cur] = []
            order.append(cur)
        elif cur:
            secs[cur].append(b)
    return secs, order


def tpl_slug(title):
    n = re.match(r"Template (\d)", title).group(1)
    name = title.split(" · ")[1]
    slug = name.lower()
    for a, b in (("ç", "c"), ("ã", "a"), ("á", "a"), ("é", "e"), ("ê", "e"), ("í", "i"), ("ó", "o"), ("õ", "o"), ("ú", "u")):
        slug = slug.replace(a, b)
    slug = re.sub(r"[^a-z0-9]+", "-", slug).strip("-")
    return "%02d-%s" % (int(n), slug)


STAGE_OF = {
    "1": "Etapa 1 · Dor",
    "2": "Etapa 2 · Solução",
    "3": "Etapa 3 · Arquitetura",
    "4": "Etapa 4 · Valor",
    "5": "As quatro etapas, na ordem",
}

HEIGHTS = {
    # template: {campo_prefixo: classe de altura}
    "1": {"1.": "h0", "2.": "h15", "3.": "h15", "4.": "h2", "5.": "h1", "6.": "h15"},
    "2": {"1.": "h1", "2.": "h1", "3.": "h15", "4.": "h2", "5.": "h1", "6.": "h15"},
    "4": {"1.": "h2", "2.": "h1", "3.": "h3", "4.": "h2", "5.": "h3", "6.": "h3", "7.": "h2", "8.": "h2"},
}


def render_fields(rows, tpl_num):
    out = []
    for r in rows[1:]:
        label, hint = r[0], r[1] if len(r) > 1 else ""
        h = "h3"
        for pref, cls in HEIGHTS.get(tpl_num, {}).items():
            if label.startswith(pref):
                h = cls
        out.append('<div class="field"><div class="fl">%s</div><div class="fh">%s</div><div class="fa %s"></div></div>' % (inline(label), inline(hint), h))
    return "".join(out)


def build_template(tpl, intro_note):
    title = tpl["title"]
    num = re.match(r"Template (\d)", title).group(1)
    name = title.split(" · ")[1]
    secs, order = sections_of(tpl["blocks"])
    serve = render_sections(secs.get("Para que serve", []))
    instr = render_sections(secs.get("Instruções de preenchimento", []))
    exemplo_key = next(k for k in order if k.startswith("Exemplo preenchido"))
    exemplo = render_sections(secs[exemplo_key])
    landscape = num == "3"

    meta = '''<div class="meta">
      <div class="m"><b>Cliente</b><div class="line"></div></div>
      <div class="m"><b>Projeto</b><div class="line"></div></div>
      <div class="m"><b>Data</b><div class="line"></div></div>
      <div class="m"><b>Preenchido por</b><div class="line"></div></div>
    </div>'''

    head = f'''<div class="tplHead"><div class="bar"></div><span class="kick">Template {num} · {inline(STAGE_OF[num])}</span><h1>{inline(name)}</h1><div class="brand"><b>NID</b> · Método NID</div></div>'''

    if num in ("1", "2", "4"):
        campos = secs["Campos"][0][1]
        if num == "4":
            rows = campos[1:]
            half = (len(rows) + 1) // 2
            blank = '<div class="two"><div>%s</div><div>%s</div></div>' % (
                render_fields([campos[0]] + rows[:half], num), render_fields([campos[0]] + rows[half:], num))
        else:
            blank = render_fields(campos, num)
        page1 = f'''{head}{meta}{blank}'''
        page2 = f'''<section class="chapter"><h2 style="margin-top:0">Para que serve</h2>{serve}<h2>Instruções de preenchimento</h2>{instr}</section>
<section class="chapter exemplo"><span class="exTitle">Exemplo preenchido · caso conduzido do playbook</span><h2 style="margin-top:0">{inline(name)} · projeto de automação comercial com IA para uma empresa de serviços de manutenção predial</h2><p style="color:var(--cinza);font-size:9pt">{inline(intro_note)}</p>{exemplo}</section>'''
        body = page1 + page2
        cls = ""
    elif num == "3":
        gerais = secs["Campos gerais"][0][1]
        etapa = secs["Campos por etapa (três a seis etapas)"][0][1]
        blank_gerais = "".join(
            '<div class="field"><div class="fl">%s</div><div class="fh">%s</div><div class="fa h2"></div></div>' % (inline(r[0]), inline(r[1]))
            for r in gerais[1:])
        cols = [r[0] for r in etapa[1:]]
        hints = {r[0]: r[1] for r in etapa[1:]}
        grid = ['<table class="grid"><thead><tr><th style="width:14mm">Etapa</th>']
        for c in cols[1:]:
            grid.append("<th>%s<div class=\"hint\" style=\"color:#C9C9C9;font-weight:400\">%s</div></th>" % (inline(c), inline(hints[c])))
        grid.append("</tr></thead><tbody>")
        for k in range(1, 7):
            grid.append('<tr><td class="lab">%d</td>' % k + "".join("<td></td>" for _ in cols[1:]) + "</tr>")
        grid.append("</tbody></table>")
        page1 = f'''{head}{meta}<div class="two"><div>{blank_gerais}</div><div><div class="field"><div class="fl">Desenho (blocos em sequência, setas, marco embaixo de cada bloco)</div><div class="fh">Três a seis etapas, do primeiro dia ao resultado. Uma página.</div><div class="fa" style="height:92mm;background:none;border:1px dashed var(--linha);border-radius:2mm"></div></div></div></div>
<section class="chapter"><h2 style="margin-top:0">Etapas (uma linha por etapa)</h2>{"".join(grid)}</section>'''
        page2 = f'''<section class="chapter"><h2 style="margin-top:0">Para que serve</h2>{serve}<h2>Instruções de preenchimento</h2>{instr}</section>
<section class="chapter exemplo"><span class="exTitle">Exemplo preenchido · caso conduzido do playbook</span><h2 style="margin-top:0">{inline(name)} · projeto de automação comercial com IA para uma empresa de serviços de manutenção predial</h2><p style="color:var(--cinza);font-size:9pt">{inline(intro_note)}</p>{exemplo}</section>'''
        body = page1 + page2
        cls = "land"
    else:  # 5 roteiro
        campos = secs["Campos"][0][1]
        rows = ['<table class="grid"><thead><tr><th style="width:26mm">Página</th><th style="width:50mm">Conteúdo</th><th style="width:36mm">De onde vem</th><th>O que vai nesta página (preencha)</th></tr></thead><tbody>']
        for r in campos[1:]:
            rows.append('<tr><td class="lab r19" style="width:26mm">%s</td><td class="r19"><div class="hint">%s</div></td><td class="r19"><div class="hint">%s</div></td><td class="r19"></td></tr>' % (inline(r[0]), inline(r[1]), inline(r[2])))
        rows.append("</tbody></table>")
        page1 = f'''{head}{meta}{"".join(rows)}'''
        page2 = f'''<section class="chapter"><h2 style="margin-top:0">Para que serve</h2>{serve}<h2>Instruções de preenchimento</h2>{instr}</section>
<section class="chapter exemplo"><span class="exTitle">Exemplo preenchido · caso conduzido do playbook</span><h2 style="margin-top:0">{inline(name)} · projeto de automação comercial com IA para uma empresa de serviços de manutenção predial</h2><p style="color:var(--cinza);font-size:9pt">{inline(intro_note)}</p>{exemplo}</section>'''
        body = page1 + page2
        cls = ""

    doc = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>{inline(title)} · Método NID</title>
<style>{TPL_CSS}</style>
</head>
<body class="{cls}">
{body}
</body>
</html>'''
    return doc


def template_md(tpl, intro_note):
    lines = ["# %s" % tpl["title"], "", "Template de fluxo do Método NID de Desenho de Projetos (Playbook NID · Desenhe para Vender). %s" % intro_note, ""]
    for b in tpl["blocks"]:
        t, d = b
        if t == "h2":
            lines += ["## %s" % d, ""]
        elif t == "h3":
            lines += ["### %s" % d, ""]
        elif t == "p":
            lines += [d, ""]
        elif t == "ul":
            lines += ["- %s" % x for x in d] + [""]
        elif t == "ol":
            lines += ["%d. %s" % (k + 1, x) for k, x in enumerate(d)] + [""]
        elif t == "table":
            head = d[0]
            lines.append("| " + " | ".join(head) + " |")
            lines.append("|" + "---|" * len(head))
            for r in d[1:]:
                lines.append("| " + " | ".join(r) + " |")
            lines.append("")
    lines += ["---", "", "NID · Consultoria de Performance Comercial. Uso pessoal do comprador do Playbook NID · Desenhe para Vender.", ""]
    return "\n".join(lines)


# ----------------------------------------------------------------------------
# Renderização
# ----------------------------------------------------------------------------

RENDER_JS = os.path.join(BUILD, "render.mjs")


def render_pdf(html_path, pdf_path):
    subprocess.run(["node", RENDER_JS, html_path, pdf_path], check=True)


def chapter_pages(pdf_path, n_chapters):
    import fitz
    doc = fitz.open(pdf_path)
    pages = {}
    for pno, page in enumerate(doc):
        txt = page.get_text()
        for idx in range(n_chapters):
            marker = "NIDCAP%02d" % idx
            if marker in txt and idx not in pages:
                pages[idx] = pno + 1
    return pages


def main():
    os.makedirs(TEMPLATES_DIR, exist_ok=True)
    # ---- playbook: passagem 1
    html_path = os.path.join(BASE, "03-playbook.html")
    pdf_path = os.path.join(BASE, "03-playbook.pdf")
    doc, titles = build_playbook()
    open(html_path, "w", encoding="utf-8").write(doc)
    render_pdf(html_path, pdf_path)
    pages = chapter_pages(pdf_path, len(titles))
    toc_pages = {titles[i]: p for i, p in pages.items()}
    # ---- passagem 2 com o sumário numerado
    doc, _ = build_playbook(toc_pages)
    open(html_path, "w", encoding="utf-8").write(doc)
    render_pdf(html_path, pdf_path)
    pages2 = chapter_pages(pdf_path, len(titles))
    if pages2 != pages:
        # numeração mudou (raro): terceira passagem
        toc_pages = {titles[i]: p for i, p in pages2.items()}
        doc, _ = build_playbook(toc_pages)
        open(html_path, "w", encoding="utf-8").write(doc)
        render_pdf(html_path, pdf_path)
    print("playbook:", pdf_path, "capítulos nas páginas", toc_pages)

    # ---- templates
    md = open(os.path.join(BASE, "02-templates-fluxo.md"), encoding="utf-8").read()
    intro, tpls = split_templates(md)
    intro_note = "Os números do exemplo são os que o cliente trouxe na conversa de diagnóstico, simplificados para o exercício; nenhum deles é resultado prometido."
    for tpl in tpls:
        slug = tpl_slug(tpl["title"])
        h = os.path.join(TEMPLATES_DIR, slug + ".html")
        p = os.path.join(TEMPLATES_DIR, slug + ".pdf")
        m = os.path.join(TEMPLATES_DIR, slug + ".md")
        open(h, "w", encoding="utf-8").write(build_template(tpl, intro_note))
        open(m, "w", encoding="utf-8").write(template_md(tpl, intro_note))
        render_pdf(h, p)
        print("template:", p)


if __name__ == "__main__":
    main()
