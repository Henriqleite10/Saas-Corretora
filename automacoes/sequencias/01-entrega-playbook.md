# Sequência 01 · Entrega e ativação do playbook (D0 a D+6)

| Campo | Valor |
|---|---|
| Fluxo de origem | `automacoes/02-entrega-pos-compra.md` (seções 2, 4 e 5). Códigos, momentos, canais e condições são os do fluxo; este arquivo traz só o texto final |
| Códigos neste arquivo | E0 (variantes A, B e C), W0 (variantes A, B e C), W0b, E1, W2, B1, W3, B2, B3, B4 |
| Códigos em outros arquivos | E3, W4, E5 e E6 (oferta do mini curso a R$ 147) em `02-oferta-mini-curso.md`; R1 a R3, PX1, PX2, N1 e N2 (não compra) em `07-reengajamento.md` |
| Remetente | E-mail: "NID". WhatsApp: número oficial da NID, nome exibido "NID" |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 5, 6.1, 6.2, 8.1, 10), `produtos/playbook/01-playbook.md` (capítulos 1, 2, 3, 9 e 11), `produtos/mini-curso/00-grade.md`, `produtos/playbook/pagina-de-obrigado.md` |

Regras aplicadas em todas as mensagens: a NID fala em primeira pessoa do plural; um único CTA por mensagem; sem emoji em e-mail e nenhum emoji em WhatsApp nesta sequência; nunca travessão; "para" por extenso; preços no formato `R$ 29,90` e `R$ 147`; nenhum termo interno; nenhuma promessa que não exista no produto; Henrique só como "Henrique Leite, sócio da NID". Linhas marcadas com `[nidflow_venda_liberada = sim]` e `[nidflow_venda_liberada = nao]` são alternativas dentro do mesmo bloco: só a versão que corresponde à variável sai na mensagem, e a marca não vai para o texto.

Ramos: **A** comprou só o playbook; **B** comprou o playbook com as aulas do mini curso (na mesma compra); **C** já tinha o playbook e comprou as aulas depois (avulso). O ramo C recebe E0c e W0c no dia da compra e entra no ramo B a partir do dia seguinte (B1), sem repetir E1.

Variáveis: `{primeiro_nome}`, `{link_area_membros}`, `{link_pdf_playbook}`, `{link_templates}`, `{link_capitulo_3}` (o PDF do playbook aberto na primeira página do capítulo 3), `{link_aula_1}`, `{link_aula_6}`, `{link_checklist_reuniao}`, `{link_whatsapp_nid}`, `{email_mascarado}`, `{link_p1_propria}`, `{link_p1_terceiro}` (links de um clique que gravam a resposta e abrem a página da pergunta 2, texto em `04-gatilho-a.md`), `{link_p4_...}` (faixas de B4), `{link_descadastro}`.

Regra de links: links para a área de membros e para arquivos não levam UTM (são entrega). Links para páginas de venda levam UTM conforme `05-integracoes.md`, seção 8.3, e aparecem só nos arquivos `02`, `03` e `07`.

---

## Parte 1 · D0 · Entrega (transacional, qualquer hora, até 2 minutos após a aprovação)

### E0 · E-mail de entrega · variante A (comprou só o playbook)

**Código**: E0-A
**Momento**: D0, até 2 minutos após `purchase_approved`
**Canal**: e-mail (transacional)
**Condição**: compra do playbook com um item
**Assunto**: Seu acesso ao Playbook NID · Desenhe para Vender
**Pré-cabeçalho**: O playbook, os cinco templates e o checklist. Comece pela próxima proposta.

**Corpo**

Olá, {primeiro_nome}.

Pagamento confirmado. Seu Playbook NID · Desenhe para Vender está liberado.

[Botão] Abrir o meu playbook
{link_area_membros}

O que está na sua área de membros:

- O playbook em PDF, com o Método NID de Desenho de Projetos em quatro etapas: Dor, Solução, Arquitetura e Valor. Onze capítulos, com um caso conduzido do início ao fim.
- Os cinco templates de fluxo, com instruções e exemplo preenchido: canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor e roteiro de proposta.
- O checklist "proposta pronta para apresentar".

Se preferir baixar agora, sem entrar na área de membros: playbook em PDF ({link_pdf_playbook}) e templates ({link_templates}).

Como ler: com a próxima proposta na cabeça. Escolha um cliente real, o que está mais perto de pedir proposta, e leia pensando nele. Se a proposta é para esta semana, vá direto aos capítulos 2 a 6 e preencha o canvas de dor com o que você já sabe. O que ficar em branco é o que você pergunta na conversa de diagnóstico.

[nidflow_venda_liberada = sim] Nos próximos dias a gente te mostra a ferramenta em que a NID desenha e apresenta os projetos dela, com os templates deste playbook já dentro. Até lá, o playbook é completo sem ela: os templates funcionam no papel, no Canva ou no PowerPoint.
[nidflow_venda_liberada = nao] A apresentação da ferramenta em que a NID desenha e apresenta os projetos dela, com os templates deste playbook já dentro, chega por e-mail e WhatsApp assim que a ferramenta estiver liberada para compradores do playbook. Até lá, o playbook é completo sem ela: os templates funcionam no papel, no Canva ou no PowerPoint.

7 dias de garantia, reembolso sem pergunta. Para pedir, basta responder a este e-mail. Dúvida de acesso: responda aqui ou fale com a gente pelo WhatsApp da NID ({link_whatsapp_nid}).

NID · Consultoria de Performance Comercial

**CTA único**: "Abrir o meu playbook"

[Nota de implementação: este e-mail precisa aceitar resposta. O capítulo 11 do playbook diz "responda ao e-mail de entrega deste playbook e a gente conversa"; a caixa de entrada do remetente é monitorada por humano em dias úteis (ponto de coleta C7 do `04-segmentacao-gatilhos.md`). Os links diretos do PDF e dos templates são exigência do fluxo (passo 6 da seção 2) e ficam como links de texto, não como botão.]

---

### E0 · E-mail de entrega · variante B (comprou o playbook com as aulas)

**Código**: E0-B
**Momento**: D0, até 2 minutos após `purchase_approved`
**Canal**: e-mail (transacional)
**Condição**: compra do playbook com o mini curso na mesma compra
**Assunto**: Seu acesso ao playbook e às aulas
**Pré-cabeçalho**: Tudo no mesmo lugar. Comece pelo playbook; as aulas começam onde ele termina.

**Corpo**

Olá, {primeiro_nome}.

Pagamento confirmado. Seu Playbook NID · Desenhe para Vender e as aulas do Mini curso NID · Apresente para Fechar estão liberados, no mesmo lugar.

[Botão] Abrir o meu acesso
{link_area_membros}

O que está na sua área de membros:

- O playbook em PDF, com o Método NID de Desenho de Projetos em quatro etapas: Dor, Solução, Arquitetura e Valor.
- Os cinco templates de fluxo, com instruções e exemplo preenchido, e o checklist "proposta pronta para apresentar".
- As oito aulas gravadas por Henrique Leite, sócio da NID, com os slides de cada aula, o roteiro de apresentação de projeto, o checklist de reunião, o modelo de proposta, o banco de objeções e a régua de follow-up pós-reunião.

Se preferir baixar agora: playbook em PDF ({link_pdf_playbook}) e templates ({link_templates}).

A ordem que funciona: leia os capítulos 2 a 6 do playbook, preencha o canvas de dor de um cliente real e só então abra a aula 1. As aulas partem da proposta desenhada com o método; assistir antes de desenhar é assistir sem a proposta na mão.

[nidflow_venda_liberada = sim] Nos próximos dias a gente te mostra a ferramenta em que a NID desenha e apresenta os projetos dela, com os templates do playbook já dentro. Até lá, playbook e aulas são completos sem ela.
[nidflow_venda_liberada = nao] A apresentação da ferramenta em que a NID desenha e apresenta os projetos dela, com os templates do playbook já dentro, chega por e-mail e WhatsApp assim que a ferramenta estiver liberada para compradores do playbook. Até lá, playbook e aulas são completos sem ela.

7 dias de garantia, reembolso sem pergunta, para o playbook e para as aulas. Para pedir, basta responder a este e-mail. Dúvida de acesso: responda aqui ou fale com a gente pelo WhatsApp da NID ({link_whatsapp_nid}).

NID · Consultoria de Performance Comercial

**CTA único**: "Abrir o meu acesso"

---

### E0 · E-mail de entrega · variante C (já tinha o playbook, comprou as aulas depois)

**Código**: E0-C
**Momento**: no dia da compra do mini curso, até 2 minutos após `purchase_approved`
**Canal**: e-mail (transacional)
**Condição**: `purchase_approved` do mini curso em contato que já tem `F2-comprador-playbook`
**Assunto**: Seu acesso às aulas do Mini curso NID · Apresente para Fechar
**Pré-cabeçalho**: Na mesma área do seu playbook. Comece pela aula 1, com a proposta aberta ao lado.

**Corpo**

Olá, {primeiro_nome}.

Pagamento confirmado. As aulas do Mini curso NID · Apresente para Fechar estão liberadas na mesma área de membros do seu playbook.

[Botão] Abrir as minhas aulas
{link_area_membros}

O que chegou:

- As oito aulas gravadas por Henrique Leite, sócio da NID, cerca de 108 minutos, para assistir uma por vez, com a próxima reunião marcada.
- Os slides de cada aula, o roteiro de apresentação de projeto, o checklist de reunião, o modelo de proposta da NID, o banco de objeções e a régua de follow-up pós-reunião.

Como assistir: com a sua proposta aberta ao lado. Cada aula termina com um entregável que você faz na própria proposta, e a aula 1 começa pelo checklist de reunião da proposta que está na sua mesa.

7 dias de garantia, reembolso sem pergunta. Para pedir, basta responder a este e-mail. Dúvida de acesso: responda aqui ou fale com a gente pelo WhatsApp da NID ({link_whatsapp_nid}).

NID · Consultoria de Performance Comercial

**CTA único**: "Abrir as minhas aulas"

---

### W0 · WhatsApp de entrega · variante A

**Código**: W0-A
**Momento**: D0, até 2 minutos após a aprovação
**Canal**: WhatsApp (modelo de utilidade aprovado)
**Condição**: telefone informado no checkout; compra só do playbook
**Primeira linha**: Aqui é a NID. Seu Playbook NID · Desenhe para Vender está liberado.

**Mensagem**

Aqui é a NID. Seu Playbook NID · Desenhe para Vender está liberado: {link_area_membros}

O e-mail com o playbook e os templates também já foi. Se precisar de algo, é só responder por aqui.

**CTA único**: o link da área de membros

---

### W0 · WhatsApp de entrega · variante B

**Código**: W0-B
**Momento**: D0, até 2 minutos após a aprovação
**Canal**: WhatsApp (modelo de utilidade aprovado)
**Condição**: telefone informado; playbook com as aulas na mesma compra
**Primeira linha**: Aqui é a NID. Seu playbook e as aulas do mini curso estão liberados.

**Mensagem**

Aqui é a NID. Seu playbook e as aulas do mini curso estão liberados: {link_area_membros}

Comece pelo playbook; as aulas começam onde ele termina. O e-mail com tudo também já foi. Se precisar de algo, é só responder por aqui.

**CTA único**: o link da área de membros

---

### W0 · WhatsApp de entrega · variante C

**Código**: W0-C
**Momento**: no dia da compra do mini curso, até 2 minutos após a aprovação
**Canal**: WhatsApp (modelo de utilidade aprovado)
**Condição**: telefone informado; compra do mini curso por quem já tem o playbook
**Primeira linha**: Aqui é a NID. As aulas do mini curso estão liberadas.

**Mensagem**

Aqui é a NID. As aulas do Mini curso NID · Apresente para Fechar estão liberadas na mesma área do seu playbook: {link_area_membros}

Comece pela aula 1, com a sua proposta aberta ao lado. Se precisar de algo, é só responder por aqui.

**CTA único**: o link da área de membros

---

### W0b · WhatsApp de correção de e-mail

**Código**: W0b
**Momento**: D0, 15 minutos após E0 devolvido (bounce)
**Canal**: WhatsApp (modelo de utilidade aprovado)
**Condição**: só se E0 tiver bounce e houver telefone
**Primeira linha**: Aqui é a NID. O e-mail do seu acesso voltou.

**Mensagem**

Aqui é a NID. O e-mail {email_mascarado} devolveu a mensagem com o seu acesso ao playbook. Qual e-mail a gente usa? Responde por aqui com o endereço certo e a gente reenvia em seguida.

**CTA único**: responder com o e-mail correto

[Nota de implementação: o agente recebe a resposta, confirma em uma linha ("Anotado. O acesso vai para {email_novo} em alguns minutos.") e abre a tarefa humana para corrigir o cadastro. Enquanto isso, o link da área de membros já foi no W0.]

---

## Parte 2 · D+1 e D+2 · Ativação do playbook (ramos A e B)

### E1 · Comece pelo canvas de dor

**Código**: E1
**Momento**: D+1, entre 8h e 10h (Brasília)
**Canal**: e-mail
**Condição**: sempre (ramos A e B). Bloco da pergunta 1 só para quem está `nao_respondeu`
**Assunto**: Comece pelo canvas de dor
**Pré-cabeçalho**: A leitura mais curta que funciona: um capítulo e um template, com um cliente real na cabeça.

**Corpo**

Olá, {primeiro_nome}.

O playbook chegou ontem. Se você ainda não abriu, não comece pelo início. Comece pelo capítulo 3 e pelo canvas de dor, com um cliente real na cabeça: o que está mais perto de pedir proposta.

A etapa de Dor responde a uma pergunta: "O que está acontecendo, o que isso custa e o que acontece se continuar assim?" O capítulo traz a sequência de perguntas da conversa de diagnóstico, em quatro blocos (situação, sintoma, custo, consequência), e o canvas tem seis campos que cabem em uma página. Preencha o que você já sabe. O que ficar em branco é o que você pergunta na próxima conversa com esse cliente.

A saída da etapa é uma frase: "Hoje, [o que acontece], o que custa [número] por [período], e se continuar assim [consequência]." Quando essa frase existe, a proposta deixa de começar pelo que você vende e passa a começar pelo problema do cliente. É a diferença entre um orçamento e um projeto.

[Botão] Abrir o capítulo 3
{link_capitulo_3}

[Ramo A, uma linha:] Quando o projeto estiver desenhado, a outra metade da venda é a reunião. As aulas do mini curso começam onde o playbook termina; a gente fala delas em outro e-mail.

[Ramo B, uma linha:] Depois do canvas, a aula 1 espera você na mesma área de membros. Mas primeiro, o canvas: as aulas partem da proposta desenhada.

[Bloco condicional, só se `nao_respondeu`, abaixo do CTA:]

Uma pergunta, para a gente te orientar melhor nos próximos e-mails. Um clique, sem cadastro.

Você vende para a sua própria empresa ou para a empresa de outra pessoa?

[Para a minha própria empresa] {link_p1_propria}
[Para a empresa de outra pessoa] {link_p1_terceiro}

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Abrir o capítulo 3". O bloco da pergunta é cadastro de um clique, conforme a seção 3.3 do fluxo, e não concorre com o CTA.

---

### W2 · Você já preencheu o canvas?

**Código**: W2
**Momento**: D+2, entre 9h e 12h
**Canal**: WhatsApp (modelo de marketing aprovado)
**Condição**: só se não houver evento de primeiro acesso à área de membros desde D0; se o sistema não informar acesso, envia para todos. Sem opt-out de WhatsApp
**Primeira linha**: Aqui é a NID. Você já preencheu o canvas de dor do seu próximo cliente?

**Mensagem**

Aqui é a NID. Você já preencheu o canvas de dor do seu próximo cliente? Se travou em "quanto isso custa", o capítulo 3 tem a sequência de perguntas para fazer a conta junto com ele, em voz alta. Se quiser, responde aqui com a sua dúvida.

**CTA único**: responder (abre conversa com o agente, texto em `06-agente-direct-whatsapp.md`)

---

## Parte 3 · Ramo B · Ativação das aulas (D+2 a D+6 e conclusão)

Sequência de uso, não de venda. Nenhuma oferta até D+7.

### B1 · Aula 1: antes de entrar na sala

**Código**: B1
**Momento**: D+2, entre 8h e 10h (ramo C: dia seguinte à compra das aulas)
**Canal**: e-mail
**Condição**: se ainda não abriu a aula 1 (evento da área de membros); sem esse evento, para todos do ramo B
**Assunto**: Aula 1: antes de entrar na sala
**Pré-cabeçalho**: Doze minutos, com a proposta que está na sua mesa aberta ao lado.

**Corpo**

Olá, {primeiro_nome}.

A aula 1 do Mini curso NID · Apresente para Fechar tem 12 minutos e começa antes da reunião: como a NID prepara a apresentação de um projeto. Quem decide, em que formato a reunião acontece, a agenda em quatro partes, o ensaio cronometrado e o que vai (e o que não vai) para o cliente antes da reunião.

Assista com a proposta que você está desenhando aberta ao lado. A aula termina com um entregável: o checklist de reunião preenchido para essa proposta. Ele está na sua área de membros, junto com os slides da aula.

Se o canvas de dor ainda não está preenchido, preencha primeiro. As aulas mostram como conduzir a reunião a partir do projeto desenhado; sem o desenho, não há o que apresentar.

[Botão] Assistir à aula 1
{link_aula_1}

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Assistir à aula 1"

---

### W3 · Você já abriu a aula 1?

**Código**: W3
**Momento**: D+3, entre 9h e 12h
**Canal**: WhatsApp (modelo de marketing aprovado)
**Condição**: só se não houver evento de aula assistida; se o sistema não informar, não envia. Sem opt-out de WhatsApp
**Primeira linha**: Aqui é a NID. Você já abriu a aula 1 do mini curso?

**Mensagem**

Aqui é a NID. Você já abriu a aula 1 do mini curso? São 12 minutos e ela começa com a proposta na mão: o checklist de reunião sai preenchido no fim. Se travou em alguma coisa, responde aqui.

**CTA único**: responder (abre conversa com o agente)

---

### B2 · As objeções que a NID ouve toda semana

**Código**: B2
**Momento**: D+4, entre 8h e 10h
**Canal**: e-mail
**Condição**: sempre (ramo B)
**Assunto**: As objeções que a NID ouve toda semana
**Pré-cabeçalho**: "Está caro", "vou pensar", "preciso levar para o comitê". Cada uma é uma pergunta sobre uma página do projeto.

**Corpo**

Olá, {primeiro_nome}.

Antes de dar play na aula 6, faça uma coisa: anote as três objeções que você mais ouviu na última proposta que perdeu. As frases exatas, do jeito que o cliente disse.

A aula 6 tem 18 minutos e trata toda objeção como uma pergunta sobre uma página do projeto. "Está caro" é uma pergunta sobre a página de valor: a régua da dor não ficou clara. "Vou pensar" é uma pergunta sobre o próximo passo: não houve data. "Preciso levar para o comitê" é uma pergunta sobre o documento: ele precisa sobreviver sem você na sala. Preço, desconto, prazo, sócio, "manda por e-mail", "já tentei", "não é o momento", concorrente mais barato: cada uma tem a página que responde. E há as objeções que são do próprio apresentador, que a aula também mostra.

Você sai da aula com o banco de objeções preenchido com as três que anotou e a página que responde a cada uma. O banco está na sua área de membros.

[Botão] Assistir à aula de objeções
{link_aula_6}

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Assistir à aula de objeções"

---

### B3 · Antes da próxima reunião

**Código**: B3
**Momento**: D+6, entre 8h e 10h
**Canal**: e-mail
**Condição**: sempre (ramo B)
**Assunto**: Antes da próxima reunião
**Pré-cabeçalho**: [nidflow_venda_liberada = sim] Dois materiais para passar antes de entrar na sala. E, amanhã, a ferramenta. [nidflow_venda_liberada = nao] Dois materiais para passar antes de entrar na sala.

**Corpo**

Olá, {primeiro_nome}.

Dois materiais do mini curso valem para a reunião desta semana, mesmo que você ainda não tenha assistido a todas as aulas.

O checklist de reunião, da aula 1: antes, durante e depois. Quem vai estar na sala, quem decide, o que o cliente já concordou, qual próximo passo você vai propor e com que data. É ele que mostra, antes da reunião, que o decisor não vai estar nela.

O roteiro de apresentação de projeto, das aulas 2 a 7: o que dizer em cada página da proposta, com espaço para as suas frases. Na dor, o cliente diz "sim, é isso" de novo. Na solução, "faz sentido". Na arquitetura, você conta a sequência. No investimento, para de falar. No próximo passo, propõe a data e fica em silêncio.

Passe pelos dois com a proposta aberta. Leva menos de meia hora e muda o que o cliente responde.

[Botão] Abrir o checklist de reunião
{link_checklist_reuniao}

[nidflow_venda_liberada = sim] Amanhã a gente te mostra a ferramenta em que a NID desenha e apresenta os projetos dela, em uso, no projeto do caso conduzido do playbook.
[nidflow_venda_liberada = nao] A apresentação da ferramenta em que a NID desenha e apresenta os projetos dela, em uso no projeto do caso conduzido do playbook, chega assim que a ferramenta estiver liberada para compradores do playbook.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Abrir o checklist de reunião"

---

### B4 · Você concluiu as aulas

**Código**: B4
**Momento**: até 10 minutos após o evento de conclusão das aulas (ou o clique em "Concluí as aulas" na última aula)
**Canal**: e-mail
**Condição**: sempre que houver o evento. Aplica `F2-minicurso-concluido`
**Assunto**: Você concluiu as aulas
**Pré-cabeçalho**: Uma pergunta de um clique. Depois, a próxima reunião.

**Corpo**

Olá, {primeiro_nome}.

Você concluiu as oito aulas do Mini curso NID · Apresente para Fechar. Se fez os entregáveis de cada uma, tem agora o checklist de reunião, o roteiro de apresentação com as suas frases, o banco de objeções com as três que mais ouve e a página do próximo passo com data. É mais do que a maioria leva para uma reunião.

Uma pergunta, em um clique, para a gente entender em que ponto você está. Um clique em cada linha basta; não precisa responder nada por escrito.

Quantas propostas você apresentou nos últimos 30 dias?

[0] {link_p4_apresentadas_0} · [1 a 3] {link_p4_apresentadas_1_3} · [4 a 7] {link_p4_apresentadas_4_7} · [8 ou mais] {link_p4_apresentadas_8_mais}

E quantas fechou?

[0] {link_p4_fechadas_0} · [1] {link_p4_fechadas_1} · [2 a 3] {link_p4_fechadas_2_3} · [4 ou mais] {link_p4_fechadas_4_mais}

A resposta fica registrada na hora. A gente usa isso para saber quem está aplicando o método e para melhorar as aulas.

A partir daqui, o método só existe quando é aplicado. A próxima reunião é o lugar.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: responder em um clique (as faixas são links que gravam `propostas_30d` e `fechadas_30d` e abrem a página de confirmação abaixo). Nenhum outro link no corpo.

**Página de confirmação (após o clique em qualquer faixa)**

Título: Anotado. Obrigado.
Texto: Sua resposta ficou registrada. Se quiser ajustar a outra linha, os links do e-mail continuam valendo. Sua área de membros está aqui: {link_area_membros}

**Botão da última aula (se o sistema de área de membros não emitir o evento de conclusão)**

Texto do botão, ao fim da aula 8: Concluí as aulas
Página que o botão abre: Título "Aulas concluídas." Texto "Registrado. Em alguns minutos chega um e-mail com uma pergunta de um clique." Sem outro link.

---

## Checklist de coerência deste arquivo

- [x] Códigos, momentos, canais e condições iguais aos do fluxo `02` (seções 2, 4 e 5)
- [x] Variante C (mini curso avulso) criada para cobrir a situação "comprou o mini curso depois" do fluxo, que não tinha texto de entrega próprio
- [x] Toda promessa existe no produto: onze capítulos, cinco templates, checklist, caso conduzido; oito aulas de cerca de 108 minutos com os materiais listados em `00-grade.md`
- [x] Pergunta 1 em E1 com o texto exato do brief (seção 8.2); só para `nao_respondeu`
- [x] Pergunta do Gatilho B em B4 com o texto exato do brief e as faixas do fluxo `04`
- [x] Um CTA por mensagem; blocos de pergunta são cadastro de um clique
- [x] Sem emoji, sem travessão, sem "pra" ou "pro", sem termo interno, sem preço fora de `R$ 29,90` e `R$ 147`
- [x] Henrique só como "Henrique Leite, sócio da NID"; toda mensagem assina NID
