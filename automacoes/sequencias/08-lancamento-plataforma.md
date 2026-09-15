# Sequência 08 · Lançamento interno da Plataforma NID (D-21 a D+7)

| Campo | Valor |
|---|---|
| Fluxo de origem | `produtos/plataforma/04-lancamento-interno.md` (seções 3, 4, 5 e 6). Códigos, dias, horas, canais, públicos e objetivos são os do plano; este arquivo traz só o texto final. Disparos, condições e etiquetas são do agente `automacao` |
| Códigos neste arquivo | Aquecimento: PN-LA1, PN-LA2. Pré-abertura: PN-LP1, PN-LP2, PN-LP3, PN-LP3w. Matrícula aberta: PN-LD0i, PN-LD0, PN-LD0w, PN-LD1, PN-LD2, PN-LD3, PN-LD5, PN-LD5w, PN-LD6a, PN-LD6b, PN-LD6w. Pós-matrícula: PN-LF1 (quem não comprou), PN-LT1 (quem comprou). Dezenove mensagens. Todos os códigos levam o prefixo `PN-` (convenção da revisão de coerência, seção 4.2: toda mensagem da Plataforma NID é `PN-`, o mesmo código que o plano de verba reserva para a Plataforma); o plano `04-lancamento-interno.md` usa os códigos sem prefixo até o `plataforma` aplicar a mesma troca. `utm_content` fica em minúsculas com o mesmo prefixo (`pn-la1`) |
| Quem recebe | Contato com `F2-comprador-playbook` ou `F2-minicurso`, sem `F2-plataforma-ativo`, sem `F2-reembolso`, sem opt-out no canal do toque (seção 6.1 do plano). Quem compra durante a matrícula sai da sequência no ato e recebe PN-LT1. Leads sem compra não recebem nada por e-mail ou WhatsApp |
| O que oferece | Plataforma NID por R$ 980 por ano, Pix à vista ou em até 12 vezes no cartão, NIDflow incluso, 7 dias de garantia com reembolso sem pergunta. Bônus da primeira abertura: o avançado "Projeto de automação comercial com IA" incluso. Condição de fundador só na primeira turma. Nenhuma peça cita valor de parcela, "sem juros", desconto ou vagas |
| Página de destino | `produtos/plataforma/pagina-de-vendas.md` (Modo A até D-1 e a partir de D+7; Modo B de D0 a D+6). Links de e-mail vão para a página, que preserva a UTM até o checkout; links de WhatsApp, PN-LD0i e PN-LD6b vão direto ao checkout |
| Remetente | E-mail: "NID". WhatsApp: número oficial da NID, nome exibido "NID". Henrique aparece só no vídeo da oferta e na Mesa aberta, como sócio da NID |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 3.2, 4.2, 5, 6.5, 8.1, 10); `produtos/plataforma/01-estrutura.md`, `02-catalogo.md`, `03-comunidade-e-encontros.md`, `04-lancamento-interno.md`, `05-retencao-e-renovacao.md`, `pagina-de-vendas.md`; `produtos/playbook/01-playbook.md` (capítulo 7) |

Regras aplicadas em todas as mensagens: a NID fala em primeira pessoa do plural; um único CTA por mensagem (links de entrega, como gravação e formulário, aparecem como texto e nunca como botão); sem emoji em e-mail e nenhum emoji em WhatsApp nesta sequência; nunca travessão; "para" por extenso; preços só como `R$ 980`, `R$ 358,80`, `R$ 147` e `R$ 197`; nenhum termo interno (nada de "janela", "etiqueta", "base", "conversão"); a única escassez é a real: a matrícula fecha na data publicada, o bônus e a condição de fundador existem só nesta abertura; nenhuma data escrita, só variáveis; toda promessa existe nos arquivos `01` a `05` da Plataforma; Henrique só como "Henrique Leite, sócio da NID".

Vocabulário adotado para o comprador (coerente com a página): "matrícula" para o período de sete dias ("a matrícula abre", "a matrícula fecha"), "turma" para quem entra junto, "abertura" para cada período. O plano usa "janela" como termo de operação; ele não aparece em texto para o comprador.

Variáveis: `{primeiro_nome}`; `{data_abertura}` (terça-feira, por extenso, dia e mês), `{data_fechamento}` (segunda-feira), `{data_mesa_aberta}` (quinta-feira, D+2), `{data_domingo}` (D+5), `{data_abertura_turma}` (quinta-feira, D+9), `{data_primeira_mesa}` (quarta-feira, D+14), `{datas_mesas_trimestre}`, `{datas_encontros_metodo_trimestre}`, `{data_caso_nid_trimestre}`, `{mes_proxima_abertura}`; `{link_pagina_plataforma}`, `{link_pagina_plataforma_agenda}` (a página aberta na seção do calendário), `{link_checkout_plataforma}`, `{link_aviso_abertura}` (link de um clique que aplica `F2-interesse-plataforma` e abre a página de confirmação), `{link_la1_sem_numero}`, `{link_la1_tese_recusada}`, `{link_la1_projeto_grande}`, `{link_la1_comite}`, `{link_la1_renovacao}` (links de um clique que gravam `situacao_trava`), `{link_formulario_mesa_aberta}`, `{link_mesa_aberta_ao_vivo}`, `{link_gravacao_mesa_aberta}`, `{link_abertura_turma}` (página do encontro dentro do ambiente), `{link_descadastro}`.

UTM (conforme `05-integracoes.md`, seção 8.3, e seção 5 do plano): `utm_source=email` ou `whatsapp`, `utm_medium=sequencia`, `utm_campaign=F2-plataforma-lancamento-AAAAMM` (ano e mês da abertura, preenchidos pelo `automacao` a cada abertura), `utm_content` com o código da mensagem em minúsculas. Links de entrega (gravação, formulário, ambiente, links de um clique) não levam UTM.

---

## Índice

| Código | Dia e hora (Brasília) | Canal | Para quem | CTA único |
|---|---|---|---|---|
| PN-LA1 | D-21, terça, 10h | E-mail | Todos os elegíveis | A pergunta de um clique |
| PN-LA2 | D-14, terça, 10h | E-mail | Todos os elegíveis | "Quero ser avisado da abertura" |
| PN-LP1 | D-7, terça, 10h | E-mail | Todos os elegíveis | "Ver o ambiente e a oferta" |
| PN-LP2 | D-5, quinta, 10h | E-mail | Todos os elegíveis | "Ver o calendário do trimestre" |
| PN-LP3 | D-1, segunda, 10h | E-mail | Todos os elegíveis (duas variantes) | "Quero ser avisado da abertura" ou "Ver o ambiente e a oferta" |
| PN-LP3w | D-1, segunda, 10h15 | WhatsApp | Elegíveis com autorização | Link da página |
| PN-LD0i | D0, terça, 9h | E-mail | `F2-interesse-plataforma` | "Quero praticar o método com a NID por R$ 980 por ano" |
| PN-LD0 | D0, terça, 10h | E-mail | Todos os elegíveis | CTA oficial |
| PN-LD0w | D0, terça, 10h15 | WhatsApp | Elegíveis com autorização | Link do checkout |
| PN-LD1 | D+1, quarta, 10h | E-mail | Elegíveis sem compra | CTA oficial |
| PN-LD2 | D+2, quinta, 10h | E-mail | Elegíveis sem compra | "Reservar meu lugar na Mesa aberta" |
| PN-LD3 | D+3, sexta, 10h | E-mail | Elegíveis sem compra | CTA oficial |
| PN-LD5 | D+5, domingo, 10h | E-mail | Elegíveis sem compra | CTA oficial |
| PN-LD5w | D+5, domingo, 10h15 | WhatsApp | Elegíveis com autorização, sem compra | Link do checkout |
| PN-LD6a | D+6, segunda, 9h | E-mail | Elegíveis sem compra | CTA oficial |
| PN-LD6b | D+6, segunda, 18h | E-mail | Elegíveis sem compra | CTA oficial |
| PN-LD6w | D+6, segunda, 20h | WhatsApp | Elegíveis com autorização, sem compra | Link do checkout |
| PN-LF1 | D+7, terça, 10h | E-mail | Elegíveis sem compra | "Quero ser avisado da próxima abertura" |
| PN-LT1 | D+7, terça, 10h | E-mail | Quem comprou | "Reservar meu lugar na Abertura de turma" |

---

## Parte 1 · Aquecimento (D-21 a D-8)

### PN-LA1 · O que trava você depois do playbook?

**Código**: PN-LA1
**Dia e hora**: D-21, terça-feira, 10h
**Canal**: e-mail
**Público**: todos os elegíveis
**Objetivo**: nomear a dor de quem já aplica o método e registrar a situação de cada pessoa. Sem menção à Plataforma NID
**Assunto**: O que trava você depois do playbook?
**Pré-cabeçalho**: Cinco situações que aparecem quando o método já está sendo aplicado. Qual é a sua? Um clique.

**Corpo**

Olá, {primeiro_nome}.

Uma frase que a gente ouve de quem já aplicou o playbook em uma proposta real: "cada proposta nova traz uma situação que o playbook não cobre".

O playbook deu a sequência: Dor, Solução, Arquitetura, Valor. A primeira proposta saiu diferente. Depois, uma das cinco situações abaixo apareceu, e você resolveu sozinho, do jeito que deu.

1. O cliente não tem número. Ele diz "não sei quanto isso custa", e o canvas de dor fica com o campo de custo em branco.
2. A tese foi recusada. Você leu a frase de solução e ele respondeu "só me diz o que você vai fazer".
3. O projeto é grande demais. Doze etapas, três fornecedores, e o cliente quer "começar pequeno".
4. A decisão é de um comitê que você nunca vai ver. O que você manda precisa vender sozinho.
5. O contrato venceu e a conversa virou preço de novo. A renovação não parece um projeto.

Qual destas é a sua? Um clique basta. A resposta fica registrada, e a gente usa para decidir o que responder primeiro, por escrito, nas próximas semanas.

[O cliente sem número] {link_la1_sem_numero}
[A tese recusada] {link_la1_tese_recusada}
[O projeto grande demais] {link_la1_projeto_grande}
[O comitê] {link_la1_comite}
[A renovação] {link_la1_renovacao}

Se nenhuma delas é a sua, responda a este e-mail com a situação que trava a sua proposta. A gente lê tudo.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: a pergunta de um clique (cinco links que gravam `situacao_trava`). Nenhum outro link no corpo.

**Página de confirmação (após o clique em qualquer situação)**

Título: Anotado.
Texto: Sua resposta ficou registrada: {situacao_escolhida}. Nas próximas semanas a gente mostra, por escrito, o que a NID faz quando isso acontece em um projeto.

---

### PN-LA2 · Um projeto na mesa, página por página

**Código**: PN-LA2
**Dia e hora**: D-14, terça-feira, 10h
**Canal**: e-mail
**Público**: todos os elegíveis
**Objetivo**: mostrar o formato "projeto na mesa" com a revisão da NID aplicada a um projeto real; recolher interesse na abertura
**Assunto**: Um projeto na mesa, página por página
**Pré-cabeçalho**: As quatro perguntas que a NID faz a todo projeto antes de ele ir para o cliente, aplicadas a um projeto que você já conhece.

**Corpo**

Olá, {primeiro_nome}.

Na NID, nenhuma proposta vai para o cliente sem passar por outros olhos. A revisão leva uns vinte minutos e percorre sempre a mesma ordem: a frase da dor, a frase de solução, o desenho, o valor, o próximo passo. Em cada página, uma pergunta. Hoje a gente mostra essa revisão aplicada a um projeto que você já conhece: o caso do capítulo 7 do playbook, a empresa de serviços de manutenção predial.

**A frase da dor. Tem número? O número é do cliente?**

Tem: 25 visitas por mês perdidas por resposta atrasada e 5 fechamentos perdidos por orçamento sem cobrança, algo perto de R$ 60 mil por mês em serviços que não acontecem. E é do cliente: o dono fez a conta em voz alta, com os números que tinha de cabeça, e parou quando viu a soma. Quando a frase da dor chega à mesa com um número que o vendedor estimou sozinho, a revisão devolve o projeto para a conversa. Não é a proposta que está errada; é que ela ainda não tem com que ancorar o valor.

**A frase de solução. O cliente concordou antes de ver o escopo?**

Concordou, com uma ressalva: "só não quero uma coisa robótica que o síndico perceba". A ressalva virou premissa. O que a gente mais vê na mesa é a frase de solução que já descreve o entregável ("um agente de IA no WhatsApp") em vez de dizer o que precisa existir ("um atendimento que responda na hora e cobre todo orçamento, sem depender de quem já está ocupado"). A primeira, o cliente compara com o concorrente. A segunda, ele reconhece como dele.

**O desenho. Tem sequência? Tem um primeiro resultado visível? O cliente sabe o que é dele?**

Cinco etapas com marco, responsável e semana. O primeiro resultado visível está no fim da semana 2, antes de qualquer tecnologia: o roteiro de qualificação escrito. As responsabilidades do cliente estão nomeadas: duas horas do dono e da assistente, o histórico do WhatsApp, a agenda liberada. O que a revisão mais devolve nessa página: fluxos em que o cliente só vê resultado no fim, e fluxos em que nada é responsabilidade dele, o que ninguém acredita.

**O valor. Está na mesma unidade da dor? O investimento veio depois?**

A régua é a mesma da dor: cada visita que volta vale um terço de R$ 4.500; cada orçamento cobrado que fecha vale R$ 4.500. O investimento veio depois, na estrutura do desenho, com setup separado da mensalidade e o que fica fora dito por escrito. E o próximo passo tem data: a sessão de mapa do atendimento, na semana seguinte.

É assim que a NID revisa os projetos dela. E é assim que vai revisar o seu.

Nas próximas semanas a gente abre, para quem já leu o playbook, o ambiente em que isso acontece: você coloca o projeto na mesa e a NID responde por escrito, página por página. Se quiser saber a data antes de todo mundo, um clique:

[Botão] Quero ser avisado da abertura
{link_aviso_abertura}

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero ser avisado da abertura" (aplica `F2-interesse-plataforma`).

[Nota: o caso do capítulo 7 é um projeto real da NID descrito por segmento, já conhecido do leitor, e por isso serve como exemplo sem inventar prova. A partir da segunda abertura, quando existir um "Projeto da semana" de assinante revisado com autorização por escrito, ele substitui o caso do playbook neste e-mail, no mesmo formato de quatro perguntas.]

**Página de confirmação (após o clique no botão)**

Título: Anotado.
Texto: Você recebe a data da abertura por e-mail antes de todo mundo, e o link do checkout uma hora antes de a matrícula abrir. Nada é cobrado por isso.

---

## Parte 2 · Pré-abertura (D-7 a D-1)

### PN-LP1 · A Plataforma NID abre terça-feira, {data_abertura}

**Código**: PN-LP1
**Dia e hora**: D-7, terça-feira, 10h
**Canal**: e-mail
**Público**: todos os elegíveis
**Objetivo**: anunciar as datas, mostrar o ambiente pelo vídeo, apresentar a oferta completa antes de abrir
**Assunto**: A Plataforma NID abre terça-feira, {data_abertura}
**Pré-cabeçalho**: Matrícula de sete dias, o vídeo do ambiente, o que está incluso e quanto custa. Tudo antes de abrir.

**Corpo**

Olá, {primeiro_nome}.

A Plataforma NID, o ambiente em que a gente pratica o método com quem já leu o playbook, abre matrícula na terça-feira, {data_abertura}, às 10h, e fecha na segunda-feira, {data_fechamento}, às 23h59. A turma começa junta na quinta-feira, {data_abertura_turma}, às 19h, na Abertura de turma.

Antes de abrir, a gente mostra o ambiente. Henrique Leite, sócio da NID, gravou um vídeo dentro dele: as trilhas, a comunidade com um projeto na mesa e a resposta da NID, a agenda do trimestre, a Biblioteca e o NIDflow no mesmo login.

[Imagem do vídeo, com link para a página]
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-lp1

O que fica no seu acesso durante doze meses:

- Sete minicursos da trilha "O método na prática", um para cada situação que o playbook não cobre: três publicados na abertura, um novo a cada trimestre.
- A comunidade da NID, com resposta a todo projeto na mesa em até 2 dias úteis.
- 24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID e a Abertura de turma, sempre às 19h, todos gravados.
- As aulas do mini curso e os materiais do playbook, na Biblioteca.
- A Biblioteca: templates, modelo de proposta, roteiro de apresentação, checklist de reunião, banco de objeções, régua de follow-up e projetos por segmento.
- O NIDflow incluso durante toda a anuidade.
- 7 dias de garantia, reembolso sem pergunta.

R$ 980 por ano. Pix à vista ou em até 12 vezes no cartão.

Quem entrar nesta primeira turma recebe a condição de fundador: uma revisão por escrito de um projeto seu, página por página, nos primeiros 60 dias; voto com peso dobrado nos minicursos do ano seguinte; e o selo de fundador. Ela existe só na primeira turma, e a página explica por quê.

[Botão] Ver o ambiente e a oferta
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-lp1

Até terça, a página fica em modo "abre dia {data_abertura}", com a oferta completa e o botão de aviso. Quem pede o aviso recebe o link do checkout uma hora antes de a matrícula abrir para todo mundo.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Ver o ambiente e a oferta". A imagem do vídeo leva ao mesmo destino.

---

### PN-LP2 · O que tem dentro e quando acontece

**Código**: PN-LP2
**Dia e hora**: D-5, quinta-feira, 10h
**Canal**: e-mail
**Público**: todos os elegíveis
**Objetivo**: arquitetura da oferta: catálogo, bônus, calendário com datas reais, comunidade
**Assunto**: O que tem dentro e quando acontece
**Pré-cabeçalho**: Os três minicursos publicados, os quatro que vêm, o bônus desta abertura e o calendário do primeiro trimestre, com as datas.

**Corpo**

Olá, {primeiro_nome}.

Dois dias atrás a gente anunciou a data. Hoje, o que está dentro do ambiente e quando cada coisa acontece. Sem adjetivo: nome, promessa e data.

**Publicados na abertura**

Antes da Dor. Você sai de qualquer primeira conversa com a conta do custo feita com o cliente, mesmo quando ele não tem número, e sabe o que fazer quando quem está na sala não decide. Cinco aulas.

A tese recusada. Você sabe o que fazer quando o cliente não diz "faz sentido": reformular sem ceder, sustentar a ordem do método e sair com uma tese que o cliente reconhece como dele. Cinco aulas.

Projeto em fases. Você desenha projetos grandes em fases que o cliente aprova uma por vez, com um primeiro resultado visível na primeira fase, sem perder o projeto inteiro de vista. Cinco aulas, com o desenho em dois níveis no NIDflow.

**Um novo a cada trimestre, com data anunciada com 30 dias de antecedência**

A conta do valor, no primeiro trimestre. Comitê e compras, no segundo. Renovação e expansão, no terceiro. Proposta em 48 horas, no quarto. Tudo o que entra durante a sua anuidade está incluso; nada é vendido como atualização.

**Só nesta abertura**

O minicurso avançado "Projeto de automação comercial com IA", em que Henrique e o responsável pela automação comercial na NID desenham um projeto de automação do jeito que a NID desenha os dela, está incluso para quem entrar nesta turma. A partir da próxima abertura, ele passa a ser vendido dentro do ambiente por R$ 197. Quem entra agora fica com ele, mesmo sem anuidade ativa.

**O primeiro trimestre, com as datas**

- Abertura de turma: quinta-feira, {data_abertura_turma}, às 19h.
- Mesas de Projetos, a cada quinze dias, quartas, das 19h às 20h15: {datas_mesas_trimestre}.
- Encontros de Método, primeira terça do mês, às 19h: {datas_encontros_metodo_trimestre}.
- Caso NID do trimestre: {data_caso_nid_trimestre}, às 19h.

Todos gravados, com a gravação publicada em até 2 dias úteis e índice por projeto ou por assunto.

**A comunidade, em uma linha por espaço**

Projetos na mesa (o projeto que precisa de revisão antes de ir para o cliente), Propostas apresentadas (o que aconteceu na reunião), Dúvidas do método, Encontros e Avisos da NID. Todo projeto na mesa e toda dúvida recebem comentário de alguém da NID em até 2 dias úteis. É um compromisso público, escrito nas regras da comunidade.

[Botão] Ver o calendário do trimestre
{link_pagina_plataforma_agenda}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-lp2

A matrícula abre na terça-feira, {data_abertura}, às 10h. R$ 980 por ano, 7 dias de garantia.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Ver o calendário do trimestre".

---

### PN-LP3 · Amanhã às 10h

**Código**: PN-LP3
**Dia e hora**: D-1, segunda-feira, 10h
**Canal**: e-mail
**Público**: todos os elegíveis. Variante A para quem não tem `F2-interesse-plataforma`; variante B para quem tem
**Objetivo**: as regras da matrícula, a condição de fundador e o bônus, um dia antes
**Assunto**: Amanhã às 10h
**Pré-cabeçalho**: As regras da matrícula, a condição de fundador e o bônus desta abertura, antes de abrir.

**Corpo**

Olá, {primeiro_nome}.

Amanhã, terça-feira, {data_abertura}, às 10h, abre a matrícula da Plataforma NID. Fecha na segunda-feira, {data_fechamento}, às 23h59. São sete dias porque a turma entra junta: a Abertura de turma é na quinta-feira, {data_abertura_turma}, às 19h, e a NID responde ao primeiro projeto de cada pessoa nos dias seguintes. Depois disso, a próxima abertura é avisada com 30 dias de antecedência.

O que a primeira turma recebe, e por quê:

1. **Revisão por escrito de um projeto seu, página por página.** Nos primeiros 60 dias, você envia um projeto marcado como "revisão de fundador", e alguém da NID devolve a revisão completa, por escrito, em até 5 dias úteis. Só agora porque, com a primeira turma, cabe.
2. **Voto com peso dobrado.** No mês 12, os assinantes votam nos dois minicursos inclusos do ano seguinte. O voto de quem é fundador vale dois.
3. **Selo de fundador**, no perfil da comunidade e em "Minha conta", enquanto a anuidade estiver ativa.

O bônus desta abertura: o minicurso avançado "Projeto de automação comercial com IA", incluso para quem entrar nesta turma. A partir da próxima abertura, é vendido dentro do ambiente por R$ 197.

O que a condição de fundador não é: não é preço menor, não é preço travado e não é acesso vitalício. É o que a NID consegue cumprir para a primeira turma.

R$ 980 por ano. Pix à vista ou em até 12 vezes no cartão. 7 dias de garantia, reembolso sem pergunta.

[Variante A, sem `F2-interesse-plataforma`:]

Quem está na lista de aviso recebe o link do checkout amanhã às 9h, uma hora antes de abrir para todo mundo. Para entrar na lista, um clique:

[Botão] Quero ser avisado da abertura
{link_aviso_abertura}

[Variante B, com `F2-interesse-plataforma`:]

Você está na lista de aviso: o link do checkout chega no seu e-mail amanhã às 9h, uma hora antes de abrir para todo mundo. Até lá, a página com o vídeo e a oferta completa:

[Botão] Ver o ambiente e a oferta
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-lp3

[Fim das variantes]

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero ser avisado da abertura" (variante A) ou "Ver o ambiente e a oferta" (variante B).

---

### PN-LP3w · Amanhã às 10h (WhatsApp)

**Código**: PN-LP3w
**Dia e hora**: D-1, segunda-feira, 10h15
**Canal**: WhatsApp (modelo de marketing aprovado)
**Público**: elegíveis com telefone e sem `F2-optout-whatsapp`; sem conversa humana aberta
**Objetivo**: lembrete da hora
**Primeira linha**: Aqui é a NID. Amanhã às 10h abre a matrícula da Plataforma NID.

**Mensagem**

Aqui é a NID. Amanhã às 10h abre a matrícula da Plataforma NID, o ambiente em que a gente pratica o método com quem já leu o playbook. Fecha segunda-feira, {data_fechamento}, às 23h59. A página com tudo: {link_pagina_plataforma}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-lp3w

**CTA único**: o link da página. Respostas vão para o agente com a base da Plataforma (seção 6.3 do plano).

---

## Parte 3 · Matrícula aberta (D0 a D+6)

### PN-LD0i · Seu link, uma hora antes

**Código**: PN-LD0i
**Dia e hora**: D0, terça-feira, 9h
**Canal**: e-mail
**Público**: `F2-interesse-plataforma`
**Objetivo**: acesso antecipado real ao checkout, que já está aberto
**Assunto**: Seu link, uma hora antes
**Pré-cabeçalho**: Você pediu o aviso. O checkout da Plataforma NID já está aberto para quem está nesta lista.

**Corpo**

Olá, {primeiro_nome}.

Você pediu para ser avisado da abertura. O checkout da Plataforma NID já está aberto para quem está nesta lista; para todo mundo, abre às 10h.

Em cinco linhas:

- Um ano de prática do método com a NID: sete minicursos, comunidade com resposta em até 2 dias úteis, 40 encontros gravados, Biblioteca e NIDflow incluso.
- Condição de fundador: revisão por escrito de um projeto seu, voto com peso dobrado, selo.
- Bônus desta abertura: o avançado "Projeto de automação comercial com IA", incluso.
- R$ 980 por ano. Pix à vista ou em até 12 vezes no cartão.
- 7 dias de garantia, reembolso sem pergunta. Matrícula até segunda-feira, {data_fechamento}, às 23h59.

[Botão] Quero praticar o método com a NID por R$ 980 por ano
{link_checkout_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld0i

Obrigado por ter respondido. A turma começa na quinta-feira, {data_abertura_turma}, às 19h.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o CTA oficial, direto ao checkout.

---

### PN-LD0 · Aberto: a Plataforma NID

**Código**: PN-LD0
**Dia e hora**: D0, terça-feira, 10h
**Canal**: e-mail
**Público**: todos os elegíveis. Bloco adicional para `F2-nidflow-ativo`
**Objetivo**: abrir a matrícula com o arco completo em versão curta
**Assunto**: Aberto: a Plataforma NID
**Pré-cabeçalho**: Matrícula aberta até segunda-feira, {data_fechamento}, às 23h59. O que é, o que está incluso, quanto custa.

**Corpo**

Olá, {primeiro_nome}.

A matrícula da Plataforma NID está aberta. Fecha na segunda-feira, {data_fechamento}, às 23h59.

Você já conhece o problema: cada proposta nova traz uma situação que o playbook não cobre, e não há com quem discutir antes de apresentar. O cliente sem número, a tese recusada, o projeto grande demais, o comitê, a renovação. Você decide sozinho, a proposta sai, e o furo aparece na frente do cliente.

A Plataforma NID é o ambiente em que o seu projeto passa pela mesa antes de ir para o cliente, do mesmo jeito que os projetos da NID passam. Você coloca o projeto na mesa; alguém da NID responde por escrito em até 2 dias úteis; a cada quinze dias, quatro projetos são revisados ao vivo por Henrique Leite, sócio da NID, na Mesa de Projetos; e, para cada situação que o playbook não cobre, existe um minicurso com a resposta da NID.

O que fica no seu acesso durante doze meses:

1. Sete minicursos da trilha "O método na prática". A próxima situação que o playbook não cobre já tem a resposta da NID, antes de você decidir sozinho.
2. A comunidade da NID, com resposta a todo projeto na mesa em até 2 dias úteis. Você descobre o furo na mesa, não na reunião.
3. 40 encontros ao vivo por ano, sempre às 19h, todos gravados. Uma Mesa por mês, ao vivo ou gravada, já muda o que você apresenta.
4. As aulas do mini curso e os materiais do playbook, na Biblioteca. Desenho, apresentação e prática no mesmo login.
5. A Biblioteca: templates, modelo de proposta, roteiro, checklist, banco de objeções, régua de follow-up e projetos por segmento. Quando aparecer um cliente de um segmento que você nunca vendeu, existe um projeto daquele segmento desenhado e revisado.
6. O NIDflow incluso. O projeto que vai para a mesa é o mesmo que vai para a tela do cliente.
7. Um único e-mail por semana, com o que aconteceu e o próximo encontro. Você entra quando tem proposta.

[Bloco só para `F2-nidflow-ativo`:]

Você já assina o NIDflow: a mensalidade encerra no ciclo seguinte, sem cobrança dupla, e a conta continua a mesma, com todos os projetos. O NIDflow que você já usa está dentro da anuidade.

[Fim do bloco]

R$ 980 por ano. Pix à vista ou em até 12 vezes no cartão. Dentro desse valor já estão duas coisas que você compraria separadas: o NIDflow, que sozinho custa R$ 358,80 por ano, e as aulas do mini curso, que custam R$ 147. O resto é o que não se compra avulso. E um projeto perdido por uma proposta mal desenhada custa mais do que isso; você conhece esse número melhor do que a gente.

Quem entra nesta primeira turma recebe a condição de fundador (revisão por escrito de um projeto seu, voto com peso dobrado, selo) e o bônus desta abertura: o avançado "Projeto de automação comercial com IA", incluso.

[Botão] Quero praticar o método com a NID por R$ 980 por ano
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld0

7 dias de garantia, reembolso sem pergunta. A turma começa na quinta-feira, {data_abertura_turma}, às 19h.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o CTA oficial.

---

### PN-LD0w · Aberto (WhatsApp)

**Código**: PN-LD0w
**Dia e hora**: D0, terça-feira, 10h15
**Canal**: WhatsApp (modelo de marketing aprovado)
**Público**: elegíveis com telefone, sem `F2-optout-whatsapp`, sem conversa humana aberta
**Objetivo**: abrir
**Primeira linha**: Aqui é a NID. A matrícula da Plataforma NID está aberta.

**Mensagem**

Aqui é a NID. A matrícula da Plataforma NID está aberta até segunda-feira, {data_fechamento}, às 23h59. R$ 980 por ano, Pix ou em até 12 vezes no cartão, com o NIDflow incluso e 7 dias de garantia: {link_checkout_plataforma}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld0w

**CTA único**: o link do checkout.

---

### PN-LD1 · O que está incluso, item por item

**Código**: PN-LD1
**Dia e hora**: D+1, quarta-feira, 10h
**Canal**: e-mail
**Público**: elegíveis sem compra. Linha adicional para `F2-nidflow-leitura` ou `F2-nidflow-cancelado`
**Objetivo**: arquitetura e valor em detalhe; convite para a Mesa aberta com o formulário de inscrição
**Assunto**: O que está incluso, item por item
**Pré-cabeçalho**: A conta do valor, feita por escrito. E o convite para a Mesa de Projetos aberta de quinta, às 19h.

**Corpo**

Olá, {primeiro_nome}.

Ontem a gente abriu a matrícula. Hoje, a conta, do jeito que o método pede na página de valor de qualquer proposta: primeiro o que se ganha, depois o investimento.

**O que está incluso, e o que cada item significa para quem vende**

1. Trilha "O método na prática": sete minicursos, três publicados na abertura e um novo por trimestre, com aulas de 10 a 15 minutos e um entregável feito no seu projeto real. Significa: a próxima situação que o playbook não cobre já tem a resposta da NID praticada.
2. A comunidade da NID, com resposta a todo projeto na mesa e a toda dúvida em até 2 dias úteis. Significa: a proposta deixa de ir para o cliente sem revisão.
3. 24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID e a Abertura de turma, todos às 19h e gravados com índice. Significa: quem vende de dia não perde nada; uma Mesa por mês já muda o que você apresenta.
4. As oito aulas do Mini curso NID · Apresente para Fechar e os materiais do playbook, na Biblioteca, mesmo para quem não comprou os dois. Significa: desenho, apresentação e prática no mesmo lugar.
5. A Biblioteca: os cinco templates, o modelo de proposta em nove páginas, o roteiro de apresentação, o checklist de reunião, o banco de objeções, a régua de follow-up e os projetos desenhados por segmento. Significa: um cliente de um segmento novo já tem um projeto daquele segmento para você começar.
6. O NIDflow incluso durante toda a anuidade, com os templates do método dentro, o modo de apresentação e a exportação em PDF. Significa: o projeto da mesa é o projeto da tela do cliente. [Linha só para `F2-nidflow-leitura` ou `F2-nidflow-cancelado`: Sua conta do NIDflow volta com os projetos que você desenhou, se dentro de 90 dias do encerramento.]
7. 7 dias de garantia, reembolso sem pergunta.

**A conta**

O NIDflow sozinho custa R$ 358,80 por ano. As aulas do mini curso custam R$ 147. Os dois já estão dentro dos R$ 980. O que sobra paga o que não se compra avulso: a resposta da NID no seu projeto, 40 encontros, sete minicursos, a Biblioteca. Pix à vista ou em até 12 vezes no cartão.

**Quinta-feira, às 19h: uma Mesa de Projetos aberta**

Para você ver o que acontece quando um projeto vai para a mesa, a Mesa de Projetos desta quinta-feira, {data_mesa_aberta}, é aberta a quem tem o playbook. Henrique Leite, sócio da NID, revisa três projetos de leitores do playbook ao vivo, página por página, na ordem de sempre: dor, solução, desenho, valor, próximo passo. Não precisa ser assinante para assistir.

Quem quiser levar o próprio projeto se inscreve até hoje, às 20h, pelo formulário: {link_formulario_mesa_aberta}. São três projetos por Mesa, e a NID escolhe entre os inscritos. O link do ao vivo chega amanhã de manhã.

[Botão] Quero praticar o método com a NID por R$ 980 por ano
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld1

Matrícula aberta até segunda-feira, {data_fechamento}, às 23h59.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o CTA oficial. O formulário da Mesa aberta é link de texto (entrega, sem UTM), conforme a exceção prevista na seção 5 do plano.

---

### PN-LD2 · Hoje às 19h: três projetos na mesa, ao vivo

**Código**: PN-LD2
**Dia e hora**: D+2, quinta-feira, 10h
**Canal**: e-mail
**Público**: elegíveis sem compra
**Objetivo**: lembrete da Mesa aberta com o link do ao vivo
**Assunto**: Hoje às 19h: três projetos na mesa, ao vivo
**Pré-cabeçalho**: A Mesa de Projetos aberta. Três projetos de leitores do playbook, revisados página por página por Henrique Leite, sócio da NID.

**Corpo**

Olá, {primeiro_nome}.

Hoje, às 19h, a Mesa de Projetos é aberta a quem tem o playbook. É o encontro que acontece a cada quinze dias dentro da Plataforma NID, e hoje você assiste sem ser assinante.

O que vai acontecer, em 75 minutos: três projetos reais de leitores do playbook, descritos por segmento, revisados ao vivo por Henrique Leite, sócio da NID. Quem apresenta lê a página; a NID pergunta; a sala comenta depois. Sempre na mesma ordem: a frase da dor (tem número? é do cliente?), a frase de solução (o cliente concordou?), o desenho (tem sequência? tem primeiro resultado visível?), o valor (está na mesma unidade da dor?), o próximo passo (tem data?). No fim, o padrão da noite: a etapa que mais travou nos três projetos.

Traga a sua proposta aberta ao lado. A revisão de um projeto de outro segmento vale para o seu, porque a pergunta é a mesma.

[Botão] Reservar meu lugar na Mesa aberta
{link_mesa_aberta_ao_vivo}

A gravação fica disponível por 48 horas para quem tem o playbook e chega amanhã por e-mail. A matrícula da Plataforma NID fecha na segunda-feira, {data_fechamento}, às 23h59.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Reservar meu lugar na Mesa aberta" (link do ao vivo, sem UTM).

---

### PN-LD3 · A gravação da Mesa e as cinco perguntas mais feitas

**Código**: PN-LD3
**Dia e hora**: D+3, sexta-feira, 10h
**Canal**: e-mail
**Público**: elegíveis sem compra
**Objetivo**: gravação da Mesa aberta e as cinco objeções respondidas
**Assunto**: A gravação da Mesa e as cinco perguntas mais feitas
**Pré-cabeçalho**: A Mesa aberta de ontem, gravada, até domingo às 23h59. E as cinco perguntas que mais chegaram nestes três dias, respondidas.

**Corpo**

Olá, {primeiro_nome}.

A gravação da Mesa de Projetos de ontem está aqui, com índice por projeto, disponível até domingo, {data_domingo}, às 23h59: {link_gravacao_mesa_aberta}. Depois disso, fica só dentro do ambiente.

Nestes três dias, cinco perguntas chegaram mais do que todas as outras, pelo WhatsApp e pelo direct. A gente responde por escrito, do mesmo jeito que responde na página.

**"R$ 980 é muito para mim agora."**

A gente entende, e não vai te apressar. Dentro dos R$ 980 já estão o NIDflow (R$ 358,80 por ano) e as aulas do mini curso (R$ 147); o resto é a prática com a NID. Dá para pagar por Pix à vista ou em até 12 vezes no cartão, e você tem 7 dias de garantia. E, com honestidade: se você ainda não aplicou o playbook em uma proposta real, aplique primeiro. A próxima abertura vem, e o ambiente vai valer mais para quem chega com projeto.

**"Não tenho tempo para comunidade e encontro."**

O ambiente foi feito para quem vende de dia. Os encontros são às 19h, a gravação sai em até 2 dias úteis com índice por projeto, e a resposta da NID é por escrito, no seu post. O mínimo que funciona: um projeto na mesa quando você tiver proposta e uma Mesa por mês, ao vivo ou gravada. Não existe obrigação de presença nem ranking de quem posta mais.

**"Já tenho o playbook e o NIDflow. O que muda?"**

Muda a revisão. No playbook, o método é seu e você decide sozinho. No ambiente, o projeto passa por outros olhos e pela NID antes de ir para o cliente. E os sete minicursos tratam do que o playbook não cobre: o cliente sem número, a tese recusada, o projeto em fases, a conta do valor sem cifrão, o comitê, a renovação, a proposta em 48 horas. Se você já assina o NIDflow, a mensalidade encerra no ciclo seguinte, sem cobrança dupla.

**"Isso é mais um curso?"**

Não. Não tem aula para assistir e sumir. Tem projeto real na mesa, resposta da NID em até 2 dias úteis e uma Mesa de Projetos a cada quinze dias. Os minicursos existem para a situação que apareceu na sua proposta, não para "aprender vendas". Foi isso que você viu ontem, ou vê na gravação.

**"E se eu não usar?"**

Nos primeiros 7 dias, reembolso sem pergunta. Depois, a anuidade vale doze meses, renova automaticamente pelo mesmo valor, e a gente avisa com 60, 30 e 7 dias de antecedência. Cancelar a renovação é um clique em "Minha conta". Ninguém fica preso.

[Botão] Quero praticar o método com a NID por R$ 980 por ano
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld3

Matrícula aberta até segunda-feira, {data_fechamento}, às 23h59. A turma começa na quinta-feira, {data_abertura_turma}, às 19h.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o CTA oficial. A gravação é link de texto (entrega, sem UTM).

---

### PN-LD5 · Para quem é (e para quem ainda não é)

**Código**: PN-LD5
**Dia e hora**: D+5, domingo, 10h
**Canal**: e-mail
**Público**: elegíveis sem compra
**Objetivo**: qualificar pelos quatro perfis; dizer quem deve esperar; o fato do fechamento
**Assunto**: Para quem é (e para quem ainda não é)
**Pré-cabeçalho**: O que cada perfil faz no ambiente no primeiro mês. E quem deve esperar a próxima abertura.

**Corpo**

Olá, {primeiro_nome}.

A matrícula da Plataforma NID fecha amanhã, segunda-feira, às 23h59. Antes disso, a pergunta que importa: o ambiente é para você agora?

**É para você se**

Você é vendedor B2B e cada proposta nova traz uma situação que o playbook não cobre. No primeiro mês, você coloca a proposta que está na sua mesa em "Projetos na mesa", recebe a resposta da NID em até 2 dias úteis e refaz a página que travou antes da reunião. O minicurso "Antes da Dor" resolve o cliente que não dá número.

Você é SDR ou BDR e quer conduzir uma conta. No primeiro mês, você desenha no NIDflow uma das oportunidades que qualificou, leva para a mesa e começa a montar um portfólio de projetos revisados: a prova de que você já desenha o que outros fecham.

Você é closer ou executivo de contas e precisa de um projeto que sobreviva ao comitê sem você na sala. No primeiro mês, você leva a proposta do maior contrato aberto para a Mesa de Projetos e sai com a página de valor e o próximo passo revisados. O minicurso "Comitê e compras" chega no segundo trimestre; até lá, a Mesa e a Biblioteca cobrem.

Você é consultor ou dono de serviço e vende o próprio trabalho. No primeiro mês, você desenha a próxima proposta como projeto, com setup e mensalidade quando fizer sentido, e a NID revisa a tabela de valor antes de você mostrar o preço. O minicurso "Projeto em fases" resolve o cliente que quer "começar pequeno".

**Ainda não é para você se**

Você leu o playbook, mas ainda não aplicou em uma proposta real. Aplique primeiro. A revisão da NID vale para projeto que existe; sem projeto, o ambiente vira aula para assistir, e não é para isso que ele foi feito. A próxima abertura é avisada com 30 dias de antecedência, e você entra com projeto.

Você procura rede de contatos ou clientes entre os assinantes. Ninguém prospecta ninguém lá dentro, e a regra é cumprida.

Você é empresário ou diretor e quer contratar geração de demanda, automação comercial ou time de vendas para a sua empresa. Nesse caso, a NID desenha o seu projeto com você: responda a este e-mail e a gente conversa.

Se é para você, o resto você já sabe: R$ 980 por ano, Pix à vista ou em até 12 vezes no cartão, NIDflow incluso, condição de fundador, o avançado de automação comercial com IA incluso nesta abertura e 7 dias de garantia.

[Botão] Quero praticar o método com a NID por R$ 980 por ano
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld5

A matrícula fecha amanhã, segunda-feira, {data_fechamento}, às 23h59.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o CTA oficial. A resposta do empresário ou diretor abre tarefa humana para o Funil 1 (fluxo do `automacao`), sem link no corpo.

---

### PN-LD5w · Fecha amanhã (WhatsApp)

**Código**: PN-LD5w
**Dia e hora**: D+5, domingo, 10h15
**Canal**: WhatsApp (modelo de marketing aprovado)
**Público**: elegíveis com telefone, sem `F2-optout-whatsapp`, sem compra, sem conversa humana aberta
**Objetivo**: o fato do prazo
**Primeira linha**: Aqui é a NID. A matrícula da Plataforma NID fecha amanhã, segunda-feira, às 23h59.

**Mensagem**

Aqui é a NID. A matrícula da Plataforma NID fecha amanhã, segunda-feira, às 23h59. Se a sua próxima proposta merece passar pela mesa antes de ir para o cliente, o link é este: {link_checkout_plataforma}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld5w

**CTA único**: o link do checkout.

---

### PN-LD6a · Fecha hoje às 23h59

**Código**: PN-LD6a
**Dia e hora**: D+6, segunda-feira, 9h
**Canal**: e-mail
**Público**: elegíveis sem compra
**Objetivo**: último dia, a oferta em dez linhas, nada além do fato
**Assunto**: Fecha hoje às 23h59
**Pré-cabeçalho**: A oferta da Plataforma NID em dez linhas. Nada além do fato.

**Corpo**

Olá, {primeiro_nome}.

A matrícula da Plataforma NID fecha hoje, segunda-feira, às 23h59. A oferta, em dez linhas, sem argumento novo:

1. Um ano de prática do método com a NID, para quem já aplica o playbook.
2. Sete minicursos da trilha "O método na prática": três publicados, um novo por trimestre.
3. Comunidade da NID, com resposta a todo projeto na mesa em até 2 dias úteis.
4. 24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID e a Abertura de turma, todos gravados.
5. Aulas do mini curso, materiais do playbook e a Biblioteca completa.
6. NIDflow incluso durante toda a anuidade.
7. Bônus desta abertura: o avançado "Projeto de automação comercial com IA", incluso.
8. Condição de fundador: revisão por escrito de um projeto seu, voto com peso dobrado, selo.
9. R$ 980 por ano. Pix à vista ou em até 12 vezes no cartão. 7 dias de garantia, reembolso sem pergunta.
10. A turma começa na quinta-feira, {data_abertura_turma}, às 19h. A próxima abertura é avisada com 30 dias de antecedência.

[Botão] Quero praticar o método com a NID por R$ 980 por ano
{link_pagina_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld6a

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o CTA oficial.

---

### PN-LD6b · Seis horas

**Código**: PN-LD6b
**Dia e hora**: D+6, segunda-feira, 18h
**Canal**: e-mail
**Público**: elegíveis sem compra
**Objetivo**: fechamento, com uma pergunta
**Assunto**: Seis horas
**Pré-cabeçalho**: A matrícula fecha às 23h59. Uma pergunta.

**Corpo**

Olá, {primeiro_nome}.

A matrícula da Plataforma NID fecha hoje às 23h59. Depois disso, a próxima abertura é avisada com 30 dias de antecedência.

Uma pergunta, só: qual proposta você quer levar para a primeira Mesa de Projetos, na quarta-feira, {data_primeira_mesa}?

[Botão] Quero praticar o método com a NID por R$ 980 por ano
{link_checkout_plataforma}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld6b

7 dias de garantia, reembolso sem pergunta.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o CTA oficial, direto ao checkout.

---

### PN-LD6w · Última mensagem nesta matrícula (WhatsApp)

**Código**: PN-LD6w
**Dia e hora**: D+6, segunda-feira, 20h
**Canal**: WhatsApp (modelo de marketing aprovado)
**Público**: elegíveis com telefone, sem `F2-optout-whatsapp`, sem compra, sem conversa humana aberta
**Objetivo**: fechamento
**Primeira linha**: Aqui é a NID. Última mensagem sobre a Plataforma NID nesta matrícula.

**Mensagem**

Aqui é a NID. Última mensagem sobre a Plataforma NID nesta matrícula: fecha hoje às 23h59. {link_checkout_plataforma}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-plataforma-lancamento-AAAAMM&utm_content=pn-ld6w

**CTA único**: o link do checkout.

---

## Parte 4 · Pós-matrícula (D+7)

### PN-LF1 · A matrícula fechou

**Código**: PN-LF1
**Dia e hora**: D+7, terça-feira, 10h
**Canal**: e-mail
**Público**: elegíveis sem compra. Aplica `F2-plataforma-nao-comprou-j[n]`
**Objetivo**: encerrar sem pressão; oferecer o aviso da próxima abertura
**Assunto**: A matrícula fechou
**Pré-cabeçalho**: Fechou ontem às 23h59. A próxima abertura, o que continua disponível e um único botão.

**Corpo**

Olá, {primeiro_nome}.

A matrícula da Plataforma NID fechou ontem, segunda-feira, às 23h59. A turma começa na quinta-feira, na Abertura de turma, e a partir daí o ambiente segue no ritmo dele.

[Variante A, mês decidido:] A próxima abertura é em {mes_proxima_abertura}.
[Variante B, mês não decidido:] A próxima abertura é avisada com 30 dias de antecedência.

Até lá, o que você já tem continua valendo: o playbook, os templates e o checklist; as aulas do mini curso, se você as tem; e o NIDflow, por mês, se quiser desenhar na tela. A gente volta a falar da Plataforma NID só quando a próxima data existir.

Se quiser receber essa data antes de todo mundo, com o link do checkout uma hora antes de abrir:

[Botão] Quero ser avisado da próxima abertura
{link_aviso_abertura}

Enquanto isso, a melhor preparação é a de sempre: desenhe a próxima proposta com o método. É com ela que você entra.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero ser avisado da próxima abertura" (aplica `F2-interesse-plataforma`). Nenhuma menção a reabertura, nenhuma oferta.

---

### PN-LT1 · A turma começa quinta às 19h

**Código**: PN-LT1
**Dia e hora**: D+7, terça-feira, 10h
**Canal**: e-mail
**Público**: quem comprou durante a matrícula (`F2-plataforma-ativo`)
**Objetivo**: levar à Abertura de turma com o projeto na mesa
**Assunto**: A turma começa quinta às 19h
**Pré-cabeçalho**: A Abertura de turma, os três passos de "Comece por aqui" e o que fazer antes de quinta.

**Corpo**

Olá, {primeiro_nome}.

A matrícula fechou e a turma está formada. A Abertura de turma é na quinta-feira, {data_abertura_turma}, às 19h, com Henrique Leite, sócio da NID: o que o ambiente é e o que não é, as regras da comunidade em cinco frases, o calendário do trimestre e três projetos da turma revisados ao vivo, escolhidos entre os que estiverem em "Projetos na mesa" até quarta-feira.

Antes de quinta, os três passos de "Comece por aqui", que levam uns quinze minutos:

1. Ative o NIDflow: um clique, mesmo login.
2. Coloque o seu projeto na mesa. O formulário de "Projetos na mesa" pede o segmento do cliente (sem nome), a etapa em que o projeto está, o que trava e o anexo. É esse projeto que pode ser revisado na quinta.
3. Assista à primeira aula do minicurso "Antes da Dor": 12 minutos.

Se você já fez os três, a resposta da NID ao seu projeto chega em até 2 dias úteis, no seu post.

A revisão de fundador (um projeto seu, por escrito, página por página, nos primeiros 60 dias) é pedida pelo mesmo formulário, marcando "revisão de fundador". Pode ser o mesmo projeto ou outro.

[Botão] Reservar meu lugar na Abertura de turma
{link_abertura_turma}

A gravação sai em até 2 dias úteis, fixada em "Encontros" por 30 dias. A primeira Mesa de Projetos com a turma é na quarta-feira, {data_primeira_mesa}, às 19h.

NID · Consultoria de Performance Comercial

**CTA único**: "Reservar meu lugar na Abertura de turma" (link do encontro dentro do ambiente, sem UTM). Sem link de descadastro: é e-mail de serviço do assinante.

---

## Checklist de coerência deste arquivo

- [x] Dezenove mensagens com os códigos, dias, horas, canais, públicos e objetivos da seção 5 do plano
- [x] Preço só como `R$ 980`; parcelamento só como "em até 12 vezes no cartão", sem valor de parcela e sem "sem juros"; NIDflow incluso em toda descrição da oferta
- [x] Nenhuma data escrita; todas como variáveis preenchidas pelo `automacao`
- [x] Escassez só verdadeira: data de fechamento, bônus da abertura, condição de fundador. Sem "vagas", sem "última chance", sem contagem fora do fato
- [x] Nenhum número de conversão, retenção ou meta em texto para o comprador
- [x] Toda promessa existe nos arquivos `01` a `05` da Plataforma e na página de vendas (mesmos itens, mesmos prazos, mesmos nomes de minicurso e de encontro)
- [x] CTA oficial idêntico ao da página: "Quero praticar o método com a NID por R$ 980 por ano"
- [x] Um CTA por mensagem; gravação e formulário como links de texto de entrega
- [x] Sem emoji, sem travessão, sem "pra" ou "pro", sem termo interno; Henrique só como "Henrique Leite, sócio da NID"; assinatura NID em todas
- [x] UTM `F2-plataforma-lancamento-AAAAMM` em todo link de página ou checkout, com `utm_content` igual ao código em minúsculas
