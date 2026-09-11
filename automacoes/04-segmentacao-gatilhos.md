# Segmentação da base pelos gatilhos A e B

| Campo | Valor |
|---|---|
| Versão | 1.0 (Sprint 4) |
| Autor | Agente `automacao` |
| Status | Entregue ao coordenador; pontos marcados aguardam aprovação do Henrique |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 4.5, 8.1, 8.2, 10.5); `docs/01-parecer-estrategico.md` (seções 3.4, 3.5, 4 e 6, item 1); decisão 1 do coordenador (perguntas do Gatilho A no D0, tarefa humana em 24 horas, perguntas também na tela de conclusão do NIDflow); `produtos/playbook/01-playbook.md` (capítulo 11, "Uma última coisa"); `produtos/nidflow/02-onboarding.md` (seções 3 e 4) |
| Mensagens | Todas as mensagens deste arquivo são **rascunho funcional**. A versão final é do agente `copy` |
| Regra de ouro | Segmentação usa só resposta registrada ou comportamento observado, com fonte e data. Nunca suposição. Sem resposta registrada, não há gatilho |

---

## 1. Por que a segmentação é a parte mais valiosa do Funil 2

O parecer estratégico (seção 3.4) mostra que, no cenário base, a margem dos contratos do Funil 1 originados pelo Gatilho A (R$ 52.500 por 1.000 compradores) é maior do que o resultado do Funil 2 inteiro depois da mídia (R$ 47.618). Um decisor que passa despercebido na base custa mais do que 30 compradores do playbook rendem em 12 meses. Por isso:

1. As duas perguntas do Gatilho A são feitas no D0, na página de obrigado, antes da entrega (decisão 1 do coordenador).
2. Toda etiqueta `F2-gatilho-A` gera uma tarefa humana com prazo de 24 horas para o convite pessoal.
3. As mesmas perguntas voltam em todo ponto de contato em que a base ainda estiver `nao_respondeu` (e-mail, agente de IA, tela de conclusão do NIDflow), sem repetir para quem já respondeu.

O Gatilho B não gera receita direta; alimenta o banco de talentos da vertical de terceirização. Os critérios são exigentes de propósito (parecer, seção 4, linha 8.2) e o custo de operação fica perto de zero: tudo automático até o convite, e o convite só sai quando os quatro critérios estão registrados.

---

## 2. Onde as perguntas são feitas (pontos de coleta)

Cada ponto grava a resposta literal, a fonte e a data. O orquestrador é o único que escreve na base; os pontos de coleta apenas enviam eventos.

| # | Ponto de coleta | Quando | Perguntas | Formato | Campos gravados | Evento | Responsável |
|---|---|---|---|---|---|---|---|
| C1 | Página de obrigado (D0) | Logo após o pagamento, antes do link de acesso (`02`, seção 3) | P1 e P2 (Gatilho A) | Dois botões de um clique cada; P2 só aparece se P1 = "própria empresa" | `vende_para`, `decide_contratacao` | `F2_qualificacao_respondida` (fonte `pagina_obrigado`) | `automacao` (página pela `nid-pages`, texto do `copy`) |
| C1b | Campo personalizado do checkout | Só se a validação técnica do `05` confirmar campo com opções fixas | P1 | Lista de opções | `vende_para` | Idem (fonte `checkout`) | `automacao` |
| C2 | E-mail E1 (D+1) e E5 (D+5) | Só para quem está `nao_respondeu` | P1 (botões de um clique; o clique abre uma página com P2) | Links de um clique gravados pelo orquestrador | `vende_para`, `decide_contratacao` | Idem (fonte `email_e1` ou `email_e5`) | `automacao` + `copy` |
| C3 | Agente de IA (direct e WhatsApp) | Em toda conversa, depois de responder o que a pessoa pediu, se a base estiver `nao_respondeu` (`01`, seção 4.3) | P1, P2, mais o que a pessoa declarar espontaneamente (cargo, empresa com time comercial, interesse em contratar a NID) | Conversa; saída estruturada do agente (`qualificacao`) | `vende_para`, `decide_contratacao`, `cargo_declarado`, `empresa_com_time_comercial`, `perguntou_sobre_contratar_nid` | Idem (fonte `agente`) | `automacao` |
| C4 | Tela de conclusão do primeiro projeto no NIDflow | Ao sair do modo de apresentação do primeiro projeto (passo 7 do onboarding) | P1, P2 e P3 ("O que você vende?") | Botões de um clique, opcionais | `vende_para`, `decide_contratacao`, `o_que_vende` | `perfil_respondido` (telemetria do NIDflow, fonte `nidflow_onboarding`) | `nidflow` (tela) + `automacao` (leitura do evento) |
| C5 | E-mail B4 (conclusão do mini curso) | Até 10 minutos após o evento de conclusão das aulas | P4 (Gatilho B): "Quantas propostas você apresentou nos últimos 30 dias e quantas fechou?" | Faixas em links de um clique: apresentadas (0; 1 a 3; 4 a 7; 8 ou mais) e fechadas (0; 1; 2 a 3; 4 ou mais) | `propostas_30d`, `fechadas_30d`, `minicurso_concluido_em` | `F2_propostas_30d_respondido`, `F2_minicurso_concluido` | `automacao` + `copy` |
| C6 | E-mail A3 do NIDflow (D+7 após o acesso, só quem atingiu M4) | Conforme `02-onboarding.md`, seção 5.1 | P5: "Como foi a apresentação?" (apresentei; ainda não; o cliente aprovou) | Um clique | `apresentacao_confirmada` (`apresentou`, `aprovada`, `ainda_nao`) | `F2_nidflow_apresentacao_respondido` | `automacao` + `copy` |
| C7 | Resposta ao e-mail de entrega (capítulo 11 do playbook: "Responda ao e-mail de entrega deste playbook e a gente conversa") | A qualquer momento | Nenhuma pergunta; a pessoa se declara | Texto livre lido por humano | `perguntou_sobre_contratar_nid = true` (marcado pelo humano), nota da conversa | `F2_resposta_email_entrega` | Humano (caixa de entrada do e-mail de envio, monitorada em dias úteis) |
| C8 | Suporte (WhatsApp ou e-mail) | Quando o pedido é "desenhem meu projeto", "revisem minha proposta", "quero contratar" (`01-plano-de-assinatura.md`, seção 11) | Nenhuma; o agente ou o humano registra a intenção | Conversa | `perguntou_sobre_contratar_nid = true` | `F2_qualificacao_respondida` (fonte `suporte`) | `automacao` (agente) ou humano |
| C9 | Projeto enviado para avaliação | A pessoa envia um projeto desenhado com os templates (link do NIDflow ou PDF) pelo formulário do Gatilho B | Nenhuma; avaliação humana pelo checklist do capítulo 9 do playbook | Formulário + avaliação registrada | `projeto_avaliado_em`, `avaliacao_dominio` (`aprovado`, `parcial`, `reprovado`), `avaliador` | `F2_projeto_avaliado` | Humano da NID (a definir pelo coordenador) |
| C10 | Comunidade e encontros da Plataforma NID (Sprint 6) | A partir do lançamento da Plataforma | Perfil no cadastro (P1, P2, P3) e observação de domínio do método em encontros | Cadastro + registro do condutor do encontro | Os mesmos campos de C4 e `avaliacao_dominio` (fonte `plataforma`) | `F2_qualificacao_respondida`, `F2_projeto_avaliado` | `plataforma` (Sprint 6) |

Texto exato das perguntas (do brief, seção 8.2; não muda em nenhum ponto de coleta):

- **P1**: "Você vende para a sua própria empresa ou para a empresa de outra pessoa?" Opções: "Para a minha própria empresa" / "Para a empresa de outra pessoa".
- **P2** (só se P1 = própria): "Você decide contratações de marketing ou vendas na sua empresa?" Opções: "Sim, eu decido" / "Não, outra pessoa decide".
- **P3** (só no NIDflow e na Plataforma): "O que você vende?" Opções: serviço, software, projeto sob medida, consultoria, outro.
- **P4** (Gatilho B, do brief): "Quantas propostas você apresentou nos últimos 30 dias e quantas fechou?" Faixas conforme a tabela.

Regras de coleta:

1. Nunca repetir uma pergunta já respondida. O orquestrador informa a todos os pontos de coleta o que a base já sabe (a página de obrigado e os e-mails escondem o bloco; o agente recebe `qualificacao_ja_respondida` no contexto; o NIDflow recebe o perfil ao criar a conta).
2. Pular é permitido em todos os pontos. Quem pula fica `nao_respondeu` e volta a ser perguntado no próximo ponto de coleta, no máximo uma vez por ponto.
3. Resposta ambígua no agente fica `nao_respondeu`; o agente pode reformular uma única vez na mesma conversa.
4. Conflito entre respostas (por exemplo, "terceiro" na página de obrigado e "própria" no NIDflow três meses depois): a resposta mais recente vence, o histórico fica guardado com fonte e data, e o gatilho é reavaliado.

---

## 3. Campos de qualificação na base

Modelo de dados do bloco `qualificacao` do contato (implementação no `05-integracoes.md`, seção 6). Toda resposta guarda `valor`, `fonte` e `respondido_em`.

| Campo | Valores | Origem | Uso |
|---|---|---|---|
| `vende_para` | `propria`, `terceiro`, `nao_respondeu` | C1, C1b, C2, C3, C4, C10 | Gatilho A |
| `decide_contratacao` | `sim`, `nao`, `nao_respondeu` | C1, C2, C3, C4, C10 | Gatilho A |
| `cargo_declarado` | Texto curto, só o que a pessoa disse (até 80 caracteres) | C3, C7, C8 | Gatilho A (critério 2 do brief) |
| `empresa_com_time_comercial` | `sim`, `nao`, `nao_declarado` | C3, C7, C8, C10 | Gatilho A (critério 1 do brief) |
| `perguntou_sobre_contratar_nid` | `true`, `false` | C3, C7, C8 | Gatilho A (critério 3 do brief) |
| `o_que_vende` | `servico`, `software`, `projeto_sob_medida`, `consultoria`, `outro`, `nao_respondeu` | C4, C10 | Contexto do convite A; perfil no banco de talentos |
| `perfil_icp` | `vendedor_b2b`, `sdr_bdr`, `closer`, `consultor`, `nao_declarado` | C3 (declaração), C10 (cadastro), formulário do Gatilho B | Banco de talentos |
| `propostas_30d` | `0`, `1_3`, `4_7`, `8_mais`, `nao_respondeu` | C5 | Gatilho B |
| `fechadas_30d` | `0`, `1`, `2_3`, `4_mais`, `nao_respondeu` | C5 | Gatilho B |
| `minicurso_concluido_em` | Data ou vazio | Evento `F2_minicurso_concluido` | Gatilho B |
| `nidflow_projeto_completo_em` | Data ou vazio | Evento `projeto_completo` (M3) do NIDflow | Gatilho B |
| `nidflow_apresentacao_em` | Data ou vazio | Evento `apresentacao_aberta` ou `pdf_exportado` (M4) | Gatilho B (reforço) |
| `apresentacao_confirmada` | `apresentou`, `aprovada`, `ainda_nao`, `nao_respondeu` | C6 | Gatilho B (reforço) |
| `projeto_avaliado_em`, `avaliacao_dominio`, `avaliador` | Data; `aprovado`, `parcial`, `reprovado`; nome interno | C9, C10 | Gatilho B (critério 4 do brief) |
| `gatilho_a_status` | `nenhum`, `pendente`, `etiquetado`, `convidado`, `agendado`, `realizado`, `cliente`, `sem_resposta`, `sem_interesse` | Orquestrador + humano | Fluxo da seção 4 |
| `gatilho_b_status` | `nenhum`, `candidato`, `etiquetado`, `convidado`, `no_banco`, `recusou`, `entrevistado` | Orquestrador + humano | Fluxo da seção 5 |

Dado que nunca entra na base: CPF, dados de pagamento, conteúdo dos projetos do NIDflow, texto livre de conversa além do `cargo_declarado`.

---

## 4. Gatilho A · Decisor → sessão de arquitetura gratuita (Funil 1)

### 4.1 Regras objetivas de pontuação

O brief define três critérios e diz "qualquer um". A pontuação abaixo traduz isso em regra de máquina: qualquer critério direto vale 100 pontos e etiqueta na hora; sinais parciais somam e só abrem uma pendência (o sistema volta a perguntar), nunca etiquetam sozinhos.

| Regra | Condição registrada | Pontos | Efeito |
|---|---|---|---|
| A1 (critério do brief: decisor declarado) | `vende_para = propria` **e** `decide_contratacao = sim` | 100 | Etiqueta `F2-gatilho-A` |
| A2 (critério do brief: empresa própria com time comercial) | `empresa_com_time_comercial = sim` declarado pela pessoa (agente, e-mail ou suporte) | 100 | Etiqueta `F2-gatilho-A` |
| A3 (critério do brief: cargo com poder de contratar) | `cargo_declarado` contém sócio, sócia, dono, dona, proprietário, proprietária, fundador, fundadora, CEO, diretor, diretora, gerente comercial, gerente de marketing, gerente de vendas, head de vendas, head comercial, head de marketing, **e** `vende_para = propria` | 100 | Etiqueta `F2-gatilho-A` |
| A4 (critério do brief: pergunta sobre contratar a NID) | `perguntou_sobre_contratar_nid = true` (intenção `decisor_funil1` no agente, resposta ao e-mail de entrega, pedido no suporte) | 100 | Etiqueta `F2-gatilho-A` |
| A5 (sinal parcial) | `vende_para = propria` e `decide_contratacao = nao_respondeu` | 40 | `gatilho_a_status = pendente`; P2 volta no próximo ponto de coleta |
| A6 (sinal parcial) | `cargo_declarado` com gerente, coordenador ou coordenadora sem a palavra comercial, marketing ou vendas, e `vende_para = propria` | 30 | `pendente`; o agente pergunta P2 na próxima conversa |
| A7 (sinal parcial) | `o_que_vende = consultoria` ou `projeto_sob_medida` e `vende_para = propria` | 10 | Só contexto; nunca abre pendência sozinho |
| Bloqueio | `vende_para = propria` e `decide_contratacao = nao` | 0 | Sem gatilho, sem pendência. A pessoa é ICP do Funil 2 (Perfil 4 sem poder de contratação) |
| Bloqueio | `vende_para = terceiro` | 0 | Sem gatilho. Só A2 ou A4 registrados depois podem reabrir |

Regras:

- Etiqueta com 100 pontos ou mais. Entre 30 e 99, `pendente`. Abaixo de 30, `nenhum`.
- A pontuação é recalculada a cada evento de qualificação. Etiqueta aplicada não é removida por resposta posterior; se a pessoa se corrigir ("não, eu não decido"), o humano registra `sem_interesse` ou ajusta o status; a etiqueta fica para histórico.
- Quem já está `cliente` (Funil 1) não gera tarefa nova.
- A lista de cargos de A3 fica em configuração do orquestrador, não no código; o coordenador acrescenta termos com base nos casos reais.

### 4.2 O que acontece na hora em que a etiqueta é aplicada

| Passo | Responsável | Tempo | O que acontece |
|---|---|---|---|
| 1 | Orquestrador | Imediato | Aplica `F2-gatilho-A`, grava `gatilho_a_status = etiquetado`, evento `F2_gatilho_a_aplicado` com a regra que disparou (A1 a A4), a fonte e a data |
| 2 | Orquestrador | Até 1 min | Cria a tarefa **`F2 · Gatilho A · {nome}`** na lista `F2 · Gatilho A` do ClickUp com prazo de 24 horas corridas, responsável padrão definido pelo coordenador, prioridade alta, e os campos: nome, e-mail, telefone (se houver), canal preferido (WhatsApp se houver telefone e sem opt-out; senão e-mail), produtos comprados, respostas de qualificação com fonte, `cargo_declarado`, `o_que_vende`, origem e UTMs, resumo das últimas 5 mensagens com o agente (se houver) e a regra que disparou |
| 3 | Orquestrador | Até 1 min | Notifica o time no WhatsApp interno e por e-mail: "Decisor etiquetado: {nome}. Prazo do convite: {data e hora}. Tarefa: {link}" |
| 4 | Orquestrador | Imediato | Pausa o WhatsApp automático do contato enquanto a tarefa estiver aberta (o número fica com o humano). E-mails de sequência continuam (`02`, seção 7). A oferta do NIDflow em D+7 continua (é a ferramenta da própria pessoa; não conflita com a sessão) |
| 5 | Humano | Dentro de 24 h | Lê o contexto, envia o convite pessoal **CA1** (WhatsApp) ou **CA1e** (e-mail) assinado "Henrique Leite, sócio da NID", e marca a tarefa como `convidado` com data e hora. Se o Henrique não for quem envia, o texto continua assinado por ele e a pessoa que envia opera a conta em nome dele (decisão registrada abaixo) |
| 6 | Pessoa | | Responde com dia e horário, ou não responde |
| 7 | Humano | Até 1 dia útil após a resposta | Agenda a sessão de arquitetura (agenda do Funil 1, nome a confirmar pelo Henrique), grava `agendado` com a data. A partir daqui o contato entra no processo do Funil 1 (CRM do Funil 1), e o Funil 2 só registra o resultado |
| 8 | Humano | Após a sessão | Grava `realizado` e, se houver contrato, `cliente` (etiqueta `F2-funil1-cliente`). Se não houver interesse, `sem_interesse` |

Ordem obrigatória: a entrega (E0 e W0) sai antes do convite. Nada de convite antes de a pessoa ter o playbook na mão. Janela recomendada para o convite: entre 2 e 24 horas após a compra, em horário comercial (segunda a sexta, 9h às 18h; sábado até 13h). Compra entre sábado 13h e domingo: o convite sai na segunda até as 10h e a tarefa registra a exceção (única situação em que o prazo de 24 horas corridas não vale).

### 4.3 Se a pessoa não responder ao convite

| Momento | Ação | Responsável | Canal |
|---|---|---|---|
| 3 dias úteis sem resposta ao CA1 | Um lembrete pessoal (**CA2**), curto, no mesmo canal | Humano | O mesmo do CA1 |
| 3 dias úteis sem resposta ao CA2 | Encerra a tarefa como `sem_resposta`. Contato volta ao fluxo normal do Funil 2 (WhatsApp automático religado). Etiqueta `F2-gatilho-A` permanece | Humano | Nenhum |
| Resposta depois do encerramento | O agente detecta a intenção `decisor_funil1` (ou a pessoa responde ao e-mail) e a tarefa reabre com prazo de 24 horas | Orquestrador → humano | O da resposta |
| 60 dias após `sem_resposta` | Um único e-mail de retomada (**CA3**), assinado pela NID (não pelo Henrique), com o mesmo convite. Sem resposta, nada mais automático | Orquestrador | E-mail |

Limite de contato humano por decisor: 3 toques (CA1, CA2 e, 60 dias depois, CA3). Sem quarto toque automático; só se a pessoa procurar.

### 4.4 Escalonamento quando o humano não cumpre o prazo

| Situação | Ação |
|---|---|
| Tarefa aberta há 20 horas sem `convidado` | Orquestrador manda lembrete ao responsável e ao coordenador |
| 24 horas sem `convidado` | Alerta ao coordenador; o agente de IA, se a conversa estiver aberta no direct ou no WhatsApp, envia uma única mensagem de desculpa com promessa de retorno no próximo dia útil (`01`, estado S7). Nada mais automático |
| 48 horas sem `convidado` | Alerta ao Henrique; a tarefa muda de responsável para ele |
| Métrica semanal | Percentual de tarefas do Gatilho A com convite em até 24 horas (meta operacional: 100%) |

### 4.5 O que muda no Funil 2 depois do Gatilho A

| Resultado | Efeito nas automações do Funil 2 |
|---|---|
| `agendado` ou `realizado` sem contrato | Nada muda: sequências, oferta do NIDflow e conteúdo contínuo seguem. O Gatilho B, se existir, espera 7 dias depois do encerramento da tarefa A (seção 6) |
| `cliente` (contrato do Funil 1) | Ofertas automáticas do Funil 2 param (mini curso avulso, NIDflow em D+7 se ainda não disparou, lançamento da Plataforma NID). A pessoa continua recebendo só o conteúdo contínuo. Acesso ao que já comprou não muda. O relacionamento passa a ser consultivo, conduzido pelo Funil 1. Se o cliente pedir o NIDflow ou a Plataforma, o humano do Funil 1 trata (decisão deste documento, fora do brief) |
| `sem_interesse` | Nada muda no Funil 2. Etiqueta permanece para histórico; nenhuma abordagem nova do Funil 1 por 6 meses, salvo pedido da pessoa |
| `sem_resposta` | Nada muda no Funil 2 além do CA3 em 60 dias |

---

## 5. Gatilho B · Talento → banco de talentos da terceirização

### 5.1 Critérios (todos, conforme o brief) e tradução objetiva

| # | Critério do brief | Como é registrado | Regra de máquina |
|---|---|---|---|
| B1 | Concluiu o mini curso | `F2_minicurso_concluido` (evento da área de membros ou botão da última aula) | `minicurso_concluido_em` preenchido |
| B2 | Desenhou pelo menos um projeto no NIDflow **ou** enviou um projeto desenhado com os templates | `projeto_completo` (M3) do NIDflow **ou** `F2_projeto_avaliado` com projeto recebido pelo formulário | `nidflow_projeto_completo_em` preenchido **ou** `projeto_avaliado_em` preenchido |
| B3 | Declara fechar vendas com regularidade (P4) | `propostas_30d` e `fechadas_30d` (e-mail B4 ou formulário) | `propostas_30d` em {`4_7`, `8_mais`} **e** `fechadas_30d` em {`2_3`, `4_mais`} |
| B4 | Demonstra domínio do método em interação (comunidade, encontro ou avaliação enviada) | `avaliacao_dominio = aprovado` registrado por humano da NID (C9 ou C10) | `avaliacao_dominio = aprovado` |

Reforços (não substituem critério; entram no perfil do banco): `apresentacao_confirmada = aprovada` (C6), M4 no NIDflow, `perfil_icp` em {`sdr_bdr`, `closer`, `vendedor_b2b`}.

Os limiares de B3 (pelo menos 4 propostas apresentadas e pelo menos 2 fechadas em 30 dias) são decisão deste documento; o brief pede "regularidade" sem número. **Ponto para aprovação do Henrique**, que conhece a régua da vertical de terceirização.

### 5.2 Pontuação e estados

| Estado | Condição | Efeito |
|---|---|---|
| `nenhum` | Menos de 3 critérios | Nada |
| `candidato` | 3 dos 4 critérios registrados | Etiqueta `F2-gatilho-B-candidato`. O orquestrador dispara **uma única vez** a mensagem que pede o critério que falta (seção 5.4): se falta B4, convite para enviar um projeto para avaliação (**CB0**); se falta B3, P4 por e-mail; se falta B2, lembrete de que o NIDflow ou os templates completam o perfil (sem oferta, sem preço; se a pessoa não assina o NIDflow, o caminho é enviar o projeto nos templates) |
| `etiquetado` | 4 de 4 | Etiqueta `F2-gatilho-B`; evento `F2_gatilho_b_aplicado`; tarefa `F2 · Gatilho B · {nome}` na lista `F2 · Banco de talentos` do ClickUp, prazo de 3 dias úteis, prioridade normal |
| `convidado` | Humano enviou o convite **CB1** | Registro de data |
| `no_banco` | A pessoa respondeu ao formulário do banco de talentos (opt-in explícito) | Etiqueta `F2-banco-talentos`. Perfil completo no banco (seção 5.3) |
| `recusou` | A pessoa declinou ou não respondeu a CB1 e CB2 | Sem nova abordagem automática. Reabertura só por pedido da pessoa ou por vaga real (humano) |
| `entrevistado` | Registro do humano quando houve vaga e entrevista | Sai da operação do Funil 2; passa ao processo de contratação da NID |

Regras:

- `F2-gatilho-B` marca que os critérios foram cumpridos. `F2-banco-talentos` marca que a pessoa aceitou entrar. São etiquetas diferentes porque a entrada no banco é um tratamento de dados com finalidade nova (recrutamento) e precisa de consentimento explícito (LGPD).
- Nenhuma mensagem do Gatilho B promete vaga, prazo ou remuneração. O texto diz o que o brief diz: "convite para entrevista quando houver vaga".
- Máximo de toques: CB0 (se candidato), CB1 e CB2. Depois, silêncio até vaga real.

### 5.3 O que fica registrado no banco de talentos

Lista `F2 · Banco de talentos` no ClickUp (uma tarefa por pessoa, status conforme 5.2), com os campos: nome, e-mail, telefone, cidade e estado (perguntados no formulário), `perfil_icp`, `o_que_vende`, segmento em que vende (formulário), `propostas_30d` e `fechadas_30d`, link ou PDF do projeto avaliado, `avaliacao_dominio` e nome do avaliador, disponibilidade declarada (formulário: `imediata`, `30_dias`, `so_conversar`), modalidade (formulário: `remoto`, `presencial_sbc`, `ambos`), data de entrada, consentimento (data e versão do texto). Nenhum dado além desses.

Retenção: 24 meses a partir do consentimento; depois, exclusão ou renovação do consentimento por e-mail único. Pedido de saída atendido em até 15 dias.

### 5.4 Como B4 (domínio do método) é avaliado antes de existir a Plataforma NID

Até o Sprint 6 não há comunidade nem encontro. O caminho é a avaliação enviada:

1. Quem é `candidato` sem B4 recebe **CB0**: convite para enviar um projeto desenhado com os templates (link de projeto do NIDflow, PDF exportado ou os templates preenchidos) por um formulário da NID (skill `nid-pages`).
2. Um humano da NID avalia com o checklist do capítulo 9 do playbook ("proposta pronta para apresentar"): `aprovado` quando pelo menos 80% dos itens estão atendidos e a ordem do método está respeitada (valor antes do investimento); `parcial` entre 50% e 79%; `reprovado` abaixo disso. Prazo: 5 dias úteis. A pessoa recebe uma devolutiva de três linhas assinada pela NID, qualquer que seja o resultado (é o único retorno prometido).
3. `parcial` ou `reprovado`: a pessoa pode enviar de novo depois de 30 dias, uma vez. O orquestrador não insiste.

Quem avalia e o limiar de 80% são decisões deste documento. **Ponto para aprovação do Henrique.**

---

## 6. Quem recebe os dois gatilhos

Regra do brief: uma pessoa pode receber os dois; o Gatilho A tem prioridade de abordagem.

| Situação | Regra |
|---|---|
| `F2-gatilho-A` e `F2-gatilho-B` ao mesmo tempo | A tarefa A é criada e conduzida primeiro. A tarefa B fica em espera (`status = etiquetado`, sem convite) até a tarefa A ser encerrada (`agendado`, `realizado`, `sem_resposta` ou `sem_interesse`) **e** passar um intervalo mínimo de 7 dias desde o último toque humano do A |
| A terminou em `cliente` | O convite B **não** é enviado: a pessoa contratou a NID como decisor; convidá-la para o banco de talentos da terceirização seria contraditório. A etiqueta `F2-gatilho-B` permanece para histórico. Se a própria pessoa pedir, o humano do Funil 1 trata |
| A terminou em `sem_interesse` ou `sem_resposta` | O convite B segue normalmente após o intervalo de 7 dias |
| B já estava `no_banco` quando A disparou | A tarefa A é criada normalmente. O humano vê no contexto que a pessoa está no banco de talentos e adapta o convite (a sessão de arquitetura é para a empresa dela; o banco continua valendo) |
| Os dois no mesmo dia, mesma pessoa, mesmo canal | Só uma mensagem humana por dia por contato. A do A vai primeiro |

Toda mensagem do A e do B é humana (o agente de IA não convida). O orquestrador só cria tarefa, pausa automações e registra.

---

## 7. Como a base fica etiquetada

Etiquetas desta etapa (lista completa de todas as etiquetas do Funil 2 no `05-integracoes.md`, seção 7):

| Etiqueta | Quando é aplicada | Quem aplica | Quando é removida |
|---|---|---|---|
| `F2-gatilho-A` | 100 pontos ou mais na seção 4.1 | Orquestrador | Nunca (histórico). O status em `gatilho_a_status` diz onde a pessoa está |
| `F2-gatilho-A-pendente` | 30 a 99 pontos | Orquestrador | Ao virar `F2-gatilho-A` ou ao registrar `decide_contratacao = nao` |
| `F2-funil1-cliente` | Contrato do Funil 1 registrado pelo humano | Humano | Ao fim do contrato, pelo humano (a pessoa volta às ofertas do Funil 2) |
| `F2-gatilho-B-candidato` | 3 dos 4 critérios | Orquestrador | Ao virar `F2-gatilho-B` |
| `F2-gatilho-B` | 4 de 4 critérios | Orquestrador | Nunca (histórico) |
| `F2-banco-talentos` | Opt-in no formulário do banco | Orquestrador (formulário) | A pedido da pessoa ou ao fim da retenção de 24 meses |

Campos de status (`gatilho_a_status`, `gatilho_b_status`) carregam o estágio; etiquetas carregam o fato. Relatórios usam os dois.

Métricas do brief (9.2) que saem daqui, com as adições do parecer (9.2 ajustada):

- Percentual da base com `F2-gatilho-A` e com `F2-gatilho-B` (meta operacional do parecer, 3.5: pelo menos 5% dos compradores etiquetados como decisores; abaixo disso, o problema é a pergunta, não o público).
- Sessões de arquitetura agendadas a partir do Gatilho A; contratos originados.
- Custo por decisor etiquetado e custo por contrato do Funil 1 originado no Funil 2 (mídia do `trafego` dividida pelos contadores acima).
- Tempo médio entre a etiqueta A e o convite; percentual dentro de 24 horas.
- Percentual de `nao_respondeu` em P1 após D+6 (mede a fricção da página de obrigado).

---

## 8. Rascunhos funcionais das mensagens de convite

> **Rascunho funcional.** Estrutura, argumento e CTA definidos aqui; a versão final é do agente `copy`. Regras fixas: assinatura "Henrique Leite, sócio da NID" em CA1, CA1e, CA2 e CB1 (única exceção do brief à assinatura "NID", seção 10.5); nada de "mentor", "especialista", "aprenda comigo"; nenhum preço, prazo ou escopo do Funil 1; nenhuma promessa de vaga; um único CTA por mensagem; sem travessão; no máximo um emoji em WhatsApp, nenhum em e-mail. O nome da primeira reunião do Funil 1 ("sessão de arquitetura gratuita") é o do brief até o Henrique confirmar.

### 8.1 Gatilho A

| Código | Canal | Momento | Estrutura (arco do método) | CTA único |
|---|---|---|---|---|
| CA1 | WhatsApp (humano, número da NID) | Até 24 h após a etiqueta, em horário comercial, depois da entrega | Abertura pessoal: "Aqui é o Henrique, sócio da NID. Vi que você pegou o playbook e que vende para a sua própria empresa." Dor (uma linha): quem desenha projeto para os clientes costuma deixar o próprio projeto comercial sem desenho. Solução: a NID desenha o projeto comercial de empresas (geração de demanda, automação comercial com IA, terceirização de BDR, SDR e closer) com o mesmo método do playbook. Arquitetura: a sessão de arquitetura gratuita, uma conversa de cerca de uma hora em que a gente desenha o seu projeto comercial na tela, sem compromisso. Valor: você sai com o desenho, contrate ou não. Pergunta final: "Qual dia e horário ficam bons para você esta semana ou na próxima?" | Responder com dia e horário |
| CA1e | E-mail (humano, remetente com nome "Henrique Leite, sócio da NID", endereço da NID) | Mesmo momento, para quem não tem telefone ou tem opt-out de WhatsApp | Assunto: "O projeto comercial da sua empresa". Mesmo arco de CA1 em até 8 linhas. Um botão: "Escolher um horário para a sessão de arquitetura" (link da agenda do Funil 1) | Link da agenda |
| CA2 | Mesmo canal de CA1 | 3 dias úteis sem resposta | Duas linhas: retoma o convite sem cobrar ("Se fizer sentido, é só me dizer um horário; se não for o momento, sem problema"). Sem argumento novo | Responder com dia e horário (ou link da agenda no e-mail) |
| CA3 | E-mail (automático, remetente "NID") | 60 dias após `sem_resposta` | Assunto: "A sessão de arquitetura continua aberta". Quatro linhas: lembra o que é a sessão, que é gratuita, e que basta escolher um horário. Assinatura "Equipe NID" | Link da agenda |

Contexto que o humano adapta em CA1 (uma frase, no máximo): o que a pessoa disse ao agente (por exemplo, "você comentou que quer automatizar o atendimento") ou o produto que comprou (playbook com ou sem as aulas). Nada inventado.

### 8.2 Gatilho B

| Código | Canal | Momento | Estrutura | CTA único |
|---|---|---|---|---|
| CB0 | E-mail (automático, remetente "NID") | Ao virar `candidato` sem B4 | Assunto: "Mande um projeto desenhado para a gente avaliar". Reconhece o que a pessoa já fez (aulas concluídas, propostas apresentadas), com base nos registros. Convite: envie um projeto desenhado com os templates (link do NIDflow, PDF ou templates preenchidos); a NID avalia com o checklist do playbook e devolve um parecer de três linhas em até 5 dias úteis. Sem menção ao banco de talentos ainda (o critério precisa ser cumprido antes do convite) | "Enviar meu projeto para avaliação" (formulário) |
| CB1 | E-mail (humano, remetente "Henrique Leite, sócio da NID") | Até 3 dias úteis após `F2-gatilho-B` (respeitando a seção 6) | Assunto: "Um convite da NID". Abertura: "Aqui é o Henrique, sócio da NID." Contexto registrado: concluiu as aulas, desenhou e apresentou projetos com o método, o projeto avaliado ficou pronto para apresentar. Solução: a NID terceiriza BDR, SDR e closer para empresas, e monta o time com gente que domina o método. Arquitetura: o banco de talentos: um cadastro curto; quando abre vaga compatível, a NID chama para entrevista. Valor: sem promessa de vaga nem de prazo; a vantagem é ser chamado primeiro, por quem já viu o seu trabalho. Convite direto | "Quero entrar no banco de talentos" (formulário com consentimento) |
| CB2 | E-mail (humano ou automático, remetente "NID") | 7 dias sem resposta a CB1 | Assunto: "O convite da NID continua de pé". Três linhas. Última mensagem sobre o banco | Mesmo link do formulário |
| CB3 | E-mail ou WhatsApp (humano) | Só quando houver vaga real | Convite para entrevista com data. Texto do humano, fora do escopo deste documento | Confirmar a entrevista |

Formulário do banco de talentos (skill `nid-pages`): nome, e-mail, telefone, cidade e estado, `perfil_icp`, segmento em que vende, disponibilidade, modalidade, link ou arquivo do projeto (se ainda não enviado), checkbox de consentimento com a finalidade escrita ("usar estes dados para contato sobre vagas de BDR, SDR e closer da NID, por até 24 meses"). Um clique para enviar.

---

## 9. LGPD e regras de conduta

1. Finalidade declarada em cada ponto de coleta em uma linha: na página de obrigado, "para a gente te orientar melhor" (o texto final é do `copy`); no formulário do banco, a finalidade de recrutamento.
2. Base legal: legítimo interesse para a qualificação (perguntas sobre o contexto de venda, dentro da relação com o comprador); consentimento para o banco de talentos.
3. Respostas ficam ligadas ao contato pelo tempo em que ele estiver na base; pedido de exclusão atendido em até 15 dias, em todos os sistemas (base do orquestrador, ClickUp, planilha de acompanhamento, ferramenta de e-mail).
4. Ninguém da NID recebe as respostas fora das tarefas do ClickUp e dos relatórios agregados.
5. Opt-out de e-mail ou de WhatsApp não bloqueia o convite humano do Gatilho A pelo outro canal, mas bloqueia o canal em que foi pedido. Opt-out nos dois canais: o humano não aborda; a tarefa é encerrada como `sem_resposta` com a observação "opt-out total".
6. O agente de IA nunca convida para o Funil 1 nem para o banco. Ele registra, avisa que uma pessoa do time vai continuar e para (`01`, estado S7).

---

## 10. Checklist de aceite

- [ ] Compra de teste, resposta "própria empresa" e "sim, eu decido" na página de obrigado: etiqueta `F2-gatilho-A` aplicada, tarefa criada no ClickUp com todos os campos e prazo de 24 horas, notificação ao time em menos de 1 minuto, WhatsApp automático pausado, e-mails da sequência mantidos.
- [ ] Compra de teste sem resposta: E1 traz os botões de P1; clique grava a resposta e abre P2; E5 só aparece se ainda `nao_respondeu`.
- [ ] Conversa de teste com o agente dizendo "tenho empresa e quero contratar vocês": regra A4, etiqueta, tarefa, mensagem de encaminhamento; o agente não vende o Funil 1.
- [ ] Assinante de teste do NIDflow respondendo P1 e P2 na tela de conclusão: evento `perfil_respondido` chega ao orquestrador e a pontuação é recalculada; quem já tinha respondido não vê as perguntas.
- [ ] Contato de teste com B1, B2 e B3 registrados e sem B4: etiqueta `F2-gatilho-B-candidato` e CB0 enviado uma única vez; avaliação `aprovado` registrada vira `F2-gatilho-B` e cria a tarefa do banco.
- [ ] Contato com A e B ao mesmo tempo: tarefa B só libera o convite após o encerramento da A e 7 dias de intervalo; A encerrada como `cliente` bloqueia CB1.
- [ ] Tarefa A sem convite em 20, 24 e 48 horas dispara os três alertas.
- [ ] Textos finais de CA1, CA1e, CA2, CA3, CB0, CB1 e CB2 pelo `copy` em `automacoes/sequencias/`, com assinatura "Henrique Leite, sócio da NID" onde indicado.
- [ ] Nome da primeira reunião do Funil 1 confirmado pelo Henrique e aplicado em todas as mensagens.
- [ ] Limiares de B3 (4 propostas, 2 fechadas) e de B4 (80% do checklist) aprovados pelo Henrique.
