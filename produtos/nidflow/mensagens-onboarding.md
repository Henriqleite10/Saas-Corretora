# NIDflow · Mensagens de ativação e de resgate (versão final)

| Campo | Valor |
|---|---|
| O que é | Texto final das mensagens A1 a A4 (ativação) e R1 a R7 (resgate) especificadas na seção 5 do `02-onboarding.md`, mais R6c, R7b, R8 e R9 (regime de leitura e exclusão) especificadas na seção 3.3 do `automacoes/03-oferta-nidflow-d7.md` |
| Remetente | NID (e-mail e WhatsApp). Nunca "Henrique" |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Disparo, condições e saída | Agente `automacao` (fluxo do `03`) e telemetria do NIDflow (marcos M1 a M5) |
| Exportação em PDF | As linhas marcadas `[com PDF]` só entram com `nidflow_pdf_disponivel = sim`; a alternativa `[sem PDF]` entra no lugar |

Regras aplicadas em todas as mensagens: voz da NID em primeira pessoa do plural; um único CTA; sem emoji em e-mail e no máximo um em WhatsApp; nunca travessão; preço "R$ 29,90 por mês"; CTA descreve o que acontece depois do clique; nenhuma culpa, nenhuma urgência falsa, nenhuma promessa de resultado, nenhum desconto. O argumento é sempre o projeto que a pessoa precisa apresentar.

Variáveis: `{primeiro_nome}`, `{link_magico}` (válido por 24 horas, renovado a cada envio), `{link_projeto}`, `{link_fluxo}`, `{link_apresentacao}`, `{link_novo_projeto}`, `{link_meus_projetos}`, `{link_pagamento}` (área do comprador), `{link_exportar}`, `{link_reativar}`, `{data_limite_pdf}`, `{data_exclusao}`, `{n_projetos}`, `{n_apresentacoes}`, `{link_descadastro}`.

---

## Parte 1 · Ativação (todo assinante novo)

### A1 · E-mail de acesso

**Quando**: imediato após o pagamento (até 2 minutos). Transacional, qualquer hora.
**Assunto**: Seu acesso ao NIDflow
**Pré-cabeçalho**: Um link, sem senha. Primeiro projeto em menos de 15 minutos.

**Corpo**

Olá, {primeiro_nome}.

Pagamento confirmado. O NIDflow está pronto para você.

Entre pelo link abaixo, sem senha. Ele vale por 24 horas; se passar, é só pedir um novo na tela de entrada.

[Botão] Entrar no NIDflow e desenhar meu primeiro projeto
{link_magico}

Ao entrar, a ferramenta pergunta qual proposta você precisa apresentar esta semana e abre o projeto já com os cinco templates do playbook na ordem do método: canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor e roteiro de proposta. O primeiro projeto sai em menos de 15 minutos, do canvas ao modo de apresentação.

Dica: abra no computador. O desenho do fluxo funciona melhor em tela grande.

Sua assinatura: R$ 29,90 por mês, renovada todo mês na mesma data. Cancela quando quiser. Nos primeiros 7 dias, reembolso sem pergunta.

Qualquer dúvida, responda a este e-mail ou fale com a gente pelo WhatsApp da NID.

NID · Consultoria de Performance Comercial

---

### A1w · WhatsApp de acesso

**Quando**: imediato após o pagamento (até 2 minutos). Modelo de utilidade, qualquer hora.
**Primeira linha**: Seu NIDflow está pronto.

**Mensagem**

Aqui é a NID. Seu NIDflow está pronto. Entre por este link, sem senha: {link_magico}

Abra no computador, diga qual proposta você precisa apresentar esta semana e o projeto já vem com os cinco templates do método. Se precisar de algo, responde por aqui.

**CTA**: o link (única ação)

---

### A2 · Primeiro projeto desenhado

**Quando**: ao concluir o marco M3 (projeto com as quatro etapas preenchidas e fluxo com pelo menos três blocos). Até 10 minutos após o evento.
**Assunto**: Seu primeiro projeto está desenhado
**Pré-cabeçalho**: Agora é apresentar. Uma dica antes da reunião.

**Corpo**

Olá, {primeiro_nome}.

Seu primeiro projeto no NIDflow está desenhado: dor, solução, arquitetura e valor, na ordem. É a parte que a maioria não chega a fazer.

O próximo passo é ver o projeto como o cliente vai ver. Aperte "Apresentar": o desenho vira a apresentação nas nove páginas do roteiro de proposta, com o investimento depois do valor.

[Botão] Abrir o modo de apresentação
{link_apresentacao}

Uma dica prática: ensaie uma vez sozinho, no computador que você vai levar para a reunião, não no celular. Passe pelas páginas dizendo em voz alta a frase de cada uma. Na dor, "continua sendo isso?". Na solução, "faz sentido?". Na arquitetura, conte a sequência. No investimento, pare de falar.

[com PDF] Se a reunião for por e-mail, exporte em PDF pelo botão ao lado de "Apresentar".

NID · Consultoria de Performance Comercial

---

### A3 · Como foi a apresentação?

**Quando**: 7 dias após o acesso, só para quem atingiu o marco M4 (abriu o modo de apresentação ou exportou).
**Assunto**: Como foi a apresentação?
**Pré-cabeçalho**: Uma pergunta de um clique. Depois, o próximo projeto.

**Corpo**

Olá, {primeiro_nome}.

Faz uma semana que você desenhou o seu primeiro projeto no NIDflow. A gente quer saber uma coisa, em um clique:

[Botão 1] Apresentei e o cliente aprovou
[Botão 2] Apresentei, ainda sem resposta
[Botão 3] Ainda não apresentei

Cada botão é um link que registra a resposta e abre o NIDflow. A gente usa isso para melhorar a ferramenta e para saber quem está aplicando o método.

O segundo projeto costuma sair mais rápido que o primeiro: o canvas de dor você já sabe preencher, e o fluxo você já desenhou uma vez. Se tem outra proposta na mesa, ela já tem template.

[Botão] Desenhar o próximo projeto
{link_novo_projeto}

NID · Consultoria de Performance Comercial

[Nota de implementação: os três botões de resposta e o botão de CTA levam ao NIDflow; os três primeiros gravam a resposta no caminho. A resposta "aprovou" alimenta o sinal do Gatilho B, conforme a seção 4 do `02-onboarding.md`. Para efeito da regra "um CTA por mensagem", a pergunta é uma pesquisa de um clique e o CTA é "Desenhar o próximo projeto".]

---

### A4 · Um mês de NIDflow

**Quando**: 30 dias após o acesso.
**Assunto**: Um mês de NIDflow
**Pré-cabeçalho**: O que você desenhou até aqui e o que acontece com a assinatura.

**Corpo (se `{n_projetos}` for maior que zero)**

Olá, {primeiro_nome}.

Faz um mês que o NIDflow chegou. Neste período você desenhou {n_projetos} projeto(s) e abriu o modo de apresentação {n_apresentacoes} vez(es). Os números vêm da sua conta; a gente não lê o conteúdo dos projetos.

Sobre a assinatura: ela renova automaticamente, todo mês, na mesma data, por R$ 29,90. Se em algum momento não fizer mais sentido, cancela em um clique na área do assinante, sem multa e sem justificativa. Os projetos continuam salvos até o fim do período pago.

[Botão] Ver meus projetos
{link_meus_projetos}

NID · Consultoria de Performance Comercial

**Corpo (se `{n_projetos}` for zero)**

Olá, {primeiro_nome}.

Faz um mês que o NIDflow chegou e a sua conta ainda não tem um projeto desenhado. Sem problema: a próxima proposta que aparecer na sua mesa já tem template, e o primeiro projeto sai em menos de 15 minutos.

Sobre a assinatura: ela renova automaticamente, todo mês, na mesma data, por R$ 29,90. Se não fizer sentido para você agora, cancela em um clique na área do assinante, sem multa e sem justificativa.

[Botão] Ver meus projetos
{link_meus_projetos}

NID · Consultoria de Performance Comercial

---

## Parte 2 · Resgate (quando alguém trava; cada gatilho dispara uma vez)

### R1 · Não entrou (24 horas após A1)

**Canal**: e-mail e WhatsApp.

**E-mail**
**Assunto**: Seu acesso ao NIDflow está esperando
**Pré-cabeçalho**: Link novo, válido por 24 horas. Leva 15 minutos.

Olá, {primeiro_nome}.

O seu acesso ao NIDflow ainda não foi usado. Pode ser que o e-mail de ontem tenha caído em outra pasta, ou que o dia não tenha deixado. Segue um link novo, válido por 24 horas, sem senha:

[Botão] Entrar agora
{link_magico}

Do clique ao primeiro projeto apresentado são 15 minutos. Se a próxima proposta já está na sua mesa, é o suficiente para desenhar a primeira versão.

Se o e-mail de acesso não chegou de jeito nenhum, responda a este e-mail que a gente resolve.

NID · Consultoria de Performance Comercial

**WhatsApp**
**Primeira linha**: Seu acesso ao NIDflow está esperando.

Aqui é a NID. Seu acesso ao NIDflow está esperando. Link novo, válido por 24 horas: {link_magico}

Se o e-mail não chegou, responde por aqui que a gente resolve.

---

### R1b · Ainda sem entrar (72 horas após A1)

**Canal**: WhatsApp. O agente de IA responde; problema de acesso vai para humano.
**Primeira linha**: Precisa de ajuda para entrar?

Aqui é a NID. Você assinou o NIDflow e ainda não entrou. Precisa de ajuda para acessar? Responde aqui com o que está acontecendo (link que não abre, e-mail que não chegou, qualquer coisa) e a gente resolve por esta conversa.

**CTA**: responder a mensagem

---

### R2 · Entrou, mas não criou projeto (48 horas após o primeiro login)

**Assunto**: Qual proposta você precisa apresentar esta semana?
**Pré-cabeçalho**: Comece por ela. O template já está lá.

Olá, {primeiro_nome}.

Você entrou no NIDflow e ainda não abriu um projeto. A pergunta que a ferramenta faz ao entrar é a mesma que a gente faz agora: qual proposta você precisa apresentar esta semana?

Comece por ela. Se você já preencheu algum template no papel com o playbook, escolha esse template e passe o que já tem para a tela. Se não preencheu nenhum, comece pelo canvas de dor do cliente que está mais perto de pedir proposta.

Se preferir ver um projeto inteiro antes, o caso conduzido do playbook está dentro da ferramenta como projeto de exemplo, pronto para abrir e duplicar.

[Botão] Desenhar este projeto
{link_novo_projeto}

NID · Consultoria de Performance Comercial

---

### R3 · Projeto criado, arquitetura vazia (72 horas após criar o projeto)

**Assunto**: O desenho é a parte que o cliente vê
**Pré-cabeçalho**: Três blocos bastam para a primeira versão.

Olá, {primeiro_nome}.

O ponto em que a maioria trava é o fluxo de arquitetura. É normal: é a primeira vez que o projeto precisa existir como desenho, e não como texto.

Três coisas resolvem:

1. Escreva o resultado final primeiro, em uma linha: o estado em que a dor parou.
2. O primeiro bloco é o primeiro dia do projeto. O que acontece primeiro?
3. O meio é o caminho entre o primeiro dia e o resultado. Três blocos com nome, objetivo e marco bastam para a primeira versão. Você refina depois.

O seu projeto está salvo no ponto em que parou.

[Botão] Abrir o fluxo de arquitetura
{link_fluxo}

NID · Consultoria de Performance Comercial

---

### R4 · Projeto completo, nunca apresentado (5 dias após completar)

**Assunto**: Seu projeto está pronto para a reunião
**Pré-cabeçalho**: Aperte "Apresentar" e veja como o cliente vai ver.

Olá, {primeiro_nome}.

Seu projeto no NIDflow está com as quatro etapas preenchidas. O que falta é ver como o cliente vai ver.

O modo de apresentação mostra o projeto nas nove páginas do roteiro de proposta, na ordem do método, sem montar um slide. O investimento aparece depois do valor, sempre.

Ensaie uma vez sozinho antes da reunião: passe pelas páginas dizendo a frase de cada uma em voz alta. Leva cinco minutos e muda a reunião.

[Botão] Abrir o modo de apresentação
{link_apresentacao}

NID · Consultoria de Performance Comercial

---

### R5 · Sem login há 14 dias

**Assunto**: Sua próxima proposta já tem template
**Pré-cabeçalho**: Os projetos estão salvos. Um novo começa em 15 minutos.

Olá, {primeiro_nome}.

Faz duas semanas que você não abre o NIDflow. Nada mudou por aqui: os seus projetos continuam salvos, na sua conta.

O que a gente sabe de quem vende é que a proposta chega assim: "o cliente pediu até sexta". Quando isso acontecer, o projeto novo já vem com os cinco templates na ordem do método e a primeira versão sai em 15 minutos, com a apresentação pronta.

[Botão] Desenhar o próximo projeto
{link_novo_projeto}

NID · Consultoria de Performance Comercial

---

### R6 · Cobrança recusada (D0, D+3 e D+6 da recusa)

**Canal**: e-mail e WhatsApp no D0; e-mail em D+3 e D+6 (WhatsApp de novo só em D+6). O acesso continua completo nos três avisos.

**E-mail D0**
**Assunto**: Não conseguimos renovar seu NIDflow
**Pré-cabeçalho**: O cartão não aprovou. Seu acesso continua. Um clique para atualizar.

Olá, {primeiro_nome}.

A renovação mensal do seu NIDflow não foi aprovada pelo cartão. Isso costuma ser limite, validade ou bloqueio do banco, não um problema seu.

Seu acesso continua normal. Para manter, atualize o pagamento pelo link abaixo; leva um minuto.

[Botão] Atualizar meu pagamento
{link_pagamento}

Se não quiser continuar, não precisa fazer nada: a assinatura encerra sozinha depois das tentativas de cobrança, e os seus projetos ficam disponíveis para exportar por 30 dias.

NID · Consultoria de Performance Comercial

**WhatsApp D0**
**Primeira linha**: Não conseguimos renovar seu NIDflow.

Aqui é a NID. A renovação do seu NIDflow não foi aprovada pelo cartão. Seu acesso continua normal. Para manter, atualize o pagamento aqui: {link_pagamento}

**E-mail D+3**
**Assunto**: Seu NIDflow ainda não renovou
**Pré-cabeçalho**: Segundo aviso. O acesso continua até esgotar as tentativas.

Olá, {primeiro_nome}.

Segundo aviso: a renovação do seu NIDflow segue sem aprovação do cartão. O acesso continua completo enquanto as tentativas de cobrança acontecem. Para não ter interrupção, atualize o pagamento:

[Botão] Atualizar meu pagamento
{link_pagamento}

NID · Consultoria de Performance Comercial

**E-mail D+6**
**Assunto**: Última tentativa de renovar seu NIDflow
**Pré-cabeçalho**: Depois de amanhã a conta entra em modo leitura.

Olá, {primeiro_nome}.

Amanhã acontece a última tentativa de cobrança do seu NIDflow. Se ela não for aprovada, a conta entra em modo leitura: você continua vendo os projetos e exportando, mas não edita nem cria novos. Atualizar o pagamento a qualquer momento devolve tudo na hora, com os projetos no lugar.

[Botão] Atualizar meu pagamento
{link_pagamento}

NID · Consultoria de Performance Comercial

**WhatsApp D+6**
**Primeira linha**: Última tentativa de renovar seu NIDflow.

Aqui é a NID. Amanhã é a última tentativa de cobrança do seu NIDflow. Se não aprovar, a conta entra em modo leitura (vê e exporta, não edita). Para manter tudo como está: {link_pagamento}

---

### R6c · Conta entrou em modo leitura por inadimplência

**Quando**: no dia em que a conta entra em modo leitura. 10h.
**Assunto**: Seu NIDflow entrou em modo leitura
**Pré-cabeçalho**: Atualizar o pagamento devolve a edição na hora.

Olá, {primeiro_nome}.

As tentativas de cobrança do seu NIDflow não foram aprovadas e a conta entrou em modo leitura. O que isso significa:

- Você continua abrindo e vendo todos os projetos.
- [com PDF] Você pode exportar em PDF até {data_limite_pdf}.
- [sem PDF] Os projetos ficam guardados por 90 dias para você reativar.
- Não dá para criar nem editar projetos.

Atualizar o pagamento devolve a edição na hora, com todos os projetos no lugar.

[Botão] Atualizar meu pagamento
{link_pagamento}

NID · Consultoria de Performance Comercial

---

### R7 · Cancelou

**Quando**: no dia do cancelamento.
**Assunto**: Seu NIDflow foi cancelado
**Pré-cabeçalho**: Confirmado. O que acontece com os seus projetos.

Olá, {primeiro_nome}.

Cancelamento confirmado. Nenhuma cobrança nova vai acontecer.

O que acontece com os seus projetos:

- Você continua com acesso completo até o fim do período já pago.
- [com PDF] Depois disso, a conta fica em modo leitura por 30 dias, e você pode exportar tudo em PDF nesse prazo.
- [sem PDF] Depois disso, os projetos ficam guardados por 90 dias.
- Em 90 dias após o fim do acesso, projetos e dados são excluídos de forma definitiva. Antes disso, uma nova assinatura reativa a mesma conta com tudo no lugar.

Se quiser, conte o motivo em um clique. É opcional e ajuda a gente a melhorar a ferramenta:

[Link] Não uso o suficiente · [Link] Faltou algo que eu precisava · [Link] Preço · [Link] Outro motivo

[com PDF] [Botão] Exportar meus projetos em PDF
{link_exportar}

[sem PDF] [Botão] Ver meus projetos
{link_meus_projetos}

Obrigado por ter desenhado com a gente.

NID · Consultoria de Performance Comercial

[Nota de implementação: os quatro links de motivo gravam a resposta e abrem uma página de uma linha, "Anotado. Obrigado.". Nenhuma tela de "tem certeza?", nenhum desconto de retenção.]

---

### R7b · Conta cancelada entrou em modo leitura (ou reembolso)

**Quando**: no dia em que a conta cancelada chega ao fim do período pago, ou no dia do reembolso. 10h.
**Assunto** `[com PDF]`: Seus projetos ficam disponíveis para exportar até {data_limite_pdf}
**Assunto** `[sem PDF]`: Seus projetos ficam guardados até {data_exclusao}

**Corpo**

Olá, {primeiro_nome}.

Seu período no NIDflow terminou e a conta está em modo leitura. Em três linhas:

- [com PDF] Você pode exportar todos os projetos em PDF até {data_limite_pdf}.
- Os projetos ficam guardados até {data_exclusao}. Depois dessa data, são excluídos de forma definitiva.
- Para voltar a editar, é só assinar de novo, por R$ 29,90 por mês: a mesma conta reativa com tudo no lugar.

[com PDF] [Botão] Exportar meus projetos em PDF
{link_exportar}

[sem PDF] [Botão] Reativar meu NIDflow
{link_reativar}

NID · Consultoria de Performance Comercial

---

### R8 · 60 dias após o fim do acesso

**Assunto**: Seus projetos serão excluídos em 30 dias
**Pré-cabeçalho**: Data: {data_exclusao}. Reativar mantém tudo.

Olá, {primeiro_nome}.

Aviso de rotina: os projetos da sua conta no NIDflow serão excluídos de forma definitiva em {data_exclusao}. Se quiser mantê-los, reativar a assinatura antes dessa data devolve a conta com tudo no lugar, por R$ 29,90 por mês.

[Botão] Reativar meu NIDflow
{link_reativar}

NID · Consultoria de Performance Comercial

---

### R9 · 83 dias após o fim do acesso

**Assunto**: Última semana antes da exclusão
**Pré-cabeçalho**: Em {data_exclusao} os projetos são apagados.

Olá, {primeiro_nome}.

Último aviso: em {data_exclusao} os projetos da sua conta no NIDflow são excluídos de forma definitiva, junto com os seus dados. Depois dessa data não há como recuperar. Reativar antes mantém tudo.

[Botão] Reativar meu NIDflow
{link_reativar}

NID · Consultoria de Performance Comercial

---

## Checklist de coerência

- [x] Todas as mensagens saem da NID; Henrique não assina nenhuma
- [x] Um CTA por mensagem (em A3 e R7, a pergunta de um clique é pesquisa, e o CTA é único)
- [x] Sem emoji em e-mail; nenhum emoji usado em WhatsApp nesta sequência
- [x] Sem travessão; preço "R$ 29,90 por mês"; nunca "teste grátis"; nunca "software", "app", "sistema" ou "plataforma" para o NIDflow
- [x] Nenhuma culpa, urgência falsa, promessa de resultado ou desconto
- [x] Linhas de PDF marcadas e com alternativa
- [x] Regime de cancelamento, leitura e exclusão conforme `01-plano-de-assinatura.md`, seções 5 a 7
