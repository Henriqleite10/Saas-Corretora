# Playbook NID · Desenhe para Vender · Página de obrigado

| Campo | Valor |
|---|---|
| Quando aparece | Logo após o pagamento aprovado (ou após a página de um clique, para quem recusou a oferta adicional, se aprovada pelo Henrique) |
| Função | Confirmar a compra, fazer as duas perguntas do Gatilho A como continuidade natural e levar ao acesso |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seção 8.2), `docs/01-parecer-estrategico.md` (seções 3.4 e 6, item 1), `automacoes/02-entrega-pos-compra.md` (seção 3), decisão 1 do coordenador |

Regras desta página (do fluxo do `automacao`): carrega em menos de 2 segundos, sem vídeo, sem formulário. Cada resposta grava na hora, sem botão de enviar. A pessoa pode ir para o acesso sem responder. Nunca se supõe a resposta.

Duas variantes de texto: A (comprou só o playbook) e B (comprou o playbook com as aulas). Tudo o que não está marcado com A ou B é igual nas duas.

---

## Bloco 1 · Confirmação

**Selo**
Compra confirmada

**Título (variante A)**
Seu Playbook NID · Desenhe para Vender já está a caminho.

**Título (variante B)**
Seu playbook e as aulas do mini curso já estão a caminho.

**Linha de apoio**
Em até 2 minutos o acesso chega no seu e-mail e no seu WhatsApp. Se não chegar, olhe a pasta de promoções ou fale com a gente pelo WhatsApp da NID.

---

## Bloco 2 · Pergunta 1 (Gatilho A)

**Texto de transição**
Antes de você ir para o acesso, uma pergunta. A resposta muda o que a gente te envia nos próximos dias.

**Pergunta 1**
Você vende para a sua própria empresa ou para a empresa de outra pessoa?

**Opções (um clique cada)**
- Para a minha própria empresa
- Para a empresa de outra pessoa

**Microcopy sob as opções**
Um clique. Sem cadastro, sem formulário.

---

## Bloco 3 · Pergunta 2 (só aparece se a resposta 1 for "Para a minha própria empresa")

**Pergunta 2**
Você decide contratações de marketing ou vendas na sua empresa?

**Opções (um clique cada)**
- Sim, eu decido
- Não, outra pessoa decide

---

## Bloco 4 · Retorno após as respostas

**Se respondeu "Para a empresa de outra pessoa"**
Anotado. O playbook tem um capítulo para o seu perfil: comece pelo capítulo 10 depois de ler as quatro etapas.

**Se respondeu "Para a minha própria empresa" e "Não, outra pessoa decide"**
Anotado. O capítulo para consultores e donos de serviço mostra como vender projeto fechado em vez de hora. Comece por ele depois das quatro etapas.

**Se respondeu "Para a minha própria empresa" e "Sim, eu decido"**
Anotado. O método que você vai ler é o mesmo que a NID usa para desenhar o projeto comercial dos clientes dela: geração de demanda, automação comercial com IA e terceirização de BDR, SDR e closer. Quem desenha projeto para os clientes também pode ter o próprio projeto comercial desenhado pela NID. Nos próximos dias alguém da NID te escreve para propor uma sessão de arquitetura, sem custo. Enquanto isso, o seu playbook está logo abaixo.

Nota de implementação: as respostas gravam `vende_para` e `decide_contratacao` com o id do pedido (evento `F2_qualificacao_respondida`). A combinação "própria" + "sim" aplica `F2-gatilho-A` e cria a tarefa humana de 24 horas. O texto de retorno aparece no lugar das perguntas, sem recarregar a página. Se a pessoa não responder, fica `nao_respondeu` e o `automacao` repete a pergunta 1 no e-mail de D+1.

---

## Bloco 5 · Acesso

**Título (variante A)**
Agora, o seu playbook.

**Título (variante B)**
Agora, o seu playbook e as suas aulas.

**Texto (variante A)**
O link abaixo abre a área de membros, com o playbook em PDF e os cinco templates para download. Leia com a próxima proposta na cabeça. Se ela é para esta semana, vá direto aos capítulos 2 a 6 e preencha o canvas de dor.

**Texto (variante B)**
O link abaixo abre a área de membros, com o playbook, os cinco templates e as aulas no mesmo lugar. Comece pelo playbook: leia os capítulos 2 a 6, preencha o canvas de dor e só então abra a aula 1. As aulas começam onde o playbook termina, com a proposta na mão.

**CTA único**
Ir para o meu acesso

**Linha sob o CTA**
O mesmo link já está no seu e-mail e no seu WhatsApp.

---

## Bloco 6 · Rodapé

7 dias de garantia, reembolso sem pergunta. Para pedir, responda ao e-mail de entrega ou fale com a gente pelo WhatsApp da NID.

NID - Núcleo de Inteligência Digital LTDA · CNPJ 11.698.721/0001-33

---

## Especificação para implementação (skill `nid-pages`)

- Página de uma coluna, largura máxima de 640 px, fundo branco, sem navbar e sem menu. Nenhum link além do CTA de acesso, do WhatsApp da NID e dos dois do rodapé.
- Ordem na tela: selo e título (FadeUp), linha de apoio, bloco de pergunta (card off-white com borda `#E4E2DE`), bloco de acesso (CTA laranja com garantia ao lado), rodapé.
- A pergunta 2 aparece no mesmo card, com `AnimatePresence`, logo depois do clique na opção "Para a minha própria empresa". O texto de retorno substitui as perguntas com a mesma transição. Nenhum recarregamento.
- Botões de resposta: dois botões largos, lado a lado no desktop e empilhados no mobile, com `whileHover scale 1.02` e `whileTap scale 0.97`. Ao clicar, o botão escolhido fica laranja e o outro some.
- O CTA "Ir para o meu acesso" fica visível desde o carregamento, abaixo do card de perguntas. A pessoa nunca precisa responder para acessar.
- Identificação do pedido pelo parâmetro na URL. Se o sistema de checkout não enviar o id, a página mostra um campo único "E-mail usado na compra" acima da pergunta 1, com o texto "Digite o e-mail da compra para a gente registrar a sua resposta", e o restante segue igual.
- Sem pixel de conversão de compra nesta página (o evento de compra vem do webhook, para não contar duas vezes). Evento de página: `F2_pagina_obrigado_vista`.
- Tempo de carga abaixo de 2 segundos: sem vídeo, sem fonte pesada além das duas da identidade, sem imagem acima da dobra.
