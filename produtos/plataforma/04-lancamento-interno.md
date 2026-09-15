# Plataforma NID · Lançamento interno

| Campo | Valor |
|---|---|
| Produto | Plataforma NID (R$ 980 por ano) |
| Versão | 1.0 (Sprint 6) |
| Autor | Agente `plataforma` |
| Status | Entregue ao coordenador, aguardando parecer do `estrategia` e aprovação do Henrique nos pontos marcados |
| Mensagens | Todas as mensagens deste arquivo são **rascunho funcional**: argumento, ordem e CTA. A versão final é do agente `copy`; os disparos, etiquetas e condições são do agente `automacao`; os posts orgânicos da janela são do agente `trafego` |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 5.2, 6.5, 8.1, 10.2, 10.3); `docs/01-parecer-estrategico.md` (seções 2.5, 2.6, 3.3 item 3, 5 decisão 3, 6 itens 5 e 11); `produtos/nidflow/01-plano-de-assinatura.md` (seção 8); `automacoes/05-integracoes.md` (seções 4, 7 e 8); `01-estrutura.md`; `02-catalogo.md`; `03-comunidade-e-encontros.md` |
| Regras do coordenador aplicadas | Primeira abertura só com base de pelo menos 1.500 compradores; opção B de janelas trimestrais com critério de escolha; parcelamento definido aqui, coerente com a Cakto; escassez só verdadeira; metas como hipótese |

Como ler este arquivo: a seção 2 diz quando a primeira janela pode abrir; a seção 3 define a oferta; a seção 4 é a linha do tempo; a seção 5 lista as mensagens por dia e canal; as seções 6 a 9 tratam dos segmentos da base, das metas, de quem não compra e das reaberturas.

---

## 1. O lançamento no arco do método

| Etapa | O lançamento interno |
|---|---|
| Dor | A base já leu o playbook, parte já assistiu às aulas e parte desenha no NIDflow. O que ela diz, nas palavras dela, é: "cada proposta nova traz uma situação que o playbook não cobre, e eu não tenho com quem discutir antes de apresentar" |
| Solução | Um ano dentro do ambiente da NID, praticando o método com revisão da NID em projetos reais |
| Arquitetura | Sete minicursos inclusos, avançados dentro do ambiente, comunidade com resposta em 2 dias úteis, 40 encontros por ano, biblioteca, NIDflow incluso. Tudo mostrado na tela, com o ambiente montado e o calendário publicado |
| Valor | R$ 980 por ano, Pix à vista ou em até 12 vezes no cartão. Menos do que um projeto perdido por proposta mal desenhada; mais do que o NIDflow (R$ 358,80 por ano) e o mini curso (R$ 147) somados, que já estão dentro. Janela com data real de abertura e de fechamento |

Regra que organiza tudo: **a janela existe por operação, não por pressão**. A Plataforma abre em turmas porque a Abertura de turma, a primeira Mesa e a resposta da NID ao primeiro projeto de cada assinante exigem que as pessoas entrem juntas. É isso que a comunicação diz. Nada de "vagas limitadas", contagem regressiva falsa ou "última chance" fora do fato real: a janela fecha na data publicada.

---

## 2. Pré-requisitos para a primeira abertura

Nenhum pode faltar. O coordenador confere a lista e só então a data é marcada.

| # | Pré-requisito | Critério objetivo | Responsável |
|---|---|---|---|
| 1 | **Base mínima** | Pelo menos 1.500 contatos com `F2-comprador-playbook` ou `F2-minicurso`, sem `F2-reembolso`, com pelo menos um canal sem opt-out. Contagem no orquestrador no dia D-30 | `automacao` informa; coordenador confere |
| 2 | Idade da base | Pelo menos 60% desses contatos compraram há mais de 30 dias (já passaram pela sequência do NIDflow e estão no conteúdo contínuo). Motivo: quem comprou ontem ainda não aplicou o método; a Plataforma é para quem já aplica | `automacao` |
| 3 | Catálogo mínimo gravado e publicado | I-01, I-02, I-03 e A-01 no ambiente, com materiais na Biblioteca (`02-catalogo.md`, seção 5.1) | `roteiro`, Henrique, edição |
| 4 | Ambiente testado | Os oito itens de `01-estrutura.md`, seção 6.4, confirmados em conta de teste e registrados em `automacoes/validacao-checkout.md` | `automacao` |
| 5 | Página da Plataforma no ar | `produtos/plataforma/pagina-de-vendas.md` escrita pelo `copy`, implementada pela skill `nid-pages`, com checkout ligado e teste de compra em Pix e cartão em 12 vezes | `copy`, implementação |
| 6 | Calendário publicado | Agenda com o primeiro trimestre completo (6 Mesas, 3 Encontros de Método, 1 Caso NID, Abertura de turma) com datas reais | `plataforma`, Henrique |
| 7 | NIDflow incluso funcionando | Item B-13 do backlog aceito: compra da Plataforma cria a conta do NIDflow; assinante mensal não recebe cobrança dupla | `nidflow` |
| 8 | Vídeos gravados | Vídeo de boas-vindas (3 minutos) e vídeo da oferta (5 a 7 minutos) editados | Henrique |
| 9 | Equipe da janela | Pessoa da moderação escalada para responder o direct, o WhatsApp e a comunidade durante os 7 dias da janela e os 14 seguintes; agente de IA com a base de respostas da Plataforma carregada | `automacao`, coordenador |
| 10 | Bônus da janela existente | O bônus da seção 3.3 está publicado no ambiente antes de ser prometido | `plataforma` |

Se o pré-requisito 1 não for atingido, a Plataforma não abre. Não há versão reduzida da janela para base pequena: um lançamento para 400 pessoas rende, no cenário base, 12 assinantes, o que não paga a operação e queima a oferta (`docs/01-parecer-estrategico.md`, seção 3.3, item 3).

---

## 3. A oferta de lançamento

### 3.1 O que está incluso (vale em toda janela)

1. Trilha "O método na prática": os sete minicursos inclusos, os já publicados e os que forem publicados durante a anuidade (um por trimestre).
2. Aulas do mini curso e materiais do playbook na Biblioteca, mesmo para quem não comprou os dois.
3. Comunidade da NID com resposta a todo projeto na mesa em até 2 dias úteis.
4. Agenda: 24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID e a Abertura de turma, todos gravados.
5. Biblioteca: os cinco templates, o modelo de proposta em nove páginas, o roteiro de apresentação, o checklist de reunião, o banco de objeções, a régua de follow-up e os projetos por segmento.
6. NIDflow incluso durante toda a anuidade (valor de referência: R$ 358,80 por ano).
7. Garantia de 7 dias, reembolso sem pergunta.

O que não está incluso e é dito na página: os minicursos avançados (vendidos dentro do ambiente a partir de R$ 197) e qualquer serviço da NID do Funil 1.

### 3.2 Preço e parcelamento (decisão deste arquivo)

| Item | Regra |
|---|---|
| Preço | R$ 980 por ano. Não muda em nenhuma janela |
| Pix | R$ 980 à vista. É a forma preferida pela NID (taxa de R$ 2,49 na Cakto) e a página a mostra primeiro |
| Cartão | Em até 12 vezes. O custo do parcelamento é o da operadora, incorporado ao valor pago pelo comprador (regra padrão do checkout da Cakto: o produtor recebe o valor cheio antecipado). O valor da parcela aparece no checkout; nenhuma peça cita valor de parcela até o item 4 do checklist de `01-estrutura.md`, seção 6.4, confirmar o valor real |
| Comunicação | "R$ 980 por ano. Pix à vista ou em até 12 vezes no cartão." Só isso. Nenhuma peça escreve "sem juros" |
| Por que a NID não absorve o parcelamento | A receita líquida por anuidade no cartão já fica em torno de R$ 791 (parecer, seção 3.1). Absorver 12 vezes custaria, por hipótese de mercado, entre R$ 100 e R$ 160 a mais por venda, e o comprador que quer parcelar faz isso no cartão de qualquer forma. A referência de mercado citada no parecer (Finclass) absorve; a NID não vende assinatura em massa e não precisa competir nesse detalhe |
| Alternativa, se o Henrique preferir | "12 × R$ 81,67 sem acréscimo" com a NID absorvendo o custo. Só vale se o teste da Cakto confirmar a opção e o custo ficar abaixo de R$ 110 por venda (hipótese de corte). Ponto para aprovação, seção 10 |
| Renovação | Automática em 12 meses, pelo mesmo valor, avisada em D-60, D-30 e D-7 (`05-retencao-e-renovacao.md`, seção 4). Cancelar a renovação é um clique em "Minha conta" |
| Assinante do NIDflow mensal | Não paga duas vezes: a mensal encerra no ciclo seguinte (`produtos/nidflow/01-plano-de-assinatura.md`, seção 8). A página e o e-mail dizem isso em uma frase |

### 3.3 Bônus da janela (real, específico de cada janela)

Regra: cada janela tem um único bônus, que existe antes de ser prometido, e que depois da janela passa a ser vendido pelo preço normal. É verdade que ele é da janela; por isso pode ser dito.

| Janela | Bônus | Por que é verdadeiro | Valor de referência |
|---|---|---|---|
| 1 (primeira abertura) | Minicurso avançado A-01, Projeto de automação comercial com IA, incluso para quem entrar nesta janela | O A-01 é publicado para a janela 1; a partir da janela 2 é vendido dentro do ambiente por R$ 197 | R$ 197 |
| 2 em diante | Definido 30 dias antes da abertura, entre: o avançado publicado no semestre (A-02, depois A-03) incluso; ou uma Mesa de Projetos fechada para a turma nova (uma sessão a mais, com 4 projetos da turma) | O avançado ou a Mesa existem e têm data antes de a janela abrir | R$ 197 ou uma Mesa |

Nunca: dois bônus na mesma janela, bônus "vitalício", bônus que não está pronto, bônus com valor inventado.

### 3.4 Condição de fundador (só na janela 1, nunca mais)

Quem entra na primeira abertura recebe a etiqueta `F2-plataforma-fundador` (`01-estrutura.md`, seção 8) e três coisas que a NID pode cumprir e que só fazem sentido na primeira turma:

| Condição | O que é | Por que só na janela 1 | Custo real para a NID |
|---|---|---|---|
| Revisão por escrito de um projeto | Nos primeiros 60 dias, cada fundador envia um projeto pelo formulário de "Projetos na mesa" marcado como "revisão de fundador"; alguém da NID devolve a revisão completa por escrito, página por página, em até 5 dias úteis | Com 45 fundadores (cenário base) são 45 revisões em 60 dias; com turmas maiores e mais frequentes, não cabe | 45 × 40 minutos: cerca de 30 horas (hipótese) |
| Voto no catálogo | Os fundadores votam, no mês 12, nos dois inclusos do ano 2 (`02-catalogo.md`, seção 5.3), e o voto deles tem peso dobrado | A primeira turma é a que vive o catálogo inteiro sendo construído | Zero |
| Selo de fundador | Marca no perfil da comunidade e em "Minha conta", permanente enquanto a anuidade estiver ativa | É um fato: a pessoa entrou na primeira turma | Zero |

O que a condição de fundador não é: não é preço menor (o brief proíbe), não é preço travado (a NID não promete o que não controla) e não é "acesso vitalício".

### 3.5 Escassez verdadeira: o que pode e o que não pode ser dito

| Pode ser dito (é verdade e é comprovável) | Não pode ser dito |
|---|---|
| "A janela abre terça, dia [data], às 10h, e fecha segunda, dia [data], às 23h59." | "Últimas vagas", "vagas limitadas", "restam X vagas" |
| "Depois disso, a próxima abertura é em [mês]." (só quando o mês já estiver decidido; se não estiver, "a próxima abertura será avisada com 30 dias de antecedência") | "Pode ser a última abertura", "não sabemos se vai abrir de novo" |
| "O A-01 está incluso só nesta janela. Depois é vendido dentro do ambiente por R$ 197." | "Bônus exclusivo que nunca mais vai existir" (o minicurso continua existindo) |
| "A condição de fundador é da primeira turma. Não vai existir na segunda." | "Preço de fundador", "preço vai subir" |
| "A turma começa junto na quinta, dia [data], na Abertura de turma." | "Você vai ficar para trás" |
| "R$ 980 por ano. 7 dias de garantia, reembolso sem pergunta." | "Só hoje", "promoção", "desconto" |

Contagem regressiva na página: permitida somente com a data real de fechamento e somente nos dois últimos dias da janela. Fora disso, a página mostra a data por extenso.

### 3.6 Turma mínima (regra operacional, dita na página)

A Abertura de turma e a primeira Mesa acontecem com qualquer número de assinantes. Não existe "turma mínima" como condição de venda, porque isso seria escassez ao contrário. Se uma janela render menos de 10 assinantes (hipótese de piso), o coordenador registra e a regra de reabertura da seção 9 decide o que muda; quem comprou recebe tudo o que foi prometido.

---

## 4. Linha do tempo

### 4.1 Visão geral

| Fase | Dias | Objetivo | Canais |
|---|---|---|---|
| Aquecimento | D-21 a D-8 | Nomear a dor de quem já aplica o método e mostrar que existe um lugar para praticá-lo; recolher interesse | E-mail semanal, orgânico (Instagram e LinkedIn), agente de IA |
| Pré-abertura | D-7 a D-1 | Anunciar data, mostrar o ambiente e o calendário, explicar a oferta antes de abrir | E-mail, WhatsApp (uma mensagem), orgânico, vitrine na área de membros |
| Abertura | D0 (terça, 10h) a D+6 (segunda, 23h59) | Vender, responder objeções, mostrar a Mesa ao vivo | E-mail diário, WhatsApp (três mensagens), vitrine, agente de IA, Mesa aberta em D+2 |
| Fechamento | D+6, 23h59 | Fechar o checkout na hora publicada | Checkout desligado pelo `automacao`; página muda para "próxima abertura" |
| Pós-janela | D+7 a D+21 | Onboarding de quem entrou; despedida de quem não entrou; Abertura de turma em D+9 | E-mail, ambiente, encontro |

Dia da semana: D0 é sempre terça-feira. Motivo: o e-mail de abertura chega em dia útil, a Mesa aberta cai na quinta (D+2), o fim de semana fica no meio da janela (quem pensa tem tempo) e o fechamento cai na segunda à noite, quando a pessoa está de volta ao trabalho e à proposta que precisa desenhar. Duração: 7 dias. Menos do que isso não dá tempo de ver a Mesa aberta e decidir; mais do que isso é pressão prolongada.

### 4.2 Aquecimento (D-21 a D-8)

Três semanas, um tema por semana, no arco do método. Nenhuma peça vende; toda peça termina com uma pergunta ou com o convite para responder.

| Semana | Tema | Peças | Saída |
|---|---|---|---|
| D-21 a D-15 | **Dor**: "o que trava você depois do playbook". E-mail com as cinco situações que mais aparecem quando alguém aplica o método sozinho (cliente sem número, tese recusada, projeto grande, comitê, renovação) e uma pergunta de um clique: "qual destas é a sua?" | E-mail LA1; 3 posts orgânicos (um por dia útil alternado) com uma situação cada e CTA "responde nos comentários qual é a sua"; agente de IA registra a resposta | Campo `situacao_trava` na base; `F2-interesse-plataforma` para quem responde que quer saber quando abre |
| D-14 a D-8 | **Solução**: "o que a NID faz quando isso acontece". E-mail com a revisão por escrito de um projeto real (por segmento, com autorização) no formato "Projeto da semana", mostrando como a NID devolve um projeto melhor | E-mail LA2; 3 posts orgânicos com um trecho da revisão cada; um vídeo curto do Henrique como sócio da NID revisando uma página no NIDflow | Mais respostas de interesse; base entende o formato "projeto na mesa" |
| D-7 (fim do aquecimento) | Transição para a pré-abertura | LA3 é substituído por LP1 (abaixo) | |

Quem não comprou o playbook (`F2-lead-direct`, `F2-lead-whatsapp`, `F2-checkout-abandonado`) recebe só o orgânico e o agente. O caminho para esse contato começa pelo playbook, e o agente responde exatamente isso quando perguntado sobre a Plataforma. Decisão deste arquivo (o brief fala em "compradores e leads"; a sequência por e-mail e WhatsApp vai a compradores).

### 4.3 Vídeo da oferta (roteiro funcional, 5 a 7 minutos, Henrique grava)

Gravado dentro do ambiente, com a tela do ambiente e do NIDflow, sem estúdio. O `copy` finaliza o texto; a estrutura é esta:

1. **Apresentação (15 segundos)**: "Sou o Henrique, sócio da NID. Este é o ambiente em que a gente pratica o método com quem já leu o playbook."
2. **Dor (45 segundos)**: as cinco situações do aquecimento, em uma frase cada, nas palavras da base (usar as respostas reais de LA1, sem nome).
3. **Solução (30 segundos)**: "o que faltava não é mais método; é praticar com revisão. Aqui todo projeto passa pela mesa antes de ir para o cliente."
4. **Arquitetura (3 minutos, tela)**: navegar pelo ambiente na ordem do menu: Início (comece por aqui), Trilhas (os três inclusos publicados e o que vem por trimestre), Comunidade (um post real de "Projetos na mesa" com a resposta da NID), Agenda (o calendário do trimestre com as datas), Biblioteca, NIDflow (o mesmo login). Uma frase por área. Mostrar a vitrine do A-01 e dizer que está incluso nesta janela.
5. **Valor (1 minuto)**: "R$ 980 por ano, Pix ou em até 12 vezes no cartão. Dentro disso estão o NIDflow, que sozinho é R$ 358,80 por ano, as aulas do mini curso e sete minicursos. Um projeto perdido por proposta mal desenhada custa mais do que isso. 7 dias de garantia."
6. **Janela e próximo passo (30 segundos)**: data de abertura e de fechamento, Abertura de turma na quinta seguinte, condição de fundador em uma frase, CTA oficial.

O vídeo não usa a imagem do Henrique como argumento ("aprenda comigo"). Ele mostra o ambiente e o método.

### 4.4 Pré-abertura (D-7 a D-1)

| Dia | O que acontece |
|---|---|
| D-7 (terça) | E-mail LP1 com a data de abertura e de fechamento, o vídeo da oferta e a página no ar em modo "abre dia [data]" (com a oferta completa visível e o botão "Avise-me quando abrir", que aplica `F2-interesse-plataforma`). Vitrine na área de membros de quem tem playbook ou mini curso |
| D-5 (quinta) | E-mail LP2: o catálogo e o calendário (o que está publicado, o que vem por trimestre, as datas reais do primeiro trimestre). Post orgânico com a agenda |
| D-3 (sábado) | Sem e-mail. Post orgânico: uma pergunta de "Dúvidas do método" respondida pela NID |
| D-1 (segunda) | E-mail LP3: "amanhã às 10h". O que é a condição de fundador, o bônus da janela e a regra de fechamento. WhatsApp LP3w para quem autorizou: uma linha com a hora e o link da página |
| D-1, 18h | Agente de IA recebe a base de respostas da Plataforma (seção 6.3); pessoa da moderação de prontidão |

### 4.5 Abertura (D0 a D+6)

| Dia | O que acontece |
|---|---|
| D0 (terça), 9h | Link do checkout enviado uma hora antes para quem tem `F2-interesse-plataforma` (e-mail LD0i). É um acesso antecipado real: o checkout já está aberto |
| D0, 10h | E-mail LD0 para toda a base elegível; WhatsApp LD0w às 10h15; página em modo "aberto"; vitrine na área de membros troca para "aberto até [data]"; evento `F2_plataforma_janela_aberta` |
| D+1 (quarta) | E-mail LD1: a arquitetura completa (o que está incluso, item por item, com o que cada item significa para quem vende) e a conta do valor |
| D+2 (quinta), 19h | **Mesa aberta**: uma Mesa de Projetos ao vivo, aberta a toda a base, com 3 projetos de compradores que se inscreveram pelo formulário (enviado em LD1). Henrique conduz como sócio da NID. Nos últimos 5 minutos, a única menção de venda: a janela fecha segunda às 23h59, o link está na página. Gravação disponível por 48 horas para a base (até D+4, 23h59), depois só dentro do ambiente. E-mail LD2 pela manhã com o lembrete e o link |
| D+3 (sexta) | E-mail LD3: a gravação da Mesa aberta (48 horas) e as perguntas mais feitas ao agente e no direct nos três primeiros dias, respondidas (as objeções da seção 6.2) |
| D+4 (sábado) | Sem e-mail. Post orgânico com um trecho da Mesa aberta |
| D+5 (domingo) | E-mail LD5, 10h: "para quem é e para quem não é" (os quatro perfis do ICP e o que cada um faz no ambiente; quem não deve entrar: quem ainda não aplicou o playbook em uma proposta real). Fecha com "a janela fecha amanhã às 23h59". WhatsApp LD5w, 10h15, uma linha com o fato |
| D+6 (segunda) | E-mail LD6a, 9h: "hoje é o último dia": resumo da oferta em dez linhas, o bônus, a condição de fundador, a garantia, a hora do fechamento. E-mail LD6b, 18h: "fecha às 23h59": só o fato, o link e uma pergunta ("qual proposta você quer levar para a primeira Mesa?"). WhatsApp LD6w, 20h, uma linha. Contagem regressiva na página ligada desde D+5 |
| D+6, 23h59 | Checkout fechado pelo `automacao` (link desligado, página em modo "fechado"); Pix gerado antes de 23h59 tem até 1 hora para ser pago (regra da plataforma de checkout, a confirmar); evento `F2_plataforma_janela_fechada` |

### 4.6 Pós-janela (D+7 a D+21)

| Dia | Quem comprou | Quem não comprou |
|---|---|---|
| D+7 (terça) | Já está no onboarding de `01-estrutura.md`, seção 5 (o acesso é imediato desde a compra). E-mail da NID: "a turma começa quinta" com o link da Abertura de turma e a instrução de colocar o projeto na mesa antes | E-mail LF1: "a janela fechou", a próxima abertura (mês, se decidido; senão, "avisada com 30 dias de antecedência"), o que continua disponível (o playbook, o mini curso, o NIDflow mensal), sem pedir desculpa e sem "última chance". Etiqueta `F2-plataforma-nao-comprou-j1` |
| D+9 (quinta), 19h | Abertura de turma (`03-comunidade-e-encontros.md`, seção 6.5) | Nada |
| D+14 | Primeira Mesa de Projetos com a turma nova | Volta ao conteúdo contínuo. Quem não assina o NIDflow e já passou pela sequência D+7 recebe, no conteúdo contínuo, no máximo uma menção mensal ao NIDflow (regra de `automacoes/03-oferta-nidflow-d7.md`, seção 1.2) |
| D+21 | Marco M2 e M3 acompanhados (`05-retencao-e-renovacao.md`) | Nada |

---

## 5. Mensagens por dia e canal (rascunho funcional para o `copy`)

Regras que valem para todas:

- Remetente "NID". Henrique aparece só no vídeo e na Mesa aberta, como sócio da NID.
- Um e-mail por dia no máximo; WhatsApp em quatro momentos (LP3w, LD0w, LD5w, LD6w), só para quem autorizou e sem `F2-optout-whatsapp`.
- Um único link e um único CTA por mensagem. CTA oficial da Plataforma: **"Quero praticar o método com a NID por R$ 980 por ano"** (proposta deste arquivo; o `copy` pode ajustar mantendo o padrão "o que acontece depois do clique"). Nos toques de aquecimento o CTA é a pergunta ou "Quero ser avisado da abertura".
- UTMs: `utm_source=email|whatsapp`, `utm_medium=sequencia`, `utm_campaign=F2-plataforma-lancamento-AAAAMM`, `utm_content=` código da mensagem em minúsculas.
- Nenhuma mensagem usa "vagas", "última chance", "promoção", "desconto", "mentoria", "curso", "comunidade do Henrique". "Plataforma NID" e "o ambiente da NID" sempre.
- Preço sempre como `R$ 980`. Parcela sem valor até confirmação (seção 3.2).

| Código | Dia e hora (Brasília) | Canal | Para quem | Objetivo | Conteúdo funcional | CTA |
|---|---|---|---|---|---|---|
| LA1 | D-21, terça, 10h | E-mail | Base elegível (seção 6.1) | Nomear a dor | Assunto "O que trava você depois do playbook?". Abre com a frase da base ("cada proposta nova traz uma situação que o playbook não cobre"). As cinco situações, uma linha cada. Pergunta de um clique: qual é a sua. Sem menção à Plataforma | Cinco botões de resposta |
| LA2 | D-14, terça, 10h | E-mail | Base elegível | Mostrar o formato "projeto na mesa" | Assunto "Um projeto na mesa, página por página". A revisão por escrito de um projeto real por segmento: a dor (o que faltava), a solução (o que mudou), o desenho (o bloco que não tinha marco), o valor (a régua errada). Fecha: "é assim que a NID revisa os projetos dela e é assim que vai revisar o seu". Botão "Quero ser avisado quando o ambiente abrir" (aplica `F2-interesse-plataforma`) | "Quero ser avisado da abertura" |
| LP1 | D-7, terça, 10h | E-mail | Base elegível | Anunciar a janela | Assunto "A Plataforma NID abre dia [data]". Vídeo da oferta (imagem com link). As datas de abertura e de fechamento por extenso. O que está incluso em sete linhas. R$ 980 por ano, Pix ou até 12 vezes. Condição de fundador em uma frase. Link para a página em modo "abre dia [data]" | "Ver o ambiente e a oferta" |
| LP2 | D-5, quinta, 10h | E-mail | Base elegível | Arquitetura: catálogo e calendário | Assunto "O que tem dentro e quando acontece". Os três inclusos publicados (nome e promessa), os quatro que vêm por trimestre, o A-01 incluso nesta janela, o calendário do primeiro trimestre com as datas reais, os cinco espaços da comunidade e a regra das 2 dias úteis | "Ver o calendário do trimestre" |
| LP3 | D-1, segunda, 10h | E-mail | Base elegível | Regras da janela | Assunto "Amanhã às 10h". A janela abre terça às 10h e fecha segunda às 23h59. Condição de fundador (as três coisas). Bônus da janela. Turma começa quinta, dia [data]. Garantia de 7 dias. Quem tem `F2-interesse-plataforma` recebe o link às 9h | "Quero ser avisado da abertura" (para quem ainda não está na lista) |
| LP3w | D-1, segunda, 10h15 | WhatsApp (modelo, marketing) | Base elegível com autorização | Lembrete | "Aqui é a NID. Amanhã às 10h abre a Plataforma NID, o ambiente em que a gente pratica o método com quem já leu o playbook. Fecha segunda, dia [data], às 23h59. A página com tudo: {link}." | Link da página |
| LD0i | D0, terça, 9h | E-mail | `F2-interesse-plataforma` | Acesso antecipado real | Assunto "Seu link, uma hora antes". Uma frase de agradecimento pela resposta, o link do checkout, o resumo em cinco linhas | CTA oficial |
| LD0 | D0, terça, 10h | E-mail | Base elegível | Abrir | Assunto "Aberto: a Plataforma NID". Arco completo em versão curta: dor (a frase da base), solução (o ambiente), arquitetura (sete itens, um por linha, com o que cada um significa para quem vende), valor (R$ 980 por ano, a conta com o NIDflow e o mini curso dentro, um projeto perdido custa mais), janela (fecha segunda às 23h59), fundador, bônus, garantia. Variante para assinante do NIDflow: parágrafo "sua mensal encerra no ciclo seguinte, sem cobrança dupla" | CTA oficial |
| LD0w | D0, terça, 10h15 | WhatsApp (modelo, marketing) | Base elegível com autorização | Abrir | "Aqui é a NID. A Plataforma NID está aberta até segunda, dia [data], às 23h59. R$ 980 por ano, Pix ou em até 12 vezes, com o NIDflow incluso e 7 dias de garantia: {link}." | Link do checkout |
| LD1 | D+1, quarta, 10h | E-mail | Base elegível sem compra | Arquitetura e valor em detalhe | Assunto "O que está incluso, item por item". Os sete itens da seção 3.1 com "o que isso significa para você" em cada um. A conta: NIDflow R$ 358,80 + mini curso R$ 147 já dentro, mais sete minicursos, 40 encontros, comunidade. Convite para a Mesa aberta de quinta às 19h com o formulário de inscrição de projeto (3 vagas de apresentação, o que é verdade: 3 projetos por Mesa aberta) | CTA oficial; link secundário do formulário da Mesa aberta |
| LD2 | D+2, quinta, 10h | E-mail | Base elegível sem compra | Lembrete da Mesa aberta | Assunto "Hoje às 19h: três projetos na mesa, ao vivo". O que vai acontecer (Henrique, sócio da NID, revisa três projetos de compradores do playbook, página por página). Link do ao vivo. Uma linha: a janela fecha segunda | "Reservar meu lugar na Mesa aberta" |
| LD3 | D+3, sexta, 10h | E-mail | Base elegível sem compra | Objeções | Assunto "A gravação da Mesa e as cinco perguntas mais feitas". Link da gravação (disponível até domingo às 23h59). As cinco objeções da seção 6.2 respondidas em um parágrafo cada | CTA oficial |
| LD5 | D+5, domingo, 10h | E-mail | Base elegível sem compra | Para quem é e para quem não é | Assunto "Para quem é (e para quem ainda não é)". Os quatro perfis do ICP e o que cada um faz no ambiente no primeiro mês. Para quem ainda não é: quem não aplicou o playbook em uma proposta real (sugestão: aplicar primeiro; a próxima abertura vem). Fecha com o fato: amanhã às 23h59 | CTA oficial |
| LD5w | D+5, domingo, 10h15 | WhatsApp (modelo, marketing) | Base elegível com autorização, sem compra | Fato do prazo | "Aqui é a NID. A Plataforma NID fecha amanhã, segunda, às 23h59. Se a sua próxima proposta merece passar pela mesa antes de ir para o cliente, o link é este: {link}." | Link do checkout |
| LD6a | D+6, segunda, 9h | E-mail | Base elegível sem compra | Último dia | Assunto "Fecha hoje às 23h59". A oferta em dez linhas: incluso, NIDflow, bônus, fundador, R$ 980, Pix ou 12 vezes, garantia, turma quinta, próxima abertura. Nada além do fato | CTA oficial |
| LD6b | D+6, segunda, 18h | E-mail | Base elegível sem compra | Fechamento | Assunto "Seis horas". Três linhas: o link, a hora, a pergunta "qual proposta você quer levar para a primeira Mesa, dia [data]?" | CTA oficial |
| LD6w | D+6, segunda, 20h | WhatsApp (modelo, marketing) | Base elegível com autorização, sem compra | Fechamento | "Aqui é a NID. Última mensagem sobre a Plataforma NID nesta janela: fecha hoje às 23h59. {link}." | Link do checkout |
| LF1 | D+7, terça, 10h | E-mail | Base elegível sem compra | Encerrar sem pressão | Assunto "A janela fechou". Fechou às 23h59 de ontem. Próxima abertura em [mês] ou "avisada com 30 dias de antecedência". O que continua: o playbook, as aulas, o NIDflow mensal (uma linha, sem oferta). Botão "Quero ser avisado da próxima abertura". Aplica `F2-plataforma-nao-comprou-j1` | "Quero ser avisado da próxima abertura" |
| LT1 | D+7, terça, 10h | E-mail | Quem comprou | Turma | Assunto "A turma começa quinta às 19h". Link da Abertura de turma. Os três passos de "Comece por aqui" (o NIDflow ativo, o projeto na mesa, a primeira aula). Instrução: coloque o projeto na mesa antes de quinta | "Reservar meu lugar na Abertura de turma" |

Posts orgânicos da janela (D-21 a D+6): calendário e criativos são do `trafego`, dentro do plano de conteúdo de `campanhas/`, com CTA "comente [palavra-chave]" que aciona o agente. Palavra-chave sugerida: `F2-kw-mesa`. O agente responde com a página e faz as perguntas de qualificação (Gatilho A continua valendo durante a janela).

---

## 6. Segmentos da base e variações

### 6.1 Quem recebe a sequência

| Segmento | Etiquetas | Recebe | Variação |
|---|---|---|---|
| Comprador do playbook ou do mini curso, sem Plataforma | `F2-comprador-playbook` ou `F2-minicurso`; sem `F2-plataforma-ativo`, sem `F2-reembolso` | Tudo | Padrão |
| Assinante do NIDflow mensal | mais `F2-nidflow-ativo` | Tudo | Parágrafo "sem cobrança dupla" em LD0 e na página; a conta do valor cita "o NIDflow que você já usa está dentro" |
| Ex-assinante do NIDflow (leitura ou cancelado) | `F2-nidflow-leitura` ou `F2-nidflow-cancelado` | Tudo | LD1 cita que a conta do NIDflow reativa com os projetos (se dentro de 90 dias) |
| Interessado antes da janela | `F2-interesse-plataforma` | Tudo, mais LD0i às 9h | Acesso antecipado de uma hora |
| Decisor (Gatilho A) | `F2-gatilho-A` | Tudo | Nenhuma variação automática; o humano do Funil 1 vê no contexto que a pessoa está na janela e não sobrepõe o convite nos 7 dias (regra "uma mensagem humana por dia por contato") |
| Cliente do Funil 1 | `F2-funil1-cliente` | Nada automático | O humano do Funil 1 decide se convida (decisão deste arquivo: cliente da consultoria não recebe lançamento automático) |
| Conversa humana aberta | `F2-humano` | E-mails sim; WhatsApp não | Regra geral do orquestrador |
| Opt-out | `F2-optout-email` ou `F2-optout-whatsapp` | Só o canal permitido | |
| Lead sem compra | `F2-lead-direct`, `F2-lead-whatsapp`, `F2-checkout-abandonado` | Nada por e-mail ou WhatsApp | Orgânico e agente; o caminho começa pelo playbook |
| Comprou durante a janela | `F2-plataforma-ativo` | Sai da sequência no ato; recebe LT1 | |

### 6.2 As cinco objeções (base para LD3, para a página e para o agente)

| Objeção (nas palavras da base) | Resposta funcional (arco) |
|---|---|
| "R$ 980 é muito para mim agora." | Valor: dentro estão o NIDflow (R$ 358,80 por ano) e as aulas do mini curso (R$ 147); o resto é a prática com a NID. Um projeto perdido por proposta mal desenhada custa mais do que isso. Pix ou em até 12 vezes. 7 dias de garantia. E, com honestidade: se ainda não aplicou o playbook em uma proposta real, aplique primeiro; a próxima abertura vem |
| "Não tenho tempo para comunidade e encontro." | Arquitetura: o mínimo que funciona é uma Mesa por mês (gravada, com índice) e um projeto na mesa quando tiver proposta. O ambiente foi feito para quem vende de dia: encontros às 19h, gravação em 2 dias úteis, resposta por escrito |
| "Já tenho o playbook e o NIDflow. O que muda?" | Solução: o que muda é a revisão. No playbook o método é seu; no ambiente, o projeto passa por outros olhos e pela NID antes do cliente. E o catálogo trata do que o playbook não cobre (cliente sem número, tese recusada, fases, comitê, renovação) |
| "Isso é mais um curso." | Dor e solução: não tem aula para assistir e sumir. Tem projeto real na mesa, resposta da NID em 2 dias úteis e uma Mesa a cada quinze dias. Os minicursos existem para a situação que apareceu na sua proposta, não para "aprender vendas" |
| "E se eu não usar?" | Valor: 7 dias de garantia, reembolso sem pergunta. Depois disso, renovação automática avisada em D-60, D-30 e D-7, cancelável em um clique. Ninguém fica preso |

### 6.3 Base de respostas do agente de IA durante a janela (para o `automacao`)

O agente responde sobre a Plataforma com estas regras, além das do `automacoes/01-agente-direct-whatsapp.md`:

1. Fala como a NID. Nunca "o curso do Henrique".
2. Preço e condições: exatamente os da seção 3. Nenhum desconto, nenhuma condição fora do brief, nenhum valor de parcela.
3. Datas: as reais da janela. Depois do fechamento, responde que a janela fechou e oferece o aviso da próxima.
4. Objeções: as cinco da seção 6.2.
5. Quem não comprou o playbook: apresenta o playbook primeiro.
6. Perguntas de qualificação do Gatilho A continuam sendo feitas.
7. Pedido de reembolso, cobrança ou acesso: encaminha ao humano.

---

## 7. Metas de conversão (hipóteses, sem dado)

Tudo abaixo é hipótese até a primeira janela produzir dados. Nenhuma peça cita estes números. Base de referência: 1.500 contatos elegíveis. Receita líquida por anuidade: R$ 791,41 (parecer, seção 3.1, com taxa conservadora; na Cakto no cartão fica maior; no Pix, maior ainda).

| Indicador | Pessimista | Base | Otimista | Como medir |
|---|---|---|---|---|
| Abertura de LA1 | 30% | 40% | 50% | E-mail |
| Respostas à pergunta de LA1 | 5% da base | 10% | 15% | Campo `situacao_trava` |
| `F2-interesse-plataforma` antes de D0 | 6% da base (90) | 12% (180) | 20% (300) | Etiqueta |
| Visitas à página durante a janela | 20% da base | 30% | 40% | Página |
| Conversão da janela (compras sobre a base elegível) | 1,5% (23) | 3% (45) | 5% (75) | `F2_plataforma_compra` |
| Conversão de quem tinha `F2-interesse-plataforma` | 10% | 15% | 20% | Cruzamento |
| Compras no Pix | 30% | 40% | 50% | Forma de pagamento |
| Reembolsos em 7 dias | 8% | 5% | 3% | `F2_plataforma_reembolso` |
| Receita líquida da janela (após reembolso) | cerca de R$ 16.700 | cerca de R$ 33.800 | cerca de R$ 57.600 | Financeiro |
| Compras entre D+5 e D+6 (peso do fechamento) | 40% das compras | 50% | 60% | Data da compra |

Leitura: no cenário base, a janela 1 paga a montagem e o primeiro ano de operação (`01-estrutura.md`, seção 7). No pessimista, paga a montagem e parte da operação; a decisão sobre a janela 2 leva isso em conta (seção 9).

Critérios de revisão depois da janela 1 (para o coordenador): se a conversão ficar abaixo de 1,5%, o problema provável é a oferta ou o momento da base (idade), não o preço; se as visitas à página ficarem abaixo de 20%, o problema é o aquecimento; se o reembolso passar de 8%, o problema é a promessa da página contra o que o ambiente entrega no primeiro dia.

---

## 8. Quem não compra

1. Recebe LF1 em D+7, sem pressão, com o botão de aviso da próxima abertura.
2. Recebe a etiqueta `F2-plataforma-nao-comprou-j[n]` (com o número da janela). Serve para medir quantas janelas uma pessoa vê antes de comprar e para não repetir o aquecimento inteiro a quem já viu (na janela seguinte, LA1 é substituída por uma versão curta).
3. Continua na esteira: conteúdo contínuo, NIDflow mensal (uma menção por mês no máximo se não assina), Gatilho A e Gatilho B normalmente.
4. Não recebe nenhuma mensagem sobre a Plataforma até D-21 da janela seguinte. A única exceção: quem clicar em "Quero ser avisado da próxima abertura" recebe o aviso da data assim que ela existir.
5. Se perguntar ao agente, recebe a data da próxima abertura (se decidida) e o convite para a lista.
6. Nunca recebe "reabrimos por 24 horas", "o carrinho voltou" ou qualquer reabertura fora do calendário da seção 9.

---

## 9. Regras de reabertura

### 9.1 As duas opções

| | Opção A: duas janelas por ano (brief, seção 5) | Opção B: janelas trimestrais (parecer, seção 6, item 11) |
|---|---|---|
| Calendário | Mês 1 e mês 7 (para a base, "março e setembro", ajustado à data real da janela 1) | Mês 1, 4, 7 e 10 |
| Quem entra | Quem comprou o playbook até D-30 de cada janela | Idem, com base menor por janela |
| Vantagem | Janela maior, mais compras por evento, menos operação de lançamento, mais tempo entre turmas para a NID responder | Receita distribuída; quem compra o playbook espera no máximo 3 meses; turmas menores, mais fáceis de acolher na Mesa |
| Custo | Base espera até 6 meses; quem comprou o playbook logo depois de uma janela esfria | Quatro lançamentos por ano (cada um com 3 semanas de aquecimento e 1 de janela: 16 semanas do ano em modo lançamento); risco de fadiga da base |
| Bônus | Um avançado por janela (A-02 e A-03 coincidem com as duas janelas) | Alternar avançado e Mesa fechada |

### 9.2 Critério de escolha (decisão deste arquivo)

A janela 1 é sempre única. A escolha entre A e B é feita 30 dias depois do fechamento da janela 1, com estes critérios, todos objetivos:

| Critério | Opção B (trimestral) se | Opção A (semestral) se |
|---|---|---|
| Crescimento da base | Entraram pelo menos 400 novos compradores nos 90 dias anteriores (hipótese: 400 × 3% = 12 assinantes por janela, o piso da seção 3.6) | Menos de 400 |
| Conversão da janela 1 | Igual ou acima de 3% | Abaixo de 3% (uma janela maior concentra melhor a base) |
| Capacidade da NID | A moderação e o Henrique cumpriram o prazo de 2 dias úteis em pelo menos 90% dos posts da turma 1 | Abaixo de 90%: a NID precisa de mais tempo entre turmas |
| Catálogo | Pelo menos um incluso novo publicado desde a última janela (é o que a janela seguinte tem de novo para mostrar) | Se não houver incluso novo, a janela não abre, seja qual for a opção |

Os quatro critérios precisam apontar para B para a opção B ser adotada. Caso contrário, A. A escolha é revista a cada dois ciclos.

### 9.3 Regras que valem para toda janela, seja A ou B

1. Duração de 7 dias, de terça a segunda, com abertura e fechamento na hora publicada.
2. Data anunciada com pelo menos 30 dias de antecedência na página, na área de membros e para `F2-interesse-plataforma`.
3. Um bônus real e específico da janela (seção 3.3). Condição de fundador nunca mais.
4. Nunca duas janelas com menos de 90 dias entre o fechamento de uma e a abertura da outra.
5. Entre janelas, a página fica no ar em modo "próxima abertura em [mês]" com a oferta completa visível e o botão de aviso. A pessoa que compra o playbook entre janelas vê, na área de membros, a vitrine da Plataforma com a próxima data.
6. Ex-assinante (`F2-plataforma-expirada`) reativa a qualquer momento por "Minha conta", sem esperar janela. Motivo: a janela existe para receber quem não conhece o ambiente; quem já foi assinante não precisa de Abertura de turma. Renovação de assinante ativo também independe de janela.
7. Nenhuma reabertura extraordinária ("por pedido", "24 horas a mais"). Se um problema técnico impedir compras durante a janela, a única correção permitida é estender o fechamento pelo mesmo número de horas do problema, avisando a base do motivo.
8. Cada janela tem o próprio `utm_campaign` (`F2-plataforma-lancamento-AAAAMM`) e a própria etiqueta de não compra (`F2-plataforma-nao-comprou-j[n]`).
9. Quem já viu uma janela recebe o aquecimento curto (LA2 e a pré-abertura), não o completo.

---

## 10. Pontos para aprovação do Henrique

1. **Parcelamento**: em até 12 vezes no cartão com o custo do parcelamento pago pelo comprador (padrão Cakto), ou "12 × R$ 81,67 sem acréscimo" com a NID absorvendo. Recomendação: a primeira.
2. **Condição de fundador**: revisão por escrito de um projeto em 60 dias (cerca de 30 horas da NID no cenário base), voto com peso dobrado no catálogo, selo. Só na janela 1.
3. **Bônus da janela 1**: A-01 incluso (deixa de ser vendido a R$ 197 para os fundadores).
4. **Mesa aberta em D+2**: Henrique conduz uma Mesa ao vivo aberta à base durante a janela, com 3 projetos de compradores.
5. **CTA oficial da Plataforma**: "Quero praticar o método com a NID por R$ 980 por ano" (o `copy` pode propor variação no mesmo padrão).
6. **Base mínima e idade da base**: 1.500 compradores, 60% com mais de 30 dias.
7. **Cliente do Funil 1 fora do lançamento automático** e **leads sem compra fora da sequência por e-mail e WhatsApp**.
8. **Critério de escolha entre opção A e B** (seção 9.2).

---

## 11. Dependências e handoffs

| Agente | O que recebe deste arquivo | O que entrega |
|---|---|---|
| `copy` | Seções 3, 4.3, 5 e 6.2 | `produtos/plataforma/pagina-de-vendas.md` (página nos modos "abre dia", "aberto", "fechado"); versão final das 19 mensagens; texto do vídeo da oferta; texto da vitrine na área de membros |
| `automacao` | Seções 2 (itens 1, 2, 4, 7, 9), 5, 6, 8 e 9.3 | Disparos, condições, etiquetas `F2-plataforma-nao-comprou-j[n]`, abertura e fechamento do checkout na hora, base do agente, eventos `F2_plataforma_janela_aberta` e `F2_plataforma_janela_fechada`, contagem da base em D-30 |
| `trafego` | Seções 4.2, 4.4, 4.5 (posts orgânicos) | Calendário de posts da janela com CTA de palavra-chave; sem tráfego pago para a Plataforma (o lançamento é interno; decisão do brief) |
| `nidflow` | Seção 3.2 (linha do assinante mensal) | B-13 aceito antes da janela |
| `roteiro` | `02-catalogo.md`, seção 5.1 | Roteiros de I-01, I-02, I-03 e A-01 |
| `estrategia` | Este arquivo inteiro | Parecer antes de a data ser marcada |

---

## 12. Checklist de aceite

- [ ] Os dez pré-requisitos da seção 2 conferidos pelo coordenador antes de marcar a data.
- [ ] Oferta com preço, parcelamento, bônus real e condição de fundador aprovados pelo Henrique.
- [ ] Nenhuma peça da janela usa escassez que não seja a data real, o bônus real e a condição de fundador real.
- [ ] Dezenove mensagens com código, dia, canal, público, objetivo, conteúdo funcional e CTA, entregues ao `copy`.
- [ ] Checkout abre e fecha na hora publicada, com teste feito pelo `automacao`.
- [ ] Metas registradas como hipótese e ausentes de toda peça.
- [ ] Quem não compra recebe LF1 e a etiqueta da janela, e nada mais até a próxima.
- [ ] Critério de escolha entre opção A e B aplicado 30 dias após a janela 1 e registrado.
- [ ] Nenhuma ocorrência do léxico proibido; nenhum travessão; preços como `R$ 980`.
