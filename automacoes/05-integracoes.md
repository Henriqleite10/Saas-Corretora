# Integrações do Funil 2: mapa técnico

| Campo | Valor |
|---|---|
| Versão | 1.0 (Sprint 4) |
| Autor | Agente `automacao` |
| Status | Entregue ao coordenador; a escolha da plataforma de checkout (decisão 5 do brief) aguarda aprovação do Henrique após a validação em conta de teste |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 9, 9.1, 11 regra 9, 12 decisão 5); `docs/01-parecer-estrategico.md` (seções 2.8, 2.10, 5 decisão 5, 6 itens 6 e 7); decisões 3, 4 e 6 do coordenador; `produtos/nidflow/01-plano-de-assinatura.md` (seções 9 e 10); `produtos/nidflow/04-backlog-tecnico.md` (seção 1 e B-01, B-08) |
| Segurança | Este arquivo não contém chave, senha, token, chave de webhook, dado bancário nem dado pessoal. Tudo isso vive em variáveis de ambiente do orquestrador e no cofre de senhas da NID |
| Limite desta sessão | Os sites oficiais da Cakto (`docs.cakto.com.br`, `ajuda.cakto.com.br`), da Kiwify (`docs.kiwify.com.br`, `ajuda.kiwify.com.br`) e da Meta foram bloqueados pelo proxy de rede em 11/09/2026. Tudo o que está marcado como "resumo de busca" veio do resumo público dessas páginas e precisa ser confirmado na página oficial ou em conta de teste antes da contratação. A seção 4.4 lista exatamente o que falta confirmar |

---

## 1. Princípios

1. **Uma única plataforma de checkout para os quatro produtos** (playbook, mini curso, NIDflow e Plataforma NID): uma base de compradores, um conjunto de webhooks, uma conciliação, uma emissão de nota fiscal.
2. **O orquestrador é da NID.** O agente de IA, as sequências, os webhooks e a base rodam em um serviço construído e operado pela NID, com a mesma arquitetura que a NID vende no Funil 1 (decisão 6 do coordenador). Ferramentas de terceiros entram só onde não faz sentido construir (checkout, e-mail transacional, APIs da Meta, tarefas).
3. **A base de contatos do Funil 2 é a fonte da verdade** e vive no banco do orquestrador. ClickUp recebe tarefas, a ferramenta de e-mail em massa recebe uma cópia sincronizada, a planilha do coordenador é exportação. Nenhum deles é fonte.
4. **Prefixo `F2` em tudo**: conta de anúncios, campanhas, pixel, eventos, UTMs, etiquetas, listas do ClickUp, planilhas e relatórios. Nada se mistura com o Funil 1 (brief, 9.1).
5. **Dado mínimo**: nome, e-mail, telefone, respostas de qualificação, compras, eventos e etiquetas. Sem CPF, sem dado de pagamento, sem conteúdo dos projetos do NIDflow, sem texto de conversa além de 90 dias.
6. **Idempotência e conciliação**: todo webhook é processado uma única vez por `id externo + tipo de evento`; uma rotina consulta a API da plataforma a cada 15 minutos para pegar o que o webhook não entregou.

---

## 2. Componentes por função

Custos em valores de lista encontrados em 11/09/2026, por resumo de busca; câmbio não aplicado (o coordenador converte na data da contratação). "Estimativa" marca número derivado por este documento, não valor de lista.

| # | Função | Ferramenta recomendada | Alternativa | Custo mensal | Fonte (11/09/2026) | Observação |
|---|---|---|---|---|---|---|
| F1 | Checkout, order bump, upsell de um clique, assinatura, área de membros do mini curso | **Cakto** (validar primeiro) | **Kiwify** (reserva) | Sem mensalidade. Taxa por venda: Cakto Pix 0% + R$ 2,49; cartão 4,99% + R$ 2,49 (+2 pontos com 3DS). Kiwify 8,99% + R$ 2,49 | Cakto: central de ajuda, artigo "Quais são as taxas da plataforma Cakto?" (resumo de busca). Kiwify: central de ajuda "Quais são as taxas da plataforma" e EngagED 2026 (resumo de busca) | Ver validação na seção 4. Há fontes secundárias que citam 8,5% + R$ 0,50 para a Cakto (usadas no `01-plano-de-assinatura.md`); a divergência precisa ser resolvida na página oficial |
| F2 | Nota fiscal automática | Emissor integrado à plataforma escolhida: **Notazz** ou **eNotas** (Spedy e Digisan também integram com a Cakto) | Emissão manual pelo contador no primeiro mês (só se o volume for menor que 50 notas) | Não confirmado nesta sessão. Estimativa de R$ 50 a R$ 150 por mês pelos planos de entrada; confirmar no site do emissor | Notazz (site), Kiwify "Como integrar com o Notazz", Spedy "integrações Cakto" (resumos de busca) | A escolha depende do regime tributário da NID e de quem é o contador. Decisão do Henrique com o contador |
| F3 | Orquestrador (webhooks, base, sequências, agente de IA, envio, tarefas) | Serviço próprio da NID em **Node.js + TypeScript** (NestJS, BullMQ com Redis, PostgreSQL, `@anthropic-ai/sdk`), a mesma base do radar-corretoras e do que a NID entrega no Funil 1 | Nenhuma (decisão 6 do coordenador). n8n ou Make só como ferramenta de apoio para testes, nunca em produção | Hospedagem: **Railway** (plano Hobby a partir de US$ 5 por mês de uso mínimo; uso cobrado por cima). Estimativa para um serviço pequeno com Postgres e Redis: US$ 15 a 30 por mês | Railway pricing 2026 (resumos de busca: Makerkit, DEV Community, SaaSworthy) | Render ou Fly.io são equivalentes; a escolha é do coordenador. Ambiente de teste separado do de produção |
| F4 | Modelo do agente de IA | **API da Anthropic**, modelo `claude-sonnet-5`, saída estruturada, cache de prompt | Nenhuma | US$ 2 por milhão de tokens de entrada, US$ 10 por milhão de saída; leitura de cache a 10% do preço de entrada. Estimativa por resposta: cerca de 6.000 tokens de entrada (5.000 em cache) mais 300 de saída mais pensamento adaptativo em esforço médio, cerca de US$ 0,01. Com 3.000 a 5.000 respostas por mês: US$ 30 a 50 | Skill `claude-api` (tabela de modelos, atualizada em 24/06/2026) | Limite diário de tokens por canal em variável de ambiente (`01`, seção 10) |
| F5 | WhatsApp oficial | **WhatsApp Cloud API** direto na Meta (número da NID, conta comercial verificada), sem BSP intermediário | BSP brasileiro (por exemplo, o que a NID já usa no Funil 1, se houver) se a verificação direta atrasar | Sem mensalidade na API direta. Cobrança por mensagem de modelo: marketing cerca de R$ 0,31 a R$ 0,35; utilidade cerca de R$ 0,03 a R$ 0,05; resposta dentro da janela de 24 h (serviço) gratuita. Estimativa por 1.000 compradores: cerca de 1.200 mensagens de utilidade (R$ 60) e cerca de 4.000 de marketing contando a recuperação de checkout (R$ 1.400) | SocialHub "Preço WhatsApp API 2026 Brasil", Nimochat, Fortics "mudanças de outubro de 2026" (resumos de busca) | A Meta anunciou mudanças na cobrança em 01/10/2026 (utilidade dentro da janela passa a ser cobrada, segundo a Fortics). Confirmar na tabela oficial da Meta antes de fechar o plano de verba. Faturamento em reais pela entidade brasileira da Meta disponível desde 07/2026 |
| F6 | Instagram direct (comentário → resposta privada, mensagens) | **Instagram Messaging API** (Graph API) no app da NID no Meta for Developers, com as permissões de mensagens aprovadas | **ManyChat Pro** só como ponte temporária para o gatilho comentário → direct com texto fixo (sem IA) enquanto a revisão do app da NID não sai | API: sem custo. ManyChat Pro: a partir de US$ 15 por mês (500 contatos), US$ 25 (1.000), US$ 45 (2.500) | Meta (limites: 750 respostas privadas por hora por conta; 1 resposta privada por comentário em até 7 dias; janela de 24 h) via Conferbot e KeyAPI 2026; ManyChat pricing 2026 (Featurebase, Dealism) (resumos de busca) | Requisitos: conta profissional, "permitir acesso a mensagens" ativo, verificação da empresa na Meta, revisão do app (2 a 6 semanas, estimativa). Começar o pedido de revisão na primeira semana do Sprint 4 |
| F7 | E-mail transacional e sequências disparadas pelo orquestrador (E0 a E6, B1 a B4, N7 a N16, A1 a A4, R1 a R9, CA3, CB0, CB2) | **Resend** (API, domínio próprio da NID com SPF, DKIM e DMARC, webhooks de entrega, devolução e reclamação) | SMTP do provedor atual da NID (só se o Resend for reprovado na verificação de domínio) | Gratuito até 3.000 e-mails por mês; Pro US$ 20 por mês (50.000 e-mails) | Resend pricing 2026 (resumos de busca: Automation Atlas, Flexprice, Nuntly) | Com 1.000 compradores por mês e cerca de 10 e-mails por comprador, o plano Pro é necessário desde o primeiro mês de mídia. Templates versionados no repositório do orquestrador; link de descadastro gerado pelo orquestrador |
| F8 | Conteúdo contínuo (D+15 em diante), lançamento interno da Plataforma NID | **Brevo** (Starter), com a base sincronizada a partir do orquestrador (etiquetas viram atributos) | Resend Broadcasts (cobra por contato, a partir de US$ 40 por mês para 5.000 contatos; mais caro para base pequena) | Gratuito até 300 e-mails por dia; Starter US$ 9 por mês (5.000 e-mails) | Brevo pricing 2026 (resumos de busca: Omnisend, EmailToolTester) | Entra só quando o conteúdo contínuo começar (Sprint 5). Descadastro no Brevo dispara webhook para o orquestrador aplicar `F2-optout-email` |
| F9 | Tarefas humanas (Gatilho A, Gatilho B, atendimento, financeiro, suporte) | **ClickUp** (espaço "F2", listas por tipo de tarefa) | Nenhuma (a NID já usa o ClickUp) | Sem custo adicional se as pessoas já têm assento. Assento novo: Unlimited US$ 7 por usuário por mês (anual) ou US$ 10 (mensal) | ClickUp pricing 2026 (resumos de busca: eesel, TaskUp) | Criação e atualização por API a partir do orquestrador; mudança de status no ClickUp volta por webhook |
| F10 | NIDflow (login, assinaturas, projetos, telemetria) | **Supabase Pro** (região São Paulo) + hospedagem estática do HTML (**Cloudflare Pages**) | Conforme `04-backlog-tecnico.md` | Supabase Pro US$ 25 por mês mais uso; Cloudflare Pages gratuito para site estático | Supabase pricing 2026; Cloudflare Pages pricing (resumos de busca) | Já decidido pelo agente `nidflow`. Este documento só liga o webhook e a telemetria ao orquestrador (seção 5) |
| F11 | Páginas (playbook, obrigado, mini curso, oferta do NIDflow, formulários do Gatilho B e do banco de talentos) | Páginas estáticas pela skill `nid-pages`, no domínio da NID, hospedadas com o mesmo provedor do NIDflow (Cloudflare Pages) | Vercel ou Netlify | Gratuito na faixa de uso prevista | Cloudflare Pages pricing (resumo de busca) | Formulários enviam para endpoints do orquestrador, nunca para terceiros |
| F12 | Pixel e Conversions API da Meta | Pixel F2 no domínio da NID e no checkout (integração nativa da plataforma, a confirmar) + **CAPI** enviada pelo orquestrador no `purchase_approved`, com deduplicação por `event_id = id do pedido` | Só pixel (perde conversões bloqueadas pelo navegador) | Sem custo | Meta for Developers (não acessado; prática padrão) | Nomenclatura de campanhas, conjuntos e criativos é do `trafego`; o orquestrador entrega os eventos da seção 8 |
| F13 | Painel e relatórios | Consultas salvas no Postgres do orquestrador lidas pelo **Looker Studio** (gratuito) e exportação diária em planilha para o coordenador | Metabase auto-hospedado | Sem custo | Prática padrão | Métricas do brief (9.2) e do parecer (9.2 ajustada), por semana de entrada |

Total fixo estimado por mês (sem taxas por venda, sem mídia, sem WhatsApp variável): cerca de US$ 100 a 135 (Railway, Supabase, Resend, Brevo, Anthropic) mais o emissor de nota fiscal (R$ 50 a 150). Variáveis: taxas da plataforma (seção 4.3), mensagens de WhatsApp (F5) e tokens acima da estimativa. Tudo é estimativa até a contratação.

---

## 3. Diagrama textual do fluxo de dados

```
                 ┌──────────────────────────────────────────────────────────────┐
                 │                    AQUISIÇÃO (trafego)                       │
                 │  Post com palavra-chave · Anúncio Meta · Link da bio/WhatsApp │
                 └───────────┬───────────────────────┬──────────────────────────┘
                             │ comentário / mensagem  │ clique com UTM F2
                             ▼                        ▼
   ┌──────────────────────────────────┐    ┌───────────────────────────────┐
   │ META: Instagram Messaging API    │    │ PÁGINA DO PLAYBOOK (nid-pages)│
   │       WhatsApp Cloud API         │    │ pixel F2 · botão WhatsApp     │
   └───────────┬──────────────────────┘    └───────────────┬───────────────┘
               │ webhooks (mensagens, comentários)         │ CTA "Quero o playbook por R$ 29,90"
               ▼                                           ▼
   ┌─────────────────────────────────────────────────────────────────────────────────┐
   │                      ORQUESTRADOR DA NID (Node.js + TypeScript)                  │
   │  ┌──────────────┐ ┌────────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
   │  │ Receptor de  │ │ Agente de IA   │ │ Sequências   │ │ Base F2 (Postgres)   │ │
   │  │ webhooks     │ │ claude-sonnet-5│ │ BullMQ+Redis │ │ contatos, etiquetas, │ │
   │  │ (idempotente)│ │ saída estrut.  │ │ (filas F2)   │ │ respostas, eventos   │ │
   │  └──────┬───────┘ └───────┬────────┘ └──────┬───────┘ └──────────┬───────────┘ │
   │         │                 │                 │                    │             │
   │  ┌──────┴─────────────────┴─────────────────┴────────────────────┴───────────┐ │
   │  │ Envio: Resend (e-mail) · WhatsApp Cloud API (modelos) · Instagram (direct) │ │
   │  │ Tarefas: ClickUp API · Meta CAPI · Brevo (sincronização) · Looker Studio   │ │
   │  └──────────────────────────────────────────────────────────────────────────┘ │
   └───────▲──────────────────────────▲──────────────────────────────▲──────────────┘
           │ webhooks de compra,      │ webhooks de assinatura       │ eventos M1 a M5,
           │ abandono, reembolso,     │ (espelho) + conta_criada     │ perfil_respondido
           │ assinatura               │                              │
   ┌───────┴──────────────────┐   ┌───┴──────────────────────────────┴───────────────┐
   │ PLATAFORMA DE CHECKOUT   │   │ NIDFLOW (Supabase + HTML estático)               │
   │ Cakto (Kiwify reserva)   │──►│ função webhook-checkout → assinaturas.status     │
   │ checkout · bump · upsell │   │ Auth link mágico · projetos · eventos            │
   │ assinatura · membros     │   └──────────────────────────────────────────────────┘
   │ página de obrigado (NID) │
   └───────┬──────────────────┘
           │ purchase_approved
           ▼
   ┌──────────────────────────┐
   │ EMISSOR DE NOTA FISCAL   │
   │ (Notazz ou eNotas)       │
   └──────────────────────────┘
```

Regra de leitura do diagrama: a plataforma de checkout envia o mesmo webhook de assinatura para dois destinos (orquestrador e função `webhook-checkout` do NIDflow), cada um com a própria chave. O NIDflow é a fonte da verdade do status da assinatura para o acesso; o orquestrador guarda um espelho para as etiquetas e as mensagens. Se os dois divergirem, vale o NIDflow e o orquestrador se corrige na conciliação de 15 minutos.

---

## 4. Plataforma de checkout: validação técnica e recomendação

### 4.1 Critérios (decisão 5 do parecer, aplicada pelo coordenador)

| Critério | Cakto | Kiwify | Fonte (11/09/2026) |
|---|---|---|---|
| (a) Uma única plataforma para os quatro produtos (produto avulso, bump, assinatura mensal, assinatura anual) | Atende segundo os resumos: produto avulso, bump, upsell, assinatura com Pix automático, boleto e cartão, Cakto Members | Atende segundo os resumos: produto avulso, bump (até 5 por produto), upsell de um clique, assinatura, área de membros | Cakto: docs "Criar um checkout", ajuda "Como funciona a recorrência na Cakto?"; Kiwify: ajuda "Como funcionam os order bumps", "Como configurar upsell de 1 clique" (resumos de busca) |
| (b) Order bump **e** upsell de um clique nativos | Bump: sim. Upsell de um clique: sim ("cartão salvo, aceite com um clique, cobrado na hora") | Bump: sim. Upsell de um clique: sim (redirecionamento para URL configurada com botões de aceitar e recusar, texto e cor personalizáveis) | Idem |
| (c) Assinatura mensal (NIDflow) e anual com parcelamento (Plataforma NID) | Mensal: sim, com Pix automático, boleto e cartão; retentativa padrão de até 3 tentativas em 3 dias consecutivos; acesso mantido até o fim do período pago. Anual com parcelamento em 12 vezes: **a confirmar** | Mensal: sim (cartão; Pix automático **a confirmar**). Anual com parcelamento: **a confirmar** | Cakto: ajuda "Como funciona a recorrência na Cakto?", "Como cancelar uma assinatura na Cakto?" (resumos de busca) |
| (d) Webhooks com compra aprovada, reembolso, chargeback, assinatura criada, renovada, atrasada e cancelada | Sim, lista completa na API de webhooks (seção 4.2) | Sim para os eventos de assinatura (nomes confirmados); eventos de pedido existem, nomes de API **a confirmar** | Cakto: docs "Atualizar Webhook"; Kiwify: docs "Criar webhook" (resumos de busca) |
| (e) Área de membros para o mini curso e para a Plataforma NID | Cakto Members gratuita, com comunidade e lives segundo o parecer (2.10) | Área de membros gratuita; comunidade e agenda de encontros **a confirmar** | Parecer estratégico, seção 2.10 (resumos de busca) |
| (f) Nota fiscal | Por integrador (Notazz, eNotas, Spedy, Digisan); emissão nativa não confirmada | Por integrador (artigo oficial "Como integrar com o Notazz"); emissão nativa não confirmada | Notazz, Spedy, Digisan, ajuda Kiwify (resumos de busca) |
| (g) Custo por venda simulado | Seção 4.3 | Seção 4.3 | Central de ajuda de cada uma (resumos de busca) |
| Extra 1: página de obrigado da NID com identificação do pedido (decisão 1 do coordenador) | Redirecionamento pós-compra existe (é o mecanismo do upsell). Passagem do id do pedido ou do e-mail na URL: **a confirmar** | Página de obrigado personalizável para cartão aprovado e Pix. Parâmetros na URL: **a confirmar** | Cakto: blog "Como criar um produto e configurar na Cakto"; Kiwify: ajuda "O que é e como funcionam as páginas de obrigado?" (resumos de busca) |
| Extra 2: campo personalizado com opções fixas no checkout (alternativa para P1) | Personalização visual confirmada; campo personalizado **a confirmar** | **A confirmar** | Cakto: ajuda "Como realizar a personalização do checkout?" (resumo de busca) |
| Extra 3: UTMs entregues no webhook e no relatório de vendas | **A confirmar** (a API de checkout sugere parâmetros de rastreio) | **A confirmar** | Cakto docs "Criar um checkout" (resumo de busca) |
| Extra 4: modo de teste (sandbox) para os webhooks | **A confirmar** | **A confirmar** | |
| Extra 5: pré-preenchimento do checkout por URL | Sim (`?name=...&email=...`) | **A confirmar** | Cakto: ajuda "Como usar URL para checkout pré-preenchido?" (resumo de busca) |
| Extra 6: área do comprador com cancelamento de assinatura e reembolso em um clique | Cancelamento pelo portal do cliente, acesso até o fim do período pago | Área do comprador existe; reembolso em um clique **a confirmar** | Cakto: ajuda "Como cancelar uma assinatura na Cakto?" (resumo de busca) |

### 4.2 Eventos de webhook, com o mapeamento para os fluxos deste projeto

Nomes da Cakto conforme a lista de eventos aceitos pela API de webhooks (`docs.cakto.com.br/api-reference/webhooks/update`, resumo de busca de 11/09/2026). Nomes da Kiwify: os de assinatura conforme `docs.kiwify.com.br/api-reference/webhooks/create` (resumo de busca de 11/09/2026); os demais estão no nome da interface e o nome exato do campo `webhook_event_type` precisa ser confirmado na documentação.

| Situação | Cakto | Kiwify | Fluxo que consome | Ação do orquestrador |
|---|---|---|---|---|
| Compra aprovada | `purchase_approved` | Compra aprovada (`order_approved`, a confirmar) | `02` seção 2; `03` seção 1.2 se for mini curso | Contato, etiquetas, nota fiscal, entrega, agenda da sequência, CAPI `Purchase` |
| Compra recusada | `purchase_refused` | Compra recusada (`order_rejected`, a confirmar) | `02` seção 6.3 | N1, N2 |
| Reembolso | `refund` | Compra reembolsada (`order_refunded`, a confirmar) | `02` seção 4 (saídas); `03` seções 1.2 e 3.1 | Cancela sequências, `F2-reembolso`, tarefa financeira; no NIDflow, modo leitura |
| Chargeback | `chargeback` | Chargeback (a confirmar) | Idem | Idem, com tarefa financeira de prioridade alta |
| Abandono de checkout | `checkout_abandonment` | Carrinho abandonado (`abandoned_cart`, a confirmar) | `02` seção 6.1 | R1, R2, R3 |
| Pix gerado | `pix_gerado` | Pix gerado (`pix_created`, a confirmar) | `02` seção 6.2 | P1, P2 |
| Boleto gerado | `boleto_gerado` | Boleto gerado (`boleto_created`, a confirmar) | `02` seção 6.2 | P1, P2 (prazo de 48 h) |
| Outros meios (PicPay, Open Finance) | `picpay_gerado`, `openfinance_nubank_gerado` | Não confirmado | `02` seção 6.2 | Tratados como Pix gerado |
| Assinatura criada (primeira cobrança aprovada) | `subscription_created` | Compra aprovada em produto de assinatura (a confirmar se há evento próprio) | `03` seções 1.2 e 3.1 | `F2-nidflow-ativo`, sai da oferta; NIDflow cria a conta |
| Assinatura renovada | `subscription_renewed` | `subscription_renewed` | `03` seção 3.1 | Evento; volta a `ativa` se estava recusada |
| Renovação recusada ou atrasada | `subscription_renewal_refused` | `subscription_late` | `03` seção 3.1 | R6 (D0, D+3, D+6), `F2-nidflow-recusada` |
| Assinatura cancelada (pelo assinante ou por retentativas esgotadas) | `subscription_canceled` | `subscription_canceled` | `03` seção 3.1 | R7, `F2-nidflow-cancelado`; NIDflow: `cancelada` até o fim do período, depois `leitura` |
| Reembolso de assinatura | `refund` (mesmo evento, produto de assinatura) | Compra reembolsada (a confirmar) | `03` seção 3.1 | Modo leitura imediato, `F2-reembolso` |

Segurança e entrega dos webhooks:

| Item | Cakto | Kiwify | Regra do orquestrador |
|---|---|---|---|
| Autenticação | Chave por webhook, enviado no payload (**a confirmar** o campo e se há assinatura HMAC) | Token por webhook (campo `token` retornado ao consultar o webhook, confirmado por resumo da docs); enviado na URL ou no payload (**a confirmar**) | Chave em variável de ambiente; comparação em tempo constante; webhook com chave inválida é rejeitado com 401 e registrado; limite de taxa no endpoint |
| Retentativas da plataforma | **A confirmar** | **A confirmar** | Independe: conciliação por API a cada 15 minutos; alerta se mais de 3 pedidos por dia forem encontrados só na conciliação |
| Idempotência | Por `id do pedido` ou `id da assinatura` + tipo de evento | Idem | Tabela `webhooks_recebidos` com chave única; evento repetido responde 200 e não faz nada |
| Ordem dos eventos | Não garantida | Não garantida | Toda transição de status valida o estado atual antes de aplicar (por exemplo, `renewed` depois de `canceled` no mesmo minuto vai para revisão humana) |

### 4.3 Custo por venda simulado

Cakto com a taxa da central de ajuda (Pix 0% + R$ 2,49; cartão 4,99% + R$ 2,49); Kiwify 8,99% + R$ 2,49 em todos os meios. Valores arredondados a centavos.

| Pedido | Cakto Pix | Cakto cartão | Cakto cartão com 3DS (+2 pontos) | Kiwify (qualquer meio) | Diferença Kiwify menos Cakto cartão |
|---|---|---|---|---|---|
| Playbook R$ 29,90 | R$ 2,49 (8,3%) | R$ 3,98 (13,3%) | R$ 4,58 (15,3%) | R$ 5,18 (17,3%) | R$ 1,20 |
| Playbook + bump R$ 126,90 | R$ 2,49 (2,0%) | R$ 8,82 (7,0%) | R$ 11,36 (9,0%) | R$ 13,90 (11,0%) | R$ 5,08 |
| Mini curso avulso R$ 147 | R$ 2,49 (1,7%) | R$ 9,83 (6,7%) | R$ 12,77 (8,7%) | R$ 15,71 (10,7%) | R$ 5,88 |
| NIDflow R$ 29,90 por mês (cada cobrança) | R$ 2,49 (Pix automático) | R$ 3,98 | R$ 4,58 | R$ 5,18 | R$ 1,20 por mês por assinante |
| Plataforma NID R$ 980 por ano | R$ 2,49 (0,3%) | R$ 51,39 (5,2%) | R$ 70,99 (7,2%) | R$ 90,59 (9,2%) | R$ 39,20 |

Se a taxa real da Cakto for a citada por fontes secundárias (8,5% + R$ 0,50): playbook R$ 3,04; pedido com bump R$ 11,29; Plataforma R$ 83,80. Mesmo nesse caso a Cakto custa menos que a Kiwify no playbook e na assinatura mensal, que são as duas cobranças de maior volume.

Por 1.000 compradores do playbook no cenário base do parecer (15% de bump, 6% de NIDflow com vida média de 12,5 meses, 3% de Plataforma): a diferença anual entre Kiwify e Cakto cartão fica em torno de R$ 3.900 (playbook e bump R$ 1.800; NIDflow R$ 900; Plataforma R$ 1.200). Na Cakto com Pix a diferença é maior, porque o Pix não paga percentual.

### 4.4 Recomendação e o que confirmar em conta de teste

**Recomendação: Cakto, condicionada às confirmações abaixo em conta de teste na primeira semana do Sprint 4. Kiwify fica como reserva pronta**: a estrutura de webhooks e o orquestrador tratam as duas (seção 4.2), então trocar custa uma semana de configuração, não uma reescrita.

Checklist de validação (quem executa: `automacao` com o coordenador; prazo: 5 dias úteis; resultado gravado em `automacoes/validacao-checkout.md`):

1. Taxa oficial por meio de pagamento na página de taxas, com data e captura de tela; resolver a divergência (4,99% + R$ 2,49 contra 8,5% + R$ 0,50).
2. Produto de teste com order bump do mini curso a R$ 97 e upsell de um clique a R$ 97 na página seguinte (o upsell só é configurado após a aprovação do Henrique; o teste confirma que existe).
3. Assinatura mensal de R$ 29,90 com Pix automático e cartão; régua de retentativa; cancelamento pela área do comprador; o que a plataforma faz ao esgotar as tentativas (emite `subscription_canceled` ou não).
4. Assinatura anual de R$ 980 com parcelamento em 12 vezes e quem absorve o custo do parcelamento (decisão do Sprint 6, mas o teste diz se é possível).
5. Os treze eventos da seção 4.2 recebidos em endpoint de teste, com o payload real gravado (sem dados pessoais reais) para escrever o mapeamento definitivo; conferir campos de UTM, id do pedido, produtos, e-mail e telefone.
6. Mecanismo de autenticação do webhook e política de retentativa.
7. Redirecionamento pós-compra para a página de obrigado da NID com o id do pedido (ou o e-mail) na URL; se não for possível, a página usa o campo único de e-mail (`02`, seção 2, passo 3).
8. Campo personalizado com opções fixas no checkout (alternativa C1b do `04`).
9. Integração nativa com o pixel da Meta (eventos `InitiateCheckout` e `Purchase` pelo navegador) e como deduplicar com a CAPI do orquestrador.
10. Integração com o emissor de nota fiscal escolhido pelo Henrique com o contador.
11. Área de membros: hospedagem do PDF, dos templates e das aulas; evento de primeiro acesso e de aula concluída disponíveis por webhook ou API (condição de W2, W3 e B4 no `02`).
12. Termos da plataforma sobre consentimento de comunicação do comprador (base para R1 a R3 e para os modelos de marketing no WhatsApp).

Se três ou mais itens críticos (1, 2, 3, 5, 7) falharem na Cakto, a Kiwify passa pelo mesmo checklist na semana seguinte. Só depois disso o coordenador leva a decisão 5 ao Henrique.

---

## 5. Orquestrador: módulos, endpoints e regras

### 5.1 Módulos

| Módulo | O que faz | Referência |
|---|---|---|
| `webhooks` | Recebe e valida webhooks da plataforma de checkout, do NIDflow, da Meta (WhatsApp e Instagram), do Resend, do Brevo e do ClickUp; grava em `webhooks_recebidos`; enfileira o processamento | Seção 4.2; `03` seção 3 |
| `base` | Contatos, etiquetas, respostas de qualificação, compras, espelho de assinaturas, eventos; regras de pontuação dos gatilhos | Seção 6; `04` seções 3 a 5 |
| `agente` | Chamada ao modelo com saída estruturada, blocos de sistema com cache, verificações determinísticas, estados da conversa, ações | `01` seções 4, 7, 8, 9 e 10 |
| `sequencias` | Filas BullMQ `F2-email`, `F2-whatsapp`, `F2-direct`, `F2-tarefas`, `F2-capi`; agendamento por contato com condições, janelas de horário, limites diários e conflito de sequências | `02` seção 7; `03` seção 4 |
| `envio` | Resend (e-mail), WhatsApp Cloud API (modelos e mensagens de sessão), Instagram (resposta privada e mensagem) | Seção 2 |
| `tarefas` | Cria e atualiza tarefas no ClickUp; recebe mudanças de status por webhook | `01` seção 7.1; `04` seções 4.2 e 5.2 |
| `capi` | Envia `Purchase` e eventos personalizados à Meta com deduplicação | Seção 8 |
| `conciliacao` | Consulta a API da plataforma a cada 15 minutos; compara com a base; processa o que faltou | Seção 1, princípio 6 |
| `relatorios` | Consultas salvas e exportação diária | Seção 2, F13 |

### 5.2 Endpoints de entrada (todos por HTTPS, com autenticação própria de cada origem)

| Endpoint | Origem | Autenticação | Conteúdo |
|---|---|---|---|
| `POST /webhooks/checkout` | Plataforma de checkout | Chave do webhook | Eventos da seção 4.2 |
| `POST /webhooks/nidflow` | Função `webhook-checkout` e telemetria do NIDflow | Chave compartilhada (variável de ambiente nos dois lados) | `conta_criada`, `assinatura_status`, marcos M1 a M5, `perfil_respondido`, `pdf_exportado` |
| `POST /webhooks/meta/whatsapp` e `GET` de verificação | Meta | Token de verificação e assinatura `X-Hub-Signature-256` | Mensagens recebidas, status de entrega, opt-out pelo botão do modelo |
| `POST /webhooks/meta/instagram` e `GET` de verificação | Meta | Idem | Comentários com palavra-chave, mensagens do direct |
| `POST /webhooks/resend` | Resend | Assinatura do Resend | Entregue, devolvido (bounce), reclamação (aplica opt-out), aberto e clicado (só para relatório; nunca dispara mensagem) |
| `POST /webhooks/brevo` | Brevo | Chave | Descadastro (aplica `F2-optout-email`) |
| `POST /webhooks/clickup` | ClickUp | Chave | Mudança de status das tarefas F2 |
| `GET /q/{token}` | Links de um clique nos e-mails (P1, P2, P4, P5) | Token único por contato e pergunta, validade de 30 dias, uso único por pergunta | Grava a resposta e redireciona para a página de confirmação (com P2 quando for o caso) |
| `POST /formularios/{nome}` | Páginas da NID (obrigado, avaliação de projeto, banco de talentos) | Token de origem e proteção contra automação | Respostas e arquivos (arquivo vai para armazenamento privado, nunca para a base) |
| `GET /descadastro/{token}` | Rodapé dos e-mails | Token único | Aplica `F2-optout-email` e confirma em página simples |

### 5.3 Regras que valem para todos os módulos

1. Chaves e senhas só em variáveis de ambiente; nada no repositório, nada em log.
2. Logs sem dado pessoal em claro (e-mail e telefone mascarados), no mesmo padrão do radar-corretoras.
3. Toda mensagem enviada grava: contato, código da mensagem, canal, modelo (WhatsApp), versão do texto, data e hora, resultado da entrega.
4. Conversas com o agente guardadas por 90 dias e apagadas por rotina diária; a base (etiquetas, respostas, eventos) permanece.
5. Limites diários de envio por canal e por contato (`02` seção 7; `03` seção 4) aplicados na fila, não no texto.
6. Ambiente de teste com plataforma em modo de teste, número de WhatsApp de teste e conta de Instagram de teste. Nada vai para produção sem o checklist de aceite de cada arquivo (`01` a `04`).
7. Backup diário do Postgres; restauração testada uma vez por trimestre.

---

## 6. Modelo de dados da base F2

| Tabela | Campos principais | Observação |
|---|---|---|
| `contatos` | `id`, `email` (único), `telefone` (único quando informado), `nome`, `origem_primeira` (código e UTMs do primeiro contato), `criado_em`, `atualizado_em`, `optout_email_em`, `optout_whatsapp_em`, `gatilho_a_status`, `gatilho_b_status` | Chave primária de unificação: e-mail; telefone é chave secundária (`02`, seção 2, passo 2) |
| `etiquetas_contato` | `contato_id`, `etiqueta` (da lista da seção 7), `aplicada_em`, `aplicada_por` (`orquestrador`, `humano:{nome}`), `removida_em` | Nunca se apaga a linha; remoção é data |
| `qualificacao_respostas` | `contato_id`, `campo`, `valor`, `fonte` (C1 a C10 do `04`), `respondido_em` | Histórico completo; a visão "valor atual" é a resposta mais recente por campo |
| `compras` | `contato_id`, `id_externo` (pedido na plataforma), `produto` (`playbook`, `minicurso`, `nidflow`, `plataforma`), `valor`, `meio_pagamento`, `bump` (sim/não), `upsell` (sim/não), `utms`, `aprovada_em`, `reembolsada_em` | Sem dado de cartão, sem CPF |
| `assinaturas_espelho` | `contato_id`, `id_externo`, `produto`, `status` (mesma lista do NIDflow), `periodo_fim`, `atualizada_em` | Espelho; a fonte é o NIDflow (`03`, seção 3) |
| `eventos` | `contato_id`, `nome` (da lista da seção 8), `metadados` (JSON só com ids, enums e números), `origem`, `ocorrido_em` | Nenhum texto livre |
| `conversas` e `mensagens` | `contato_id`, `canal`, `origem`, `estado`, `janela_fecha_em`, `humano` (sim/não); mensagens com `direcao`, `texto`, `intencao`, `confianca`, `versao_prompt`, `tokens_entrada`, `tokens_cache`, `tokens_saida`, `reprovada_em_verificacao` | Apagadas em 90 dias (`01`, seção 7.3) |
| `envios` | `contato_id`, `codigo` (E0, W0, N7, CA3...), `canal`, `modelo_whatsapp` (quando houver), `versao_texto`, `agendado_para`, `enviado_em`, `status_entrega` | Base das métricas de sequência |
| `tarefas_espelho` | `contato_id`, `tipo` (`gatilho_a`, `gatilho_b`, `atendimento`, `financeiro`, `suporte`), `id_clickup`, `status`, `prazo`, `criada_em`, `encerrada_em` | Alertas de prazo saem daqui |
| `webhooks_recebidos` | `origem`, `id_externo`, `tipo`, `recebido_em`, `processado_em`, `hash_payload` | Idempotência |
| `links_um_clique` | `token`, `contato_id`, `pergunta`, `valor`, `expira_em`, `usado_em` | P1, P2, P4, P5 nos e-mails |

Sincronização com o Brevo (só a partir do Sprint 5): e-mail, nome, etiquetas como atributos, opt-out. Nada mais.

---

## 7. Mapa de etiquetas

Etiquetas são fatos. Status de fluxo ficam em campos (`gatilho_a_status`, `gatilho_b_status`, `assinaturas_espelho.status`). Nomes com prefixo `F2-`, minúsculas, hífen.

| Etiqueta | Significado | Quem aplica | Quando | Removida |
|---|---|---|---|---|
| `F2-lead-direct` | Conversou com o agente no direct sem comprar | Orquestrador | Primeira mensagem no direct | Ao comprar (vira histórico com data de remoção) |
| `F2-lead-whatsapp` | Conversou com o agente no WhatsApp sem comprar | Orquestrador | Primeira mensagem no WhatsApp | Idem |
| `F2-checkout-abandonado` | Terminou R1 a R3 sem comprar | Orquestrador | Após R3 | Ao comprar |
| `F2-comprador-playbook` | Compra aprovada do playbook | Orquestrador | `purchase_approved` | Nunca (reembolso ganha `F2-reembolso`, sem remover) |
| `F2-bump` | Aceitou o mini curso a R$ 97 no checkout | Orquestrador | `purchase_approved` com dois itens | Nunca |
| `F2-upsell` | [CONDICIONAL: aguarda aprovação do Henrique] Aceitou o mini curso a R$ 97 na página seguinte ao pagamento | Orquestrador | `purchase_approved` do upsell | Nunca |
| `F2-minicurso` | Tem o mini curso por qualquer via (bump, upsell ou avulso) | Orquestrador | Qualquer compra do mini curso | Nunca |
| `F2-minicurso-concluido` | Concluiu as aulas | Orquestrador | Evento de conclusão (B4) | Nunca |
| `F2-nidflow-ativo` | Assinatura do NIDflow ativa | Orquestrador | `subscription_created` ou reativação | Ao cancelar, ficar em leitura ou ser reembolsada |
| `F2-nidflow-recusada` | Renovação recusada, acesso mantido | Orquestrador | `subscription_renewal_refused` | Ao renovar ou entrar em leitura |
| `F2-nidflow-leitura` | Conta em modo leitura | Orquestrador | Retentativas esgotadas, fim do período cancelado ou fim da anuidade da Plataforma | Ao reativar ou excluir |
| `F2-nidflow-cancelado` | Assinante cancelou ou foi reembolsado | Orquestrador | `subscription_canceled` ou `refund` | Ao reativar |
| `F2-nidflow-oferta-encerrada` | Recebeu a sequência D+7 a D+14 e não assinou | Orquestrador | Após N14 ou N14e | Ao assinar |
| `F2-plataforma-ativo` | Anuidade da Plataforma NID ativa (Sprint 6) | Orquestrador | Compra da Plataforma | Ao fim da anuidade sem renovação |
| `F2-interesse-plataforma` | Perguntou sobre a Plataforma NID antes do lançamento | Orquestrador (ação do agente) | Intenção registrada | Ao comprar a Plataforma |
| `F2-gatilho-A` | Decisor identificado por critério do brief | Orquestrador | 100 pontos ou mais (`04`, 4.1) | Nunca |
| `F2-gatilho-A-pendente` | Sinal parcial de decisor | Orquestrador | 30 a 99 pontos | Ao virar `F2-gatilho-A` ou ao registrar "não decide" |
| `F2-funil1-cliente` | Contrato do Funil 1 originado no Funil 2 | Humano | Contrato assinado | Ao fim do contrato |
| `F2-gatilho-B-candidato` | 3 dos 4 critérios do Gatilho B | Orquestrador | Recálculo | Ao virar `F2-gatilho-B` |
| `F2-gatilho-B` | 4 de 4 critérios do Gatilho B | Orquestrador | Recálculo | Nunca |
| `F2-banco-talentos` | Aceitou entrar no banco de talentos (consentimento) | Orquestrador (formulário) | Envio do formulário | A pedido ou após 24 meses |
| `F2-reembolso` | Reembolso ou chargeback de qualquer produto | Orquestrador | `refund` ou `chargeback` | Nunca |
| `F2-optout-email` | Pediu para não receber e-mails | Orquestrador | Descadastro, reclamação de spam ou pedido ao agente | A pedido explícito da pessoa, registrado por humano |
| `F2-optout-whatsapp` | Pediu para não receber WhatsApp | Orquestrador | Palavra de saída, botão do modelo ou pedido ao agente | Idem |
| `F2-humano` | Conversa ou tarefa humana aberta; WhatsApp automático pausado | Orquestrador | Estado S8 ou tarefa aberta | Ao encerrar a tarefa ou a conversa |

O agente de IA só pode sugerir etiquetas desta lista (`01`, seção 9); sugestão fora da lista é ignorada e registrada.

---

## 8. Eventos e UTMs (alinhados com o `trafego`)

### 8.1 Eventos canônicos da base (nome, origem, disparo)

| Grupo | Eventos |
|---|---|
| Aquisição | `F2_comentario_kw` (com a palavra-chave e o id do post), `F2_direct_iniciado`, `F2_whatsapp_iniciado` (com o código de origem PB01, AD01, PG01, NF01), `F2_link_checkout_enviado`, `F2_qualificacao_respondida` (com fonte) |
| Compra | `F2_compra_playbook`, `F2_bump_aceito`, `F2_upsell_aceito` (condicional), `F2_compra_minicurso`, `F2_checkout_abandonado`, `F2_pix_pendente`, `F2_pagamento_recusado`, `F2_reembolso`, `F2_chargeback` |
| Entrega e ativação | `F2_entrega_enviada`, `F2_primeiro_acesso_membros`, `F2_aula_assistida` (com número), `F2_minicurso_concluido`, `F2_propostas_30d_respondido` |
| NIDflow | `F2_nidflow_oferta_enviada` (com toque), `F2_nidflow_clique_oferta`, `F2_nidflow_assinatura`, `F2_nidflow_conta_criada`, `F2_nidflow_m1` a `F2_nidflow_m5`, `F2_nidflow_perfil_respondido`, `F2_nidflow_apresentacao_respondido`, `F2_nidflow_renovada`, `F2_nidflow_recusada`, `F2_nidflow_leitura`, `F2_nidflow_cancelada`, `F2_nidflow_reembolso`, `F2_nidflow_reativada`, `F2_nidflow_oferta_encerrada` |
| Gatilhos | `F2_gatilho_a_aplicado` (com a regra), `F2_gatilho_a_tarefa_criada`, `F2_gatilho_a_convidado`, `F2_gatilho_a_agendado`, `F2_gatilho_a_resultado` (com o resultado), `F2_gatilho_b_candidato`, `F2_gatilho_b_aplicado`, `F2_projeto_avaliado`, `F2_banco_talentos_optin`, `F2_resposta_email_entrega` |
| Agente e envios | `F2_agente_resposta` (com intenção, estado, confiança, tokens), `F2_agente_encaminhado_humano` (com motivo), `F2_agente_reprovado_verificacao`, `F2_envio` (com código e canal), `F2_optout_email`, `F2_optout_whatsapp` |

### 8.2 Eventos enviados à Meta (CAPI, dataset F2)

| Evento Meta | Quando | `event_id` | Parâmetros | Deduplicação |
|---|---|---|---|---|
| `Purchase` | `purchase_approved` do playbook (com ou sem bump) | id do pedido | `value` (total do pedido), `currency = BRL`, `content_ids` (`F2-playbook`, `F2-minicurso`), `content_type = product` | O pixel da plataforma envia o mesmo `Purchase` pelo navegador com o mesmo `event_id`, se a integração nativa permitir configurar o id; se não permitir, a CAPI é a única fonte de `Purchase` e o pixel do checkout fica desligado para esse evento |
| `Purchase` | Assinatura do NIDflow e compra da Plataforma NID | id da assinatura ou do pedido | `value`, `currency`, `content_ids` (`F2-nidflow`, `F2-plataforma`) | Idem |
| `InitiateCheckout` | Clique no CTA da página do playbook (pixel no navegador) | Gerado na página | `content_ids` | Só navegador |
| `F2_Bump` (personalizado) | Bump aceito | id do pedido + `bump` | `value = 97` | Só CAPI |
| `F2_GatilhoA` (personalizado) | Etiqueta `F2-gatilho-A` aplicada | id do contato + data | Nenhum valor | Só CAPI; serve para público personalizado de decisores (uso definido pelo `trafego`) |

Dados de correspondência enviados à Meta: e-mail e telefone com hash, `fbp` e `fbc` capturados na página do playbook e repassados ao checkout (se a plataforma aceitar parâmetros) e ao orquestrador pelo webhook.

### 8.3 Convenção de UTMs `F2`

| Parâmetro | Valores | Regra |
|---|---|---|
| `utm_source` | `instagram`, `facebook`, `whatsapp`, `email`, `youtube`, `linkedin`, `nidflow`, `playbook` | Canal de origem, minúsculas |
| `utm_medium` | `paid` (anúncio), `direct` (agente no direct), `agente` (agente no WhatsApp), `bio`, `post`, `story`, `sequencia` (e-mail ou WhatsApp automático), `cta-produto` (link dentro do playbook, das aulas ou do NIDflow) | Mecanismo, não canal |
| `utm_campaign` | `F2-playbook`, `F2-minicurso`, `F2-nidflow-d7`, `F2-nidflow-cta`, `F2-plataforma-lancamento-AAAAMM` | Sempre com prefixo `F2-` |
| `utm_content` | Anúncio: id do criativo conforme a nomenclatura do `trafego`. Orgânico: id do post. Sequência: código do toque (`e3`, `w4`, `d7`, `d10`, `d14`, `n16`). Produto: slug do template (`canvas-de-dor`, ...) | Identifica a peça |
| `utm_term` | Palavra-chave do direct (`F2-kw-projeto`, `F2-kw-desenho`, `F2-kw-proposta`, `F2-kw-template`) ou vazio | Só no fluxo comentário → direct |

Nomenclatura de campanha, conjunto e criativo no Meta Ads é do `trafego` (Sprint 5) e precisa carregar o prefixo `F2`. O orquestrador lê as UTMs do webhook de compra (se a plataforma entregar) ou da URL da página de obrigado; grava em `compras.utms` e em `contatos.origem_primeira`. Relatório de CPA por criativo cruza `compras.utms` com o gasto do `trafego`.

---

## 9. Integração com o NIDflow (decisão 4 do coordenador; item B-01 do backlog)

| Elo | Direção | Mecanismo | O que passa |
|---|---|---|---|
| Plataforma de checkout → NIDflow | Webhook de assinatura para a função de borda `webhook-checkout` (Supabase), com chave própria | Todos os eventos de assinatura da seção 4.2 | Cria ou reativa a conta, muda `assinaturas.status`, dispara o e-mail de acesso A1 |
| NIDflow → orquestrador | `POST /webhooks/nidflow` com chave compartilhada | `conta_criada`, `assinatura_status`, M1 a M5, `perfil_respondido`, `pdf_exportado`, `template_escolhido` | Etiquetas, mensagens de ativação e resgate (`02-onboarding.md`, seção 5), gatilhos A e B |
| Orquestrador → NIDflow | Chamada à função `reenviar-acesso` (limite de 3 por hora por e-mail) | E-mail confirmado do assinante | Reenvio do link mágico pelo agente de IA ou pelo suporte |
| NIDflow → orquestrador (rotina diária) | Evento `assinatura_status` com `leitura` e datas | `leitura_ate`, `exclusao_em` | R7b, R8, R9 |
| Página da oferta → NIDflow | Parâmetro `?template=<slug>` guardado no navegador | Slug do template | Onboarding abre no template certo (`02-onboarding.md`, seção 1.1) |

Regras: o NIDflow nunca chama a plataforma de checkout; o orquestrador nunca escreve na tabela `assinaturas` do NIDflow; cada lado valida a chave do outro; o orquestrador espelha, não decide, o status da assinatura.

---

## 10. Segurança, LGPD e retenção

| Item | Regra |
|---|---|
| Chaves e senhas | Variáveis de ambiente no provedor de hospedagem; rotação a cada 6 meses ou ao sair alguém do time; nunca em repositório, planilha, ClickUp ou mensagem |
| Acesso à base | Só o orquestrador escreve; leitura humana pelo painel (Looker Studio) e pela exportação; acesso direto ao banco restrito a quem opera, com registro |
| Dados pessoais | Nome, e-mail, telefone, respostas de qualificação, compras, eventos e etiquetas. Base legal: execução de contrato (compradores), legítimo interesse (leads e qualificação), consentimento (banco de talentos). Finalidade declarada nos pontos de coleta |
| Retenção | Conversas: 90 dias. Leads sem compra e sem interação: 12 meses, depois anonimização. Compradores: enquanto houver relação, mais 5 anos para obrigações fiscais (só os dados da compra). Banco de talentos: 24 meses |
| Direitos do titular | Pedido de acesso, correção ou exclusão atendido em até 15 dias, em todos os sistemas (orquestrador, ClickUp, Brevo, Resend, NIDflow, planilha) |
| Terceiros que tratam dados | Plataforma de checkout, emissor de nota fiscal, Meta, Resend, Brevo, ClickUp, Supabase, Anthropic (conteúdo das conversas para gerar respostas; sem dados além do necessário; a NID informa no aviso de privacidade). Nenhum dado de pagamento passa pela NID |
| Anthropic | Contexto do agente leva só o necessário (`01`, seção 8, bloco 3); nunca CPF, cartão ou senha. Chave da API só no orquestrador |
| Opt-out | Efeito imediato em todos os canais afetados; confirmação em uma linha; registro com data |
| Incidentes | Vazamento ou acesso indevido: comunicação ao coordenador em até 24 horas; avaliação de comunicação à ANPD e aos titulares conforme a lei |

---

## 11. Ordem de implantação (Sprint 4, pré-requisito para o Sprint 5)

| Semana | Entrega | Depende de |
|---|---|---|
| 1 | Validação da Cakto em conta de teste (seção 4.4); pedido de verificação da empresa e de revisão do app no Meta for Developers; domínio de e-mail configurado no Resend; espaço F2 no ClickUp | Coordenador com acesso às contas da NID |
| 2 | Orquestrador em ambiente de teste: receptor de webhooks, base, entrega D0 (E0, W0), página de obrigado com P1 e P2, tarefa do Gatilho A | Decisão 5 aprovada pelo Henrique; textos do `copy` para E0, W0 e página de obrigado |
| 3 | Agente de IA nos dois canais em teste (prompt, base de conhecimento, verificações, testes adversariais); sequências D+1 a D+6; recuperação de checkout | Aprovação do app da Meta (ou ManyChat como ponte); textos do `copy` |
| 4 | Oferta do NIDflow em D+7 (desligada por flag até o backlog do NIDflow ser entregue); Gatilho B; CAPI; painel | B-00 a B-09 do NIDflow; textos do `copy` |
| Antes de ligar a mídia | Checklist de aceite dos arquivos `01` a `04` concluído; mini curso gravado (parecer, risco 5) | Henrique |

---

## 12. Checklist de aceite deste mapa

- [ ] `automacoes/validacao-checkout.md` publicado com os 12 itens da seção 4.4 respondidos, taxa oficial com data e captura, payloads de teste dos treze eventos gravados sem dados pessoais reais.
- [ ] Decisão 5 do brief levada ao Henrique com a recomendação e o resultado da validação.
- [ ] Webhook da plataforma chega ao orquestrador e ao NIDflow, cada um validando a própria chave; evento duplicado não produz efeito.
- [ ] Conciliação de 15 minutos encontra e processa um pedido de teste criado com o webhook desligado.
- [ ] Verificação da Meta aprovada; número de WhatsApp e conta de Instagram conectados; modelo de utilidade e modelo de marketing aprovados para W0, W4, N7w, N14, R2, P1, N2, A1w, R1 e R6.
- [ ] Domínio de e-mail da NID com SPF, DKIM e DMARC verificados no Resend; teste de entrega nas três caixas mais usadas pelo ICP.
- [ ] Tarefas do ClickUp criadas por API para os cinco tipos; mudança de status volta por webhook em menos de 1 minuto.
- [ ] `Purchase` de teste chega ao dataset F2 da Meta por CAPI com deduplicação confirmada no gerenciador de eventos.
- [ ] Nenhuma chave, senha ou dado pessoal no repositório (varredura automática no deploy, mesma regra do B-02 do NIDflow).
- [ ] Aviso de privacidade do Funil 2 revisado pelo coordenador com a skill `nid-contratos` e publicado nas páginas da NID.

---

## 13. Fontes consultadas (11/09/2026, por resumo de busca; páginas oficiais bloqueadas pelo proxy)

- Cakto: `docs.cakto.com.br/api-reference/webhooks/update` (lista de eventos); `docs.cakto.com.br/comece-aqui/criar-checkout`; `ajuda.cakto.com.br/pt-br/articles/72-quais-sao-as-taxas-da-plataforma-cakto`; `ajuda.cakto.com.br/pt/article/como-funciona-a-recorrencia-na-cakto-djvimw/`; `ajuda.cakto.com.br/pt-br/articles/108-como-cancelar-uma-assinatura-na-cakto`; `ajuda.cakto.com.br/pt/article/como-usar-url-para-checkout-pre-preenchido-j3kwax/`; `ajuda.cakto.com.br/pt/article/como-realizar-a-personalizacao-do-checkout-2wtajf/`; `blog.cakto.com.br/como-criar-um-produto-e-configurar-na-cakto/`.
- Kiwify: `docs.kiwify.com.br/api-reference/webhooks/create`; `docs.kiwify.com.br/api-reference/webhooks/single`; `ajuda.kiwify.com.br/pt-br/article/quais-sao-as-taxas-da-plataforma-1ems3wq/`; `ajuda.kiwify.com.br/pt-br/article/como-configurar-upsell-de-1-clique-12ei26e/`; `ajuda.kiwify.com.br/pt-br/article/como-funcionam-os-order-bumps-1bb22bl/`; `ajuda.kiwify.com.br/pt-br/article/o-que-e-e-como-funcionam-as-paginas-de-obrigado-dsy5hb/`; `ajuda.kiwify.com.br/pt-br/article/como-integrar-com-o-notazz-lr7cff/`; EngagED, "Taxa da Kiwify: quanto custa vender de verdade" (2026).
- Nota fiscal: `notazz.com`; `lp.spedy.com.br/integracoes/cakto`; `digisan.com.br/blog/como-emitir-nota-fiscal-na-cakto`.
- Meta: SocialHub, "Preço WhatsApp Business API Brasil 2026"; Nimochat, "Preço da API Oficial do WhatsApp 2026"; Fortics, "WhatsApp Business API: o que muda nos preços em outubro de 2026"; Conferbot, "Instagram Messaging API Limits 2026"; KeyAPI, "Instagram Messaging API 24-Hour Window Policy (2026)".
- Ferramentas: ManyChat pricing 2026 (Featurebase, Dealism); Resend pricing 2026 (Automation Atlas, Flexprice, Nuntly); Brevo pricing 2026 (Omnisend, EmailToolTester); ClickUp pricing 2026 (eesel, TaskUp); Supabase pricing 2026 (No Code MBA, Flexprice); Railway pricing 2026 (Makerkit, DEV Community); Cloudflare Pages pricing (developers.cloudflare.com, resumo).
- Anthropic: skill `claude-api` (tabela de modelos e preços atualizada em 24/06/2026; saída estruturada por `output_config.format`; cache de prompt).
