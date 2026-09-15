# Painel de métricas do Funil 2

| Campo | Valor |
|---|---|
| Documento | `campanhas/05-metricas.md` |
| Autor | Agente `trafego` |
| Sprint | 5 |
| Status | Entregue ao coordenador; passa pelo `estrategia` antes de ser dado como pronto |
| Fonte da verdade | `docs/00-brief-mestre.md` (seção 9.2) e `docs/01-parecer-estrategico.md` (seções 3.1 a 3.5 e veredito de 9.2) |
| Regra | Toda meta inicial é **hipótese** até existirem 30 dias de dados. Nenhuma peça cita meta como resultado. Nada aqui se mistura com o Funil 1: as métricas do Funil 1 que aparecem (sessões, contratos) são lidas só para o recorte "originado no Funil 2" |

---

## 0. Princípios

1. **Custo sempre em valor de fatura** (Gerenciador × 1,1215, seção 2 de `04-plano-de-verba.md`).
2. **Receita sempre líquida** quando comparada com custo: bruta menos taxa da plataforma de checkout menos impostos (10%, hipótese do parecer até a NID informar o regime). Valores unitários de referência (parecer 3.1, plataforma de referência Kiwify; o `automacao` atualiza quando a plataforma for confirmada): playbook sozinho R$ 21,73; pedido com bump R$ 100,31; mini curso avulso R$ 116,59; NIDflow R$ 21,73 por mês; Plataforma NID R$ 791,41; upsell de um clique a R$ 97 (se aprovado) R$ 76,09.
3. **Uma fonte por métrica.** Quando duas fontes discordam (Gerenciador e base, por exemplo), vale a base da NID para compras e a fatura da Meta para custo. O Gerenciador serve para otimização, não para contabilidade.
4. **Leitura por coorte.** Receita em 30 e 90 dias é lida pela semana de compra, nunca pelo mês calendário.
5. **Etiqueta `F2-` em tudo.** Contato sem etiqueta `F2-` não entra em nenhuma conta deste painel.

---

## 1. Aquisição paga (Meta Ads)

| Métrica | Definição | Fórmula | Fonte | Meta inicial (hipótese) |
|---|---|---|---|---|
| Verba F2 | O que a NID paga à Meta, com impostos | Gasto do Gerenciador × 1,1215 | Fatura da Meta; Gerenciador | R$ 9.000 nos 30 dias de teste |
| CPM | Custo por mil impressões | Verba ÷ impressões × 1.000 | Gerenciador | Leitura, sem meta. Referência de mercado para infoproduto no Brasil em 2026 não confiável; registra-se o observado |
| CTR de link | Cliques no link ÷ impressões | | Gerenciador | Acima de 1% (criativo de resposta direta); pausa abaixo de 0,8% |
| CPC | Verba ÷ cliques no link | | Gerenciador | Leitura. O parecer cita R$ 3,20 a R$ 8,00 como CPC médio de infoproduto (indício); operações de entrada trabalham abaixo do piso |
| Retenção de 3 segundos (gancho) | Reproduções de 3 s ÷ impressões (vídeo) | | Gerenciador | Acima de 25%; pausa abaixo de 20% |
| Retenção de 50% do vídeo | Reproduções até 50% ÷ reproduções | | Gerenciador | Acima de 20% |
| Visitas à página | `ViewContent` | | Pixel | Leitura |
| Taxa de início de checkout | `InitiateCheckout` ÷ `ViewContent` | | Pixel | Acima de 8% |
| Conversão da página | Compras ÷ `ViewContent` | | Base (compras) e pixel (visitas) | 2% a 5% (parecer 2.1, indício); tarefa para o `copy` abaixo de 1,5% com CTR acima de 1% |
| **CPA F2** | Custo por compra do playbook, com impostos da mídia | Verba F2 ÷ compras do playbook originadas por mídia paga (UTM `utm_medium=paid`) | Fatura + base | **Até R$ 40 no teste; até R$ 32 na escala.** Cenários do parecer: R$ 55 pessimista, R$ 32 base, R$ 20 otimista |
| CPA F2 por criativo | Idem, por `utm_content` | | Fatura + base | Idem; um criativo vai para a escala só abaixo de R$ 32 por 7 dias com 15 compras |
| CPA F2 por conjunto | Idem, por `utm_term` | | Fatura + base | Idem |
| Frequência | Impressões ÷ alcance, por conjunto, em 7 dias | | Gerenciador | Abaixo de 3 |
| Taxa de reembolso | Reembolsos em 7 dias ÷ compras | | Base (`F2-reembolso`) | Abaixo de 5%. Acima disso, o anúncio promete mais do que o playbook entrega |

---

## 2. Checkout e receita do front-end

| Métrica | Definição | Fórmula | Fonte | Meta inicial (hipótese) |
|---|---|---|---|---|
| Compras do playbook | Pedidos aprovados do playbook, com ou sem bump | Contagem de `purchase_approved` do playbook | Base (`F2-comprador-playbook`) | 250 a 300 nos 30 dias de teste (cenário base) |
| **Aceite do order bump** | Compradores que levaram o mini curso a R$ 97 no checkout | `F2-bump` ÷ `F2-comprador-playbook` | Base | 8% a 15%; **10% é o mínimo** (abaixo disso após 300 checkouts, teste de formato, parecer 6.8). Cenários: 8% / 15% / 25% |
| Aceite do upsell de um clique (se aprovado) | Compradores sem bump que aceitaram os R$ 97 na página seguinte | Compras do upsell ÷ compras sem bump | Base | 3% / 5% / 8% |
| Ticket médio bruto do checkout | Receita bruta ÷ compras | (compras sem bump × 29,90 + compras com bump × 126,90) ÷ compras | Base | R$ 44,45 no cenário base (15% de bump); R$ 37,66 pessimista; R$ 54,15 otimista |
| **Receita líquida por comprador no checkout** | O que sobra por comprador depois de taxa e impostos | (compras sem bump × 21,73 + compras com bump × 100,31) ÷ compras | Base + valores unitários da seção 0 | **R$ 33,52** no cenário base (é o teto de escala); R$ 28,02 pessimista; R$ 41,38 otimista; R$ 36,75 com upsell aprovado |
| Front-end paga a mídia? | Saldo entre receita líquida do checkout e verba | Receita líquida do checkout menos verba F2 | Planilha | Zero ou positivo. Negativo por 14 dias seguidos aciona a regra de pausa |
| Mini curso avulso pela sequência | Compras a R$ 147 nos 6 dias seguintes | Compras do mini curso avulso ÷ compradores sem bump | Base (`F2-minicurso` sem `F2-bump`) | 2% / 3% / 4% |
| **Receita líquida por comprador em 30 dias** | Checkout + mini curso avulso + primeira mensalidade do NIDflow | Receita líquida no checkout + (taxa de mini curso avulso × 116,59) + (taxa de assinatura em D+7 × 21,73), lida por coorte em D+30 | Base, por coorte de semana de compra | **R$ 38,32** no cenário base (33,52 + 3,50 + 1,30) |
| **Receita líquida por comprador em 90 dias** | Idem, com três mensalidades do NIDflow descontado o churn | Receita líquida no checkout + mini curso avulso + (taxa de assinatura × 21,73 × (1 + (1 menos churn) + (1 menos churn)²)), lida por coorte em D+90 | Base, por coorte | **R$ 40,63** no cenário base (33,52 + 3,50 + 3,61, com 6% de assinatura e 8% de churn) |
| Retorno líquido em 30 e 90 dias | Receita líquida da coorte ÷ verba que a originou | | Planilha de coortes | Acima de 1,0 em 30 dias no cenário base (38,32 ÷ 32 = 1,20); acima de 1,25 em 90 dias |

---

## 3. Esteira (NIDflow e Plataforma NID)

| Métrica | Definição | Fórmula | Fonte | Meta inicial (hipótese) |
|---|---|---|---|---|
| Conversão da oferta do NIDflow em D+7 | Compradores que assinaram até D+14 | `F2-nidflow-ativo` ÷ compradores da coorte, em D+14 | Base | 3% / 6% / 10%. Abaixo de 3% após 30 dias, o coordenador reavalia o período gratuito (decisão 4 do brief) |
| Churn mensal do NIDflow | Assinaturas encerradas no mês ÷ assinaturas ativas no início do mês | | Base (`F2-nidflow-cancelado`, `F2-nidflow-leitura`) | 12% / 8% / 5% |
| Vida média e LTV líquido do NIDflow | 1 ÷ churn; LTV = vida média × 21,73 | | Calculado | 8,3 meses e R$ 181 (pessimista); 12,5 meses e R$ 272 (base); 20 meses e R$ 435 (otimista) |
| Ativação do NIDflow | Assinantes que desenharam o primeiro projeto em 15 minutos e em 7 dias (marcos do `nidflow`) | | Telemetria do NIDflow (item B-08) | Definida pelo `nidflow` no onboarding |
| Conversão do lançamento interno da Plataforma NID | Compras ÷ base elegível na janela | | Base (`F2-plataforma-ativo`) | 1,5% / 3% / 5%. Só se mede com base de pelo menos 1.500 compradores (parecer 6.5) |
| Renovação anual da Plataforma NID | Renovações ÷ assinaturas que venceram | | Base | Sem dado de mercado; primeira leitura só no ano 2 |
| Receita líquida total do Funil 2 por 1.000 compradores em 12 meses | Soma de checkout, mini curso avulso, NIDflow e Plataforma | | Planilha de coortes | R$ 49.504 / R$ 79.618 / R$ 132.195 (parecer 3.2) |

---

## 4. Orgânico e agente de IA (mecânica ATA: Atrair e Atender)

| Métrica | Definição | Fórmula | Fonte | Meta inicial (hipótese) |
|---|---|---|---|---|
| Posts publicados por semana | Feed do Instagram | Contagem | Calendário | 5 (um por dia útil), mais 3 frames de Stories por dia e 2 posts no LinkedIn |
| Comentários com palavra-chave por post | Comentários que dispararam M1 | Contagem por id do post | Orquestrador | Leitura; ranking mensal decide o reposte (regra 8 do calendário) |
| Taxa de M1 entregue | M1 enviadas ÷ comentários com palavra-chave | | Orquestrador | Acima de 95% (limite de respostas privadas e permissões) |
| Taxa de clique no direct | Cliques no link (UTM `utm_medium=direct`) ÷ M1 enviadas | | Orquestrador + página | Acima de 40% (indício do parecer 2.8: DMs automatizadas com 50% a 60% de resposta) |
| Compras por post | Compras com `utm_content=F2-org-d<dia>` | | Base | Leitura; compara com a mídia: o parecer cita fluxo comentário → direct convertendo 3 a 5 vezes mais que link na bio (dado de fornecedor) |
| Compras orgânicas no total | Compras com `utm_medium` em `direct`, `stories`, `organic` | | Base | Leitura; sem meta antes de 30 dias |
| Custo por compra orgânica | Custo do agente (tokens) e das mensagens ÷ compras orgânicas | | Orquestrador (registro de tokens) + base | Leitura; serve para comparar com o CPA F2 pago |
| Qualificação respondida no direct | Conversas em que a pergunta 1 do Gatilho A foi respondida ÷ conversas com M1 | | Orquestrador (`qualificacao.vende_para` diferente de `nao_respondeu`) | Acima de 30% |
| Encaminhamentos para humano | Conversas em S8 ÷ conversas | | Orquestrador | Leitura; Gatilho A à parte (seção 5) |
| Reprovações nas verificações determinísticas | Respostas descartadas pelas regras da seção 7.2 do `automacao` ÷ respostas geradas | | Orquestrador | Abaixo de 3%; acima disso, revisar o prompt |
| Dúvidas recorrentes nos Stories | Perguntas coletadas nas caixas de pergunta, agrupadas por objeção | Contagem | Instagram | Alimenta a tabela de objeções do agente e a variação B dos criativos |

---

## 5. Gatilhos A e B (o que devolve ao Funil 1 e à terceirização)

| Métrica | Definição | Fórmula | Fonte | Meta inicial (hipótese) |
|---|---|---|---|---|
| **Percentual de compradores etiquetados `F2-gatilho-A`** | Compradores que responderam "própria" e "sim" (página de obrigado, agente, onboarding) | `F2-gatilho-A` ÷ compradores | Base | **5% no mínimo** (parecer 3.5); cenários 4% / 7% / 10%. Abaixo de 5%, o problema é a pergunta, não o público |
| Tempo até o primeiro contato humano | Da etiqueta à primeira mensagem do humano | Mediana | ClickUp (tarefas `F2 · Gatilho A`) | Abaixo de 24 h em 90% dos casos |
| Sessões de arquitetura agendadas | Decisores que marcaram a sessão | Sessões ÷ decisores etiquetados | ClickUp | 25% / 30% / 40% |
| **Custo por decisor etiquetado** | Verba de mídia que originou os decisores ÷ decisores | Verba F2 da coorte ÷ `F2-gatilho-A` da coorte (só compradores vindos de mídia paga; o orgânico entra em linha separada com custo do agente) | Fatura + base | R$ 457 no cenário base (R$ 32 ÷ 7%); R$ 1.375 pessimista; R$ 200 otimista |
| Custo por sessão agendada | Verba da coorte ÷ sessões | | Fatura + ClickUp | R$ 1.524 no cenário base (R$ 457 ÷ 30%) |
| Contratos do Funil 1 originados no Funil 2 | Sessões que viraram contrato, com origem `F2` registrada no CRM do Funil 1 | Contratos ÷ sessões | CRM do Funil 1 (campo de origem `F2`, único ponto de contato entre os funis) | 20% / 25% / 30% (calibrar com a taxa real do Funil 1) |
| **Custo por contrato do Funil 1 originado no Funil 2** | Verba de mídia da coorte ÷ contratos originados | | Fatura + CRM do Funil 1 | R$ 6.095 no cenário base; R$ 27.500 pessimista; R$ 1.667 otimista (parecer 3.4) |
| Margem esperada por decisor | Valor do contrato × margem × taxa de sessão × taxa de fechamento | | Calculado com valores reais do Henrique (`[NÚMERO REAL]` de setup e mensalidade) | R$ 750 a R$ 1.800 (parecer 3.4, hipótese) |
| Percentual de compradores etiquetados `F2-gatilho-B` | Concluiu o mini curso, desenhou um projeto, declara fechar com regularidade, demonstra domínio | `F2-gatilho-B` ÷ compradores do mini curso | Base | Leitura; sem meta (o banco de talentos não gera receita direta) |
| Entrevistas a partir do Gatilho B | Convites feitos quando houver vaga | Contagem | ClickUp | Leitura |

---

## 6. Cadência de leitura e responsáveis

| Cadência | O que se lê | Quem | Onde |
|---|---|---|---|
| Diária (9h) | Verba, compras, CPA F2 por anúncio e conjunto, conversão da página, aceite do bump acumulado, reprovações do agente | `trafego` | Aba `F2 · Diário` e `F2 · Criativos`; relatório salvo no Gerenciador |
| Semanal (segunda, 10h) | Fechamento da semana (aba `F2 · Semana`), decisões de pausa e escala, ranking de posts por comentário com palavra-chave, decisores etiquetados e tempo até o contato humano | `trafego` + coordenador | Aba `F2 · Semana`; ClickUp |
| D+30 e D+90 de cada coorte | Receita líquida em 30 e 90 dias, retorno líquido, NIDflow ativo, churn, sessões e contratos | `trafego` + `automacao` | Aba `F2 · Coortes` |
| Mensal (primeiro dia útil) | Relatório de 30 dias (seção 4.4 do plano de verba); confirmação ou correção de todas as hipóteses deste painel; decisão de fase | Coordenador → Henrique | Documento de fechamento mensal em `campanhas/relatorios/` (criado quando houver dados) |
| Por lançamento | Conversão do lançamento interno da Plataforma NID | `plataforma` + `trafego` | Base |

---

## 7. Exemplo de conta por 1.000 compradores (para calibrar a leitura)

Cenário base do parecer, para o leitor conferir se os números da operação estão perto ou longe da hipótese:

| Linha | Valor |
|---|---|
| Verba F2 (CPA R$ 32) | R$ 32.000 |
| Compras com bump (15%) | 150 |
| Receita líquida no checkout | R$ 33.519 (saldo de R$ 1.519 sobre a mídia) |
| Mini curso avulso pela sequência (3% dos 850 sem bump, em torno de 24 vendas) | R$ 2.825 |
| NIDflow (6% assinam; 60 assinantes × LTV R$ 272) | R$ 16.299 |
| Plataforma NID (3% da base, 30 vendas) | R$ 23.742 |
| Receita líquida do Funil 2 em 12 meses | R$ 79.618 |
| Decisores etiquetados (7%) | 70 |
| Sessões (30%) | 21 |
| Contratos do Funil 1 (25%) | 5 |
| Receita bruta do Funil 1 originada (R$ 20.000 por contrato, `[NÚMERO REAL]` a informar pelo Henrique) | R$ 105.000 |
| Custo por decisor · por sessão · por contrato | R$ 457 · R$ 1.524 · R$ 6.095 |

Leitura: se o CPA F2 real ficar em R$ 32, o front-end empata e todo o resultado vem do NIDflow, da Plataforma NID e do Gatilho A. Se ficar em R$ 40, o front-end perde cerca de R$ 6.500 por 1.000 compradores e o Gatilho A ainda paga a conta no cenário base. Se ficar acima de R$ 40 por 14 dias, a mídia pausa (regra da seção 4.2 do plano de verba).

---

## 8. O que este painel nunca faz

- Não soma verba, compras ou leads do Funil 1 com os do Funil 2. O único cruzamento permitido é o campo de origem `F2` no CRM do Funil 1, lido só para as métricas da seção 5.
- Não usa métrica de vaidade como meta: seguidores, curtidas, alcance orgânico e visualizações são leitura de apoio, nunca critério de decisão.
- Não cita meta como resultado em nenhuma peça. As metas são hipóteses até 30 dias de dados e, depois disso, viram referência interna, não argumento de venda.
- Não mede resultado do comprador (quanto ele vendeu com o método). O brief não promete resultado; o painel não o afirma. Depoimentos reais, quando existirem, são qualitativos e entram nos placeholders das peças.
