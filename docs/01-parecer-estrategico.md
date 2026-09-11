# Parecer estratégico do Funil 2 · NID

| Campo | Valor |
|---|---|
| Documento | `docs/01-parecer-estrategico.md` |
| Autor | Agente `estrategia` |
| Objeto | Brief-mestre versão 1.0 (`docs/00-brief-mestre.md`) e a estratégia do Funil 2 |
| Data | 11/09/2026 |
| Status | Entregue ao coordenador; mudanças que contrariam o brief dependem do Henrique |

---

## 0. Resumo executivo

1. **A estratégia está certa no essencial.** Posicionamento (método, não curso), tese ("quem desenha o projeto, conduz a venda"), esteira em quatro degraus, tráfego direto para a página do playbook sem lead magnet e lançamento interno para a base são o desenho que o mercado de baixo ticket usa hoje e que os dados sustentam. Nenhuma seção do brief recebe BLOQUEAR.
2. **O front-end não paga o tráfego com folga; empata no cenário base e perde no pessimista.** Com taxa de plataforma e impostos, cada comprador do playbook deixa entre R$ 28 e R$ 41 líquidos no checkout (contando o bump). O CPA que o Meta Ads entrega para um produto de R$ 29,90 no Brasil em 2026 (com o reajuste de 12,15% de impostos desde janeiro) cabe nessa faixa só com criativo e página muito bons. A regra "o front-end paga o tráfego" precisa ser medida em receita líquida, com teto de CPA explícito e verba de teste limitada.
3. **O lucro real do Funil 2 é o Gatilho A.** Por 1.000 compradores do playbook, o Funil 2 inteiro rende cerca de R$ 80 mil líquidos em 12 meses no cenário base; os decisores devolvidos ao Funil 1 rendem cerca de R$ 105 mil brutos em contratos no mesmo período (hipóteses explícitas na seção 3). Isso muda a prioridade de execução: a pergunta de qualificação do Gatilho A tem de acontecer no D0, na página de obrigado, e não só na sequência.
4. **O order bump de R$ 97 sobre um produto de R$ 29,90 está fora de todos os benchmarks.** As taxas de aceite de 15% a 40% que o mercado divulga valem para bumps que custam de 10% a 30% do produto principal. O nosso custa 324%. Mantenho o preço (a lógica de margem está certa), mas a expectativa cai para 8% a 15% e o brief precisa autorizar a segunda chance de um clique a R$ 97 na mesma sessão de compra.
5. **Plataforma de checkout: decidir por custo e por cobertura, uma só para os quatro produtos.** Cakto (Pix 0% + R$ 2,49; cartão 4,99% + R$ 2,49) e Eduzz (isenção do percentual em produtos até R$ 30) são as mais baratas para o playbook; Hotmart é a mais cara (9,9% + R$ 2,49 a partir de 21/09/2026). Todas as citadas têm bump, assinatura, área de membros e webhook. Recomendação: validar Cakto primeiro, Kiwify como reserva.
6. **Seis decisões da seção 12: cinco aprovadas na recomendação do coordenador, uma ajustada (checkout).** Detalhe na seção 5.

---

## 1. O que foi lido e o limite desta análise

Lidos por inteiro: `docs/00-brief-mestre.md` (v1.0), seção "Funil 2 da NID" do `CLAUDE.md` (inclusive a ordem de execução em ondas), `SKILL.md` de `nid-apresentacoes`, `nid-contratos` (com os quatro templates de `references/` e o modelo `.docx`), `nid-pages` e `mnt-skills-user-copywriting`, além dos READMEs de `docs/`, `produtos/*`, `automacoes/` e `campanhas/`.

Limites que o leitor precisa conhecer:

- **Os contratos da NID não trazem valores.** Os templates mostram a estrutura (setup de implantação + mensalidade, vigência mínima de 6 meses, reajuste anual por IGPM, volume de até 3.000 contatos únicos por mês, multa de 1 mensalidade; no tráfego, só mensalidade, vigência de 1 a 4 meses e até 10 criativos por mês; no modelo Caixa, 750 acionamentos por Caixa e vigência mínima de 4 meses). Os valores estão como `[VALOR]`. A faixa usada na conta do Gatilho A é **hipótese minha** e precisa ser trocada pelos números reais do Henrique.
- **O proxy de rede bloqueou a abertura direta das páginas oficiais** (Hotmart, Kiwify, Cakto, Hubla, Eduzz, blog do WhatsApp Business e os artigos de benchmark). Todos os números da seção 2 vêm dos resumos de busca dessas páginas, com URL e data quando a fonte informou. Antes de qualquer número entrar em peça ou em plano de verba, o agente responsável confirma na página oficial. Nenhum número desta seção é meta; todos são referência.
- **Segmentos citáveis pela NID** (para a prova permitida na seção 10.6 do brief): pelos contratos reais referenciados na skill, a NID já vendeu automação de atendimento e prospecção para educação (escola de idiomas), varejo e representação comercial, associação setorial com leads B2B, saúde (clínicas) e indústria; tráfego e performance para telecomunicações e clínica médica. Isso confirma que "educação, saúde, indústria, varejo, serviços" no brief está correto e acrescenta "telecomunicações" e "associações setoriais".

---

## 2. Pesquisa: o que está funcionando agora (Brasil, 2025 e 2026)

Classificação de confiança usada nas tabelas: **Comprovado** (fonte oficial ou amostra grande e declarada), **Indício** (dado de fornecedor ou de mercado sem amostra pública), **Moda** (prática difundida sem evidência), **Sem dado** (procurei e não achei fonte confiável).

### 2.1 Funil de entrada de baixo ticket (oferta que paga o tráfego)

| Achado | Fonte e data | Confiança |
|---|---|---|
| O modelo "produto de entrada que paga o anúncio, lucro nos degraus seguintes" (self-liquidating offer) é o desenho padrão do baixo ticket no Brasil; os preços de entrada mais usados ficam entre R$ 17 e R$ 47, com a faixa ampla de R$ 27 a R$ 197. | Voxuy, "Funil de vendas low ticket" (acesso 11/09/2026); Estúdio Site, "Low ticket que funciona: R$ 27 a R$ 97" (acesso 11/09/2026) | Indício (consenso de mercado, sem amostra) |
| Meta Ads segue como o canal mais eficiente para baixo ticket no Brasil em 2025. | Adminer, "Infoprodutos low ticket em 2025" (acesso 11/09/2026) | Indício |
| Conversão de página de vendas para baixo ticket: 2% a 5%; nichos muito segmentados chegam a 10%. | HeroSpark, "Taxa de vendas ideal para infoprodutos low ticket em 2025" (acesso 11/09/2026) | Indício |
| Recomenda-se testar variações de preço com pelo menos 300 cliques por variação antes de concluir. | Estúdio Site (acesso 11/09/2026) | Indício (regra prática) |
| "Preço terminado em 7 converte mais que terminado em 9." | E-Commerce Brasil, "O mito do número 7"; Nautilos e Paulo Canarim (2021), com teste de mais de um milhão de cliques sem diferença estatística; evidência acadêmica existe para o 9 (UC Berkeley, 2018: 3% a 5% de aumento) | **Moda.** Não há razão para trocar R$ 29,90 por R$ 27. |

Leitura: o desenho do brief (página própria, tráfego direto, sem etapa gratuita) está alinhado com a prática que funciona. O ponto sensível não é o desenho, é o CPA (2.4).

### 2.2 Order bump

| Achado | Fonte e data | Confiança |
|---|---|---|
| Produtores com order bump ativo têm conversão média no checkout 30% maior do que sem o recurso. | Hotmart, blog "Order bump" (acesso 11/09/2026) | Indício (dado da plataforma, sem amostra publicada) |
| Aceite médio de bumps bem configurados: 37,8% (Statista, quase dois mil negócios digitais); referência saudável no mercado brasileiro: 15% a 25%. | Ensinio, "Order bump e upsell em infoprodutos" (acesso 11/09/2026) | Indício |
| Aceite de 30% a 40% em mais de US$ 7 bilhões processados; faixa geral de 15% a 40%. | SamCart, "The complete guide to order bumps" (acesso 11/09/2026); CartFlows (2026) | Comprovado (amostra declarada) para bumps baratos |
| **Regra de preço do bump: 10% a 30% do produto principal; acima disso o aceite cai e pode derrubar a conversão do checkout.** | Hotmart (acesso 11/09/2026); UpsellWP, "Order bump vs upsell" (2026) | Comprovado (consenso entre plataformas) |
| Aceite de bump com preço superior ao produto principal. | Procurado | **Sem dado.** |

Leitura: o bump do brief (R$ 97 sobre R$ 29,90) está fora da faixa em que as taxas divulgadas foram medidas. A expectativa correta é de 8% a 15%, e isso entra na conta da seção 3.

### 2.3 Upsell de um clique (pós-pagamento)

| Achado | Fonte e data | Confiança |
|---|---|---|
| Upsell pós-compra converte de 3% a 8% (média em torno de 4%); pré-compra, 8% a 15%. | Focus Digital, "Average upsell conversion rate: 2025 report"; CartHook (acesso 11/09/2026) | Comprovado (faixa consistente entre fontes) |
| Um único upsell de um clique eleva o valor médio do pedido em até 68% (creators), convertendo 4% a 10% dos compradores. | SamCart, "8 upsell strategies" (acesso 11/09/2026) | Indício |

Leitura: o upsell de um clique é o lugar natural para uma oferta que custa mais que o produto principal. É o mecanismo que falta no brief.

### 2.4 CPA e custo do Meta Ads no Brasil

| Achado | Fonte e data | Confiança |
|---|---|---|
| Desde 01/01/2026 a Meta repassa PIS/COFINS (9,25%) e ISS (2,9%) ao anunciante: +12,15% no custo de mídia; R$ 1.000 investidos viram fatura de cerca de R$ 1.138. | Comunicado oficial da Meta (set/2025, PDF em reformatributaria.com); Diário do Comércio; TNP Advogados (acesso 11/09/2026) | **Comprovado** |
| CPC médio para infoprodutos no Meta Ads Brasil em 2026: R$ 3,20 a R$ 8,00 (produtos de entrada tendem ao piso). | Trafius, "CPC médio no Meta Ads em 2026 por segmento" (2026) | Indício (projeção do fornecedor) |
| CPA em e-commerce: R$ 30 a R$ 120 conforme ticket e maturidade do pixel. | Intent Marketing, "Quanto custa anunciar no Meta Ads" (2026) | Indício |
| CPA mediano global do Meta em 2026: US$ 38,19, +38% sobre 2025. | Ryze, "Benchmarks Meta Ads 2026" (2026) | Indício |
| Campanhas Advantage+ entregam CPA cerca de 32% menor que campanhas manuais. | Upsend Brasil (2026), citando a Meta | Indício |
| CPA específico de produto digital de R$ 29,90 vendido a tráfego frio no Brasil. | Procurado | **Sem dado confiável.** A conta derivada (CPC público dividido por conversão pública) dá de R$ 40 a R$ 160, o que é pior do que o front-end suporta. Operações de baixo ticket costumam trabalhar com CPC bem abaixo do CPC médio de infoproduto (criativo de resposta direta), por isso os cenários da seção 3 usam R$ 20, R$ 32 e R$ 55. São hipóteses até haver 30 dias de dados. |

### 2.5 Lançamento interno para base própria

| Achado | Fonte e data | Confiança |
|---|---|---|
| Lançamento interno (só para a base) é a mecânica de maior retorno relativo porque a base já reconhece a autoridade; recomendado a partir do sexto mês de base. | Agência Mestre, "Tipos de lançamento"; Entrega Digital, "Low ticket" (acesso 11/09/2026) | Indício |
| Produtores com 2.000 a 3.000 compradores de baixo ticket satisfeitos relatam lançamentos de produto de R$ 497 com conversão de 5% a 8% da lista. | Sellflux Academy, "Funil de vendas para low ticket" (acesso 11/09/2026) | Indício fraco (relato de fornecedor, sem amostra). Uso 1,5%, 3% e 5% nos cenários. |
| Conversão de lançamento interno para assinatura anual de R$ 980. | Procurado | **Sem dado.** |

### 2.6 Assinatura anual, comunidades e o modelo Finclass

| Achado | Fonte e data | Confiança |
|---|---|---|
| Finclass: R$ 958,80 por ano à vista ou 12 × R$ 79,90 sem juros (julho de 2026), só cartão, renovação automática, promoções recorrentes; inclui catálogo de aulas, lives semanais e comunidade moderada. | iDinheiro, "Finclass vale a pena?" (jul/2026); Rico, "O que está incluso na Finclass" (acesso 11/09/2026) | Comprovado (preço público) |
| 68% dos negócios digitais brasileiros perdem assinantes nos primeiros 90 dias por falta de engajamento e acompanhamento (dado atribuído ao Sebrae). | Flly IA, "Lembrete de renovação para comunidades pagas" (acesso 11/09/2026) | Indício (citação de segunda mão) |
| Pagamentos recorrentes no cartão no Brasil: R$ 141,9 bilhões em 2025 (+34% sobre 2024). | Abecs, via Brasil GEO (2026) | Comprovado |
| Principal motivo de cancelamento de assinatura: insatisfação com o produto (49% das menções). | Pesquisa Vindi 2025, via Brasil GEO (2026) | Indício |
| Taxa de renovação anual de comunidades pagas no Brasil. | Procurado | **Sem dado.** |

Leitura: R$ 980 por ano é o mesmo patamar da referência de mercado que o brief cita (Finclass, R$ 958,80). A diferença é que a Finclass vende o ano inteiro com parcelamento em 12 vezes; o brief prevê lançamento interno com janela real. As duas coisas podem coexistir (ver seção 6).

### 2.7 Retenção de assinatura de baixo ticket (referência para o NIDflow)

| Achado | Fonte e data | Confiança |
|---|---|---|
| SaaS B2C ou de ticket abaixo de R$ 150: churn mensal esperado de 5% a 12%; meta de churn abaixo de 10% ao mês em recorrência. | Fala Cliente, "Churn rate ideal: benchmarks 2026 por segmento"; Portal Customer (2026) | Indício |

Leitura: com churn de 5% a 12% ao mês, a vida média de um assinante do NIDflow fica entre 8 e 20 meses, e o LTV líquido entre R$ 180 e R$ 435. O NIDflow é receita recorrente relevante, mas não é o motor do funil.

### 2.8 Agentes de IA no direct do Instagram e no WhatsApp

| Achado | Fonte e data | Confiança |
|---|---|---|
| A Meta anunciou em 03/06/2026 o lançamento global do Meta Business Agent (WhatsApp, Instagram e Messenger), após piloto com mais de um milhão de empresas no Brasil, Índia e México; acesso inicial gratuito, com cobrança por token a partir de 01/08/2026 (cerca de US$ 2 por milhão de tokens). | Blog WhatsApp for Business, "Conversations 2026: introducing Meta Business Agent" (jun/2026); InfoMoney (2026); SocialHub, "Meta Business AI 2026" (acesso 11/09/2026) | Comprovado (lançamento); custo a confirmar |
| Fluxos "comentário → direct" convertem de 3 a 5 vezes mais do que link na bio para a mesma oferta (relatório ManyChat 2024, mais de um milhão de campanhas); DMs automatizadas chegam a 90% de abertura e 50% a 60% de resposta. | ChatAutoDM, "Instagram automation statistics 2026"; BossBot (2026); Unkoa (2025) | Indício (dados de fornecedor) |
| PMEs brasileiras usando IA no processo comercial: de menos de 15% em 2023 para perto de 40% em 2025. | IAGENTE, "Agente de IA para vendas no WhatsApp" (acesso 11/09/2026) | Indício |

Leitura: o agente no direct e no WhatsApp deixou de ser diferencial e virou padrão. Para a NID, isso é oportunidade dupla: o agente do Funil 2 é o produto vitrine do que a NID vende no Funil 1. Por isso ele deve ser construído pela própria NID (não pelo agente nativo da Meta), e o mecanismo "comente a palavra-chave" precisa entrar como CTA padrão do orgânico.

### 2.9 Criativos de resposta direta

| Achado | Fonte e data | Confiança |
|---|---|---|
| Criativo com cara de conteúdo (UGC estruturado para resposta direta) supera criativo de estúdio em CPA e CTR; vídeos de 15 a 30 segundos, com gancho e produto nos primeiros 3 segundos. | AdLibrary, "Meta Ads creative best practices: 2026 field guide"; Verde Media (2026); AdStellar, "Ad creative benchmarks 2026" | Indício (portfólios de agências) |
| Ganchos visuais de história vencem "cabeça falante" em 86% dos testes de portfólio. | AdStellar (2026) | Indício |
| Anúncios veiculados a partir do perfil de um criador (whitelisting) entregam CPA 2 a 3 vezes melhor que a página da marca. | AdLibrary (2026) | Indício |
| "80% do trabalho de performance em 2026 é operação de criativo." | AdLibrary (2026) | Opinião de mercado |

Leitura: para o Funil 2, o formato certo é a tela do NIDflow com um projeto sendo desenhado em tempo real, narrado por quem opera (Henrique como sócio da NID ou alguém do time), 15 a 30 segundos, dor nos 3 primeiros segundos. O whitelisting a partir do perfil do Henrique tem evidência de ganho, mas tensiona a regra 10.5 do brief (a imagem dele não é argumento de venda). Ver seção 6, item 9.

### 2.10 Plataformas brasileiras de checkout, área de membros e assinatura

Todas as taxas abaixo foram obtidas por resumo de busca das páginas oficiais ou de artigos de julho a setembro de 2026; nenhuma foi aberta diretamente (bloqueio de rede). O agente `automacao` confirma antes de decidir.

| Plataforma | Taxa por venda (2026) | Custo no playbook R$ 29,90 | Custo no pedido R$ 126,90 (playbook + bump) | Bump / upsell / assinatura / membros / webhook | Fonte |
|---|---|---|---|---|---|
| Hotmart | 9,9% + R$ 1,00; **R$ 2,49 a partir de 21/09/2026**; venda até R$ 10 paga 20% | R$ 5,45 (18,2%) | R$ 15,05 | Sim em tudo; Áreas de Membros gratuitas; assinatura semanal a anual | Central de Ajuda Hotmart; Tactus; Monetizei (2026) |
| Kiwify | 8,99% + R$ 2,49 | R$ 5,18 (17,3%) | R$ 13,90 | Sim em tudo; webhooks com eventos de assinatura renovada, atrasada e cancelada | Central de Ajuda Kiwify; docs.kiwify.com.br (2026) |
| Hubla | 8,9% + R$ 2,49 (+ R$ 0,99 se usar grupo de WhatsApp ou Telegram) | R$ 5,15 (17,2%) | R$ 13,78 | Sim; foco em comunidade e assinatura anual em até 12 parcelas; confirmar se renovação conta como venda | help.hub.la; EngagED (2026) |
| Eduzz | 4,9% + R$ 2,49 sem afiliado (8,9% com afiliado); **isenção do percentual para produto de valor original até R$ 30** | R$ 2,49 (8,3%) | R$ 7,24 a R$ 8,71 (depende de a isenção valer no pedido com bump; confirmar) | Sim; assinatura via Alumy; webhook | ajuda.eduzz.com; Tactus (2026) |
| Cakto | Pix 0% + R$ 2,49; cartão e boleto 4,99% + R$ 2,49 (+2 p.p. com autenticação adicional), julho de 2026 | R$ 2,49 (Pix) a R$ 3,98 (cartão) | R$ 8,82 (cartão) | Sim em tudo; Cakto Members gratuita, comunidade e lives; API com tipos de oferta main, upsell, downsell e order bump; recorrência com 3 tentativas de cobrança | ajuda.cakto.com.br; docs.cakto.com.br (2026) |
| Kirvano | 7,49% + R$ 2,00 (julho de 2026) | R$ 4,24 (14,2%) | R$ 11,50 | Checkout, membros e afiliados inclusos | EngagED (2026) |
| Ticto | Taxa por venda não confirmada; saque R$ 4,80 (acima de R$ 100) ou R$ 9,60; parcelamento 3,49% ao mês | Não confirmado | Não confirmado | Módulos Bolt (checkout), Mozart (membros), Flow (bump, upsell, downsell); webhook | help.ticto.com.br; Bit4Learn (2026) |

Leitura: a diferença entre a mais cara e a mais barata no playbook é de cerca de R$ 3,00 por venda (10 pontos percentuais do ticket). Em 1.000 vendas, R$ 3.000; é o equivalente a 90 a 100 compras de tráfego. Na esteira inteira o critério vale mais ainda, porque a Plataforma a R$ 980 paga R$ 90 a mais por venda na Hotmart do que na Cakto. Recomendação na seção 5, decisão 5.

### 2.11 O que é moda e não entra

- "Preço terminado em 7" (2.1).
- Contagem regressiva, "últimas vagas" e escassez fictícia: o brief já proíbe e a evidência de que funcionam em baixo ticket é anedótica; o custo de reputação para uma consultoria é real.
- Agente de IA "que vende sozinho" sem humano no Funil 1: o brief já manda encaminhar para humano quando o assunto é Funil 1. Correto: o valor do decisor (seção 3.4) não se arrisca em conversa automatizada.

---

## 3. Análise econômica do funil

Modelo por **1.000 compradores do playbook**, horizonte de 12 meses, sem renovação da Plataforma (ela só acontece no ano 2). Tudo o que está marcado como hipótese precisa ser trocado por dado real após 30 dias de operação.

### 3.1 Premissas

| Parâmetro | Pessimista | Base | Otimista | Origem |
|---|---|---|---|---|
| Taxa da plataforma de checkout | 8,99% + R$ 2,49 (referência Kiwify) | idem | idem | Seção 2.10; hipótese conservadora (Cakto e Eduzz custam menos) |
| Impostos sobre a receita bruta | 10% | 10% | 10% | **Hipótese** (regime tributário da NID não informado) |
| CPA F2 (custo por compra do playbook, já com os 12,15% de impostos da Meta) | R$ 55 | R$ 32 | R$ 20 | **Hipótese**; seção 2.4 |
| Aceite do bump (mini curso a R$ 97) | 8% | 15% | 25% | **Hipótese** abaixo dos benchmarks por causa do preço relativo; seção 2.2 |
| Upsell de um clique a R$ 97 para quem recusou o bump (proposta minha) | 3% | 5% | 8% | Seção 2.3 |
| Mini curso avulso a R$ 147 pela sequência D0 a D+6 | 2% | 3% | 4% | **Hipótese** |
| Conversão da oferta do NIDflow em D+7 (sobre compradores) | 3% | 6% | 10% | **Hipótese** |
| Churn mensal do NIDflow (vida média) | 12% (8,3 meses) | 8% (12,5 meses) | 5% (20 meses) | Seção 2.7 |
| Conversão do lançamento interno da Plataforma NID (sobre a base) | 1,5% | 3% | 5% | Seção 2.5; **hipótese** |
| Compradores que se declaram decisores (Gatilho A) | 4% | 7% | 10% | **Hipótese** (Perfil 4 do ICP puxa para cima) |
| Decisores que agendam a sessão de arquitetura | 25% | 30% | 40% | **Hipótese** |
| Sessões que viram contrato | 20% | 25% | 30% | **Hipótese**, a calibrar com a taxa real do Funil 1 |
| Valor do primeiro contrato (setup + 6 mensalidades, vigência mínima dos contratos de automação) | R$ 12.000 | R$ 20.000 | R$ 30.000 | **Hipótese**; os contratos mostram a estrutura, não os valores |
| Margem de contribuição do contrato do Funil 1 | 50% | 50% | 50% | **Hipótese** |

Receita líquida unitária resultante (após taxa e impostos): playbook R$ 21,73; pedido com bump R$ 100,31; mini curso avulso R$ 116,59; NIDflow R$ 21,73 por mês; Plataforma R$ 791,41. Na Eduzz com isenção, o playbook sozinho deixa R$ 24,42.

### 3.2 Resultado por 1.000 compradores do playbook

| Linha | Pessimista | Base | Otimista |
|---|---|---|---|
| Investimento em mídia | R$ 55.000 | R$ 32.000 | R$ 20.000 |
| Ticket médio bruto do checkout | R$ 37,66 | R$ 44,45 | R$ 54,15 |
| Receita líquida por comprador no checkout | R$ 28,02 | R$ 33,52 | R$ 41,38 |
| Front-end líquido (playbook + bump) | R$ 28.018 | R$ 33.519 | R$ 41.377 |
| **O front-end paga o tráfego?** | **Não** (saldo de R$ 26.982 negativo) | **Empata** (saldo de R$ 1.519) | **Sim** (saldo de R$ 21.377) |
| Com upsell de um clique a R$ 97 (proposta) | R$ 30.118 | R$ 36.753 | R$ 45.942 |
| Mini curso avulso pela sequência | R$ 2.081 (18 vendas) | R$ 2.825 (24) | R$ 3.218 (28) |
| NIDflow (assinantes × LTV líquido) | R$ 5.433 (30 × R$ 181) | R$ 16.299 (60 × R$ 272) | R$ 43.464 (100 × R$ 435) |
| Plataforma NID (1 lançamento) | R$ 11.871 (15 vendas) | R$ 23.742 (30) | R$ 39.570 (50) |
| **Total líquido do Funil 2 em 12 meses** | R$ 49.504 | R$ 79.618 | R$ 132.195 |
| **Resultado após a mídia** | **R$ 5.496 negativo** | **R$ 47.618** | **R$ 112.195** |
| Receita líquida por comprador em 12 meses | R$ 50 | R$ 80 | R$ 132 |
| CPA máximo para o front-end pagar a mídia | R$ 28,02 (R$ 30,12 com upsell) | R$ 33,52 (R$ 36,75) | R$ 41,38 (R$ 45,94) |

### 3.3 Leitura

1. **O front-end não é lucro; é o preço de construir a base.** No cenário base ele empata. A frase do brief ("o front-end paga o tráfego") só é verdadeira se o CPA ficar abaixo de R$ 33 já com os impostos da Meta. É uma meta de operação, não uma premissa. Precisa de teto de CPA, verba de teste e critério de parada (seção 3.5).
2. **Dentro do Funil 2, o lucro vem do NIDflow e da Plataforma, nessa ordem de previsibilidade e na ordem inversa de volume.** A Plataforma rende mais por lançamento, mas depende de base grande (30 vendas por 1.000 compradores). O NIDflow rende menos por comprador, mas todo mês.
3. **A Plataforma só faz sentido com base de pelo menos 1.500 a 2.000 compradores.** Abaixo disso, um lançamento inteiro rende R$ 20 mil a R$ 35 mil líquidos, o que não paga a produção de catálogo, comunidade e encontros. O Sprint 6 deve produzir a estrutura, mas a data de abertura precisa ser condicionada ao tamanho da base.
4. **O bump de R$ 97 é o que segura o front-end.** Cada ponto percentual de aceite vale R$ 785 líquidos por 1.000 compradores. Entre 8% e 25% de aceite, a diferença é de R$ 13.000. Nenhum outro parâmetro do checkout tem esse peso. Por isso o teste do bump (formato, texto, posição, preço) é a primeira otimização do funil, antes de escalar mídia.

### 3.4 A conta do Gatilho A

| Linha | Pessimista | Base | Otimista |
|---|---|---|---|
| Decisores etiquetados (por 1.000 compradores) | 40 | 70 | 100 |
| Sessões de arquitetura agendadas | 10 | 21 | 40 |
| Contratos fechados | 2 | 5 | 12 |
| Receita bruta do Funil 1 (setup + 6 mensalidades) | R$ 24.000 | R$ 105.000 | R$ 360.000 |
| Margem de contribuição (50%) | R$ 12.000 | R$ 52.500 | R$ 180.000 |
| Custo de mídia por decisor etiquetado | R$ 1.375 | R$ 457 | R$ 200 |
| Custo de mídia por contrato do Funil 1 | R$ 27.500 | R$ 6.095 | R$ 1.667 |

Três conclusões:

- **No cenário base, a margem do Gatilho A (R$ 52.500) é maior do que o resultado do Funil 2 inteiro após a mídia (R$ 47.618).** O Funil 2 é, na prática, uma máquina de encontrar decisores que pagou o próprio custo com um playbook. Isso é raro e é a maior vantagem estrutural deste projeto sobre qualquer infoprodutor: a NID tem um back-end de R$ 20 mil que ninguém que vende playbook tem.
- **O valor de um decisor devolvido ao Funil 1 é de R$ 750 a R$ 1.800 de margem esperada** (margem por contrato multiplicada pela probabilidade de sessão e fechamento). Um decisor que passa despercebido na base custa mais do que 30 compradores do playbook rendem em 12 meses.
- **Isso muda a ordem de prioridade da execução**: a pergunta de qualificação tem de ser feita no D0 (página de obrigado ou campo do checkout), o agente de IA tem de fazê-la em toda conversa, e a etiqueta `F2-gatilho-A` tem de gerar tarefa humana em até 24 horas. Hoje o brief coloca a pergunta "no pós-compra" sem dizer onde nem quando (seção 4, veredito da seção 8).

### 3.5 Regras de decisão para o tráfego (propostas para o `trafego` e para o plano de verba)

1. **Verba de teste: R$ 9.000 em 30 dias** (hipótese: 250 a 300 compras no cenário base). É o mínimo para ler o aceite do bump com 300 checkouts e o CPA por criativo com algum sentido estatístico.
2. **Teto de CPA na fase de teste: R$ 40** (acima da receita líquida do checkout, porque o objetivo do teste é aprender). **Teto de escala: R$ 32** (a receita líquida do checkout no cenário base, arredondada para baixo). Acima de R$ 32 por mais de 7 dias, pausa e troca criativo ou página; não aumenta verba.
3. **Aceite do bump abaixo de 10% após 300 checkouts**: aciona o teste de formato (seção 6, item 2).
4. **Meta de decisores etiquetados: 5% dos compradores.** Abaixo disso, o problema é a pergunta (onde e como é feita), não o público.

---

## 4. Veredito por seção do brief

| Seção | Veredito | Fundamentação e redação exata quando AJUSTAR |
|---|---|---|
| 0. Como usar | APROVADO | Regras de precedência claras. |
| 1. A NID e o lugar do Funil 2 | APROVADO | A separação Funil 1 / Funil 2 está correta e a frase "empresa de vendas" sustenta a autoridade sem título. Os segmentos citáveis podem incluir "telecomunicações" e "associações setoriais" (seção 1 deste parecer). |
| 2. Posicionamento | APROVADO | "Quem desenha o projeto, conduz a venda" é uma tese que o público consciente do problema reconhece. Categoria nova ("desenho de projetos comerciais") não tem busca, mas o funil não depende de busca; depende de anúncio que nomeia a dor. Coerente com 4.4. |
| 3. Promessa | APROVADO | Promessas mensuráveis pelo que o produto entrega, não por resultado financeiro. 3.3 protege a NID. |
| 4. ICP | AJUSTAR | **Contradição interna**: o Perfil 4 ("consultor, freelancer ou dono de serviço") é ICP, mas 4.5 diz que "empresário ou diretor" não é. O dono de serviço tem empresa e é decisor. Redação nova para o primeiro item de 4.5: "Empresário ou diretor que **já procura contratar** demanda, automação ou time de vendas para a própria empresa: é Funil 1 e recebe o convite para a sessão de arquitetura diretamente, sem passar pelo playbook. O consultor, freelancer ou dono de serviço do Perfil 4 continua sendo ICP do Funil 2: compra o playbook, aplica o método e, se declarar poder de contratação, é etiquetado pelo Gatilho A." Nível de consciência (4.4): APROVADO; a decisão de não trabalhar o público inconsciente é a certa para um front-end que precisa pagar tráfego. |
| 5. Esteira (nomes, preços, papel) | AJUSTAR | Playbook a R$ 29,90: APROVADO (dentro da faixa de entrada do mercado; cabe na isenção da Eduzz até R$ 30; nada sustenta trocar por R$ 27). NIDflow a R$ 29,90 por mês: APROVADO (âncora simples: "o mesmo que o playbook, todo mês"). Plataforma a R$ 980 por ano: APROVADO no valor (paridade com a referência de mercado), com a exigência de que o Sprint 6 defina o parcelamento (12 × R$ 81,67 ou equivalente) e quem absorve o custo do parcelamento. Mini curso R$ 147 avulso e R$ 97 no bump: APROVADO nos valores, AJUSTAR a regra 5.2 para: "Os únicos preços promocionais autorizados: o mini curso a R$ 97 **na sessão de compra do playbook** (order bump no checkout e, para quem não marcou o bump, oferta de um clique na página imediatamente seguinte ao pagamento, na mesma sessão) e a condição de lançamento da Plataforma NID definida no Sprint 6 e aprovada pelo Henrique. Fora da sessão de compra, o mini curso custa R$ 147." Motivo: um produto que custa 324% do principal converte pouco como bump (seção 2.2) e bem como upsell de um clique (seção 2.3); a segunda chance na mesma sessão vale de R$ 2.100 a R$ 4.600 líquidos por 1.000 compradores. |
| 6.1 Oferta do playbook | APROVADO | Arco completo, CTA no padrão, garantia certa. |
| 6.2 Order bump | AJUSTAR | Em "Valor", trocar "R$ 97 só nesta tela (R$ 147 fora do checkout)" por "R$ 97 só nesta compra (R$ 147 depois)". No texto do checkbox, manter. Motivo: coerência com o upsell de um clique na mesma sessão; "só nesta tela" viraria mentira na página seguinte. |
| 6.3 Mini curso avulso | APROVADO | Coerente com 5.2 ajustada. |
| 6.4 NIDflow | AJUSTAR | Acrescentar ao "Momento da oferta": "e CTA dentro do próprio playbook, ao fim de cada template de fluxo ('preencha este template no NIDflow'), porque o momento de maior desejo pela ferramenta é o momento em que o comprador está desenhando no papel." Sem prazo gratuito (decisão 4). O resto: APROVADO. |
| 6.5 Plataforma NID | AJUSTAR | **Ambiguidade**: "todos os minicursos inclusos" e "minicursos bloqueados vendidos dentro do ambiente" na mesma frase. Redação nova para "Arquitetura": "catálogo base de minicursos incluso na assinatura (definido no Sprint 6); minicursos avançados bloqueados, vendidos dentro do ambiente como produto avulso para assinantes; comunidade com regras e moderação; agenda de encontros conduzidos pela NID; biblioteca de templates; NIDflow incluso no plano anual (decisão 3)." Acrescentar à "Mecânica de venda": "A primeira abertura só acontece com base de pelo menos 1.500 compradores do Funil 2." Motivo: seção 3.3, item 3. Precisa do Henrique porque define o que fica dentro e o que fica fora do preço. |
| 7. Método (definição canônica) | APROVADO | A tabela com pergunta-guia, saída e erro comum é o melhor ativo do brief. Nada a mudar. |
| 8.1 Linha do tempo | AJUSTAR | D0: "Compra do playbook (com ou sem bump). **As duas perguntas de qualificação do Gatilho A são feitas na página de obrigado (ou em campo do checkout, se a plataforma permitir), antes da entrega.** Entrega imediata por e-mail e WhatsApp." Acrescentar linha: "D0 a D+1: toda etiqueta `F2-gatilho-A` gera tarefa humana com prazo de 24 horas para o convite pessoal." Motivo: seção 3.4. |
| 8.2 Gatilhos A e B | AJUSTAR | Gatilho A: acrescentar "O convite usa exatamente o nome que o Funil 1 usa hoje para a primeira reunião (a skill `nid-pages` chama de 'reunião de diagnóstico gratuita'; o brief chama de 'sessão de arquitetura gratuita'). Até o Henrique confirmar, 'sessão de arquitetura'." Gatilho B: APROVADO como está (critérios exigentes são corretos para um banco de talentos que não gera receita direta; custo de operação deve ficar perto de zero). Prioridade do A sobre o B: APROVADO. |
| 9. Mecânica ATA | AJUSTAR | Tabela: na linha "Conteúdo orgânico", acrescentar à regra: "CTA padrão do orgânico: comentário com palavra-chave que aciona o agente no direct, que entrega o link do checkout e faz as perguntas de qualificação." (seção 2.8). Linha "Agente de IA": acrescentar "Construído e operado pela NID, com a mesma arquitetura que a NID vende no Funil 1; é a vitrine do produto da consultoria." Tráfego pago direto para a página, sem lead magnet: APROVADO. |
| 9.1 Separação e regra econômica | AJUSTAR | Redação nova para a regra econômica: "**O front-end paga o tráfego**: custo por compra do playbook (CPA F2) menor ou igual à **receita líquida média por comprador no checkout** (ticket médio com bump, descontadas a taxa da plataforma e os impostos). Meta inicial, hipótese até 30 dias de dados: CPA F2 de até R$ 32 na escala e de até R$ 40 no teste. O lucro vem do NIDflow, da Plataforma NID e dos contratos do Funil 1 originados pelo Gatilho A." Motivo: comparar CPA com ticket bruto esconde 17% a 28% de custo. |
| 9.2 Métricas | AJUSTAR | Acrescentar: "Receita líquida por comprador em 30 e 90 dias (playbook, bump, upsell, mini curso avulso e NIDflow)." e "Custo por decisor etiquetado (Gatilho A) e custo por contrato do Funil 1 originado no Funil 2." |
| 10.1 Identidade visual | APROVADO | A regra "Arial em documentos, tipografia da `nid-pages` na web" resolve o conflito entre as duas skills. |
| 10.2 Voz | APROVADO | "Parceiro de operação, não professor" é a postura certa para o ICP que desconfia de guru. |
| 10.3 Regras de escrita | APROVADO | A regra 6 (CTA descreve o que acontece depois) é a mesma da skill de copywriting. |
| 10.4 Léxico | APROVADO | Acrescento uma observação, não uma regra: "low ticket", "front-end", "bump" e "upsell" são termos internos; não devem aparecer em peça voltada ao comprador. O léxico já cobre isso por espírito; o `copy` fica avisado. |
| 10.5 Como o Henrique aparece | APROVADO | Ver tensão com whitelisting na seção 6, item 9; não muda a regra, leva ao Henrique. |
| 10.6 Prova permitida | APROVADO | Segmentos confirmados pelos contratos (seção 1). |
| 11. Produção e handoff | APROVADO | |
| 12. Decisões pendentes | Ver seção 5 | |
| 13. Versões | APROVADO | |

Contagem: 15 APROVADO, 10 AJUSTAR, 0 BLOQUEAR (seção 12 contada à parte).

---

## 5. Decisões pendentes da seção 12: veredito

| # | Decisão | Veredito | Fundamentação |
|---|---|---|---|
| 1 | Nomes "Playbook NID · Desenhe para Vender" e "Mini curso NID · Apresente para Fechar" | APROVADO (recomendação do coordenador) | Os dois nomes dizem o que cada degrau entrega e, lidos em sequência, contam a esteira ("desenhe, apresente"). A alternativa ("de Desenho de Projetos") é descritiva e sem verbo. |
| 2 | Mini curso a R$ 97 no bump, R$ 147 avulso | APROVADO com a redação ajustada de 5.2 | A lógica de margem está certa. O que falta é a segunda chance de um clique na mesma sessão (seção 4, linha 5). Expectativa de aceite: 8% a 15%, não 20% a 40%. Se após 300 checkouts o aceite ficar abaixo de 10%, testar o formato da seção 6, item 2. |
| 3 | NIDflow dentro da Plataforma NID | APROVADO (incluir) | R$ 358,80 por ano de valor percebido dentro de R$ 980 com custo marginal zero para a NID. Regra operacional que precisa entrar: "Assinante ativo do NIDflow que entra na Plataforma tem a assinatura mensal encerrada no ciclo seguinte, sem cobrança dupla; ao fim do ano da Plataforma sem renovação, volta a ser oferecido o NIDflow mensal." |
| 4 | Primeiro acesso ao NIDflow sem período gratuito | APROVADO (sem período gratuito) | O comprador já pagou uma ou duas vezes; a garantia de 7 dias com cancelamento livre é o teste sem risco. Período gratuito sem cartão cria base de não pagantes e suporte sem receita. Não encontrei dado de conversão de teste gratuito para SaaS de R$ 29,90 no Brasil; a decisão é por lógica, não por benchmark. Registro para reavaliar se a conversão em D+7 ficar abaixo de 3%. |
| 5 | Plataforma de checkout e área de membros | AJUSTAR os critérios e recomendar | Critérios novos: (a) **uma única plataforma para os quatro produtos** (base única, webhooks únicos, uma conciliação); (b) order bump **e upsell de um clique** nativos; (c) assinatura mensal (NIDflow) e anual com parcelamento (Plataforma); (d) webhook com eventos de compra aprovada, reembolso, assinatura renovada, atrasada e cancelada; (e) área de membros para o mini curso e para a Plataforma; (f) nota fiscal; (g) **custo por venda simulado nos pedidos de R$ 29,90 e R$ 126,90 e na assinatura de R$ 980**. Recomendação com os dados da seção 2.10: **validar a Cakto primeiro** (menor custo, cobre a, b, c, d, e); **Kiwify como reserva** (custo médio, webhooks de assinatura documentados, maturidade); Eduzz só se a isenção até R$ 30 valer também no pedido com bump; Hotmart só se o Henrique já a usa e prefere não migrar (é a mais cara). Independe da plataforma: o NIDflow em HTML único precisa de controle de acesso próprio ligado ao webhook de assinatura (a área de membros hospeda o arquivo, mas não impede cópia nem cancela acesso ao expirar). |
| 6 | Leitura da sigla ATA (Atrair, Tráfego, Atender) | APROVADO (leitura operacional) até o Henrique informar a original | Não há como validar externamente; a leitura adotada cobre as três frentes e não muda a execução. |

---

## 6. O que eu faria diferente (ordem de impacto)

| # | O que muda | Por quê | Ganho | Perda | Esforço | Recomendação em uma linha |
|---|---|---|---|---|---|---|
| 1 | Pergunta do Gatilho A no D0 (página de obrigado ou campo do checkout) e tarefa humana em 24 h para cada decisor | Seção 3.4: um decisor vale R$ 750 a R$ 1.800 de margem esperada; hoje a pergunta está "no pós-compra" sem lugar definido | Captura os decisores enquanto a atenção está no pico; custo por contrato do Funil 1 de R$ 6 mil no cenário base | Duas perguntas a mais antes da entrega (fricção mínima; entrega continua imediata) | Baixo (`automacao` + `copy`) | Aplicar agora; não contraria o brief, detalha 8.1. |
| 2 | Upsell de um clique do mini curso a R$ 97 na página seguinte ao pagamento, para quem recusou o bump | Seções 2.2 e 2.3: bump caro converte pouco; upsell pós-pagamento é o formato para ticket maior | R$ 2.100 a R$ 4.600 líquidos por 1.000 compradores | Uma página a mais na sessão; exige plataforma com upsell nativo | Baixo (`copy` + `automacao`) | Levar ao Henrique (altera 5.2 e 6.2); recomendo aprovar. |
| 3 | Regra econômica em receita líquida, com teto de CPA de teste (R$ 40) e de escala (R$ 32), verba de teste de R$ 9.000 em 30 dias e critério de parada | Seção 3.3: o front-end empata no cenário base; sem teto, a mídia consome o lucro do back-end | Decisão de escala baseada em número, não em impressão | Nenhuma | Baixo (`trafego`) | Levar ao Henrique (altera 9.1); recomendo aprovar. |
| 4 | CTA do NIDflow dentro do playbook, ao fim de cada template, além da oferta formal em D+7 | O desejo pela ferramenta nasce quando o comprador tenta desenhar no papel | Aumenta a conversão em D+7 porque a oferta chega a quem já viu a ferramenta citada cinco vezes | Nenhuma | Baixo (`metodo` + `nidflow`) | Aplicar agora; não contraria o brief. |
| 5 | Abertura da Plataforma NID condicionada a base de pelo menos 1.500 compradores; Sprint 6 produz, mas a data de lançamento vem do tamanho da base | Seção 3.3, item 3: um lançamento sobre base pequena não paga a produção | Evita lançar para 300 pessoas e queimar a oferta | Adia a receita da Plataforma | Nenhum (regra de planejamento) | Aplicar agora como regra do coordenador; registrar em 6.5 quando o Henrique aprovar. |
| 6 | "Comente a palavra-chave" como CTA padrão do orgânico, com o agente respondendo no direct | Seção 2.8: fluxo comentário → direct converte 3 a 5 vezes mais que link na bio (dado de fornecedor) | Mais compras por post e mais conversas qualificadas para o Gatilho A | Dependência de ferramenta de automação do direct (ou do agente próprio via API) | Médio (`automacao` + `trafego`) | Aplicar agora; está dentro de "Atender". |
| 7 | Uma única plataforma para os quatro produtos, escolhida por custo e cobertura (Cakto primeiro, Kiwify reserva) | Seção 2.10: R$ 3.000 de diferença por 1.000 playbooks e R$ 90 por venda da Plataforma; base única | Menos custo e uma só base de compradores | Dependência de um fornecedor | Médio (`automacao` valida em 1 semana) | Aplicar via decisão 5, sem esperar o Sprint 3. |
| 8 | Teste de formato do bump se o aceite ficar abaixo de 10% após 300 checkouts: bump barato de 10% a 30% do ticket (por exemplo, um pacote de exemplos de projetos desenhados por segmento a R$ 19,90) e mini curso só como upsell de um clique | Seção 2.2: é a faixa em que os benchmarks de 20% a 40% foram medidos | Aceite previsível; ticket médio semelhante ou maior no cenário pessimista do bump atual | Cria um produto a mais para o `metodo` produzir; ticket médio menor se o bump de R$ 97 estiver acima de 12% | Médio | Não aplicar agora; deixar como plano B com gatilho numérico. Precisa do Henrique porque cria produto. |
| 9 | Criativos no formato "tela do NIDflow desenhando um projeto real, narrado por quem opera", 15 a 30 s, dor nos 3 primeiros segundos; veiculação também a partir do perfil do Henrique (whitelisting) | Seção 2.9: formato de conteúdo supera estúdio; whitelisting entrega CPA 2 a 3 vezes melhor (indício) | CPA menor é o parâmetro mais sensível do funil | Tensão com 10.5: anunciar a partir do perfil do Henrique aproxima a imagem dele do argumento de venda | Baixo para o formato; a decisão do whitelisting é do Henrique | Formato: aplicar agora. Whitelisting: levar ao Henrique com a regra "o perfil veicula, mas o texto e a tela mostram o método e a NID, nunca 'aprenda comigo'". |
| 10 | Plano anual do NIDflow (por exemplo, R$ 299 por ano) depois de 90 dias de dados de churn | Seção 2.7: churn de 5% a 12% ao mês; anual reduz churn e antecipa caixa | LTV maior e caixa | Cria um desconto, hoje proibido por 5.2; complica a decisão 3 | Baixo | Não aplicar agora; reavaliar com dados reais de churn. |
| 11 | Janela de matrícula da Plataforma trimestral em vez de 1 a 2 vezes por ano, com data real de abertura e fechamento | Seção 2.6: a referência de mercado vende o ano inteiro; o brief escolheu janelas; quatro janelas curtas conciliam sem escassez fictícia | Receita distribuída, menos dependência de um evento | Mais operação de lançamento | Médio | Não aplicar agora; decidir no Sprint 6 com o tamanho da base. |

---

## 7. Riscos

1. **CPA acima do que o front-end suporta.** É o risco número um e é normal em baixo ticket no Brasil em 2026 (+12,15% de imposto na mídia). Mitigação: teto de CPA, verba de teste limitada, criativos no formato da seção 2.9, e a leitura correta de que o Gatilho A paga a conta mesmo com front-end negativo no cenário pessimista (R$ 12.000 de margem contra R$ 5.496 de prejuízo do Funil 2).
2. **Bump de R$ 97 abaixo de 10% de aceite.** Mitigação: upsell de um clique na mesma sessão e plano B com gatilho numérico (seção 6, itens 2 e 8).
3. **Decisor perdido na base.** Se a pergunta de qualificação ficar só na sequência de e-mail, a taxa de resposta cai e a NID perde o ativo mais valioso do funil. Mitigação: item 1 da seção 6.
4. **Controle de acesso do NIDflow.** Ferramenta em HTML único vendida por assinatura precisa verificar a assinatura ativa (webhook da plataforma → licença); sem isso, o cancelamento não encerra o acesso e a assinatura vira compra única. Dono: `nidflow`, com `automacao`.
5. **Dependência da gravação do Henrique.** O bump e o degrau 2 não existem sem as aulas. Enquanto não houver gravação, o funil roda só com playbook (front-end líquido de R$ 21,73 por venda, o que não paga tráfego em nenhum cenário). Mitigação: não iniciar mídia paga antes do mini curso gravado; até lá, só orgânico.
6. **Dados desta análise vindos de resumos de busca.** As taxas de plataforma e os benchmarks precisam de confirmação nas páginas oficiais antes de virar plano de verba ou peça (bloqueio de rede impediu a leitura direta).
7. **Plataforma NID lançada cedo demais.** Base pequena, oferta queimada, comunidade vazia. Mitigação: item 5 da seção 6.
8. **Concorrência gratuita no degrau 2.** Existem cursos gratuitos de vendas B2B com certificado (Winning Sales, Unova, FGV com trilhas pagas). O mini curso não compete como "curso de vendas"; compete como "como a NID apresenta o projeto desenhado". O `copy` e o `roteiro` precisam manter esse enquadramento em toda linha.

---

## Relatório ao coordenador

- Arquivos criados ou alterados: `docs/01-parecer-estrategico.md` (criado). Nenhum outro arquivo alterado.
- Vereditos: seções do brief: 15 APROVADO / 10 AJUSTAR / 0 BLOQUEAR. Decisões da seção 12: 5 APROVADO / 1 AJUSTAR (decisão 5, critérios e recomendação de plataforma) / 0 BLOQUEAR.
- Correções a despachar por agente:
  - `automacao` → perguntas do Gatilho A no D0 (página de obrigado ou campo do checkout) com tarefa humana em 24 h; CTA "comente a palavra-chave" ligado ao agente no direct; validação da Cakto (e Kiwify como reserva) contra os sete critérios da decisão 5, com confirmação das taxas nas páginas oficiais; regra operacional de não cobrança dupla NIDflow / Plataforma; controle de acesso do NIDflow por webhook.
  - `copy` → texto do bump com "só nesta compra"; página de upsell de um clique a R$ 97 (após aprovação do Henrique); página de obrigado com as duas perguntas de qualificação; nenhum termo interno (low ticket, bump, upsell, front-end) em peça voltada ao comprador.
  - `metodo` → CTA do NIDflow ao fim de cada template de fluxo do playbook.
  - `nidflow` → mecanismo de verificação de assinatura ativa no HTML único; oferta em D+7 consistente com "sem período gratuito" e garantia de 7 dias.
  - `trafego` → plano de verba com teste de R$ 9.000 em 30 dias, teto de CPA de R$ 40 no teste e R$ 32 na escala, critério de parada de 7 dias; métricas novas (receita líquida por comprador em 30 e 90 dias; custo por decisor e por contrato); criativos no formato tela + narração de quem opera, 15 a 30 s; não iniciar mídia paga antes do mini curso gravado.
  - `plataforma` → arquitetura com "catálogo base incluso, avançados bloqueados e vendidos dentro"; parcelamento definido; abertura condicionada a base de 1.500 compradores; decidir no Sprint 6 entre 1 a 2 lançamentos por ano e janelas trimestrais.
  - `roteiro` → manter o enquadramento "como a NID apresenta o projeto desenhado", nunca "curso de vendas".
- Mudanças que contrariam o brief e precisam do Henrique:
  1. Regra 5.2 e oferta 6.2: upsell de um clique do mini curso a R$ 97 na mesma sessão de compra ("só nesta compra" em vez de "só nesta tela").
  2. Regra econômica 9.1 em receita líquida, com tetos de CPA (R$ 40 teste, R$ 32 escala) e verba de teste de R$ 9.000.
  3. Seção 4.5: redação nova que resolve a contradição entre o Perfil 4 e "empresário não é ICP".
  4. Seção 6.5: "catálogo base incluso, minicursos avançados bloqueados e vendidos dentro" e abertura condicionada a base de 1.500 compradores.
  5. Decisão 5: critérios novos e recomendação Cakto (primeiro) / Kiwify (reserva).
  6. Whitelisting de anúncios a partir do perfil do Henrique (tensão com 10.5).
  7. Plano B do bump (bump barato + mini curso só como upsell), só se o aceite ficar abaixo de 10% após 300 checkouts; cria produto novo.
  8. Nome oficial da primeira reunião do Funil 1 ("sessão de arquitetura" ou "reunião de diagnóstico"), para o convite do Gatilho A.
  9. Valores reais de setup e mensalidade dos contratos, para substituir a hipótese da seção 3.4.
- Mudanças que posso aplicar sem o Henrique (não contrariam o brief, detalham):
  1. Perguntas do Gatilho A no D0 e tarefa humana em 24 h (8.1 já diz "no pós-compra").
  2. CTA do NIDflow dentro do playbook (6.4 já prevê CTA em outros pontos; este é um a mais).
  3. "Comente a palavra-chave" como CTA padrão do orgânico (dentro de "Atender").
  4. Métricas adicionais em 9.2.
  5. Formato de criativo (tela + narração de quem opera).
  6. Regra de planejamento: Sprint 6 produz, mas a abertura da Plataforma espera a base.
  7. Não iniciar mídia paga antes do mini curso gravado.
- Riscos: CPA acima da receita líquida do checkout; aceite do bump de R$ 97 abaixo de 10%; decisor perdido por pergunta feita tarde; controle de acesso do NIDflow em HTML único; dependência da gravação do Henrique; benchmarks e taxas obtidos por resumo de busca (confirmar nas páginas oficiais); Plataforma lançada com base pequena; concorrência gratuita no enquadramento "curso de vendas".
