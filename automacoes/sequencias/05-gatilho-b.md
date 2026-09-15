# Sequência 05 · Gatilho B: avaliação de projeto, convite ao banco de talentos e formulário

| Campo | Valor |
|---|---|
| Fluxo de origem | `automacoes/04-segmentacao-gatilhos.md` (seções 5, 6, 8.2 e 9). Momentos, canais, prazos e condições são os do fluxo |
| Códigos neste arquivo | CB0 (e-mail automático, candidato sem avaliação), CB1 (e-mail humano, convite), CB2 (e-mail, lembrete), CB3 (convite para entrevista, humano, só com vaga real), mais o formulário de envio de projeto, as três devolutivas da avaliação e o formulário do banco de talentos |
| Quem envia | CB0 e CB2: automático, remetente "NID". CB1: uma pessoa da NID, remetente "Henrique Leite, sócio da NID", endereço da NID, assinatura "Henrique Leite, sócio da NID". CB3: humano, pelo canal preferido, assinado "[Nome], da NID" |
| Ordem | O Gatilho A tem prioridade. Se a pessoa tem tarefa A aberta, CB1 espera o encerramento da tarefa A e um intervalo de 7 dias. Se a tarefa A terminou em `cliente`, CB1 não é enviado |
| O que nunca aparece | Promessa de vaga, prazo ou remuneração. O que o brief permite: "convite para entrevista quando houver vaga" |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 1.1, 8.2, 10.5), `produtos/playbook/01-playbook.md` (capítulo 9), `produtos/mini-curso/00-grade.md` |

Regras aplicadas: um único CTA por mensagem; sem travessão; nenhum emoji; "para" por extenso; nenhum termo interno no texto para a pessoa (nada de "gatilho", "etiqueta", "candidato"); reconhecimento só do que está registrado na base; LGPD em linguagem clara, com finalidade, prazo e como sair.

Variáveis: `{primeiro_nome}`, `{link_formulario_avaliacao}`, `{link_formulario_banco}`, `{link_area_membros}`, `{email_privacidade}` (endereço da NID para pedidos sobre dados; a definir pelo coordenador), `{link_descadastro}`, `{data_entrevista}`, `{horario_entrevista}`, `{formato_entrevista}`, `{nome_humano}`.

Rastreio: `utm_source=email`, `utm_medium=sequencia` (CB0, CB2) ou `humano` (CB1, CB3), `utm_campaign=F2-gatilho-b`, `utm_content=cb0`, `cb1`, `cb2`, `cb3`. O valor `humano` de `utm_medium` precisa ser registrado pelo `automacao` (mesma decisão de `04-gatilho-a.md`).

---

## 1. CB0 · Mande um projeto desenhado para a gente avaliar

**Código**: CB0
**Momento**: no dia em que a pessoa cumpre três dos quatro critérios sem ter o quarto (avaliação de domínio), entre 8h e 10h, segunda a sexta. Uma única vez
**Canal**: e-mail automático, remetente "NID"
**Condição**: `F2-gatilho-B-candidato` sem `avaliacao_dominio`; sem opt-out de e-mail
**Assunto**: Mande um projeto desenhado para a gente avaliar
**Pré-cabeçalho**: Você concluiu as aulas e está aplicando o método. A NID devolve um parecer em até 5 dias úteis.

**Corpo**

Olá, {primeiro_nome}.

Você concluiu as oito aulas do Mini curso NID · Apresente para Fechar. [Se `nidflow_projeto_completo_em` preenchido:] Desenhou pelo menos um projeto no NIDflow, com as quatro etapas preenchidas. [Se `propostas_30d` respondido:] E contou para a gente quantas propostas apresentou e fechou nos últimos 30 dias. É mais do que a maioria faz com o método.

A gente quer ver um projeto seu. Mande um projeto desenhado com os templates do método: o link do projeto no NIDflow, o PDF exportado ou os templates preenchidos. Descreva o cliente por segmento, sem nome, se for confidencial.

Uma pessoa da NID passa o projeto pelo checklist "proposta pronta para apresentar", o mesmo do capítulo 9 do playbook, e devolve um parecer de três linhas em até 5 dias úteis: o que está no lugar, o que voltar a ajustar e por onde começar. É a mesma leitura que a gente faz nas propostas da NID antes de apresentar.

[Botão] Enviar meu projeto para avaliação
{link_formulario_avaliacao}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-gatilho-b&utm_content=cb0

Se não tiver um projeto pronto agora, sem problema: o link continua valendo, e a próxima proposta serve.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Enviar meu projeto para avaliação". Nenhuma menção ao banco de talentos: o critério precisa ser cumprido antes do convite (fluxo, seção 8.2).

---

## 2. Formulário de envio de projeto para avaliação (página da NID, skill `nid-pages`)

**Título**: Envie um projeto desenhado com o método.
**Linha de apoio**: Uma pessoa da NID passa o projeto pelo checklist "proposta pronta para apresentar" e devolve um parecer de três linhas em até 5 dias úteis.

| Campo | Rótulo | Microcopy |
|---|---|---|
| Nome | Seu nome | |
| E-mail | O e-mail da sua compra | É por ele que o parecer chega e que a gente encontra o seu cadastro. |
| Projeto | O projeto | Cole o link do projeto no NIDflow ou envie o arquivo (PDF exportado ou os templates preenchidos, até 10 MB). |
| Cliente (opcional) | Quem é o cliente, por segmento | Por exemplo: "uma rede de clínicas", "uma indústria de embalagens". Sem nome, se for confidencial. |
| Ponto de atenção (opcional) | Onde você mais travou neste projeto? | Uma linha. Ajuda a gente a olhar com mais cuidado o que importa para você. |

**Linha de finalidade (acima do botão)**: A NID usa o projeto e o seu e-mail só para fazer esta avaliação e devolver o parecer. O arquivo fica guardado de forma privada, não é publicado nem usado como exemplo sem a sua autorização por escrito.

**Botão**: Enviar meu projeto para avaliação

**Página de confirmação**
Título: Projeto recebido.
Texto: Uma pessoa da NID vai passar o seu projeto pelo checklist do capítulo 9 e devolver o parecer por e-mail em até 5 dias úteis. Enquanto isso, a sua área de membros está aqui: {link_area_membros}

**E-mail de confirmação (automático, remetente "NID", imediato)**
Assunto: Recebemos o seu projeto
Corpo: Olá, {primeiro_nome}. Seu projeto chegou. Uma pessoa da NID vai passá-lo pelo checklist "proposta pronta para apresentar" e devolver o parecer neste e-mail em até 5 dias úteis. NID · Consultoria de Performance Comercial

[Nota de implementação: o arquivo vai para armazenamento privado, nunca para a base de contatos (`05-integracoes.md`, seção 5.2). O envio grava o evento `F2_projeto_avaliado` só depois da avaliação humana. Reenvio permitido uma vez, 30 dias depois de um parecer `parcial` ou `reprovado`.]

---

## 3. Devolutivas da avaliação (três linhas, assinadas pela NID, dentro de 5 dias úteis)

Enviadas por uma pessoa da NID, remetente "NID", em resposta ao e-mail de confirmação. O avaliador preenche os campos entre chaves com o que viu no projeto; nada genérico. Critério do fluxo: `aprovado` com pelo menos 80% dos itens do checklist atendidos e a ordem do método respeitada; `parcial` entre 50% e 79%; `reprovado` abaixo de 50%. O resultado interno não aparece no texto.

**Assunto (os três casos)**: O parecer do seu projeto

**Aprovado**

Olá, {primeiro_nome}.

Seu projeto está pronto para apresentar: {o que está no lugar, em uma frase, citando a etapa mais forte}. O que ainda vale ajustar antes da reunião: {um item do checklist, com a página em que ele entra}. Por onde começar: leve exatamente este documento para a próxima apresentação e volte à página de valor antes de responder qualquer objeção sobre preço.

NID · Consultoria de Performance Comercial

**Parcial**

Olá, {primeiro_nome}.

Seu projeto tem {o que está no lugar, em uma frase} e ainda não está pronto para apresentar: {o item que mais pesa, com a etapa a que ele pertence} e {segundo item}. Por onde começar: volte ao capítulo {número} do playbook, refaça {o template correspondente} com o cliente e, se quiser, envie de novo daqui a 30 dias pelo mesmo link.

NID · Consultoria de Performance Comercial

**Reprovado**

Olá, {primeiro_nome}.

Seu projeto ainda não é um projeto desenhado: {o que falta na ordem do método, em uma frase, por exemplo "o preço aparece antes do valor e a arquitetura está em lista, sem fluxo"}. Por onde começar: {a etapa em que voltar, com o capítulo e o template}, com um cliente real, antes de qualquer outra página. Daqui a 30 dias o link de envio aceita uma nova versão.

NID · Consultoria de Performance Comercial

[Nota: "sem pergunta, sem julgamento" é a postura. Nenhuma devolutiva menciona banco de talentos, vaga ou a NID como empregadora. O resultado `aprovado` cumpre o quarto critério do Gatilho B e, se os outros três estiverem registrados, abre a tarefa de CB1.]

---

## 4. CB1 · Um convite da NID

**Código**: CB1
**Momento**: até 3 dias úteis após a etiqueta `F2-gatilho-B`, respeitando a prioridade do Gatilho A (seção 6 do fluxo). Horário comercial
**Canal**: e-mail, enviado por uma pessoa da NID, remetente "Henrique Leite, sócio da NID"
**Condição**: quatro critérios registrados; tarefa `F2 · Gatilho B` aberta; sem `F2-funil1-cliente`; sem opt-out de e-mail (se houver opt-out de e-mail e telefone sem opt-out, o mesmo texto vai por WhatsApp, sem o botão, com o link em texto)
**Assunto**: Um convite da NID
**Pré-cabeçalho**: A gente monta time de vendas com quem domina o método. Você domina.

**Corpo**

Olá, {primeiro_nome}. Aqui é o Henrique, sócio da NID.

Vi o seu caminho com o método: você concluiu as aulas do mini curso, desenhou e apresentou projetos com as quatro etapas, e o projeto que mandou para a gente avaliar ficou pronto para apresentar. Isso é raro, e é exatamente o que a gente procura.

A NID terceiriza BDR, SDR e closer para empresas. O time que faz isso é montado com gente que desenha e apresenta projeto do jeito que está no playbook, porque é assim que a NID vende para os próprios clientes.

Por isso o convite: entrar no banco de talentos da NID. É um cadastro curto. Quando abre uma vaga compatível com o seu perfil, a gente chama para uma entrevista. Não é promessa de vaga nem de prazo; o que muda é que, quando a vaga existir, quem já viu o seu trabalho chama você primeiro.

[Botão] Quero entrar no banco de talentos
{link_formulario_banco}?utm_source=email&utm_medium=humano&utm_campaign=F2-gatilho-b&utm_content=cb1

Se não fizer sentido agora, sem problema. O playbook, as aulas e a ferramenta continuam com você do mesmo jeito.

Henrique Leite, sócio da NID
NID · Consultoria de Performance Comercial

**CTA único**: "Quero entrar no banco de talentos" (o formulário com consentimento, seção 6)

[Nota: a frase "apresentou projetos" só entra se `nidflow_apresentacao_em` ou `apresentacao_confirmada` estiver registrado; se não, "desenhou projetos com as quatro etapas". Nada além do que a base tem.]

---

## 5. CB2 · O convite da NID continua de pé

**Código**: CB2
**Momento**: 7 dias corridos após CB1 sem resposta e sem envio do formulário, entre 8h e 10h, segunda a sexta
**Canal**: e-mail (automático ou humano), remetente "NID"
**Condição**: `gatilho_b_status = convidado`; sem `F2-banco-talentos`
**Assunto**: O convite da NID continua de pé
**Pré-cabeçalho**: Última mensagem sobre o banco de talentos. O cadastro leva dois minutos.

**Corpo**

Olá, {primeiro_nome}.

Semana passada o Henrique, sócio da NID, te convidou para o banco de talentos da NID: o cadastro de onde saem as pessoas que a gente chama para entrevista quando abre vaga de BDR, SDR ou closer. Esta é a última mensagem sobre isso; se não for o momento, a gente não insiste.

[Botão] Quero entrar no banco de talentos
{link_formulario_banco}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-gatilho-b&utm_content=cb2

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: o formulário. Depois de CB2 sem resposta, `recusou`, e nenhuma abordagem automática nova.

---

## 6. Formulário do banco de talentos (página da NID, skill `nid-pages`)

**Título**: Banco de talentos da NID
**Linha de apoio**: Quando abre uma vaga de BDR, SDR ou closer compatível com o seu perfil, a gente chama para entrevista. Cadastro de dois minutos.

| Campo | Rótulo | Tipo e opções | Microcopy |
|---|---|---|---|
| Nome | Seu nome completo | Texto | |
| E-mail | O e-mail da sua compra | Texto | É por ele que a gente encontra o seu cadastro e o projeto que você já enviou. |
| WhatsApp | Seu WhatsApp | Texto | Com DDD. A gente usa para marcar a entrevista, quando houver. |
| Cidade e estado | Onde você mora | Texto | |
| Perfil | Como você se descreve hoje? | Uma opção: Vendedor B2B de serviços ou tecnologia / SDR ou BDR / Closer ou executivo de contas / Consultor, freelancer ou dono de serviço | |
| Segmento | Em que segmento você vende hoje? | Texto curto | Por exemplo: software para transportadoras, clínicas, indústria. |
| Disponibilidade | Se surgir uma vaga compatível | Uma opção: Posso começar em até 30 dias / Posso começar de imediato / Por enquanto só quero conversar | |
| Modalidade | Como você prefere trabalhar? | Uma opção: Remoto / Presencial em São Bernardo do Campo, SP / Tanto faz | |
| Projeto (só se ainda não enviado) | Um projeto desenhado com o método | Link ou arquivo até 10 MB | Se você já mandou um projeto para avaliação, este campo não aparece. |

**Texto do consentimento (checkbox obrigatório)**

Autorizo a NID (NID - Núcleo de Inteligência Digital LTDA, CNPJ 11.698.721/0001-33) a guardar estes dados e o projeto que enviei, e a usá-los para me contatar sobre vagas de BDR, SDR e closer da NID, por até 24 meses. Sei que posso pedir para sair do banco a qualquer momento pelo e-mail {email_privacidade} e que a NID apaga os meus dados em até 15 dias após o pedido. Os dados não são compartilhados com outras empresas nem usados para outra finalidade.

**Botão**: Entrar no banco de talentos

**Linha sob o botão**: Sem promessa de vaga ou de prazo. O que o cadastro garante é que, quando a vaga existir, você é chamado primeiro.

**Página de confirmação**
Título: Você está no banco de talentos da NID.
Texto: Cadastro registrado em {data}. Quando abrir uma vaga compatível com o seu perfil, uma pessoa da NID te chama pelo WhatsApp ou pelo e-mail para marcar a entrevista. Para sair do banco a qualquer momento, escreva para {email_privacidade}. Enquanto isso, continue desenhando: a sua área de membros está aqui: {link_area_membros}

**E-mail de confirmação (automático, remetente "NID", imediato)**
Assunto: Você está no banco de talentos da NID
Corpo: Olá, {primeiro_nome}. Seu cadastro no banco de talentos da NID foi registrado em {data}, com validade de 24 meses. Quando abrir uma vaga de BDR, SDR ou closer compatível com o seu perfil, uma pessoa da NID te chama para marcar a entrevista. Para sair do banco a qualquer momento, responda a este e-mail ou escreva para {email_privacidade}; a gente apaga os seus dados em até 15 dias. NID · Consultoria de Performance Comercial

[Nota de implementação: o envio aplica `F2-banco-talentos` e grava a data e a versão deste texto de consentimento (`consentimento-banco-talentos@1.0.0`). Campos conforme a seção 5.3 do fluxo; nenhum dado além desses. O formulário envia para o endpoint do orquestrador, nunca para terceiros. Aviso de privacidade do Funil 2 linkado no rodapé.]

---

## 7. CB3 · Convite para entrevista (só com vaga real)

**Código**: CB3
**Momento**: quando existe vaga aberta e compatível; humano decide
**Canal**: WhatsApp (se houver telefone e sem opt-out) ou e-mail, enviado por uma pessoa da NID
**Condição**: `F2-banco-talentos`; vaga real registrada pelo humano
**CTA único**: confirmar a entrevista

**WhatsApp**

Aqui é {nome_humano}, da NID. Você está no nosso banco de talentos desde {mês e ano}. Abriu uma vaga de {BDR, SDR ou closer} para {projeto descrito por segmento, por exemplo "um projeto de prospecção para uma indústria de embalagens"}, {modalidade}, e o seu perfil é compatível. Quero te conhecer em uma entrevista de cerca de {duração}, {formato_entrevista}. Consegue em {data_entrevista}, às {horario_entrevista}? Se não der, me diz dois horários que funcionem.

{nome_humano}, da NID

**E-mail**
**Assunto**: Entrevista na NID: vaga de {BDR, SDR ou closer}
**Corpo**

Olá, {primeiro_nome}. Aqui é {nome_humano}, da NID.

Você está no nosso banco de talentos desde {mês e ano}. Abriu uma vaga de {BDR, SDR ou closer} para {projeto descrito por segmento}, {modalidade}, e o seu perfil é compatível.

Quero te conhecer em uma entrevista de cerca de {duração}, {formato_entrevista}. Proposta de data: {data_entrevista}, às {horario_entrevista}. Se não der, responda com dois horários que funcionem para você.

Na entrevista a gente conversa sobre o projeto da vaga e sobre como você desenha e apresenta. Leve o projeto que você enviou para avaliação; é por ele que a conversa começa.

{nome_humano}, da NID
NID · Consultoria de Performance Comercial

[Nota: nenhuma menção a remuneração, contratação ou prazo de resposta da NID no convite; isso é assunto da entrevista e do processo de contratação, fora do escopo do Funil 2. Confirmação registrada pelo humano como `entrevistado` após a entrevista.]

---

## Checklist de coerência deste arquivo

- [x] CB0 sem menção ao banco; CB1 assinado "Henrique Leite, sócio da NID"; CB2 e devolutivas assinados NID; CB3 assinado por quem envia, "da NID"
- [x] Nenhuma promessa de vaga, prazo ou remuneração; a frase permitida ("convite para entrevista quando houver vaga") está em CB1, CB2 e no formulário
- [x] Consentimento com finalidade, prazo (24 meses), como sair (e-mail), prazo de exclusão (15 dias) e ausência de compartilhamento, em linguagem clara; versão registrada
- [x] Reconhecimento em CB0 e CB1 só com dados registrados, com as linhas condicionais marcadas
- [x] Campos do banco iguais à seção 5.3 do fluxo; nenhum dado a mais
- [x] Um CTA por mensagem; sem travessão; sem emoji; sem "pra" ou "pro"; sem termo interno no texto para a pessoa
