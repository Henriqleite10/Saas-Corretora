# Entrega pós-compra do playbook e do mini curso (D0 a D+6)

| Campo | Valor |
|---|---|
| Versão | 1.0 (Sprint 4) |
| Autor | Agente `automacao` |
| Status | Entregue ao coordenador; um passo marcado como condicional aguarda aprovação do Henrique |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 5, 6.1 a 6.3, 8.1, 10) e decisões 1, 3 e 5 do coordenador com base em `docs/01-parecer-estrategico.md` |
| Mensagens | Todas as mensagens deste arquivo são **rascunho funcional**. A versão final é do agente `copy`, em `automacoes/sequencias/` |
| Plataforma de checkout | Cakto (recomendação do `05-integracoes.md`); os nomes de evento abaixo são os da Cakto, com o equivalente da Kiwify entre parênteses quando diferente |

---

## 1. Visão geral

Um comprador do playbook passa por quatro momentos em D0 e por uma sequência de ativação até D+6. Em D+7 entra na oferta do NIDflow (`03-oferta-nidflow-d7.md`). Em paralelo, a base é etiquetada e os gatilhos A e B rodam (`04-segmentacao-gatilhos.md`).

```
Pagamento aprovado (webhook purchase_approved)
        │
        ▼
Base: cria ou atualiza o contato, etiqueta F2-comprador-playbook (+ F2-bump se houver)
        │
        ▼
Página de obrigado da NID: 2 perguntas de qualificação (Gatilho A), 1 clique cada
        │
        ├── [CONDICIONAL: aguarda aprovação do Henrique] quem recusou o bump vê
        │   a oferta de um clique do mini curso a R$ 97 na página seguinte
        ▼
Entrega imediata: e-mail (até 2 min) + WhatsApp (até 2 min)
        │
        ▼
Sequência D+1 a D+6 (ramo A: sem mini curso · ramo B: com mini curso)
        │
        ▼
D+7: oferta do NIDflow (arquivo 03)
```

Três variantes de compra e dois caminhos de não compra:

| Situação | Gatilho | Ramo |
|---|---|---|
| Comprou o playbook sem o bump | `purchase_approved` com um item | Ramo A (ativação + oferta do mini curso a R$ 147) |
| Comprou o playbook com o bump | `purchase_approved` com dois itens (ou dois eventos com o mesmo pedido; a confirmar na plataforma) | Ramo B (ativação do playbook + ativação das aulas) |
| Comprou o mini curso avulso (depois, pela sequência ou pela página própria) | `purchase_approved` do produto mini curso, contato já `F2-comprador-playbook` | Sai do ramo A e entra no ramo B a partir do dia da compra; o D+7 do NIDflow continua contado da primeira compra |
| Abandonou o checkout | `checkout_abandonment` (Kiwify: `carrinho_abandonado`) | Recuperação de checkout (seção 6) |
| Gerou Pix ou boleto e não pagou | `pix_gerado` / `boleto_gerado` sem `purchase_approved` em 30 min | Lembrete de pagamento (seção 6) |
| Pagamento recusado | `purchase_refused` (Kiwify: `compra_recusada`) | Tentativa de novo (seção 6) |

---

## 2. D0 · Do pagamento à entrega (passo a passo)

| Passo | Responsável | Tempo | O que acontece | Se falhar |
|---|---|---|---|---|
| 1. Webhook | Plataforma de checkout → orquestrador | Até 1 min após a aprovação | `purchase_approved` com id do pedido, e-mail, nome, telefone, produtos, valor, UTMs do checkout. O orquestrador valida o segredo do webhook e é idempotente por id do pedido + tipo de evento | Webhook não chega em 5 min: rotina de conciliação consulta a API da plataforma a cada 15 min e processa pedidos aprovados sem evento. Alerta ao coordenador se houver mais de 3 por dia |
| 2. Base | Orquestrador | Imediato | Cria ou atualiza o contato (chave: e-mail; telefone como chave secundária), grava origem e UTMs, aplica `F2-comprador-playbook` e, se houver, `F2-bump`. Une com o registro do direct ou do WhatsApp quando o e-mail ou o telefone bate | |
| 3. Página de obrigado | Plataforma redireciona para a página da NID | Imediato | A plataforma redireciona para a página de obrigado construída pela NID (skill `nid-pages`), com o id do pedido na URL. A página mostra: confirmação da compra, aviso de que o acesso já está chegando por e-mail e WhatsApp, e as **duas perguntas de qualificação** (seção 3) | Se a plataforma não permitir redirecionar com o id do pedido, a página identifica pelo e-mail digitado em um campo único. Se a pessoa fechar a página sem responder, as perguntas voltam no e-mail D+1 e no agente (seção 3.3) |
| 4. [CONDICIONAL] Oferta de um clique | Plataforma | Imediato, antes da página de obrigado | **[CONDICIONAL: aguarda aprovação do Henrique]** Só para quem recusou o bump: página de upsell nativa da plataforma com o mini curso a R$ 97, aceito com um clique (cartão já salvo) ou com Pix novo. Aceite gera `purchase_approved` do mini curso e o contato entra no ramo B. Recusa leva à página de obrigado. Sem a aprovação, o passo não existe e a plataforma redireciona direto para a página de obrigado | Se o pagamento do upsell for recusado, nada muda: a pessoa segue no ramo A e recebe a oferta do mini curso a R$ 147 pela sequência |
| 5. Nota fiscal | Emissor integrado (Notazz ou eNotas) | Até 24 h | Emissão automática a partir do mesmo webhook. Não bloqueia a entrega | Falha de emissão gera tarefa `F2 · Financeiro` |
| 6. Acesso | Plataforma (área de membros) + orquestrador | Até 2 min | A plataforma libera o produto na área de membros (playbook em PDF e templates para download; aulas do mini curso quando houver). O orquestrador dispara o **e-mail E0** com o link da área de membros e os links diretos de download, e o **WhatsApp W0** com o link da área de membros | E-mail devolvido (bounce): WhatsApp W0b pede confirmação de e-mail; humano corrige na plataforma |
| 7. Fila de sequência | Orquestrador | Imediato | Agenda a sequência do ramo A ou B e a oferta do NIDflow para D+7 (contado da data e hora da primeira compra, em dias corridos) | |

Regra de canal na entrega: o e-mail é o canal principal (carrega os arquivos); o WhatsApp é o espelho curto com o link. Os dois saem em qualquer horário porque são transacionais (categoria utilidade no WhatsApp).

---

## 3. Perguntas de qualificação no D0 (página de obrigado)

Decisão 1 do coordenador: as duas perguntas do Gatilho A são feitas no D0, antes da entrega, na página de obrigado (ou em campo do checkout, se a plataforma permitir).

### 3.1 Comportamento da página

| Elemento | Regra |
|---|---|
| Ordem na tela | 1) Confirmação da compra e aviso "o acesso já está chegando no seu e-mail e no seu WhatsApp"; 2) pergunta 1; 3) pergunta 2 (aparece só se a resposta 1 for "própria empresa"); 4) botão "Ir para o meu acesso" (link da área de membros) |
| Pergunta 1 | "Você vende para a sua própria empresa ou para a empresa de outra pessoa?" Duas opções de um clique: "Para a minha própria empresa" / "Para a empresa de outra pessoa" |
| Pergunta 2 | "Você decide contratações de marketing ou vendas na sua empresa?" Duas opções: "Sim, eu decido" / "Não, outra pessoa decide" |
| Gravação | Cada clique grava na hora (sem botão "enviar"), com o id do pedido, em `vende_para` e `decide_contratacao` na base. Evento `F2_qualificacao_respondida` |
| Pular | A pessoa pode ir para o acesso sem responder. Fica `nao_respondeu` |
| Tempo | Página carrega em menos de 2 segundos; sem vídeo, sem formulário longo. Zero fricção além dos dois cliques |
| Gatilho A | Resposta 1 "própria" e resposta 2 "sim" aplica `F2-gatilho-A` na hora e cria a tarefa humana de 24 h (detalhe no `04`) |
| Campo no checkout (alternativa) | Se a plataforma permitir campo personalizado no checkout com opções fixas, a pergunta 1 pode ir lá e a pergunta 2 fica na página de obrigado. A confirmar na validação técnica (`05`). Até lá, as duas ficam na página de obrigado |

### 3.2 Rascunho funcional da página de obrigado

> **Rascunho funcional.** O `copy` escreve a versão final da página. Estrutura e regras são deste arquivo.

| Bloco | Conteúdo funcional |
|---|---|
| Título | Compra confirmada. O seu Playbook NID · Desenhe para Vender já está a caminho |
| Linha de apoio | Em até 2 minutos o acesso chega no seu e-mail e no seu WhatsApp. Se não chegar, olhe a pasta de promoções ou fale com a gente pelo WhatsApp da NID |
| Pergunta 1 | Antes de ir, uma pergunta para a gente te orientar melhor: Você vende para a sua própria empresa ou para a empresa de outra pessoa? [Para a minha própria empresa] [Para a empresa de outra pessoa] |
| Pergunta 2 (condicional) | Você decide contratações de marketing ou vendas na sua empresa? [Sim, eu decido] [Não, outra pessoa decide] |
| CTA único | "Ir para o meu acesso" |
| Rodapé | 7 dias de garantia, reembolso sem pergunta. NID - Núcleo de Inteligência Digital LTDA |

### 3.3 Se a pessoa não respondeu na página

| Tentativa | Quando | Canal | Regra |
|---|---|---|---|
| 1 | E-mail D+1 (E1) | E-mail | Dois botões de um clique dentro do e-mail para a pergunta 1 (cada botão é um link que grava a resposta e abre uma página com a pergunta 2). Só aparece para quem está `nao_respondeu` |
| 2 | Agente de IA | Direct ou WhatsApp | Sempre que o comprador conversar com o agente e a base estiver `nao_respondeu`, o agente pergunta (seção 4.3 do `01`) |
| 3 | Onboarding do NIDflow | NIDflow | Passo 2 do onboarding (`02-onboarding.md` do `nidflow`) faz as mesmas perguntas para quem assinar |
| 4 | E-mail D+5 (E5) | E-mail | Última tentativa automática, com os mesmos botões. Depois disso, fica `nao_respondeu` até uma interação futura |

Nunca se supõe a resposta. Sem resposta registrada, não há Gatilho A.

---

## 4. Ramo A · Comprou o playbook sem o mini curso

Objetivo em duas partes: ativar (ler o playbook e preencher o primeiro template) e oferecer o mini curso a R$ 147, sem desconto (seção 6.3 do brief). Cada mensagem tem um único CTA.

| Código | Quando (dias corridos após a compra) | Horário de envio | Canal | Objetivo | Conteúdo funcional | CTA único | Condição de envio |
|---|---|---|---|---|---|---|---|
| E0 | D0, até 2 min | Qualquer hora (transacional) | E-mail | Entregar | Assunto "Seu acesso ao Playbook NID · Desenhe para Vender". Pagamento confirmado. Link da área de membros e links diretos do PDF e dos templates. Como ler: com a próxima proposta na cabeça; se tem proposta esta semana, capítulos 2 a 6. Aviso de que em alguns dias chega a apresentação do NIDflow. Rodapé com garantia e suporte | "Abrir o meu playbook" | Sempre |
| W0 | D0, até 2 min | Qualquer hora (utilidade) | WhatsApp (modelo) | Entregar | "Aqui é a NID. Seu Playbook NID · Desenhe para Vender está liberado: {link}. O e-mail com os templates também já foi. Se precisar de algo, é só responder por aqui." | Link da área de membros | Sempre que houver telefone. Modelo de utilidade aprovado |
| W0b | D0, 15 min após E0 devolvido | Qualquer hora | WhatsApp | Corrigir e-mail | "O e-mail {email_mascarado} devolveu a mensagem. Qual e-mail a gente usa para o seu acesso?" O agente recebe a resposta e abre tarefa humana para corrigir na plataforma | Responder | Só se E0 tiver bounce |
| E1 | D+1 | 8h às 10h (Brasília) | E-mail | Ativar (ler) e qualificar | Assunto "Comece pelo canvas de dor". A leitura mais curta que funciona: capítulo 3 e o canvas de dor, com um cliente real na cabeça. A pergunta-guia da Dor em uma linha. Se `nao_respondeu`: bloco com a pergunta 1 em dois botões. Uma frase sobre as aulas (o mini curso começa onde o playbook termina), sem preço e sem link, para não criar segundo CTA | "Abrir o capítulo 3" (link direto no PDF) | Sempre |
| W2 | D+2 | 9h às 12h | WhatsApp (modelo) | Ativar (preencher) | "Você já preencheu o canvas de dor do seu próximo cliente? Se travar em 'quanto isso custa', o capítulo 3 tem a sequência de perguntas. Se quiser, responde aqui com a sua dúvida." | Responder (abre conversa com o agente) | Só se a pessoa não abriu a área de membros desde D0 (evento de primeiro acesso da plataforma) ou se a plataforma não informar acesso; neste segundo caso, envia para todos |
| E3 | D+3 | 8h às 10h | E-mail | Oferecer o mini curso (dor) | Assunto "Desenhar resolve metade". Dor: o projeto desenhado no papel e a reunião que trava na hora de apresentar; "está caro", "vou pensar", "preciso levar para o comitê". Solução: as aulas em que a NID mostra como apresenta e vende o projeto desenhado. Arquitetura resumida (aulas, slides, roteiro de apresentação, checklist de reunião, modelo de proposta). Valor: R$ 147, 7 dias de garantia. Sem desconto | "Quero as aulas por R$ 147" (link da página do mini curso com UTM) | Contato sem `F2-minicurso` |
| W4 | D+4 | 9h às 12h | WhatsApp (modelo, marketing) | Oferecer o mini curso (prova de mecanismo) | Três linhas: a proposta pronta não fecha sozinha; a reunião tem sequência; nas aulas a NID mostra a sequência que usa. Link | Link da página do mini curso | Contato sem `F2-minicurso`; sem opt-out de WhatsApp |
| E5 | D+5 | 8h às 10h | E-mail | Oferecer o mini curso (objeção) e última chance de qualificação | Assunto "'Já sei vender, o problema é o cliente'". Responde a objeção principal do ICP com o mecanismo (o que fica na mesa do cliente depois da reunião). Objeção 2: "não tenho tempo" (aulas curtas, no seu ritmo). R$ 147, garantia. Se `nao_respondeu`: bloco com a pergunta 1 em dois botões, depois do CTA principal (o bloco é de um clique e não concorre com o CTA de venda: fica no rodapé como pergunta de cadastro) | "Quero as aulas por R$ 147" | Contato sem `F2-minicurso` |
| E6 | D+6 | 8h às 10h | E-mail | Fechar a oferta do mini curso e preparar o D+7 | Assunto "Amanhã a gente te mostra a ferramenta". Última mensagem sobre as aulas nesta sequência: o link continua valendo, o preço é R$ 147, sem urgência falsa. Antecipa que amanhã chega o NIDflow em uso, sem preço e sem link | "Quero as aulas por R$ 147" | Contato sem `F2-minicurso` |

Depois de E6, o contato entra na oferta do NIDflow (D+7) e, a partir de D+15, no conteúdo contínuo. O mini curso volta a ser oferecido só dentro do conteúdo contínuo (uma menção por mês, no máximo) e ao fim da sequência do NIDflow para quem não assinou (D+16, e-mail único, seção 5 do `03`).

Saídas do ramo A:

| Evento | O que acontece |
|---|---|
| `purchase_approved` do mini curso | Cancela E3 a E6 pendentes; aplica `F2-minicurso`; entra no ramo B no dia da compra (B1 no dia seguinte). O D+7 do NIDflow não muda |
| `refund` (Kiwify: `compra_reembolsada`) ou `chargeback` do playbook | Cancela tudo; aplica `F2-reembolso`; nenhuma mensagem automática além da confirmação do reembolso enviada pela plataforma. Tarefa `F2 · Financeiro` para conferir |
| Opt-out de e-mail | Cancela os e-mails; WhatsApp continua se não houver opt-out do WhatsApp |
| Opt-out de WhatsApp | Cancela os WhatsApps; e-mails continuam |
| `F2-gatilho-A` com tarefa humana aberta | WhatsApp automático pausa até o humano encerrar a tarefa (o número fica com o humano); e-mails continuam |

---

## 5. Ramo B · Comprou o playbook com o mini curso (bump, upsell condicional ou avulso)

Objetivo: ativar o playbook e as aulas juntos, sem oferta de venda até D+7. A sequência é de uso, não de venda.

| Código | Quando | Horário | Canal | Objetivo | Conteúdo funcional | CTA único | Condição |
|---|---|---|---|---|---|---|---|
| E0 | D0, até 2 min | Qualquer hora | E-mail | Entregar os dois | Assunto "Seu acesso ao playbook e às aulas". Um único e-mail com o link da área de membros (playbook, templates e aulas no mesmo lugar). Ordem sugerida: ler os capítulos 2 a 6, preencher o canvas de dor, depois a aula 1 | "Abrir o meu acesso" | Sempre |
| W0 | D0, até 2 min | Qualquer hora | WhatsApp (modelo) | Entregar | "Aqui é a NID. Seu playbook e as aulas do mini curso estão liberados: {link}. Comece pelo playbook; as aulas começam onde ele termina." | Link | Telefone informado |
| E1 | D+1 | 8h às 10h | E-mail | Ativar o playbook e qualificar | Igual ao E1 do ramo A (capítulo 3 e canvas de dor; pergunta 1 se `nao_respondeu`) | "Abrir o capítulo 3" | Sempre |
| B1 | D+2 | 8h às 10h | E-mail | Ativar as aulas | Assunto "Aula 1: a reunião de apresentação". Uma frase sobre o que a aula 1 mostra (conforme `00-grade.md` do `roteiro`; até lá, "como a NID abre a reunião de apresentação do projeto"). Sugere assistir com a proposta que está desenhando aberta | "Assistir à aula 1" (link direto) | Se ainda não abriu a aula 1 (evento da área de membros) ou, sem esse evento, para todos |
| W3 | D+3 | 9h às 12h | WhatsApp (modelo) | Retomar quem não começou | "Você já abriu a aula 1? São poucos minutos e ela começa com a proposta na mão. Se travou em alguma coisa, responde aqui." | Responder | Só se não houver evento de aula assistida; se a plataforma não informar, não envia |
| B2 | D+4 | 8h às 10h | E-mail | Levar à metade das aulas | Assunto "As objeções que a NID ouve toda semana". Aponta a aula sobre objeções ("está caro", "vou pensar", "comitê"). Sugere anotar as objeções da última proposta perdida antes de assistir | "Assistir à aula de objeções" | Sempre |
| B3 | D+6 | 8h às 10h | E-mail | Concluir e preparar o D+7 | Assunto "Antes da próxima reunião". Checklist de reunião (material do mini curso) e roteiro de apresentação. Antecipa a ferramenta no dia seguinte, sem preço e sem link | "Abrir o checklist de reunião" | Sempre |
| B4 | Ao concluir 100% das aulas (evento da área de membros) ou ao clicar em "Concluí as aulas" na última aula | Até 10 min após o evento | E-mail | Registrar a conclusão e coletar o sinal do Gatilho B | Assunto "Você concluiu as aulas". Reconhece. Pergunta única de um clique: "Quantas propostas você apresentou nos últimos 30 dias e quantas fechou?" com faixas (0; 1 a 3; 4 a 7; 8 ou mais) para apresentadas e (0; 1; 2 a 3; 4 ou mais) para fechadas. Aplica `F2-minicurso-concluido` | "Responder em um clique" (as faixas são links) | Sempre que houver o evento de conclusão. Se a plataforma não emitir, o botão da última aula abre uma página da NID que grava a conclusão |

Saídas do ramo B: as mesmas do ramo A (reembolso, opt-out, Gatilho A). Reembolso só do mini curso: volta ao ramo A a partir do dia do reembolso, sem E3 a E6 (o mini curso não é reoferecido a quem acabou de devolver; volta só no conteúdo contínuo depois de 30 dias).

---

## 6. Não compra: recuperação de checkout, Pix pendente e pagamento recusado

Regras gerais: no máximo 3 toques por situação; a pessoa deu o contato no checkout e a plataforma coleta o consentimento de comunicação (confirmar na validação técnica); opt-out imediato; a primeira compra encerra tudo.

### 6.1 Abandono de checkout (`checkout_abandonment`; Kiwify: `carrinho_abandonado`)

Condição de entrada: e-mail ou telefone preenchido no checkout, sem `purchase_approved` em 30 minutos.

| Código | Quando | Horário | Canal | Conteúdo funcional | CTA único |
|---|---|---|---|---|---|
| R1 | 1 h após o abandono | 8h às 21h; fora disso, próximo horário válido | E-mail | Assunto "Seu playbook ficou no carrinho". Uma linha de dor (a próxima proposta), o que vem no playbook em três itens, R$ 29,90, 7 dias de garantia. Link de retorno ao checkout | "Quero o playbook por R$ 29,90" |
| R2 | 24 h após o abandono | 9h às 20h, seg. a sáb. | WhatsApp (modelo, marketing) | "Aqui é a NID. Você começou a comprar o Playbook NID · Desenhe para Vender e não concluiu. Se ficou alguma dúvida sobre o método, responde aqui que a gente explica. O link: {link}" | Link do checkout |
| R3 | 72 h após o abandono | 8h às 21h | E-mail | Assunto "A objeção que mais ouvimos". Responde "já sei vender, o problema é o cliente" com o mecanismo. Última mensagem; o link continua valendo. Sem urgência falsa | "Quero o playbook por R$ 29,90" |

Se a pessoa responder o WhatsApp R2, o agente assume (estado S1 com origem `sequencia:R2`). Depois de R3 sem compra: etiqueta `F2-checkout-abandonado`, entra na lista de conteúdo contínuo (só e-mail, com opt-out no rodapé) e não recebe mais WhatsApp automático.

### 6.2 Pix ou boleto gerado e não pago (`pix_gerado`, `boleto_gerado`)

| Código | Quando | Horário | Canal | Conteúdo funcional | CTA único |
|---|---|---|---|---|---|
| P1 | 30 min após gerar, sem pagamento | 8h às 22h | WhatsApp (modelo, utilidade) | "Seu Pix do Playbook NID está gerado e vale por {prazo}. Se preferir pagar no cartão, o link é o mesmo: {link}. Assim que aprovar, o acesso chega em 2 minutos." | Link do checkout |
| P2 | 24 h após gerar, sem pagamento (boleto: 48 h) | 8h às 21h | E-mail | Assunto "Seu acesso está esperando o pagamento". Repete o link e a garantia | "Concluir o pagamento" |

Pix expirado sem pagamento vira abandono de checkout (R2 e R3 seguem; R1 não, porque P1 já cumpriu esse papel).

### 6.3 Pagamento recusado (`purchase_refused`; Kiwify: `compra_recusada`)

| Código | Quando | Horário | Canal | Conteúdo funcional | CTA único |
|---|---|---|---|---|---|
| N1 | Até 5 min após a recusa | Qualquer hora | E-mail | Assunto "O pagamento não foi aprovado". Sem culpa: o cartão não aprovou. Sugere tentar outro cartão ou Pix. Link | "Tentar de novo" |
| N2 | 24 h após a recusa, sem compra | 9h às 20h | WhatsApp (modelo) | Uma linha com o link e a opção de Pix. Se responder, o agente atende | Link do checkout |

Depois de N2 sem compra: mesmo destino do abandono.

---

## 7. Regras de frequência, horário e opt-out desta etapa

| Regra | E-mail | WhatsApp |
|---|---|---|
| Máximo de mensagens automáticas por dia | 1 (transacional não conta) | 1 (transacional não conta) |
| Máximo por semana (D0 a D+6) | 5 | 3 |
| Horário de envio de sequência | 8h às 10h (Brasília), segunda a sábado; nada no domingo | 9h às 12h, segunda a sábado; nada no domingo |
| Transacional (entrega, acesso, pagamento) | Qualquer hora | Qualquer hora (modelos de utilidade) |
| Opt-out | Link de descadastro em todo e-mail; efeito imediato; confirmação em página simples | Palavras "parar", "sair", "não quero" ou o botão de opt-out do modelo; efeito imediato; confirmação em uma linha |
| Conflito de sequências | Se dois envios caírem no mesmo dia e canal (por exemplo, E3 e um lembrete do NIDflow), vale a ordem: transacional > entrega > oferta mais antiga. O outro vai para o próximo dia útil |
| Domingo | Envios agendados para domingo vão para segunda de manhã; os dias seguintes da sequência mantêm a distância relativa |
| Contato com tarefa humana aberta (Gatilho A, suporte, financeiro) | E-mail de sequência continua; WhatsApp automático pausa até a tarefa fechar |

---

## 8. Eventos gravados nesta etapa (nomes no `05-integracoes.md`)

`F2_compra_playbook`, `F2_bump_aceito`, `F2_upsell_aceito` (condicional), `F2_compra_minicurso`, `F2_qualificacao_respondida`, `F2_entrega_enviada`, `F2_primeiro_acesso_membros`, `F2_aula_assistida` (com número), `F2_minicurso_concluido`, `F2_propostas_30d_respondido`, `F2_checkout_abandonado`, `F2_pix_pendente`, `F2_pagamento_recusado`, `F2_reembolso`, `F2_optout_email`, `F2_optout_whatsapp`.

---

## 9. Checklist de aceite

- [ ] Compra de teste (playbook sem bump) na plataforma em modo de teste: webhook chega, contato criado com etiqueta, página de obrigado abre com o id do pedido, resposta às perguntas grava na base, E0 e W0 chegam em menos de 2 minutos.
- [ ] Compra de teste com bump: `F2-bump` aplicada, ramo B agendado, sem E3 a E6.
- [ ] Compra do mini curso em D+3 por quem estava no ramo A: E4 a E6 cancelados, ramo B iniciado, D+7 do NIDflow mantido.
- [ ] Reembolso de teste: todas as mensagens pendentes canceladas, `F2-reembolso` aplicada, tarefa financeira criada.
- [ ] Abandono de teste: R1, R2 e R3 nos tempos certos; compra no meio cancela o restante.
- [ ] Opt-out nos dois canais com efeito imediato.
- [ ] Nenhum envio no domingo; nenhum envio de sequência fora das janelas.
- [ ] Textos finais do `copy` em `automacoes/sequencias/` para todos os códigos (E0 a E6, W0 a W4, B1 a B4, R1 a R3, P1 e P2, N1 e N2).
- [ ] [CONDICIONAL] Se o Henrique aprovar o upsell de um clique: página configurada na plataforma, teste de aceite e de recusa, evento `F2_upsell_aceito` gravado. Se não aprovar: redirecionamento direto do checkout para a página de obrigado testado.
