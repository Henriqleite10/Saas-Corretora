# NIDflow · Plano de assinatura

| Campo | Valor |
|---|---|
| Produto | NIDflow, a ferramenta da NID para desenhar e apresentar projetos |
| Preço | R$ 29,90 por mês |
| Versão deste documento | 1.0 (Sprint 4) |
| Status | Entregue ao coordenador, aguardando aprovação do Henrique nos pontos marcados |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 5, 6.4, 8, 10, 12) |
| Dependência | Auditoria do HTML atual (item B-00 do `04-backlog-tecnico.md`) antes de qualquer promessa sobre o que a ferramenta faz hoje |

Convenção usada neste documento e nos vizinhos:

- **Existe (brief)**: o brief afirma que a ferramenta faz. Confirmar na auditoria.
- **A auditar**: não se sabe se existe até receber o HTML.
- **Backlog**: ainda não existe; só entra na oferta quando o item do backlog estiver entregue.

---

## 1. Resumo do plano

Plano único, sem degraus, sem versão gratuita.

| Item | Regra |
|---|---|
| Nome | NIDflow |
| Preço | R$ 29,90 por mês, cobrança recorrente mensal |
| Quem assina | Uma pessoa (o comprador do playbook ou do mini curso). Uma conta por assinatura, um login por conta |
| Período grátis | Não há (decisão 4 do brief). A oferta em D+7 é direta a R$ 29,90 |
| Garantia | 7 dias, reembolso sem pergunta (Código de Defesa do Consumidor, seção 5.2 do brief) |
| Cancelamento | A qualquer momento, sem multa, sem ligação, sem justificativa. Um clique na área do assinante da plataforma de checkout ou dentro do NIDflow |
| Renovação | Automática, todo mês, na mesma data da assinatura |
| Formas de pagamento | Cartão de crédito (recorrência automática). Pix automático se a plataforma de cobrança escolhida oferecer (ver seção 9) |
| Plataforma NID | Assinante da Plataforma NID (R$ 980/ano) tem o NIDflow incluso (decisão 3 do brief) |

Frase-padrão do plano (para páginas, e-mails e agente de IA): "R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia."

---

## 2. O que está incluso

| # | Incluso | Estado | Observação |
|---|---|---|---|
| 1 | Acesso ao NIDflow no navegador, sem instalação | Existe (brief) | HTML único, roda em qualquer navegador moderno. Confirmar na auditoria se há dependência de recurso local (arquivo, extensão) |
| 2 | Os cinco templates do Método NID prontos dentro da ferramenta: canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor e roteiro de proposta | Backlog (B-05) | Bloqueia a venda. O comprador desenha no papel com o playbook e precisa encontrar o mesmo template na tela |
| 3 | Desenho do projeto em fluxo visual: etapas, componentes, ligações | Existe (brief) | É o core da ferramenta segundo o brief (seção 7, regra 4) |
| 4 | Modo de apresentação: o mesmo desenho vira a apresentação, sem exportar para outro programa | Existe (brief) | Confirmar na auditoria como funciona (tela cheia, navegação por etapa) |
| 5 | Projetos ilimitados | Recomendado, a confirmar (B-00) | Ver seção 3 |
| 6 | Projetos salvos na nuvem, acessíveis de qualquer dispositivo | Backlog (B-03) | Bloqueia a venda. Hoje, se o HTML salva só no navegador (a auditar), o assinante perde tudo ao limpar o cache |
| 7 | Exportação do projeto em PDF | Backlog (B-08) | Bloqueia a venda por causa da política de cancelamento (seção 6) |
| 8 | Onboarding guiado até o primeiro projeto desenhado em menos de 15 minutos | Backlog (B-06) | Descrito em `02-onboarding.md` |
| 9 | Suporte por e-mail e WhatsApp em dias úteis, resposta em até 1 dia útil | Decisão deste documento | Ver seção 11 |
| 10 | Atualizações da ferramenta sem custo adicional | Decisão deste documento | Todo assinante ativo recebe o que for lançado no plano único |

O que **não** está incluso e não deve ser prometido em nenhuma peça enquanto não entrar no backlog com data:

- Link público de apresentação para enviar ao cliente (candidato a B-12, sem data).
- Colaboração: mais de uma pessoa no mesmo projeto (sem data).
- Geração de texto ou desenho por IA dentro da ferramenta (sem data).
- Aplicativo para celular ou uso off-line.
- Integração com CRM, Google Slides, PowerPoint ou Canva.

---

## 3. Limites

Princípio: o limite existe para proteger a operação, nunca para forçar upgrade (não há plano superior). Todo limite aparece na tela antes de ser atingido.

| Limite | Valor | Justificativa |
|---|---|---|
| Projetos | Ilimitados | Um projeto é um documento JSON pequeno. Custo de armazenamento irrelevante frente a R$ 29,90. Confirmar na auditoria se o modelo de dados permite muitos projetos por conta sem degradação |
| Usuários por assinatura | 1 | Conta pessoal. Compartilhar login viola os termos de uso |
| Sessões simultâneas | 2 dispositivos | Permite notebook e tablet na reunião. Terceira sessão derruba a mais antiga |
| Armazenamento de anexos (logos, imagens) | 200 MB por conta, se a ferramenta suportar imagens (a auditar) | Uso justo. Aviso na tela a partir de 80% |
| Exportações em PDF | Ilimitadas | Custo desprezível |
| Tamanho de um projeto | 100 etapas ou componentes por fluxo | Acima disso, o desenho deixa de ser apresentável. Aviso na tela, não bloqueio |

---

## 4. Primeiro acesso: sem período grátis

Decisão 4 do brief: a oferta em D+7 é direta, a R$ 29,90, com garantia de 7 dias e cancelamento livre. Motivos, para o `copy` usar no argumento:

1. O comprador já pagou pelo playbook. A confiança já foi construída por um produto entregue.
2. A garantia de 7 dias faz o papel do período grátis, sem criar o hábito de "testar e esquecer".
3. Um período grátis exigiria fluxo de conversão de trial para pago, que não existe e não entra neste sprint.

Regra para todas as peças: nunca escrever "teste grátis", "experimente sem compromisso" ou "7 dias grátis". O que existe é "7 dias de garantia, reembolso sem pergunta".

---

## 5. Garantia de 7 dias

| Regra | Detalhe |
|---|---|
| Prazo | 7 dias corridos a partir da confirmação do pagamento |
| Como pedir | Pela plataforma de checkout (botão de reembolso na área do comprador) ou pelo suporte da NID (e-mail ou WhatsApp). Nenhum canal pede justificativa |
| Prazo de devolução | Conforme a plataforma de checkout (cartão: estorno na fatura em até duas faturas; Pix: devolução na conta de origem) |
| O que acontece com a conta | Acesso encerrado no momento do reembolso. Projetos entram no mesmo regime do cancelamento (seção 6): exportação em PDF por 30 dias, exclusão em 90 dias |
| Uso durante a garantia | Sem restrição. Quem exportou dez PDFs e pediu reembolso no dia 6 recebe o reembolso. A regra é "sem pergunta" e vale para todo mundo |
| Garantia após o primeiro mês | Não há. Só cancelamento livre (a próxima cobrança não acontece) |

---

## 6. Cancelamento e o que acontece com os projetos

Cancelar é livre e imediato. O que muda é só a próxima cobrança.

| Momento | O que o assinante tem |
|---|---|
| Cancelou no meio do período | Acesso completo até o fim do período já pago. Nenhuma cobrança nova |
| Fim do período pago | Conta entra em **modo leitura**: abre e vê todos os projetos, exporta em PDF, não cria nem edita. Faixa na tela: "Sua assinatura terminou. Você pode exportar seus projetos em PDF até [data]. Para voltar a editar, reative por R$ 29,90 por mês" |
| 30 dias após o fim do período | Exportação em PDF encerrada. Projetos ficam guardados, invisíveis para o assinante |
| 90 dias após o fim do período | Projetos e dados pessoais excluídos de forma definitiva (LGPD, princípio da necessidade). E-mail de aviso em D+60 e D+83 |
| Reativação | Em qualquer momento antes dos 90 dias, uma nova assinatura reativa a mesma conta com todos os projetos. Depois dos 90 dias, a conta começa do zero |

Recomendação registrada: **exportação em PDF liberada por 30 dias** após o fim do acesso. É o que faz o cancelamento ser de fato "sem pegadinha" e sustenta a promessa de cancelamento livre. Depende do item B-08 (exportação em PDF), por isso ele bloqueia a venda.

Quem cancela recebe uma pergunta única, opcional, de um clique (motivo do cancelamento), para alimentar a retenção. Nunca uma tela de "tem certeza?" em cascata, nunca desconto de retenção (o brief proíbe desconto fora dele).

---

## 7. Inadimplência e bloqueio

Inadimplência acontece só no cartão (Pix automático que não é pago equivale a não renovar).

| Dia | O que acontece | Quem faz |
|---|---|---|
| D0 | Cobrança recusada. A plataforma de checkout tenta de novo automaticamente (régua da própria plataforma, normalmente 3 tentativas em até 7 dias) | Plataforma de checkout |
| D0 | E-mail e WhatsApp "não conseguimos renovar" com link para atualizar o cartão. Acesso completo mantido | `automacao` (webhook de pagamento recusado) |
| D+3 | Segundo aviso. Acesso completo mantido | `automacao` |
| D+7 | Última tentativa da plataforma. Se falhar, a assinatura é marcada como inadimplente | Plataforma de checkout |
| D+7 | Conta entra em **modo leitura** (mesmo regime do fim do período pago). Faixa na tela com botão "Atualizar pagamento" | NIDflow (webhook `assinatura_inadimplente`) |
| D+37 | Exportação em PDF encerrada | NIDflow |
| D+97 | Exclusão definitiva | NIDflow |
| A qualquer momento | Pagamento regularizado: acesso completo volta na hora, com todos os projetos | NIDflow (webhook `assinatura_ativa`) |

Regra: **nunca bloquear a leitura no primeiro dia de recusa**. O assinante pode estar no meio de uma apresentação. O bloqueio de edição só acontece depois que a plataforma esgotou as tentativas.

---

## 8. Relação com a Plataforma NID

Decisão 3 do brief: o NIDflow está incluso na Plataforma NID (R$ 980 por ano).

| Situação | Regra |
|---|---|
| Comprou a Plataforma NID sem ter o NIDflow | O webhook da Plataforma cria a conta do NIDflow com status `ativa_via_plataforma`, válida enquanto a anuidade estiver ativa. Mesmo e-mail de acesso |
| Já assinava o NIDflow e comprou a Plataforma NID | A NID cancela a assinatura mensal do NIDflow no dia da compra da Plataforma (rotina manual do suporte no lançamento; automatizável depois). A conta continua a mesma, com todos os projetos. Nenhum reembolso proporcional do mês em curso (o mês já pago segue valendo). O assinante recebe um e-mail explicando |
| Anuidade da Plataforma não renovou | NIDflow entra no regime da seção 6 (modo leitura, PDF por 30 dias, exclusão em 90). O assinante pode assinar o NIDflow avulso por R$ 29,90 por mês e manter tudo |
| Reembolso da Plataforma dentro dos 7 dias | O NIDflow incluso é encerrado junto. Se a pessoa tinha assinatura mensal cancelada por causa da Plataforma, o suporte reativa a mensal sem novo período de garantia |

Consequência para a comunicação: em toda peça da Plataforma NID, o NIDflow aparece como item incluso, com o valor anual de referência de R$ 358,80 (12 vezes R$ 29,90) na ancoragem. O agente `plataforma` usa esse número.

---

## 9. Plataforma de cobrança recorrente

### 9.1 Critérios

A cobrança do NIDflow precisa, nesta ordem de importância:

1. Ser a **mesma plataforma do checkout do playbook** (decisão 5 do brief, a cargo do agente `automacao` no Sprint 3). Uma base, um webhook, um fluxo de reembolso, um relatório. Vale mais do que um ou dois reais de taxa por assinante.
2. Ter assinatura recorrente nativa no cartão, com régua automática de retentativa.
3. Enviar webhooks de: assinatura ativa, pagamento recusado, assinatura inadimplente, assinatura cancelada, reembolso.
4. Oferecer área do comprador com cancelamento em um clique.
5. Emitir ou integrar nota fiscal.
6. Ter taxa compatível com um ticket de R$ 29,90 (taxas fixas altas pesam muito nesse valor).

### 9.2 Comparativo de taxas sobre R$ 29,90

Pesquisa feita em 11/09/2026 por busca na web. Os sites oficiais das cinco empresas não puderam ser abertos a partir deste ambiente, então os valores abaixo vêm de fontes secundárias datadas de 2026 e **precisam ser confirmados na página oficial no dia da contratação**. As fontes estão na seção 9.4.

| Plataforma | Taxa informada | Custo em uma cobrança de R$ 29,90 | Líquido por assinante por mês | Recorrência | Prazo de recebimento (cartão) | Observações |
|---|---|---|---|---|---|---|
| **Cakto** | 8,5% + R$ 0,50 por venda; Pix 0%; Pix automático para assinaturas | R$ 3,04 (10,2%) | R$ 26,86 | Nativa (cartão e Pix automático) | Até 15 dias; 2 dias com antecipação | Fontes divergem sobre a taxa de saque (uma diz gratuita, outra cita R$ 4,59 por saque). Confirmar |
| **Hotmart** | 9,9% + R$ 1,00 por venda. Uma fonte informa que a partir de 21/09/2026 a taxa fixa passa a R$ 2,49 por transação | R$ 3,96 (13,2%); R$ 5,45 (18,2%) se a fixa for R$ 2,49 | R$ 25,94 ou R$ 24,45 | Nativa | 30 dias corridos; antecipação de 2,19% (14 dias) a 4,79% (flexível) | Maior ecossistema de afiliados. Prazo de 30 dias pesa no caixa |
| **Kiwify** | 8,99% + R$ 2,49 por venda aprovada | R$ 5,18 (17,3%) | R$ 24,72 | Nativa | 15 dias corridos; Pix e boleto em 2 dias | Taxa de saque de R$ 3,67. A taxa fixa de R$ 2,49 é a mais pesada sobre R$ 29,90 |
| **Stripe** | Cartão nacional 3,99% + R$ 0,39; Stripe Billing 0,4% (Starter) a 0,5% (Plus) por fatura paga; Pix 1,19% | Cerca de R$ 1,70 (5,7%) | Cerca de R$ 28,20 | Nativa (Billing), só cartão | 2 dias úteis | Não tem checkout com order bump nem área de membros; exige construir checkout e emissão de nota fiscal por fora; Pix para empresas no Brasil restrito a convite segundo a fonte |
| **Asaas** | Cartão em assinatura: 1,99% + R$ 0,49 (fonte cita 2,99% como percentual padrão fora da promoção de 3 meses); Pix R$ 1,99 por cobrança (100 grátis por mês); boleto R$ 3,49; sem mensalidade | R$ 1,09 (3,6%) a R$ 1,38 (4,6%) | R$ 28,52 a R$ 28,81 | Nativa (assinatura no cartão; Pix por cobrança mensal enviada ao cliente, não automática) | A confirmar na página oficial | Emissão de nota fiscal integrada. Não tem checkout de infoproduto (order bump, área de membros, afiliados). Exige construir a página de checkout |

### 9.3 Recomendação

**Cobrar o NIDflow na mesma plataforma do checkout do playbook. Entre as três plataformas de infoproduto avaliadas, a recomendação para essa escolha é a Cakto.**

Por quê:

- Em um ticket de R$ 29,90, a taxa fixa decide. Cakto (R$ 0,50) custa R$ 3,04 por cobrança; Kiwify (R$ 2,49) custa R$ 5,18; Hotmart fica no meio hoje e pode chegar a R$ 5,45 se a mudança de taxa fixa se confirmar. Em 500 assinantes, a diferença entre Cakto e Kiwify é de R$ 1.070 por mês.
- Pix automático em assinatura (Cakto) reduz inadimplência de cartão, que é a principal perda de receita recorrente em ticket baixo.
- Order bump nativo, área de membros para o mini curso e webhooks resolvem os critérios 1 a 4 sem desenvolvimento.

Plano B: **Asaas**, se o agente `automacao` e o coordenador decidirem por checkout próprio (página de checkout construída pela NID). Menor taxa, nota fiscal integrada, webhooks completos. Custo: construir e manter checkout, order bump, área do comprador e régua de reembolso. Não recomendado para o lançamento.

Descartado: **Stripe**. Boa taxa, mas exige a mesma construção do plano B, sem Pix garantido para empresas no Brasil e sem nota fiscal.

Se o `automacao` escolher Hotmart ou Kiwify para o playbook, o NIDflow vai junto assim mesmo. A diferença de taxa (de R$ 0,92 a R$ 2,41 por assinante por mês) não paga a complexidade de manter duas plataformas.

**Ponto para aprovação do Henrique**: a plataforma de checkout (decisão 5 do brief). Este documento recomenda Cakto; a recomendação final é do coordenador após a avaliação do `automacao`.

### 9.4 Fontes consultadas (11/09/2026)

- Hotmart: [Tactus, taxas da Hotmart para produtor em 2026](https://tactus.com.br/taxas-da-hotmart-para-produtor/); [EngagED, taxa da Hotmart em 2026](https://engaged.com.br/blog/taxa-hotmart-quanto-custa-vender/); [Central de Ajuda Hotmart, taxas](https://help.hotmart.com/pt-br/article/208298448/quais-sao-as-taxas-cobradas-pela-hotmart-); [Central de Ajuda Hotmart, prazo de recebimento](https://help.hotmart.com/pt-br/article/4409154605837/como-funciona-o-prazo-de-recebimento-e-antecipacao-de-vendas-feitas-por-cartao-de-credito-).
- Kiwify: [Central de Ajuda Kiwify, taxas](https://ajuda.kiwify.com.br/pt-br/article/quais-sao-as-taxas-da-plataforma-1ems3wq/); [EngagED, taxa da Kiwify](https://engaged.com.br/blog/taxa-kiwify-quanto-custa-vender/); [Tactus, como sacar na Kiwify em 2026](https://tactus.com.br/como-sacar-dinheiro-na-kiwify/).
- Cakto: [Ajuda Cakto, taxas da plataforma](https://ajuda.cakto.com.br/pt-br/articles/72-quais-sao-as-taxas-da-plataforma-cakto); [Cakto, política de pagamentos](https://www.cakto.com.br/pagamentos); [Blog Cakto, Cakto vs concorrentes](https://blog.cakto.com.br/cakto-vs-concorrentes-menor-taxa-mais-lucro/); [Cakto Docs, webhook de cancelamento](https://cakto-dece4a15.mintlify.app/webhooks/cancelamento).
- Stripe: [Stripe, preços e tarifas](https://stripe.com/pricing); [Stripe Billing, preços](https://stripe.com/billing/pricing); [Stripe, Pix no Brasil](https://stripe.com/br/payment-method/pix); [Wise, Stripe aceita Pix?](https://wise.com/br/blog/stripe-aceita-pix); [Remessa Online, como receber pela Stripe](https://www.remessaonline.com.br/blog/stripe/).
- Asaas: [Asaas, preços e taxas](https://www.asaas.com/precos-e-taxas); [Asaas, regulamento da promoção de 3 meses](https://central.ajuda.asaas.com/hc/pt-br/articles/32095332785947-Regulamento-Promo%C3%A7%C3%A3o-3-meses-de-taxas-reduzidas); [Runzos, Asaas em 2026](https://runzos.com/asaas-review-2026/).
- Comparativos gerais: [Greenn, Kiwify vs Hotmart 2026](https://greenn.com.br/comparativos/kiwify-vs-hotmart/); [Infosaas, Hotmart, Kiwify, Eduzz ou Cakto](https://infosaas.ai/blog/hotmart-kiwify-eduzz-cakto-qual-escolher/).

---

## 10. Como o acesso é liberado

Fluxo padrão, independente da plataforma escolhida. Detalhes técnicos em `04-backlog-tecnico.md` (itens B-02 e B-04).

```
Assinante paga no checkout
        │
        ▼
Plataforma de checkout envia webhook "assinatura ativa"
(e-mail, nome, id da assinatura, produto, status)
        │
        ▼
Função do NIDflow valida a assinatura do webhook (segredo compartilhado)
        │
        ├── e-mail já tem conta → marca assinatura como ativa, reativa se estava em leitura
        │
        └── e-mail sem conta → cria a conta (Supabase Auth), grava assinatura como ativa
        │
        ▼
NIDflow dispara o e-mail de acesso (link mágico, válido por 24 h)
e avisa o `automacao` (evento `conta_criada`) para o WhatsApp de boas-vindas
        │
        ▼
Assinante clica, entra sem senha, define senha (opcional) e cai no onboarding
```

Regras:

- Tempo entre pagamento e e-mail de acesso: menos de 2 minutos. Se o webhook falhar, a função tenta de novo (fila da plataforma) e o suporte recebe alerta.
- O e-mail de acesso sai de "NID" (remetente), nunca de "Henrique".
- Se a pessoa já tinha conta (por exemplo, assinou, cancelou e voltou), nada é criado de novo: a mesma conta reativa com os projetos.
- Todos os eventos de assinatura (ativa, recusada, inadimplente, cancelada, reembolsada) passam pela mesma função e mudam só o campo `status` da assinatura. O NIDflow lê esse status ao abrir.

---

## 11. Suporte

| Item | Regra |
|---|---|
| Canais | E-mail de suporte da NID e WhatsApp da NID (mesmo número do agente de IA do Funil 2; o agente responde dúvidas de uso e encaminha para humano o que envolve cobrança) |
| Horário | Dias úteis, 9h às 18h (horário de Brasília) |
| Prazo de primeira resposta | Até 1 dia útil |
| O que o suporte resolve | Acesso, cobrança, reembolso, dúvida de uso, bug |
| O que o suporte não faz | Desenhar o projeto pelo assinante, revisar proposta, consultoria. Esses pedidos são tratados como sinal de Gatilho A ou B e encaminhados conforme a seção 8.2 do brief |
| Base de ajuda | Página única de perguntas frequentes dentro do NIDflow (B-10), com as dez dúvidas mais comuns, atualizada mensalmente com base nos tickets |

---

## 12. Termos de uso e privacidade (resumo do que o assinante lê)

Texto jurídico completo é do coordenador com apoio da skill `nid-contratos`. O que este documento fixa:

- Contratante: NID - Núcleo de Inteligência Digital LTDA, CNPJ 11.698.721/0001-33 (seção 1.1 do brief).
- Licença de uso pessoal, não transferível, uma pessoa por conta.
- Os projetos são do assinante. A NID não lê, não usa e não exibe projetos de assinantes. A NID só acessa um projeto a pedido do assinante, para suporte, com registro.
- Dados pessoais tratados: nome, e-mail, dados de pagamento (ficam na plataforma de checkout, nunca no NIDflow), eventos de uso mínimos (seção de telemetria em `03-interno-vs-produto.md`). Base legal: execução de contrato. Guarda: enquanto a conta existir e por 90 dias após o fim do acesso.
- Conteúdo dos projetos pode incluir dados de clientes do assinante. Nesse caso o assinante é o controlador e a NID, operadora. O termo diz isso em uma frase.
- Hospedagem em servidor no Brasil (região São Paulo do Supabase), ver B-03.
- Canal de privacidade: e-mail dedicado da NID (a definir pelo Henrique; ponto de aprovação).
- Reembolso em 7 dias, cancelamento livre, regime dos projetos após o fim do acesso (seção 6), tudo em linguagem direta na página do plano, não só no termo.

---

## 13. Regras de comunicação do plano (para `copy`, `automacao` e agente de IA)

1. Preço sempre "R$ 29,90 por mês". Nunca "R$ 29,90/mês" em texto corrido de página ou e-mail (a barra fica só em tabelas e documentos internos).
2. Nunca "teste grátis". Sempre "7 dias de garantia, reembolso sem pergunta" e "cancela quando quiser".
3. Nunca prometer link público de apresentação, colaboração, IA, aplicativo ou integração.
4. O que dizer sobre exportação em PDF depende do item B-08 estar entregue no lançamento. Se não estiver, a política de cancelamento é comunicada como "seus projetos ficam guardados por 90 dias para você reativar".
5. Nenhum desconto, cupom ou plano anual do NIDflow. O único "anual" que inclui o NIDflow é a Plataforma NID.
6. O NIDflow é "a ferramenta da NID para desenhar e apresentar projetos". Nunca "software", "app", "plataforma" ou "sistema".
