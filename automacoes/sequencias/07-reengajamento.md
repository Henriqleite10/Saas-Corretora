# Sequência 07 · Reengajamento: recuperação de checkout, pagamento pendente ou recusado e conteúdo contínuo

| Campo | Valor |
|---|---|
| Fluxos de origem | `automacoes/02-entrega-pos-compra.md`, seção 6 (R1, R2, R3, P1, P2, N1, N2; os códigos P1 e P2 do fluxo aparecem aqui como PX1 e PX2) e `docs/00-brief-mestre.md`, seção 8.1 (conteúdo contínuo a partir de D+15). Códigos, momentos, canais e condições são os do fluxo |
| Códigos neste arquivo | R1, R2, R3 (abandono de checkout); PX1 e PX2 (Pix ou boleto gerado e não pago; renomeados de P1 e P2 porque P1, P2 e P3 ficam reservados às perguntas de qualificação de `04-gatilho-a.md`; o fluxo `02-entrega-pos-compra.md`, seção 6, precisa da mesma troca); N1 e N2 (pagamento recusado); CC1 a CC4 (conteúdo contínuo, D+15 em diante) |
| Quem recebe R1 a N2 | Quem preencheu e-mail ou telefone no checkout e não concluiu. A primeira compra encerra tudo. No máximo 3 toques por situação |
| Quem recebe CC1 a CC4 | Toda a base do Funil 2 com e-mail e sem opt-out (compradores depois do D+14 e leads de checkout abandonado depois de R3), pela ferramenta de conteúdo contínuo, com o rodapé de descadastro. Compradores que já viraram `F2-funil1-cliente` recebem só o conteúdo (as variantes sem oferta) |
| Remetente | E-mail: "NID". WhatsApp: número oficial da NID |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 4, 6.1, 8.1, 10), `produtos/playbook/01-playbook.md` (capítulos 1 a 6), `produtos/playbook/pagina-de-vendas.md`, `produtos/mini-curso/00-grade.md` |

Regras aplicadas: um único CTA por mensagem; sem emoji em e-mail e nenhum em WhatsApp neste arquivo; nunca travessão; "para" por extenso; preços só `R$ 29,90` e `R$ 147`; sem urgência falsa (o link continua valendo; o Pix tem prazo real e só ele é citado); nenhuma culpa por pagamento recusado; conteúdo contínuo ensina um pedaço do método com o texto do playbook, sem inventar caso; mini curso e NIDflow no máximo uma menção por mês cada, conforme os fluxos `02` e `03`.

Variáveis: `{primeiro_nome}` (se o checkout não tiver nome, a saudação é "Olá."), `{link_checkout}` (retorno ao checkout do playbook), `{prazo_pix}`, `{link_area_membros}`, `{link_pagina_oferta}`, `{link_pagina_minicurso}`, `{link_area_membros_nidflow}` (projeto aberto no mapa de solução, só para assinante), `{link_aula_5}` (área de membros, só para quem tem o mini curso), `{link_descadastro}`.

UTM (conforme `05-integracoes.md`, seção 8.3): R1 a N2 com `utm_campaign=F2-playbook`, `utm_medium=sequencia`, `utm_content` igual ao código em minúsculas. CC1 a CC4 com `utm_medium=sequencia`, `utm_campaign` do produto do CTA (`F2-playbook`, `F2-nidflow-cta` ou `F2-minicurso`) e `utm_content=cc1` a `cc4`. Os valores `cc1` a `cc4`, `r1` a `r3`, `p1`, `p2`, `n1` e `n2` de `utm_content` precisam ser registrados pelo `automacao` (decisão deste arquivo).

---

## Parte 1 · Abandono de checkout (R1, R2, R3)

Condição de entrada: e-mail ou telefone preenchido no checkout, sem `purchase_approved` em 30 minutos. Compra em qualquer ponto cancela o restante.

### R1 · Seu playbook ficou no carrinho

**Código**: R1
**Momento**: 1 hora após o abandono, entre 8h e 21h (fora disso, no próximo horário válido)
**Canal**: e-mail
**Condição**: e-mail preenchido; sem compra
**Assunto**: Seu playbook ficou no carrinho
**Pré-cabeçalho**: O método para a próxima proposta, por R$ 29,90, com 7 dias de garantia. O link continua o mesmo.

**Corpo**

Olá, {primeiro_nome}.

Você começou a comprar o Playbook NID · Desenhe para Vender e não concluiu. Acontece; o link continua o mesmo, e nada foi cobrado.

O que ele resolve: a próxima proposta. Em vez de um orçamento que o cliente compara com o concorrente mais barato, um projeto desenhado que ele vê antes de ver o preço.

O que chega no seu e-mail em até 2 minutos:

- O playbook em PDF, com o Método NID em quatro etapas: Dor, Solução, Arquitetura e Valor, e um caso conduzido do início ao fim.
- Cinco templates de fluxo para preencher na próxima proposta, com instruções e exemplo preenchido.
- O checklist "proposta pronta para apresentar".

R$ 29,90, com 7 dias de garantia e reembolso sem pergunta.

[Botão] Quero o playbook por R$ 29,90
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=r1

7 dias de garantia, reembolso sem pergunta.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero o playbook por R$ 29,90"

---

### R2 · WhatsApp (24 horas)

**Código**: R2
**Momento**: 24 horas após o abandono, entre 9h e 20h, segunda a sábado
**Canal**: WhatsApp (modelo de marketing aprovado)
**Condição**: telefone preenchido; sem compra; sem opt-out de WhatsApp
**Primeira linha**: Aqui é a NID. Você começou a comprar o playbook e não concluiu.

**Mensagem**

Aqui é a NID. Você começou a comprar o Playbook NID · Desenhe para Vender e não concluiu. Se ficou alguma dúvida sobre o método ou sobre o que vem dentro, responde aqui que a gente explica. O link continua o mesmo: {link_checkout}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=r2

**CTA único**: o link do checkout (a resposta abre conversa com o agente, origem `sequencia:R2`, textos em `06-agente-direct-whatsapp.md`)

---

### R3 · A objeção que mais ouvimos

**Código**: R3
**Momento**: 72 horas após o abandono, entre 8h e 21h
**Canal**: e-mail
**Condição**: e-mail preenchido; sem compra. Última mensagem da recuperação
**Assunto**: A objeção que mais ouvimos
**Pré-cabeçalho**: "Já sei vender, o problema é o cliente." Concordamos. Por isso o método não é sobre vender.

**Corpo**

Olá, {primeiro_nome}.

"Já sei vender. O problema é o cliente." É o que a gente mais ouve de quem vende algo que precisa ser explicado, e costuma ser verdade. Quem chegou até o checkout de um playbook sobre desenho de projetos sabe conduzir uma conversa.

O método não ensina a vender. Ele muda o que fica na mesa do cliente depois que você sai. Hoje fica um orçamento: capa, quem somos, lista de entregáveis, preço. Orçamento se compara, e o que se compara se decide por preço. Com o método, fica um projeto desenhado: o problema dele em uma frase, o que precisa mudar, o fluxo do primeiro dia ao resultado e o que ele ganha antes do investimento. É o documento que o decisor ausente entende sem você na sala.

Você continua conduzindo a reunião do seu jeito. O playbook muda o documento.

Esta é a última mensagem sobre o carrinho. O link continua valendo, sem prazo, por R$ 29,90 e com 7 dias de garantia.

[Botão] Quero o playbook por R$ 29,90
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=r3

7 dias de garantia, reembolso sem pergunta.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero o playbook por R$ 29,90". Depois de R3 sem compra: `F2-checkout-abandonado`, entra no conteúdo contínuo (só e-mail) e não recebe mais WhatsApp automático.

---

## Parte 2 · Pix ou boleto gerado e não pago (PX1, PX2)

### PX1 · WhatsApp (30 minutos)

**Código**: PX1 (Pix)
**Momento**: 30 minutos após gerar o Pix ou o boleto, sem pagamento, entre 8h e 22h
**Canal**: WhatsApp (modelo de utilidade aprovado)
**Condição**: telefone preenchido; `pix_gerado` ou `boleto_gerado` sem `purchase_approved`
**Primeira linha**: Aqui é a NID. Seu Pix do Playbook NID está gerado.

**Mensagem (Pix)**

Aqui é a NID. Seu Pix do Playbook NID · Desenhe para Vender está gerado e vale por {prazo_pix}. Se preferir pagar no cartão, o link é o mesmo: {link_checkout}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=px1. Assim que o pagamento for aprovado, o acesso chega em até 2 minutos.

**Mensagem (boleto)**

Aqui é a NID. Seu boleto do Playbook NID · Desenhe para Vender está gerado. A compensação leva até 2 dias úteis; se a proposta é para esta semana, pague por Pix ou cartão pelo mesmo link e receba o acesso em até 2 minutos: {link_checkout}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=px1

**CTA único**: o link do checkout

---

### PX2 · Seu acesso está esperando o pagamento

**Código**: PX2 (Pix)
**Momento**: 24 horas após gerar o Pix (48 horas para boleto), sem pagamento, entre 8h e 21h
**Canal**: e-mail
**Condição**: e-mail preenchido; sem `purchase_approved`
**Assunto**: Seu acesso está esperando o pagamento
**Pré-cabeçalho**: O playbook fica liberado em até 2 minutos após a aprovação. Pix ou cartão, pelo mesmo link.

**Corpo**

Olá, {primeiro_nome}.

O pagamento do seu Playbook NID · Desenhe para Vender ainda não foi confirmado, e por isso o acesso ainda não foi liberado. Nada foi cobrado.

Se o código Pix venceu, gere um novo pelo mesmo link; o valor é o mesmo, R$ 29,90. Se preferir, pague no cartão e receba o acesso na hora. Nos dois casos, o playbook, os templates e o checklist chegam no seu e-mail e no seu WhatsApp em até 2 minutos, com 7 dias de garantia.

[Botão] Concluir o pagamento
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=px2

7 dias de garantia, reembolso sem pergunta.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Concluir o pagamento". Pix expirado sem pagamento vira abandono de checkout: seguem R2 e R3 (R1 não, porque PX1 já cumpriu esse papel).

---

## Parte 3 · Pagamento recusado (N1, N2)

### N1 · O pagamento não foi aprovado

**Código**: N1
**Momento**: até 5 minutos após a recusa, qualquer hora (transacional)
**Canal**: e-mail
**Condição**: `purchase_refused`; e-mail preenchido
**Assunto**: O pagamento não foi aprovado
**Pré-cabeçalho**: Costuma ser limite ou bloqueio do banco. Outro cartão ou Pix resolve; nada foi cobrado.

**Corpo**

Olá, {primeiro_nome}.

O cartão não aprovou o pagamento do seu Playbook NID · Desenhe para Vender. Isso costuma ser limite, validade ou bloqueio do banco, não um problema seu. Nada foi cobrado.

Para receber o acesso, tente outro cartão ou pague por Pix pelo mesmo link. Nos dois casos, o playbook chega em até 2 minutos após a aprovação, por e-mail e WhatsApp.

[Botão] Tentar de novo
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=n1

R$ 29,90. 7 dias de garantia, reembolso sem pergunta.

NID · Consultoria de Performance Comercial

**CTA único**: "Tentar de novo"

---

### N2 · WhatsApp (24 horas)

**Código**: N2
**Momento**: 24 horas após a recusa, sem compra, entre 9h e 20h
**Canal**: WhatsApp (modelo de marketing aprovado)
**Condição**: telefone preenchido; sem `purchase_approved`; sem opt-out de WhatsApp
**Primeira linha**: Aqui é a NID. O cartão não aprovou o seu playbook ontem.

**Mensagem**

Aqui é a NID. O cartão não aprovou o pagamento do seu playbook ontem, e nada foi cobrado. Se quiser, pague por Pix ou com outro cartão pelo mesmo link, e o acesso chega em até 2 minutos: {link_checkout}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=n2. Se ficou alguma dúvida, responde por aqui.

**CTA único**: o link do checkout (a resposta abre conversa com o agente). Depois de N2 sem compra: mesmo destino do abandono (`F2-checkout-abandonado`, conteúdo contínuo só por e-mail).

---

## Parte 4 · Conteúdo contínuo (D+15 em diante)

Um e-mail por semana, às terças, entre 8h e 10h, pela ferramenta de conteúdo contínuo. Cada e-mail ensina um pedaço do método com o texto do playbook e tem um único CTA. A ordem abaixo é a de entrada na lista (D+15 corresponde à primeira terça após o D+14 de cada contato; para leads de checkout abandonado, a primeira terça após R3). Depois de CC4, o ciclo continua com novos e-mails do `trafego` e do `copy` no mesmo padrão, e a base já está etiquetada pelos gatilhos A e B.

Regra de oferta: CC1 e CC3 não vendem nada. CC2 é a única menção mensal ao NIDflow; CC4 é a única menção mensal ao mini curso. Cada um tem a variante para quem já tem o produto.

Regra para leads sem compra (checkout abandonado): recebem os mesmos e-mails, com o CTA trocado pelo do playbook nas variantes marcadas `[lead]`.

### CC1 · Pergunte "quanto" até ter um número

**Código**: CC1
**Momento**: primeira terça a partir de D+15, entre 8h e 10h
**Canal**: e-mail
**Condição**: toda a base com e-mail, sem opt-out
**Assunto**: Pergunte "quanto" até ter um número
**Pré-cabeçalho**: A etapa de Dor falha em uma frase: "é ruim". A conta em voz alta resolve.

**Corpo**

Olá, {primeiro_nome}.

O erro mais comum na primeira etapa do método não é fazer a pergunta errada. É aceitar a resposta cedo demais. O cliente diz "o time não dá conta dos leads", o vendedor anota "o time não dá conta dos leads" e passa para a próxima pergunta. Sem número. Na proposta, sem número de dor, não há como ancorar valor, e o preço fica sozinho na página.

A conta se faz em voz alta, com o cliente, na conversa de diagnóstico. A sequência que a NID usa:

- "Quantas vezes isso acontece por semana? Por mês?"
- "Quando isso acontece, o que se perde? Uma venda, uma hora, um cliente?"
- "Qual é o valor médio de uma venda dessas?"
- "Se a gente multiplicar, quanto isso dá por mês?"

Frequência vezes perda por ocorrência vezes valor unitário. O número tem que ser dele, não seu: é a régua que você vai usar na página de valor, semanas depois, e o cliente só aceita a régua que ele mesmo construiu. Duas regras de condução: silêncio depois da pergunta, e anotar literalmente. "Não sobra tempo" é dele; "baixa produtividade" é seu. Na proposta, use a dele.

A saída da etapa é uma frase: "Hoje, [o que acontece], o que custa [número] por [período], e se continuar assim [consequência]." Se você não consegue escrever essa frase, a conversa de diagnóstico ainda não acabou.

[Botão, comprador] Abrir o canvas de dor
{link_area_membros}

[Botão, lead] Quero o playbook por R$ 29,90
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=cc1

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: comprador, o canvas de dor na área de membros; lead, o checkout.

---

### CC2 · A frase em que não cabe preço

**Código**: CC2
**Momento**: segunda terça, entre 8h e 10h
**Canal**: e-mail
**Condição**: toda a base. Variante A: comprador sem `F2-nidflow-ativo`. Variante B: assinante do NIDflow. Variante `[lead]`: sem compra
**Assunto**: A frase em que não cabe preço
**Pré-cabeçalho**: A etapa de Solução é a mais curta do método e a mais pulada. Um teste de dez segundos mostra se você pulou.

**Corpo**

Olá, {primeiro_nome}.

Depois de quantificar a dor, a maioria emenda: "Perfeito, então o que a gente faz é uma campanha no Meta Ads com página e atendimento por WhatsApp, e o investimento fica em..." O cliente, que dois segundos antes concordava com o próprio problema, agora avalia uma lista que não pediu. E a primeira reação a uma lista é perguntar quanto custa cada item.

Entre a dor e o escopo existe uma etapa: a Solução. É uma frase, a tese do projeto, que responde "o que precisa existir para esse problema acabar", e o cliente precisa concordar com ela antes de ver qualquer entregável.

O teste de dez segundos: se der para colocar preço na frase, ela ainda não é uma solução; já é escopo. "Implantar um CRM" tem preço. "O time precisa registrar toda conversa no mesmo lugar para que ninguém perca o histórico do cliente" não tem. O CRM aparece depois, na arquitetura, como componente.

A sequência da NID: recapitule a dor nas palavras do cliente e espere o "é isso"; nomeie a causa em uma frase; proponha a tese; pergunte "faz sentido para você?"; e silêncio. Se ele reformular, anote a versão dele. Uma tese ajustada com o cliente vale mais do que uma tese perfeita que só você aprovou.

[Variante A, comprador sem NIDflow:]

No NIDflow, o mapa de solução fica ao lado do canvas de dor, e a frase de solução que você escreve ali abre a segunda página da apresentação, antes de qualquer entregável. É a ferramenta em que a NID desenha e apresenta os projetos dela. R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia.

[Botão] Quero desenhar meu próximo projeto no NIDflow
{link_pagina_oferta}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-nidflow-cta&utm_content=cc2

[Variante B, assinante do NIDflow:]

No seu NIDflow, o mapa de solução fica logo depois do canvas de dor. Escreva a tese lá, com o campo "o que a tese não é" preenchido: escrever o que você não vai dizer ainda ajuda a não dizer.

[Botão] Abrir o mapa de solução
{link_area_membros_nidflow}

[Variante lead:]

[Botão] Quero o playbook por R$ 29,90
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=cc2

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único** por variante. Esta é a única menção ao NIDflow no mês.

---

### CC3 · Desenhe de trás para a frente

**Código**: CC3
**Momento**: terceira terça, entre 8h e 10h
**Canal**: e-mail
**Condição**: toda a base
**Assunto**: Desenhe de trás para a frente
**Pré-cabeçalho**: O erro da arquitetura é começar pelo que você sabe fazer. Comece pelo último bloco.

**Corpo**

Olá, {primeiro_nome}.

A arquitetura é a etapa em que o seu serviço finalmente aparece, e por isso é a etapa em que a maioria erra: começa pelo que sabe fazer. Primeiro bloco: "Implantação da nossa ferramenta". O cliente ainda não viu por que a ferramenta entra, e o projeto vira uma lista de tarefas. Lista de tarefas tem preço por tarefa, e é assim que ele vai negociar: "tira as reuniões quinzenais e me dá um desconto".

A NID desenha de trás para a frente. Quatro perguntas, na ordem:

1. Qual é o resultado final? Escreva o último bloco primeiro: o estado em que a dor parou. "Quatro vendedores recebendo reuniões qualificadas toda semana."
2. O que precisa existir imediatamente antes desse resultado? Escreva o penúltimo bloco. E antes dele? Vá voltando até chegar no primeiro dia.
3. Para cada bloco: o que entra, o que sai, quem faz, em quanto tempo? Se um bloco não tem saída verificável, ele não é uma etapa; é uma atividade dentro de outra.
4. Onde estão os riscos que o cliente já mencionou? Tudo o que ele disse que já tentou e não funcionou precisa de um componente que responda. "O SDR interno saiu em quatro meses" vira "substituição e treinamento contínuo por conta da NID".

Regras de desenho: três a seis etapas; cada etapa com um marco; o cliente com responsabilidades explícitas; o primeiro resultado visível cedo. E uma página só: blocos, setas, o marco embaixo de cada um, o responsável e a semana. É esse desenho que o comitê percorre sem você na sala.

[Botão, comprador] Abrir o fluxo de arquitetura
{link_area_membros}

[Botão, lead] Quero o playbook por R$ 29,90
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=cc3

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: comprador, o template na área de membros; lead, o checkout.

---

### CC4 · "Quanto custa?" na primeira reunião

**Código**: CC4
**Momento**: quarta terça, entre 8h e 10h
**Canal**: e-mail
**Condição**: toda a base. Variante A: comprador sem `F2-minicurso`. Variante B: com `F2-minicurso`. Variante `[lead]`: sem compra
**Assunto**: "Quanto custa?" na primeira reunião
**Pré-cabeçalho**: A resposta que a NID usa quando o preço aparece antes da hora. E por que o silêncio depois do número é a parte mais difícil.

**Corpo**

Olá, {primeiro_nome}.

Acontece na primeira conversa, o tempo todo: "e quanto custa isso?". Se você responde de bate-pronto, a partir daquele momento o cliente para de ouvir o projeto e começa a julgar o número. Tudo o que vier depois é lido como justificativa.

A resposta que a NID usa: "Vou te dar o número, com certeza. Mas se eu te disser agora, você vai comparar com alguma coisa que não é este projeto, porque a gente ainda não desenhou o projeto. Me dá esta conversa para entender o tamanho do problema, e na próxima eu te mostro o projeto desenhado com o investimento. Combinado?" Quase sempre é combinado. Se ele insistir, uma faixa ampla e honesta, e de volta para a pergunta seguinte.

Na reunião de apresentação, o preço vem no fim, e a etapa de Valor tem cinco passos: volte à dor ("lá no início a gente calculou que..."); coloque o valor na mesma régua, sem prometer número; apresente o investimento na estrutura do desenho (setup das etapas 1 a 3, operação das etapas 4 e 5), para que ele veja pelo que está pagando e não consiga tirar um item sem quebrar o fluxo; compare custo com valor em uma frase, com os números dele; proponha o próximo passo com data. E silêncio. Quem preenche o silêncio depois do número perde o número.

[Variante A, comprador sem o mini curso:]

A aula 5 do Mini curso NID · Apresente para Fechar mostra essa parte da reunião acontecendo, com a proposta na tela: a volta à conta, o investimento na estrutura do desenho, a comparação em uma frase e o silêncio. Você sai com as três frases de valor escritas na sua proposta. R$ 147, 7 dias de garantia.

[Botão] Quero as aulas por R$ 147
{link_pagina_minicurso}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-minicurso&utm_content=cc4

[Variante B, comprador com o mini curso:]

A aula 5 mostra essa parte acontecendo, com a proposta na tela. Se a próxima reunião está marcada, reveja os 14 minutos dela com a sua tabela de valor aberta e escreva as três frases: a régua, o investimento na estrutura e a comparação.

[Botão] Rever a aula 5
{link_aula_5}

[Variante lead:]

[Botão] Quero o playbook por R$ 29,90
{link_checkout}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-playbook&utm_content=cc4

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único** por variante. Esta é a única menção ao mini curso no mês.

---

## Regras de frequência e saída (resumo do que vale para este arquivo)

| Regra | E-mail | WhatsApp |
|---|---|---|
| Recuperação e pagamento | No máximo 3 toques por situação; a compra encerra tudo | Idem; nada no domingo |
| Conteúdo contínuo | 1 por semana; oferta no máximo uma vez por mês por produto | Nenhum WhatsApp de conteúdo contínuo |
| Opt-out | Rodapé em todo e-mail (menos N1, transacional); efeito imediato | "parar", "sair"; efeito imediato |
| Cliente do Funil 1 (`F2-funil1-cliente`) | Recebe só as variantes sem oferta (CC1, CC3, e as variantes B de CC2 e CC4 quando tiver o produto; sem produto, o e-mail não vai) | Nenhum |

---

## Checklist de coerência deste arquivo

- [x] R1 a N2 com códigos, momentos, canais e condições da seção 6 do fluxo `02`
- [x] Pagamento recusado sem culpa; Pix com prazo real; nenhuma urgência além do fato
- [x] Conteúdo contínuo com o texto do playbook (capítulos 3 a 6), sem caso inventado, sem número prometido
- [x] Uma menção mensal ao NIDflow (CC2) e uma ao mini curso (CC4), cada uma com variante para quem já tem o produto
- [x] Um CTA por mensagem e por variante; UTMs no padrão `F2`
- [x] Sem emoji, sem travessão, sem "pra" ou "pro", sem termo interno; Henrique ausente
