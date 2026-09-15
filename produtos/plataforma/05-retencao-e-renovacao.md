# Plataforma NID · Retenção e renovação

| Campo | Valor |
|---|---|
| Produto | Plataforma NID (R$ 980 por ano) |
| Versão | 1.0 (Sprint 6) |
| Autor | Agente `plataforma` |
| Status | Entregue ao coordenador, aguardando parecer do `estrategia` e aprovação do Henrique nos pontos marcados |
| Mensagens | As mensagens deste arquivo são **rascunho funcional**; versão final do `copy`, disparos do `automacao` |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 5.2, 8.1, 9.2, 10); `docs/01-parecer-estrategico.md` (seção 2.6); `produtos/nidflow/01-plano-de-assinatura.md` (seções 6 e 8); `produtos/nidflow/02-onboarding.md` (marcos M1 a M5 do NIDflow, como referência de formato); `01-estrutura.md` (seções 4, 5 e 8); `03-comunidade-e-encontros.md` (seção 7) |
| Regra do coordenador aplicada | Números de retenção e renovação são hipóteses até existirem dados |

Como ler este arquivo: a seção 2 define os seis marcos de uso que dizem se o assinante está praticando; a seção 3 lista o que chega de novo durante o ano; a seção 4 é a régua de renovação; a seção 5 é o reengajamento de quem parou; a seção 6 diz o que medir e o que perguntar; a seção 7 é o mapa do ano do assinante.

---

## 1. A renovação no arco do método

| Etapa | A renovação |
|---|---|
| Dor | Assinatura anual que não é usada não renova. O parecer cita o indício de que a maior parte das perdas de assinante acontece nos primeiros 90 dias por falta de acompanhamento (seção 2.6). O assinante que entrou, assistiu a duas aulas e sumiu recebe a cobrança de renovação como surpresa e cancela |
| Solução | Renovação não se vende em D-7; se constrói do dia 1 com marcos de uso, resposta da NID no projeto real e conteúdo novo em data anunciada. Em D-60 o assinante já sabe o que fez no ano e o que vem no seguinte |
| Arquitetura | Seis marcos de uso acompanhados desde o primeiro dia; um incluso novo por trimestre e um avançado por semestre; 40 encontros gravados; régua de reengajamento por sinal de risco; régua de renovação com três avisos e um relatório pessoal; modo leitura e reativação sem janela |
| Valor | Para o assinante: renovar é continuar o que já está funcionando, com o catálogo maior e a mesma Mesa. Para a NID: a renovação é a receita da Plataforma que não custa lançamento |

Princípio: **quem chegou ao marco M4 (presente em um encontro) até o dia 45 tem motivo para renovar; quem não chegou ao M2 (projeto na mesa) em 14 dias é o primeiro a ser resgatado.** Os dois prazos são hipóteses até a primeira turma completar 90 dias.

---

## 2. Marcos de uso (M1 a M6)

Os marcos são da Plataforma; os do NIDflow (M1 a M5 em `produtos/nidflow/02-onboarding.md`) continuam existindo à parte e alimentam o M1 daqui. Cada marco é um fato registrado por evento, visível em "Minha conta" com data, e dispara uma única ação da NID.

| Marco | Nome | Fato | Evento | Prazo esperado (hipótese) | O que a NID faz ao atingir |
|---|---|---|---|---|---|
| M1 | Entrou | Primeiro acesso ao ambiente e NIDflow ativado (conta criada com `origem = plataforma_nid`) | `F2_plataforma_primeiro_acesso` e `F2_nidflow_conta_criada` | Até 24 horas após a compra | Nada além do onboarding (`01-estrutura.md`, seção 5) |
| M2 | Na mesa | Primeiro post em "Projetos na mesa" com o formulário completo | `F2_plataforma_projeto_mesa` | Até 3 dias | Comentário de alguém da NID em até 2 dias úteis (`F2_plataforma_resposta_nid`) |
| M3 | Concluiu | Primeiro minicurso incluso concluído (todas as aulas marcadas e o entregável enviado pelo botão) | `F2_plataforma_minicurso_concluido` | Até 30 dias | E-mail "Seu primeiro minicurso está concluído": reconhece, mostra o certificado simples, aponta o próximo minicurso pela situação que a pessoa declarou em `situacao_trava` |
| M4 | Presente | Primeira presença ao vivo em um encontro (qualquer tipo) | `F2_plataforma_encontro_presenca` | Até 45 dias | Nada automático; a pessoa da NID que conduz cumprimenta pelo nome no chat na primeira vez (lista de "primeira vez" gerada pelo orquestrador antes do encontro) |
| M5 | Apresentou | Primeiro relato em "Propostas apresentadas" (o projeto que passou pela mesa foi apresentado ao cliente) | `F2_plataforma_proposta_apresentada` (novo) | Até 60 dias | Comentário da NID no relato; entra em "O que fechou" da sexta |
| M6 | Fechou | Primeiro relato com resultado "aprovada" | `F2_plataforma_proposta_aprovada` | Até 120 dias | Comentário da NID; convite para contar o caso em uma Mesa (com autorização); reforço do Gatilho B |

Regras dos marcos:

1. Um marco só é registrado por evento, nunca por declaração solta (exceto M5 e M6, que são relatos declarados no formulário fixo; por isso ficam registrados como "declarado").
2. "Minha conta" mostra os seis marcos com data ou com "ainda não". Nada de barra de "nível" ou pontos.
3. **Assinante ativado = M2 e M3 em 30 dias.** É a métrica que o coordenador acompanha ao lado da conversão da janela.
4. **Assinante praticante = M4 e M5 em 90 dias.** É o melhor previsor de renovação que este arquivo consegue propor sem dado; a seção 6 diz como confirmar.

Metas iniciais (hipóteses, revisadas com 90 dias de dados da turma 1, nunca citadas em peça): M1 em 90% dos assinantes; M2 em 70%; M3 em 55%; M4 em 60%; M5 em 40%; M6 em 25%.

---

## 3. Conteúdo novo durante o ano

O que chega de novo é anunciado com data e cumprido na data. É a segunda razão de renovar (a primeira é a Mesa). Tudo o que entra durante a anuidade está incluso para quem está ativo; nada é vendido como "atualização".

| O que | Quando | Como o assinante fica sabendo | Ligação com a retenção |
|---|---|---|---|
| Um minicurso incluso novo | Um por trimestre (`02-catalogo.md`, seção 5.2): I-04 no trimestre 1, I-05 no 2, I-06 no 3, I-07 no 4 | "Avisos da NID" 30 dias antes com a data; e-mail no dia; Encontro de Método do mês é a aula ao vivo | Cada trimestre tem um motivo novo para entrar; a trilha muda na barra de progresso |
| Um minicurso avançado novo | Um por semestre (A-02 no semestre 1, A-03 no 2) | Caso NID do trimestre é a amostra; vitrine com a primeira aula aberta | Quem compra um avançado renova mais (hipótese a confirmar na seção 6) |
| Gravações dos encontros | 24 Mesas, 12 Encontros de Método, 4 Casos NID, com índice | Espaço "Encontros" e resumo semanal | A biblioteca de gravações cresce; quem perdeu o ao vivo tem o índice por projeto |
| Projetos por segmento na Biblioteca | A cada Mesa em que um autor autoriza | Biblioteca; "Projeto da semana" | O assinante encontra um projeto do segmento dele desenhado e revisado |
| Materiais novos | Um por aula nova, no máximo | Biblioteca | Nenhum material sem função no entregável |
| Balanço do ano e "O método em [ano]" | Mês 12 | Caso NID de balanço; PDF na Biblioteca | Entra no e-mail de D-60 como o que o assinante ajudou a construir |
| O próximo minicurso (votação) | Mês 12 | Ritual de `03-comunidade-e-encontros.md`, seção 7 | Quem vota no que vem tem motivo concreto para o ano 2 |

O que a NID não faz: não retém conteúdo para "liberar depois" como tática (tudo publicado fica aberto), não vende pacote de atualização e não cria conteúdo genérico para "manter a comunidade movimentada". O ritmo é um incluso por trimestre porque é o que a NID consegue gravar com qualidade e é o que o assinante consegue praticar.

---

## 4. Régua de renovação

### 4.1 Regras fixas

| Regra | Detalhe |
|---|---|
| Renovação | Automática, 12 meses após a compra, pelo mesmo valor (R$ 980), na mesma forma de pagamento. Pix: a plataforma de checkout gera a cobrança em D-7 com vencimento em D0 (a confirmar no item 4 de `01-estrutura.md`, seção 6.4) |
| Aviso prévio | Três avisos obrigatórios: D-60, D-30 e D-7. O de D-30 é o aviso formal, com valor, data e forma de cancelar, exigido pela boa prática de cobrança recorrente e pelos termos de uso |
| Cancelar a renovação | Um clique em "Minha conta", até D-1. Pergunta opcional de motivo (um clique). Sem cascata de "tem certeza", sem desconto de retenção (o brief proíbe desconto), sem ligação de retenção |
| Quem cancelou a renovação | Mantém tudo até D0. Depois, modo leitura (seção 4.4). Pode reativar a qualquer momento |
| Preço | Sempre R$ 980. Se o preço mudar um dia por decisão do Henrique, a mudança é comunicada em D-60 para quem renova; nenhuma peça deste arquivo promete preço travado |
| Fundador | A condição de fundador (`04-lancamento-interno.md`, seção 3.4) continua valendo enquanto a anuidade estiver ativa; o selo some se a anuidade expirar e volta na reativação |

### 4.2 Toques da régua (rascunho funcional)

| Código | Quando | Canal | Para quem | Objetivo | Conteúdo funcional | CTA |
|---|---|---|---|---|---|---|
| RN60 | D-60, 10h | E-mail | Anuidade ativa, renovação não cancelada | Mostrar o ano | Assunto "Seu ano no ambiente da NID". Relatório pessoal gerado pelo orquestrador: os seis marcos com data, minicursos concluídos, encontros presentes e gravações vistas, projetos na mesa e respostas da NID recebidas, relatos de propostas (apresentadas e aprovadas, declaradas). Depois, o que vem no ano 2: os dois inclusos votados, o avançado do semestre, o calendário do primeiro trimestre. Fecha com a data de renovação e o valor, em uma linha, e o link de "Minha conta" | "Ver o calendário do ano 2" |
| RN60w | D-60, 10h15 | WhatsApp (modelo, utilidade) | Idem, com autorização | Aviso curto | "Aqui é a NID. Sua anuidade na Plataforma NID renova em [data] por R$ 980. Mandamos por e-mail o resumo do seu ano e o que vem no próximo. Para ajustar qualquer coisa: {link de Minha conta}." | Link de "Minha conta" |
| RN30 | D-30, 10h | E-mail | Idem | Aviso formal | Assunto "Sua renovação em [data]: o que você precisa saber". Valor (R$ 980), data, forma de pagamento cadastrada, o que está incluso no ano 2 (sete linhas), como cancelar em um clique (link direto), como trocar o cartão. Uma frase da NID: "renovar é continuar com a Mesa e com o catálogo que cresce; se não é o momento, cancele em um clique e volte quando for" | "Confirmar meus dados de renovação" |
| RN7 | D-7, 10h | E-mail | Idem | Lembrete e Pix | Assunto "Renova em 7 dias". Data, valor, forma. Se Pix: o código gerado com vencimento em D0. Se cartão: "nada a fazer; o cartão final [xxxx] será cobrado em [data]". Link de cancelar em um clique | "Ver minha renovação" |
| RN0 | D0 | E-mail | Renovou | Confirmar | Assunto "Renovado: mais um ano no ambiente". Nota fiscal, a primeira Mesa do ano 2 com botão de reserva, o minicurso que abre o trimestre. Etiqueta `F2-plataforma-renovada`; evento `F2_plataforma_renovada` | "Reservar meu lugar na próxima Mesa" |
| RR0 | D0 (cobrança recusada) | E-mail e WhatsApp (utilidade) | `F2-plataforma-recusada` | Cobrança recusada | Assunto "Não conseguimos renovar sua anuidade". O que aconteceu, o que fazer (atualizar o cartão ou pagar por Pix), o prazo real das retentativas (até 7 dias, conforme a plataforma de checkout), a garantia de que o acesso está mantido enquanto isso. Faixa no ambiente com o mesmo texto | "Atualizar minha forma de pagamento" |
| RR3 | D+3 (ainda recusada) | E-mail | Idem | Segundo aviso | Assunto "Ainda não conseguimos renovar". Mesmo conteúdo, mais curto, com a data em que o acesso passa a leitura | Idem |
| RR6 | D+6 (ainda recusada) | E-mail e WhatsApp (utilidade) | Idem | Último aviso antes da leitura | Assunto "Amanhã o acesso passa para modo leitura". Fato, link, o que o modo leitura permite | Idem |

Renovou em qualquer ponto de RR0 a RR6: recebe RN0 e as retentativas param.

### 4.3 Quem cancelou a renovação antes de D0

| Código | Quando | Canal | Objetivo | Conteúdo funcional | CTA |
|---|---|---|---|---|---|
| RC0 | No ato do cancelamento | E-mail | Confirmar sem pressão | Assunto "Sua renovação está cancelada". Confirma que nada será cobrado em [data]. Diz o que continua até lá (tudo) e o que acontece depois (modo leitura por 30 dias, avançados comprados continuam seus, NIDflow em leitura com PDF por 30 dias). Diz que a reativação é um clique, a qualquer momento, sem janela. Uma pergunta opcional de um clique: motivo | "Ver o que continua até [data]" |
| RC-7 | D-7 | E-mail | Lembrete de encerramento | Assunto "Sua anuidade termina em 7 dias". Só o fato e o que fazer se quiser continuar (reativar a renovação em um clique). Sem argumento novo, sem desconto | "Reativar minha renovação" |

Nada mais. Quem cancelou não recebe "sentimos sua falta" antes de o acesso terminar.

### 4.4 Modo leitura e reativação (anuidade encerrada)

Regra de `01-estrutura.md`, seção 4: 30 dias de leitura (vê a comunidade sem postar, vê gravações, baixa materiais; sem encontros nem aulas), depois só "Minha conta" com o botão de reativar. Avançados comprados continuam acessíveis. NIDflow entra no regime da seção 6 do plano (leitura com PDF por 30 dias, exclusão em 90).

| Código | Quando | Canal | Objetivo | Conteúdo funcional | CTA |
|---|---|---|---|---|---|
| RL1 | D+1 após o fim | E-mail | Explicar o modo leitura | Assunto "Seu acesso está em modo leitura". O que dá para fazer nos próximos 30 dias (baixar os materiais, ver as gravações, exportar os projetos do NIDflow em PDF), o que não dá, a data em que a leitura termina. Reativar é um clique | "Reativar minha anuidade" |
| RL15 | D+15 | E-mail | Meio do prazo | Assunto "15 dias para baixar o que é seu". Materiais, gravações, PDFs do NIDflow. A Mesa e o minicurso do trimestre que estão acontecendo sem a pessoa, em uma linha, como fato | "Baixar meus materiais" |
| RL28 | D+28 | E-mail | Fim do prazo | Assunto "O modo leitura termina em 2 dias". Fato, data, link de reativar. Depois disso, só "Minha conta" | "Reativar minha anuidade" |
| Depois de D+30 | D+31 em diante | `automacao` | NIDflow mensal | O `automacao` oferece o NIDflow mensal por R$ 29,90 (regra de `produtos/nidflow/01-plano-de-assinatura.md`, seção 8), na sequência que ele definir; ao assinar, a conta reativa com os projetos | Do `automacao` |
| Reativação | Qualquer momento | "Minha conta" | Voltar | Nova anuidade de R$ 980 (Pix ou até 12 vezes), nova data de renovação a partir do pagamento, acesso completo no ato, NIDflow reativado com os projetos (se dentro de 90 dias), selo de fundador de volta se for o caso. Sem Abertura de turma nova; a pessoa entra na próxima Mesa | "Reativar minha anuidade por R$ 980" |

Ex-assinante não recebe mensagens de lançamento das janelas (já conhece o ambiente e pode reativar a qualquer momento). Recebe apenas, uma vez por trimestre, o e-mail "O que entrou no ambiente neste trimestre" (o incluso novo, o Caso NID, a soma do Placar), com o link de reativar. Depois de quatro trimestres sem reativar, para.

---

## 5. Reengajamento durante o ano

Quem parou de usar é resgatado por sinal, não por calendário. Cada sinal dispara um toque; nenhum sinal dispara mais de um toque por 30 dias; o assinante recebe no máximo um toque de reengajamento por semana, seja qual for o sinal. Quem atingiu o marco seguinte sai do toque.

| Código | Sinal (evento ausente) | Quando | Canal | Conteúdo funcional | CTA |
|---|---|---|---|---|---|
| RE1 | M1 não atingido (não entrou) | 48 horas após a compra | E-mail e WhatsApp (utilidade) | "Seu acesso está esperando". Link mágico renovado; os três passos de "Comece por aqui" levam 15 minutos; a data da próxima Mesa | "Entrar no ambiente" |
| RE2 | M2 não atingido (entrou, não pôs projeto na mesa) | Dia 7 | E-mail | "Qual proposta você está montando esta semana?". O formulário de "Projetos na mesa" leva 5 minutos; a NID responde em 2 dias úteis; se não tem projeto agora, o projeto de exemplo do NIDflow serve para a primeira revisão | "Colocar meu projeto na mesa" |
| RE2h | M2 não atingido | Dia 14 | WhatsApp (utilidade), enviado por humano da NID | Uma linha, pessoal, da pessoa da moderação, pelo nome: pergunta o que está travando e oferece colocar o projeto na mesa junto. É a única mensagem humana da régua de reengajamento; o rascunho é do `copy`, o envio é humano | Resposta livre |
| RE3 | M3 não atingido (nenhum minicurso concluído) | Dia 30 | E-mail | "Quinze minutos por aula". O minicurso que corresponde à situação declarada em `situacao_trava` (ou I-01 por padrão), a aula em que a pessoa parou, o entregável | "Continuar de onde parei" |
| RE4 | M4 não atingido (nunca esteve ao vivo) | Dia 45 | E-mail | "A Mesa é o que mais muda a proposta". A próxima Mesa com data e botão de reserva; a gravação da última com o índice por projeto; a regra de que dá para assistir sem apresentar | "Reservar meu lugar na próxima Mesa" |
| RE5 | Sem login por 21 dias (qualquer momento do ano) | Dia 21 sem acesso | E-mail | "O que entrou no ambiente desde a sua última visita". Lista gerada: aulas publicadas, projetos da semana, gravações, o próximo encontro. Nada de "sentimos sua falta" | "Ver o que entrou" |
| RE6 | Sem login por 45 dias | Dia 45 sem acesso | E-mail | "Uma pergunta". Pergunta única de um clique: o que faria você voltar (não tenho proposta agora; não achei o que precisava; não tenho tempo; outra). A resposta gera tarefa para a moderação quando for "não achei o que precisava" | Botões de resposta |
| RE7 | Sem login por 90 dias | Dia 90 sem acesso | WhatsApp (utilidade), humano | A pessoa da moderação manda uma linha pessoal, pelo nome, com a data da próxima Mesa e a pergunta "tem alguma proposta na mesa que a gente possa olhar?". Última tentativa; depois, só a régua de renovação | Resposta livre |

Regras:

1. RE1 a RE4 seguem os marcos; RE5 a RE7 seguem o login. Uma pessoa pode estar nas duas trilhas, mas recebe um toque por semana no máximo.
2. Toque de reengajamento nunca vende avançado, nunca menciona renovação (isso é da régua da seção 4) e nunca pede desculpa.
3. Os dois toques humanos (RE2h e RE7) são o custo real desta régua: cerca de 5 minutos cada. Com 45 assinantes e 30% chegando a cada um (hipótese), são 27 mensagens no ano.
4. Quem respondeu a RE6 com "não tenho proposta agora" entra em silêncio por 60 dias (só o resumo semanal continua) e depois volta ao RE5.

---

## 6. O que medir e o que perguntar

### 6.1 Métricas (todas hipóteses até 90 dias da turma 1)

| Métrica | Como medir | Pessimista | Base | Otimista | Uso |
|---|---|---|---|---|---|
| Ativação (M2 e M3 em 30 dias) | Eventos | 35% | 50% | 65% | Se abaixo de 35%, o problema é o onboarding ou o formulário da mesa |
| Praticante (M4 e M5 em 90 dias) | Eventos | 25% | 40% | 55% | Melhor previsor proposto de renovação |
| Presença média por Mesa | Presenças / assinantes ativos | 15% | 25% | 40% | Se abaixo de 15%, rever horário ou formato |
| Posts em "Projetos na mesa" por assinante por trimestre | Contagem | 0,5 | 1 | 2 | Se abaixo de 0,5, a comunidade está sendo assistida, não usada |
| Prazo de resposta da NID cumprido (2 dias úteis) | Registro da moderação | 80% | 90% | 98% | Abaixo de 90%, a promessa pública está em risco; entra no critério de reabertura (`04`, seção 9.2) |
| Compra de avançado por assinante ativo no ano | `F2_plataforma_avancado_compra` | 10% | 20% | 35% | Receita adicional; hipótese de correlação com renovação |
| Renovação anual | `F2_plataforma_renovada` / anuidades vencidas | 35% | 50% | 65% | A métrica do brief (9.2). Sem dado de mercado (parecer, 2.6); estes números são só o intervalo em que o coordenador decide |
| Renovação entre praticantes (M4 e M5) contra não praticantes | Cruzamento | | | | Confirma ou derruba o princípio da seção 1 |
| Reativação de expirados em 12 meses | `F2_plataforma_reativada` (novo) | 5% | 10% | 15% | Mede se o modo leitura e o e-mail trimestral funcionam |
| Reembolso em 7 dias | `F2_plataforma_reembolso` | 8% | 5% | 3% | Promessa da página contra o primeiro dia |
| Cancelamento da renovação com motivo informado | Pergunta de um clique | | | | Alimenta a seção 6.2 |

Leitura para o coordenador: com 45 assinantes na turma 1 (cenário base), 50% de renovação são 22 anuidades (cerca de R$ 17.400 líquidos, hipótese) sem custo de lançamento. É o começo da receita que não depende de janela.

### 6.2 As duas perguntas (pesquisa de renovação)

Duas pesquisas curtas, uma por clique cada, feitas pelo orquestrador; os resultados vão para o coordenador a cada trimestre e mudam este arquivo.

| Pesquisa | Quando | Pergunta | Opções | Uso |
|---|---|---|---|---|
| Por que renovou | RN0 (renovou) | "O que mais pesou para você continuar?" | A Mesa de Projetos; a resposta da NID nos meus projetos; os minicursos novos; o NIDflow incluso; a comunidade; outro | Confirma qual ritual sustenta a renovação (hoje, hipótese: a Mesa) e define onde a NID investe tempo |
| Por que não renovou | RC0 (cancelou a renovação) ou RL1 (expirou) | "O que faria você continuar?" | Não tenho propostas suficientes para usar; não achei minicurso para a minha situação; não consegui participar dos encontros; o preço; mudei de função; outro | "Não achei minicurso" alimenta a lista de espera do catálogo; "não consegui participar" alimenta o horário; "o preço" é registrado, não gera desconto |

Os resultados nunca viram prova em peça ("90% renovam por causa da Mesa") sem número real e sem autorização do Henrique.

---

## 7. O ano do assinante (mapa)

O que a NID entrega mês a mês para quem entrou na janela 1. É o que a página promete e o que a régua de D-60 mostra como cumprido.

| Mês | O que acontece | Marco esperado |
|---|---|---|
| 1 | Acesso, NIDflow ativo, projeto na mesa, resposta da NID, Abertura de turma, primeira Mesa, minicurso I-01 | M1, M2, M3 (início) |
| 2 | Duas Mesas, Encontro de Método (Solução), I-02; revisão de fundador entregue (janela 1) | M3, M4 |
| 3 | Duas Mesas, Encontro de Método (Arquitetura), Caso NID (automação), I-03; I-04 publicado | M5 |
| 4 a 6 | Seis Mesas, três Encontros de Método, Caso NID (demanda), I-05 publicado, A-02 na vitrine | M6 |
| 7 a 9 | Seis Mesas, três Encontros de Método, Caso NID (time comercial), I-06 publicado; RN60 no fim do mês 10 | Segundo projeto na mesa, segunda proposta relatada |
| 10 | RN60: relatório do ano e o calendário do ano 2 | |
| 11 | RN30: aviso formal; I-07 publicado; A-03 na vitrine; votação "O próximo minicurso" | |
| 12 | RN7 e renovação; Caso NID de balanço; "O método em [ano]" na Biblioteca; primeira Mesa do ano 2 | `F2-plataforma-renovada` |

---

## 8. Pontos para aprovação do Henrique

1. A renovação automática com três avisos (D-60, D-30, D-7) e cancelamento em um clique até D-1, sem desconto de retenção e sem ligação de retenção.
2. Os seis marcos e os dois indicadores (ativado, praticante) como o que a NID acompanha.
3. As duas mensagens humanas da régua de reengajamento (RE2h no dia 14 e RE7 no dia 90), enviadas pela pessoa da moderação.
4. Reativação de ex-assinante a qualquer momento, sem janela (regra 6 da seção 9.3 do lançamento).
5. O e-mail trimestral para ex-assinantes por até quatro trimestres.

---

## 9. Dependências

| Agente | O que precisa fazer |
|---|---|
| `automacao` | Eventos novos: `F2_plataforma_proposta_apresentada`, `F2_plataforma_proposta_aprovada`, `F2_plataforma_reativada`; relatório pessoal de RN60 gerado a partir dos eventos; régua de renovação e de reengajamento com os limites de frequência; lista de "primeira vez" antes de cada encontro; tratamento dos webhooks de renovação, recusa e cancelamento da Plataforma (`automacoes/05-integracoes.md`, seção 4.2, produto de assinatura anual); sequência do NIDflow mensal para expirados a partir de D+31 |
| `copy` | Versão final das 21 mensagens (RN, RR, RC, RL, RE) e do texto de "Minha conta" (marcos, renovação, cancelamento) |
| `nidflow` | B-13: transição da conta para leitura ao expirar e reativação com projetos |
| `plataforma` | Relatório trimestral das métricas da seção 6.1 ao coordenador; revisão deste arquivo com 90 dias de dados da turma 1 |

---

## 10. Checklist de aceite

- [ ] Seis marcos registrados por evento e visíveis em "Minha conta" com data.
- [ ] Régua de renovação com RN60, RN30, RN7 e RN0; recusa com RR0, RR3, RR6; cancelamento com RC0 e RC-7; leitura com RL1, RL15, RL28; tudo testado com anuidade de teste.
- [ ] Reengajamento com um toque por semana no máximo e dois toques humanos.
- [ ] Métricas da seção 6.1 no relatório trimestral, marcadas como hipótese até 90 dias de dados.
- [ ] As duas pesquisas de um clique no ar.
- [ ] Nenhum toque oferece desconto, "preço travado" ou "última chance"; nenhum toque de reengajamento menciona renovação.
- [ ] Nenhuma ocorrência do léxico proibido; nenhum travessão; preços como `R$ 980`.
