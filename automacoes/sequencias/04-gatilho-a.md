# Sequência 04 · Gatilho A: convite à sessão de arquitetura e perguntas de qualificação

| Campo | Valor |
|---|---|
| Fluxo de origem | `automacoes/04-segmentacao-gatilhos.md` (seções 2, 4 e 8.1). Momentos, canais, prazos e condições são os do fluxo |
| Códigos neste arquivo | CA1 (WhatsApp, humano), CA1e (e-mail, humano), CA2 (lembrete, humano, nos dois canais), CA3 (e-mail automático), mais os textos das perguntas P1, P2 e P3 em todos os pontos de coleta fora da página de obrigado |
| Quem envia | CA1, CA1e e CA2: uma pessoa da NID, pelo número oficial (WhatsApp) ou por e-mail com remetente "Henrique Leite, sócio da NID" e endereço da NID. Sempre assinado "Henrique Leite, sócio da NID", mesmo quando outra pessoa opera a conta em nome dele (decisão do fluxo, seção 4.2, passo 5). CA3: automático, remetente "NID", assinatura "Equipe NID" |
| Quando | Depois da entrega (E0 e W0), entre 2 e 24 horas após a etiqueta `F2-gatilho-A`, em horário comercial (segunda a sexta, 9h às 18h; sábado até 13h). CA2 três dias úteis depois de CA1 sem resposta. CA3 sessenta dias depois de `sem_resposta` |
| Nome da reunião | "Sessão de arquitetura", conforme o brief, até o Henrique confirmar o nome usado no Funil 1. Se mudar, troca em todas as mensagens deste arquivo e na base do agente |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 8.2, 10.5), `docs/01-parecer-estrategico.md` (seções 3.4 e 6, item 1), `produtos/playbook/01-playbook.md` (capítulo 11, "Uma última coisa"), `produtos/playbook/pagina-de-obrigado.md` |

Regras aplicadas: nenhum preço, prazo ou escopo do Funil 1; nada de "mentor", "especialista", "aprenda comigo"; o argumento é a continuidade natural ("quem desenha projeto para os clientes também pode ter o próprio projeto comercial desenhado pela NID"); um único CTA por mensagem; sem travessão; nenhum emoji em e-mail e nenhum em WhatsApp neste arquivo; contexto adaptado só com o que está registrado na base, nunca suposto.

Variáveis: `{primeiro_nome}`, `{frase_de_contexto}` (uma das opções da seção 1.1, ou nenhuma), `{link_agenda_funil1}` (agenda da sessão de arquitetura, do Funil 1), `{link_p1_propria}`, `{link_p1_terceiro}`, `{link_p2_sim}`, `{link_p2_nao}`, `{link_area_membros}`, `{link_descadastro}`.

Rastreio dos links da agenda: `utm_source=whatsapp` ou `email`, `utm_medium=humano` (CA1, CA1e, CA2) ou `sequencia` (CA3), `utm_campaign=F2-gatilho-a`, `utm_content=ca1e`, `ca2`, `ca3`. O valor `humano` de `utm_medium` não existe na lista do `05-integracoes.md` e precisa ser registrado pelo `automacao` (decisão deste arquivo).

---

## 1. Convite pessoal (humano)

### 1.1 Frase de contexto (o humano escolhe uma, ou nenhuma; nada inventado)

| Registro na base | Frase |
|---|---|
| Nenhum além das respostas P1 e P2 | (sem frase) |
| Comprou o playbook com as aulas (`F2-minicurso`) | Vi que pegou as aulas do mini curso também. |
| Disse algo ao agente sobre a própria empresa (`cargo_declarado`, `empresa_com_time_comercial`, resumo da conversa) | Você comentou com a gente que {o que a pessoa disse, nas palavras dela, em até uma linha}. |
| Perguntou sobre contratar a NID (`perguntou_sobre_contratar_nid = true`) | Você perguntou sobre o que a NID faz para empresas, e é disso que eu quero falar. |
| Respondeu ao e-mail de entrega (C7) | Li a sua resposta ao e-mail de entrega. |

### CA1 · WhatsApp

**Código**: CA1
**Momento**: entre 2 e 24 horas após a etiqueta, em horário comercial, sempre depois da entrega
**Canal**: WhatsApp, enviado por uma pessoa da NID pelo número oficial (conversa aberta pela pessoa em algum momento, ou modelo aprovado se fora da janela de 24 horas)
**Condição**: `F2-gatilho-A` aplicada; telefone informado; sem opt-out de WhatsApp; tarefa humana aberta

**Mensagem**

Aqui é o Henrique, sócio da NID. Vi que você pegou o Playbook NID · Desenhe para Vender e que vende para a sua própria empresa. {frase_de_contexto}

Uma coisa que a gente vê com frequência: quem desenha projeto para os clientes costuma deixar o próprio projeto comercial sem desenho. A NID desenha o projeto comercial de empresas, com geração de demanda, automação comercial com IA e terceirização de BDR, SDR e closer, usando o mesmo método que está no seu playbook.

O primeiro passo é uma sessão de arquitetura, sem custo: cerca de uma hora em que a gente desenha o seu projeto comercial na tela, com você. Você sai com o desenho, contrate a NID ou não.

Qual dia e horário ficam bons para você, esta semana ou na próxima?

Henrique Leite, sócio da NID

**CTA único**: responder com dia e horário

[Nota de implementação: se a última mensagem da pessoa tiver mais de 24 horas, o WhatsApp exige modelo aprovado; o modelo é este texto com `{frase_de_contexto}` vazia e a variável `{primeiro_nome}` na abertura ("Aqui é o Henrique, sócio da NID. {primeiro_nome}, vi que você pegou..."). Enquanto a tarefa estiver aberta, o WhatsApp automático do contato fica pausado (fluxo, seção 4.2, passo 4).]

---

### CA1e · E-mail

**Código**: CA1e
**Momento**: o mesmo de CA1
**Canal**: e-mail, remetente "Henrique Leite, sócio da NID", endereço da NID
**Condição**: `F2-gatilho-A` aplicada e (sem telefone ou com opt-out de WhatsApp)
**Assunto**: O projeto comercial da sua empresa
**Pré-cabeçalho**: Quem desenha projeto para os clientes também pode ter o próprio projeto desenhado. Uma hora, sem custo.

**Corpo**

Olá, {primeiro_nome}. Aqui é o Henrique, sócio da NID.

Vi que você pegou o Playbook NID · Desenhe para Vender e que vende para a sua própria empresa. {frase_de_contexto}

Quem desenha projeto para os clientes costuma deixar o próprio projeto comercial sem desenho. A NID desenha o projeto comercial de empresas, com geração de demanda, automação comercial com IA e terceirização de BDR, SDR e closer, usando o mesmo método que está no seu playbook.

O primeiro passo é uma sessão de arquitetura, sem custo: cerca de uma hora em que a gente desenha o seu projeto comercial na tela, com você. Você sai com o desenho, contrate a NID ou não.

[Botão] Escolher um horário para a sessão de arquitetura
{link_agenda_funil1}?utm_source=email&utm_medium=humano&utm_campaign=F2-gatilho-a&utm_content=ca1e

Se preferir, responda a este e-mail com um dia e horário que eu encaixo na agenda.

Henrique Leite, sócio da NID
NID · Consultoria de Performance Comercial

**CTA único**: o link da agenda (a resposta por e-mail é o mesmo pedido por outro caminho)

---

### CA2 · Lembrete (3 dias úteis sem resposta)

**Código**: CA2
**Momento**: 3 dias úteis após CA1 ou CA1e sem resposta, em horário comercial
**Canal**: o mesmo de CA1 ou CA1e
**Condição**: tarefa ainda aberta; sem resposta da pessoa

**WhatsApp**

Henrique de novo, da NID. Se a sessão de arquitetura fizer sentido, é só me dizer um dia e horário. Se não for o momento, sem problema: o playbook continua com você.

Henrique Leite, sócio da NID

**E-mail**
**Assunto**: Sobre a sessão de arquitetura
**Corpo**

Olá, {primeiro_nome}. Henrique de novo, da NID.

Se a sessão de arquitetura fizer sentido, é só escolher um horário no link abaixo ou responder com um dia que fique bom. Se não for o momento, sem problema: o playbook continua com você.

[Botão] Escolher um horário para a sessão de arquitetura
{link_agenda_funil1}?utm_source=email&utm_medium=humano&utm_campaign=F2-gatilho-a&utm_content=ca2

Henrique Leite, sócio da NID
NID · Consultoria de Performance Comercial

**CTA único**: responder com dia e horário (WhatsApp) ou o link da agenda (e-mail)

[Nota: sem argumento novo, conforme o fluxo. Três dias úteis depois de CA2 sem resposta, a tarefa encerra como `sem_resposta` e o WhatsApp automático do contato religa.]

---

### CA3 · Retomada automática (60 dias após `sem_resposta`)

**Código**: CA3
**Momento**: 60 dias corridos após o encerramento como `sem_resposta`, entre 8h e 10h, segunda a sexta
**Canal**: e-mail automático, remetente "NID"
**Condição**: `gatilho_a_status = sem_resposta`; sem `F2-funil1-cliente`; sem opt-out de e-mail
**Assunto**: A sessão de arquitetura continua aberta
**Pré-cabeçalho**: O convite do Henrique não tinha prazo. Uma hora, sem custo, para desenhar o seu projeto comercial.

**Corpo**

Olá, {primeiro_nome}.

Há dois meses o Henrique, sócio da NID, te convidou para uma sessão de arquitetura: cerca de uma hora em que a NID desenha o projeto comercial da sua empresa na tela, com você, sem custo. O convite não tinha prazo e continua aberto.

Se agora for um momento melhor, basta escolher um horário.

[Botão] Escolher um horário para a sessão de arquitetura
{link_agenda_funil1}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-gatilho-a&utm_content=ca3

Equipe NID
NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o link da agenda. Última mensagem automática do Gatilho A; depois dela, só se a pessoa procurar.

---

## 2. Perguntas de qualificação fora da página de obrigado

Texto exato das perguntas (brief, seção 8.2; não muda em nenhum ponto de coleta):

- **P1**: "Você vende para a sua própria empresa ou para a empresa de outra pessoa?" Opções: "Para a minha própria empresa" / "Para a empresa de outra pessoa".
- **P2** (só se P1 = própria): "Você decide contratações de marketing ou vendas na sua empresa?" Opções: "Sim, eu decido" / "Não, outra pessoa decide".
- **P3** (só no NIDflow e na Plataforma NID): "O que você vende?" Opções: "Serviço" / "Software" / "Projeto sob medida" / "Consultoria" / "Outro".

Regra em todos os pontos: nunca repetir pergunta já respondida; pular é permitido; a finalidade aparece em uma linha ("para a gente te orientar melhor"); nenhuma resposta é suposta.

### 2.1 Bloco de um clique nos e-mails E1 (D+1) e E5 (D+5)

Aparece só para quem está `nao_respondeu`, abaixo do CTA principal, separado por uma linha. Texto canônico (o mesmo já aplicado em `01-entrega-playbook.md` e `02-oferta-mini-curso.md`):

Uma pergunta, para a gente te orientar melhor nos próximos e-mails. Um clique, sem cadastro.

Você vende para a sua própria empresa ou para a empresa de outra pessoa?

[Para a minha própria empresa] {link_p1_propria}
[Para a empresa de outra pessoa] {link_p1_terceiro}

### 2.2 Página aberta pelo clique em "Para a minha própria empresa" (P2)

**Título**: Anotado. Só mais uma.
**Pergunta**: Você decide contratações de marketing ou vendas na sua empresa?
**Botões**: [Sim, eu decido] {link_p2_sim} · [Não, outra pessoa decide] {link_p2_nao}
**Linha abaixo**: Um clique. A resposta fica registrada na hora.
**Link discreto**: Pular e ir para o meu acesso ({link_area_membros})

### 2.3 Páginas de confirmação

**Clique em "Para a empresa de outra pessoa"**
Título: Anotado. Obrigado.
Texto: O playbook tem um capítulo para o seu perfil: comece pelo capítulo 10 depois de ler as quatro etapas. Sua área de membros está aqui: {link_area_membros}

**Clique em "Não, outra pessoa decide"**
Título: Anotado. Obrigado.
Texto: O capítulo para consultores e donos de serviço mostra como vender projeto fechado em vez de hora. Comece por ele depois das quatro etapas. Sua área de membros está aqui: {link_area_membros}

**Clique em "Sim, eu decido"**
Título: Anotado. Obrigado.
Texto: O método que você está lendo é o mesmo que a NID usa para desenhar o projeto comercial dos clientes dela: geração de demanda, automação comercial com IA e terceirização de BDR, SDR e closer. Quem desenha projeto para os clientes também pode ter o próprio projeto comercial desenhado pela NID. Em até um dia útil, alguém da NID te escreve para propor uma sessão de arquitetura, sem custo. Sua área de membros está aqui: {link_area_membros}

[Nota de implementação: as páginas seguem a página de obrigado (`pagina-de-obrigado.md`, bloco 4): uma coluna, sem menu, um único link. Os links de um clique valem por 30 dias e gravam `vende_para` e `decide_contratacao` com a fonte `email_e1` ou `email_e5`. "Sim, eu decido" aplica `F2-gatilho-A` e cria a tarefa humana na hora.]

### 2.4 No agente de IA (direct e WhatsApp)

O agente faz P1 depois de responder o que a pessoa pediu, e P2 só se a resposta for "própria". Frases de entrada, reformulação única e retorno estão em `06-agente-direct-whatsapp.md`, seção 6. O texto das perguntas é o exato acima.

### 2.5 Tela de conclusão do primeiro projeto no NIDflow (passo 7 do onboarding)

Aparece abaixo dos botões "Exportar em PDF" e "Voltar ao projeto", só para quem ainda está `nao_respondeu` em P1 (P3 aparece para todos que ainda não a responderam).

**Linha de abertura**: Três perguntas opcionais, um clique cada, para a gente te orientar melhor.

**P1**: Você vende para a sua própria empresa ou para a empresa de outra pessoa?
[Para a minha própria empresa] [Para a empresa de outra pessoa]

**P2** (aparece no lugar de P1 após "Para a minha própria empresa"): Você decide contratações de marketing ou vendas na sua empresa?
[Sim, eu decido] [Não, outra pessoa decide]

**P3**: O que você vende?
[Serviço] [Software] [Projeto sob medida] [Consultoria] [Outro]

**Retorno após qualquer resposta** (no lugar da pergunta respondida): Anotado.
**Retorno após "Sim, eu decido"**: Anotado. Em até um dia útil, alguém da NID te escreve para propor uma sessão de arquitetura do seu projeto comercial, sem custo.
**Link discreto sob o bloco**: Prefiro não responder agora

[Nota: as respostas vão para a base pelo evento `perfil_respondido` (fonte `nidflow_onboarding`). Implementação pelo agente `nidflow`, `02-onboarding.md`, passo 7.]

### 2.6 Cadastro na Plataforma NID (Sprint 6)

Mesmas perguntas, mesmo texto, no cadastro da comunidade, com a linha de finalidade "para a gente te orientar melhor nos encontros e no que você recebe". Entra com a estrutura do Sprint 6.

---

## Checklist de coerência deste arquivo

- [x] CA1, CA1e e CA2 assinados "Henrique Leite, sócio da NID"; CA3 assinado "Equipe NID"
- [x] Arco do método em CA1 e CA1e: dor (projeto comercial sem desenho), solução (a NID desenha), arquitetura (sessão de arquitetura, uma hora, na tela), valor (sai com o desenho, contrate ou não)
- [x] Nenhum preço, prazo ou escopo do Funil 1; nenhuma promessa
- [x] "Sessão de arquitetura gratuita" expressa como "sem custo" no texto para o comprador, nome da reunião a confirmar pelo Henrique
- [x] Perguntas P1, P2 e P3 com o texto exato do brief em todos os pontos
- [x] Um CTA por mensagem; sem travessão; sem emoji; sem "pra" ou "pro"; sem termo interno no texto para a pessoa
