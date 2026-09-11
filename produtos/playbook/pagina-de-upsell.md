# Playbook NID · Desenhe para Vender · Página de um clique do mini curso

**[CONDICIONAL: aguarda aprovação do Henrique]**

| Campo | Valor |
|---|---|
| Quando aparece | Logo após o pagamento aprovado do playbook, só para quem não marcou a oferta adicional no checkout, dentro da mesma sessão de compra, antes da página de obrigado |
| O que oferece | Mini curso NID · Apresente para Fechar por R$ 97, aceito com um clique (cartão já salvo) ou com Pix novo |
| Por que é condicional | Altera a regra 5.2 e a oferta 6.2 do brief ("R$ 97 só no checkout" passa a "R$ 97 na sessão de compra do playbook"). Recomendação do `estrategia` (seções 2.3, 4 e 6, item 2 do parecer). Sem a aprovação, esta página não existe e o checkout redireciona direto para a página de obrigado |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Itens das aulas conforme `produtos/mini-curso/00-grade.md` |

Regra de honestidade desta página: tudo o que ela diz sobre preço é verdade. Fora da sessão de compra, o mini curso custa R$ 147 em qualquer lugar (página própria, sequência, agente). Por isso "esta é a última vez por R$ 97" pode ser dito.

---

## Bloco 1 · Contexto

**Selo**
Pagamento do playbook confirmado

**Linha de apoio**
Seu acesso já está sendo enviado. Antes de ir para ele, uma coisa que só aparece agora.

---

## Bloco 2 · Dor

**Título**
Você acabou de garantir o método para desenhar o projeto. Falta a reunião.

**Texto**
O playbook leva você até a proposta pronta: a dor em uma frase, a tese aprovada, o fluxo desenhado, o valor antes do preço. É metade da venda.

A outra metade acontece com o cliente na frente. Em que ordem mostrar as páginas. O que dizer em cada uma. O que responder quando ele diz "está caro", "vou pensar" ou "preciso levar para o comitê". Como propor a data e ficar em silêncio.

Um projeto bem desenhado que trava na hora de apresentar termina do mesmo jeito que um orçamento: no "vou pensar".

---

## Bloco 3 · Solução e arquitetura

**Título**
As aulas em que a NID mostra como apresenta e vende o projeto desenhado.

**Texto**
O Mini curso NID · Apresente para Fechar começa exatamente onde o playbook termina: com a proposta na mão. Henrique Leite, sócio da NID, conduz as aulas mostrando como a NID faz a reunião de apresentação dos projetos que vende.

**O que você recebe**

- Oito vídeo-aulas gravadas, cerca de 108 minutos, para assistir no seu ritmo, com a proposta que você está desenhando aberta ao lado
- Os slides de cada aula
- O roteiro de apresentação de projeto, página por página, na ordem do método
- O checklist de reunião, para passar antes de cada apresentação
- O modelo de proposta da NID
- O banco de objeções e a régua de follow-up pós-reunião

Tudo na mesma área de membros do playbook, liberado na hora.

---

## Bloco 4 · Valor e oferta

**Título**
R$ 97 agora. Depois desta página, R$ 147.

**Texto**
Este é o único momento em que as aulas custam R$ 97: dentro da compra do playbook. Na página própria do mini curso, na sequência de e-mails e em qualquer outro lugar, o preço é R$ 147. Não é escassez de vaga: é o preço de quem já está comprando o método e leva as aulas junto.

Mesmos 7 dias de garantia, reembolso sem pergunta, para o playbook e para as aulas.

**CTA de aceite (um clique)**
Sim, quero adicionar as aulas por R$ 97

**Linha sob o CTA de aceite**
Cobrado no mesmo cartão desta compra, sem digitar nada de novo. Pagou por Pix? Um novo código aparece na hora.

**Link de recusa (texto simples, abaixo, sem destaque)**
Não, quero seguir só com o playbook

---

## Bloco 5 · Rodapé

7 dias de garantia, reembolso sem pergunta. NID - Núcleo de Inteligência Digital LTDA · CNPJ 11.698.721/0001-33

---

## Estados após o clique

**Aceite aprovado**
Título: As aulas foram adicionadas.
Texto: Playbook e aulas chegam no mesmo e-mail e no mesmo WhatsApp, em até 2 minutos. Agora, a página de confirmação.
[Redireciona em 3 segundos para a página de obrigado, variante B.]

**Aceite com Pix**
Título: Seu Pix das aulas está pronto.
Texto: Pague pelo aplicativo do seu banco. O playbook já está sendo enviado de qualquer forma; as aulas são liberadas assim que o Pix for confirmado. O código vale por {prazo}.
[Botão único: "Ir para o meu acesso ao playbook", que leva à página de obrigado, variante A. Se o Pix for pago depois, o `automacao` move o contato para o ramo B.]

**Pagamento das aulas recusado**
Título: O cartão não aprovou as aulas.
Texto: Nada muda no seu playbook: ele já está sendo enviado. Se quiser as aulas, o link da página do mini curso vai chegar no seu e-mail nos próximos dias.
[Botão único: "Ir para o meu acesso ao playbook". Sem segunda tentativa nesta página; a pessoa segue no ramo A.]

**Recusa**
[Vai direto para a página de obrigado, variante A. Nenhuma tela de "tem certeza?".]

---

## Especificação para implementação (skill `nid-pages` ou página nativa do sistema de checkout)

- Página de uma coluna, largura máxima de 720 px, fundo branco, sem navbar, sem menu, sem contagem regressiva.
- Ordem: selo e linha de apoio, título de dor (FadeUp linha a linha), texto, bloco de solução com lista em stagger, card de oferta (fundo off-white, borda laranja de 2 px) com preço, CTA laranja e garantia ao lado, link de recusa em cinza `#6B6B6B` abaixo do card.
- Imagem única, dentro do card de oferta: frame da aula gravada, com o Henrique e o projeto desenhado na tela, só depois da gravação. Até lá, a capa do mini curso na identidade NID.
- O botão de aceite executa a cobrança de um clique nativa do sistema de checkout. Nenhum campo de cartão nesta página.
- O link de recusa é um link de texto, sempre visível, nunca escondido atrás de scroll ou de tempo.
- Eventos: `F2_upsell_visto`, `F2_upsell_aceito`, `F2_upsell_recusado`, nomeados pelo `automacao`.
- Esta página só entra no ar com a aprovação do Henrique registrada na seção 13 do brief.
