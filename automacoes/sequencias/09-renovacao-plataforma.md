# Sequência 09 · Renovação, cobrança recusada, modo leitura e reengajamento da Plataforma NID

| Campo | Valor |
|---|---|
| Fluxo de origem | `produtos/plataforma/05-retencao-e-renovacao.md` (seções 4, 5 e 6.2). Códigos, momentos, canais e condições são os do plano; este arquivo traz só o texto final. Disparos, eventos, limites de frequência e o relatório pessoal de RN60 são do agente `automacao` |
| Códigos neste arquivo | Renovação: RN60, RN60w, RN30, RN7 (variantes Pix e cartão), RN0. Cobrança recusada: RR0 (e-mail, WhatsApp e faixa no ambiente), RR3, RR6 (e-mail e WhatsApp). Cancelamento da renovação: RC0, RC-7. Modo leitura: RL1, RL15, RL28 e RLT (e-mail trimestral para ex-assinante, código proposto neste arquivo). Reengajamento: RE1 (e-mail e WhatsApp), RE2, RE2h (humano), RE3, RE4, RE5, RE6, RE7 (humano). As duas pesquisas de um clique na parte 6 |
| Quem recebe | Contato com `F2-plataforma-ativo` (RN, RR, RE), `F2-plataforma-recusada` (RR), quem cancelou a renovação (RC), `F2-plataforma-expirada` (RL, RLT). Sem `F2-reembolso`, sem opt-out no canal do toque |
| O que nunca aparece | Desconto, "preço travado", "última chance", "sentimos sua falta", pedido de desculpa. Toque de reengajamento nunca menciona renovação nem vende avançado; toque de renovação nunca vende avançado |
| Remetente | E-mail: "NID". WhatsApp: número oficial da NID. As duas mensagens humanas (RE2h e RE7) saem do WhatsApp da pessoa da moderação, assinadas pelo nome dela e "da NID" |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 5.2, 6.5, 10); `produtos/plataforma/01-estrutura.md` (seções 2.7, 4 e 5), `02-catalogo.md`, `03-comunidade-e-encontros.md` (seções 2, 5, 6 e 7), `05-retencao-e-renovacao.md`, `pagina-de-vendas.md` (Modo C); `produtos/nidflow/01-plano-de-assinatura.md` (seção 6, regime de leitura do NIDflow) |

Regras aplicadas em todas as mensagens: a NID fala em primeira pessoa do plural; um único CTA por mensagem (links administrativos exigidos pelo aviso formal e blocos de pergunta de um clique não concorrem com o CTA); sem emoji em e-mail e nenhum emoji em WhatsApp nesta sequência; nunca travessão; "para" por extenso; preço só como `R$ 980`; nenhum termo interno (nada de "marco M2", "etiqueta", "evento", "régua"; os marcos aparecem com os nomes que o assinante vê em "Minha conta"); nenhuma data escrita, só variáveis; nenhum número de retenção ou renovação; Henrique só como "Henrique Leite, sócio da NID".

Variáveis: `{primeiro_nome}`; datas: `{data_renovacao}`, `{data_renovacao_seguinte}`, `{data_limite_cancelamento}` (D-1), `{data_fim_anuidade}`, `{data_fim_leitura}` (D+30), `{data_exclusao_nidflow}` (D+90), `{data_modo_leitura}` (fim das retentativas), `{data_ultima_retentativa}`, `{data_proxima_mesa}`, `{data_encontro_metodo}`, `{data_proximo_encontro}`, `{dia_semana}`, `{tipo_encontro}`, `{data_ultimo_acesso}`, `{data_publicacao_minicurso}`, `{data_caso_nid}`, `{mes_votacao}`; pagamento: `{forma_pagamento}`, `{cartao_final}`, `{codigo_pix}`; conteúdo: `{minicurso_trimestre}`, `{promessa_minicurso}`, `{minicurso_situacao}`, `{entregavel_minicurso}`, `{situacao_trava}`, `{aula_parada}`, `{duracao_aula_1}`, `{avancado_semestre}`, `{minicurso_ano2_1}`, `{minicurso_ano2_2}`, `{caso_nid_trimestre}`, `{lista_novidades}`; relatório de RN60: `{data_m1}` a `{data_m6}`, `{n_minicursos_concluidos}`, `{n_minicursos_publicados}`, `{n_encontros_presenca}`, `{n_gravacoes_vistas}`, `{n_projetos_mesa}`, `{n_respostas_nid}`, `{n_propostas_apresentadas}`, `{n_propostas_aprovadas}`, `{n_mesas_t1}`, `{n_mesas_trimestre}`, `{n_projetos_biblioteca}`, `{placar_desenhados}`, `{placar_apresentados}`, `{placar_fechados}`; links: `{link_minha_conta}`, `{link_agenda}`, `{link_cancelar_renovacao}`, `{link_trocar_cartao}`, `{link_atualizar_pagamento}`, `{link_nota_fiscal}`, `{link_reservar_mesa}`, `{link_biblioteca}`, `{link_entrar_ambiente}` (link mágico renovado), `{link_projetos_mesa}` (formulário), `{link_continuar}` (aula em andamento), `{link_gravacao_ultima_mesa}`, `{link_inicio}`, `{link_reativar}` (página da Plataforma em Modo C, com parâmetro assinado), `{link_pr_...}` e `{link_pn_...}` (pesquisas, parte 6), `{link_re6_...}` (RE6), `{nome_moderacao}`, `{link_descadastro}`.

UTM (decisão deste arquivo, para o `automacao` registrar): links para "Minha conta", Agenda, Biblioteca, aulas, formulários e link mágico são entrega e não levam UTM. Só os links de reativação (RL1, RL28, RLT) vão para a página em Modo C e levam `utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-reativacao&utm_content=` com o código em minúsculas (`rl1`, `rl28`, `rlt1` a `rlt4`).

---

## Índice

| Código | Quando | Canal | Para quem | CTA único |
|---|---|---|---|---|
| RN60 | D-60, 10h | E-mail | Anuidade ativa, renovação não cancelada | "Ver o calendário do ano seguinte" |
| RN60w | D-60, 10h15 | WhatsApp (utilidade) | Idem, com autorização | Link de "Minha conta" |
| RN30 | D-30, 10h | E-mail | Idem | "Confirmar meus dados de renovação" |
| RN7 | D-7, 10h | E-mail (Pix ou cartão) | Idem | "Ver minha renovação" |
| RN0 | D0, até 10 minutos após a renovação | E-mail | Renovou | "Reservar meu lugar na próxima Mesa" |
| RR0 | D0, cobrança recusada | E-mail, WhatsApp (utilidade), faixa | `F2-plataforma-recusada` | "Atualizar minha forma de pagamento" |
| RR3 | D+3, ainda recusada | E-mail | Idem | Idem |
| RR6 | D+6, ainda recusada | E-mail e WhatsApp (utilidade) | Idem | Idem |
| RC0 | No ato do cancelamento | E-mail | Cancelou a renovação | "Ver o que continua até {data_renovacao}" |
| RC-7 | D-7 | E-mail | Idem | "Reativar minha renovação" |
| RL1 | D+1 após o fim | E-mail | `F2-plataforma-expirada` | "Reativar minha anuidade" |
| RL15 | D+15 | E-mail | Idem | "Baixar meus materiais" |
| RL28 | D+28 | E-mail | Idem | "Reativar minha anuidade" |
| RLT | Uma vez por trimestre, até quatro | E-mail | Idem, depois de D+30 | "Reativar minha anuidade" |
| RE1 | 48 horas após a compra sem primeiro acesso | E-mail e WhatsApp (utilidade) | Anuidade ativa | "Entrar no ambiente" |
| RE2 | Dia 7 sem projeto na mesa | E-mail | Idem | "Colocar meu projeto na mesa" |
| RE2h | Dia 14 sem projeto na mesa | WhatsApp, humano | Idem | Resposta livre |
| RE3 | Dia 30 sem minicurso concluído | E-mail | Idem | "Continuar de onde parei" |
| RE4 | Dia 45 sem presença ao vivo | E-mail | Idem | "Reservar meu lugar na próxima Mesa" |
| RE5 | 21 dias sem login | E-mail | Idem | "Ver o que entrou" |
| RE6 | 45 dias sem login | E-mail | Idem | Pergunta de um clique |
| RE7 | 90 dias sem login | WhatsApp, humano | Idem | Resposta livre |

Renovou em qualquer ponto de RR0 a RR6: recebe RN0 e as tentativas param. Reativou em qualquer ponto de RL1 a RLT: sai da sequência e entra no onboarding. Atingiu o passo seguinte: sai do toque de reengajamento correspondente. No máximo um toque de reengajamento por semana por pessoa.

---

## Parte 1 · Renovação (RN)

### RN60 · Seu ano no ambiente da NID

**Código**: RN60
**Momento**: D-60, 10h (Brasília)
**Canal**: e-mail
**Condição**: anuidade ativa, renovação não cancelada
**Assunto**: Seu ano no ambiente da NID
**Pré-cabeçalho**: O que você fez em dez meses, o que vem no ano seguinte e a data da renovação, em uma linha.

**Corpo**

Olá, {primeiro_nome}.

Faltam 60 dias para a sua anuidade na Plataforma NID completar um ano. Antes de falar de renovação, o que você fez nesses dez meses, pelos registros do ambiente.

**Seus passos**

- Entrou: {data_m1}
- Colocou o primeiro projeto na mesa: {data_m2}
- Concluiu o primeiro minicurso: {data_m3}
- Esteve ao vivo em um encontro pela primeira vez: {data_m4}
- Relatou a primeira proposta apresentada: {data_m5}
- Relatou a primeira proposta aprovada: {data_m6}

**Em números**

- {n_minicursos_concluidos} minicursos concluídos, de {n_minicursos_publicados} publicados.
- {n_encontros_presenca} encontros ao vivo e {n_gravacoes_vistas} gravações assistidas.
- {n_projetos_mesa} projetos na mesa e {n_respostas_nid} respostas da NID nos seus posts.
- {n_propostas_apresentadas} propostas apresentadas e {n_propostas_aprovadas} aprovadas, pelos seus relatos.

Se os números estão baixos, o ambiente não muda; o que muda é o que você leva para ele. Se estão altos, você sabe o que a Mesa fez pela sua proposta melhor do que a gente.

**O que vem no ano seguinte**

- Dois minicursos inclusos novos. [Variante A, votação concluída:] {minicurso_ano2_1} e {minicurso_ano2_2}, escolhidos pelos assinantes na votação de {mes_votacao}. [Variante B, votação por vir:] Escolhidos pelos assinantes na votação "O próximo minicurso", em {mes_votacao}; o seu voto conta e, se você é fundador, vale dois.
- O avançado do semestre, {avancado_semestre}, com a primeira aula aberta como amostra.
- O primeiro trimestre já na Agenda: {n_mesas_t1} Mesas de Projetos, 3 Encontros de Método e 1 Caso NID, com as datas publicadas.
- A mesma Mesa a cada quinze dias, a mesma resposta em até 2 dias úteis.

Sua anuidade renova em {data_renovacao}, por R$ 980, na forma de pagamento cadastrada. Se quiser ajustar qualquer coisa, inclusive não renovar, é um clique em "Minha conta": {link_minha_conta}.

[Botão] Ver o calendário do ano seguinte
{link_agenda}

NID · Consultoria de Performance Comercial

**CTA único**: "Ver o calendário do ano seguinte". O link de "Minha conta" é administrativo, em texto.

[Regras do relatório, para o `automacao`: todo passo sem data mostra "ainda não"; nenhum passo é omitido. Contagens em zero aparecem como "0", nunca como frase de cobrança. As propostas apresentadas e aprovadas são declaradas pelo assinante nos relatos; o e-mail diz isso ("pelos seus relatos"). Se a votação de "O próximo minicurso" ainda não aconteceu em D-60, usar a variante B.]

---

### RN60w · Sua anuidade renova em {data_renovacao} (WhatsApp)

**Código**: RN60w
**Momento**: D-60, 10h15
**Canal**: WhatsApp (modelo de utilidade aprovado)
**Condição**: idem RN60, com telefone e autorização
**Primeira linha**: Aqui é a NID. Sua anuidade na Plataforma NID renova em {data_renovacao}.

**Mensagem**

Aqui é a NID. Sua anuidade na Plataforma NID renova em {data_renovacao}, por R$ 980. Mandamos por e-mail o resumo do seu ano e o que vem no próximo. Para ajustar qualquer coisa, inclusive não renovar: {link_minha_conta}

**CTA único**: o link de "Minha conta".

---

### RN30 · Sua renovação em {data_renovacao}: o que você precisa saber

**Código**: RN30
**Momento**: D-30, 10h
**Canal**: e-mail
**Condição**: anuidade ativa, renovação não cancelada. É o aviso formal exigido pelos termos de uso
**Assunto**: Sua renovação em {data_renovacao}: o que você precisa saber
**Pré-cabeçalho**: Valor, data, forma de pagamento, o que está incluso e como cancelar em um clique. Este é o aviso formal.

**Corpo**

Olá, {primeiro_nome}.

Este é o aviso formal da renovação da sua anuidade na Plataforma NID. Tudo o que você precisa saber está aqui.

- Data da renovação: {data_renovacao}.
- Valor: R$ 980, o mesmo da anuidade atual.
- Forma de pagamento cadastrada: {forma_pagamento}. [Cartão: "cartão final {cartao_final}". Pix: "Pix, com o código enviado 7 dias antes da data".]
- Nova data de renovação depois desta: {data_renovacao_seguinte}.

O que fica no seu acesso nos próximos doze meses:

1. A trilha "O método na prática", com os minicursos já publicados e os que forem publicados no período.
2. A comunidade da NID, com resposta a todo projeto na mesa em até 2 dias úteis.
3. 24 Mesas de Projetos, 12 Encontros de Método e 4 Casos NID, todos gravados.
4. As aulas do mini curso e os materiais do playbook, na Biblioteca.
5. A Biblioteca completa, com os projetos por segmento que entraram no ano.
6. O NIDflow incluso, com os seus projetos.
7. Um único e-mail por semana e os lembretes de encontro.

Como cancelar a renovação: um clique em "Minha conta", até {data_limite_cancelamento}: {link_cancelar_renovacao}. Sem ligação, sem pergunta obrigatória. Você mantém tudo até {data_renovacao} e, depois, entra em modo leitura por 30 dias.

Como trocar o cartão: {link_trocar_cartao}.

Renovar é continuar com a Mesa e com o catálogo que cresce. Se não é o momento, cancele em um clique e volte quando for: a reativação é a qualquer momento, sem esperar período de matrícula.

[Botão] Confirmar meus dados de renovação
{link_minha_conta}

NID · Consultoria de Performance Comercial

**CTA único**: "Confirmar meus dados de renovação". Os links de cancelar e de trocar o cartão são exigência do aviso formal e ficam em texto.

---

### RN7 · Renova em 7 dias

**Código**: RN7
**Momento**: D-7, 10h
**Canal**: e-mail, em duas variantes pela forma de pagamento
**Condição**: anuidade ativa, renovação não cancelada
**Assunto**: Renova em 7 dias
**Pré-cabeçalho (Pix)**: O código Pix da sua renovação, com vencimento em {data_renovacao}.
**Pré-cabeçalho (cartão)**: Nada a fazer: o cartão final {cartao_final} será cobrado em {data_renovacao}.

**Corpo (variante Pix)**

Olá, {primeiro_nome}.

Sua anuidade na Plataforma NID renova em {data_renovacao}, por R$ 980. Como a sua forma de pagamento é Pix, o código já está gerado, com vencimento em {data_renovacao}:

{codigo_pix}

[Botão] Ver minha renovação
{link_minha_conta}

Pago o Pix, chega a confirmação com a nota fiscal e a primeira Mesa do novo ano. Se não quiser renovar, é um clique em "Minha conta" até {data_limite_cancelamento}; o código simplesmente não é pago, e nada é cobrado.

NID · Consultoria de Performance Comercial

**Corpo (variante cartão)**

Olá, {primeiro_nome}.

Sua anuidade na Plataforma NID renova em {data_renovacao}, por R$ 980, no cartão final {cartao_final}. Nada a fazer: a cobrança acontece na data e a confirmação chega por e-mail, com a nota fiscal.

Se quiser trocar o cartão ou não renovar, é um clique em "Minha conta", até {data_limite_cancelamento}.

[Botão] Ver minha renovação
{link_minha_conta}

NID · Consultoria de Performance Comercial

**CTA único**: "Ver minha renovação".

---

### RN0 · Renovado: mais um ano no ambiente

**Código**: RN0
**Momento**: D0, até 10 minutos após a confirmação da renovação (em qualquer ponto de RN7 a RR6)
**Canal**: e-mail
**Condição**: renovou. Aplica `F2-plataforma-renovada`
**Assunto**: Renovado: mais um ano no ambiente
**Pré-cabeçalho**: Nota fiscal, a primeira Mesa do novo ano e uma pergunta de um clique.

**Corpo**

Olá, {primeiro_nome}.

Renovação confirmada. Sua anuidade na Plataforma NID vale até {data_renovacao_seguinte}. A nota fiscal está aqui: {link_nota_fiscal}.

O novo ano começa na próxima Mesa de Projetos, na quarta-feira, {data_proxima_mesa}, às 19h. Se o seu projeto estiver na mesa até segunda-feira, ele pode ser um dos quatro.

[Botão] Reservar meu lugar na próxima Mesa
{link_reservar_mesa}

O minicurso que abre o trimestre é {minicurso_trimestre}, com a aula ao vivo no Encontro de Método de {data_encontro_metodo}.

Uma pergunta, em um clique, para a gente saber onde investir o tempo da NID no ano que começa:

O que mais pesou para você continuar?

[A Mesa de Projetos] {link_pr_mesa}
[A resposta da NID nos meus projetos] {link_pr_resposta}
[Os minicursos novos] {link_pr_minicursos}
[O NIDflow incluso] {link_pr_nidflow}
[A comunidade] {link_pr_comunidade}
[Outro motivo] {link_pr_outro}

Obrigado por mais um ano de projeto na mesa.

NID · Consultoria de Performance Comercial

**CTA único**: "Reservar meu lugar na próxima Mesa". A nota fiscal é link administrativo em texto; a pergunta é a pesquisa "Por que renovou" (parte 6), cadastro de um clique.

---

## Parte 2 · Cobrança recusada (RR)

### RR0 · Não conseguimos renovar sua anuidade

**Código**: RR0
**Momento**: D0, até 30 minutos após a recusa da cobrança
**Canal**: e-mail; WhatsApp (modelo de utilidade aprovado) para quem autorizou; faixa no ambiente
**Condição**: `F2-plataforma-recusada`. Acesso completo mantido durante as tentativas
**Assunto**: Não conseguimos renovar sua anuidade
**Pré-cabeçalho**: O cartão recusou a cobrança. Seu acesso continua; veja o que fazer.

**Corpo (e-mail)**

Olá, {primeiro_nome}.

Hoje era a data de renovação da sua anuidade na Plataforma NID, e a cobrança de R$ 980 no cartão final {cartao_final} foi recusada pela operadora. Isso acontece por limite, cartão vencido ou bloqueio do banco. Não é falta sua, e não muda nada no seu acesso por enquanto.

O que acontece agora:

- Seu acesso continua completo enquanto a gente tenta de novo: comunidade, encontros, aulas e NIDflow.
- A cobrança será tentada de novo nos próximos dias, até {data_ultima_retentativa}.
- Se até lá a cobrança não for aprovada, o acesso passa para modo leitura em {data_modo_leitura}.

O que você pode fazer agora, em um clique: atualizar o cartão ou pagar a renovação por Pix.

[Botão] Atualizar minha forma de pagamento
{link_atualizar_pagamento}

Qualquer dúvida sobre a cobrança, responda a este e-mail. A gente resolve por aqui.

NID · Consultoria de Performance Comercial

**Mensagem (WhatsApp, RR0w)**

Primeira linha: Aqui é a NID. A renovação da sua anuidade na Plataforma NID não foi aprovada no cartão.

Aqui é a NID. A renovação da sua anuidade na Plataforma NID não foi aprovada no cartão. Seu acesso continua enquanto a gente tenta de novo, até {data_ultima_retentativa}. Para atualizar o cartão ou pagar por Pix: {link_atualizar_pagamento}

**Faixa no ambiente (topo de todas as áreas, enquanto `F2-plataforma-recusada`)**

Não conseguimos renovar sua anuidade. Seu acesso continua até {data_modo_leitura}. [Atualizar minha forma de pagamento]

**CTA único**: "Atualizar minha forma de pagamento", nos três formatos.

---

### RR3 · Ainda não conseguimos renovar

**Código**: RR3
**Momento**: D+3, 10h, se a cobrança continua recusada
**Canal**: e-mail
**Condição**: `F2-plataforma-recusada`
**Assunto**: Ainda não conseguimos renovar
**Pré-cabeçalho**: A cobrança foi tentada de novo e não passou. Seu acesso continua até {data_modo_leitura}.

**Corpo**

Olá, {primeiro_nome}.

A cobrança da sua renovação na Plataforma NID (R$ 980, cartão final {cartao_final}) foi tentada de novo e não foi aprovada. Seu acesso continua completo até {data_modo_leitura}; nessa data, se a renovação não estiver paga, ele passa para modo leitura.

Atualizar o cartão ou pagar por Pix leva um minuto:

[Botão] Atualizar minha forma de pagamento
{link_atualizar_pagamento}

Se preferir não renovar, não precisa fazer nada: nenhuma cobrança extra acontece, e o acesso passa para leitura na data acima.

NID · Consultoria de Performance Comercial

**CTA único**: "Atualizar minha forma de pagamento".

---

### RR6 · Amanhã o acesso passa para modo leitura

**Código**: RR6
**Momento**: D+6, 10h, se a cobrança continua recusada
**Canal**: e-mail; WhatsApp (modelo de utilidade aprovado) para quem autorizou
**Condição**: `F2-plataforma-recusada`
**Assunto**: Amanhã o acesso passa para modo leitura
**Pré-cabeçalho**: A renovação não foi aprovada nas tentativas. O que o modo leitura permite e como manter tudo como está.

**Corpo (e-mail)**

Olá, {primeiro_nome}.

Amanhã, {data_modo_leitura}, o seu acesso à Plataforma NID passa para modo leitura, porque a renovação de R$ 980 não foi aprovada no cartão final {cartao_final} nas tentativas dos últimos dias.

O que o modo leitura permite, por 30 dias: ver a comunidade sem postar, assistir às gravações, baixar os materiais da Biblioteca e exportar os seus projetos do NIDflow em PDF. O que não permite: postar, entrar em encontros e assistir às aulas.

Para manter tudo como está, atualize o cartão ou pague por Pix ainda hoje:

[Botão] Atualizar minha forma de pagamento
{link_atualizar_pagamento}

Se a renovação for paga depois de amanhã, o acesso volta no ato, sem esperar período de matrícula.

NID · Consultoria de Performance Comercial

**Mensagem (WhatsApp, RR6w)**

Primeira linha: Aqui é a NID. Amanhã o seu acesso à Plataforma NID passa para modo leitura.

Aqui é a NID. Amanhã, {data_modo_leitura}, o seu acesso à Plataforma NID passa para modo leitura, porque a renovação não foi aprovada no cartão. Para atualizar o cartão ou pagar por Pix ainda hoje: {link_atualizar_pagamento}

**CTA único**: "Atualizar minha forma de pagamento".

---

## Parte 3 · Cancelou a renovação antes da data (RC)

### RC0 · Sua renovação está cancelada

**Código**: RC0
**Momento**: até 5 minutos após o clique em "Não renovar" em "Minha conta"
**Canal**: e-mail
**Condição**: renovação cancelada antes de D0
**Assunto**: Sua renovação está cancelada
**Pré-cabeçalho**: Nada será cobrado em {data_renovacao}. O que continua até lá, o que acontece depois e como voltar.

**Corpo**

Olá, {primeiro_nome}.

Feito. A renovação da sua anuidade na Plataforma NID está cancelada. Nada será cobrado em {data_renovacao}.

O que continua até {data_renovacao}: tudo. Comunidade, encontros, aulas, Biblioteca e NIDflow, do mesmo jeito. Se tem projeto na mesa, a NID responde; se tem Mesa marcada, o seu lugar está lá.

O que acontece depois de {data_renovacao}:

- Por 30 dias, modo leitura: você vê a comunidade sem postar, assiste às gravações e baixa os materiais.
- Os minicursos avançados que você comprou continuam seus, sem prazo.
- O NIDflow fica em leitura, com exportação em PDF, por 30 dias; os projetos ficam guardados por 90.
- Reativar é um clique em "Minha conta", a qualquer momento, sem esperar período de matrícula. A conta volta com os projetos, se dentro dos 90 dias.

[Botão] Ver o que continua até {data_renovacao}
{link_minha_conta}

Uma pergunta, opcional, em um clique. A resposta muda o que a NID faz no ambiente; não muda nada na sua conta.

O que faria você continuar?

[Não tenho propostas suficientes para usar] {link_pn_propostas}
[Não achei minicurso para a minha situação] {link_pn_minicurso}
[Não consegui participar dos encontros] {link_pn_encontros}
[O preço] {link_pn_preco}
[Mudei de função] {link_pn_funcao}
[Outro motivo] {link_pn_outro}

Obrigado pelo ano de projeto na mesa.

NID · Consultoria de Performance Comercial

**CTA único**: "Ver o que continua até {data_renovacao}". A pergunta é a pesquisa "Por que não renovou" (parte 6), cadastro de um clique.

---

### RC-7 · Sua anuidade termina em 7 dias

**Código**: RC-7
**Momento**: D-7, 10h
**Canal**: e-mail
**Condição**: renovação cancelada e não reativada
**Assunto**: Sua anuidade termina em 7 dias
**Pré-cabeçalho**: Só o fato. E um clique, se você mudou de ideia.

**Corpo**

Olá, {primeiro_nome}.

Sua anuidade na Plataforma NID termina em {data_renovacao}, daqui a 7 dias, porque a renovação foi cancelada. Até lá, tudo continua igual.

Se mudou de ideia, reativar a renovação é um clique em "Minha conta", até {data_limite_cancelamento}: a cobrança de R$ 980 acontece na data, e nada muda no seu acesso.

[Botão] Reativar minha renovação
{link_minha_conta}

Se não mudou, não precisa fazer nada. Em {data_renovacao} o acesso passa para modo leitura por 30 dias, e a gente explica o que dá para fazer nesse período.

NID · Consultoria de Performance Comercial

**CTA único**: "Reativar minha renovação". Sem argumento novo.

---

## Parte 4 · Modo leitura e reativação (RL)

### RL1 · Seu acesso está em modo leitura

**Código**: RL1
**Momento**: D+1 após o fim da anuidade, 10h
**Canal**: e-mail
**Condição**: `F2-plataforma-expirada` (por cancelamento ou por cobrança não aprovada)
**Assunto**: Seu acesso está em modo leitura
**Pré-cabeçalho**: O que dá para fazer nos próximos 30 dias, o que não dá e como reativar em um clique.

**Corpo**

Olá, {primeiro_nome}.

Sua anuidade na Plataforma NID terminou em {data_fim_anuidade}, e o seu acesso está em modo leitura até {data_fim_leitura}.

O que dá para fazer nesses 30 dias:

- Ver a comunidade, inclusive os seus posts e as respostas da NID, sem postar.
- Assistir às gravações dos encontros, com índice.
- Baixar os materiais da Biblioteca: templates, modelo de proposta, roteiro, checklist, banco de objeções, régua de follow-up e projetos por segmento.
- Exportar os seus projetos do NIDflow em PDF.
- Continuar nos minicursos avançados que você comprou, sem prazo.

O que não dá: postar, entrar em encontros ao vivo e assistir às aulas dos minicursos inclusos.

Reativar é um clique, a qualquer momento, sem esperar período de matrícula: nova anuidade de R$ 980, Pix à vista ou em até 12 vezes no cartão, acesso completo no ato, projetos do NIDflow de volta (se dentro de 90 dias) e, se você foi fundador, o selo de volta.

[Botão] Reativar minha anuidade
{link_reativar}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-reativacao&utm_content=rl1

[Bloco só para quem não respondeu à pergunta em RC0:]

Uma pergunta, opcional, em um clique. A resposta muda o que a NID faz no ambiente; não muda nada na sua conta.

O que faria você continuar?

[Não tenho propostas suficientes para usar] {link_pn_propostas}
[Não achei minicurso para a minha situação] {link_pn_minicurso}
[Não consegui participar dos encontros] {link_pn_encontros}
[O preço] {link_pn_preco}
[Mudei de função] {link_pn_funcao}
[Outro motivo] {link_pn_outro}

[Fim do bloco]

NID · Consultoria de Performance Comercial

**CTA único**: "Reativar minha anuidade" (página da Plataforma em Modo C).

---

### RL15 · 15 dias para baixar o que é seu

**Código**: RL15
**Momento**: D+15, 10h
**Canal**: e-mail
**Condição**: `F2-plataforma-expirada`, sem reativação
**Assunto**: 15 dias para baixar o que é seu
**Pré-cabeçalho**: Materiais, gravações e os PDFs do NIDflow, até {data_fim_leitura}.

**Corpo**

Olá, {primeiro_nome}.

Seu modo leitura na Plataforma NID termina em {data_fim_leitura}, daqui a 15 dias. Depois disso, só "Minha conta" continua acessível, com o botão de reativar.

O que vale baixar antes:

- Os materiais da Biblioteca, em PDF e texto.
- As gravações que você quer rever; o índice por projeto está em cada uma.
- Os seus projetos do NIDflow, exportados em PDF.

[Botão] Baixar meus materiais
{link_biblioteca}

Enquanto isso, o ambiente segue: a próxima Mesa de Projetos é na quarta-feira, {data_proxima_mesa}, e o minicurso do trimestre, {minicurso_trimestre}, foi publicado em {data_publicacao_minicurso}. Se quiser voltar, a reativação é um clique em "Minha conta", a qualquer momento.

NID · Consultoria de Performance Comercial

**CTA único**: "Baixar meus materiais".

---

### RL28 · O modo leitura termina em 2 dias

**Código**: RL28
**Momento**: D+28, 10h
**Canal**: e-mail
**Condição**: `F2-plataforma-expirada`, sem reativação
**Assunto**: O modo leitura termina em 2 dias
**Pré-cabeçalho**: Em {data_fim_leitura}, só "Minha conta" fica acessível. Reativar é um clique.

**Corpo**

Olá, {primeiro_nome}.

Em {data_fim_leitura} termina o modo leitura da sua conta na Plataforma NID. A partir daí, só "Minha conta" fica acessível, com o botão de reativar. Os minicursos avançados que você comprou continuam seus.

Seus projetos do NIDflow ficam guardados até {data_exclusao_nidflow}; reativando até lá, voltam com a conta.

Reativar é um clique: nova anuidade de R$ 980, acesso completo no ato, sem esperar período de matrícula.

[Botão] Reativar minha anuidade
{link_reativar}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-reativacao&utm_content=rl28

NID · Consultoria de Performance Comercial

**CTA único**: "Reativar minha anuidade".

---

### RLT · O que entrou no ambiente neste trimestre

**Código**: RLT (proposto neste arquivo; o plano descreve a mensagem sem código)
**Momento**: uma vez por trimestre, na semana seguinte à publicação do minicurso incluso do trimestre, 10h; no máximo quatro envios por pessoa
**Canal**: e-mail
**Condição**: `F2-plataforma-expirada` há mais de 30 dias, sem reativação, sem opt-out. Depois do quarto envio, para. Ex-assinante não recebe as mensagens de matrícula da sequência 08
**Assunto**: O que entrou no ambiente neste trimestre
**Pré-cabeçalho**: O minicurso novo, o Caso NID, as Mesas gravadas e o placar da comunidade. Sem pedido de desculpa.

**Corpo**

Olá, {primeiro_nome}.

Uma vez por trimestre, a gente conta a quem já foi assinante o que entrou na Plataforma NID. Só o que existe agora e não existia quando você saiu.

- Minicurso incluso novo: {minicurso_trimestre}, publicado em {data_publicacao_minicurso}. {promessa_minicurso}
- Caso NID do trimestre: {caso_nid_trimestre}, gravado em {data_caso_nid}.
- {n_mesas_trimestre} Mesas de Projetos gravadas, com índice por projeto.
- {n_projetos_biblioteca} projetos novos por segmento na Biblioteca.
- Placar do método do trimestre, somado pela comunidade: {placar_desenhados} projetos desenhados, {placar_apresentados} apresentados, {placar_fechados} fechados, declarados pelos assinantes.

Se a sua próxima proposta merece passar pela mesa antes de ir para o cliente, reativar é um clique, a qualquer momento: nova anuidade de R$ 980, Pix à vista ou em até 12 vezes no cartão, acesso completo no ato.

[Botão] Reativar minha anuidade
{link_reativar}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-reativacao&utm_content=rlt{n}

Este e-mail chega no máximo quatro vezes, uma por trimestre. Depois disso, a gente para.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Reativar minha anuidade". `{n}` é o número do envio (1 a 4). A linha do placar só entra se o Placar do método do trimestre tiver sido publicado; sem ele, a linha é omitida.

---

## Parte 5 · Reengajamento durante o ano (RE)

Regras do plano que valem aqui: um toque por sinal, nunca dois toques pelo mesmo sinal em 30 dias, no máximo um toque de reengajamento por semana por pessoa; quem atinge o passo seguinte sai do toque; nenhum toque menciona renovação, vende avançado ou pede desculpa.

### RE1 · Seu acesso está esperando

**Código**: RE1
**Momento**: 48 horas após a compra, se não houve primeiro acesso ao ambiente
**Canal**: e-mail; WhatsApp (modelo de utilidade aprovado) para quem autorizou
**Condição**: anuidade ativa sem primeiro acesso
**Assunto**: Seu acesso está esperando
**Pré-cabeçalho**: O link entra direto, sem senha. Quinze minutos para os três primeiros passos.

**Corpo (e-mail)**

Olá, {primeiro_nome}.

Sua anuidade na Plataforma NID foi confirmada há dois dias, e o seu acesso ainda não foi aberto. Se o e-mail de acesso se perdeu, este link entra direto, sem senha:

[Botão] Entrar no ambiente
{link_entrar_ambiente}

Os três passos de "Comece por aqui" levam uns quinze minutos: ativar o NIDflow, colocar o seu projeto na mesa e assistir à primeira aula, de 12 minutos. Com o projeto na mesa, a resposta da NID chega em até 2 dias úteis.

A próxima Mesa de Projetos é na quarta-feira, {data_proxima_mesa}, às 19h.

Se algo não funcionou no acesso, responda a este e-mail. A gente resolve por aqui.

NID · Consultoria de Performance Comercial

**Mensagem (WhatsApp, RE1w)**

Primeira linha: Aqui é a NID. Seu acesso à Plataforma NID está esperando.

Aqui é a NID. Seu acesso à Plataforma NID está esperando: {link_entrar_ambiente}. Os três passos de "Comece por aqui" levam uns quinze minutos. Se algo não funcionou, responde por aqui.

**CTA único**: "Entrar no ambiente" (link mágico renovado, sem UTM).

---

### RE2 · Qual proposta você está montando esta semana?

**Código**: RE2
**Momento**: dia 7 após a compra, 10h, se não há projeto na mesa
**Canal**: e-mail
**Condição**: anuidade ativa, primeiro acesso feito, sem post em "Projetos na mesa"
**Assunto**: Qual proposta você está montando esta semana?
**Pré-cabeçalho**: O formulário leva cinco minutos. A resposta da NID chega em até 2 dias úteis.

**Corpo**

Olá, {primeiro_nome}.

Uma semana no ambiente, e o seu projeto ainda não está na mesa. A pergunta é simples: qual proposta você está montando esta semana?

É ela que vai para "Projetos na mesa". O formulário leva cinco minutos: o segmento do cliente (sem nome), a etapa em que o projeto está, o que trava e o anexo, que pode ser o template preenchido ou o PDF do NIDflow. Alguém da NID responde em até 2 dias úteis, apontando a etapa que precisa de trabalho e o que mudar.

Se não tem proposta agora, o projeto de exemplo do NIDflow serve para a primeira revisão. O que importa é passar pela mesa uma vez, para saber como é antes de a proposta real aparecer.

[Botão] Colocar meu projeto na mesa
{link_projetos_mesa}

NID · Consultoria de Performance Comercial

**CTA único**: "Colocar meu projeto na mesa" (formulário, sem UTM).

---

### RE2h · O que está travando? (WhatsApp, humano)

**Código**: RE2h
**Momento**: dia 14 após a compra, em horário comercial, se ainda não há projeto na mesa
**Canal**: WhatsApp da pessoa da moderação, enviado por ela, pelo nome. Rascunho para envio humano; a pessoa ajusta ao contexto do assinante antes de enviar
**Condição**: anuidade ativa, sem post em "Projetos na mesa"
**Primeira linha**: Oi, {primeiro_nome}. Aqui é {nome_moderacao}, da NID.

**Mensagem**

Oi, {primeiro_nome}. Aqui é {nome_moderacao}, da NID. Vi que você entrou na Plataforma faz duas semanas e ainda não colocou nenhum projeto na mesa. O que está travando? Se quiser, me manda por aqui o segmento do cliente e a etapa em que a proposta está, e a gente coloca na mesa juntos.

**CTA único**: resposta livre. Quem responde entra em conversa humana; a pessoa da moderação cria o post com o assinante ou orienta o formulário.

---

### RE3 · Quinze minutos por aula

**Código**: RE3
**Momento**: dia 30 após a compra, 10h, se nenhum minicurso foi concluído
**Canal**: e-mail
**Condição**: anuidade ativa, sem minicurso concluído. Variante A para quem declarou a situação que trava; variante B para quem não declarou
**Assunto**: Quinze minutos por aula
**Pré-cabeçalho**: O minicurso para a sua situação, a aula em que você parou e o entregável.

**Corpo**

Olá, {primeiro_nome}.

Um mês no ambiente, e nenhum minicurso concluído ainda. Não é problema; é só o que os registros mostram. As aulas têm de 10 a 15 minutos, e cada uma termina com um entregável feito no seu projeto.

[Variante A, situação declarada:] Quando você respondeu qual situação trava a sua proposta, disse: {situacao_trava}. O minicurso que responde a isso é {minicurso_situacao}. [A1, aula iniciada:] Você parou na aula {aula_parada}; ela continua de onde ficou. [A2, nenhuma aula iniciada:] A primeira aula tem {duracao_aula_1} minutos.

[Variante B, sem situação declarada:] O minicurso por onde a NID sugere começar é "Antes da Dor": a conversa que produz o projeto, mesmo quando o cliente não tem número. A primeira aula tem 12 minutos.

O entregável de {minicurso_situacao}: {entregavel_minicurso}. Quando terminar, o botão "Levar para a Mesa de Projetos" cria o post com ele.

[Botão] Continuar de onde parei
{link_continuar}

NID · Consultoria de Performance Comercial

**CTA único**: "Continuar de onde parei" (a aula em andamento ou a primeira aula do minicurso indicado; sem UTM). Na variante B, `{minicurso_situacao}` é "Antes da Dor" e `{entregavel_minicurso}` é "o canvas de dor de um cliente real, com a conta feita ou a estimativa construída, e o campo 'quem decide' preenchido".

---

### RE4 · A Mesa é o que mais muda a proposta

**Código**: RE4
**Momento**: dia 45 após a compra, 10h, se nunca esteve ao vivo em um encontro
**Canal**: e-mail
**Condição**: anuidade ativa, sem presença ao vivo
**Assunto**: A Mesa é o que mais muda a proposta
**Pré-cabeçalho**: A próxima Mesa de Projetos, com data e reserva. Dá para assistir sem apresentar.

**Corpo**

Olá, {primeiro_nome}.

Em 45 dias, você ainda não esteve em um encontro ao vivo. A Mesa de Projetos é a parte do ambiente que mais muda o que você apresenta, e dá para assistir sem apresentar.

A próxima é na quarta-feira, {data_proxima_mesa}, das 19h às 20h15: quatro projetos reais, revisados página por página por Henrique Leite, sócio da NID. Você assiste, anota o que se aplica ao seu e sai com o entregável de todos: "volte ao seu projeto e refaça a página que travou".

Se não puder ir, a gravação da última Mesa está aqui, com índice por projeto: {link_gravacao_ultima_mesa}. Comece pelo projeto do segmento mais parecido com o seu.

[Botão] Reservar meu lugar na próxima Mesa
{link_reservar_mesa}

NID · Consultoria de Performance Comercial

**CTA único**: "Reservar meu lugar na próxima Mesa". A gravação é link de texto (entrega).

---

### RE5 · O que entrou no ambiente desde a sua última visita

**Código**: RE5
**Momento**: 21 dias sem login, em qualquer momento do ano, 10h
**Canal**: e-mail
**Condição**: anuidade ativa, sem acesso há 21 dias
**Assunto**: O que entrou no ambiente desde a sua última visita
**Pré-cabeçalho**: Aulas, projetos revisados, gravações e o próximo encontro. Lista, sem adjetivo.

**Corpo**

Olá, {primeiro_nome}.

Você não entra na Plataforma NID desde {data_ultimo_acesso}. Desde então, isto entrou:

{lista_novidades}

O próximo encontro é {tipo_encontro}, na {dia_semana}, {data_proximo_encontro}, às 19h.

[Botão] Ver o que entrou
{link_inicio}

NID · Consultoria de Performance Comercial

**CTA único**: "Ver o que entrou" (Início do ambiente, sem UTM).

[Formato de cada linha de `{lista_novidades}`, gerada pelo orquestrador, sem adjetivo, no máximo oito linhas, das mais recentes para as mais antigas: "Aula publicada: {minicurso}, aula {n}, {título}." / "Projeto da semana: {segmento}, revisado por escrito em {data}." / "Gravação publicada: {tipo de encontro} de {data}, com índice." / "Novo na Biblioteca: projeto por segmento, {segmento}." / "Aviso da NID: {título do aviso}." Se a lista estiver vazia, o e-mail não é enviado.]

---

### RE6 · Uma pergunta

**Código**: RE6
**Momento**: 45 dias sem login, 10h
**Canal**: e-mail
**Condição**: anuidade ativa, sem acesso há 45 dias
**Assunto**: Uma pergunta
**Pré-cabeçalho**: Um clique, nada por escrito. A resposta vai para quem modera a comunidade.

**Corpo**

Olá, {primeiro_nome}.

Você não entra no ambiente há 45 dias. Uma pergunta, em um clique, sem nada por escrito:

O que faria você voltar?

[Não tenho proposta agora] {link_re6_sem_proposta}
[Não achei o que precisava] {link_re6_nao_achei}
[Não tenho tempo] {link_re6_sem_tempo}
[Outro motivo] {link_re6_outro}

A resposta vai para a pessoa da NID que modera a comunidade. Se for "não achei o que precisava", ela responde a você por escrito com o que existe para a sua situação, ou registra o que falta.

NID · Consultoria de Performance Comercial

**CTA único**: a pergunta de um clique. Nenhum outro link.

**Páginas de confirmação (uma por resposta)**

- "Não tenho proposta agora". Título: Anotado. Texto: A gente para de mandar lembretes por 60 dias. O resumo de sexta continua chegando, para você entrar quando a proposta aparecer.
- "Não achei o que precisava". Título: Anotado. Texto: A pessoa da NID que modera a comunidade responde a você por e-mail em até 2 dias úteis com o que existe para a sua situação, ou com o registro do que falta. Se quiser adiantar, responda ao e-mail dizendo o que procurava.
- "Não tenho tempo". Título: Anotado. Texto: O mínimo que funciona é um projeto na mesa quando você tiver proposta e uma Mesa por mês, gravada, com índice por projeto. Nada além disso é obrigatório.
- "Outro motivo". Título: Anotado. Texto: Se quiser contar, responda ao e-mail. A gente lê tudo.

---

### RE7 · Tem alguma proposta na mesa? (WhatsApp, humano)

**Código**: RE7
**Momento**: 90 dias sem login, em horário comercial
**Canal**: WhatsApp da pessoa da moderação, enviado por ela, pelo nome. Rascunho para envio humano. Última tentativa de reengajamento; depois, só a régua de renovação
**Condição**: anuidade ativa, sem acesso há 90 dias
**Primeira linha**: Oi, {primeiro_nome}. {nome_moderacao}, da NID.

**Mensagem**

Oi, {primeiro_nome}. {nome_moderacao}, da NID. Faz três meses que você não entra na Plataforma. A próxima Mesa de Projetos é na quarta-feira, {data_proxima_mesa}, às 19h. Tem alguma proposta na mesa que a gente possa olhar antes de ela ir para o cliente? Se tiver, me manda o segmento e a etapa por aqui.

**CTA único**: resposta livre.

---

## Parte 6 · As duas pesquisas de um clique

Cada pesquisa é uma pergunta com respostas em links de um clique, que gravam a resposta e abrem uma página de confirmação. Sem formulário, sem campo de texto obrigatório. Os resultados vão para o coordenador a cada trimestre e nunca viram prova em peça sem número real e autorização do Henrique.

### Pesquisa 1 · Por que renovou

**Onde**: RN0, abaixo do CTA
**Pergunta**: O que mais pesou para você continuar?
**Respostas (um link cada)**: A Mesa de Projetos · A resposta da NID nos meus projetos · Os minicursos novos · O NIDflow incluso · A comunidade · Outro motivo
**Grava**: `motivo_renovacao`

**Página de confirmação**

Título: Anotado. Obrigado.
Texto: Sua resposta ficou registrada. É com ela que a NID decide onde investir o tempo do ano que começa. A próxima Mesa de Projetos é na quarta-feira, {data_proxima_mesa}, às 19h: {link_reservar_mesa}

Para "Outro motivo", uma linha a mais: Se quiser contar em uma frase, responda ao e-mail de renovação.

### Pesquisa 2 · Por que não renovou

**Onde**: RC0, abaixo do CTA; ou RL1, para quem expirou sem ter respondido em RC0
**Pergunta**: O que faria você continuar?
**Respostas (um link cada)**: Não tenho propostas suficientes para usar · Não achei minicurso para a minha situação · Não consegui participar dos encontros · O preço · Mudei de função · Outro motivo
**Grava**: `motivo_nao_renovacao`. "Não achei minicurso" alimenta a lista de espera do catálogo; "não consegui participar" alimenta a revisão de horário; "o preço" é registrado e não gera condição especial

**Página de confirmação**

Título: Anotado. Obrigado.
Texto: Sua resposta ficou registrada e muda o que a NID faz no ambiente. Na sua conta, nada muda: o que continua até {data_renovacao} e a reativação em um clique estão em "Minha conta": {link_minha_conta}

Para "Não achei minicurso para a minha situação", uma linha a mais: Se quiser dizer qual situação, responda ao e-mail. Os minicursos do ano seguinte saem dessa lista.

---

## Checklist de coerência deste arquivo

- [x] Todos os códigos das seções 4 e 5 do plano com texto final: RN60, RN60w, RN30, RN7, RN0, RR0, RR3, RR6, RC0, RC-7, RL1, RL15, RL28, RE1 a RE7 (com RE2h), mais o e-mail trimestral do ex-assinante (RLT) e as duas pesquisas
- [x] Renovação automática pelo mesmo valor, avisada em D-60, D-30 e D-7, com cancelamento em um clique até D-1; nenhuma mensagem oferece desconto, preço travado ou ligação de retenção
- [x] Toque de reengajamento nunca menciona renovação nem avançado; toque de renovação nunca vende avançado
- [x] Modo leitura e reativação iguais aos da página (Modo C): 30 dias de leitura, NIDflow em leitura com PDF por 30 dias e guarda por 90, avançados comprados mantidos, selo de fundador de volta, reativação sem período de matrícula
- [x] Preço só como `R$ 980`; parcelamento só como "em até 12 vezes no cartão"; nenhuma data escrita; nenhum número de retenção
- [x] Um CTA por mensagem; links administrativos do aviso formal e pesquisas de um clique em texto
- [x] Sem emoji, sem travessão, sem "pra" ou "pro", sem termo interno; Henrique só como "Henrique Leite, sócio da NID"; mensagens humanas assinadas pelo nome da pessoa da moderação e "da NID"
