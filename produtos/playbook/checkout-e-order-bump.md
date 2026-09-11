# Playbook NID · Desenhe para Vender · Checkout e oferta adicional do mini curso

| Campo | Valor |
|---|---|
| Produto principal | Playbook NID · Desenhe para Vender (R$ 29,90) |
| Oferta adicional no checkout | Mini curso NID · Apresente para Fechar por R$ 97 (R$ 147 fora desta compra) |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 5, 5.2, 6.1, 6.2), `docs/01-parecer-estrategico.md` (seções 2.2, 4 e 5), `automacoes/02-entrega-pos-compra.md` (seções 2 e 6), `produtos/mini-curso/00-grade.md` (8 aulas, cerca de 108 minutos, materiais; se a grade mudar na aprovação, os números mudam junto) |
| Sistema de checkout | Cakto (recomendação do `automacao`), Kiwify como reserva. Os campos abaixo existem nos dois; o `automacao` confere os limites de caracteres na configuração |

Como ler: os blocos "Texto" são copy final, voltada ao comprador. As "Notas de implementação" são para o `automacao` e não aparecem na tela. Nenhum termo interno aparece nos textos.

---

## 1. Cabeçalho do checkout

**Nome do produto**
Playbook NID · Desenhe para Vender

**Linha de apoio (subtítulo)**
Como desenhar qualquer projeto para vender

**Descrição curta (até 200 caracteres)**
O Método NID de Desenho de Projetos em PDF, com cinco templates de fluxo, um caso conduzido e o checklist da proposta pronta. Acesso imediato por e-mail e WhatsApp.

**Descrição completa (quando o checkout tiver campo maior)**
O método que a NID, consultoria de performance comercial, usa para desenhar os projetos que vende, em um playbook que se lê em uma sentada e se aplica na próxima proposta.

O que está incluso:

- O playbook em PDF, com o método em quatro etapas: Dor, Solução, Arquitetura e Valor
- Um caso conduzido do início ao fim
- Cinco templates de fluxo, com instruções e exemplo preenchido: canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor e roteiro de proposta
- O roteiro de proposta em nove páginas
- O checklist "proposta pronta para apresentar"
- Acesso imediato por e-mail e WhatsApp

7 dias de garantia, reembolso sem pergunta.

**Preço exibido**
R$ 29,90

**Imagem do produto**
Capa do playbook (gerada a partir de `03-playbook.pdf`, página 1), em fundo off-white `#F5F4F2`.

---

## 2. Campos do formulário (rótulos e microcopy)

| Campo | Rótulo | Microcopy abaixo do campo |
|---|---|---|
| Nome | Seu nome | |
| E-mail | Seu melhor e-mail | O acesso ao playbook vai para este e-mail. Confira antes de pagar. |
| Telefone | Seu WhatsApp | Você recebe o link de acesso por aqui também. |
| CPF | CPF | Só para a nota fiscal. |
| Forma de pagamento | Como você quer pagar? | Cartão: acesso em até 2 minutos. Pix: acesso em até 2 minutos após a confirmação. |

Nota de implementação: o campo de cupom fica desligado. Não existe cupom no Funil 2 (brief, seção 5.2). Se o sistema exigir o campo, ocultar por CSS ou configuração.

---

## 3. Oferta adicional do mini curso (bloco antes do botão de pagar)

**Selo do bloco**
Só nesta compra

**Título**
Desenhar resolve metade. Adicione as aulas para apresentar e fechar.

**Parágrafo**
O playbook ensina a desenhar o projeto. A outra metade da venda é a reunião: a sequência dos slides, o que dizer em cada página, o que responder quando o cliente diz "está caro", "vou pensar" ou "preciso levar para o comitê", e como fechar com data. Um projeto bem desenhado que trava na apresentação vale o mesmo que um orçamento. O Mini curso NID · Apresente para Fechar são as aulas em que Henrique Leite, sócio da NID, mostra como a NID apresenta e vende o projeto desenhado.

**Lista de ganhos**

- Oito vídeo-aulas gravadas, cerca de 108 minutos, para assistir no seu ritmo, com a proposta na mão
- Os slides de cada aula
- O roteiro de apresentação de projeto, página por página
- O checklist de reunião
- O modelo de proposta da NID
- O banco de objeções e a régua de follow-up pós-reunião

**Ancoragem**
R$ 97 só nesta compra. Depois, R$ 147.
Mesmos 7 dias de garantia, reembolso sem pergunta.

**Texto do checkbox**
Sim, quero adicionar o mini curso Apresente para Fechar por R$ 97 (em vez de R$ 147)

**Linha abaixo do checkbox (quando marcado)**
Adicionado. As aulas chegam no mesmo e-mail e no mesmo WhatsApp que o playbook.

Notas de implementação:

- O bloco fica entre o resumo do pedido e o botão de pagar, com borda laranja `#F26522` de 2 px e fundo off-white. Selo "Só nesta compra" em laranja.
- O preço de R$ 147 aparece riscado ao lado de R$ 97, conforme o padrão do sistema de checkout.
- Ao marcar, o total do pedido muda para R$ 126,90 e o texto do botão muda (seção 4).
- Aceite grava `F2_bump_aceito` e aplica a etiqueta `F2-bump` (fluxo do `automacao`).
- Imagem do bloco: frame da aula gravada com o Henrique e o projeto desenhado na tela, só depois da gravação. Até lá, a capa do mini curso na identidade NID.
- "Só nesta compra" é verdadeiro porque a única outra condição de R$ 97 é a página seguinte ao pagamento, dentro da mesma sessão de compra (condicional, aguarda aprovação do Henrique). Fora da sessão de compra, o mini curso custa R$ 147 em qualquer lugar.

---

## 4. Botão de pagar, garantia e segurança

**Texto do botão (sem a oferta adicional)**
Quero o playbook por R$ 29,90

**Texto do botão (com a oferta adicional marcada)**
Quero o playbook e as aulas por R$ 126,90

**Texto do botão (se o sistema não permitir texto dinâmico)**
Pagar e receber meu acesso agora

**Linha imediatamente abaixo do botão**
7 dias de garantia, reembolso sem pergunta.

**Linha de segurança**
Pagamento seguro. Acesso liberado em até 2 minutos após a aprovação.

**Resumo do pedido (rótulos)**

- Playbook NID · Desenhe para Vender: R$ 29,90
- Mini curso NID · Apresente para Fechar (só nesta compra): R$ 97
- Total: R$ 29,90 ou R$ 126,90

---

## 5. Mensagens de erro (dentro do checkout)

| Situação | Mensagem |
|---|---|
| E-mail em branco ou inválido | Confira o e-mail. É para ele que o acesso ao playbook vai. |
| Telefone inválido | Confira o número com DDD. O link de acesso também chega pelo WhatsApp. |
| CPF inválido | Confira o CPF. A gente precisa dele só para emitir a nota fiscal. |
| Cartão recusado | O cartão não aprovou o pagamento. Isso costuma ser limite ou bloqueio do banco, não um problema seu. Tente outro cartão ou pague por Pix: o acesso chega em até 2 minutos nos dois casos. |
| Dados do cartão incompletos | Faltou um dado do cartão. Confira número, validade e código de segurança. |
| Pix expirado | O código Pix venceu. Gere um novo abaixo; o valor é o mesmo. |
| Erro de conexão | A conexão caiu antes de concluir. Nada foi cobrado. Tente de novo em alguns segundos. |
| Tentativa de compra duplicada (mesmo e-mail, mesmo produto, já aprovado) | Este e-mail já tem o playbook. O acesso está no seu e-mail e no seu WhatsApp. Se não encontrar, fale com a gente pelo WhatsApp da NID. |

---

## 6. Mensagens de confirmação e de espera

**Pix gerado (tela de espera)**
Título: Seu Pix está pronto.
Texto: Pague pelo aplicativo do seu banco. Assim que a confirmação chegar, esta tela muda sozinha e o acesso vai para o seu e-mail e o seu WhatsApp em até 2 minutos. O código vale por {prazo}.
Linha abaixo: Se preferir, pague no cartão e receba o acesso na hora.

**Boleto gerado (se habilitado)**
Título: Seu boleto está pronto.
Texto: O acesso chega em até 2 minutos após a compensação, que pode levar até 2 dias úteis. Se a proposta é para esta semana, pague por Pix ou cartão e receba agora.

**Pagamento aprovado (tela do sistema antes do redirecionamento)**
Título: Pagamento aprovado.
Texto: Estamos liberando o seu acesso. Em instantes você vai para a página de confirmação da NID.

Nota de implementação: o redirecionamento leva à página de obrigado da NID (`pagina-de-obrigado.md`) com o id do pedido na URL. Quem recusou a oferta adicional passa antes pela página de um clique (`pagina-de-upsell.md`), se e quando o Henrique aprovar; sem a aprovação, o redirecionamento é direto para a página de obrigado.

---

## 7. E-mails automáticos do sistema de checkout

O sistema de checkout costuma enviar e-mails próprios de confirmação de compra e de nota fiscal. Regras:

- Se o sistema permitir desligar o e-mail de confirmação, desligar: a entrega é feita pelo e-mail E0 do `automacao` (texto final na segunda parte da copy, em `automacoes/sequencias/`).
- Se não permitir desligar, o remetente é "NID" e o assunto é "Pagamento confirmado: Playbook NID · Desenhe para Vender". Corpo mínimo: "Seu pagamento foi aprovado. O acesso ao playbook chega em até 2 minutos em outro e-mail, com o link da área de membros. Se não chegar, olhe a pasta de promoções ou fale com a gente pelo WhatsApp da NID." Sem link duplicado para a área de membros neste e-mail.
- E-mail de nota fiscal: padrão do emissor, com remetente "NID".

---

## 8. Checklist de coerência deste arquivo

- [x] Preços no formato `R$ 29,90`, `R$ 97`, `R$ 147`, `R$ 126,90`
- [x] Texto do checkbox conforme o brief, seção 6.2
- [x] "Só nesta compra" (nunca "só nesta tela")
- [x] Garantia ao lado do botão
- [x] Nenhum cupom, nenhum desconto além do R$ 97 na compra do playbook
- [x] Nenhum termo interno nos textos voltados ao comprador
- [x] Henrique como "sócio da NID", nunca como mentor
- [x] Sem travessão, sem emoji, sem "pra" ou "pro"
