# Revisão de coerência do Funil 2 · NID

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Autor | Agente `estrategia` |
| Data | 15/09/2026 |
| Base | `docs/00-brief-mestre.md` v1.0 e `docs/01-parecer-estrategico.md` (seções 4, 5 e 6) |

## 0. Resumo executivo

1. **O funil é coerente no que importa.** Nomes, preços, garantia, promessa mestra, arco do método, número de aulas (8) e minutos (108), materiais (6) e a definição canônica do método são os mesmos em todas as 47 peças lidas. A cadeia anúncio → página → playbook → mini curso → NIDflow → Plataforma não tem promessa órfã: a tabela 0.5 dos criativos prende cada anúncio à página, a página promete o que o playbook entrega, o mini curso começa onde o playbook termina, a oferta do NIDflow só afirma o que o plano de assinatura autoriza e a página e as sequências da Plataforma só prometem o que os arquivos `01` a `05` definem.
2. **Vereditos**: 109 APROVADO, 36 AJUSTAR, 1 BLOQUEAR. Nenhum AJUSTAR é de estratégia; são correções de execução e de registro, quase todas de uma linha. O BLOQUEAR é operacional: nenhuma gravação de tela do NIDflow (criativos e Reels) antes de o backlog B-02 (remoção de dados de clientes da NID) e B-06 (marca) estar aceito.
3. **O maior risco de coerência não está no texto, está no tempo.** O playbook (PDF, imutável depois de entregue), o e-mail de entrega E0, a aula 4 e a aula 8 afirmam que o NIDflow existe com os cinco templates do método dentro. O `nidflow` mostrou que isso é backlog de 16 a 22 dias de uma pessoa (B-00 a B-09), a partir de um HTML que ainda não está no repositório. Três correções fecham o buraco sem mudar o produto: tirar o prazo "nos próximos dias" do playbook e de E0 (a apresentação chega "quando a ferramenta estiver liberada"), segurar a mídia paga até `nidflow_venda_liberada = sim` (pré-requisito 5 do plano de verba, explicitado) e gravar a aula 4 e os vídeos de tela só depois de B-02, B-04 e B-06.
4. **Um defeito de execução que ninguém veria na leitura**: o PDF do playbook tem zero links. Os seis CTAs "Quero desenhar meu próximo projeto no NIDflow" são texto morto. Correção no pipeline de build, com as UTMs `F2-nidflow-cta` e o parâmetro `?template=` do onboarding.
5. **Colisões de código** entre fluxos (`P1`/`P2` Pix e perguntas, `R1` a `R3` checkout e `R1` a `R9` NIDflow, `A1` a `A7` regras e `A1` a `A4` ativação, `B1` a `B4` e-mails e critérios, `M1` a `M4` agente e marcos, `RC` Plataforma e checkout) e cinco valores de UTM fora da convenção. Proposta de convenção única na seção 4; o `automacao` registra e os donos renomeiam ao implementar.
6. **O que precisa do Henrique para a primeira venda** cabe em uma tarde: aprovar o brief com as dez mudanças propostas, decidir a plataforma de checkout e abrir as contas (Cakto, emissor de nota fiscal, e-mail de suporte, domínio), entregar o HTML do NIDflow, confirmar cinco nomes e regras (sessão de arquitetura, segmentos, quem envia o convite do Gatilho A, limiares do Gatilho B, quem modera) e validar três afirmações sobre a prática da NID usadas nos criativos. A gravação do mini curso (6h30) e dos criativos (uma manhã) vem depois, e só ela libera a mídia paga. A Plataforma depende de decisões próprias (seção 6, P-15 e P-16) e de 8,5 dias de gravação, mas nada disso bloqueia o playbook.

---

## 1. O que foi lido e como

| Grupo | Arquivos | Como |
|---|---|---|
| Fundação | `docs/00-brief-mestre.md`; `docs/01-parecer-estrategico.md` (seções 4, 5 e 6) | Por inteiro |
| Playbook | `01-playbook.md` (capítulos 1, 2, 7, 8, 9 e 11 por inteiro; 3 a 6 e 10 por amostragem), `02-templates-fluxo.md`, `03-playbook.pdf`, `templates/` (15 arquivos listados), `pagina-de-vendas.md`, `checkout-e-order-bump.md`, `pagina-de-obrigado.md`, `pagina-de-upsell.md` | Por inteiro, salvo o declarado |
| Mini curso | `00-grade.md`, `aulas/aula-01.md`, `aula-04.md`, `aula-08.md`, `guia-de-gravacao.md`, `pagina-de-vendas.md`, `slides/aula-04.pdf`, `materiais/03-modelo-de-proposta.pdf` | Por inteiro (aulas 2, 3, 5, 6 e 7 não lidas, sem veredito) |
| NIDflow | `01-plano-de-assinatura.md`, `02-onboarding.md`, `03-interno-vs-produto.md`, `04-backlog-tecnico.md`, `oferta/oferta-d7.md`, `mensagens-onboarding.md` | Por inteiro |
| Automações | `automacoes/01` a `05`; `sequencias/01` a `09` | Por inteiro |
| Campanhas | `campanhas/01` a `05` | Por inteiro |
| Plataforma | `produtos/plataforma/01` a `05`, `pagina-de-vendas.md` (`textos-do-ambiente.md` não existe) | Por inteiro |
| Verificações automáticas | Travessão e léxico proibido em todos os `.md` das quatro pastas; fontes, travessões e links nos três PDFs | Script (resultado: zero travessões em texto e PDF; léxico proibido só em citações do que é proibido e no cabeçalho "Fórmula" do painel de métricas; zero links no PDF do playbook) |

---

## 2. Matriz de coerência

Cada linha é um elemento que precisa ser igual em todas as peças. "Conformes" lista onde o elemento aparece igual; "Divergem" lista onde não, com a correção na seção 3.

| Elemento | Valor canônico (brief) | Conformes | Divergem |
|---|---|---|---|
| Nome do degrau 1 | Playbook NID · Desenhe para Vender; subtítulo "Como desenhar qualquer projeto para vender" | Playbook, PDF, templates, página, checkout, obrigado, upsell, E0 a E6, R1 a N2, CC1 a CC4, agente, criativos, calendário, página da Plataforma | Nenhuma |
| Preço, CTA e garantia do playbook | R$ 29,90; "Quero o playbook por R$ 29,90"; "7 dias de garantia, reembolso sem pergunta" | Todas as peças que citam | Nenhuma |
| Nome do degrau 2 | Mini curso NID · Apresente para Fechar; "mini curso" com espaço | Todas | Nenhuma |
| Preço do mini curso | R$ 147 avulso; R$ 97 só no checkout do playbook (e na página seguinte, se aprovado) | Checkout, upsell, página do mini curso, E3 a E6, N16, CC4, agente (`06`), playbook cap. 11 | `01-agente`, seção 1.2 ("na sessão de compra": pressupõe o upsell aprovado; D1) |
| CTA do mini curso avulso | Não fixado no brief; adotado "Quero as aulas por R$ 147" | Página do mini curso, E3, E5, E6, N16, CC4, agente | Nenhuma |
| Aulas, minutos, materiais | 8 aulas, cerca de 108 minutos (10 a 18 min), slides + roteiro de apresentação + checklist de reunião + modelo de proposta + banco de objeções + régua de follow-up | Grade, guia, página do mini curso, checkout, upsell, E0-B, E0-C, E3, E5, B1 a B4, agente (`06`), Plataforma (biblioteca) | `01-agente`, seção 6.3 ("a confirmar"; D1) |
| NIDflow: nome, preço, CTA, condições | `NIDflow`; "R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia"; "Quero desenhar meu próximo projeto no NIDflow"; sem período grátis, sem plano anual | Playbook cap. 8 e 11, templates, aula 4 e 8, plano, onboarding, oferta D+7, mensagens, agente, CC2, Plataforma | Nenhuma |
| NIDflow: o que afirma existir | Cinco templates dentro, fluxo desenhado, modo de apresentação na ordem do roteiro, projetos salvos na conta, projetos ilimitados, primeiro projeto em menos de 15 minutos; PDF só com `nidflow_pdf_disponivel = sim` | Oferta D+7, mensagens, agente, onboarding, aula 4 e 8, playbook | Página da Plataforma, seção 8 item 6 e Modo C (PDF sem condição; G6). Todas dependem de B-00 a B-09 (P-02) |
| Prazo da apresentação do NIDflow ao comprador | D+7 (brief 8.1), condicionado à flag `nidflow_venda_liberada` (fluxo `03`) | Fluxo `03`, oferta D+7, agente (com a correção D1) | Playbook cap. 11 ("nos próximos dias"), E0-A, E0-B, B3, E6, Reel do Dia 19 (A1, E1, E2, F3) |
| Plataforma NID: preço, CTA, parcelamento, inclusos | R$ 980 por ano; CTA proposto "Quero praticar o método com a NID por R$ 980 por ano"; "Pix à vista ou em até 12 vezes no cartão", sem valor de parcela e sem "sem juros"; NIDflow incluso (R$ 358,80 de referência); mini curso incluso (proposta); 7 inclusos, avançados a partir de R$ 197 | `01` a `05`, página, agente (`01` e `06`), aula 8 (com a correção B2) | Aula 8 grava o preço e a condição "playbook e mini curso" (B2); tudo depende de 6.5 e das decisões P-15 |
| Método | Dor → Solução → Arquitetura → Valor; tabela da seção 7 do brief | Playbook, templates, aulas, páginas, criativos, calendário, catálogo | Nenhuma |
| Frase-modelo do Henrique | "Sou o Henrique, sócio da NID. Este é o método que a gente usa para desenhar os projetos que vendemos." | Aulas 1, 4, 8; catálogo 5.4; criativos V-rosto ("Aqui é o Henrique, sócio da NID") | Nenhuma |
| Como o Henrique aparece | "Henrique Leite, sócio da NID"; nunca mentor; assina só CA1, CA1e, CA2, CB1 | Todas | Nenhuma |
| Perguntas do Gatilho A | Texto exato de 8.2 | Obrigado, E1, E5, agente, NIDflow (tela de conclusão), `04-gatilho-a.md` | Nenhuma |
| Prazo do convite do Gatilho A | 24 horas corridas, horário comercial (fluxo `04`) | `04`, CA1 | Página de obrigado, `04-gatilho-a.md` 2.3 e 2.5 ("nos próximos dias"; A6, E4) |
| Nome da primeira reunião do Funil 1 | "Sessão de arquitetura" até o Henrique confirmar | Playbook cap. 11, obrigado, agente, CA1 a CA3, aula 8, página da Plataforma | Nenhuma (pendência P-05) |
| Segmentos citáveis | Educação, saúde, indústria, varejo e serviços (10.6) | Playbook, páginas, checkout, criativos, calendário, agente (`06`), Plataforma (página) | `01-agente` (1.2, 6.1, prompt), `01-angulos` regra 3, `02-catalogo` padrão 3 (sete segmentos; D1, F1, G2, pendência P-12) |
| Prova | Só prática da NID; placeholders `[DEPOIMENTO REAL]`, `[NÚMERO REAL]`, `[CASO REAL A CONFIRMAR COM HENRIQUE]` | Todas | Nenhuma inventada. Afirmações de prática nos criativos C03, C11 e ângulo A6 aguardam confirmação (P-18) |
| Escassez | Nunca falsa; contagem regressiva só com data real | Todas; Plataforma só nos dois últimos dias da janela | Nenhuma |
| Léxico proibido, travessão, "pra" | Zero | Todas (verificação por script) | Cabeçalho "Fórmula" no painel de métricas (F5, documento interno) |
| Etiquetas | Só as da seção 7 do `05-integracoes.md` | Fluxos, sequências, NIDflow | `F2-pagina-playbook-decisor`, `F2-pagina-plataforma-decisor` (viram códigos de origem `PG02`, `PG03`; D5, E6, G6); sete etiquetas da Plataforma a registrar (G1) |
| Eventos | Só os da seção 8.1 do `05` | Fluxos, NIDflow | `F2_pagina_obrigado_vista`, `F2_upsell_visto`, `F2_upsell_recusado` (D5); dezenove eventos da Plataforma (G1) |
| UTMs | Convenção 8.3 do `05` | Oferta D+7, E3 a E6, N16, R1 a N2, CC1 a CC4, criativos, calendário, plano de verba | `utm_medium=humano`, `utm_campaign=F2-gatilho-a` e `F2-gatilho-b`, `utm_content` `ca1e`, `ca2`, `ca3`, `cb0` a `cb3`, `cc1` a `cc4`, `r1` a `r3`, `p1`, `p2`, `n1`, `n2` (a registrar; E4, E7) |
| Códigos de mensagem | Únicos por fluxo | | Colisões listadas na seção 4 |
| Plataforma de checkout e taxas | Cakto primeiro, Kiwify reserva; taxa oficial a confirmar | `01-plano`, `05-integracoes`, `01-estrutura` | Duas hipóteses de taxa da Cakto convivem (8,5% + R$ 0,50 no plano; 4,99% + R$ 2,49 no `05`); declarado nos dois, resolve-se na conta de teste (P-07) |

---

## 3. Vereditos por peça

Legenda: `APROVADO` (pronta para uso), `AJUSTAR` (correção exata indicada; o agente dono aplica), `BLOQUEAR` (não pode ir ao ar antes do que está descrito). Cada peça foi lida por inteiro, salvo onde o coordenador pediu leitura por capítulos, e isso está declarado.

### 3.A Playbook (`produtos/playbook/`)

#### A1 · `01-playbook.md` (capítulos 1, 2, 7, 8, 9 e 11 lidos por inteiro; capítulos 3 a 6 e 10 conferidos por amostragem dos exemplos e das menções a produto)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Definição do método (capítulo 2) | APROVADO | Tabela idêntica à seção 7 do brief, palavra por palavra nas perguntas-guia e nos erros comuns. As quatro regras estão na ordem do brief. |
| Arco dor → solução → arquitetura → valor no próprio playbook | APROVADO | Capítulo 1 é a dor (as três caras do problema e as correções que não funcionam), capítulo 2 é a tese, capítulos 3 a 8 são a arquitetura, capítulo 11 fecha em valor e próximo passo. |
| Caso conduzido (capítulo 7) | APROVADO | Projeto do tipo que a NID vende (automação comercial com IA), cliente por segmento, números declarados como do exercício, preço como `[valor]`. Nenhuma prova inventada. |
| Roteiro de proposta e checklist (capítulos 8 e 9) | APROVADO | Nove páginas e 28 itens, coerentes com o template 5 e com a página de vendas ("vinte e oito itens"). |
| CTA do NIDflow (capítulo 8 e templates) | APROVADO no texto | Texto e preço corretos ("R$ 29,90 por mês, cancele quando quiser"). O problema do link está em A3. |
| Capítulo 11 (próximo passo) | APROVADO | Mini curso a R$ 147 (preço fora do checkout, correto), NIDflow a R$ 29,90 por mês com garantia e cancelamento, Gatilho A como continuidade natural ("Uma última coisa"), aviso de que a apresentação do NIDflow chega "nos próximos dias" (coerente com D+7). Henrique aparece só como "sócio da NID". |
| Voz e léxico | APROVADO | Nenhum travessão, nenhum termo proibido, "para" por extenso, preços no formato do brief. Segmentos citados são os cinco do brief (10.6). |

#### A2 · `02-templates-fluxo.md` e pasta `templates/` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Cinco templates com campos, instruções e exemplo | APROVADO | Campos batem com os capítulos 3 a 6 e 8 do playbook e com a seção 2 do `02-onboarding.md` do NIDflow. O exemplo é o mesmo caso conduzido, com os mesmos números. |
| Arquivos por template (HTML, PDF e texto em `templates/`) | APROVADO | Os 15 arquivos existem (`01` a `05`, em `.html`, `.md` e `.pdf`), como a página de vendas promete ("cada um em arquivo próprio, pronto para imprimir em A4, em PDF e em texto"). |
| CTA do NIDflow ao fim de cada template | APROVADO no texto | Ver A3 para o link. |

#### A3 · `03-playbook.pdf` e PDFs dos templates (páginas 1, 2, 5, 16, 30 e 42 renderizadas; fontes, travessões e links verificados por script em todas as 42 páginas)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Identidade visual | APROVADO | Ver "Complemento visual dos PDFs" ao fim da seção 3: capa, paleta, logo e miolo conferidos nas seis páginas renderizadas. |
| Tipografia | APROVADO | Só Liberation Sans (Arial no ambiente de renderização), conforme 10.1. |
| Travessões no PDF | APROVADO | Zero ocorrências nas 42 páginas. |
| Links clicáveis | AJUSTAR (`metodo`, com a mecânica do `nidflow`) | O PDF não tem nenhum link (zero anotações de URI nas 42 páginas). Os seis CTAs "Quero desenhar meu próximo projeto no NIDflow" (capítulo 8 e cinco templates) são texto morto. Correção: no pipeline de build (`build/render.mjs`), transformar cada CTA em link para a página da oferta do NIDflow com o parâmetro do template e as UTMs da convenção do `05-integracoes.md`, seção 8.3: `{url_oferta_nidflow}?template=<slug>&utm_source=playbook&utm_medium=cta-produto&utm_campaign=F2-nidflow-cta&utm_content=<slug>` (slugs: `canvas-de-dor`, `mapa-de-solucao`, `fluxo-de-arquitetura`, `tabela-de-valor`, `roteiro-de-proposta`; no capítulo 8, `roteiro-de-proposta`). Aplicar o mesmo nos cinco PDFs de `templates/`. A URL final depende do domínio da oferta (pendência P-03). |
| Frase "Responda ao e-mail de entrega" (Gatilho A, capítulo 11) | APROVADO | Não precisa de link; o ponto de coleta C7 do `04-segmentacao-gatilhos.md` prevê a leitura humana da caixa de entrada. |

#### A4 · `pagina-de-vendas.md` do playbook (lida por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Hero, promessa e CTA | APROVADO | Headline nomeia o inimigo comum (orçamento) e o mecanismo (projeto); CTA oficial; garantia ao lado. |
| Dor (seção 2) | APROVADO | Os quatro cards são as frases literais dos perfis 1, 3 e 4 do brief (4.2). |
| Método (seção 4) | APROVADO | Perguntas-guia e saídas idênticas ao brief. |
| O que está incluso, item 1 | AJUSTAR (`copy`) | "Onze capítulos: ... e um capítulo de adaptação para cada perfil de quem vende" diz que há um capítulo por perfil; o playbook tem um único capítulo 10 com quatro seções. Trocar por: "Onze capítulos: o problema, a tese, as quatro etapas do método com a mesma estrutura cada uma, o caso conduzido, o roteiro de proposta, o checklist e um capítulo de adaptações com uma seção para cada perfil de quem vende." |
| O que está incluso, itens 2 a 6 | APROVADO | Cada promessa existe no playbook ou nos templates (conferido: nove páginas, 28 itens, 15 arquivos, cinco projetos de exemplo: quatro nos capítulos 3 a 6 e um no capítulo 7). |
| Prova rápida e prova social | APROVADO | Só prática da NID e segmentos do brief; `[NÚMERO REAL]` e `[DEPOIMENTO REAL]` com regra de ocultação. |
| Para quem não é (decisor) | APROVADO | Coerente com 4.5 do brief e com a redação que propus para 4.5 (as duas versões levam o decisor ao WhatsApp da NID, não ao checkout). Etiqueta `F2-pagina-playbook-decisor` não está no mapa de etiquetas do `05-integracoes.md`: ver D5. |
| FAQ | APROVADO | Responde às seis objeções do brief (4.2) com o mecanismo; "Isso é um curso de vendas?" reforça a categoria (2.5). |
| Especificação técnica | APROVADO | Paleta, tipografia da `nid-pages`, um único destino de clique, sem contagem regressiva. |

#### A5 · `checkout-e-order-bump.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Nomes, preços, subtítulo, texto do checkbox | APROVADO | Texto do checkbox idêntico ao brief (6.2). "Só nesta compra" em vez de "só nesta tela", como pedi no parecer. Total com bump R$ 126,90. |
| Lista de ganhos do bump | APROVADO | "Oito vídeo-aulas gravadas, cerca de 108 minutos" e seis materiais batem com `00-grade.md`. O brief (6.2) lista quatro materiais; as peças entregam seis, o que é mais do que o prometido, não menos. |
| Botões e mensagens de erro | APROVADO | CTAs descrevem o que acontece depois do clique; a versão fixa "Pagar e receber meu acesso agora" também. |
| Eventos e etiquetas | APROVADO | `F2_bump_aceito` e `F2-bump` estão no `05-integracoes.md`. |
| Nota sobre a página seguinte (upsell) | APROVADO | Marcada como condicional à aprovação do Henrique. |

#### A6 · `pagina-de-obrigado.md` (lida por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Perguntas do Gatilho A | APROVADO | Texto exato do brief (8.2); um clique; pode pular; nunca se supõe. |
| Retorno para o decisor | AJUSTAR (`copy`) | "Nos próximos dias alguém da NID te escreve para propor uma sessão de arquitetura, sem custo." contradiz a regra operacional do `04-segmentacao-gatilhos.md` (convite humano em até 24 horas, em horário comercial). Trocar por: "Em até um dia útil, alguém da NID te escreve para propor uma sessão de arquitetura, sem custo." Mantém a promessa dentro do que a operação cumpre, inclusive na compra de fim de semana. |
| Variantes A e B, acesso, rodapé | APROVADO | |
| Eventos | APROVADO | `F2_qualificacao_respondida` está no `05`; `F2_pagina_obrigado_vista` não está na lista canônica: ver D5. |

#### A7 · `pagina-de-upsell.md` (lida por inteiro; `[CONDICIONAL]`)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Honestidade de preço | APROVADO | "R$ 97 agora. Depois desta página, R$ 147." é verdadeiro sob a regra proposta (R$ 97 só na sessão de compra). |
| Arco, garantia, recusa visível, sem contagem regressiva | APROVADO | |
| Condição de publicação | APROVADO | Só entra no ar com a aprovação do Henrique registrada na seção 13 do brief (mudança de 5.2 e 6.2). Até lá, o checkout redireciona direto para a página de obrigado, como o `02-entrega-pos-compra.md` prevê. |

### 3.B Mini curso (`produtos/mini-curso/`)

#### B1 · `00-grade.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Grade | APROVADO | Oito aulas, 12+10+12+16+14+18+14+12 = 108 minutos. Cada aula tem entregável que o aluno faz na própria proposta. |
| Ponto de partida e de chegada | APROVADO | Começa na proposta pronta (capítulos 8 e 9 do playbook), termina no follow-up; é exatamente o corte que o capítulo 8 do playbook anuncia. |
| Materiais | APROVADO | Cinco arquivos existem em `materiais/`; correspondem ao que checkout, upsell e página do mini curso listam. |
| CTAs | APROVADO | Sem oferta nas aulas 1 a 7; NIDflow na aula 8 com o CTA oficial; Plataforma só como menção. |

#### B2 · Roteiros (`aulas/aula-01.md`, `aula-04.md`, `aula-08.md` lidos por inteiro; aulas 2, 3, 5, 6 e 7 não lidas e sem veredito)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Abertura das aulas | APROVADO | Frase-modelo do brief (10.5): "Sou o Henrique, sócio da NID. Este é o método que a gente usa para desenhar os projetos que vendemos." |
| Aula 1 | APROVADO | Arco em miniatura, frases citáveis, caso conduzido na tela, entregável claro. Primeira pessoa do singular só na fala, como o brief permite. |
| Aula 4 | APROVADO, com dependência | O que o Henrique mostra na tela (cinco templates na ordem, fluxo com marcos e responsáveis, modo de apresentação nas nove páginas) é exatamente o que o backlog B-04 do NIDflow ainda vai construir. A aula só pode ser gravada depois de B-04 e B-06 (ver pendência P-02). O roteiro não promete nada além disso, o que está certo. |
| Aula 8, oferta do NIDflow | APROVADO | Preço, garantia, cancelamento e CTA oficial; "primeiro projeto em menos de quinze minutos" bate com o onboarding. |
| Aula 8, menção à Plataforma NID | AJUSTAR (`roteiro`) | O roteiro grava em vídeo "por novecentos e oitenta reais por ano" e "abre para quem já comprou o playbook e o mini curso". O preço e a condição de abertura da Plataforma ainda dependem do Sprint 6 e do Henrique (decisão 3, parcelamento, catálogo); gravar o número trava o produto ou obriga regravação. Trocar o trecho por: "A NID está montando a Plataforma NID, o ambiente para praticar o método com continuidade: minicursos, comunidade e encontros conduzidos pela NID. Ela abre para quem já é da base em datas definidas, e você vai saber por e-mail, com o valor, quando abrir. Por enquanto, não é oferta; é só para você saber que existe um degrau seguinte." O preço fica no texto escrito abaixo da aula, que pode ser editado. |
| Aula 8, Gatilho A | APROVADO | Mesma continuidade natural do capítulo 11 do playbook; coleta pelo ponto C7 do `04`. |

#### B3 · `guia-de-gravacao.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Operação (equipamento, enquadramento, ritmo, ordem de gravação, erros) | APROVADO | Três sessões (2h30, 2h30, 1h30) somam 6h30 de gravação bruta do Henrique. Lower third "Henrique Leite · Sócio da NID" conforme 10.5. |
| Tela da aula 4 | APROVADO, com a mesma dependência de B2 | "O NIDflow aberto no projeto de exemplo" exige B-02, B-04 e B-06 entregues. |

#### B4 · `pagina-de-vendas.md` do mini curso (lida por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Preço, CTA, garantia | APROVADO | R$ 147 em toda a página; nunca cita R$ 97; CTA "Quero as aulas por R$ 147" segue a regra 6 de 10.3 (o brief não fixa CTA para o avulso). |
| As oito aulas e o que está incluso | APROVADO | Títulos, minutos e "você sai com" idênticos à grade; oito itens inclusos batem com checkout e upsell. |
| Quem conduz | APROVADO | "Quem fala nas aulas é a NID. O método é da consultoria." Imagem do Henrique só em contexto de reunião ou gravação. |
| Para quem não é | APROVADO | Sem playbook, vai para a página do playbook (único link fora do checkout). |
| Mockup do hero | APROVADO | Frame real só depois da gravação; até lá, o roteiro em nove páginas. Nada inventado. |

#### B5 e B6 · `slides/aula-04.pdf` (10 páginas, 960 × 540) e `materiais/03-modelo-de-proposta.pdf` (13 páginas, A4)

Veredito: APROVADO nos dois (ver "Complemento visual dos PDFs" ao fim da seção 3). Fontes: só Liberation Sans nos dois. Travessões: zero. Links: zero (os slides não precisam; o modelo de proposta também não).

### 3.C NIDflow (`produtos/nidflow/`)

#### C1 · `01-plano-de-assinatura.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Plano, preço, garantia, cancelamento, renovação | APROVADO | Frase-padrão "R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia" é a que todas as peças usam. |
| Inclusos e "não incluso" (seção 2) | APROVADO | Distingue o que existe do que é backlog; proíbe prometer link público, colaboração, IA, aplicativo e integrações. A oferta em D+7 e a base do agente respeitam a lista. |
| Regime de cancelamento, leitura e exclusão (seções 5 a 7) | APROVADO | Coerente com as mensagens R6 a R9 e com o `03-oferta-nidflow-d7.md`. |
| Relação com a Plataforma NID (seção 8) | APROVADO | Transcreve a regra operacional do parecer (decisão 3). Depende da aprovação do Henrique. |
| Comparativo de taxas (seção 9.2) | APROVADO como pesquisa, com pendência | Usa Cakto a 8,5% + R$ 0,50; o `05-integracoes.md` usa 4,99% + R$ 2,49 (cartão) e Pix 0% + R$ 2,49. Os dois arquivos declaram a divergência. Não é incoerência de copy, é dado a confirmar na página oficial (pendência P-07). |
| Regras de comunicação (seção 13) | APROVADO | "Nunca teste grátis", "ferramenta" e não "software", sem plano anual avulso. |

#### C2 · `02-onboarding.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Entrada pelo CTA do playbook (seção 1.1) | APROVADO | Parâmetro `?template=<slug>`; é a mecânica que o PDF precisa carregar (A3). |
| Estrutura dos templates (seção 2) | APROVADO | Campos idênticos ao `02-templates-fluxo.md`. |
| Nota "02-templates-fluxo.md ainda não publicado" (cabeçalho e seção 2) | AJUSTAR (`nidflow`) | O arquivo existe. Trocar as duas ocorrências por: "textos copiados de `produtos/playbook/02-templates-fluxo.md` palavra por palavra". |
| Regra 1 da seção 2 contra o passo 2 da seção 3 | AJUSTAR (`nidflow`) | A regra 1 diz "O assinante não 'escolhe template': ele abre o projeto e preenche"; o passo 2 se chama "Escolha o template". Reescrever a regra 1: "Um projeto novo nasce com os cinco templates já dentro, na ordem do método. No passo 2 do onboarding o assinante escolhe apenas por qual template começa; os outros quatro já estão no projeto." E renomear o passo 2 para "Por onde começar". |
| Passo a passo em 14 minutos e marcos M1 a M5 | APROVADO | Coerente com "primeiro projeto em menos de 15 minutos" em todas as peças. |
| Perguntas do Gatilho A na tela de conclusão | APROVADO | Só para quem está `nao_respondeu` (regra 1 da seção 2 do `04`); o NIDflow recebe o perfil ao criar a conta. |
| Mensagens (seção 5) | APROVADO como rascunho funcional | Finalizadas em `mensagens-onboarding.md` (C6). |

#### C3 · `03-interno-vs-produto.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Tabela de 14 áreas com o que bloqueia a venda | APROVADO | Honesta: tudo "a auditar" porque o HTML não está no repositório. É a peça que sustenta a pendência P-02. |

#### C4 · `04-backlog-tecnico.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Arquitetura mínima (Supabase, HTML estático, função de webhook) | APROVADO | Compatível com o `05-integracoes.md` (F10, seção 9). |
| Backlog B-00 a B-13 com critérios de aceite | APROVADO | Os itens que bloqueiam a venda somam 16 a 22 dias de uma pessoa, cerca de 3 semanas com dois. Consequência para o funil: a oferta em D+7 só dispara com `nidflow_venda_liberada = sim` (regra do `03`), e a aula 4 só pode ser gravada com B-02, B-04 e B-06 prontos. |

#### C5 · `oferta/oferta-d7.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Página da oferta | APROVADO | Só afirma o que a seção 2 do plano permite; PDF em versão condicional; "menos de R$ 1,00 por dia" é verdadeiro (R$ 29,90 ÷ 30). Henrique não aparece. |
| N7, N7w, N10, N14, N14e | APROVADO | UTMs dentro da convenção do `05` (`utm_medium=sequencia`, `utm_campaign=F2-nidflow-d7`, `utm_content=d7|d10|d14`). Um CTA por toque. Sem urgência falsa. |
| Vídeo e imagens | APROVADO com dependência | Gravação de tela real, só depois de B-04 e B-06. |

#### C6 · `mensagens-onboarding.md` (lido por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| A1 a A4 e R1 a R9 | APROVADO | Remetente NID, um CTA, linhas de PDF condicionais, regime de leitura e exclusão idêntico ao plano. A3 tem pesquisa de um clique mais um CTA, o que a regra "um CTA" tolera como declarado. |
| Códigos | Ver colisão de códigos em D2/D4 e seção 4. | Os códigos R1 a R9 deste arquivo colidem com R1 a R3 da recuperação de checkout do `02-entrega-pos-compra.md`. |

### 3.D Automações (`automacoes/01` a `05`, lidos por inteiro)

#### D1 · `01-agente-direct-whatsapp.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Limites, persona, estados, transições, encaminhamento, verificações determinísticas, schema, integração com a API | APROVADO | Verificações determinísticas cobrem preços, léxico, promessa, Henrique, identidade, travessão, emoji, tamanho, links e CTA único. Prompt com blocos estáveis em cache e contexto na mensagem do usuário. |
| Base de conhecimento 6.3 (mini curso) | AJUSTAR (`automacao`) | "Grade: `[A CONFIRMAR COM O AGENTE ROTEIRO]`" está desatualizado; a grade existe. Trocar por: "Oito vídeo-aulas gravadas, cerca de 108 minutos, de 10 a 18 minutos cada, para assistir no ritmo do aluno, com slides de cada aula, roteiro de apresentação de projeto, checklist de reunião, modelo de proposta, banco de objeções e régua de follow-up pós-reunião." Remover a frase "não cita quantidade". Gera versão nova da base (`base-conhecimento-agente@1.1.0`). |
| Segmentos citáveis (1.2, 6.1 e bloco 1 do prompt) | AJUSTAR (`automacao`) | O agente cita sete segmentos ("telecomunicações e associações setoriais" a mais); playbook, páginas e checkout citam os cinco do brief (10.6). Uma lista só em todas as peças: usar os cinco do brief até o Henrique autorizar os dois adicionais (pendência P-12). Trocar nas três ocorrências. |
| Preço do mini curso em 1.2 ("R$ 97 na sessão de compra do playbook") | AJUSTAR (`automacao`) | A "sessão de compra" só existe se o Henrique aprovar o upsell. Trocar por: "R$ 97 no checkout do playbook (order bump) e, se aprovada, na página seguinte ao pagamento". A seção 6.3 já está assim. |
| Oferta do NIDflow antes da liberação (6.4: "Se um comprador pergunta antes de D+7, o agente entrega o link da oferta") | AJUSTAR (`automacao`) | Enquanto `nidflow_venda_liberada = nao` (regra do `03`), a página da oferta não pode vender. Acrescentar `nidflow_venda_liberada: sim | nao` ao bloco 3 do contexto e a regra na base 6.4: "Com `nidflow_venda_liberada = nao`, o agente diz que o NIDflow abre para compradores do playbook em breve, que a pessoa será avisada por e-mail, e não envia link." |
| Nome da primeira reunião do Funil 1 (6.6) | APROVADO com pendência | "Sessão de arquitetura" até o Henrique confirmar (P-05). |

#### D2 · `02-entrega-pos-compra.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| D0, ramos A e B, não compra, frequência, eventos | APROVADO | Ramo A oferece o mini curso a R$ 147 (6.3 do brief); ramo B é de uso, sem venda até D+7; máximo 1 mensagem automática por dia e canal; nada no domingo. |
| Códigos das mensagens | AJUSTAR (`automacao`, com o `copy` nas sequências) | Colisões: `P1` e `P2` aqui são lembretes de Pix; no `04` são as perguntas de qualificação. `R1` a `R3` aqui são recuperação de checkout; no NIDflow (`02-onboarding.md` e `mensagens-onboarding.md`) `R1` a `R9` são resgate do assinante. `B1` a `B4` aqui são e-mails do ramo B; no `04` são os critérios do Gatilho B; no backlog são `B-00` a `B-13`. `N1` e `N2` (pagamento recusado) convivem com `N7` a `N16` (NIDflow). `M1` a `M4` (agente) colidem com os marcos `M1` a `M5` do NIDflow. `A1` a `A7` (regras do Gatilho A) colidem com `A1` a `A4` (ativação do NIDflow). Convenção única a adotar (ver seção 4 deste documento): mensagens recebem prefixo do fluxo (`PB-` playbook, `MC-` mini curso, `NF-` NIDflow, `GA-`/`GB-` gatilhos, `AG-` agente, `RC-` recuperação de checkout, `PX-` Pix, `PR-` pagamento recusado); perguntas de qualificação viram `Q1` a `Q5`; regras de pontuação viram `RA-1` a `RA-7` e critérios `CB-1` a `CB-4`; marcos do NIDflow permanecem `M1` a `M5` (são telemetria, não mensagem). |
| Página de obrigado (rascunho funcional) | APROVADO | Coerente com A6. |

#### D3 · `03-oferta-nidflow-d7.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Entrada, saída, flag `nidflow_venda_liberada`, fila | APROVADO | A fila que segura quem chega a D+7 antes da liberação é a proteção certa. |
| Sequência N7 a N16 e regime de acesso por webhook | APROVADO | Idêntico ao plano e ao backlog. |
| Mapa de eventos Cakto e Kiwify | APROVADO com pendência | Nomes de evento "a confirmar" na conta de teste (P-07). |

#### D4 · `04-segmentacao-gatilhos.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Pontos de coleta C1 a C10, campos, pontuação do Gatilho A, tarefa de 24 horas, escalonamento | APROVADO | Traduz "qualquer um" do brief em regra de máquina sem inventar critério. Prioridade do A sobre o B conforme 8.2. |
| Limiares do Gatilho B (4 propostas e 2 fechadas em 30 dias; 80% do checklist) | APROVADO como proposta | Decisão do Henrique (P-09). |
| Assinatura dos convites CA1, CA1e, CA2, CB1 | APROVADO | "Henrique Leite, sócio da NID", única exceção do brief (10.5). Quem opera a conta em nome dele é decisão do Henrique (P-10). |
| Códigos | AJUSTAR | Ver D2 (P1 a P5, A1 a A7, B1 a B4). |

#### D5 · `05-integracoes.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Princípios, componentes, diagrama, validação da plataforma, orquestrador, modelo de dados, LGPD, ordem de implantação | APROVADO | Plataforma única, orquestrador da NID (vitrine do Funil 1), prefixo `F2` em tudo, dado mínimo, idempotência. |
| Mapa de etiquetas (seção 7) | AJUSTAR (`automacao`) | Faltam etiquetas usadas em outras peças: `F2-pagina-playbook-decisor` (página do playbook, seção 7) e `F2-interesse-plataforma` já está; acrescentar `F2-pagina-playbook-decisor` ("clicou no link de decisor da página do playbook; o agente abre em S7") ou instruir o `copy` a usar o código de origem `PG02` no texto pré-preenchido do WhatsApp em vez de etiqueta. Recomendo a segunda: origem, não etiqueta (a etiqueta `F2-gatilho-A` só nasce de resposta registrada). |
| Eventos canônicos (seção 8.1) | AJUSTAR (`automacao`) | Faltam `F2_pagina_obrigado_vista` (página de obrigado), `F2_upsell_visto` e `F2_upsell_recusado` (página de upsell, condicional). Acrescentar ao grupo "Compra". |
| Convenção de UTMs (8.3) | APROVADO | É a régua usada na seção 4 deste documento para conferir campanhas e sequências. |
| Custo por venda (4.3) contra `01-plano-de-assinatura.md` (9.2) | APROVADO com pendência | Mesma divergência de taxa declarada nos dois lados (P-07). |

### 3.E Sequências finais (`automacoes/sequencias/01` a `09`, lidas por inteiro)

#### E1 · `01-entrega-playbook.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| E0 (A, B, C), W0 (A, B, C), W0b, E1, W2, B1, W3, B2, B3, B4 | APROVADO | Promessas idênticas ao produto (onze capítulos, cinco templates, checklist, oito aulas de 108 minutos, seis materiais). Um CTA por mensagem. Pergunta 1 em E1 só para `nao_respondeu`. Variante C cobre o mini curso avulso, situação que o fluxo não tinha. |
| Frase "Nos próximos dias a gente te mostra a ferramenta" (E0-A e E0-B) | AJUSTAR (`copy`) | Promete prazo que depende de `nidflow_venda_liberada`. Trocar por: "Quando a ferramenta em que a NID desenha e apresenta os projetos dela estiver liberada para compradores, você recebe a apresentação por e-mail e WhatsApp, com os templates deste playbook já dentro. Até lá, o playbook é completo sem ela." Mesma regra para B3 ("Amanhã a gente te mostra a ferramenta"): manter só na versão com a flag ligada; sem a flag, a frase sai. |

#### E2 · `02-oferta-mini-curso.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| E3, W4, E5, E6 | APROVADO | R$ 147 sem desconto; nunca cita R$ 97; UTMs dentro da convenção (`F2-minicurso`, `sequencia`, `e3|w4|e5|e6`); sem urgência falsa. |
| E6 ("Amanhã a gente te mostra a ferramenta") | AJUSTAR (`copy`) | Mesma correção de E1: a frase existe só com `nidflow_venda_liberada = sim`. |

#### E3 · `03-oferta-nidflow.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Índice de N7 a N16, N16 e o mapa de A1 a R9 | APROVADO | Nenhum texto duplicado; N16 com um único link; NIDflow citado sem link porque já teve a sequência. |

#### E4 · `04-gatilho-a.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| CA1, CA1e, CA2, CA3 | APROVADO | Arco do método no convite; assinatura "Henrique Leite, sócio da NID" nos humanos e "Equipe NID" no automático; nenhum preço do Funil 1; "sem custo" no lugar de "gratuita". |
| Páginas de retorno 2.3 e tela do NIDflow 2.5 ("Nos próximos dias alguém da NID te escreve") | AJUSTAR (`copy`) | Mesma correção de A6: "Em até um dia útil, alguém da NID te escreve para propor uma sessão de arquitetura, sem custo." Nas duas ocorrências. |
| UTMs (`utm_medium=humano`, `utm_campaign=F2-gatilho-a`) | AJUSTAR (`automacao`, registro) | Valores fora da lista da seção 8.3 do `05-integracoes.md`. O `copy` declarou a decisão; o `automacao` registra `humano` em `utm_medium` e `F2-gatilho-a`, `F2-gatilho-b` em `utm_campaign` (correção única, consolidada em D5 e na seção 4). |

#### E5 · `05-gatilho-b.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| CB0, formulário de avaliação, três devolutivas, CB1, CB2, formulário do banco, CB3 | APROVADO | Nenhuma promessa de vaga; consentimento com finalidade, prazo, saída e exclusão; reconhecimento só com dado registrado; avaliador preenche campos sem texto genérico. |

#### E6 · `06-agente-direct-whatsapp.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Persona, M1 a M4, aberturas por origem, dúvidas, qualificação, encaminhamento, suporte, objeções, identidade | APROVADO | Coerente com o fluxo `01` e com as FAQs das páginas. Segmentos citados são os cinco do brief (é o `01` que precisa se alinhar, ver D1). Zero emoji por decisão registrada. |
| Abertura "pagina:PG01 com etiqueta `F2-pagina-playbook-decisor`" | AJUSTAR (`copy`, junto com o `automacao`) | Trocar a etiqueta por código de origem: a linha passa a ser "`pagina:PG02` (link "empresário ou diretor" da página do playbook)". Na página do playbook (seção 7, nota) e na página da Plataforma (seção 12, nota), o link do WhatsApp leva o texto pré-preenchido "Quero falar sobre a minha empresa · PG02" (playbook) e "· PG03" (Plataforma). O `automacao` registra `PG02` e `PG03` na tabela de códigos da seção 2 do `01`. Etiqueta só nasce de resposta registrada (regra de ouro do `04`). |

#### E7 · `07-reengajamento.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| R1 a R3, P1, P2, N1, N2 | APROVADO no texto | Pagamento recusado sem culpa; Pix com prazo real; máximo de 3 toques. Códigos: ver seção 4 (colisão declarada pelo próprio `copy`). |
| CC1 a CC4 | APROVADO | Ensina um pedaço do método com o texto do playbook; uma menção mensal ao NIDflow (CC2) e uma ao mini curso (CC4), com variante para quem já tem o produto e para lead. Variante lead resolve o brief 8.1 ("compradores e leads"). |
| UTMs de CC2 (`utm_campaign=F2-nidflow-cta` com `utm_medium=sequencia`) e `utm_content` `cc1` a `cc4`, `r1` a `r3`, `p1`, `p2`, `n1`, `n2` | AJUSTAR (`automacao`, registro) | Valores declarados pelo `copy` e ainda não registrados na seção 8.3. Registrar. |

#### E8 · `08-lancamento-plataforma.md` (19 mensagens do lançamento interno)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| LA1, LA2, LP1, LP2, LP3, LP3w, LD0i, LD0, LD0w, LD1, LD2, LD3, LD5, LD5w, LD6a, LD6b, LD6w, LF1, LT1 | APROVADO | Texto final fiel ao plano (`04-lancamento-interno.md`, seções 3 a 6) e à página: mesmos sete itens inclusos, 2 dias úteis, 24 + 12 + 4 encontros mais a Abertura de turma, R$ 358,80 e R$ 147 dentro dos R$ 980, bônus A-01 e condição de fundador só na primeira turma, "em até 12 vezes" sem valor de parcela. Vocabulário para o comprador ("matrícula", "turma", "abertura") no lugar de "janela". Escassez só com data real. UTMs `F2-plataforma-lancamento-AAAAMM` dentro da convenção. LA2 usa o caso conduzido do playbook como exemplo de revisão, sem inventar prova. Códigos ganham o prefixo `PN-` se a convenção da seção 4 for adotada (ver G4). |

#### E9 · `09-renovacao-plataforma.md` (renovação, cobrança recusada, cancelamento, leitura, reengajamento e pesquisas)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| RN60, RN60w, RN30, RN7, RN0, RR0, RR3, RR6, RC0, RC-7, RL1, RL15, RL28, RLT, RE1 a RE7, pesquisas 1 e 2 | APROVADO | Fiel ao `05-retencao-e-renovacao.md`: três avisos, cancelamento em um clique até D-1, sem desconto de retenção, reengajamento sem menção à renovação, duas mensagens humanas assinadas pela pessoa da moderação "da NID". Relatório de RN60 com regra "ainda não" e contagens em zero sem cobrança. Regime de leitura idêntico ao do NIDflow e ao Modo C da página. |
| Exportação em PDF do NIDflow citada sem condição (RR6, RC0, RL1, RL15, RL28) | AJUSTAR (`copy`) | Mesma regra das outras peças: as linhas sobre exportar em PDF entram só com `nidflow_pdf_disponivel = sim`; marcar `[com PDF]` e a alternativa `[sem PDF]` ("os projetos ficam guardados por 90 dias para você reativar"). |
| UTM `utm_campaign=F2-plataforma-reativacao` e `utm_content` `rl1`, `rl28`, `rlt1` a `rlt4` (decisão declarada no cabeçalho) | AJUSTAR (`automacao`, registro) | Valores novos a registrar na seção 8.3 do `05-integracoes.md` (consolidado na seção 4.3). Os códigos `RC0` e `RC-7` recebem o prefixo `PN-` (seção 4). |

### 3.F Campanhas (`campanhas/01` a `05`, lidos por inteiro)

#### F1 · `01-angulos.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Oito ângulos, ordem de teste, bloco fixo do anúncio, ângulos descartados | APROVADO | Cada ângulo nasce de uma frase literal do ICP (4.2) ou de um capítulo do playbook, com objeção neutralizada e criativo associado. Os descartados são exatamente os que o brief proíbe. |
| Regra 3 (segmentos) | AJUSTAR (`trafego`) | Lista sete segmentos; os criativos e as páginas usam cinco. Alinhar aos cinco do brief até a autorização do Henrique (pendência P-12). |
| A6, "Prova possível: SDRs da NID desenham a oportunidade antes de passar" | APROVADO com pendência | É afirmação sobre a prática da NID; só pode ir ao ar confirmada pelo Henrique (P-18). |

#### F2 · `02-criativos.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Regras de produção, correspondência anúncio → página (0.5), 14 criativos, variações A e B, checklist | APROVADO | A tabela 0.5 prende cada promessa do anúncio ao lugar da página em que é cumprida: é o que garante a cadeia anúncio → página. Botão "Saiba mais" é limitação da Meta, decisão registrada; o CTA oficial está no texto e na headline. Formato dos V-tela (dor nos 3 segundos, 15 a 30 s, narrado por quem opera) segue o parecer. |
| Dependência de gravação 0.4 ("enquanto B-04 não estiver no ar, gravar só o fluxo de arquitetura") | BLOQUEAR (`trafego`, com o `nidflow`) | Nenhuma gravação de tela do NIDflow antes de B-02 (remoção de dados internos e de clientes da NID) e B-06 (marca): o HTML atual, segundo a hipótese do `03-interno-vs-produto.md`, carrega projetos de clientes reais. Gravar a tela hoje expõe dado de cliente e mostra uma ferramenta sem a identidade NID. Reescrever 0.4: "Os V-tela (C01, C04, C05, C09, C12) e os Reels de tela dos Dias 11 e 19 só são gravados com B-02, B-04 e B-06 aceitos. Até lá, a rodada 1 sobe com C03, C07 (rosto), C02, C06, C08 (estáticos) e a variação B; C01 e C05 entram na rodada em que a tela estiver pronta." O plano de verba (3.4) muda de acordo. |
| C13, texto primário: "terceirização de SDR e closer" | AJUSTAR (`trafego`) | Todas as outras peças dizem "BDR, SDR e closer". Trocar por "terceirização de BDR, SDR e closer". |
| C03 ("toda reunião nossa termina de um jeito: com a próxima data marcada") e C11 ("A gente tem SDR e closer no time, e a conversa 'quero virar closer' acontece toda hora") | APROVADO com pendência | Afirmações sobre a prática da NID; entram no ar só confirmadas pelo Henrique (P-18). Se ele não confirmar "toda reunião", trocar por "toda reunião nossa é preparada para terminar com a próxima data marcada". |

#### F3 · `03-calendario-organico.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Regras, 20 dias, Stories, LinkedIn, entregas ao `automacao` | APROVADO | Todo post com CTA de palavra-chave (lista fechada do `01`), preço e garantia em toda legenda, UTMs dentro da convenção (`story`, `bio`, `post`; `F2-org-d<dia>`, `F2-st-s<semana>`, `F2-li-d<dia>`, `F2-bio`), reposte por comentário. Regra 4 permite orgânico antes do mini curso gravado, o que é correto (o bump fica desligado até a gravação). |
| Dias 11 e 19 (Reels de tela do NIDflow) | AJUSTAR (`trafego`) | Mesma regra de F2: só com B-02, B-04 e B-06. O Dia 19 já prevê o substituto (C02); aplicar o mesmo ao Dia 11 (substituto: carrossel das nove páginas do Dia 12 antecipado, ou o estático do Dia 10 com a legenda do caso). |
| Dia 19, fala "Quem compra recebe a apresentação da ferramenta nos dias seguintes" | AJUSTAR (`trafego`) | Só é verdade com `nidflow_venda_liberada = sim`. O post inteiro depende de B-04; quando for gravado, a ferramenta já estará liberada, então a frase fica. Registrar a condição na dependência do post. |

#### F4 · `04-plano-de-verba.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Pré-requisitos, separação do Funil 1, nomenclatura, leitura em valor de fatura, estrutura, verba por fase, regras de pausa e escala, eventos, UTMs, planilha, cronograma | APROVADO | Aplica a regra econômica em receita líquida com o custo variável de WhatsApp, os tetos de R$ 40 e R$ 32 e a verba de teste de R$ 9.000 que propus. Regra fixa "nenhuma mídia antes do mini curso gravado e do bump no ar" é a proteção certa (o playbook sozinho deixa R$ 21,73 líquidos). |
| Pré-requisito 5 ("oferta do NIDflow em D+7 funcionando", verificado só por E0 e W0) | AJUSTAR (`trafego`) | Tornar explícito: "Entrega pós-compra (E0, W0) funcionando **e** oferta do NIDflow em D+7 com `nidflow_venda_liberada = sim` (B-00 a B-09 do backlog aceitos). Como verificar: compra de teste recebe E0 e W0 em menos de 2 minutos e N7 em D+7." Motivo: no cenário base o front-end empata; sem a receita do NIDflow a mídia paga só gera base, e o D+7 é o que sustenta o teto de R$ 32. |
| Rodada 1 (C01, C03, C05, C07) | AJUSTAR (`trafego`) | Depende do BLOQUEAR de F2: se a tela não estiver pronta, a rodada 1 é C03, C07, C02, C06 (ou C08). Registrar as duas composições. |
| Verba, tetos e regra 9.1 | APROVADO com pendência | Precisa do Henrique (P-13). |

#### F5 · `05-metricas.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Painel completo (aquisição, checkout, esteira, orgânico e agente, gatilhos, cadência, exemplo por 1.000 compradores) | APROVADO | Todas as metas marcadas como hipótese; receita sempre líquida; uma fonte por métrica; nenhuma métrica de vaidade como meta. Acrescenta as métricas que pedi em 9.2 (receita líquida em 30 e 90 dias, custo por decisor e por contrato). |
| Cabeçalho de coluna "Fórmula" | AJUSTAR (`trafego`, baixo impacto) | "Fórmula" está no léxico proibido (10.4). É documento interno, não peça, mas a varredura automática de léxico do orquestrador e do deploy reprova o termo. Trocar o cabeçalho por "Cálculo" nas cinco tabelas. |

### 3.G Plataforma NID (`produtos/plataforma/01` a `05` e `pagina-de-vendas.md`, lidos por inteiro; `textos-do-ambiente.md` não existe)

#### G1 · `01-estrutura.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Lugar na esteira, sete áreas, navegação, acesso por produto, primeiro dia, plataforma tecnológica, custos, etiquetas e eventos | APROVADO | Aplica a leitura que propus para 6.5 (catálogo base incluso, avançados bloqueados, NIDflow incluso) e a abertura condicionada a 1.500 compradores. Cakto Members pelo critério 1 (plataforma única). Custo real é o tempo da NID (71 a 74 horas do Henrique por ano mais 150 de moderação), o que a base mínima existe para pagar. |
| Aulas do mini curso inclusas no ambiente (2.5 e 4) | APROVADO como proposta, precisa do Henrique | O brief (6.5) não inclui o mini curso na Plataforma. A inclusão fortalece a ancoragem (R$ 358,80 + R$ 147 dentro de R$ 980) e o efeito sobre a venda avulsa é desprezível (quem paga R$ 980 já passou pelos R$ 147). Recomendo aprovar; entra na redação de 6.5 (P-15). |
| Etiquetas e eventos novos (seção 8) | AJUSTAR (`automacao`) | Registrar no `05-integracoes.md` (seções 7 e 8.1) as sete etiquetas e os dezesseis eventos da Plataforma, mais `F2_plataforma_proposta_apresentada`, `F2_plataforma_proposta_aprovada` e `F2_plataforma_reativada` do `05-retencao-e-renovacao.md`. Sprint 6; não bloqueia nada antes. |

#### G2 · `02-catalogo.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Sete inclusos (32 aulas, cerca de 412 minutos), quatro avançados, padrões, ordem de produção | APROVADO | Nenhum minicurso repete capítulo do playbook nem aula do mini curso (tabela 1.3). Códigos I-01 a I-07 e A-01 a A-04 iguais nos cinco arquivos e na página. Regra "se depende do que se vende, é avançado" é o critério certo. |
| Padrão 3 (segmentos: cinco do brief mais dois do parecer) | AJUSTAR (`plataforma`) | Mesma lista única de todas as peças (P-12). |
| Preços dos avançados (R$ 197 e R$ 247) e convidados da NID | APROVADO como proposta, precisa do Henrique | Cria preços fora do brief (5.2 só autoriza os quatro produtos). Vai na redação de 6.5 (P-15). |

#### G3 · `03-comunidade-e-encontros.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Cinco espaços, moderação, participação da NID, quatro tipos de encontro com pauta, calendário, rituais, termos | APROVADO | "A comunidade é da NID"; Henrique conduz como sócio; nenhum encontro vende; nenhum ranking. O compromisso de resposta em 2 dias úteis é a promessa que sustenta a página e o que mais custa: decisão do Henrique (P-15). |
| Critério B4 do Gatilho B avaliado na Mesa | APROVADO | Coerente com o ponto C10 do `04-segmentacao-gatilhos.md`. |

#### G4 · `04-lancamento-interno.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Pré-requisitos, oferta, parcelamento, bônus real, condição de fundador, escassez verdadeira, linha do tempo, 19 mensagens (rascunho funcional), segmentos, metas como hipótese, quem não compra, reabertura | APROVADO | Escassez só com data real, bônus real e condição real; contagem regressiva só nos dois últimos dias com data real (10.2 proíbe a falsa, não a verdadeira). Leads sem compra fora da sequência (decisão fora do brief 8.1, registrada para o Henrique). Opção B trimestral com critério objetivo, como sugeri no parecer. |
| Parcelamento com custo pago pelo comprador (3.2) | APROVADO como recomendação, precisa do Henrique | É o que pedi no parecer (Sprint 6 define parcelamento e quem absorve). "Sem juros" proibido até o teste; valor da parcela nunca citado. Correto. |
| Códigos das mensagens (LA, LP, LD, LF, LT) e os de `05` (RN, RR, RC, RL, RE) | AJUSTAR (`plataforma`, ao gerar as sequências finais) | `RC0` e `RC-7` colidem com o prefixo de recuperação de checkout proposto na seção 4. Prefixar todas as mensagens da Plataforma com `PN-` (`PN-LA1`, `PN-RN60`, `PN-RC0`), o mesmo código que o plano de verba já reserva para a Plataforma (`F2-PN`). |
| Palavra-chave `F2-kw-mesa` (seção 5) | AJUSTAR (`automacao`, Sprint 6) | Palavra-chave nova precisa ser registrada na seção 3.1 do `01-agente-direct-whatsapp.md` antes de qualquer post usá-la (regra do próprio `01`). A palavra é `MESA`; o `utm_term` é `F2-kw-mesa`. |

#### G5 · `05-retencao-e-renovacao.md`

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Seis marcos, conteúdo novo, régua de renovação (D-60, D-30, D-7), recusa, cancelamento, leitura, reengajamento por sinal, métricas, pesquisa de renovação, mapa do ano | APROVADO | Renovação sem desconto de retenção e sem "preço travado"; reengajamento nunca menciona renovação; duas mensagens humanas com custo contado. Regime do NIDflow ao expirar igual ao plano do NIDflow. |

#### G6 · `pagina-de-vendas.md` da Plataforma (lida por inteiro)

| Item | Veredito | Fundamento e correção |
|---|---|---|
| Três modos (fechada, aberta, ex-assinante), hero, dor (cinco situações do catálogo), tese, ano, trilhas, Mesa, incluso, prática da NID, bônus e fundador, para quem é, valor, garantia, FAQ, CTA final | APROVADO | Toda promessa existe nos arquivos `01` a `05`: 24 Mesas, 12 Encontros, 4 Casos, Abertura de turma, 7 inclusos (3 publicados), 2 dias úteis, NIDflow R$ 358,80, mini curso R$ 147, avançados a partir de R$ 197. Nada escrito de um jeito que precise ficar verdadeiro para sempre (datas como variáveis, "publicado" atualizado a cada abertura). |
| Seção 8, item 6 ("com... a exportação em PDF") | AJUSTAR (`copy`) | A exportação em PDF é condicional a B-07 em todas as outras peças. Marcar: "[com PDF] o modo de apresentação e a exportação em PDF" / "[sem PDF] o modo de apresentação". Mesma marcação no Modo C, FAQ "Meus projetos do NIDflow ainda estão lá?" ("em modo leitura com exportação em PDF nos primeiros 30" só com B-07). |
| Seção 12, nota (origem `F2-pagina-plataforma-decisor`) | AJUSTAR (`copy`) | Trocar por código de origem `PG03` no texto pré-preenchido do WhatsApp (ver E6). |
| Referência a `produtos/plataforma/textos-do-ambiente.md` (texto do vídeo da oferta) | AJUSTAR (`copy`) | O arquivo não existe (a sequência `09`, também citada, existe e está aprovada em E9). Enquanto o texto do vídeo não existir, a página aponta para `04-lancamento-interno.md`, seção 4.3. O arquivo é entrega do Sprint 6 (P-16). |
| CTA "Quero praticar o método com a NID por R$ 980 por ano" | APROVADO como proposta, precisa do Henrique | Segue a regra 6 de 10.3. |

### Complemento visual dos PDFs (páginas renderizadas e inspecionadas)

| Arquivo | Páginas vistas | Veredito | O que foi conferido |
|---|---|---|---|
| `03-playbook.pdf` (42 páginas, A4) | 1, 2, 5, 16, 30, 42 | APROVADO | Capa em `#373737` com laranja `#F26522`, logo NID, quatro etapas em cards, frase "Quem desenha o projeto, conduz a venda" e "NID · Consultoria de Performance Comercial". Miolo em Liberation Sans, cabeçalhos, caixas de destaque em off-white e laranja, tabela do fluxo de arquitetura (página 30) legível sem corte, rodapé "Playbook NID · Desenhe para Vender" com número de página. Nenhum texto cortado nas páginas vistas. |
| `slides/aula-04.pdf` (10 slides, 960 × 540) | 1, 4, 8 | APROVADO | Kicker laranja, título em Arial 800, cinco blocos do caso com setas (slide 4), slide 8 "NIDflow: desenhar e apresentar na mesma tela" com a lista do que aparece na demonstração, rodapé "NID · Consultoria de Performance Comercial" e numeração. Identidade coerente com o playbook. |
| `materiais/03-modelo-de-proposta.pdf` (13 páginas, A4) | 1, 4, 8 | APROVADO | Página por página do roteiro de proposta (página 2 de 9: Dor; página 6 de 9: as respostas), com caixa "Regra", campos para preencher, "No caso conduzido" e "Teste da página", rodapé "Mini curso NID · Apresente para Fechar · Modelo de proposta · material da aula 4". Sem corte. |

---

## 4. Colisões de código, etiqueta e UTM, e a convenção proposta

### 4.1 Colisões encontradas

| Código | Onde significa uma coisa | Onde significa outra | Risco |
|---|---|---|---|
| `P1`, `P2` | Lembretes de Pix e boleto (`02-entrega`, seção 6.2; `07-reengajamento`) | Perguntas de qualificação P1 a P5 (`04-segmentacao`, `04-gatilho-a`, `06-agente`, obrigado, NIDflow) | Alto: os dois convivem na mesma base e na mesma conversa (o agente faz "P1" e o orquestrador dispara "P1") |
| `R1` a `R3` | Recuperação de checkout (`02-entrega`, `07-reengajamento`) | Resgate do assinante do NIDflow `R1` a `R9` (`02-onboarding`, `mensagens-onboarding`, `03-oferta-nidflow`) | Alto: mesma fila de envio, mesmo relatório `envios` |
| `N1`, `N2` | Pagamento recusado (`02-entrega`, `07-reengajamento`) | Convivem com `N7` a `N16` do NIDflow sem colisão direta, mas com o mesmo prefixo | Médio |
| `A1` a `A7` | Regras de pontuação do Gatilho A (`04-segmentacao`, 4.1) | Mensagens de ativação do NIDflow `A1` a `A4` (`02-onboarding`, `mensagens-onboarding`) e ângulos `A1` a `A8` (`01-angulos`) | Médio |
| `B1` a `B4` | E-mails do ramo B (`02-entrega`, `01-entrega-playbook`) | Critérios do Gatilho B (`04-segmentacao`, 5.1); backlog `B-00` a `B-13` do NIDflow | Médio (o `copy` já teve de esclarecer no cabeçalho de `02-oferta-mini-curso.md`) |
| `M1` a `M4` | Mensagens do agente no direct (`01-agente`, `06-agente`) | Marcos de ativação `M1` a `M5` do NIDflow e `M1` a `M6` da Plataforma | Médio |
| `RC0`, `RC-7` | Cancelamento de renovação da Plataforma (`05-retencao`) | Prefixo `RC-` proposto abaixo para recuperação de checkout | Evitável agora |
| `C01` a `C14` | Criativos (`02-criativos`) | `C1` a `C10` são pontos de coleta no `04-segmentacao` | Baixo (grafias diferentes) |

### 4.2 Convenção proposta (uma regra, aplicada por quem implementa)

Toda mensagem automática ou humana recebe um prefixo de fluxo de duas letras; perguntas, regras e critérios deixam de usar letra e número soltos. Marcos de telemetria (`M1` a `M6`) e itens de backlog (`B-00` a `B-13`) ficam como estão, porque não são mensagens.

| Fluxo | Prefixo | Exemplos (antes → depois) |
|---|---|---|
| Entrega e ativação do playbook | `PB-` | `E0-A` → `PB-E0-A`; `W2` → `PB-W2`; `B1` → `PB-B1` |
| Oferta do mini curso | `MC-` | `E3` → `MC-E3`; `W4` → `MC-W4` |
| Recuperação de checkout | `RC-` | `R1` → `RC-1`, `R2` → `RC-2`, `R3` → `RC-3` |
| Pix ou boleto pendente | `PX-` | `P1` → `PX-1`, `P2` → `PX-2` |
| Pagamento recusado | `PR-` | `N1` → `PR-1`, `N2` → `PR-2` |
| Oferta e vida do NIDflow | `NF-` | `N7` → `NF-N7`; `A1` → `NF-A1`; `R1` → `NF-R1` |
| Conteúdo contínuo | `CC-` | `CC1` → `CC-1` |
| Gatilho A e Gatilho B | `GA-`, `GB-` | `CA1` → `GA-1`; `CB0` → `GB-0` |
| Agente no direct e WhatsApp | `AG-` | `M1` → `AG-1` |
| Plataforma NID | `PN-` | `LA1` → `PN-LA1`; `RN60` → `PN-RN60`; `RC0` → `PN-RC0` |
| Perguntas de qualificação | `Q` | `P1` → `Q1` ... `P5` → `Q5` |
| Regras de pontuação do Gatilho A | `GA-R` | `A1` → `GA-R1` ... `A7` → `GA-R7` |
| Critérios do Gatilho B | `GB-C` | `B1` → `GB-C1` ... `B4` → `GB-C4` |

Quem aplica: o `automacao` publica a tabela na seção 8 do `05-integracoes.md` (fonte única) e renomeia nos fluxos `01` a `04`; o `copy` renomeia nas sequências `01` a `07` e nas páginas; o `nidflow` em `02-onboarding.md` e `mensagens-onboarding.md`; o `plataforma` em `04` e `05`. Custo: substituição de texto, sem mudança de conteúdo. Se o coordenador preferir não renomear antes da implementação, a regra mínima é: nenhum código novo repete um existente, e toda referência cruzada cita o arquivo (como o `copy` já faz).

### 4.3 Registros que faltam na convenção do `05-integracoes.md`

| Tipo | Valor | Origem |
|---|---|---|
| `utm_medium` | `humano` | CA1e, CA2, CB1, CB3 |
| `utm_campaign` | `F2-gatilho-a`, `F2-gatilho-b` | `04-gatilho-a.md`, `05-gatilho-b.md` |
| `utm_content` | `ca1e`, `ca2`, `ca3`, `cb0`, `cb1`, `cb2`, `cb3`, `cc1` a `cc4`, `r1` a `r3`, `p1`, `p2`, `n1`, `n2`, `e5`, `e6`, `w4` | Sequências `02`, `04`, `05`, `07` |
| `utm_campaign` com `utm_medium=sequencia` | `F2-nidflow-cta` (CC2) | `07-reengajamento.md`; registrar que conteúdo contínuo usa a campanha do produto do CTA |
| `utm_campaign` e `utm_content` | `F2-plataforma-reativacao`; `rl1`, `rl28`, `rlt1` a `rlt4` | `09-renovacao-plataforma.md` (Sprint 6) |
| Códigos de origem no WhatsApp | `PG02` (decisor na página do playbook), `PG03` (decisor na página da Plataforma) | Substituem as etiquetas `F2-pagina-playbook-decisor` e `F2-pagina-plataforma-decisor` |
| Palavra-chave | `MESA` (`utm_term=F2-kw-mesa`) | `04-lancamento-interno.md`, seção 5 (Sprint 6) |
| Etiquetas | Sete da Plataforma (`01-estrutura.md`, seção 8) | Sprint 6 |
| Eventos | `F2_pagina_obrigado_vista`, `F2_upsell_visto`, `F2_upsell_recusado`; dezenove da Plataforma | A6, A7, G1, G5 |
| Eventos só de navegador | `PageView`, `ViewContent`, `AddPaymentInfo`, `Contact` | `04-plano-de-verba.md`, seção 5.1 |

---

## 5. Correções a despachar, ordenadas por impacto

Impacto: **1** bloqueia a primeira venda ou a promessa ao comprador; **2** bloqueia a mídia paga ou a gravação; **3** coerência e registro; **4** baixo.

| # | Impacto | Agente dono | Correção (referência na seção 3) |
|---|---|---|---|
| 1 | 1 | `metodo` (com o `nidflow` para a URL) | Links clicáveis nos seis CTAs do NIDflow no PDF do playbook e nos cinco PDFs de templates, com `?template=<slug>` e UTMs `F2-nidflow-cta` (A3). Depende do domínio da oferta (P-04). |
| 2 | 1 | `metodo` | Capítulo 11: trocar "Você vai receber a apresentação do NIDflow nos próximos dias, por e-mail e WhatsApp, com a ferramenta em uso em um projeto real." por "Você vai receber a apresentação do NIDflow por e-mail e WhatsApp, com a ferramenta em uso em um projeto real, assim que ela estiver liberada para compradores do playbook." Regerar o PDF (A1). |
| 3 | 1 | `copy` | E0-A, E0-B, B3 e E6: frase sobre a ferramenta condicionada a `nidflow_venda_liberada` (E1, E2). |
| 4 | 1 | `automacao` | Página de espera sob a URL da oferta do NIDflow enquanto `nidflow_venda_liberada = nao` ("O NIDflow abre para compradores do playbook em breve. Você será avisado por e-mail.") e regra do agente para o mesmo caso: contexto `nidflow_venda_liberada` e resposta sem link (D1). |
| 5 | 1 | `copy` | Página de obrigado, bloco 4, e `04-gatilho-a.md` 2.3 e 2.5: "Em até um dia útil, alguém da NID te escreve..." (A6, E4). |
| 6 | 1 | `automacao` | Base do agente 6.3 com a grade real (8 aulas, 108 minutos, seis materiais); versão `base-conhecimento-agente@1.1.0` (D1). |
| 7 | 1 | `automacao` + `copy` | Códigos de origem `PG02` e `PG03` no lugar das etiquetas de decisor; texto pré-preenchido nas duas páginas; linha de abertura no `06` (D5, E6, G6). |
| 8 | 2 | `trafego` (com o `nidflow`) | BLOQUEAR: nenhuma gravação de tela do NIDflow antes de B-02, B-04 e B-06; reescrever 0.4 dos criativos, a rodada 1 do plano de verba e os Dias 11 e 19 do calendário (F2, F3, F4). |
| 9 | 2 | `trafego` | Pré-requisito 5 do plano de verba explícito: mídia só com `nidflow_venda_liberada = sim` e N7 testado (F4). |
| 10 | 2 | `roteiro` | Aula 8, bloco do slide 9: retirar "por novecentos e oitenta reais por ano" e "quem já comprou o playbook e o mini curso"; texto novo em B2. Preço fica no texto escrito abaixo da aula. |
| 11 | 2 | `trafego` | C13: "terceirização de BDR, SDR e closer" (F2). |
| 12 | 3 | `automacao` | Registrar na seção 8.3 do `05` os valores de UTM da seção 4.3 deste documento; registrar eventos e etiquetas que faltam (D5, E4, E7, G1). |
| 13 | 3 | `automacao` | Seção 1.2 do `01-agente`: "R$ 97 no checkout do playbook (order bump) e, se aprovada, na página seguinte ao pagamento" (D1). |
| 14 | 3 | `automacao`, `trafego`, `plataforma` | Uma lista de segmentos em todas as peças: os cinco do brief até o Henrique autorizar os sete (D1, F1, G2; P-12). |
| 15 | 3 | `copy` | Página do playbook, seção 5, item 1: "um capítulo de adaptações com uma seção para cada perfil de quem vende" (A4). |
| 16 | 3 | `copy` | Página da Plataforma e sequência `09`: exportação em PDF condicionada a B-07 (`[com PDF]` / `[sem PDF]`) em todas as ocorrências; a referência a `textos-do-ambiente.md` aponta para `04`, 4.3 até o arquivo existir (G6, E9). |
| 17 | 3 | `nidflow` | `02-onboarding.md`: cabeçalho e seção 2 sem "ainda não publicado"; regra 1 da seção 2 e nome do passo 2 ("Por onde começar") sem contradição (C2). |
| 18 | 3 | `automacao` (fonte) e todos os donos (aplicação) | Convenção de códigos da seção 4.2, ou, no mínimo, a regra "nenhum código novo repete um existente" (D2, D4, E7, G4). |
| 19 | 3 | `plataforma` e `copy` | Prefixo `PN-` nas mensagens da Plataforma (planos `04` e `05` e sequências `08` e `09`); palavra-chave `MESA` registrada no `01` antes de qualquer post (G4, E8, E9). |
| 20 | 4 | `trafego` | Painel de métricas: cabeçalho "Fórmula" → "Cálculo" (F5). |

Nenhuma correção altera preço, nome, promessa, arco ou regra inegociável.

---

## 6. Pendências e decisões (uma lista, sem duplicatas, por impacto)

Coluna "Bloqueia": **venda** = a primeira venda do playbook (orgânica, sem mídia); **mídia** = a mídia paga; **Plataforma** = só o lançamento da Plataforma; **não** = não bloqueia nada, entra quando existir.

| # | Pendência ou decisão | Quem resolve | Bloqueia |
|---|---|---|---|
| P-01 | Aprovação do brief v1.0 e das mudanças propostas no parecer e aplicadas pelo coordenador: 4.5 (redação do decisor), 5.2 e 6.2 (upsell de um clique, `[CONDICIONAL]`), 6.4 (CTA no playbook), 6.5 (catálogo base, avançados, NIDflow incluso, mini curso incluso, abertura com 1.500), 8.1 (pergunta no D0, tarefa de 24 h), 8.2 (nome da reunião), 9 (palavra-chave, agente da NID), 9.1 (receita líquida e tetos), 9.2 (métricas), decisões 1 a 6 da seção 12 | Henrique | Venda (o brief está "em aprovação"; as peças seguem a recomendação, mas nada é final sem o aceite) |
| P-02 | HTML do NIDflow no repositório e execução de B-00 a B-09 (16 a 22 dias de uma pessoa; quem desenvolve é decisão do Henrique) | Henrique entrega; desenvolvedor executa; `nidflow` audita | Mídia (pré-requisito 5), oferta D+7, aula 4 do mini curso, criativos de tela. Não bloqueia a venda orgânica se as correções 2, 3 e 4 forem aplicadas |
| P-03 | Plataforma de checkout: validação da Cakto em conta de teste (12 itens da seção 4.4 do `05`) e decisão 5 do brief; abertura da conta | `automacao` valida; Henrique decide e abre a conta | Venda |
| P-04 | Domínio ou subdomínio do Funil 2 e URLs finais (página do playbook, checkout, obrigado, oferta do NIDflow, NIDflow); verificação no Business Manager | Henrique (acesso ao domínio) e `automacao` | Venda (os links do PDF e das sequências dependem disso) |
| P-05 | Nome da primeira reunião do Funil 1 ("sessão de arquitetura" ou "reunião de diagnóstico") | Henrique | Não (todas as peças usam "sessão de arquitetura" até a confirmação; a troca é uma substituição) |
| P-06 | Gravação do mini curso (três sessões, 6h30) e publicação na área de membros; exige a tela da aula 4 (P-02) | Henrique grava; `roteiro` prepara | Mídia e order bump. A venda orgânica começa sem o bump (regra 4 do calendário) |
| P-07 | Taxa oficial da Cakto (duas hipóteses convivem), nomes exatos dos eventos de webhook, UTMs no webhook, id do pedido na página de obrigado, campo personalizado no checkout, sandbox | `automacao` (conta de teste) | Venda (é a mesma validação de P-03) |
| P-08 | Meta: verificação da empresa, app da NID com permissões de mensagens (2 a 6 semanas), número oficial no WhatsApp Cloud API, conta profissional do Instagram, conta de anúncios `F2`, pixel; ManyChat como ponte se a revisão atrasar | Henrique (acessos) e `automacao` | O CTA padrão do orgânico (comentário → direct) e o WhatsApp de entrega (W0). A venda por link da bio e e-mail funciona antes |
| P-09 | Limiares do Gatilho B (4 propostas e 2 fechadas em 30 dias; 80% do checklist), quem avalia projetos enviados | Henrique | Não |
| P-10 | Quem envia CA1 e CB1 em nome do Henrique (assinatura "Henrique Leite, sócio da NID") e quem é o responsável padrão da tarefa de 24 h | Henrique | Venda, por prudência: o primeiro decisor pode aparecer na primeira compra e o convite tem prazo de 24 h |
| P-11 | Emissor de nota fiscal (Notazz ou eNotas) e regime tributário (a hipótese de 10% de impostos entra em todos os cálculos) | Henrique com o contador | Venda |
| P-12 | Segmentos citáveis: manter os cinco do brief ou autorizar "telecomunicações e associações setoriais" (contratos públicos, conforme o parecer) | Henrique | Não |
| P-13 | Verba de teste de R$ 9.000 em 30 dias, tetos de CPA (R$ 40 teste, R$ 32 escala), teto mensal de R$ 30.000 na escala, regra 9.1 em receita líquida | Henrique | Mídia |
| P-14 | Whitelisting (anúncios a partir do perfil do Henrique, Cenário 2 dos criativos) | Henrique | Não |
| P-15 | Decisões da Plataforma: redação de 6.5; mini curso incluso; parcelamento (custo no comprador ou 12 × R$ 81,67 absorvido); condição de fundador; bônus A-01 na janela 1; Mesa aberta em D+2; CTA oficial; base mínima de 1.500 e 60% com mais de 30 dias; opções A ou B de janela; leads sem compra fora da sequência; cliente do Funil 1 fora do lançamento; preços dos avançados (R$ 197 e R$ 247); nomes do catálogo; convidados da NID; compromisso de resposta em 2 dias úteis; horário e dia dos encontros; quem modera; encerramento com reembolso proporcional; "Placar do método"; régua de renovação e reengajamento humano | Henrique | Plataforma |
| P-16 | Entregas da Plataforma que ainda não existem: `textos-do-ambiente.md` (texto do vídeo da oferta, do vídeo de boas-vindas e da vitrine na área de membros), roteiros de I-01, I-02, I-03 e A-01, gravação dos vídeos, validação da Cakto Members (8 itens), registro de etiquetas, eventos, UTMs e palavra-chave `MESA`. As sequências `08` e `09` já existem e estão aprovadas (E8, E9) | `copy`, `roteiro`, `automacao`, `plataforma`, Henrique (8,5 dias de gravação) | Plataforma |
| P-17 | Dados reais: `[DEPOIMENTO REAL]` (três por página), `[NÚMERO REAL]` de compradores, custo de tokens do agente (30 dias de registro), valor médio de contrato do Funil 1 (hipótese de R$ 20.000 no painel), `[CASO REAL A CONFIRMAR COM HENRIQUE]` se ele preferir um caso real ao caso conduzido nos criativos | Henrique e operação | Não (as seções ficam ocultas até existirem) |
| P-18 | Validação das afirmações sobre a prática da NID usadas em anúncio: "toda reunião nossa termina com a próxima data marcada" (C03), "a gente tem SDR e closer no time" (C11), "SDRs da NID desenham a oportunidade antes de passar" (ângulo A6), "eu não sou professor" (C13) | Henrique | Mídia (esses criativos) |
| P-19 | Termos de uso e política de privacidade do Funil 2 e do NIDflow (skill `nid-contratos`), termos da comunidade, e-mail de privacidade da NID (`{email_privacidade}`) | Coordenador redige; Henrique aprova e define o e-mail | Venda (o rodapé de toda página linka termos e privacidade) |
| P-20 | Infraestrutura operacional: domínio de e-mail no Resend (SPF, DKIM, DMARC), espaço `F2` no ClickUp, e-mail de suporte, hospedagem do orquestrador, número de WhatsApp de teste, contas de teste | `automacao` com acessos do Henrique | Venda |
| P-21 | Decisão sobre o formato do bump se o aceite ficar abaixo de 10% após 300 checkouts (plano B do parecer, cria produto) | Henrique, só com dado | Não |
| P-22 | Reavaliação do período gratuito do NIDflow se a conversão em D+7 ficar abaixo de 3% após 30 dias | Coordenador, só com dado | Não |

---

## 7. Lista mínima de ações do Henrique, na ordem

Só o que ninguém mais pode fazer. Tempo estimado do Henrique por ação.

| Ordem | Ação | O que libera | Tempo do Henrique |
|---|---|---|---|
| 1 | Ler o brief v1.0 com as dez mudanças propostas e as seis decisões da seção 12; aprovar ou ajustar (P-01). Decidir na mesma leitura: upsell de um clique, whitelisting, nome da sessão de arquitetura, segmentos citáveis (P-05, P-12, P-14) | Tudo o que está "em aprovação" vira final; o `copy` fecha o checkout com ou sem a página de um clique | 2 h |
| 2 | Entregar o arquivo HTML do NIDflow e decidir quem executa o backlog (P-02) | Auditoria B-00 no dia seguinte; 16 a 22 dias de desenvolvimento começam a contar | 30 min |
| 3 | Decidir a plataforma de checkout com o resultado da validação e abrir a conta; escolher o emissor de nota fiscal com o contador; informar o regime tributário; liberar o domínio ou subdomínio e o e-mail de suporte e de privacidade (P-03, P-04, P-11, P-19, P-20) | Checkout, entrega, nota fiscal, páginas e sequências podem ir para o ar | 2 h mais o contador |
| 4 | Dar os acessos da Meta: Business Manager, conta de anúncios `F2`, verificação da empresa, número de WhatsApp para a Cloud API, conta profissional do Instagram (P-08) | Pedido de revisão do app (2 a 6 semanas) começa; agente e WhatsApp de entrega | 1 h |
| 5 | Definir quem envia o convite do Gatilho A em nome dele, quem modera e avalia projetos, e os limiares do Gatilho B (P-09, P-10) | Tarefa de 24 h tem dono; banco de talentos tem régua | 30 min |
| 6 | Validar as afirmações sobre a prática da NID nos criativos e ângulos (P-18) | Criativos C03, C11, C13 e ângulo A6 liberados | 30 min |
| 7 | Aprovar os termos de uso e de privacidade (P-19) | Rodapé das páginas | 30 min |
| 8 | Gravar o mini curso: três sessões (2h30, 2h30, 1h30), com a aula 4 só depois de B-02, B-04 e B-06 (P-06) | Order bump ligado; pré-requisito 1 da mídia | 6h30 mais 1 h de preparação |
| 9 | Gravar a rodada 1 dos criativos (C03, C07, C11, C13 de rosto; narrações dos vídeos de tela quando a tela existir) e os Reels novos dos Dias 5 e 7 | Pré-requisito 8 da mídia; semanas 1 e 2 do orgânico | Uma manhã (4 h) |
| 10 | Aprovar a verba de teste de R$ 9.000, os tetos de CPA e a regra 9.1 (P-13) | Mídia paga liga (com os pré-requisitos 1 a 10 do plano cumpridos) | 15 min |
| 11 | Ler o relatório de 30 dias da mídia e decidir validação, mais teste ou pausa | Fase de validação | 1 h, em T+30 |
| 12 | Sprint 6, quando a base tiver 1.500 compradores: decidir os itens de P-15; gravar I-01, I-02, I-03, A-01 e os dois vídeos (8,5 dias); assumir os encontros (71 a 74 h por ano) | Primeira abertura da Plataforma NID | 8,5 dias de gravação mais 1 h de decisões, depois cerca de 6 h por mês |

Total até a primeira venda orgânica: ações 1 a 7, cerca de 7 horas do Henrique mais o tempo do contador e as esperas da Meta. Até a mídia paga: mais as ações 8 a 10, cerca de 12 horas, condicionadas ao NIDflow pronto.

---

## Relatório ao coordenador

- Arquivos criados ou alterados: `/home/user/Saas-Corretora/docs/02-revisao-de-coerencia.md` (criado). Nenhum outro arquivo foi alterado.
- Vereditos: 109 APROVADO / 36 AJUSTAR / 1 BLOQUEAR (146 itens em 47 peças; aulas 2, 3, 5, 6 e 7 do mini curso não lidas e sem veredito).
- Correções a despachar por agente (detalhe na seção 5):
  - `metodo` → links clicáveis nos CTAs do PDF do playbook e dos templates (com `?template=` e UTMs `F2-nidflow-cta`); capítulo 11 sem "nos próximos dias"; regerar o PDF.
  - `copy` → E0-A, E0-B, B3, E6 condicionados a `nidflow_venda_liberada`; "Em até um dia útil" na página de obrigado e em `04-gatilho-a.md` (2.3 e 2.5); código `PG02`/`PG03` no texto do WhatsApp das páginas e na abertura do `06`; página do playbook seção 5 item 1; página da Plataforma e sequência `09` (PDF condicional); referência a `textos-do-ambiente.md`; prefixo `PN-` nas sequências `08` e `09` e renomeação dos demais códigos se a convenção for adotada.
  - `automacao` → base do agente 6.3 com a grade real (versão 1.1.0); contexto e regra `nidflow_venda_liberada` no agente; página de espera da oferta do NIDflow; seção 1.2 do `01`; cinco segmentos; registrar UTMs (inclusive `F2-plataforma-reativacao`), códigos de origem `PG02`/`PG03`, eventos e etiquetas que faltam (seção 4.3); publicar a convenção de códigos; palavra-chave `MESA` (Sprint 6).
  - `trafego` → BLOQUEAR gravação de tela do NIDflow antes de B-02, B-04 e B-06 e reescrever 0.4, a rodada 1 e os Dias 11 e 19; pré-requisito 5 do plano de verba explícito; C13 com "BDR, SDR e closer"; regra 3 dos ângulos com cinco segmentos; "Cálculo" no painel.
  - `roteiro` → aula 8, bloco do slide 9, sem o preço e sem "playbook e mini curso" na fala gravada.
  - `nidflow` → `02-onboarding.md`: nota "ainda não publicado" e contradição entre a regra 1 da seção 2 e o passo 2.
  - `plataforma` → padrão 3 do catálogo com cinco segmentos; prefixo `PN-` nas mensagens; etiquetas e eventos entregues ao `automacao`.
- Mudanças que contrariam o brief e precisam do Henrique: as já listadas pelo coordenador (upsell de um clique em 5.2 e 6.2; regra 9.1; redação de 4.5 e 6.5; whitelisting; nome da sessão de arquitetura) mais as que surgiram nas peças: mini curso incluso na Plataforma (6.5); preços dos avançados R$ 197 e R$ 247 (5.2 só autoriza quatro preços); parcelamento da Plataforma com custo no comprador; janelas trimestrais (opção B) contra "1 a 2 vezes por ano"; leads sem compra fora da sequência de lançamento (8.1 fala em "compradores e leads"); segmentos citáveis além dos cinco (10.6); limiares do Gatilho B. Todas consolidadas em P-01 e P-15 da seção 6.
- Mudanças que posso aplicar sem o Henrique: nenhuma (não altero peças; as correções da seção 5 são dos agentes donos e nenhuma contraria o brief).
- Riscos: (1) a cadeia de promessas sobre o NIDflow depende de B-00 a B-09 e de um HTML que ainda não está no repositório; sem as correções 2, 3, 4 e 9, o comprador recebe uma promessa com prazo que a operação não cumpre; (2) gravar a tela do NIDflow antes de B-02 pode expor dados de clientes da NID em anúncio; (3) a aula 4 gravada com a ferramenta atual ficaria incoerente com o produto vendido e exigiria regravação; (4) as colisões de código viram erro de implementação se não forem resolvidas antes do orquestrador existir; (5) o preço da Plataforma gravado em vídeo (aula 8) trava uma decisão que o Sprint 6 ainda vai tomar; (6) duas hipóteses de taxa da Cakto sustentam contas diferentes de receita líquida e de teto de CPA; a conta de teste resolve, mas até lá os tetos do plano de verba são hipótese sobre hipótese.
