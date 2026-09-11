#!/usr/bin/env python3
"""
Constrói os slides de apoio do Mini curso NID · Apresente para Fechar.

Uso (a partir da raiz do repositório):
    python3 produtos/mini-curso/build/build.py            # HTML + PDF de todas as aulas
    python3 produtos/mini-curso/build/build.py --raster   # também rasteriza para conferência (scratchpad)

Entradas: build/specs.py (conteúdo de cada slide), build/template_css.css (CSS oficial da skill
nid-apresentacoes, sem alteração), build/logo_nid_base64.txt (logo da NID).
Saídas:   slides/aula-XX.html e slides/aula-XX.pdf (1280x720, 16:9).
Renderização: build/render.mjs (Playwright + Chromium já instalados no ambiente; nunca rodar playwright install).
"""
import html as H
import os
import subprocess
import sys

BUILD = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(BUILD)
SLIDES = os.path.join(BASE, "slides")
sys.path.insert(0, BUILD)
from specs import AULAS  # noqa: E402

CSS = open(os.path.join(BUILD, "template_css.css"), encoding="utf-8").read()
LOGO = open(os.path.join(BUILD, "logo_nid_base64.txt"), encoding="utf-8").read().strip()

EXTRA_CSS = """
  /* ---- extensões para as aulas do mini curso (mesma paleta e tipografia) ---- */
  .statement h1{font-size:56px;max-width:1040px;color:#fff;}
  .statement h1 .or{color:var(--laranja2);}
  .statement .sub{margin-top:28px;font-size:22px;color:#C9C9C9;max-width:900px;line-height:1.5;}
  .blk .ic.num{font-weight:800;font-size:20px;color:var(--laranja);}
  .blocks.tight{gap:14px;margin-top:26px;}
  .blocks.tight .bt{font-size:19px;}
  .blocks.tight .bd{font-size:15.5px;}
  .steps.five{gap:16px;}
  .steps.five .step{padding:28px 18px 24px;}
  .steps.five .st{font-size:16.5px;}
  .steps.five .sd{font-size:13.5px;}
  .steps.five .step .arrow{right:-14px;}
  .quoteCard{margin-top:34px;background:var(--off);border:1px solid var(--linha);border-left:8px solid var(--laranja);
    border-radius:18px;padding:36px 44px;max-width:1040px;}
  .quoteCard .q{font-size:27px;line-height:1.45;font-weight:600;color:var(--escuro);}
  .quoteCard .q .or{color:var(--laranja);}
  .quoteNote{margin-top:22px;font-size:17px;color:var(--cinza);max-width:1000px;line-height:1.5;}
  .dark .quoteCard{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.10);border-left-color:var(--laranja2);}
  .dark .quoteCard .q{color:#EDEDED;}
  .dark .quoteNote{color:#BDBDBD;}
  .deliv.three{grid-template-columns:1fr 1fr 1fr;}
  .dcard .di.num{font-weight:800;font-size:19px;color:var(--laranja);}
  .dcard .di.no{background:rgba(55,55,55,.08);color:var(--escuro);font-weight:800;font-size:19px;}
  .tbl{width:100%;border-collapse:collapse;margin-top:30px;font-size:15.5px;}
  .tbl th{text-align:left;font-size:12.5px;letter-spacing:2px;text-transform:uppercase;color:var(--laranja);
    padding:0 14px 12px 14px;border-bottom:2px solid var(--linha);}
  .tbl td{padding:16px 14px;vertical-align:top;border-bottom:1px solid var(--linha);line-height:1.42;color:var(--escuro);}
  .tbl td.o{font-weight:700;width:190px;}
  .tbl td.p{color:var(--cinza);}
  .agenda{display:flex;gap:6px;margin-top:44px;}
  .agenda .seg{background:var(--off);border:1px solid var(--linha);border-radius:14px;padding:18px 14px 16px;position:relative;}
  .agenda .seg .m{font-size:30px;font-weight:800;color:var(--laranja);letter-spacing:-1px;}
  .agenda .seg .t{font-size:15px;font-weight:700;margin-top:4px;}
  .agenda .seg .d{font-size:13px;color:var(--cinza);margin-top:4px;line-height:1.35;}
  .agenda .seg.big{background:linear-gradient(135deg,rgba(242,101,34,.12),rgba(255,138,76,.12));border-color:rgba(242,101,34,.35);}
  .agendaNote{margin-top:30px;background:var(--off);border:1px solid var(--linha);border-radius:14px;padding:18px 24px;font-size:16.5px;color:var(--cinza);max-width:1040px;}
  .agendaNote b{color:var(--escuro);}
  .task .items{display:flex;flex-direction:column;gap:14px;margin-top:30px;max-width:900px;}
  .task .item{display:flex;gap:16px;align-items:flex-start;}
  .task .item .n{flex:0 0 36px;height:36px;border-radius:10px;background:var(--laranja);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;}
  .task .item .t{font-size:19px;line-height:1.4;color:#EDEDED;padding-top:5px;}
  .task .next{position:absolute;left:90px;right:90px;bottom:96px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px 26px;display:flex;gap:18px;align-items:center;}
  .task .next .k{font-size:12.5px;letter-spacing:2px;text-transform:uppercase;color:var(--laranja2);font-weight:700;flex:0 0 150px;}
  .task .next .v{font-size:18px;color:#EDEDED;line-height:1.4;}
  .ctaLine{margin-top:26px;font-size:24px;font-weight:800;color:#fff;letter-spacing:-.5px;}
  .ctaLine .or{color:var(--laranja2);}
  .twoText .lead{margin-top:20px;}
  .twoText .col.card{flex:0 0 470px;background:var(--off);border:1px solid var(--linha);border-radius:20px;padding:34px 36px;}
  .twoText .col.card .k{font-size:12.5px;letter-spacing:2px;text-transform:uppercase;color:var(--laranja);font-weight:700;margin-bottom:14px;}
  .twoText .col.card .li{display:flex;gap:12px;align-items:flex-start;font-size:17px;line-height:1.45;margin:11px 0;color:var(--escuro);}
  .twoText .col.card .li b{color:var(--laranja);flex:0 0 22px;}
"""

FOOT = '<div class="foot{cls}"><span class="brand">NID · Consultoria de Performance Comercial</span><span class="pageno">{n:02d}</span></div>'
LOGO_HTML = ('<div class="logo"><img class="logoImg" src="data:image/png;base64,' + LOGO + '">'
             '<div class="logoDiv"></div><div class="txt2">Núcleo de Inteligência<br>Digital</div></div>')

CHECK = ('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F26522" stroke-width="3" '
         'stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>')
XICON = ('<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF8A4C" stroke-width="2.4" '
         'stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>')
ARROW = ('<div class="arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F26522" '
         'stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>')


def e(t):
    """Escapa HTML e permite marcação mínima: {laranja} vira <span class="or">."""
    t = H.escape(t, quote=False)
    t = t.replace("[[", '<span class="or">').replace("]]", "</span>")
    return t.replace("\n", "<br>")


def s_cover(sl, n, aula):
    return f'''<section class="slide cover">
  <div class="glow c1"></div><div class="glow c2"></div>
  <div class="pad">
    {LOGO_HTML}
    <div style="position:absolute;top:210px;left:90px;">
      <div class="label">Mini curso NID · Apresente para Fechar</div>
      <h1>Aula {aula}<br><span class="or">{e(sl["titulo"])}</span></h1>
      <div class="sub">{e(sl["sub"])}</div>
    </div>
    <div class="forwho"><div class="ln"></div><div class="who"><small>Quem apresenta</small><b>Henrique Leite</b><span>Sócio da NID</span></div></div>
  </div>
  {FOOT.format(cls=" onDark", n=n)}
</section>'''


def s_statement(sl, n, aula):
    sub = f'<div class="sub">{e(sl["sub"])}</div>' if sl.get("sub") else ""
    return f'''<section class="slide dark statement">
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "A ideia"))}</span>
    <h1 style="margin-top:40px">{e(sl["texto"])}</h1>
    {sub}
  </div>
  {FOOT.format(cls=" onDark", n=n)}
</section>'''


def s_pain(sl, n, aula):
    items = "".join(f'<div class="painItem"><div class="x">{XICON}</div><div class="pt">{e(i)}</div></div>' for i in sl["itens"])
    return f'''<section class="slide dark">
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "Onde a reunião se perde"))}</span>
    <h2 style="color:#fff">{e(sl["titulo"])}</h2>
    <div class="pain">{items}</div>
  </div>
  {FOOT.format(cls=" onDark", n=n)}
</section>'''


def s_list(sl, n, aula):
    tight = " tight" if len(sl["itens"]) > 4 else ""
    items = "".join(
        f'<div class="blk"><div class="ic num">{i + 1}</div><div><div class="bt">{e(t)}</div><div class="bd">{e(d)}</div></div></div>'
        for i, (t, d) in enumerate(sl["itens"]))
    return f'''<section class="slide">
  <div class="barTop"></div>
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "O jeito NID"))}</span>
    <h2>{e(sl["titulo"])}</h2>
    <div class="blocks{tight}" style="max-width:1040px">{items}</div>
  </div>
  {FOOT.format(cls="", n=n)}
</section>'''


def s_steps(sl, n, aula):
    five = " five" if len(sl["itens"]) >= 5 else ""
    items = "".join(
        f'<div class="step"><div class="num">{i + 1}</div><div class="st" style="margin-top:14px">{e(t)}</div><div class="sd">{e(d)}</div>{ARROW}</div>'
        for i, (t, d) in enumerate(sl["itens"]))
    note = f'<div class="agendaNote">{e(sl["nota"])}</div>' if sl.get("nota") else ""
    return f'''<section class="slide">
  <div class="barTop"></div>
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "Como a NID faz"))}</span>
    <h2>{e(sl["titulo"])}</h2>
    <div class="steps{five}">{items}</div>
    {note}
  </div>
  {FOOT.format(cls="", n=n)}
</section>'''


def s_quote(sl, n, aula):
    dark = sl.get("dark", False)
    cls = " dark" if dark else ""
    bar = "" if dark else '<div class="barTop"></div>'
    note = f'<div class="quoteNote">{e(sl["nota"])}</div>' if sl.get("nota") else ""
    hcolor = ' style="color:#fff"' if dark else ""
    return f'''<section class="slide{cls}">
  {bar}
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "Palavra por palavra"))}</span>
    <h2{hcolor}>{e(sl["titulo"])}</h2>
    <div class="quoteCard"><div class="q">{e(sl["texto"])}</div></div>
    {note}
  </div>
  {FOOT.format(cls=" onDark" if dark else "", n=n)}
</section>'''


def s_grid(sl, n, aula):
    three = " three" if len(sl["itens"]) > 4 else ""
    cards = ""
    for i, it in enumerate(sl["itens"]):
        t, d = it[0], it[1]
        kind = it[2] if len(it) > 2 else "num"
        if kind == "no":
            ic = '<div class="di no">×</div>'
        elif kind == "ok":
            ic = f'<div class="di">{CHECK}</div>'
        else:
            ic = f'<div class="di num">{i + 1}</div>'
        cards += f'<div class="dcard">{ic}<div><div class="dt">{e(t)}</div><div class="dd">{e(d)}</div></div></div>'
    return f'''<section class="slide">
  <div class="barTop"></div>
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "Na prática"))}</span>
    <h2>{e(sl["titulo"])}</h2>
    <div class="deliv{three}">{cards}</div>
  </div>
  {FOOT.format(cls="", n=n)}
</section>'''


def s_table(sl, n, aula):
    head = "".join(f"<th>{e(h)}</th>" for h in sl["colunas"])
    rows = ""
    for r in sl["linhas"]:
        rows += "<tr>" + "".join(
            f'<td class="{"o" if i == 0 else ("p" if i == 1 else "")}">{e(c)}</td>' for i, c in enumerate(r)) + "</tr>"
    return f'''<section class="slide">
  <div class="barTop"></div>
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "Objeções"))}</span>
    <h2>{e(sl["titulo"])}</h2>
    <table class="tbl"><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table>
  </div>
  {FOOT.format(cls="", n=n)}
</section>'''


def s_agenda(sl, n, aula):
    segs = ""
    for m, t, d, big in sl["itens"]:
        segs += f'<div class="seg{" big" if big else ""}" style="flex:{m}"><div class="m">{m}</div><div class="t">{e(t)}</div><div class="d">{e(d)}</div></div>'
    note = f'<div class="agendaNote">{e(sl["nota"])}</div>' if sl.get("nota") else ""
    return f'''<section class="slide">
  <div class="barTop"></div>
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "O tempo"))}</span>
    <h2>{e(sl["titulo"])}</h2>
    <div class="agenda">{segs}</div>
    {note}
  </div>
  {FOOT.format(cls="", n=n)}
</section>'''


def s_task(sl, n, aula):
    items = "".join(f'<div class="item"><div class="n">{i + 1}</div><div class="t">{e(t)}</div></div>' for i, t in enumerate(sl["itens"]))
    nxt = ""
    if sl.get("proxima"):
        nxt = f'<div class="next"><div class="k">Próxima aula</div><div class="v">{e(sl["proxima"])}</div></div>'
    return f'''<section class="slide cta task">
  <div class="c1"></div>
  <div class="pad">
    <span class="kicker">Entregável desta aula</span>
    <h2 style="color:#fff">{e(sl["titulo"])}</h2>
    <div class="items">{items}</div>
    {nxt}
  </div>
  {FOOT.format(cls=" onDark", n=n)}
</section>'''


def s_two(sl, n, aula):
    lis = "".join(f'<div class="li"><b>{i + 1}</b><span>{e(t)}</span></div>' for i, t in enumerate(sl["card"]))
    return f'''<section class="slide">
  <div class="barTop"></div>
  <div class="pad">
    <div class="two twoText">
      <div class="col">
        <span class="kicker">{e(sl.get("kicker", "Na tela"))}</span>
        <h2>{e(sl["titulo"])}</h2>
        <p class="lead">{e(sl["texto"])}</p>
      </div>
      <div class="col card"><div class="k">{e(sl["cardTitulo"])}</div>{lis}</div>
    </div>
  </div>
  {FOOT.format(cls="", n=n)}
</section>'''


def s_nidflow(sl, n, aula):
    pis = "".join(f'<div class="pi">{CHECK}<span>{e(t)}</span></div>' for t in sl["itens"])
    return f'''<section class="slide invest">
  <div class="pad">
    <div class="priceWrap">
      <div class="priceCard">
        <div class="tag">NIDFLOW</div>
        <div class="pl">Assinatura mensal</div>
        <div class="pv"><small>R$ </small>29,90<small>/mês</small></div>
        <div class="per">Cancela quando quiser · 7 dias de garantia</div>
        <div class="divd"></div>
        {pis}
      </div>
      <div class="right">
        <span class="kicker">{e(sl["kicker"])}</span>
        <h2 style="color:#fff">{e(sl["titulo"])}</h2>
        <div class="hl"><div class="hn">{e(sl["destaque"])}</div><div class="hd">{e(sl["destaqueSub"])}</div></div>
        <div class="ctaLine">[[{e(sl["cta"])}]]</div>
      </div>
    </div>
  </div>
  {FOOT.format(cls=" onDark", n=n)}
</section>'''.replace("[[", '<span class="or">').replace("]]", "</span>")


def s_final(sl, n, aula):
    return f'''<section class="slide cta">
  <div class="c1"></div>
  <div class="pad">
    <span class="kicker">{e(sl.get("kicker", "Fim do mini curso"))}</span>
    <h2 style="color:#fff;max-width:900px">{e(sl["titulo"])}</h2>
    <p class="lead" style="margin-top:22px;max-width:820px">{e(sl["texto"])}</p>
    <div class="end">
      <div style="margin-bottom:18px">{LOGO_HTML}</div>
      <div class="big">{e(sl["frase"])}</div>
    </div>
  </div>
  {FOOT.format(cls=" onDark", n=n)}
</section>'''


RENDER = {
    "cover": s_cover, "statement": s_statement, "pain": s_pain, "list": s_list, "steps": s_steps,
    "quote": s_quote, "grid": s_grid, "table": s_table, "agenda": s_agenda, "task": s_task,
    "two": s_two, "nidflow": s_nidflow, "final": s_final,
}


def build_html(aula, spec):
    parts = []
    for i, sl in enumerate(spec["slides"], start=1):
        parts.append(RENDER[sl["tipo"]](sl, i, aula))
    title = f'Aula {aula} · {spec["titulo"]} · Mini curso NID · Apresente para Fechar'
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>{H.escape(title)}</title>
<style>{CSS}{EXTRA_CSS}</style>
</head>
<body>
{chr(10).join(parts)}
</body>
</html>
'''


def main():
    raster = "--raster" in sys.argv
    only = [a for a in sys.argv[1:] if a.isdigit()]
    os.makedirs(SLIDES, exist_ok=True)
    for aula, spec in AULAS.items():
        if only and str(aula) not in only:
            continue
        name = f"aula-{aula:02d}"
        html_path = os.path.join(SLIDES, name + ".html")
        pdf_path = os.path.join(SLIDES, name + ".pdf")
        open(html_path, "w", encoding="utf-8").write(build_html(aula, spec))
        subprocess.run(["node", os.path.join(BUILD, "render.mjs"), html_path, pdf_path], check=True)
        print(name, len(spec["slides"]), "slides")
        if raster:
            import fitz  # PyMuPDF
            out = os.environ.get("RASTER_DIR", "/tmp/mini-curso-raster")
            os.makedirs(out, exist_ok=True)
            doc = fitz.open(pdf_path)
            for p in doc:
                p.get_pixmap(dpi=50).save(os.path.join(out, f"{name}-{p.number + 1:02d}.png"))
            print("  páginas:", len(doc), "->", out)


if __name__ == "__main__":
    main()
