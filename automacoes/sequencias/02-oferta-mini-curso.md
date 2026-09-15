# Sequência 02 · Oferta do mini curso a R$ 147 (ramo A, D+3 a D+6)

| Campo | Valor |
|---|---|
| Fluxo de origem | `automacoes/02-entrega-pos-compra.md`, seção 4 (ramo A). Códigos, momentos, canais e condições são os do fluxo; este arquivo traz só o texto final |
| Códigos neste arquivo | E3, W4, E5, E6 |
| Nota sobre os códigos | O pedido do coordenador chamou esta sequência de "B1 a B4". No fluxo do `automacao`, B1 a B4 são a ativação das aulas (ramo B, já em `01-entrega-playbook.md`); a oferta do mini curso no ramo A tem os códigos E3, W4, E5 e E6. Este arquivo usa os códigos do fluxo para não quebrar a implementação |
| Quem recebe | Contato com `F2-comprador-playbook`, sem `F2-minicurso`, sem `F2-reembolso`, sem opt-out no canal do toque |
| O que oferece | Mini curso NID · Apresente para Fechar por R$ 147, sem desconto (brief, seção 6.3). Nenhuma mensagem cita R$ 97 |
| Página de destino | `produtos/mini-curso/pagina-de-vendas.md`, única para todos os toques |
| Saída | `purchase_approved` do mini curso cancela os toques pendentes e move o contato para o ramo B (E0-C e W0-C no dia; B1 no dia seguinte). Depois de E6, o contato entra na oferta do NIDflow (D+7) e no conteúdo contínuo |
| Remetente | E-mail: "NID". WhatsApp: número oficial da NID, nome exibido "NID" |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 4.2, 6.2, 6.3, 10), `produtos/mini-curso/00-grade.md`, `produtos/mini-curso/pagina-de-vendas.md`, `produtos/playbook/01-playbook.md` (capítulos 8 e 11) |

Regras aplicadas: a NID fala em primeira pessoa do plural; um único CTA por mensagem; sem emoji em e-mail e nenhum emoji em WhatsApp nesta sequência; nunca travessão; "para" por extenso; preço só como `R$ 147`; sem urgência falsa (o preço não muda e o link continua valendo); toda promessa existe na grade do mini curso (oito aulas, cerca de 108 minutos, seis materiais); Henrique só como "Henrique Leite, sócio da NID". Linhas marcadas com `[nidflow_venda_liberada = sim]` e `[nidflow_venda_liberada = nao]` são alternativas dentro do mesmo bloco: só a versão que corresponde à variável sai na mensagem, e a marca não vai para o texto.

Variáveis: `{primeiro_nome}`, `{link_pagina_minicurso}`, `{link_p1_propria}`, `{link_p1_terceiro}` (links de um clique da pergunta 1; texto das páginas em `04-gatilho-a.md`), `{link_descadastro}`.

UTM (conforme `05-integracoes.md`, seção 8.3): `utm_campaign=F2-minicurso`, `utm_medium=sequencia`, `utm_source=email` ou `whatsapp`, `utm_content` com o código do toque em minúsculas.

---

## E3 · Desenhar resolve metade

**Código**: E3
**Momento**: D+3, entre 8h e 10h (Brasília)
**Canal**: e-mail
**Condição**: contato sem `F2-minicurso`
**Assunto**: Desenhar resolve metade
**Pré-cabeçalho**: A outra metade é a reunião. As aulas em que a NID mostra como apresenta e vende o projeto desenhado.

**Corpo**

Olá, {primeiro_nome}.

Se você já preencheu o canvas de dor, sabe o que vem depois: a tese, o fluxo, a tabela de valor e, no fim, uma proposta que é um projeto, não um orçamento. É metade da venda.

A outra metade acontece com o cliente na frente. E é ali que o projeto bem desenhado costuma morrer. O cliente pede o preço na segunda página. Pergunta "e vocês fazem o quê?" antes da dor. Diz "está caro" e você começa a justificar. Diz "preciso levar para o comitê" e você responde "claro, fico à disposição". A proposta era um projeto. A reunião virou um orçamento.

Apresentar é conduzir o cliente pelo desenho, uma página por vez. Na dor, ele diz "sim, é isso" de novo. Na solução, "faz sentido". Na arquitetura, você conta a sequência e não lê a lista. No investimento, para de falar. No próximo passo, propõe a data e fica em silêncio. É uma sequência, como o desenho. E sequência se aprende vendo alguém fazer.

O Mini curso NID · Apresente para Fechar são as oito aulas em que Henrique Leite, sócio da NID, mostra como a NID faz a reunião de apresentação dos projetos que vende, com a proposta do caso conduzido do playbook na tela. Cerca de 108 minutos, em aulas de 10 a 18 minutos, para assistir uma por vez com a sua proposta aberta ao lado. Cada aula termina com um entregável que você faz na própria proposta.

Junto com as aulas, na mesma área de membros do seu playbook: os slides de cada aula, o roteiro de apresentação de projeto, o checklist de reunião, o modelo de proposta da NID, o banco de objeções e a régua de follow-up pós-reunião.

R$ 147, uma vez, para todas as reuniões que vêm depois. 7 dias de garantia, reembolso sem pergunta.

[Botão] Quero as aulas por R$ 147
{link_pagina_minicurso}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-minicurso&utm_content=e3

7 dias de garantia, reembolso sem pergunta.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero as aulas por R$ 147"

---

## W4 · A proposta pronta não fecha sozinha

**Código**: W4
**Momento**: D+4, entre 9h e 12h
**Canal**: WhatsApp (modelo de marketing aprovado)
**Condição**: contato sem `F2-minicurso`; sem opt-out de WhatsApp; sem tarefa humana aberta
**Primeira linha**: Aqui é a NID. A proposta pronta não fecha sozinha.

**Mensagem**

Aqui é a NID. A proposta pronta não fecha sozinha: a reunião tem sequência, e o cliente responde ao que vê em cada página. Nas aulas do mini curso, a gente mostra a sequência que a NID usa, da abertura ao fechamento com data, com a proposta na tela. R$ 147, 7 dias de garantia: {link_pagina_minicurso}?utm_source=whatsapp&utm_medium=sequencia&utm_campaign=F2-minicurso&utm_content=w4

**CTA único**: o link da página do mini curso

[Nota de implementação: se a pessoa responder, o agente atende com a base do mini curso (origem `sequencia:W4`, textos em `06-agente-direct-whatsapp.md`). Pedido de desconto recebe a resposta da objeção "R$ 147 é caro para mim agora", nunca um preço menor.]

---

## E5 · "Já sei vender, o problema é o cliente"

**Código**: E5
**Momento**: D+5, entre 8h e 10h
**Canal**: e-mail
**Condição**: contato sem `F2-minicurso`. Bloco da pergunta 1 só para quem está `nao_respondeu`
**Assunto**: "Já sei vender, o problema é o cliente"
**Pré-cabeçalho**: A objeção que a gente mais ouve. E a resposta, que não tem a ver com falar melhor.

**Corpo**

Olá, {primeiro_nome}.

"Já sei vender. O problema é o cliente." É a frase que a gente mais ouve de quem vende algo que precisa ser explicado. E ela costuma ser verdade: quem chegou até aqui sabe conduzir uma conversa.

O que as aulas mudam não é o seu jeito de falar. É o que o cliente vê em cada minuto da reunião e em que ordem. Hoje, quando ele diz "está caro", a resposta é uma justificativa. Com a sequência do método, "está caro" é uma pergunta sobre a página de valor: a régua da dor não ficou clara, e você volta para ela. Quando ele diz "vou pensar", é uma pergunta sobre o próximo passo: não houve data. Quando diz "preciso levar para o comitê", é uma pergunta sobre o documento: ele precisa sobreviver sem você na sala. Você continua conduzindo do seu jeito. O que muda é a que página voltar.

"Não tenho tempo para assistir aula." São oito aulas de 10 a 18 minutos, gravadas, na sua área de membros. Assista uma por vez, com a próxima proposta aberta ao lado. A aula de objeções sozinha, com 18 minutos, vale para a reunião desta semana.

R$ 147, 7 dias de garantia, reembolso sem pergunta.

[Botão] Quero as aulas por R$ 147
{link_pagina_minicurso}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-minicurso&utm_content=e5

7 dias de garantia, reembolso sem pergunta.

[Bloco condicional, só se `nao_respondeu`, abaixo do CTA e separado por uma linha:]

Uma pergunta que ficou aberta, para a gente te orientar melhor. Um clique, sem cadastro.

Você vende para a sua própria empresa ou para a empresa de outra pessoa?

[Para a minha própria empresa] {link_p1_propria}
[Para a empresa de outra pessoa] {link_p1_terceiro}

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero as aulas por R$ 147". O bloco da pergunta é cadastro de um clique (seção 3.3 do fluxo) e fica no rodapé, sem concorrer com o CTA. É a última tentativa automática da pergunta 1.

---

## E6 · Amanhã a gente te mostra a ferramenta

**Código**: E6
**Momento**: D+6, entre 8h e 10h
**Canal**: e-mail
**Condição**: contato sem `F2-minicurso`
**Assunto**: [nidflow_venda_liberada = sim] Amanhã a gente te mostra a ferramenta [nidflow_venda_liberada = nao] Última mensagem sobre as aulas
**Pré-cabeçalho**: Última mensagem sobre as aulas nesta sequência. O preço é o mesmo; o link continua valendo.

**Corpo**

Olá, {primeiro_nome}.

Esta é a última mensagem sobre as aulas nesta sequência. Sem contagem regressiva: o preço é R$ 147 hoje e continua R$ 147 depois. A gente só não vai insistir.

O que fica: o playbook leva você até a proposta pronta. As aulas começam com ela na mão e mostram a reunião inteira, de antes de entrar na sala até o follow-up, do jeito que a NID faz. Se a próxima reunião de apresentação já está marcada, o checklist de reunião da aula 1 e a aula de objeções cabem no tempo que falta até ela.

[Botão] Quero as aulas por R$ 147
{link_pagina_minicurso}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-minicurso&utm_content=e6

7 dias de garantia, reembolso sem pergunta.

[nidflow_venda_liberada = sim] Amanhã a gente te mostra uma coisa diferente: a ferramenta em que a NID desenha e apresenta os projetos dela, em uso, no projeto do caso conduzido do playbook. Sem link hoje. Só o aviso.
[nidflow_venda_liberada = nao] Uma coisa diferente fica para depois: a apresentação da ferramenta em que a NID desenha e apresenta os projetos dela, em uso no projeto do caso conduzido do playbook, chega assim que a ferramenta estiver liberada para compradores do playbook. Sem link hoje. Só o aviso.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero as aulas por R$ 147". A menção ao NIDflow é antecipação, sem preço e sem link, conforme o fluxo.

---

## Checklist de coerência deste arquivo

- [x] Códigos, momentos, canais e condições iguais aos da seção 4 do fluxo `02`
- [x] Preço só como `R$ 147`; nenhuma menção a R$ 97; nenhum desconto
- [x] Toda promessa existe em `00-grade.md`: oito aulas, 10 a 18 minutos, cerca de 108 minutos, aula 6 de objeções com 18 minutos, seis materiais
- [x] Pergunta 1 em E5 com o texto exato do brief (seção 8.2); só para `nao_respondeu`; última tentativa automática
- [x] Um CTA por mensagem; UTMs no padrão `F2-minicurso`
- [x] Sem emoji, sem travessão, sem "pra" ou "pro", sem termo interno, sem urgência falsa
- [x] Henrique só como "Henrique Leite, sócio da NID"; toda mensagem assina NID
