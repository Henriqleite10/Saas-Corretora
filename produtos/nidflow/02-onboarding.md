# NIDflow · Onboarding do novo assinante

| Campo | Valor |
|---|---|
| Objetivo | Levar o assinante do e-mail de acesso ao primeiro projeto desenhado e apresentado em menos de 15 minutos |
| Versão | 1.0 (Sprint 4) |
| Status | Entregue ao coordenador |
| Seção 5 (mensagens) | **Rascunho funcional** para o agente `copy` finalizar. As demais seções são especificação de produto |
| Dependências | Itens B-02, B-03, B-05, B-06, B-08 e B-11 do `04-backlog-tecnico.md`; templates finais do agente `metodo` em `produtos/playbook/02-templates-fluxo.md` (ainda não publicado; este documento usa a definição canônica da seção 7 do brief) |

Princípio: o onboarding não é um tour de funcionalidades. É o primeiro projeto. Cada tela pede uma decisão do assinante sobre o projeto dele, nunca "veja o que a ferramenta faz".

---

## 1. O que o assinante já sabe ao chegar

Todo assinante do NIDflow vem do playbook ou do mini curso (oferta em D+7). Logo:

- Conhece o arco dor → solução → arquitetura → valor.
- Já viu os cinco templates no papel: canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor e roteiro de proposta.
- Provavelmente tem uma proposta em andamento (é o que a sequência D0 a D+6 pede: "preencha o primeiro template").

O onboarding aproveita isso: em vez de ensinar o método, pede o projeto real que a pessoa está tentando vender agora. A pergunta de abertura é "qual proposta você precisa apresentar esta semana?".

---

## 2. Os cinco templates dentro do NIDflow

Estrutura de cada template como requisito da ferramenta (B-05). Os campos abaixo são os que o agente `metodo` publicou em `produtos/playbook/01-playbook.md` (capítulos 3 a 6 e 8). As instruções de preenchimento e os exemplos preenchidos virão do `02-templates-fluxo.md`, ainda não publicado; quando sair, os textos da ferramenta são copiados de lá palavra por palavra.

| Template | Etapa do método | Campos na tela (iguais aos do playbook) | Saída que o assinante vê |
|---|---|---|---|
| Canvas de dor | 1. Dor | Cliente e interlocutor; situação atual; sintoma; custo (frequência × perda por ocorrência × valor unitário = custo por período); consequência; diagnóstico em uma frase | O diagnóstico em uma frase, montado a partir dos campos anteriores e editável: "Hoje, [o que acontece], o que custa [número] por [período], e se continuar assim [consequência]." |
| Mapa de solução | 2. Solução | Dor (copiada do canvas); causa; frase de solução ("Para [a dor parar], precisa existir [o que precisa mudar], de modo que [efeito]."); premissas (3 a 5); concordância (como o cliente reformulou e a data); o que a tese não é | A frase de solução em destaque, com as premissas abaixo, antes de qualquer entregável |
| Fluxo de arquitetura | 3. Arquitetura | Campos gerais: resultado final; primeiro resultado visível (etapa e semana); riscos do cliente respondidos. Por etapa: nome; objetivo; entra; sai (marco); componentes; responsável; prazo | O desenho: blocos em sequência com setas, marcos, responsáveis e prazos. O core da ferramenta |
| Tabela de valor | 4. Valor | Dor em número (copiada do canvas); unidade de medida; o que muda com o projeto; conta de equivalência; investimento (setup, mensalidade ou fases, ligado aos blocos da arquitetura); incluso e não incluso; comparação em uma frase; próximo passo | Ancoragem na régua da dor acima do investimento, próximo passo embaixo, sempre nessa ordem |
| Roteiro de proposta | Do desenho à proposta | As nove páginas do capítulo 8 do playbook, em ordem fixa: 1. Capa; 2. Dor; 3. Solução; 4. Arquitetura (desenho); 5. Arquitetura (entregáveis); 6. Arquitetura (respostas); 7. Valor; 8. Investimento; 9. Próximo passo. Páginas opcionais só depois da 9 | O modo de apresentação já nessa ordem, cada página puxando o conteúdo do template de origem, com notas do apresentador |

Regras de produto para os templates:

1. Um projeto novo nasce com os cinco templates já dentro, na ordem do método. O assinante não "escolhe template": ele abre o projeto e preenche.
2. Os campos que se repetem (diagnóstico em uma frase, dor em número) são copiados automaticamente do template de origem e continuam editáveis.
3. A ordem é fixa na navegação (regra 1 do método). Pode pular uma etapa, mas a etapa pulada aparece marcada como vazia na apresentação.
4. O modo de apresentação segue o roteiro de proposta: o investimento (página 8) nunca aparece antes do valor (página 7). Sem exceção, nem por configuração.
5. No primeiro projeto (onboarding), os campos obrigatórios por etapa são os mínimos para chegar à apresentação: situação, custo, consequência e diagnóstico no canvas; frase de solução e premissas no mapa; três blocos com nome, objetivo e marco no fluxo; dor em número, o que muda, investimento e próximo passo na tabela. Os demais ficam visíveis e vazios, com a pergunta-guia.
6. O exemplo preenchido do playbook (o caso conduzido do capítulo 7: automação comercial com IA para uma empresa de serviços de manutenção predial, descrita por segmento) existe dentro da ferramenta como "projeto de exemplo", somente leitura, duplicável.

---

## 3. Passo a passo do primeiro acesso ao primeiro projeto

Tempo-alvo total: 14 minutos (soma dos passos 1 a 8). Cada passo tem o tempo previsto, o que aparece na tela e o evento de telemetria gravado (B-11).

| Passo | Tempo | O que acontece | Tela | Evento |
|---|---|---|---|---|
| 0. E-mail de acesso | 0 min (chega em até 2 min após o pagamento) | Assinante recebe o e-mail "Seu acesso ao NIDflow" com link mágico. WhatsApp de boas-vindas em paralelo | Fora da ferramenta | `acesso_enviado` |
| 1. Entrar | 1 min | Clica no link, entra sem senha. Tela pede: defina uma senha (opcional, pode pular) | Tela única, um campo | `primeiro_login` |
| 2. Sobre você | 0,5 min | Três perguntas, uma por tela, resposta em um clique: (a) "Você vende para a sua própria empresa ou para a empresa de outra pessoa?"; (b) "Você decide contratações de marketing ou vendas na sua empresa?" (só se respondeu "própria empresa"); (c) "O que você vende?" (serviço, software, projeto sob medida, consultoria, outro). As perguntas (a) e (b) são as do Gatilho A (seção 8.2 do brief) e vão para a base via evento | Wizard, um campo por tela, barra de progresso | `perfil_respondido` (com as respostas) |
| 3. Qual proposta você precisa apresentar esta semana? | 0,5 min | Dois campos: cliente e interlocutor (ou "ainda não sei") e o que você vai vender para ele em uma linha. O primeiro já preenche o campo "cliente e interlocutor" do canvas de dor. Botão: "Desenhar este projeto". Alternativa discreta abaixo: "Prefiro ver o projeto de exemplo primeiro" | Tela única | `projeto_criado` |
| 4. Canvas de dor | 3 min | O projeto abre na etapa 1 com os seis campos do canvas; no primeiro projeto, situação, custo, consequência e diagnóstico são os obrigatórios. Cada campo tem a pergunta-guia e um exemplo em cinza (do caso do playbook). O campo de custo tem a conta guiada (frequência × perda por ocorrência × valor unitário). Ao preencher os obrigatórios, o diagnóstico em uma frase aparece montado. Botão: "Seguir para a Solução" | Etapa 1 de 4, indicador no topo | `etapa_preenchida` (dor) |
| 5. Mapa de solução | 2 min | A dor já vem copiada do canvas. Campo principal: a frase de solução no formato do playbook. Abaixo, as premissas (3 a 5, uma por linha). Causa, concordância e "o que a tese não é" ficam visíveis e opcionais. Botão: "Seguir para a Arquitetura" | Etapa 2 de 4 | `etapa_preenchida` (solucao) |
| 6. Fluxo de arquitetura | 4 min | O desenho. A tela abre pedindo o resultado final em uma linha (campo geral do fluxo, escrito antes de tudo) e mostra três blocos vazios já ligados em sequência (1, 2, 3). O assinante preenche nome, objetivo e marco de cada bloco; entra, componentes, responsável e prazo ficam disponíveis no bloco, opcionais no primeiro projeto. Adiciona ou remove blocos. Dica única na tela, que some ao primeiro clique: "Nomeie o primeiro bloco. Comece pelo primeiro dia do projeto". Botão: "Seguir para o Valor" (habilita com 3 blocos com nome e marco) | Etapa 3 de 4, canvas visual | `etapa_preenchida` (arquitetura), `arquitetura_min_3_etapas` |
| 7. Tabela de valor | 2 min | A dor em número já vem copiada do canvas. Obrigatórios no primeiro projeto: o que muda com o projeto (na unidade da dor), investimento e próximo passo (sugestão: "Reunião de aprovação em [data]"). Unidade de medida, conta de equivalência, incluso e não incluso e comparação em uma frase ficam visíveis e opcionais. Botão: "Apresentar o projeto" | Etapa 4 de 4 | `etapa_preenchida` (valor) |
| 8. Apresentar | 1 min | Modo de apresentação abre em tela cheia nas nove páginas do roteiro de proposta (capa, dor, solução, arquitetura em três páginas, valor, investimento, próximo passo); páginas com template opcional vazio são puladas. O assinante avança com setas e vê o projeto inteiro como o cliente vai ver. Ao sair, tela de conclusão: "Seu primeiro projeto está desenhado. Ele fica salvo aqui e você pode abrir em qualquer dispositivo" com dois botões: "Exportar em PDF" e "Voltar ao projeto" | Modo de apresentação | `apresentacao_aberta`; `pdf_exportado` se clicar |

Regras da experiência:

- Tudo é salvo automaticamente a cada alteração (B-03). Nunca existe botão "Salvar" no onboarding.
- O assinante pode sair em qualquer passo. Ao voltar, o NIDflow abre no ponto em que parou, com o mesmo projeto.
- Nenhum passo tem vídeo obrigatório. Existe um vídeo de 90 segundos (o mesmo da oferta em D+7) acessível pelo ícone de ajuda, nunca em pop-up.
- Depois do primeiro projeto, o onboarding some. Projetos seguintes abrem direto na etapa 1 com os templates.

---

## 4. Marcos de ativação

O que a NID mede para saber se o assinante está usando o que pagou. Gravado por telemetria mínima (B-11), sem ler o conteúdo dos projetos.

| Marco | Definição | Prazo esperado | Evento |
|---|---|---|---|
| M1 · Entrou | Primeiro login concluído | Até 24 h após o e-mail de acesso | `primeiro_login` |
| M2 · Começou | Primeiro projeto criado | Até 48 h | `projeto_criado` |
| M3 · Desenhou | Projeto com os campos obrigatórios das quatro etapas preenchidos e fluxo de arquitetura com pelo menos 3 blocos com nome e marco | Até 7 dias | `projeto_completo` |
| M4 · Apresentou | Modo de apresentação aberto ou PDF exportado do projeto completo | Até 7 dias | `apresentacao_aberta` ou `pdf_exportado` |
| M5 · Voltou | Segundo projeto criado ou primeiro projeto editado em um dia diferente | Até 30 dias | `projeto_criado` (2º) ou `projeto_editado_novo_dia` |

**Assinante ativado = M3 e M4 dentro de 7 dias.** É a métrica que o coordenador acompanha ao lado da conversão em D+7 e da retenção mensal (seção 9.2 do brief).

Metas iniciais (hipóteses, revisadas com 30 dias de dados, nunca citadas em peça): M1 em 80% dos assinantes; ativação (M3 + M4) em 50%; M5 em 40%.

Sinais para os gatilhos do brief (registrados na base pelo `automacao`):

- Respostas do passo 2 alimentam o Gatilho A.
- `projeto_completo` e `apresentacao_aberta` atendem o critério "desenhou pelo menos um projeto no NIDflow" do Gatilho B.

---

## 5. Mensagens de ativação (rascunho funcional para o agente `copy`)

> **Rascunho funcional.** Estrutura, argumento, gatilho e CTA de cada mensagem. A versão final é do agente `copy`, que mantém: remetente "NID", voz em primeira pessoa do plural, sem emoji em e-mail, no máximo um emoji em WhatsApp, nunca travessão, preços no formato R$ 29,90, CTA descrevendo o que acontece depois do clique. O disparo e a lógica de saída do fluxo são do agente `automacao`.

### 5.1 Sequência de ativação (todo assinante novo)

| # | Quando | Canal | Assunto ou abertura | Argumento | CTA |
|---|---|---|---|---|---|
| A1 | Imediato após o pagamento | E-mail | "Seu acesso ao NIDflow" | Pagamento confirmado. Um link, sem senha. Primeiro projeto em menos de 15 minutos. Lembrete de que os cinco templates do playbook já estão dentro | "Entrar no NIDflow e desenhar meu primeiro projeto" (link mágico) |
| A1w | Imediato | WhatsApp | "Seu NIDflow está pronto" | Mesmo conteúdo, três linhas. Link direto | Link |
| A2 | Ao concluir M3 (projeto completo) | E-mail | "Seu primeiro projeto está desenhado" | Reconhece o marco. Mostra o próximo passo: apresentar (modo de apresentação) e exportar. Uma dica prática: abrir a apresentação no computador da reunião, não no celular | "Abrir o modo de apresentação" |
| A3 | D+7 após o acesso, só para quem atingiu M4 | E-mail | "Como foi a apresentação?" | Pergunta única de um clique (apresentou; ainda não; o cliente aprovou). Registra sinal de Gatilho B. Convida a desenhar o próximo projeto | "Desenhar o próximo projeto" |
| A4 | D+30 | E-mail | "Um mês de NIDflow" | Resume o que a pessoa fez (número de projetos, apresentações), sem inventar número: usa a telemetria. Reforça que a assinatura renova e que o cancelamento é livre. Nenhuma oferta | "Ver meus projetos" |

Saída do fluxo: quem cancela sai de todas as sequências no mesmo dia.

### 5.2 Mensagens de resgate (quando alguém trava)

Cada gatilho dispara uma vez. Se o assinante avança, a sequência para.

| # | Gatilho | Quando dispara | Canal | Abertura | Argumento | CTA |
|---|---|---|---|---|---|---|
| R1 | Não fez o primeiro login (M1 não atingido) | 24 h após A1 | E-mail + WhatsApp | "Seu acesso ao NIDflow está esperando" | O link continua válido (renova o link mágico). Leva 15 minutos. Pergunta se o e-mail caiu em outra pasta | "Entrar agora" |
| R1b | Ainda sem login | 72 h após A1 | WhatsApp | "Precisa de ajuda para entrar?" | Uma pergunta direta. Oferece resolver por ali (o agente de IA responde; se for problema de acesso, encaminha para humano) | Responder a mensagem |
| R2 | Entrou, mas não criou projeto (M2 não atingido) | 48 h após M1 | E-mail | "Qual proposta você precisa apresentar esta semana?" | Repete a pergunta de abertura do onboarding. Sugere começar pelo canvas de dor do projeto que já está na mesa. Lembra que dá para começar pelo projeto de exemplo | "Desenhar este projeto" (abre direto no passo 3) |
| R3 | Criou projeto, mas a arquitetura está vazia (M3 não atingido) | 72 h após M2 | E-mail | "O desenho é a parte que o cliente vê" | O ponto em que a maioria trava é o fluxo. Dica prática em três linhas: escreva o resultado final primeiro; o primeiro bloco é o primeiro dia do projeto; o meio é o caminho até o resultado. Três blocos bastam para a primeira versão | "Abrir o fluxo de arquitetura" (link direto no projeto) |
| R4 | Projeto completo, mas nunca apresentou nem exportou (M4 não atingido) | 5 dias após M3 | E-mail | "Seu projeto está pronto para a reunião" | O modo de apresentação mostra o projeto na ordem do método, sem montar slide. Sugere ensaiar uma vez sozinho antes da reunião | "Abrir o modo de apresentação" |
| R5 | Sem login há 14 dias (risco de cancelamento) | 14 dias após o último login | E-mail | "Sua próxima proposta já tem template" | Sem culpa. Lembra que os projetos estão salvos e que um projeto novo começa em 15 minutos. Mostra uma situação concreta do ICP ("o cliente pediu proposta até sexta") | "Desenhar o próximo projeto" |
| R6 | Cobrança recusada | Webhook `pagamento_recusado` | E-mail + WhatsApp | "Não conseguimos renovar seu NIDflow" | Direto: o cartão não aprovou. Acesso continua. Link para atualizar. Segundo aviso em D+3, último em D+6 | "Atualizar meu pagamento" |
| R7 | Cancelou | Webhook `assinatura_cancelada` | E-mail | "Seu NIDflow foi cancelado" | Confirma sem insistir. Explica em três linhas o que acontece com os projetos (acesso até o fim do período, PDF por 30 dias, guarda por 90 dias). Pergunta única e opcional de motivo. Nenhum desconto | "Exportar meus projetos em PDF" |

Regra para o `copy`: nenhuma mensagem de resgate usa culpa ("você não usou"), urgência falsa ou promessa de resultado. O argumento é sempre o projeto que a pessoa precisa apresentar.

### 5.3 O que o agente de IA (WhatsApp) responde sobre onboarding

Para o agente `automacao` incluir na base do agente:

- "Não recebi o acesso": reenvia o link mágico pelo próprio fluxo (chamada à função do B-04) após confirmar o e-mail da compra.
- "Como começo?": responde com o passo 3 (qual proposta você precisa apresentar) e manda o link direto.
- "Onde estão os templates?": explica que todo projeto novo já abre com os cinco templates na ordem do método.
- "Perdi meu projeto": pede o e-mail, orienta a entrar de novo (projetos ficam salvos na conta). Se persistir, abre ticket para humano.
- Qualquer pergunta sobre cobrança, reembolso ou nota fiscal: humano.

---

## 6. O que acontece quando alguém trava dentro da ferramenta

Além das mensagens, a própria tela reage (B-06):

| Situação na tela | Reação |
|---|---|
| Campo obrigatório vazio por mais de 60 segundos com a tela aberta | O exemplo em cinza ganha um botão "Usar este exemplo como base", que copia o texto do caso do playbook para o campo, editável |
| Arquitetura sem nenhum bloco nomeado após 2 minutos | Dica única: "Comece pelo primeiro dia do projeto. O que acontece primeiro?" com um campo inline no bloco 1 |
| Tentou avançar para o Valor com menos de 3 blocos completos | Mensagem inline, sem pop-up: "Três blocos com nome e marco bastam para a primeira versão. Faltam [n]" |
| Fechou a aba no meio do onboarding | Ao voltar, abre no mesmo passo. Nenhuma tela de "continuar de onde parou?" |
| Erro de rede ao salvar | Aviso discreto "sem conexão, salvando localmente" e sincronização automática ao reconectar (B-03) |
| Abriu no celular | Aviso único: "O desenho funciona melhor no computador. Aqui você consegue ler e apresentar". Leitura e apresentação liberadas; edição do fluxo desabilitada em telas menores que 768 px (a confirmar na auditoria se o canvas atual é usável em toque) |

---

## 7. Checklist de entrega do onboarding (para o coordenador liberar)

- [ ] Um assinante de teste sai do e-mail de acesso ao modo de apresentação em menos de 15 minutos, cronometrado, sem ajuda.
- [ ] Os cinco templates aparecem em todo projeto novo, na ordem do método, com os campos do `01-playbook.md` e os textos do `02-templates-fluxo.md`.
- [ ] Os eventos M1 a M5 chegam na tabela de telemetria e o `automacao` consegue ler por API ou webhook.
- [ ] As mensagens A1 a A4 e R1 a R7 estão finalizadas pelo `copy` e configuradas pelo `automacao`.
- [ ] O projeto de exemplo (caso do playbook) abre em modo leitura e duplica.
- [ ] Nenhuma tela do onboarding mostra funcionalidade que não existe.
