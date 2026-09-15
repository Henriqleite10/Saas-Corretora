# Plano de verba e estrutura de campanha · Funil 2 (Meta Ads)

| Campo | Valor |
|---|---|
| Documento | `campanhas/04-plano-de-verba.md` |
| Autor | Agente `trafego` |
| Sprint | 5 |
| Status | Entregue ao coordenador; passa pelo `estrategia` antes de ser dado como pronto. Verba e tetos dependem de aprovação do Henrique (mudam a regra 9.1 do brief) |
| Fonte da verdade | `docs/00-brief-mestre.md` (seção 9), `docs/01-parecer-estrategico.md` (seções 2.4, 2.9, 3.1 a 3.5, 6 itens 3 e 9) e decisões do coordenador |
| Regra econômica | O front-end paga o tráfego, medido em **receita líquida** por comprador no checkout. Teto de CPA F2: R$ 40 no teste, R$ 32 na escala, sempre com os impostos da mídia incluídos. Tudo é hipótese até 30 dias de dados |

---

## 0. Pré-requisitos (nenhuma mídia paga antes de todos cumpridos)

| # | Pré-requisito | Responsável | Como verificar |
|---|---|---|---|
| 1 | Mini curso gravado e publicado na área de membros | Henrique + `roteiro` | Aulas acessíveis com uma compra de teste |
| 2 | Checkout do playbook no ar com o order bump do mini curso a R$ 97 (e, se aprovado, a página de um clique a R$ 97 depois do pagamento) | `automacao` + `copy` | Compra de teste com bump aceito e recusado; `F2-bump` aplicada na base |
| 3 | Página do playbook no ar (`produtos/playbook/pagina-de-vendas.md` implementada), com pixel e API de Conversões instalados e testados | `copy` + `automacao` | Eventos da seção 5 aparecendo no Gerenciador de Eventos com deduplicação confirmada |
| 4 | Página de obrigado com as duas perguntas do Gatilho A | `copy` + `automacao` | Resposta de teste grava `F2-gatilho-A` e cria a tarefa humana |
| 5 | Entrega pós-compra (e-mail e WhatsApp) e oferta do NIDflow em D+7 funcionando | `automacao` | Compra de teste recebe E0 e W0 em menos de 2 minutos |
| 6 | Agente no direct e no WhatsApp ligado, com as quatro palavras-chave e o código `AD01` cadastrados | `automacao` | Teste de comentário e de clique no anúncio |
| 7 | Conta de anúncios, pixel, domínio e nomenclatura `F2` criados conforme a seção 1 | `trafego` | Checklist da seção 1.3 |
| 8 | Criativos C01, C03, C05 e C07 gravados, legendados e aprovados pelo `estrategia`; conferidos contra a headline final da página | Henrique (gravação) + `trafego` | Checklist da seção 4 de `02-criativos.md` |
| 9 | Verba de teste de R$ 9.000 aprovada pelo Henrique, à parte da verba do Funil 1 | Henrique | Registro no relatório do coordenador |
| 10 | Pelo menos duas semanas de calendário orgânico publicadas (o perfil precisa ter conteúdo quando o anúncio trouxer gente) | `trafego` | Dias 1 a 10 de `03-calendario-organico.md` no ar |

Enquanto o item 1 não estiver pronto, o funil roda só com orgânico. Motivo (parecer, risco 5): sem o bump, cada venda deixa R$ 21,73 líquidos, o que não paga tráfego em nenhum cenário.

---

## 1. Separação do Funil 1 e nomenclatura

### 1.1 Contas e ativos

| Ativo | Regra |
|---|---|
| Conta de anúncios | Conta própria dentro do Business Manager da NID, nomeada `F2 · NID Funil 2`. Nunca a conta do Funil 1. Forma de pagamento e limite de gasto separados |
| Pixel (conjunto de dados) | Conjunto de dados próprio: `F2 · Pixel Playbook`. Instalado só na página do playbook, na página de obrigado, na página do mini curso e na página da oferta do NIDflow. Nunca no site institucional da NID (que pertence ao Funil 1) |
| Domínio | A página do playbook fica em domínio ou subdomínio próprio do Funil 2 (a definir com o `copy` e o `automacao`), verificado no Business Manager. Se ficar em subdomínio do domínio da NID, a verificação já existe e a prioridade de eventos é configurada por domínio |
| Página do Facebook e perfil do Instagram | Os da NID (Cenário 1). No Cenário 2 (whitelisting), o perfil do Henrique é adicionado como parceiro de anúncio com permissão só para a conta `F2` |
| Públicos personalizados | Prefixo `F2-` em todos. Nenhum público do Funil 1 é usado, nem como semente de semelhante |
| Relatórios | Relatório salvo `F2 · Diário` e `F2 · Criativos` no Gerenciador, com as colunas da seção 7. Planilha de acompanhamento própria (seção 7) |
| UTMs | Prefixo `F2` em `utm_campaign`, `utm_content` e `utm_term` (seção 6) |
| Etiquetas na base | `F2-` em tudo, conforme o `automacao` |

### 1.2 Nomenclatura

| Nível | Padrão | Exemplos |
|---|---|---|
| Campanha | `F2-PB-<FASE>` | `F2-PB-TESTE`, `F2-PB-ESCALA`, `F2-PB-RMKT` |
| Conjunto | `F2-CJ-<nn>-<PUBLICO>` | `F2-CJ-01-AMPLO`, `F2-CJ-02-INTERESSES`, `F2-CJ-03-CARGOS`, `F2-CJ-04-RMKT` |
| Anúncio | `F2-C<nn>-<Formato>-<gancho>` | `F2-C01-Vtela-A`, `F2-C03-Vrosto-B`, `F2-C08-E-A` |
| Público personalizado | `F2-PUB-<origem>-<janela>` | `F2-PUB-engajou-ig-90d`, `F2-PUB-visitou-pagina-30d`, `F2-PUB-compradores-180d` |
| Público semelhante | `F2-LAL-<semente>-<pct>` | `F2-LAL-compradores-1pct` |

PB é "playbook". Quando houver campanha do mini curso avulso ou da Plataforma NID, o código muda (`F2-MC`, `F2-PN`) e o restante do padrão se mantém.

### 1.3 Checklist de separação (antes de ligar)

- [ ] Conta `F2 · NID Funil 2` criada, com cartão ou boleto separado e limite de gasto mensal igual à verba da fase.
- [ ] Conjunto de dados `F2 · Pixel Playbook` criado e instalado só nas páginas do Funil 2.
- [ ] Domínio verificado e prioridade de eventos configurada (seção 5.3).
- [ ] Nenhum público, pixel, catálogo ou relatório do Funil 1 vinculado à conta `F2`.
- [ ] UTMs conferidas em um clique de teste (a URL final contém `F2-` nos três parâmetros).
- [ ] Planilha de acompanhamento criada com as colunas da seção 7.

---

## 2. Como ler custo e CPA: fatura, Gerenciador e impostos

Desde 01/01/2026 a Meta repassa 12,15% de impostos ao anunciante (parecer, seção 2.4, comprovado). O Gerenciador mostra o gasto sem imposto; a fatura vem com ele. **Toda meta deste plano é em valor de fatura**, porque é o que sai do caixa da NID.

| Grandeza | Regra |
|---|---|
| Verba (o que a NID paga) | Valor da fatura, com imposto |
| Gasto no Gerenciador | Verba ÷ 1,1215 |
| CPA F2 (o que se compara com o teto) | CPA do Gerenciador × 1,1215 |
| Orçamento diário a configurar | Verba diária ÷ 1,1215 |

Tabela de conversão dos tetos:

| Teto em fatura | Equivalente no Gerenciador |
|---|---|
| R$ 40,00 (teste) | R$ 35,67 |
| R$ 32,00 (escala) | R$ 28,53 |
| R$ 300,00 por dia (teste) | R$ 267,50 por dia |

Regra prática: nas colunas personalizadas do Gerenciador, crie a métrica `CPA F2 (fatura)` = custo por compra × 1,1215 e use só ela nas decisões.

---

## 3. Estrutura de campanha

### 3.1 Visão geral

| Campanha | Objetivo | Evento de otimização | Orçamento | Quando existe |
|---|---|---|---|---|
| `F2-PB-TESTE` | Vendas | Compra (`Purchase`) | Por conjunto (ABO), para forçar gasto igual entre públicos e ler cada um | Fase de teste (dias 1 a 30) e validação (31 a 60) |
| `F2-PB-ESCALA` | Vendas, campanha Advantage+ de vendas | Compra | Orçamento de campanha (CBO) | A partir da validação, só com criativos vencedores |
| `F2-PB-RMKT` | Vendas | Compra | Por conjunto; 10% da verba do mês | A partir do dia 8 (precisa de gente na página) |

Destino de todo anúncio: a página do playbook. Sem formulário, sem etapa intermediária (brief 9). O anúncio de clique para WhatsApp (código `AD01`) fica como hipótese para depois da validação e não entra no teste: seria uma etapa intermediária e o brief manda direto para a página.

### 3.2 `F2-PB-TESTE` · conjuntos e públicos

Brasil inteiro, português, 25 a 55 anos, todos os gêneros. Exclusão em todos os conjuntos: `F2-PUB-compradores-180d`.

| Conjunto | Público | Por que existe | Orçamento diário (fatura) |
|---|---|---|---|
| `F2-CJ-01-AMPLO` | Público Advantage+ sem interesse (só idade, país e idioma) | O algoritmo encontra o comprador pelo criativo; é o conjunto que costuma entregar o menor CPA quando o criativo carrega a dor | R$ 90 |
| `F2-CJ-02-INTERESSES` | Interesses: vendas B2B, prospecção, CRM, gestão de vendas, proposta comercial, consultoria empresarial, marketing B2B; ferramentas comerciais (CRM e automação de marketing em geral, sem citar marca no anúncio) | Público consciente do problema que consome conteúdo de vendas | R$ 75 |
| `F2-CJ-03-CARGOS` | Segmentação por cargo e setor quando disponível na conta: SDR, BDR, executivo de contas, consultor comercial, gerente comercial, representante comercial, consultor, freelancer; setor de serviços empresariais e tecnologia. Se a conta não oferecer cargos, substituir por interesses de carreira comercial e manter o nome | Os quatro perfis do ICP pelo cargo declarado | R$ 75 |
| `F2-CJ-04-RMKT` | `F2-PUB-engajou-ig-90d` (engajou com o perfil ou os anúncios da NID nos últimos 90 dias) + `F2-PUB-visitou-pagina-30d` (visitou a página do playbook sem comprar). Liga no dia 8 | Quem viu o orgânico ou o anúncio e não comprou. É o público mais barato por compra | R$ 60 (dos dias 8 a 30; antes, os R$ 60 ficam no `F2-CJ-01`) |
| **Total** | | | **R$ 300 por dia (fatura) = R$ 267,50 no Gerenciador** |

Públicos semelhantes (`F2-LAL-compradores-1pct`) só entram com 300 compradores na base, na fase de validação.

### 3.3 Posicionamentos

- Posicionamentos Advantage+ com duas exclusões: Audience Network e artigos instantâneos. Motivo: cliques baratos e sem compra distorcem o CPA em produto de R$ 29,90.
- Prioridade de leitura por posicionamento: Instagram Reels, Instagram Stories, Instagram Feed, Facebook Reels, Facebook Feed. Se em 10 dias um posicionamento tiver CPA F2 acima de R$ 60 com mais de R$ 400 gastos, exclui-se o posicionamento no conjunto.
- Cada anúncio sobe com os três formatos (9:16, 4:5, 1:1) para que o posicionamento receba o corte certo.

### 3.4 Anúncios por rodada (fase de teste)

| Rodada | Dias | Criativos em cada conjunto | O que se decide no fim |
|---|---|---|---|
| 1 | 1 a 10 | C01-A, C03-A, C05-A, C07-A (os quatro ângulos da semana 1) | Pausa criativo e conjunto que estourou o teto (seção 4). Escolhe os 2 ganchos com melhor CPA |
| 2 | 11 a 20 | Vencedores da rodada 1 + C09-A, C11-A, C12-A, C02-A + variação de gancho B dos vencedores | Idem. Lê o aceite do bump com os primeiros 150 a 200 checkouts |
| 3 | 21 a 30 | Vencedores acumulados + C13-A, C14-A, C04-A, C06-A, C08-A, C10-A | Fecha o relatório de 30 dias (seção 4.4) |

Máximo de 6 anúncios ativos por conjunto. Cada anúncio precisa de pelo menos R$ 200 (fatura) gastos antes de qualquer decisão.

### 3.5 `F2-PB-ESCALA` (a partir da validação)

- Campanha Advantage+ de vendas (a Meta cita CPA cerca de 32% menor que campanhas manuais; indício, parecer 2.4), CBO, público amplo com exclusão de compradores.
- Entram só anúncios com CPA F2 (fatura) abaixo de R$ 32 por 7 dias seguidos na campanha de teste e com pelo menos 15 compras.
- Orçamento inicial: o mesmo gasto que os vencedores tinham na campanha de teste. A campanha de teste continua com verba menor (30% do total) para testar criativos novos toda semana; a escala nunca fica sem esteira de criativo.

### 3.6 `F2-PB-RMKT` (a partir do dia 8, e permanente)

| Conjunto | Público | Criativo |
|---|---|---|
| `F2-CJ-10-VISITOU` | Visitou a página nos últimos 14 dias, não comprou | C14 (o que vem no playbook) e C13 (não é curso); texto primário do C14 |
| `F2-CJ-11-CHECKOUT` | Iniciou o checkout nos últimos 7 dias, não comprou | C14 com o texto primário reduzido a garantia e preço: "Você chegou até o checkout. R$ 29,90, 7 dias de garantia, reembolso sem pergunta. Quero o playbook por R$ 29,90." |
| `F2-CJ-12-ENGAJOU` | Engajou com o perfil ou os anúncios em 30 dias, não visitou a página | C03, C07 (rosto) |

Frequência máxima de 3 por semana por conjunto. Sem urgência falsa, sem "última chance".

---

## 4. Verba por fase e regras de decisão

### 4.1 Fases

| Fase | Período | Verba (fatura) | Objetivo | Condição de entrada |
|---|---|---|---|---|
| Teste | Dias 1 a 30 | R$ 9.000 (R$ 300 por dia) | Ler CPA por criativo e por público com algum sentido estatístico; ler o aceite do bump com 300 checkouts; ler a conversão da página | Pré-requisitos da seção 0 |
| Validação | Dias 31 a 60 | R$ 9.000 a R$ 15.000 | Confirmar que o CPA F2 fica abaixo de R$ 32 com os vencedores e que a receita líquida por comprador em 30 dias cobre a mídia | CPA F2 médio dos 30 dias de teste abaixo de R$ 40 e pelo menos dois criativos abaixo de R$ 32 |
| Escala | Dia 61 em diante | Cresce 20% a cada 3 dias enquanto as regras da seção 4.3 forem verdadeiras; teto mensal de R$ 30.000 até nova aprovação do Henrique | Comprar base ao custo que o front-end paga | CPA F2 abaixo de R$ 32 por 14 dias seguidos na validação; aceite do bump de pelo menos 10%; conversão da página de pelo menos 2% |

Hipóteses do que a verba compra (parecer 3.1): no cenário base (CPA R$ 32), R$ 9.000 compram cerca de 280 compradores; no pessimista (R$ 55), cerca de 165; no otimista (R$ 20), cerca de 450.

### 4.2 Regras de pausa (fase de teste e validação)

| Nível | Regra | Ação |
|---|---|---|
| Anúncio | R$ 200 (fatura) gastos sem nenhuma compra | Pausa. Substitui pela variação de gancho B ou pelo próximo criativo da fila |
| Anúncio | CPA F2 acima de R$ 40 depois de 3 compras ou de R$ 400 gastos | Pausa |
| Anúncio | CTR de link abaixo de 0,8% ou taxa de retenção nos 3 primeiros segundos abaixo de 20% (vídeo), com mais de 5.000 impressões | Pausa. O problema é o gancho: entra a variação B |
| Anúncio | CTR de link acima de 1,5% e CPA acima de R$ 40 | O anúncio funciona e a página não. Não pausa o anúncio; abre tarefa para o `copy` (seção 4.5) |
| Conjunto | CPA F2 acima de R$ 40 por 7 dias seguidos com mais de R$ 700 gastos | Pausa o conjunto; a verba vai para o melhor conjunto |
| Conjunto | Frequência acima de 3 em 7 dias | Troca o criativo ou amplia o público |
| Campanha | CPA F2 médio acima de R$ 40 por 14 dias seguidos, em todos os conjuntos | Pausa a mídia. Reunião de replanejamento: criativos, página e bump. O orgânico continua |

### 4.3 Regras de escala

| Regra | Condição | Ação |
|---|---|---|
| Subir verba | CPA F2 (fatura) abaixo de R$ 32 nos últimos 7 dias, com pelo menos 20 compras no período, e aceite do bump de pelo menos 10% | +20% de orçamento a cada 3 dias. Nunca mais de 20% de uma vez (evita reiniciar o aprendizado) |
| Manter | CPA F2 entre R$ 32 e R$ 40 | Mantém a verba. Troca criativo ou página. Não sobe |
| Descer | CPA F2 acima de R$ 32 por 7 dias seguidos na escala | Volta ao orçamento anterior; se persistir por mais 7 dias, volta à verba de validação |
| Teto mensal | Verba mensal de R$ 30.000 atingida | Só passa com aprovação do Henrique, com o relatório da seção 4.4 atualizado |
| Esteira de criativo | Semana sem criativo novo em teste | A campanha de teste recebe pelo menos dois anúncios novos por semana (variações dos ângulos vencedores ou ângulo ainda não testado) |

Por que R$ 32: é a receita líquida média por comprador no checkout no cenário base (parecer 3.2: R$ 33,52, arredondado para baixo). Acima disso, o front-end deixa de pagar a mídia e o lucro do NIDflow, da Plataforma NID e do Gatilho A passa a pagar a aquisição. Se o upsell de um clique a R$ 97 for aprovado, a receita líquida sobe para R$ 36,75 e o teto de escala pode ser revisto para R$ 36 depois de 30 dias de dados do upsell (decisão do coordenador, não deste plano).

### 4.4 Relatório de 30 dias (obrigatório antes de entrar na validação)

| Pergunta | Onde a resposta está | Decisão que depende dela |
|---|---|---|
| Qual foi o CPA F2 (fatura) médio, por conjunto e por criativo? | Planilha, seção 7 | Entrar ou não na validação; quais criativos vão para a escala |
| Qual foi o aceite do bump com 300 checkouts? | Base (`F2-bump` ÷ `F2-comprador-playbook`) | Abaixo de 10%: aciona o teste de formato do bump (parecer, seção 6 item 8; precisa do Henrique) |
| Qual foi a conversão da página (compras ÷ visitas)? | Pixel: `Purchase` ÷ `ViewContent` | Abaixo de 1,5% com CTR acima de 1%: tarefa para o `copy` |
| Qual foi a receita líquida por comprador no checkout? | Planilha, coluna da seção 7.2 | Confirma ou corrige o teto de escala |
| Qual foi o percentual de compradores etiquetados `F2-gatilho-A`? | Base | Abaixo de 5%: o problema é a pergunta, não o público (parecer 3.5) |
| Quantas sessões de arquitetura foram agendadas a partir do Gatilho A? | ClickUp, tarefas `F2 · Gatilho A` | Alimenta o custo por decisor e por contrato (`05-metricas.md`) |

### 4.5 Quando o problema não é a mídia

| Sinal | Diagnóstico | Quem resolve |
|---|---|---|
| CTR alto, conversão da página baixa | A página não entrega o que o anúncio promete, ou o checkout tem atrito | `copy` (página) e `automacao` (checkout) |
| Conversão da página boa, aceite do bump baixo | Texto, posição ou preço relativo do bump | `copy` e decisão do Henrique sobre o formato (parecer, item 8) |
| Muitas compras, poucos decisores etiquetados | Pergunta do Gatilho A mal posicionada ou mal formulada | `automacao` e `copy` |
| CPA bom e reembolso acima de 5% | Anúncio promete mais do que o playbook entrega | `trafego` revisa o texto primário contra o playbook |

---

## 5. Eventos de pixel e API de Conversões

### 5.1 Eventos

| Evento | Onde dispara | Parâmetros | Uso |
|---|---|---|---|
| `PageView` | Todas as páginas do Funil 2 | | Base para públicos |
| `ViewContent` | Página do playbook, ao carregar | `content_name=F2 Playbook`, `content_ids=["F2-playbook"]`, `value=29.90`, `currency=BRL` | Público `F2-PUB-visitou-pagina`, taxa de conversão da página |
| `InitiateCheckout` | Clique no CTA "Quero o playbook por R$ 29,90" na página e carregamento da página de checkout (pixel da plataforma de checkout no mesmo conjunto de dados) | `content_ids=["F2-playbook"]`, `value=29.90`, `currency=BRL` | Público `F2-CJ-11-CHECKOUT`, taxa de início de checkout |
| `AddPaymentInfo` | Página de checkout, ao preencher pagamento (se a plataforma de checkout emitir) | | Diagnóstico de atrito no checkout |
| `Purchase` | Página de obrigado (navegador) **e** webhook `purchase_approved` → API de Conversões (servidor), com o mesmo `event_id` (id do pedido) para deduplicação | `value` = total pago (R$ 29,90 ou R$ 126,90), `currency=BRL`, `content_ids=["F2-playbook"]` ou `["F2-playbook","F2-minicurso-bump"]`, `num_items` | Otimização de todas as campanhas; público de exclusão `F2-PUB-compradores-180d`; ROAS |
| `F2_BumpAceito` (personalizado) | Só pela API de Conversões, quando a base aplica `F2-bump` | `value=97.00` | Leitura do aceite do bump por criativo e por público |
| `F2_GatilhoA` (personalizado) | Só pela API de Conversões, quando a base aplica `F2-gatilho-A` | | Semente futura de público semelhante de decisores (só com mais de 100 eventos) |
| `Contact` | Clique no botão de WhatsApp da página do playbook (código `PG01`) | | Diagnóstico: quantos preferem perguntar antes de comprar |

Toda compra do mini curso avulso (sequência D0 a D+6) e do NIDflow (D+7) também chega pela API de Conversões como `Purchase` com `content_ids` próprios (`F2-minicurso`, `F2-nidflow`), para que o ROAS de 30 e 90 dias seja lido dentro do Gerenciador por campanha de origem. O `automacao` envia o `fbc`/`fbp` gravado na compra original.

### 5.2 Deduplicação e parâmetros de correspondência

- Navegador e servidor enviam `Purchase` com o mesmo `event_id` (id do pedido na plataforma de checkout). A Meta descarta a duplicata.
- O servidor envia, com hash, e-mail e telefone da compra, mais `fbp` e `fbc` capturados na página (o orquestrador guarda os dois no registro do clique que originou a compra).
- Nenhum dado pessoal em claro sai para a Meta além do que a própria API exige com hash. Nada de CPF.

### 5.3 Prioridade de eventos no domínio

Na configuração de eventos agregados do domínio, a ordem é: 1. `Purchase`; 2. `InitiateCheckout`; 3. `ViewContent`; 4. `Contact`. Os eventos personalizados não entram na lista de prioridade.

### 5.4 Testes antes de ligar

- [ ] Compra de teste gera um único `Purchase` no Gerenciador de Eventos (deduplicado), com valor certo.
- [ ] Compra com bump gera `Purchase` com `value=126.90` e `F2_BumpAceito`.
- [ ] Resposta "própria" e "sim" na página de obrigado gera `F2_GatilhoA`.
- [ ] Qualidade de correspondência do evento `Purchase` acima de 6 no Gerenciador de Eventos.

---

## 6. UTMs

### 6.1 Esquema

| Parâmetro | Pago (Meta Ads) | Orgânico Instagram (via agente no direct) | Stories | LinkedIn | E-mail e WhatsApp (sequências do `automacao`) |
|---|---|---|---|---|---|
| `utm_source` | `meta` | `instagram` | `instagram` | `linkedin` | `email` ou `whatsapp` |
| `utm_medium` | `paid` | `direct` | `stories` | `organic` | `sequencia` |
| `utm_campaign` | `{{campaign.name}}` (vem `F2-PB-TESTE` etc.) | `F2-playbook` | `F2-playbook` | `F2-playbook` | `F2-nidflow-d7`, `F2-minicurso-d0d6` (definidos pelo `automacao`) |
| `utm_content` | `{{ad.name}}` (vem `F2-C01-Vtela-A`) | `F2-org-d<dia>` (id do post) | `F2-st-s<semana>` | `F2-li-d<dia>` | `d7`, `d10`, `e3` etc. |
| `utm_term` | `{{adset.name}}` (vem `F2-CJ-01-AMPLO`) | `F2-kw-<palavra>` | vazio | vazio | vazio |

URL final dos anúncios (campo "parâmetros de URL" do anúncio):

`utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`

Como a nomenclatura da seção 1.2 já leva `F2`, os três parâmetros chegam com o prefixo sem digitação manual.

### 6.2 Onde as UTMs são lidas

- A página do playbook grava as UTMs e passa para o checkout (parâmetro na URL ou campo oculto, conforme a plataforma de checkout).
- O webhook `purchase_approved` traz as UTMs do checkout; o orquestrador grava no contato (`automacao`, seção 2 do arquivo de entrega). É assim que a receita líquida em 30 e 90 dias volta para o criativo e o público que originaram a compra.
- O agente do direct usa o link com `utm_content=<id do post>` e `utm_term=F2-kw-<palavra>` (já definido pelo `automacao`).

---

## 7. Planilha de acompanhamento (Markdown)

Uma linha por dia na aba diária; uma linha por criativo na aba de criativos; um fechamento por semana. Todas as colunas de custo em valor de fatura (Gerenciador × 1,1215). Fonte de cada coluna em `05-metricas.md`.

### 7.1 Aba diária · `F2 · Diário`

| Dia | Data | Verba (fatura) | Impressões | Alcance | Frequência | CPM | Cliques no link | CTR link | CPC | Visitas (`ViewContent`) | Checkouts (`InitiateCheckout`) | Taxa de checkout | Compras (`Purchase`) | Conv. da página | CPA F2 (fatura) | Compras com bump | Aceite do bump | Ticket médio bruto | Receita bruta | Receita líquida por comprador | Receita líquida total | Saldo do dia (rec. líquida menos verba) | Decisores etiquetados | Reembolsos |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | | | | | | | | | | | | | | | |
| 2 | | | | | | | | | | | | | | | | | | | | | | | | |
| ... | | | | | | | | | | | | | | | | | | | | | | | | |
| 30 | | | | | | | | | | | | | | | | | | | | | | | | |
| **Total 30 dias** | | | | | | | | | | | | | | | | | | | | | | | | |

Fórmulas: CTR link = cliques ÷ impressões. Taxa de checkout = checkouts ÷ visitas. Conversão da página = compras ÷ visitas. CPA F2 = verba ÷ compras. Aceite do bump = compras com bump ÷ compras. Ticket médio bruto = receita bruta ÷ compras. Receita líquida por comprador = (compras sem bump × R$ 21,73 + compras com bump × R$ 100,31) ÷ compras, com os valores unitários da plataforma de checkout escolhida (os de referência são do parecer, seção 3.1; o `automacao` atualiza quando a plataforma for confirmada). Saldo do dia = receita líquida total menos verba.

### 7.2 Aba de criativos · `F2 · Criativos`

| Anúncio | Ângulo | Formato | Conjunto | Dias ativos | Verba (fatura) | Impressões | Retenção 3 s (vídeo) | CTR link | CPC | Visitas | Compras | CPA F2 (fatura) | Aceite do bump | Receita líquida por comprador | Status (ativo, pausado, escala) | Motivo da decisão |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| F2-C01-Vtela-A | A1 | V-tela | | | | | | | | | | | | | | |
| F2-C01-Vtela-B | A1 | V-tela | | | | | | | | | | | | | | |
| F2-C02-E-A | A1 | Estático | | | | | | | | | | | | | | |
| F2-C03-Vrosto-A | A2 | V-rosto | | | | | | | | | | | | | | |
| F2-C04-Vtela-A | A2 | V-tela | | | | | | | | | | | | | | |
| F2-C05-Vtela-A | A3 | V-tela | | | | | | | | | | | | | | |
| F2-C06-E-A | A3 | Estático | | | | | | | | | | | | | | |
| F2-C07-Vrosto-A | A4 | V-rosto | | | | | | | | | | | | | | |
| F2-C08-E-A | A4 | Estático | | | | | | | | | | | | | | |
| F2-C09-Vtela-A | A5 | V-tela | | | | | | | | | | | | | | |
| F2-C10-E-A | A5 | Estático | | | | | | | | | | | | | | |
| F2-C11-Vrosto-A | A6 | V-rosto | | | | | | | | | | | | | | |
| F2-C12-Vtela-A | A7 | V-tela | | | | | | | | | | | | | | |
| F2-C13-Vrosto-A | A8 | V-rosto | | | | | | | | | | | | | | |
| F2-C14-E-A | A8 | Estático | | | | | | | | | | | | | | |

### 7.3 Aba de fechamento semanal · `F2 · Semana`

| Semana | Verba (fatura) | Compras | CPA F2 | Aceite do bump | Conv. da página | Receita líquida no checkout | Saldo (front-end menos mídia) | Mini curso avulso (vendas) | NIDflow D+7 (assinaturas) | Decisores `F2-gatilho-A` | Custo por decisor | Sessões agendadas | Decisão da semana |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | | | | |
| 2 | | | | | | | | | | | | | |
| 3 | | | | | | | | | | | | | |
| 4 | | | | | | | | | | | | | |
| **Teste (30 dias)** | | | | | | | | | | | | | |

### 7.4 Aba de coortes · `F2 · Coortes` (preenchida em D+30 e D+90 de cada semana de compra)

| Semana de compra | Compradores | Verba que os originou | Receita líquida no checkout | Receita líquida em 30 dias | Receita líquida em 90 dias | Saldo em 30 dias | Saldo em 90 dias | Decisores | Sessões | Contratos do Funil 1 | Custo por contrato |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | | |
| 2 | | | | | | | | | | | |

---

## 8. Cronograma de implantação

| Marco | Quando | O que acontece |
|---|---|---|
| T menos 14 dias | Assim que o mini curso estiver gravado | Conta `F2`, pixel, domínio, públicos e nomenclatura criados (seção 1). Eventos testados (seção 5.4) |
| T menos 7 dias | | Criativos da rodada 1 gravados, legendados, aprovados pelo `estrategia` e conferidos contra a página. Anúncios criados em rascunho com UTMs conferidas |
| T menos 3 dias | | Compra de teste ponta a ponta: anúncio de teste com R$ 20, clique, página, checkout com bump, página de obrigado com Gatilho A, entrega, `Purchase` deduplicado |
| T0 | Segunda-feira | `F2-PB-TESTE` ligada com R$ 300 por dia (fatura). Leitura diária na planilha às 9h |
| T + 8 | | `F2-PB-RMKT` ligada com R$ 60 por dia |
| T + 10 e T + 20 | | Fim das rodadas 1 e 2: pausas e substituições (seção 3.4) |
| T + 30 | | Relatório de 30 dias (seção 4.4) ao coordenador e ao Henrique. Decisão: validação, mais 15 dias de teste com criativos novos, ou pausa |
| T + 60 | | Fim da validação. Decisão de escala com as regras da seção 4.3 |

---

## 9. Custos fora da verba de mídia (para o coordenador registrar)

Não entram nos R$ 9.000 e precisam de previsão à parte: mensagens de modelo do WhatsApp (categoria marketing e utilidade, cobradas por conversa), tokens do agente de IA (estimativa do `automacao`: cerca de 6 mil tokens de entrada, a maior parte em cache, e 300 de saída por resposta), taxa da plataforma de checkout (já descontada na receita líquida), ferramenta de legendagem e edição dos vídeos, e o tempo de gravação do Henrique (rodada 1: quatro vídeos de rosto e a narração de quatro vídeos de tela, uma manhã).
