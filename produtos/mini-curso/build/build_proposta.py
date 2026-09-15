#!/usr/bin/env python3
"""
Constrói o modelo de proposta (material da aula 4) em HTML e PDF A4, na identidade NID.

Uso (a partir da raiz do repositório):
    python3 produtos/mini-curso/build/build_proposta.py            # HTML + PDF
    python3 produtos/mini-curso/build/build_proposta.py --raster   # também rasteriza para conferência

Entradas: o conteúdo abaixo (espelho de materiais/03-modelo-de-proposta.md) e build/logo_nid_base64.txt.
Saídas:   materiais/03-modelo-de-proposta.html e materiais/03-modelo-de-proposta.pdf.
Renderização: build/render.mjs (Playwright + Chromium já instalados no ambiente; nunca rodar playwright install).
"""
import html as H
import os
import subprocess
import sys

BUILD = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(BUILD)
MAT = os.path.join(BASE, "materiais")
LOGO = open(os.path.join(BUILD, "logo_nid_base64.txt"), encoding="utf-8").read().strip()

CSS = """
:root{--laranja:#F26522;--laranja2:#FF8A4C;--escuro:#373737;--cinza:#6B6B6B;--off:#F5F4F2;--linha:#E4E2DE;}
*{margin:0;padding:0;box-sizing:border-box;}
html,body{font-family:'Liberation Sans',Arial,Helvetica,sans-serif;color:var(--escuro);background:#fff;-webkit-font-smoothing:antialiased;font-size:10pt;line-height:1.45;}
@page{size:A4;margin:0;}
.page{width:210mm;height:297mm;overflow:hidden;position:relative;page-break-after:always;background:#fff;}
.page.last{page-break-after:auto;}
.page .in{position:absolute;left:18mm;right:18mm;top:16mm;bottom:20mm;}
.foot{position:absolute;left:18mm;right:18mm;bottom:9mm;display:flex;justify-content:space-between;align-items:center;font-size:7.5pt;color:var(--cinza);letter-spacing:.3px;}
.foot b{color:var(--escuro);font-weight:700;}
.foot .n{font-weight:700;color:var(--escuro);}
.barTop{position:absolute;left:0;top:0;width:100%;height:2.2mm;background:linear-gradient(90deg,var(--laranja),var(--laranja2));}
.kick{display:inline-block;font-size:8pt;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--laranja);margin-bottom:2.5mm;}
h1{font-size:22pt;font-weight:800;letter-spacing:-.6pt;line-height:1.1;margin-bottom:4mm;}
h1 .or{color:var(--laranja);}
h2{font-size:12.5pt;font-weight:800;margin:5mm 0 2.5mm;}
p{margin-bottom:2.5mm;}
.rule{background:var(--escuro);color:#fff;border-radius:3mm;padding:4mm 5mm;margin-bottom:4mm;font-size:9.5pt;line-height:1.45;}
.rule b{color:var(--laranja2);font-weight:700;letter-spacing:2px;text-transform:uppercase;font-size:7.5pt;display:block;margin-bottom:1.5mm;}
.box{background:var(--off);border:1px solid var(--linha);border-radius:3mm;padding:3.5mm 4.5mm;margin-bottom:3.5mm;font-size:9pt;line-height:1.45;color:var(--escuro);}
.box b.k{color:var(--laranja);font-weight:700;letter-spacing:2px;text-transform:uppercase;font-size:7.5pt;display:block;margin-bottom:1.5mm;}
.box.test{background:#fff;border-left:3px solid var(--laranja);}
.box.ex{color:var(--cinza);}
.box.ex .q{color:var(--escuro);}
table{width:100%;border-collapse:collapse;margin-bottom:3.5mm;font-size:9pt;}
th{text-align:left;font-size:7.5pt;letter-spacing:1.5px;text-transform:uppercase;color:var(--laranja);padding:0 2.5mm 1.8mm 2.5mm;border-bottom:2px solid var(--linha);font-weight:700;}
td{padding:2.6mm 2.5mm;vertical-align:top;border-bottom:1px solid var(--linha);line-height:1.4;}
td.o{font-weight:700;width:52mm;}
td.f{color:#B5B5B5;}
td.w{min-height:9mm;}
.fill{display:block;border-bottom:1px solid #B5B5B5;height:7mm;}
.fill.big{height:11mm;}
.lines .ln{display:flex;gap:2.5mm;align-items:flex-end;margin-bottom:2.2mm;font-size:9.5pt;}
.lines .ln span{white-space:nowrap;}
.lines .ln i{flex:1;border-bottom:1px solid #B5B5B5;height:5.5mm;}
.flow{display:flex;gap:2mm;align-items:stretch;margin-bottom:3.5mm;}
.flow .blk{flex:1;border:1px solid var(--linha);background:var(--off);border-radius:2.5mm;padding:2.5mm 2.5mm 2mm;min-width:0;}
.flow .blk .n{display:inline-block;background:var(--laranja);color:#fff;font-weight:800;font-size:8pt;border-radius:1.5mm;padding:.5mm 1.8mm;margin-bottom:1.5mm;}
.flow .blk .lab{font-size:6.8pt;letter-spacing:1px;text-transform:uppercase;color:var(--laranja);font-weight:700;margin-top:1.8mm;}
.flow .blk .fl{border-bottom:1px solid #B5B5B5;height:5mm;}
.flow .arr{align-self:center;color:var(--laranja);font-weight:800;font-size:11pt;}
.two{display:flex;gap:5mm;}
.two>div{flex:1;min-width:0;}
.compact table{font-size:8.5pt;}
.compact td{padding:2mm 2.5mm;}
.compact li{margin-bottom:1.2mm;}
ol,ul{padding-left:5mm;margin-bottom:3mm;}
li{margin-bottom:1.6mm;}
.chk li{list-style:none;position:relative;padding-left:6mm;}
.chk li:before{content:"";position:absolute;left:0;top:.8mm;width:3.4mm;height:3.4mm;border:1.5px solid var(--laranja);border-radius:.8mm;}
.cta{background:var(--escuro);color:#fff;border-radius:3mm;padding:5mm 6mm;margin-top:4mm;position:relative;overflow:hidden;}
.cta .k{color:var(--laranja2);font-weight:700;letter-spacing:2px;text-transform:uppercase;font-size:7.5pt;display:block;margin-bottom:1.5mm;}
.cta p{color:#DADADA;font-size:9.5pt;}
.cta .btn{display:inline-block;background:var(--laranja);color:#fff;font-weight:800;padding:2.8mm 5mm;border-radius:2mm;font-size:10pt;margin-top:2mm;}
/* capa */
.cover{background:var(--escuro);color:#fff;}
.glow{position:absolute;border-radius:50%;filter:blur(6px);}
.g1{width:150mm;height:150mm;right:-45mm;top:-50mm;background:radial-gradient(circle,rgba(242,101,34,.55),transparent 65%);}
.g2{width:120mm;height:120mm;left:-40mm;bottom:-45mm;background:radial-gradient(circle,rgba(242,101,34,.30),transparent 65%);}
.cover .in{left:22mm;right:22mm;top:24mm;bottom:22mm;}
.logoRow{display:flex;align-items:center;gap:5mm;}
.logoImg{height:15mm;width:auto;display:block;}
.logoDiv{width:1px;height:11mm;background:rgba(255,255,255,.22);}
.txt2{font-size:7.5pt;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9C9C9C;line-height:1.45;}
.cover .label{font-size:9.5pt;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--laranja2);margin-bottom:8mm;}
.cover .title{position:absolute;top:58mm;left:0;}
.cover h1{font-size:40pt;line-height:1.02;letter-spacing:-1.5pt;max-width:150mm;color:#fff;}
.cover h1 .or{color:var(--laranja2);}
.cover .sub{margin-top:8mm;font-size:13.5pt;color:#C9C9C9;max-width:135mm;line-height:1.45;}
.cover .pages{position:absolute;top:130mm;left:0;right:0;display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;}
.cover .pages .s{border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);border-radius:3mm;padding:3mm 3.5mm 2.5mm;}
.cover .pages .s .n{font-size:7.5pt;letter-spacing:2px;color:var(--laranja2);font-weight:700;text-transform:uppercase;}
.cover .pages .s .t{font-size:11pt;font-weight:800;margin-top:.8mm;color:#fff;}
.cover .desc{position:absolute;top:196mm;left:0;max-width:150mm;font-size:10pt;color:#BDBDBD;line-height:1.55;}
.cover .desc b{color:#fff;}
.cover .bottom{position:absolute;left:0;bottom:0;display:flex;align-items:center;gap:5mm;}
.cover .bottom .ln{width:14mm;height:3px;background:var(--laranja);}
.cover .bottom .who small{display:block;font-size:8pt;letter-spacing:2px;text-transform:uppercase;color:#9C9C9C;margin-bottom:1mm;}
.cover .bottom .who b{font-size:13pt;font-weight:800;color:#fff;display:block;}
.cover .bottom .who span{font-size:9.5pt;color:#BDBDBD;}
"""

LOGO_HTML = (f'<div class="logoRow"><img class="logoImg" src="data:image/png;base64,{LOGO}">'
             '<div class="logoDiv"></div><div class="txt2">Núcleo de Inteligência<br>Digital</div></div>')

PAGES_TOTAL = 13


def e(t):
    return H.escape(t, quote=False)


def foot(n):
    return (f'<div class="foot"><span><b>Mini curso NID · Apresente para Fechar</b> · Modelo de proposta · '
            f'material da aula 4</span><span class="n">{n:02d}</span></div>')


def page(body, n, cls=""):
    return f'<section class="page{cls}"><div class="barTop"></div><div class="in">{body}</div>{foot(n)}</section>'


def fill_line(label, big=False):
    return f'<div class="ln"><span>{e(label)}</span><i></i></div>'


def rule(t):
    return f'<div class="rule"><b>Regra</b>{e(t)}</div>'


def ex(t):
    return f'<div class="box ex"><b class="k">No caso conduzido</b><span class="q">{t}</span></div>'


def test(t):
    return f'<div class="box test"><b class="k">Teste da página</b>{e(t)}</div>'


def head(n, nome, titulo):
    return f'<span class="kick">Página {n} de 9 · {e(nome)}</span><h1>{titulo}</h1>'


def tbl(cols, rows, first_bold=True):
    th = "".join(f"<th>{e(c)}</th>" for c in cols)
    trs = ""
    for r in rows:
        tds = ""
        for i, c in enumerate(r):
            cls = "o" if (i == 0 and first_bold) else ""
            if c == "":
                cls += " f"
                c = " "
            tds += f'<td class="{cls.strip()}">{c}</td>'
        trs += f"<tr>{tds}</tr>"
    return f"<table><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table>"


def lines(*items):
    return '<div class="lines">' + "".join(fill_line(i) for i in items) + "</div>"


# ---------------------------------------------------------------- capa
cover_pages = [
    ("1", "Capa"), ("2", "Dor"), ("3", "Solução"),
    ("4", "Arquitetura: desenho"), ("5", "Arquitetura: entregáveis"), ("6", "Arquitetura: respostas"),
    ("7", "Valor"), ("8", "Investimento"), ("9", "Próximo passo"),
]
cover = f'''<section class="page cover">
  <div class="glow g1"></div><div class="glow g2"></div>
  <div class="in">
    {LOGO_HTML}
    <div class="title">
      <div class="label">Mini curso NID · Apresente para Fechar</div>
      <h1>Modelo de <span class="or">proposta</span></h1>
      <div class="sub">As nove páginas que ficam na mesa do cliente depois que você sai, na ordem do roteiro de proposta do Método NID de Desenho de Projetos.</div>
    </div>
    <div class="pages">{"".join(f'<div class="s"><div class="n">Página {n}</div><div class="t">{e(t)}</div></div>' for n, t in cover_pages)}</div>
    <div class="desc">Material da aula 4. Cada página tem a <b>regra</b>, os <b>campos</b> para preencher e o <b>exemplo</b> do caso conduzido do playbook. Preenche-se com os quatro templates de fluxo prontos: canvas de dor, mapa de solução, fluxo de arquitetura e tabela de valor.</div>
    <div class="bottom"><div class="ln"></div><div class="who"><small>Proposta para</small><b>____________________________</b><span>Data da apresentação: ______ / ______ / ________</span></div></div>
  </div>
</section>'''

# ---------------------------------------------------------------- como usar
p_uso = f'''<div class="compact"><span class="kick">Antes de preencher</span>
<h1>Como usar este modelo</h1>
<p>Uma página do modelo é uma página da proposta. O documento é preenchido com as saídas dos quatro templates de fluxo do playbook, copiando as frases como estão. Se algum template ainda não existe, volte ao playbook antes de montar a proposta. Os exemplos em cinza são do caso conduzido do capítulo 7 do playbook (automação comercial com IA para uma empresa de serviços de manutenção predial); os números são os que o cliente trouxe no diagnóstico, simplificados para o exercício, e nenhum deles é resultado prometido.</p>
<ol>
<li><b>A ordem não muda:</b> capa, dor, solução, arquitetura (desenho), arquitetura (entregáveis), arquitetura (respostas), valor, investimento, próximo passo.</li>
<li><b>Nas páginas 2 e 3, nada sobre você.</b> São as duas páginas em que o cliente diz "sim" antes de ver qualquer coisa do projeto.</li>
<li><b>O preço aparece pela primeira vez na página 8.</b> Antes disso, nenhum número, faixa ou "a partir de".</li>
<li><b>A página 4 é visual:</b> blocos, setas, marcos. Se está em texto corrido, ainda não é desenho.</li>
<li><b>A página 9 termina na pergunta com data.</b> Sem "fico à disposição", "qualquer dúvida" ou "aguardo retorno".</li>
<li><b>Páginas institucionais só depois da 9</b>, no máximo uma página de apresentação da empresa.</li>
<li><b>Antes de apresentar,</b> passe a proposta pelo checklist do playbook (capítulo 9) e pelo checklist de reunião deste mini curso (material da aula 1).</li>
</ol>
<h2>De onde vem cada página</h2>
{tbl(["Página", "Conteúdo", "De onde vem"], [
    ["1. Capa", "Nome do cliente, título do projeto (o que muda para o cliente), quem apresenta, data", "Mapa de solução"],
    ["2. Dor", "Diagnóstico em uma frase, com a conta do custo aberta", "Canvas de dor, campos 4 e 6"],
    ["3. Solução", "Frase de solução e premissas", "Mapa de solução, campos 3 e 4"],
    ["4. Arquitetura (desenho)", "O fluxo em uma página: etapas, setas, marcos, responsáveis, prazos", "Fluxo de arquitetura"],
    ["5. Arquitetura (entregáveis)", "O que o cliente recebe em cada etapa", "Fluxo de arquitetura, lista de entregáveis"],
    ["6. Arquitetura (respostas)", "O que o cliente disse que teme ou já tentou e o componente que responde", "Fluxo de arquitetura, riscos respondidos"],
    ["7. Valor", "Ancoragem na régua da dor e conta de equivalência", "Tabela de valor, campos 1 a 4"],
    ["8. Investimento", "Preço na estrutura da arquitetura, incluso, não incluso, condições, comparação em uma frase", "Tabela de valor, campos 5 a 7"],
    ["9. Próximo passo", "O que aprovar, data de início, primeira responsabilidade do cliente", "Tabela de valor, campo 8"],
])}</div>'''

# ---------------------------------------------------------------- página 1
p1 = head(1, "Capa", "A capa fala do que <span class='or'>muda</span> para o cliente") + rule(
    "O título fala do que muda para o cliente, não do que você vende. A logo da sua empresa entra pequena. Nada mais.") + tbl(
    ["Campo", "Preencha"], [
        ["Nome do cliente (empresa)", ""],
        ["Título do projeto (o que muda para o cliente)", ""],
        ["Subtítulo (o tipo de projeto, em uma linha)", ""],
        ["Quem apresenta (nome e empresa)", ""],
        ["Data da apresentação", ""],
    ]) + ex('Projeto para [empresa de serviços de manutenção predial]. Título: "Atendimento que responde na hora e cobra todo orçamento". Subtítulo: projeto de automação comercial com IA. Apresentado pela NID · Consultoria de Performance Comercial. Data da apresentação.') + test(
    'Cubra o subtítulo. O título ainda diz o que muda para o cliente? Se ele diz o que você vende ("Implantação de agente de IA"), reescreva.')

# ---------------------------------------------------------------- página 2
p2 = head(2, "Dor", "O diagnóstico em uma frase, <span class='or'>nas palavras dele</span>") + rule(
    "O diagnóstico em uma frase, nas palavras do cliente, com a conta do custo aberta embaixo. Vem do canvas de dor (campos 4 e 6). Não há uma palavra sobre você, seu produto ou sua empresa nesta página.") + \
    '<h2>Diagnóstico em uma frase</h2>' + lines("“Hoje", "", ", o que deixa", "", ", e se continuar assim", ".”") + \
    '<h2>Conta aberta</h2>' + tbl(["Linha", "Conta (com as premissas que o cliente deu)", "Resultado"], [
        ["1", "", ""], ["2", "", ""], ["3", "", ""], ["Total por período", "", ""]]) + \
    ex('"Hoje os pedidos de orçamento chegam pelo WhatsApp e pelo site e são respondidos quando a assistente consegue, e os orçamentos enviados não são cobrados, o que deixa cerca de 25 visitas e 5 fechamentos por mês sem acontecer (algo perto de R$ 60 mil em serviços não realizados), e se continuar assim os dois técnicos contratados ficam parados e o dono segue como gargalo." Conta aberta: 25 visitas × 1/3 × R$ 4.500 = R$ 37.500; 5 orçamentos × R$ 4.500 = R$ 22.500; total cerca de R$ 60.000 por mês.') + \
    test("A frase tem algum termo que o cliente nunca usou? Troque. A conta foi feita com ele e ele reconhece os números? Se não, a página ainda não está pronta.")

# ---------------------------------------------------------------- página 3
p3 = head(3, "Solução", "A tese, <span class='or'>sem entregável</span>") + rule(
    "A frase de solução e as premissas. Vem do mapa de solução (campos 3 e 4). Sem entregável: se dá para colocar preço em alguma palavra da frase, ela ainda é escopo. O cliente precisa concordar com esta página antes de você virar para o desenho.") + \
    '<h2>Frase de solução</h2>' + lines("“Para", "(a dor parar), precisa existir", "(o que precisa mudar), de modo que", "(efeito na operação).”") + \
    '<h2>Premissas (inclua as ressalvas que o cliente fez)</h2>' + lines("1.", "2.", "3.", "4.") + \
    ex('"Para os pedidos de orçamento deixarem de esperar e os orçamentos enviados deixarem de morrer sem cobrança, precisa existir um atendimento que responda na hora, qualifique com as perguntas certas e faça o follow-up de todo orçamento, sem depender da assistente nem do dono, de modo que o dono só entre para fazer a visita e fechar." Premissas: o atendimento fala em nome da empresa e nunca finge ser pessoa; as perguntas de qualificação são as que o dono já faz; a agenda passa a ter horários abertos; a assistente continua, revisando e assumindo os casos fora do padrão.') + \
    test('Leia a frase para alguém que não conhece o cliente e pergunte "o que ele vai comprar?". Se a pessoa souber responder com um entregável, a frase tem escopo dentro. Tire e leve para a página 5.')

# ---------------------------------------------------------------- página 4
def blk(n):
    labs = ["Nome da etapa", "O que entra", "Marco (o que sai)", "Responsável", "Prazo"]
    inner = "".join(f'<div class="lab">{l}</div><div class="fl"></div>' for l in labs)
    return f'<div class="blk"><span class="n">{n}</span>{inner}</div>'

flow = '<div class="flow">' + '<div class="arr">→</div>'.join(blk(i) for i in range(1, 6)) + '</div>'
p4 = head(4, "Arquitetura: o desenho", "O fluxo em uma página, <span class='or'>na ordem</span>") + rule(
    "Etapas em sequência, setas, marco embaixo de cada bloco, responsável e prazo. Vem do fluxo de arquitetura. De três a seis etapas. O primeiro bloco responde ao primeiro problema da dor, nunca ao que você vende. O que você vende aparece como componente dentro de uma etapa.") + \
    flow + lines("Etapa 6 (se houver): nome, entra, marco, responsável, prazo:", "Primeiro resultado visível para o cliente: etapa ____, na semana", "Responsabilidades do cliente, nomeadas por etapa:") + \
    ex('Cinco blocos. <b>1. Mapa do atendimento</b> (semanas 1 e 2): entra duas horas do dono e da assistente e o histórico do WhatsApp; sai o roteiro de qualificação aprovado; NID e cliente. <b>2. Construção do agente</b> (semanas 3 e 4): entra o roteiro aprovado; sai o agente respondendo no WhatsApp e no site com o tom aprovado; NID, com uma rodada de testes do dono. <b>3. Agenda e follow-up</b> (semana 5): entra o agente aprovado; sai visita marcada na agenda e follow-up de todo orçamento; NID, cliente libera a agenda. <b>4. Operação assistida</b> (semanas 6 e 7): sai o roteiro ajustado com as conversas reais; NID e assistente. <b>5. Operação e revisão mensal</b> (a partir da semana 8): painel e reunião mensal; NID e dono. Primeiro resultado visível: o atendimento da empresa no papel, no fim da semana 2.') + \
    test("Alguém que não estava na reunião consegue explicar o projeto olhando só esta página? Se precisa de texto para entender, ainda não é desenho.")

# ---------------------------------------------------------------- página 5
p5 = head(5, "Arquitetura: os entregáveis", "O que fica com o cliente, <span class='or'>por etapa</span>") + rule(
    'O que o cliente recebe ao fim de cada etapa, agrupado por etapa, nunca como lista solta. Vem da lista de entregáveis do fluxo de arquitetura. Na reunião, esta página não é lida: você diz "aqui está o que fica com você ao fim de cada etapa" e deixa o cliente ler.') + \
    tbl(["Etapa", "O que fica com o cliente ao fim dela"], [[f"{i}.", ""] for i in range(1, 7)]) + \
    ex('Etapa 1: roteiro de qualificação e lista de serviços com as perguntas do síndico. Etapa 2: agente de IA no WhatsApp e no site, com base de conhecimento e tom aprovado. Etapa 3: integração com a agenda e régua de follow-up de orçamentos. Etapa 4: operação assistida com relatório diário e roteiro ajustado. Etapa 5: operação contínua, painel e reunião mensal.') + \
    test("Cada entregável está embaixo de uma etapa do desenho? Se existe um item que não pertence a etapa nenhuma, ou ele entra em uma etapa ou sai da proposta.")

# ---------------------------------------------------------------- página 6
p6 = head(6, "Arquitetura: as respostas", "O que ele disse e <span class='or'>o que responde</span>") + rule(
    "Uma linha por preocupação do cliente: o que ele disse que já tentou, teme ou não quer, e o componente do desenho que responde, com a etapa em que está. Vem dos riscos respondidos do fluxo de arquitetura, do canvas de dor e das ressalvas do mapa de solução. É a página que o decisor ausente mais precisa ler e a que mais fecha venda em comitê.") + \
    tbl(["O que o cliente disse (nas palavras dele)", "O componente que responde", "Etapa"], [["“ ”", "", ""] for _ in range(5)], first_bold=False) + \
    ex('"Não quero uma coisa robótica": rodada de testes de tom com o dono, identificação como atendimento da empresa e passagem imediata para a assistente em qualquer caso fora do roteiro (etapa 2). "Nos dias de chuva chegam trinta de uma vez": resposta simultânea a todos e critério de urgência que coloca infiltração ativa no topo da fila de visita (etapas 1 e 2). "Não tenho tempo de ficar cobrando": régua de três contatos em dez dias para todo orçamento enviado (etapa 3).') + \
    '<div class="box"><b class="k">Na reunião</b>"Você me disse que [o que ele teme ou já tentou]. Por isso o bloco [número] tem [o componente]." Uma linha por preocupação, lida inteira, olhando para o cliente.</div>' + \
    test("Confira contra o canvas de dor e o mapa de solução: tudo o que o cliente disse que teme, já tentou ou não quer tem uma linha aqui? Se falta uma, o desenho tem um buraco.")

# ---------------------------------------------------------------- página 7
p7 = head(7, "Valor", "A régua da dor, <span class='or'>antes do preço</span>") + rule(
    "A ancoragem na régua da dor, na mesma unidade de medida da dor, com a conta de equivalência feita com os números do cliente. Vem da tabela de valor (campos 1 a 4). Sem promessa de número. Se existe prova real e autorizada de um projeto parecido, ela entra aqui como evidência do mecanismo. Se não existe, o mecanismo basta.") + \
    tbl(["Campo", "Preencha"], [
        ["Dor em número (copiada da página 2)", "______________ por ______"],
        ["Unidade de medida (em que a dor e o valor se medem)", ""],
        ["O que muda com o projeto (na unidade de medida, sem prometer número)", ""],
        ["Conta de equivalência (quanto vale cada unidade recuperada)", "Cada ______________ vale ______________"],
        ["Evidência (só real e autorizada; se não houver, deixe em branco)", ""],
    ]) + \
    ex('Dor em número: cerca de R$ 60 mil por mês em serviços que não acontecem. Unidade: visitas e fechamentos por mês. O que muda: nenhum pedido espera, nenhum orçamento fica sem follow-up, o dono sai do gargalo. Equivalência: cada visita recuperada vale um terço de R$ 4.500, ou R$ 1.500; cada orçamento fechado pelo follow-up vale R$ 4.500. Quantos voltam depende do preço e da concorrência do cliente; a régua é essa.') + \
    '<div class="box"><b class="k">Na reunião</b>"Lá na nossa primeira conversa a gente chegou a [o custo da dor por período]. Lembra? Essa é a régua."</div>' + \
    test('Tem algum número nesta página que o cliente não deu? Tire. Tem alguma frase do tipo "você vai recuperar X"? Tire, a menos que venha de dado real e autorizado.')

# ---------------------------------------------------------------- página 8
p8 = head(8, "Investimento", "O preço, <span class='or'>na estrutura do desenho</span>") + rule(
    "O preço aparece aqui pela primeira vez: setup ligado às etapas de construção, mensalidade ligada às etapas de operação, ou fases, cada parte apontando para os blocos da página 4. Com incluso, não incluso, o que fica com o cliente mesmo que o projeto pare, condições e a comparação em uma frase. Vem da tabela de valor (campos 5 a 7). Sem desconto e sem comparação com concorrente.") + \
    tbl(["Parte", "Etapas do desenho", "Valor", "O que está incluso"], [
        ["Setup (pago uma vez)", "Etapas ____ a ____", "R$", ""],
        ["Operação (por mês)", "Etapas ____ a ____", "R$ ________ por mês, prazo mínimo de ______", ""],
        ["Fase adicional (se houver)", "Etapa ____", "R$", ""],
    ]) + lines("Não incluso (o que fica fora e em nome de quem):", "O que fica com o cliente mesmo que o projeto pare:", "Condições (forma de pagamento, validade da proposta):") + \
    '<h2>Comparação em uma frase</h2>' + lines("“Perto de", "por ______ que a gente calculou,", ".”") + \
    ex('Setup das etapas 1 a 3, pago uma vez: [valor]. Entrega o roteiro, o agente construído com o tom da empresa, a integração com a agenda e o follow-up; o roteiro e a base de conhecimento ficam com o cliente. Operação das etapas 4 e 5: [valor] por mês, prazo mínimo de [prazo]; inclui operação assistida, painel, reunião mensal e ajustes. Não incluso: o número de WhatsApp e a conta de mensagens, em nome do cliente. Comparação: "Perto dos R$ 60 mil por mês que a gente calculou, a operação mensal se paga com poucas visitas recuperadas."') + \
    test("Cada valor aponta para blocos do desenho? Existe número solto, sem etapa? Existe desconto antes de alguém pedir? Existe o nome de um concorrente? Corrija os quatro. Depois da comparação, na reunião: pare de falar e conte até dez.")

# ---------------------------------------------------------------- página 9
p9 = head(9, "Próximo passo", "Verbo, data e <span class='or'>a pergunta</span>") + rule(
    'O que o cliente aprova, quando o projeto começa (a etapa 1, com data proposta) e a primeira responsabilidade dele. Vem da tabela de valor (campo 8). A página termina na pergunta com data. Sem "fico à disposição", "qualquer dúvida" ou "aguardo retorno".') + \
    tbl(["Campo", "Preencha"], [
        ["O que o cliente aprova (proposta, contrato, e-mail de aprovação, pagamento do setup)", ""],
        ["Quando começa (nome da etapa 1 e data proposta)", "______________ em ______ / ______"],
        ["O que você precisa do cliente na semana 1", ""],
        ["Data alternativa (só para a sua cabeça; não vai na página)", "______ / ______"],
    ]) + '<h2>Pergunta de fechamento, escrita na página</h2>' + \
    lines("“Se fizer sentido, o próximo passo é", "e", ", que é a etapa 1, em ______. Eu preciso de", ". Consigo agendar para ______?”") + \
    ex('Aprovação da proposta e sessão de mapa do atendimento na semana seguinte, na terça proposta. A NID precisa de duas horas do dono e da assistente e do histórico do WhatsApp exportado. Pergunta: "Consigo agendar para a terça?". Alternativa na cabeça de quem apresenta: a quinta.') + \
    '<div class="box"><b class="k">Depois da pergunta</b>Silêncio. Três respostas possíveis: "sim" (confirme data e responsabilidade em voz alta e pare de vender), "sim, mas" (é objeção: ouça, devolva em pergunta, volte para a página, confirme, volte ao próximo passo) e "não agora" (saia com um próximo passo menor, com data).</div>' + \
    test('A página tem verbo, data e o que você precisa do cliente? Termina em pergunta? Se termina em "fico à disposição", reescreva.')

# ---------------------------------------------------------------- página final
p_fim = '''<span class="kick">Depois da página 9</span>
<h1>Páginas opcionais e <span class="or">condução</span></h1>
<h2>Páginas opcionais (sempre depois da 9)</h2>
<ul>
<li><b>Quem é a sua empresa</b>, em uma página, com o que sustenta a arquitetura, não com histórico, missão ou prêmios.</li>
<li><b>Casos por segmento</b>, só com dado real e autorizado. Sem nome de cliente sem autorização registrada.</li>
<li><b>Termos e condições</b>: validade da proposta, forma de pagamento, o que acontece em caso de cancelamento.</li>
</ul>
<h2>Como cada página é conduzida na reunião</h2>
''' + tbl(["Página", "Regra de condução", "Aula"], [
    ["1. Capa", 'Fica na tela durante o contrato de reunião. Vira depois do "pode ser assim?"', "2"],
    ["2. Dor", 'Leia a frase inteira e pergunte "continua sendo isso?". Silêncio. Primeiro "sim"', "3"],
    ["3. Solução", 'Leia a frase e pergunte "faz sentido para você?". Passe pelas premissas. Segundo "sim"', "3"],
    ["4. Desenho", "Uma frase por bloco. Aponte marco, responsabilidade do cliente, primeiro resultado visível e prazo por etapa", "4"],
    ["5. Entregáveis", 'Não leia. "Aqui está o que fica com você ao fim de cada etapa." Deixe o cliente ler', "4"],
    ["6. Respostas", 'Leia inteira, olhando para o cliente. "Você me disse que... Por isso o bloco... tem..."', "4"],
    ["7. Valor", 'Volte à conta: "Lá na nossa primeira conversa a gente chegou a... Lembra? Essa é a régua."', "5"],
    ["8. Investimento", "Apresente na estrutura do desenho, diga a comparação em uma frase e pare de falar. Conte até dez", "5"],
    ["9. Próximo passo", "Leia a página e faça a pergunta com data. Silêncio", "7"],
])

p_check = '''<span class="kick">Checagem final</span>
<h1>Antes de <span class="or">apresentar</span></h1>
<p>Passe a proposta por esta lista antes da reunião. Se um item falhar, volte à página correspondente. A proposta só está pronta com todos os itens marcados.</p>
<div class="two"><div><ul class="chk">
<li>As nove páginas estão na ordem do roteiro.</li>
<li>O título da capa fala do que muda para o cliente.</li>
<li>Nas páginas 2 e 3 não há uma palavra sobre você.</li>
<li>O preço não aparece antes da página 8.</li>
<li>A página 4 é visual, com três a seis etapas, marco, responsável e prazo.</li>
</ul></div><div><ul class="chk">
<li>A página 6 cobre tudo o que o cliente disse que teme, já tentou ou não quer.</li>
<li>A página 9 termina na pergunta com data.</li>
<li>A proposta passou pelo checklist do playbook (capítulo 9) e pelo checklist de reunião (aula 1).</li>
<li>Nome do cliente certo em todas as páginas; ortografia revisada.</li>
</ul></div></div>
<div class="cta"><span class="k">Preencha este modelo no NIDflow</span>
<p>O roteiro de proposta já está dentro do NIDflow, a ferramenta da NID para desenhar e apresentar projetos na mesma tela, com os cinco templates do método prontos para preencher e o modo de apresentação na ordem destas nove páginas. R$ 29,90 por mês, cancele quando quiser.</p>
<span class="btn">Quero desenhar meu próximo projeto no NIDflow</span></div>'''

bodies = [p_uso, p1, p2, p3, p4, p5, p6, p7, p8, p9, p_fim, p_check]


def build_html():
    parts = [cover]
    for i, b in enumerate(bodies, start=2):
        parts.append(page(b, i, " last" if i == len(bodies) + 1 else ""))
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Modelo de proposta · Mini curso NID · Apresente para Fechar</title>
<style>{CSS}</style>
</head>
<body>
{chr(10).join(parts)}
</body>
</html>
'''


def main():
    html_path = os.path.join(MAT, "03-modelo-de-proposta.html")
    pdf_path = os.path.join(MAT, "03-modelo-de-proposta.pdf")
    open(html_path, "w", encoding="utf-8").write(build_html())
    subprocess.run(["node", os.path.join(BUILD, "render.mjs"), html_path, pdf_path], check=True)
    if "--raster" in sys.argv:
        import pymupdf
        out = os.environ.get("RASTER_DIR", "/tmp/mini-curso-raster")
        os.makedirs(out, exist_ok=True)
        doc = pymupdf.open(pdf_path)
        for p in doc:
            p.get_pixmap(dpi=50).save(os.path.join(out, f"proposta-{p.number + 1:02d}.png"))
        print("páginas:", len(doc), "->", out)


if __name__ == "__main__":
    main()
