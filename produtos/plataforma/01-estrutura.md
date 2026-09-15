# Plataforma NID · Estrutura do ambiente

| Campo | Valor |
|---|---|
| Produto | Plataforma NID (degrau 4 da esteira do Funil 2) |
| Preço | R$ 980 por ano |
| Versão | 1.0 (Sprint 6) |
| Autor | Agente `plataforma` |
| Status | Entregue ao coordenador, aguardando parecer do `estrategia` e aprovação do Henrique nos pontos marcados |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 5, 6.5, 7, 8, 10 e 12); `docs/01-parecer-estrategico.md` (seções 2.6, 3.3, 4 linha 6.5, 5 decisão 3, 6 itens 5 e 11); `produtos/nidflow/01-plano-de-assinatura.md` (seção 8); `automacoes/05-integracoes.md` (seções 4 e 7) |
| Decisões do coordenador aplicadas | 1) catálogo base incluso, avançados bloqueados vendidos dentro, NIDflow incluso; 2) primeira abertura só com 1.500 compradores; 3) parcelamento definido aqui; 4) escassez só verdadeira; 5) Henrique conduz como sócio da NID, a comunidade é da NID; 6) números de conversão e retenção são hipóteses |

Como ler este arquivo: ele define o que existe dentro da Plataforma NID, como o assinante navega, quem vê o quê, o que acontece no primeiro dia e em que tecnologia o ambiente roda. O catálogo está em `02-catalogo.md`, a comunidade e os encontros em `03-comunidade-e-encontros.md`, o lançamento em `04-lancamento-interno.md` e a renovação em `05-retencao-e-renovacao.md`.

---

## 1. O lugar da Plataforma na esteira

A Plataforma NID é o ambiente onde o método continua. O playbook ensina a desenhar o projeto; o mini curso ensina a apresentar e vender o projeto desenhado; o NIDflow é a ferramenta em que isso acontece na tela. Depois disso, quem aplica o método sozinho encontra o mesmo problema toda semana: cada projeto novo traz uma situação que o playbook não cobriu, e não há com quem discutir.

No arco do método:

| Etapa | A Plataforma NID |
|---|---|
| Dor | Quem aplica o método sozinho estagna. Cada projeto novo traz uma situação nova (cliente sem número, tese recusada, projeto em fases, comitê, renovação) e não há com quem discutir. A proposta de hoje sai igual à de três meses atrás |
| Solução | Um ambiente de prática contínua do método, com a NID: o que falta não é mais teoria, é repetição com revisão |
| Arquitetura | Trilha base de minicursos inclusos (um por situação recorrente da venda), minicursos avançados bloqueados vendidos dentro, comunidade com regras e moderação da NID, agenda de encontros conduzidos pela NID, biblioteca de templates e projetos desenhados, NIDflow incluso |
| Valor | R$ 980 por ano. Menos do que um único projeto perdido por proposta mal desenhada; mais do que o NIDflow (R$ 358,80 por ano) somado aos minicursos que a assinatura inclui |

Regras de linguagem que valem para todas as peças: é "a Plataforma NID" ou "o ambiente da NID". Nunca "curso", "escola", "mentoria", "comunidade do Henrique". A comunidade é da NID. Henrique conduz encontros como sócio da NID.

---

## 2. Áreas do ambiente

Sete áreas, nesta ordem no menu. Cada uma tem um único objetivo.

| # | Área | O que tem | Objetivo | Quem vê |
|---|---|---|---|---|
| 1 | **Início** | Boas-vindas, "comece por aqui" (3 passos), próximo encontro, últimos posts da comunidade, minicurso em andamento | Levar o assinante ao próximo passo em um clique | Assinante ativo |
| 2 | **Trilhas** | Trilha base "O método na prática" (minicursos inclusos) e trilha "Avançados" (minicursos bloqueados, com vitrine e compra dentro do ambiente) | Praticar o método por situação de venda | Assinante ativo (bloqueados: só quem comprou) |
| 3 | **Comunidade** | Espaços: Projetos na mesa, Propostas apresentadas, Dúvidas do método, Encontros, Avisos da NID | Discutir projetos reais com quem aplica o método | Assinante ativo |
| 4 | **Agenda** | Calendário dos encontros (Mesa de Projetos, Encontro de Método, Caso NID, Abertura de turma), inscrição, link ao vivo, gravações | Colocar o assinante na frente da NID com regularidade | Assinante ativo |
| 5 | **Biblioteca** | Os cinco templates do método (PDF e texto), modelo de proposta em nove páginas, roteiro de apresentação, checklist de reunião, banco de objeções, régua de follow-up, projetos desenhados por segmento (revisados na Mesa de Projetos, com autorização) | Ter tudo o que se preenche em um lugar só | Assinante ativo |
| 6 | **NIDflow** | Acesso à ferramenta (mesmo login), atalho para o onboarding, perguntas frequentes | Desenhar e apresentar na mesma tela, sem sair do ambiente | Assinante ativo (conta com `origem = plataforma_nid`) |
| 7 | **Minha conta** | Dados, data de renovação, forma de pagamento, minicursos avançados comprados, certificado de conclusão por minicurso, cancelamento da renovação, canal de suporte | Nenhuma dúvida administrativa vira ticket | Assinante ativo ou em modo leitura |

### 2.1 Início

O que está na tela, de cima para baixo:

1. Faixa "Comece por aqui" com três passos e barra de progresso (some quando os três estão feitos): ativar o NIDflow, postar o projeto atual em "Projetos na mesa", assistir à primeira aula do minicurso 1.
2. Card do próximo encontro com data, hora, tipo, quem conduz e botão "Reservar meu lugar".
3. "Continuar de onde parei": o minicurso e a aula em andamento.
4. Últimos cinco posts da comunidade (com prioridade para "Projetos na mesa").
5. Aviso da NID mais recente (novo minicurso, gravação publicada, janela de renovação).

### 2.2 Trilhas

Duas trilhas, sem mistura:

- **O método na prática** (inclusos): sete minicursos, na ordem do catálogo (`02-catalogo.md`, seção 2). Sem liberação gradual: tudo aberto desde o primeiro dia. O que existe é a ordem sugerida, não bloqueio por tempo. Motivo: o assinante compra o ano inteiro e a retenção vem do uso, não da retenção artificial de conteúdo.
- **Avançados** (bloqueados): minicursos com vitrine própria dentro do ambiente: nome, promessa, grade, preço, botão "Quero este minicurso por R$ [preço]" que abre o checkout já identificado. Quem comprou vê o minicurso liberado no mesmo lugar. Quem não comprou vê a vitrine e a primeira aula aberta como amostra.

Cada minicurso tem: aulas em vídeo (10 a 15 minutos), materiais em PDF e texto, o entregável da aula, e ao fim um botão "Levar para a Mesa de Projetos" que cria um post pré-preenchido no espaço certo da comunidade.

### 2.3 Comunidade

Regras, espaços, moderação e participação da NID estão em `03-comunidade-e-encontros.md`. O que a estrutura fixa: a comunidade fica dentro do mesmo ambiente (mesmo login), não em grupo de WhatsApp ou Telegram. Motivos: histórico pesquisável, moderação com ferramentas, posts ligados a minicursos e encontros, e o próprio ambiente registra participação (critério B4 do Gatilho B, `automacoes/04-segmentacao-gatilhos.md`, seção 5.4).

### 2.4 Agenda

Calendário mensal com os quatro tipos de encontro. Cada encontro tem página própria: pauta, quem conduz, pré-requisito (por exemplo, "traga um projeto desenhado"), botão de reserva, link ao vivo liberado uma hora antes, gravação publicada em até 2 dias úteis. Calendário completo em `03-comunidade-e-encontros.md`, seção 6.

### 2.5 Biblioteca

Tudo o que o assinante preenche ou consulta, em um lugar. Origem de cada item:

| Item | Origem | Formato |
|---|---|---|
| Canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor, roteiro de proposta | `produtos/playbook/02-templates-fluxo.md` e `templates/` | PDF A4 e texto |
| Modelo de proposta em nove páginas | `produtos/mini-curso/materiais/03-modelo-de-proposta` | PDF, HTML e texto |
| Roteiro de apresentação, checklist de reunião, banco de objeções, régua de follow-up | `produtos/mini-curso/materiais/` | Texto |
| Materiais dos minicursos inclusos e avançados | `02-catalogo.md` | PDF e texto |
| Projetos desenhados por segmento | Mesa de Projetos, com autorização por escrito do assinante e sem dado identificável do cliente dele | PDF exportado do NIDflow |
| Gravações dos encontros | Agenda | Vídeo, com índice por assunto |

Regra da biblioteca: o assinante da Plataforma tem os materiais do playbook e do mini curso mesmo que não tenha comprado os dois. O playbook e o mini curso continuam sendo produtos vendidos fora; dentro do ambiente, os materiais deles são parte da biblioteca. As aulas do mini curso ficam inclusas no ambiente (ver seção 4).

### 2.6 NIDflow

O NIDflow está incluso na anuidade (decisão 3 do brief, aprovada no parecer; regra operacional na seção 8 do `produtos/nidflow/01-plano-de-assinatura.md`). Na Plataforma, a área "NIDflow" é um atalho com o mesmo login, o onboarding da ferramenta (`produtos/nidflow/02-onboarding.md`) e as perguntas frequentes. A ferramenta continua sendo o NIDflow, hospedado onde o backlog do `nidflow` define (item B-01 e B-13). O ambiente não hospeda o HTML.

Regra de comunicação: em toda peça da Plataforma, o NIDflow aparece como item incluso, com o valor anual de referência de R$ 358,80 (12 vezes R$ 29,90).

### 2.7 Minha conta

Tudo o que é administrativo em uma tela: data de início e de renovação, forma de pagamento e parcelas, botão "Não renovar" (um clique, sem cascata, com uma pergunta opcional de motivo), lista de minicursos avançados comprados com nota fiscal, certificados de conclusão por minicurso (documento simples com nome, minicurso, data; sem "certificado de curso" institucional), canal de suporte (e-mail e WhatsApp da NID, resposta em até 1 dia útil).

---

## 3. Navegação

| Regra | Detalhe |
|---|---|
| Menu | Sete itens na ordem da seção 2, sempre visíveis no desktop; no celular, menu inferior com Início, Trilhas, Comunidade, Agenda e "Mais" (Biblioteca, NIDflow, Minha conta) |
| Onde o assinante cai ao entrar | Início. Se tem um encontro nas próximas 2 horas, cai na página do encontro |
| Profundidade máxima | Três cliques para qualquer aula, post ou material |
| Busca | Uma busca única que devolve aulas, posts e materiais |
| Identidade | Paleta do brief: laranja `#F26522`, cinza escuro `#373737`, off-white `#F5F4F2`. Tipografia conforme a skill `nid-pages` (display com personalidade e corpo legível) dentro do que a plataforma de membros permitir; se a plataforma só aceitar cor e logo, a tipografia fica a dela e a paleta é a nossa. Logo da NID no topo. Nada de foto do Henrique como banner |
| Idioma | 100% em português do Brasil, inclusive os textos de sistema que a plataforma permitir editar |
| Notificações | E-mail (resumo semanal da comunidade e lembrete de encontro em D-1 e H-1) e, se o assinante autorizar, WhatsApp só para lembrete de encontro. Sem notificação por post |
| Progresso | Barra por minicurso e por trilha; marco visível em "Minha conta" (ver `05-retencao-e-renovacao.md`, seção 2) |

Padrões da skill `nid-pages` aplicados: onboarding progressivo (três passos, um por vez), feedback imediato em cada ação (reserva confirmada, aula concluída, post publicado), estados vazios com instrução ("Ninguém postou ainda esta semana. Coloque o seu projeto na mesa."), planos claros (só existe um plano; a tela de conta diz exatamente o que está incluso e quando renova).

---

## 4. Regras de acesso por produto

Só existe um plano da Plataforma NID. O que varia é o que cada comprador da esteira vê dentro do mesmo ambiente de membros (a área de membros da plataforma de checkout hospeda os quatro produtos, cada um com o próprio acesso).

| Situação do comprador | Etiqueta (`automacoes/05-integracoes.md`, seção 7) | O que vê no ambiente de membros |
|---|---|---|
| Comprou só o playbook | `F2-comprador-playbook` | Área do playbook: PDF, templates, checklist. Vitrine do mini curso (R$ 147) e, quando houver janela aberta, vitrine da Plataforma NID. Nada da comunidade, da agenda ou das trilhas |
| Comprou o mini curso (bump, upsell ou avulso) | `F2-minicurso` | Área do mini curso: oito aulas e materiais. Idem acima para vitrines |
| Assina o NIDflow mensal | `F2-nidflow-ativo` | Nada muda no ambiente de membros (o NIDflow tem acesso próprio). Recebe a oferta da Plataforma na janela, com a regra de não cobrança dupla explicada |
| Assinante da Plataforma NID, anuidade ativa | `F2-plataforma-ativo` | Tudo: as sete áreas, trilha base completa, aulas do mini curso e materiais do playbook na biblioteca, comunidade, agenda, NIDflow incluso. Vitrine dos avançados |
| Assinante que comprou um minicurso avançado | `F2-plataforma-ativo` + `F2-plataforma-avancado-[código]` (etiqueta nova, seção 8) | O avançado liberado dentro da trilha "Avançados" |
| Renovação recusada no cartão (retentativas em curso) | `F2-plataforma-recusada` (nova) | Acesso completo mantido durante as retentativas da plataforma de checkout (até 7 dias), com faixa "Não conseguimos renovar. Atualize o pagamento" |
| Anuidade encerrada sem renovação | `F2-plataforma-expirada` (nova); NIDflow vai para `F2-nidflow-leitura` | Modo leitura por 30 dias: vê a comunidade sem postar, vê as gravações, baixa os materiais da biblioteca; não entra em encontros nem em aulas. Minicurso avançado comprado continua acessível (é produto próprio). Depois de 30 dias, só "Minha conta" com o botão de reativar |
| Reembolso nos 7 dias | `F2-reembolso` | Acesso encerrado no ato. NIDflow incluso encerrado junto (seção 8 do plano do NIDflow). Minicurso avançado comprado no mesmo período é reembolsado junto se pedido |

Regras que valem sempre:

1. Uma pessoa, um login, um e-mail, em todos os produtos. O e-mail do checkout é a chave.
2. Compartilhar login viola os termos. Duas sessões simultâneas; a terceira derruba a mais antiga (mesma regra do NIDflow).
3. O acesso à comunidade e aos encontros existe só com anuidade ativa. Não há "comunidade vitalícia".
4. O minicurso avançado é um produto próprio: quem comprou mantém o acesso a ele mesmo sem anuidade ativa. É a única exceção à regra 3, porque a pessoa pagou por ele à parte.

---

## 5. O primeiro dia (e a primeira semana)

Onboarding progressivo: um passo de cada vez, com o próximo sempre visível. Nenhum tour de dez telas.

| Momento | O que o assinante vê | O que faz | Evento gravado |
|---|---|---|---|
| Hora 0 (pagamento aprovado) | E-mail e WhatsApp de acesso, remetente "NID": link de entrada, o que está incluso em cinco linhas, data do próximo encontro. Se já assinava o NIDflow, um parágrafo explica que a mensalidade acaba no ciclo seguinte, sem cobrança dupla | Entra | `F2_plataforma_compra`, `F2_plataforma_primeiro_acesso` |
| Primeiro acesso | Vídeo de boas-vindas de 3 minutos: Henrique, sócio da NID, explica o que o ambiente é e o que não é ("aqui a gente pratica o método com projeto real; não é lugar de assistir aula e sumir"). Abaixo, a faixa "Comece por aqui" com os três passos | Passo 1: ativa o NIDflow (um clique; conta criada pelo webhook, link mágico) | `F2_nidflow_conta_criada` (origem `plataforma_nid`) |
| Mesma sessão ou dia 1 | Passo 2: "Coloque o seu projeto na mesa": formulário curto (segmento do cliente, etapa em que está, o que trava) que vira um post em "Projetos na mesa" | Publica o primeiro post | `F2_plataforma_projeto_mesa` |
| Dia 1 a 3 | Passo 3: primeira aula do minicurso 1 ("Antes da Dor"), 12 minutos | Assiste e faz o entregável | `F2_plataforma_aula_assistida` |
| Dia 2 | E-mail da NID: resposta humana ao post do passo 2 (um sócio ou alguém da NID comenta em até 2 dias úteis) | Volta ao ambiente | `F2_plataforma_resposta_nid` |
| Dia 7 | Convite para o próximo encontro com a pauta e a instrução "traga o projeto que você colocou na mesa" | Reserva | `F2_plataforma_encontro_reserva` |
| Dia 14 | Primeiro Mesa de Projetos com o assinante presente (ou a gravação, se não pôde ir) | Participa | `F2_plataforma_encontro_presenca` |
| Dia 30 | Marco M3 (primeiro minicurso concluído) ou toque de reengajamento (ver `05-retencao-e-renovacao.md`, seção 5) | | `F2_plataforma_marco` |

Regra do primeiro dia: o assinante sai da primeira sessão com o NIDflow ativo e um projeto real na mesa. Se saiu sem isso, o e-mail do dia 1 pede exatamente isso, nada mais.

---

## 6. Plataforma tecnológica

### 6.1 Critérios (na ordem de peso)

1. **Mesma plataforma de checkout dos outros três produtos** (decisão 5 do brief, parecer e `automacoes/05-integracoes.md`, seção 4: Cakto primeiro, Kiwify reserva). Uma base, um webhook, uma conciliação. Esse critério pesa mais do que qualquer recurso isolado.
2. Área de membros com trilhas, progresso por aula e materiais anexos.
3. Comunidade nativa com espaços separados, moderação (fixar, ocultar, silenciar, banir) e histórico pesquisável.
4. Encontros ao vivo nativos ou integração simples com link externo, com gravação publicável na área.
5. Cobrança anual com parcelamento no cartão e Pix à vista, renovação automática, webhooks de renovação, atraso, cancelamento e reembolso.
6. Venda de produto dentro do ambiente (o minicurso avançado): vitrine na área de membros, checkout pré-identificado, liberação automática.
7. Custo: sem mensalidade fixa ou com mensalidade que caiba na receita da Plataforma (ver seção 7).
8. Domínio próprio, paleta e logo da NID; textos de sistema em português.

### 6.2 Comparativo

Pesquisa feita em 11/09/2026. **Os sites oficiais da Cakto (`cakto.com.br` e `ajuda.cakto.com.br`), da Circle (`circle.so`) e da Hotmart (`help.hotmart.com`) estão bloqueados pelo proxy deste ambiente.** Tudo abaixo vem de resumos de busca das páginas oficiais e de artigos de 2026, com a URL da fonte. Antes da contratação, o `automacao` confirma cada item em conta de teste (checklist da seção 4.4 do `automacoes/05-integracoes.md`, itens 4 e 11, mais os da seção 6.4 abaixo).

| Critério | Cakto Members | Hotmart Áreas de Membros (antigo Hotmart Club) | Kiwify área de membros | Circle |
|---|---|---|---|---|
| Mesma plataforma de checkout (critério 1) | Sim, é a recomendada | Só se o Henrique já usar Hotmart e preferir não migrar (checkout mais caro: 9,9% + R$ 2,49 a partir de 21/09/2026) | Sim, é a reserva | Não. Circle não faz checkout brasileiro; cobraria via Cakto e liberaria acesso por integração (webhook → API da Circle), com custo e ponto de falha a mais |
| Área de membros | Sim. "Cakto Members 2.0": gratuita, sem limite de alunos, vídeos ou cursos; espaços de trabalho separados por produto, cada um com identidade própria; versão V1 será descontinuada | Sim. Gratuita, sem mensalidade nem adesão; módulos principal, adicional e adicional pago; player próprio sem custo por venda | Sim. Gratuita; cursos ilimitados, menu editável, player próprio, domínio próprio, liberação programada de conteúdo | Sim. Cursos inclusos desde o plano Professional |
| Comunidade nativa (critério 3) | Sim, "comunidade integrada", segundo o resumo. Espaços separados, ferramentas de moderação e busca: **a confirmar em teste** | Sim. Comunidades abertas, exclusivas ou pagas dentro da área; posts com texto, imagem, vídeo, áudio e link | **Não nativa** segundo os resumos (artigos sugerem grupo de WhatsApp ou Telegram como complemento). Reprova o critério 3 se confirmado | Sim, é o core do produto: espaços, moderação, perfis, busca, pontuação de atividade (plano Business) |
| Encontros ao vivo (critério 4) | Sim, "transmissões ao vivo nativas, sem ferramenta externa nem custo adicional" | Sim, lives dentro da área | Não nativo; link externo | Sim, eventos e transmissão (limites por plano a confirmar) |
| Cobrança anual parcelada e webhooks (critério 5) | Recorrência nativa com Pix automático, boleto e cartão; retentativa de até 3 tentativas; parcelamento no checkout com acréscimo incorporado ao preço pago pelo comprador (o produtor recebe o valor cheio antecipado). Anual em 12 vezes: **a confirmar** (item 4 do checklist do `automacao`) | Assinatura de semanal a anual; parcelamento existe; quem absorve: a confirmar | Assinatura nativa; anual parcelado: a confirmar | Cobra em dólar via Stripe, mais 2% (Professional) ou 1% (Business) por transação; não serve para cobrar o assinante brasileiro |
| Venda dentro do ambiente (critério 6) | "Vitrine de vendas" dentro da área, segundo o resumo; liberação automática por ser o mesmo checkout: **a confirmar** | Sim: "módulo adicional pago" e página de vendas dentro da área de membros | Vitrine de outros produtos: a confirmar | Paywalls e memberships nativos, mas em dólar |
| Custo (critério 7) | R$ 0 de mensalidade. Só a taxa por venda (Pix 0% + R$ 2,49; cartão 4,99% + R$ 2,49 segundo a central de ajuda; fontes secundárias citam 3,89% no cartão para quem usa a Members: divergência a resolver) | R$ 0 de mensalidade. Taxa por venda mais alta da esteira | R$ 0 de mensalidade. 8,99% + R$ 2,49 por venda | US$ 89 por mês (Professional, cobrado anual: US$ 1.068) ou US$ 199 por mês (Business: US$ 2.388), mais taxa por transação; sem plano gratuito, 14 dias de teste; e-mail em massa é adicional (US$ 99 por mês para 10 mil contatos) |
| Identidade e português (critério 8) | Identidade por espaço de trabalho; textos em português | Sim | Sim, domínio próprio | Interface traduzida; domínio próprio no Business |

Fontes (resumos de busca de 11/09/2026):

- Cakto: [Central de Ajuda, "Conheça a Cakto Members"](https://ajuda.cakto.com.br/pt-br/articles/68-conheca-a-cakto-members-a-nova-era-da-sua-area-de-membros); [Cakto, página da área de membros](https://www.cakto.com.br/areademembros); [Central de Ajuda, "Como funciona o parcelamento no checkout?"](https://ajuda.cakto.com.br/pt/article/como-funciona-o-parcelamento-no-checkout-1fcgv7u/); [EngagED, "Cakto ou Kirvano: qual escolher em 2026"](https://engaged.com.br/blog/cakto-ou-kirvano-qual-escolher/); [Digital Manager Guru, "Juros do parcelamento"](https://blog.digitalmanager.guru/juros-parcelamento-plataformas/).
- Hotmart: [Central de Ajuda, "Hotmart Club: tudo o que você precisa saber"](https://help.hotmart.com/pt-br/article/20060658355085/hotmart-club-tudo-o-que-voce-precisa-saber-sobre-a-area-de-membros-da-hotmart); [Central de Ajuda, "Como criar e configurar uma comunidade na área de membros"](https://help.hotmart.com/pt-br/article/8805214381069/como-criar-e-configurar-uma-comunidade-na-area-de-membros-); [Central de Ajuda, "Como criar e gerenciar módulos"](https://help.hotmart.com/pt-br/article/360000645592/como-criar-e-gerenciar-modulos-no-hotmart-club-).
- Kiwify: [Central de Ajuda, categoria "Área de membros"](https://ajuda.kiwify.com.br/pt-br/category/area-de-membros-xg7v8s/); [Synchro Hub, "Área de membros da Kiwify: guia completo"](https://www.synchrohub.com.br/blog/kiwify-area-membros-cursos-online/).
- Circle: [SchoolMaker, "Circle.so pricing 2026"](https://www.schoolmaker.com/blog/circle-so-pricing); [Ruzuku, "Circle pricing 2026"](https://www.ruzuku.com/compare/circle-pricing); [Bettermode, "Circle community platform review: pricing and fees (2026)"](https://bettermode.com/blog/circle-community-platform).

### 6.3 Recomendação

**Cakto Members, no mesmo espaço de trabalho da conta Cakto que já vende o playbook, o mini curso e o NIDflow.** Motivos: cumpre o critério 1 (o que mais pesa), custa R$ 0 de mensalidade, tem comunidade e transmissão ao vivo nativas segundo as fontes e permite vitrine de venda dentro da área. A esteira inteira fica em uma base, um webhook e uma conciliação.

Ordem de alternativas, se a Cakto reprovar no teste:

1. **Kiwify** como área de membros (reserva do checkout) só se a comunidade nativa existir na conta de teste; se não existir, a Kiwify serve de checkout e área de aulas, e a comunidade vai para a opção 2.
2. **Circle (plano Professional)** apenas para comunidade e encontros, com cobrança na plataforma de checkout brasileira e liberação por integração. Custo: US$ 1.068 por ano mais 2% por transação interna (que não usaríamos) e o custo da integração pelo `automacao`. Só faz sentido a partir de uma base de assinantes que pague isso com folga (hipótese: acima de 150 assinantes ativos).
3. **Hotmart Áreas de Membros** só se o Henrique já operar na Hotmart e não quiser migrar. Recurso completo, checkout mais caro (R$ 90,59 por venda da Plataforma contra R$ 51,39 na Cakto no cartão, seção 4.3 do `automacoes/05-integracoes.md`).

O que fica fora em qualquer cenário: grupo de WhatsApp ou Telegram como comunidade principal. Sem moderação com ferramentas, sem histórico pesquisável, sem ligação com aulas e encontros, e, na Hubla, custo extra por membro. WhatsApp fica só para lembrete de encontro, com autorização.

### 6.4 O que confirmar em conta de teste (acréscimo ao checklist do `automacao`)

| # | Item | Critério de aceite |
|---|---|---|
| 1 | Comunidade: espaços separados, fixar post, ocultar post, silenciar e remover membro, busca | Cinco espaços criados, post fixado, membro de teste removido e readmitido |
| 2 | Transmissão ao vivo nativa: limite de participantes, gravação automática, publicação da gravação na área | Encontro de teste com 3 contas, gravação publicada em uma aula |
| 3 | Agenda ou calendário de eventos com reserva e lembrete; se não existir, integração com link externo (Google Meet ou Zoom) e lembrete pelo `automacao` | Evento de teste com lembrete recebido em D-1 |
| 4 | Assinatura anual de R$ 980 com Pix à vista e cartão em até 12 vezes; acréscimo do parcelamento exibido ao comprador; renovação automática em 12 meses com aviso prévio; evento de webhook de renovação, atraso e cancelamento | Compra de teste em 12 vezes e à vista; os três eventos recebidos no orquestrador |
| 5 | Produto avulso (minicurso avançado) restrito a assinantes: vitrine dentro da área, checkout pré-identificado pelo e-mail, liberação automática, bloqueio para quem não é assinante (por link não listado e verificação de etiqueta na página de obrigado, se a plataforma não restringir por si) | Compra de teste libera o avançado em menos de 2 minutos; conta sem anuidade não consegue comprar |
| 6 | Evento ou API de "aula concluída", "post publicado" e "presença em transmissão" | Três eventos recebidos no orquestrador (são os marcos do `05-retencao-e-renovacao.md`) |
| 7 | Paleta, logo e domínio próprio | Ambiente de teste com `#F26522`, `#373737`, logo da NID e domínio da NID |
| 8 | Textos de sistema em português e possibilidade de editar os que aparecem para o assinante | Dez telas principais revisadas |

Se os itens 1, 2, 4 ou 5 falharem na Cakto, o coordenador decide entre as alternativas da seção 6.3 antes de qualquer peça citar recurso da comunidade.

---

## 7. Custos

Todos os valores abaixo são hipóteses de planejamento até a contratação. Não há dado real.

### 7.1 Montagem (uma vez, antes da primeira abertura)

| Item | Quem faz | Custo em dinheiro (hipótese) | Custo em tempo (hipótese) |
|---|---|---|---|
| Configuração do ambiente (áreas, trilhas, comunidade, agenda, identidade) | `automacao` com o coordenador | R$ 0 (Cakto Members sem mensalidade) | 3 a 5 dias úteis |
| Gravação dos três primeiros minicursos inclusos (mínimo para abrir, `02-catalogo.md`, seção 5) | Henrique grava; roteiro do agente `roteiro`; edição terceirizada ou interna | Edição: R$ 150 a R$ 300 por aula editada (hipótese de mercado; 15 aulas: R$ 2.250 a R$ 4.500) | Henrique: 2 dias de gravação por minicurso (6 dias) |
| Gravação do primeiro minicurso avançado (A-01, 6 aulas) | Henrique grava a abertura e o fechamento; o responsável pela automação na NID grava o miolo; roteiro do `roteiro` | 6 aulas: R$ 900 a R$ 1.800 | 2 dias de gravação |
| Vídeo de boas-vindas e vídeo da oferta de lançamento | Henrique grava | Edição: R$ 300 a R$ 600 | Meio dia |
| Biblioteca (PDFs já existentes reunidos, projetos por segmento com autorização) | `plataforma` com `metodo` | R$ 0 | 1 dia |
| Página da Plataforma (`pagina-de-vendas.md`, do `copy`) e implementação | `copy` + implementação pela skill `nid-pages` | Hospedagem já existente | 3 dias |
| Integração B-13 do NIDflow (inclusão via Plataforma) | `nidflow` | R$ 0 | 0,5 dia |

### 7.2 Operação (por ano)

| Item | Custo (hipótese) | Observação |
|---|---|---|
| Área de membros e comunidade (Cakto Members) | R$ 0 de mensalidade | Só taxa por venda: R$ 51,39 por anuidade no cartão, R$ 2,49 no Pix (seção 4.3 do `automacoes/05-integracoes.md`, a confirmar) |
| Transmissão ao vivo | R$ 0 se nativa; se precisar de Zoom ou similar, cerca de R$ 90 a R$ 100 por mês (hipótese: plano básico em dólar) | Decidido no teste da seção 6.4 |
| Encontros (24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID, aberturas de turma) | Tempo do Henrique e de um sócio ou alguém da NID: cerca de 70 a 75 horas por ano, já com a preparação | É o custo real da Plataforma. Detalhe em `03-comunidade-e-encontros.md`, seção 6.7 |
| Moderação e resposta na comunidade | Uma pessoa da NID, cerca de 3 horas por semana (150 horas por ano) | Pode ser a mesma pessoa que atende o suporte do Funil 2 |
| Produção de conteúdo novo (um minicurso incluso por trimestre, um avançado por semestre) | Edição: R$ 4.500 a R$ 9.000 por ano | Henrique: cerca de 12 dias de gravação por ano |
| Nota fiscal (integrador) | Conforme o emissor escolhido com o contador; hipótese de R$ 50 a R$ 100 por mês | Já necessário para os outros produtos |
| Certificados, e-mails e WhatsApp de lembrete | Dentro das ferramentas já contratadas pelo `automacao` | |

Leitura: a Plataforma quase não tem custo fixo em dinheiro. O custo é o tempo da NID em encontros, moderação e gravação. É por isso que a primeira abertura só acontece com base de 1.500 compradores (decisão 2 do coordenador; parecer, seção 3.3, item 3): no cenário base do parecer, 3% de 1.500 são 45 assinantes e cerca de R$ 35.600 líquidos por abertura (hipótese), o que paga a montagem e o primeiro ano de operação. Abaixo disso, o tempo da NID não fecha a conta.

---

## 8. Etiquetas e eventos que a Plataforma gera (para o `automacao`)

Etiquetas novas, no padrão de `automacoes/05-integracoes.md`, seção 7 (prefixo `F2-`, minúsculas, hífen). `F2-plataforma-ativo` e `F2-interesse-plataforma` já existem.

| Etiqueta | Significado | Quem aplica | Removida |
|---|---|---|---|
| `F2-plataforma-ativo` | Anuidade ativa (já existe) | Orquestrador, na compra e na renovação | Ao expirar sem renovação ou ao reembolsar |
| `F2-plataforma-fundador` | Comprou na primeira abertura (condição de fundador, `04-lancamento-interno.md`, seção 3.4) | Orquestrador, na compra da primeira abertura | Nunca (histórico); a condição só vale enquanto a anuidade estiver ativa |
| `F2-plataforma-recusada` | Renovação recusada, acesso mantido durante as retentativas | Orquestrador | Ao renovar ou expirar |
| `F2-plataforma-expirada` | Anuidade encerrada sem renovação (modo leitura) | Orquestrador | Ao reativar |
| `F2-plataforma-renovada` | Renovou pelo menos uma vez | Orquestrador | Nunca (histórico) |
| `F2-plataforma-avancado-[código]` | Comprou o minicurso avançado de código X (`02-catalogo.md`, seção 3) | Orquestrador | Nunca |
| `F2-plataforma-nao-comprou` | Recebeu a sequência de uma janela inteira e não comprou (com o número da janela) | Orquestrador, no fechamento | Ao comprar |

Eventos canônicos novos (grupo "Plataforma" na seção 8.1 do `automacoes/05-integracoes.md`): `F2_plataforma_compra` (com janela e forma de pagamento), `F2_plataforma_primeiro_acesso`, `F2_plataforma_projeto_mesa`, `F2_plataforma_aula_assistida` (com minicurso e aula), `F2_plataforma_minicurso_concluido`, `F2_plataforma_encontro_reserva`, `F2_plataforma_encontro_presenca` (com tipo de encontro), `F2_plataforma_resposta_nid`, `F2_plataforma_marco` (M1 a M6), `F2_plataforma_avancado_compra`, `F2_plataforma_renovada`, `F2_plataforma_recusada`, `F2_plataforma_expirada`, `F2_plataforma_reembolso`, `F2_plataforma_janela_aberta`, `F2_plataforma_janela_fechada`.

Os eventos de comunidade e encontro são a fonte do critério B4 do Gatilho B (domínio do método demonstrado em interação), que hoje é avaliado por projeto enviado (`automacoes/04-segmentacao-gatilhos.md`, seção 5.4). Depois da abertura da Plataforma, o humano que conduz a Mesa de Projetos registra `F2_projeto_avaliado` diretamente a partir do encontro.

---

## 9. Checklist de aceite da estrutura

- [ ] As sete áreas existem com os nomes desta seção e na ordem do menu.
- [ ] Um assinante de teste sai do primeiro acesso com o NIDflow ativo e um post em "Projetos na mesa" em menos de 15 minutos.
- [ ] Comprador só do playbook não vê comunidade, agenda nem trilhas.
- [ ] Anuidade de teste expirada leva ao modo leitura em 30 dias e ao regime do NIDflow (leitura, PDF por 30 dias, exclusão em 90).
- [ ] Minicurso avançado comprado por conta de teste continua acessível com a anuidade expirada.
- [ ] Os oito itens da seção 6.4 confirmados em conta de teste e registrados em `automacoes/validacao-checkout.md`.
- [ ] Todas as etiquetas e eventos da seção 8 chegam ao orquestrador.
- [ ] Nenhum texto do ambiente usa o léxico proibido do brief (seção 10.4) nem chama a Plataforma de curso, escola ou mentoria.
