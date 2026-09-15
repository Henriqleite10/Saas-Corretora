# Plataforma NID · Página de vendas

| Campo | Valor |
|---|---|
| Produto | Plataforma NID (R$ 980 por ano) |
| Promessa oficial (brief, 3.2) | Um ano de prática do método com a NID: minicursos, comunidade e encontros para quem quer desenhar e fechar projetos maiores, sempre |
| CTA oficial | "Quero praticar o método com a NID por R$ 980 por ano" (proposta do agente `plataforma`, adotada aqui; ponto para aprovação do Henrique) |
| Preço e condição | R$ 980 por ano. Pix à vista ou em até 12 vezes no cartão. Nenhuma peça cita valor de parcela nem "sem juros" até o teste do checkout confirmar |
| Garantia | 7 dias de garantia, reembolso sem pergunta |
| Modos da página | A) fechada, fora do período de matrícula, com lista de aviso; B) aberta, durante os 7 dias de matrícula; C) ex-assinante reativando, a qualquer momento |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |
| Fonte | `docs/00-brief-mestre.md` (seções 3.2, 4, 5, 6.5, 10); `docs/01-parecer-estrategico.md` (2.5, 2.6, 4 linha 6.5, 6 itens 5 e 11); `produtos/plataforma/01-estrutura.md`, `02-catalogo.md`, `03-comunidade-e-encontros.md`, `04-lancamento-interno.md` (seções 3, 5 e 6.2), `05-retencao-e-renovacao.md` |

Como ler este arquivo: cada seção traz o texto final da página, na ordem em que aparece na tela. Quando um bloco muda conforme o modo, ele está marcado com **[Modo A]**, **[Modo B]** ou **[Modo C]**; o que não está marcado vale nos três modos. Notas entre colchetes são instruções para quem implementa e não vão para a página. Datas nunca são escritas aqui: aparecem como variáveis (`{data_abertura}`, `{data_fechamento}`, `{data_abertura_turma}`, `{mes_proxima_abertura}`), preenchidas pelo `automacao` quando a data real existir. Toda promessa desta página existe nos arquivos `01` a `05` da Plataforma. As marcas **[com PDF]** e **[sem PDF]** são alternativas no mesmo bloco, ligadas à variável `nidflow_pdf_disponivel` (item B-07 do backlog do NIDflow): só a versão que corresponde à variável vai para a página.

Regra da primeira abertura: a página descreve o catálogo como ele estará na primeira abertura (três minicursos publicados, quatro a publicar, um por trimestre; A-01 incluso como bônus; condição de fundador). Nas aberturas seguintes, o `plataforma` informa ao `copy` o que mudou (minicursos publicados, bônus da abertura) e as seções 6, 10 e 13 são atualizadas antes de a página voltar ao ar. Nada nesta página é escrito de um jeito que precise ficar verdadeiro para sempre.

---

## Seção 1 · Hero

**Selo acima da headline**
Plataforma NID · o ambiente em que o método continua

**Headline**
Você já desenha o projeto. Agora, pratique com quem vende projeto todos os dias.

**Subheadline**
Um ano dentro do ambiente da NID: todo projeto passa pela mesa antes de ir para o cliente, a NID responde em até 2 dias úteis, uma Mesa de Projetos ao vivo a cada quinze dias, sete minicursos para as situações que o playbook não cobre e o NIDflow incluso.

**[Modo A · fechada] CTA principal**
Quero ser avisado da próxima abertura

**[Modo A] Linha sob o CTA**
A Plataforma NID abre em períodos de matrícula de 7 dias, para a turma entrar junta. A próxima abertura é avisada com 30 dias de antecedência, por e-mail. R$ 980 por ano, 7 dias de garantia.

**[Modo B · aberta] CTA principal**
Quero praticar o método com a NID por R$ 980 por ano

**[Modo B] Linha sob o CTA**
7 dias de garantia, reembolso sem pergunta. Pix à vista ou em até 12 vezes no cartão. Matrícula aberta até segunda-feira, {data_fechamento}, às 23h59.

**[Modo C · ex-assinante] Headline**
O ambiente continuou. Sua anuidade pode voltar hoje.

**[Modo C] Subheadline**
Reative em um clique: acesso completo no ato, seus projetos do NIDflow de volta, a próxima Mesa de Projetos na sua agenda. Sem esperar período de matrícula, sem Abertura de turma: você já conhece o ambiente.

**[Modo C] CTA principal**
Reativar minha anuidade por R$ 980

**[Modo C] Linha sob o CTA**
7 dias de garantia, reembolso sem pergunta. Pix à vista ou em até 12 vezes no cartão. Nova data de renovação a partir de hoje.

**Prova rápida (faixa abaixo do hero, nos três modos)**
O mesmo método e a mesma revisão com que a NID, consultoria de performance comercial, desenha e vende projetos com setup e mensalidade para empresas de educação, saúde, indústria, varejo e serviços.

[NÚMERO REAL] pessoas praticam o método no ambiente da NID.

[Nota: a segunda linha entra só com número real de assinantes ativos, depois da primeira turma. Até lá, a faixa mostra só a primeira frase.]

---

## Seção 2 · Faixa de estado

**[Modo A]**
Matrícula fechada. Próxima abertura: {mes_proxima_abertura}. [Se o mês ainda não estiver decidido: "Próxima abertura avisada com 30 dias de antecedência."] Deixe seu e-mail e receba o aviso, com o link do checkout uma hora antes de abrir para todo mundo.

[Campo: e-mail. Botão: "Quero ser avisado da próxima abertura". Confirmação na própria faixa: "Anotado. Você recebe o aviso da abertura no e-mail {email}." A confirmação aplica a lista de interesse no orquestrador.]

**[Modo B]**
Matrícula aberta de terça-feira, {data_abertura}, às 10h, até segunda-feira, {data_fechamento}, às 23h59. A turma começa junta na quinta-feira, {data_abertura_turma}, às 19h, na Abertura de turma.

[Nota: a contagem regressiva só aparece nos dois últimos dias de matrícula (domingo e segunda), com a data e a hora reais de fechamento. Fora disso, a faixa mostra a data por extenso. Nunca "vagas", nunca "últimas horas" antes de ser literalmente o último dia.]

**[Modo C]**
Sua anuidade terminou em {data_fim_anuidade}. Seus minicursos avançados comprados continuam seus. Seus projetos do NIDflow ficam guardados por 90 dias a partir dessa data. Reative e tudo volta no ato.

---

## Seção 3 · A dor

**Título**
Você aplicou o método. E cada proposta nova trouxe uma situação que o playbook não cobre.

**Texto**
O playbook deu a sequência: Dor, Solução, Arquitetura, Valor. Você desenhou a primeira proposta com ele e viu a diferença na reunião. Depois veio a segunda. E a terceira trouxe um cliente que não tem número nenhum para colocar no canvas de dor. A quarta, um sócio que discordou da frase de solução na frente do outro. A quinta era grande demais para caber em um fluxo de uma página. A sexta ia para um comitê que você nunca ia encontrar. A sétima era a renovação de um cliente que já é cliente, e a conversa virou "renova ou não renova".

Em cada uma dessas, você voltou ao playbook, e o playbook estava certo, mas não tinha a resposta para aquela situação. Então você decidiu sozinho. A proposta saiu. Você não teve com quem discutir antes de apresentar, e descobriu o furo na frente do cliente.

**Subtítulo**
Se você aplica o método, já viveu pelo menos uma destas.

**Cards de dor (cinco, com aspas)**

1. "O cliente não me dá número. Como eu faço a conta da dor com quem diz 'não sei'?"
2. "Apresentei a frase de solução e ele disse 'só me diz o que você vai fazer'. Perdi o fio."
3. "O projeto tem doze etapas e três fornecedores. Não cabe em uma página e o cliente quer 'começar pequeno'."
4. "A decisão é de um comitê que eu nunca vou ver. O que eu mando precisa vender sozinho."
5. "O contrato vence e a conversa virou preço de novo. Como eu desenho a renovação como projeto?"

**Texto de fechamento**
Quem aplica o método sozinho chega ao mesmo ponto: a proposta de hoje sai igual à de três meses atrás, porque ninguém olhou o projeto antes de o cliente olhar. O que falta não é mais método. É repetição com revisão, com gente que vende projeto todos os dias.

---

## Seção 4 · A tese

**Título**
Projeto revisado antes de apresentar. É assim que a NID trabalha, e é isso que o ambiente entrega.

**Texto**
Na NID, nenhuma proposta vai para o cliente sem passar por outros olhos. Alguém lê a frase da dor e pergunta se o número é do cliente. Lê a frase de solução e pergunta se o cliente concordou. Percorre o desenho e pergunta onde está o primeiro resultado visível. Chega ao valor e confere se a régua é a mesma da dor. É uma revisão de vinte minutos que muda o que o cliente responde.

A Plataforma NID é o lugar em que o seu projeto passa por essa revisão. Você coloca o projeto na mesa, descrito por segmento, [com PDF] com o template preenchido ou o PDF do NIDflow [sem PDF] com o template preenchido. Alguém da NID responde em até 2 dias úteis, apontando a etapa que precisa de trabalho e o que mudar. A cada quinze dias, quatro projetos são revisados ao vivo, página por página, por Henrique Leite, sócio da NID, na Mesa de Projetos. E para cada situação que o playbook não cobre, existe um minicurso com a resposta da NID e um entregável feito no seu projeto real.

Não é lugar de assistir aula e sumir. É lugar de levar o projeto que está na sua mesa e devolvê-lo melhor.

---

## Seção 5 · Como funciona o ano

**Título**
Um ritmo fixo, feito para quem vende de dia.

**Texto de abertura**
Tudo o que acontece no ambiente tem data e gravação. Os encontros são às 19h, em dia de semana, e a gravação sai em até 2 dias úteis, com índice por projeto. O mínimo que funciona: um projeto na mesa quando você tiver proposta e uma Mesa por mês, ao vivo ou gravada.

**Cards (quatro, um por tipo de encontro)**

**Mesa de Projetos · a cada quinze dias · quartas, 19h às 20h15**
Quatro projetos reais de assinantes, revisados ao vivo, página por página: a frase da dor, a frase de solução, o desenho, o valor, o próximo passo. Quem apresenta lê a página; a NID pergunta; a sala comenta depois. Para apresentar, basta ter o projeto na mesa até a segunda-feira anterior. Para assistir, nada. 24 por ano.

**Encontro de Método · mensal · primeira terça, 19h às 20h**
Uma etapa ou uma situação do método aprofundada a partir das cinco dúvidas mais comentadas do mês, com um caso desenhado ao vivo no NIDflow. Quando um minicurso novo é publicado, o Encontro do mês é a aula ao vivo dele. 12 por ano.

**Caso NID · trimestral · 19h às 20h**
Um projeto que a NID vendeu, do diagnóstico ao fechamento, com as páginas reais descritas por segmento, o que deu errado e o que a NID mudou. Conduzido por Henrique com o responsável da frente daquele projeto na NID. 4 por ano.

**Abertura de turma · uma por período de matrícula · quinta seguinte ao fechamento, 19h**
Quem entrou na turma coloca o primeiro projeto na mesa; três deles são revisados ao vivo; a NID mostra por onde cada perfil começa na trilha. É o primeiro encontro do seu ano.

**Texto de fechamento**
Entre um encontro e outro, a comunidade continua: toda segunda a NID publica a revisão completa de um projeto da mesa, por escrito; toda sexta, o resumo do que os assinantes apresentaram na semana e o que decidiu cada reunião. Você recebe um único e-mail por semana com tudo isso e o próximo encontro. Nenhuma notificação por post.

---

## Seção 6 · As trilhas

**Selo**
Trilha "O método na prática" · inclusa na anuidade

**Título**
Sete minicursos, um para cada situação que aparece quando o método já está sendo aplicado.

**Texto de abertura**
Nenhum deles repete o playbook nem as aulas do mini curso. Cada um começa onde os dois param: na situação que apareceu na sua proposta. Aulas de 10 a 15 minutos, gravadas por Henrique Leite, sócio da NID, com um entregável feito no seu projeto real e o botão "Levar para a Mesa de Projetos" no fim. Tudo o que está publicado fica aberto desde o primeiro dia; a ordem é sugestão, não bloqueio.

**Cards (sete, com número, nome, etapa do método e promessa)**

**I-01 · Antes da Dor** · Dor · publicado
Você sai de qualquer primeira conversa com a conta do custo feita com o cliente, mesmo quando ele não tem número, e sabe o que fazer quando quem está na sala não decide. Cinco aulas.

**I-02 · A tese recusada** · Solução · publicado
Você sabe o que fazer quando o cliente não diz "faz sentido": reformular sem ceder, sustentar a ordem do método e sair com uma tese que o cliente reconhece como dele. Cinco aulas.

**I-03 · Projeto em fases** · Arquitetura · publicado
Você desenha projetos grandes em fases que o cliente aprova uma por vez, com um primeiro resultado visível na primeira fase, sem perder o projeto inteiro de vista. Cinco aulas, com o desenho em dois níveis no NIDflow.

**I-04 · A conta do valor** · Valor · primeiro trimestre da anuidade
Você monta a ancoragem de valor mesmo quando a dor não tem cifrão, precifica por etapa ou fase em vez de por hora e responde ao pedido de desconto com o desenho, não com o preço. Cinco aulas.

**I-05 · Comitê e compras** · Arquitetura e Valor · segundo trimestre
Você entrega um projeto desenhado que o comitê percorre sozinho, prepara quem vai defendê-lo lá dentro e responde a um pedido formal de proposta sem virar orçamento. Quatro aulas.

**I-06 · Renovação e expansão** · as quatro etapas · terceiro trimestre
Você trata a renovação como um projeto desenhado: dor nova, tese nova, arquitetura da próxima fase e valor ancorado no que já foi entregue, em vez de disputar o mesmo preço de novo. Quatro aulas.

**I-07 · Proposta em 48 horas** · as quatro etapas · quarto trimestre
Você monta uma rotina em que a proposta sai em dois dias úteis a partir do diagnóstico, reaproveitando o que já desenhou, sem abandonar a ordem do método. Quatro aulas, com o banco de componentes no NIDflow.

**Linha abaixo dos cards**
Três minicursos publicados na abertura e um novo a cada trimestre, com data anunciada com 30 dias de antecedência e cumprida na data. Tudo o que entra durante a sua anuidade está incluso. Nada é vendido como "atualização".

[Nota: a marcação "publicado" e "trimestre" de cada card é atualizada pelo `plataforma` antes de cada abertura. Nunca marcar como publicado um minicurso que ainda não está no ambiente.]

**Subseção · Trilha "Avançados"**

**Título**
Para quem vende um tipo específico de projeto: os avançados, vendidos dentro do ambiente.

**Texto**
Alguns projetos só parte dos assinantes vende: automação comercial com IA, geração de demanda, time comercial terceirizado. São as frentes que a NID vende no Funil dela para empresas, e cada uma tem um minicurso avançado, gravado por Henrique com quem opera aquela frente na NID, com as telas reais da operação. Ficam bloqueados, com a primeira aula aberta como amostra, e são comprados dentro do ambiente por assinantes, a partir de R$ 197 cada, com acesso mantido mesmo depois da anuidade. Cobrar de todos no anual encareceria a anuidade para quem não vende aquele tipo de projeto; por isso ficam à parte.

**[Modo B, primeira abertura] Destaque**
Nesta abertura, o avançado "Projeto de automação comercial com IA" está incluso para quem entrar na turma. A partir da próxima abertura, ele passa a ser vendido dentro do ambiente por R$ 197. Detalhe na seção de bônus.

---

## Seção 7 · A Mesa de Projetos

**Título**
O que acontece quando o seu projeto vai para a mesa.

**Passos (cinco, em sequência, com número)**

**1. Você coloca o projeto na mesa.**
Um formulário de cinco minutos: segmento do cliente (sem nome), etapa em que o projeto está, o que trava, e o anexo ([com PDF] o template preenchido ou o PDF do NIDflow [sem PDF] o template preenchido). Se você acabou de terminar um minicurso, o botão "Levar para a Mesa de Projetos" já cria o post com o entregável.

**2. Alguém da NID responde em até 2 dias úteis.**
Por escrito, no seu post: a etapa que precisa de trabalho e o que mudar, no arco do método. Sem "ficou ótimo". Se a dor não tem número, a resposta diz isso e diz como conseguir. Outros assinantes comentam também.

**3. Se for escolhido, o projeto vai para a Mesa ao vivo.**
Quatro projetos por Mesa, com prioridade para quem nunca apresentou. Três minutos seus para ler a página, oito minutos da NID revisando, quatro da sala. Sempre na mesma ordem: dor, solução, desenho, valor, próximo passo. O checklist do capítulo 9 do playbook na tela.

**4. Você refaz a página e apresenta ao cliente.**
O entregável da Mesa é sempre o mesmo: volte ao projeto e refaça a página que travou. Depois da reunião, você conta o que aconteceu em "Propostas apresentadas": o que o cliente disse em cada página, a objeção, o resultado.

**5. O projeto pode voltar à mesa quantas vezes precisar.**
Sempre como comentário no post original, para manter o histórico. Um projeto que voltou três vezes é um projeto que foi apresentado três vezes melhor.

**Texto de fechamento**
A comunidade fica dentro do ambiente, com o mesmo login, não em grupo de mensagens. Histórico pesquisável, posts ligados aos minicursos e aos encontros, moderação da NID com regras escritas. Ninguém prospecta ninguém lá dentro. Quem vende serviço para outro assinante sai.

---

## Seção 8 · O que está incluso

**Título**
O que fica no seu acesso durante os doze meses.

**Itens (cada um com título, descrição e o que significa para você)**

**1. A trilha "O método na prática": sete minicursos**
Três publicados na abertura, quatro publicados um por trimestre durante a anuidade, todos com aulas de 10 a 15 minutos, materiais e entregável no seu projeto real.
O que isso significa para você: a próxima situação que o playbook não cobre já tem a resposta da NID praticada, antes de você decidir sozinho.

**2. A comunidade da NID, com resposta em até 2 dias úteis**
Cinco espaços: Projetos na mesa, Propostas apresentadas, Dúvidas do método, Encontros e Avisos da NID. Todo projeto na mesa e toda dúvida do método recebem comentário de alguém da NID em até 2 dias úteis.
O que isso significa para você: a proposta deixa de ir para o cliente sem revisão. Você descobre o furo na mesa, não na reunião.

**3. A agenda: 40 encontros ao vivo, todos gravados**
24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID e a Abertura de turma, sempre às 19h em dia de semana, com gravação em até 2 dias úteis e índice por projeto ou assunto.
O que isso significa para você: uma Mesa por mês, ao vivo ou gravada, já muda o que você apresenta. Quem vende de dia não perde nada.

**4. As aulas do mini curso e os materiais do playbook, na Biblioteca**
As oito aulas do Mini curso NID · Apresente para Fechar e o playbook com os cinco templates ficam dentro do ambiente, mesmo para quem não comprou os dois.
O que isso significa para você: desenho, apresentação e prática no mesmo lugar, com o mesmo login.

**5. A Biblioteca**
Os cinco templates do método, o modelo de proposta em nove páginas, o roteiro de apresentação, o checklist de reunião, o banco de objeções, a régua de follow-up e os projetos desenhados por segmento, revisados na Mesa e publicados com autorização.
O que isso significa para você: quando aparecer um cliente de um segmento que você nunca vendeu, existe um projeto daquele segmento desenhado e revisado para você começar.

**6. O NIDflow, incluso durante toda a anuidade**
A ferramenta em que a NID desenha e apresenta os projetos dela, com os templates do método dentro, [com PDF] o modo de apresentação e a exportação em PDF [sem PDF] o modo de apresentação. Mesmo login, um clique para ativar. Sozinho, o NIDflow custa R$ 29,90 por mês, ou R$ 358,80 por ano.
O que isso significa para você: o projeto que vai para a mesa é o mesmo que vai para a tela do cliente. Se você já assina o NIDflow, a mensalidade encerra no ciclo seguinte, sem cobrança dupla.

**7. Um único e-mail por semana e lembrete de encontro**
Toda sexta, "a semana no ambiente": o projeto da semana revisado, os posts mais comentados, o próximo encontro e o que foi publicado. Lembrete em D-1 e uma hora antes de cada encontro.
O que isso significa para você: você não precisa entrar todo dia para não perder nada. Entra quando tem proposta.

**Linha abaixo dos itens**
O que não está incluso, para ninguém ter surpresa: os minicursos avançados (comprados dentro do ambiente, a partir de R$ 197) e os serviços que a NID presta para empresas (geração de demanda, automação comercial com IA e terceirização de time comercial). O ambiente é para praticar o método; não é a consultoria.

---

## Seção 9 · Prova social

**Título**
Quem já levou projeto para a mesa.

[DEPOIMENTO REAL] · nome, cargo, empresa ou segmento, o que mudou na proposta depois da revisão.

[DEPOIMENTO REAL] · nome, cargo, empresa ou segmento, o que mudou na proposta depois da revisão.

[DEPOIMENTO REAL] · nome, cargo, empresa ou segmento, o que mudou na proposta depois da revisão.

[Nota: seção oculta até existirem pelo menos três depoimentos reais e autorizados de assinantes. Na primeira abertura não existem assinantes; a seção fica oculta e o lugar dela é ocupado pela seção 10 (a prática da NID). A partir da segunda abertura, priorizar a publicação: é a seção de maior impacto na conversão. Formato: foto, nome, cargo, empresa ou segmento, frase específica sobre o projeto revisado. Nunca inventar. Relatos de "Propostas apresentadas" só entram com autorização por escrito.]

---

## Seção 10 · A prática por trás do ambiente

**Título**
A NID revisa projeto porque vende projeto.

**Texto**
A NID é uma consultoria de performance comercial. Vende para empresas geração de demanda, automação comercial com IA e terceirização de BDR, SDR e closer, sempre como projeto com setup e mensalidade. Nenhum desses projetos existe antes de ser desenhado, revisado e apresentado. É por isso que a revisão no ambiente segue a mesma ordem da revisão interna da NID: a frase da dor, a frase de solução, o desenho, o valor, o próximo passo.

Ao longo dos anos, vendendo projeto para empresas de educação, saúde, indústria, varejo e serviços, a NID viu as mesmas situações voltarem: o cliente sem número, a tese recusada, o projeto grande demais, o comitê, a renovação. Os sete minicursos da trilha são a resposta da NID a cada uma delas. Os Casos NID mostram os projetos reais, descritos por segmento, com o que deu errado.

Quem conduz a Mesa de Projetos e o Encontro de Método é Henrique Leite, sócio da NID, que aplica o método nos projetos que a NID vende. A comunidade é da NID, com regras da NID e moderação de gente da NID.

---

## Seção 11 · Bônus e condição de fundador

**[Modo B, primeira abertura]**

**Título**
O que só a primeira turma recebe.

**Texto de abertura**
Duas coisas são verdadeiras nesta abertura e não vão se repetir do mesmo jeito. A gente conta exatamente por quê.

**Bloco 1 · Bônus desta abertura: o avançado "Projeto de automação comercial com IA", incluso**
Seis aulas de 15 a 20 minutos em que Henrique e o responsável pela automação comercial na NID desenham um projeto de automação do jeito que a NID desenha os dela: da dor operacional do cliente à arquitetura de agentes, com valor ancorado e investimento em setup e mensalidade. Um projeto real da NID, por segmento, desenhado ao vivo no NIDflow. Por que é só desta abertura: o avançado foi publicado para esta turma; a partir da próxima abertura, é vendido dentro do ambiente por R$ 197. Quem entra agora fica com ele para sempre, mesmo sem anuidade ativa.

**Bloco 2 · Condição de fundador: três coisas que só fazem sentido na primeira turma**

- **Revisão por escrito de um projeto seu, página por página.** Nos primeiros 60 dias, você envia um projeto marcado como "revisão de fundador" e alguém da NID devolve a revisão completa, por escrito, em até 5 dias úteis. Por que só agora: com a primeira turma, cabe. Com turmas maiores e mais frequentes, não cabe.
- **Voto com peso dobrado no catálogo.** No mês 12, os assinantes votam nos dois minicursos inclusos do ano seguinte. O voto de quem é fundador vale dois. Por que: a primeira turma é a que vive o catálogo inteiro sendo construído.
- **Selo de fundador.** No seu perfil da comunidade e em "Minha conta", enquanto a anuidade estiver ativa. É um fato: você entrou na primeira turma.

**Linha de fechamento**
O que a condição de fundador não é: não é preço menor, não é preço travado e não é acesso vitalício. É o que a NID consegue cumprir para a primeira turma, e por isso pode prometer.

**[Modo B, aberturas seguintes]**

**Título**
O que só esta turma recebe.

**Texto**
{descricao_bonus_da_abertura} [O `plataforma` define o bônus real 30 dias antes da abertura: o avançado do semestre incluso, ou uma Mesa de Projetos fechada para a turma nova, com quatro projetos da turma. O texto segue o padrão do bloco 1 acima: o que é, por que é verdadeiro que é só desta abertura e o que acontece depois. Nunca dois bônus, nunca "vitalício", nunca bônus que não esteja publicado.]

**[Modo A e Modo C]**
[Seção oculta. No Modo A, a faixa de estado já diz que a próxima abertura é avisada com 30 dias; o bônus só é anunciado quando existir. No Modo C, ex-assinante não recebe bônus de abertura nem condição de fundador (quem foi fundador recupera o selo ao reativar, e isso está na seção 13).]

---

## Seção 12 · Para quem é e para quem ainda não é

**Título**
A Plataforma NID é para quem já aplica o método.

**Coluna "É para você se"**

- Você leu o Playbook NID · Desenhe para Vender e já desenhou pelo menos uma proposta com o método, ou vai desenhar a próxima com ele.
- Você é vendedor B2B e cada proposta nova traz uma situação que o playbook não cobre: cliente sem número, tese recusada, projeto grande, comitê, renovação.
- Você é SDR ou BDR e quer um lugar para desenhar as oportunidades que qualifica, com revisão, até ter portfólio para conduzir uma conta.
- Você é closer ou executivo de contas e precisa de um projeto que sobreviva ao comitê sem você na sala.
- Você é consultor ou dono de serviço, vende o próprio trabalho e quer parar de resolver cada situação do zero.

**Coluna "Ainda não é para você se"**

- Você ainda não tem o playbook. O ambiente começa onde o playbook termina: a comunidade discute projeto desenhado com o método, e os minicursos partem dele. Comece pelo playbook, por R$ 29,90, e a próxima abertura vem.
- Você leu o playbook, mas ainda não aplicou em uma proposta real. Aplique primeiro. A revisão da NID vale para projeto que existe; sem projeto, o ambiente vira aula para assistir, e não é para isso que ele foi feito.
- Você procura rede de contatos ou clientes entre os assinantes. Ninguém prospecta ninguém lá dentro, e a regra é cumprida.
- Você é empresário ou diretor e quer contratar geração de demanda, automação comercial ou time de vendas para a sua empresa. Nesse caso, a NID desenha o seu projeto com você: fale com a gente pelo WhatsApp.

[Nota: o primeiro item da segunda coluna leva à página do playbook. O último leva ao WhatsApp da NID com o texto pré-preenchido "Quero falar sobre a minha empresa · PG03". `PG03` é o código de origem desta página; o agente o reconhece na linha de abertura (`automacoes/sequencias/06-agente-direct-whatsapp.md`, seção 4) e encaminha ao humano da consultoria. O clique não aplica etiqueta: etiqueta só nasce de resposta registrada. São os dois únicos links da página que não vão para o checkout ou para a lista de aviso.]

---

## Seção 13 · Valor e oferta

**Título**
Quanto custa a próxima proposta que sai sem revisão?

**Texto**
Você conhece esse número melhor do que a gente. Um projeto perdido por uma proposta mal desenhada vale um contrato, uma comissão, um trimestre de meta. A anuidade da Plataforma NID custa R$ 980 por ano.

Dentro desse valor já estão duas coisas que você compraria separadas: o NIDflow, que sozinho custa R$ 358,80 por ano, e as aulas do Mini curso NID · Apresente para Fechar, que custam R$ 147. O resto é o que não se compra avulso: a resposta da NID no seu projeto em até 2 dias úteis, 24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID, sete minicursos e a Biblioteca.

**Card de oferta**

Plataforma NID · um ano de prática do método com a NID

- Trilha "O método na prática": sete minicursos inclusos, três publicados na abertura e um novo por trimestre
- Comunidade da NID, com resposta a todo projeto na mesa em até 2 dias úteis
- 24 Mesas de Projetos, 12 Encontros de Método, 4 Casos NID e a Abertura de turma, todos gravados
- Aulas do mini curso e materiais do playbook na Biblioteca
- Biblioteca completa: templates, modelo de proposta, roteiro, checklist, banco de objeções, régua de follow-up, projetos por segmento
- NIDflow incluso durante toda a anuidade (R$ 358,80 por ano, se comprado à parte)
- **[Modo B, primeira abertura]** Bônus desta abertura: o avançado "Projeto de automação comercial com IA" (R$ 197 dentro do ambiente a partir da próxima abertura)
- **[Modo B, primeira abertura]** Condição de fundador: revisão por escrito de um projeto, voto com peso dobrado, selo

R$ 980 por ano
Pix à vista ou em até 12 vezes no cartão

**[Modo A] CTA do card**
Quero ser avisado da próxima abertura

**[Modo A] Linha sob o CTA**
Matrícula fechada. Próxima abertura: {mes_proxima_abertura}. R$ 980 por ano, 7 dias de garantia. Você recebe o link uma hora antes de abrir para todo mundo.

**[Modo B] CTA do card**
Quero praticar o método com a NID por R$ 980 por ano

**[Modo B] Linha sob o CTA**
7 dias de garantia, reembolso sem pergunta. Matrícula aberta até segunda-feira, {data_fechamento}, às 23h59. A turma começa quinta-feira, {data_abertura_turma}, às 19h.

**[Modo C] CTA do card**
Reativar minha anuidade por R$ 980

**[Modo C] Linha sob o CTA**
7 dias de garantia, reembolso sem pergunta. Acesso completo no ato. Seus projetos do NIDflow voltam com a conta (se dentro de 90 dias do fim da anuidade). Se você foi fundador, o selo volta. Você entra na próxima Mesa de Projetos, sem esperar Abertura de turma.

**Nota abaixo do card, nos três modos (para quem já assina o NIDflow)**
Já assina o NIDflow? Sua mensalidade encerra no ciclo seguinte, sem cobrança dupla. A conta continua a mesma, com todos os projetos.

**Nota abaixo do card, nos três modos (renovação)**
A anuidade renova automaticamente em 12 meses, pelo mesmo valor, avisada com 60, 30 e 7 dias de antecedência. Cancelar a renovação é um clique em "Minha conta", sem ligação e sem pergunta obrigatória.

---

## Seção 14 · Garantia

**Título**
Sete dias dentro do ambiente. Se não for o seu lugar, a gente devolve.

**Texto**
Você tem 7 dias corridos a partir da compra para pedir o reembolso, sem pergunta e sem justificativa. Basta responder ao e-mail de acesso ou falar com a gente pelo WhatsApp. O dinheiro volta pelo mesmo meio de pagamento, integral, mesmo que você já tenha colocado projeto na mesa, assistido às aulas e participado de encontro. O acesso ao ambiente e ao NIDflow incluso encerra no ato do reembolso.

---

## Seção 15 · Perguntas que a gente ouve antes da matrícula

**"R$ 980 é muito para mim agora."**
A gente entende, e não vai te apressar. Dentro dos R$ 980 já estão o NIDflow (R$ 358,80 por ano) e as aulas do mini curso (R$ 147); o resto é a prática com a NID. Dá para pagar por Pix à vista ou em até 12 vezes no cartão, e você tem 7 dias de garantia. E, com honestidade: se você ainda não aplicou o playbook em uma proposta real, aplique primeiro. A próxima abertura vem, e o ambiente vai valer mais para quem chega com projeto.

**"Não tenho tempo para comunidade e encontro."**
O ambiente foi feito para quem vende de dia. Os encontros são às 19h, a gravação sai em 2 dias úteis com índice por projeto, e a resposta da NID é por escrito, no seu post. O mínimo que funciona é um projeto na mesa quando você tiver proposta e uma Mesa por mês, ao vivo ou gravada. Não existe obrigação de estar presente, nem ranking de quem posta mais.

**"Já tenho o playbook e o NIDflow. O que muda?"**
Muda a revisão. No playbook, o método é seu e você decide sozinho. No ambiente, o projeto passa por outros olhos e pela NID antes de ir para o cliente. E os sete minicursos tratam do que o playbook não cobre: o cliente sem número, a tese recusada, o projeto em fases, a conta do valor sem cifrão, o comitê, a renovação, a proposta em 48 horas. Se você já assina o NIDflow, a mensalidade encerra no ciclo seguinte e o NIDflow passa a estar dentro da anuidade.

**"Isso é mais um curso?"**
Não. Não tem aula para assistir e sumir. Tem projeto real na mesa, resposta da NID em até 2 dias úteis e uma Mesa de Projetos a cada quinze dias. Os minicursos existem para a situação que apareceu na sua proposta, não para "aprender vendas". Se você entrar e não colocar projeto na mesa, a gente vai te lembrar disso, não vai te mandar mais aula.

**"E se eu não usar?"**
Nos primeiros 7 dias, reembolso sem pergunta. Depois disso, a anuidade vale 12 meses, renova automaticamente pelo mesmo valor e a gente avisa com 60, 30 e 7 dias de antecedência. Cancelar a renovação é um clique em "Minha conta". Ninguém fica preso.

**"Preciso ter comprado o playbook e o mini curso?"**
O playbook, sim: o ambiente parte do método e da proposta desenhada com ele. O mini curso, não: as oito aulas dele ficam inclusas na Biblioteca do ambiente, junto com os materiais do playbook.

**"Não tenho projeto agora. Vale a pena entrar?"**
Se a próxima proposta está a mais de três meses, não. Espere a próxima abertura e entre com projeto. Se está a semanas, sim: o projeto de exemplo do NIDflow serve para a primeira revisão, e o minicurso "Antes da Dor" começa exatamente na conversa que produz o projeto.

**"O que são os minicursos avançados e por que não estão inclusos?"**
São minicursos sobre um tipo específico de projeto (automação comercial com IA, geração de demanda, time comercial terceirizado), gravados com quem opera aquela frente na NID. Só servem a quem vende aquele tipo de projeto; cobrar de todos no anual encareceria a anuidade para quem não vende. Ficam bloqueados dentro do ambiente, com a primeira aula aberta como amostra, e custam a partir de R$ 197 cada. Quem compra fica com o acesso para sempre, mesmo sem anuidade ativa. [Modo B, primeira abertura: "Nesta abertura, o de automação comercial com IA está incluso."]

**"Posso apresentar meu projeto na Mesa de Projetos?"**
Pode. Coloque o projeto em "Projetos na mesa" até a segunda-feira anterior, com o formulário completo e o anexo. A NID escolhe quatro projetos por Mesa, com prioridade para quem nunca apresentou. Enquanto não é a sua vez, a resposta por escrito em até 2 dias úteis já chegou no seu post.

**"O que acontece se eu não puder ir aos encontros ao vivo?"**
A gravação é publicada em até 2 dias úteis, com índice por projeto ou por assunto. O entregável de cada encontro fica escrito no espaço "Encontros". Nenhum encontro tem conteúdo que só existe ao vivo.

**"Isso me dá acesso à consultoria da NID para a minha empresa?"**
Não. O ambiente é para praticar o método de desenho de projetos. Os serviços que a NID presta para empresas (geração de demanda, automação comercial com IA, terceirização de time comercial) são contratados à parte. Se é isso que você procura, fale com a gente pelo WhatsApp e a NID desenha o seu projeto com você.

**"Posso dividir o acesso com um colega?"**
Não. É uma pessoa, um login, um e-mail. Duas sessões simultâneas; a terceira derruba a mais antiga. Compartilhar login encerra a anuidade. Se o seu time inteiro quer entrar, cada pessoa faz a própria matrícula.

**"Tem certificado?"**
Ao concluir cada minicurso, um documento simples com o seu nome, o minicurso e a data. Não é certificado de curso; é o registro de que o entregável foi feito.

**"Como e quando recebo o acesso?"**
Pagamento aprovado, acesso liberado. O link do ambiente chega por e-mail e por WhatsApp em até dois minutos, com os três passos do primeiro dia: ativar o NIDflow, colocar o projeto na mesa, assistir à primeira aula. Pix ou cartão.

**"E se eu não gostar?"**
Você tem 7 dias para pedir reembolso, sem pergunta. Responda ao e-mail de acesso ou fale com a gente pelo WhatsApp.

**[Modo A, pergunta adicional] "Por que a matrícula não fica aberta o ano inteiro?"**
Porque a Abertura de turma, a primeira Mesa e a resposta da NID ao primeiro projeto de cada pessoa exigem que a turma entre junta. É operação, não pressão: a matrícula abre por 7 dias, com data de abertura e de fechamento publicadas, e a próxima abertura é avisada com 30 dias de antecedência. Quem já foi assinante reativa a qualquer momento, porque já conhece o ambiente.

**[Modo C, pergunta adicional] "Meus projetos do NIDflow ainda estão lá?"**
Ficam guardados por 90 dias a partir do fim da anuidade, [com PDF] em modo leitura com exportação em PDF nos primeiros 30 [sem PDF] em modo leitura nos primeiros 30. Reativando dentro desse prazo, a conta volta com todos os projetos. Depois dos 90 dias, a conta é excluída e a reativação cria uma conta nova.

---

## Seção 16 · CTA final

**[Modo A]**

**Título**
A próxima abertura chega com 30 dias de aviso. Você recebe o link primeiro.

**Texto**
Deixe o e-mail e, quando a data existir, a gente avisa. Uma hora antes de a matrícula abrir para todo mundo, o link do checkout chega para quem está nesta lista. Até lá, desenhe a próxima proposta com o playbook: é com ela que você entra.

**CTA**
Quero ser avisado da próxima abertura

**Linha sob o CTA**
R$ 980 por ano. 7 dias de garantia, reembolso sem pergunta. Sem compromisso ao deixar o e-mail.

**[Modo B]**

**Título**
Qual proposta você quer levar para a primeira Mesa?

**Texto**
Pegue o projeto que está na sua mesa agora, o que vai para o cliente nas próximas semanas. Entre, ative o NIDflow, coloque esse projeto na mesa e leve para a Abertura de turma na quinta-feira, {data_abertura_turma}. A revisão da NID chega em até 2 dias úteis. A matrícula fecha segunda-feira, {data_fechamento}, às 23h59, e a próxima abertura é avisada com 30 dias de antecedência.

**CTA**
Quero praticar o método com a NID por R$ 980 por ano

**Linha sob o CTA**
7 dias de garantia, reembolso sem pergunta. Pix à vista ou em até 12 vezes no cartão.

**[Modo C]**

**Título**
A próxima Mesa é em {data_proxima_mesa}. Seu lugar está lá.

**Texto**
Reative agora e entre na próxima Mesa de Projetos com o projeto que está na sua mesa. O acesso volta no ato, com os seus projetos do NIDflow, os minicursos publicados desde que você saiu e a Biblioteca inteira.

**CTA**
Reativar minha anuidade por R$ 980

**Linha sob o CTA**
7 dias de garantia, reembolso sem pergunta. Pix à vista ou em até 12 vezes no cartão.

**Frase de encerramento (nos três modos)**
Quem desenha o projeto, conduz a venda. Quem revisa antes de apresentar, fecha projetos maiores.

---

## Seção 17 · Rodapé

NID · Consultoria de Performance Comercial
NID - Núcleo de Inteligência Digital LTDA · CNPJ 11.698.721/0001-33
Rua José Versolato, 101, Centro, São Bernardo do Campo, SP, CEP 09750-730
Termos de uso · Termos da comunidade · Política de privacidade · Fale com a gente pelo WhatsApp

---

## Modo C · o que muda na página inteira para o ex-assinante

O ex-assinante chega pelos links de "Minha conta" e dos e-mails de modo leitura (`automacoes/sequencias/09-renovacao-plataforma.md`), com a página identificada pelo e-mail. Ele já conhece o ambiente; a página não repete a venda inteira. Ordem das seções no Modo C:

| # | Seção | O que muda |
|---|---|---|
| 1 | Hero | Headline, subheadline, CTA e linha do Modo C |
| 2 | Faixa de estado | Texto do Modo C, com a data do fim da anuidade |
| 3 | O que entrou desde que você saiu | Seção nova, só no Modo C. Título: "O que entrou no ambiente desde {data_fim_anuidade}." Lista gerada pelo orquestrador: minicursos publicados, Casos NID gravados, quantidade de Mesas gravadas, projetos por segmento na Biblioteca. Formato de lista com data, sem adjetivo. Se a lista estiver vazia (anuidade terminou há poucos dias), a seção mostra o próximo encontro com a data |
| 4 | Como funciona o ano | Igual, versão resumida (só os quatro cards) |
| 5 | O que está incluso | Igual |
| 6 | Valor e oferta | Card sem bônus e sem fundador; CTA e linha do Modo C; as duas notas |
| 7 | Garantia | Igual |
| 8 | FAQ | Só estas perguntas: "E se eu não usar?", "Meus projetos do NIDflow ainda estão lá?", "Posso apresentar meu projeto na Mesa?", "O que acontece se eu não puder ir aos encontros?", "Como e quando recebo o acesso?" |
| 9 | CTA final | Texto do Modo C |
| 10 | Rodapé | Igual |

Seções que não aparecem no Modo C: dor, tese, trilhas completas, Mesa passo a passo, prova social, prática da NID, bônus e fundador, para quem é. Motivo: quem foi assinante já passou por tudo isso; a página diz o que voltou de novo, o que está incluso, quanto custa e como reativar.

---

## Especificação para implementação (skill `nid-pages`)

### Ordem das seções e função de cada uma (Modos A e B)

| # | Seção | Função no arco | Componente |
|---|---|---|---|
| 1 | Hero | Promessa + CTA | Headline animada linha a linha; mockup do ambiente à direita (desktop) ou abaixo (mobile) |
| 2 | Faixa de estado | Fato da matrícula | Faixa de uma linha; no Modo A com campo de e-mail; contagem regressiva só nos dois últimos dias do Modo B |
| 3 | Prova rápida | Prova | Faixa de uma linha; segunda linha só com `[NÚMERO REAL]` |
| 4 | A dor | Dor | Texto + 5 cards com stagger |
| 5 | A tese | Solução | Bloco de destaque, fundo off-white |
| 6 | Como funciona o ano | Arquitetura | 4 cards (um por tipo de encontro) com stagger; abaixo, calendário do trimestre (componente de agenda, dados do `plataforma`) |
| 7 | As trilhas | Arquitetura | 7 cards em grid com selo "publicado" ou "trimestre N"; subseção dos avançados com 3 cards bloqueados (cadeado) e o destaque do bônus no Modo B |
| 8 | A Mesa de Projetos | Arquitetura | 5 passos em sequência vertical com linha conectora e pulso percorrendo os passos ao entrar no viewport |
| 9 | O que está incluso | Arquitetura | 7 cards, cada um com "o que isso significa para você"; linha "o que não está incluso" abaixo |
| 10 | Prova social | Prova | Oculta até 3 `[DEPOIMENTO REAL]` |
| 11 | A prática por trás do ambiente | Autoridade (método e prática) | Texto com logo NID |
| 12 | Bônus e fundador | Valor | Só no Modo B; dois blocos lado a lado no desktop |
| 13 | Para quem é | Qualificação | Duas colunas |
| 14 | Valor e oferta | Valor | Card de oferta com CTA e garantia; duas notas abaixo |
| 15 | Garantia | Valor | Bloco curto |
| 16 | FAQ | Objeções | Acordeão; perguntas condicionais por modo |
| 17 | CTA final | Valor | Fundo escuro `#373737`, grid de pontos, linha laranja no topo |
| 18 | Rodapé | Institucional | Dados da NID |

CTA fixo: em mobile, barra inferior fixa com o CTA do modo e "7 dias de garantia" ao lado, após o scroll passar do hero. Em desktop, o CTA aparece na navbar após 40 px de scroll. No Modo A, a barra fixa abre o campo de e-mail da faixa de estado.

### Modos: como a página sabe em qual está

- O `automacao` publica um único parâmetro de estado (`modo = fechada | aberta | reativacao`) e as variáveis de data. A página lê o estado na carga e renderiza os blocos do modo. Nada de três páginas separadas: um único código, três estados, mesma URL para A e B. O Modo C usa a mesma URL com identificação do ex-assinante pelo link de "Minha conta" ou pelos e-mails de modo leitura (parâmetro assinado, sem dado pessoal na URL).
- Troca de estado A → B na terça, às 10h, e B → A na segunda, às 23h59, feita pelo `automacao` junto com o checkout. A página nunca exibe o CTA de compra com o checkout fechado, nem o campo de aviso com o checkout aberto.
- Contagem regressiva: componente ligado apenas quando `modo = aberta` e faltam menos de 48 horas para `{data_fechamento}` às 23h59. Mostra dias, horas e minutos reais. Nunca reinicia, nunca é fictícia.

### Tipografia e cor

- Mesma base da página do playbook e do mini curso: display Syne (700 e 800), corpo DM Sans (400, 500, 700), importadas do Google Fonts com fallback `sans-serif`.
- Variáveis no `:root`: `--laranja: #F26522`, `--laranja-claro: #FF8A4C`, `--cinza-escuro: #373737`, `--cinza-texto: #6B6B6B`, `--off-white: #F5F4F2`, `--linha: #E4E2DE`, `--branco: #FFFFFF`.
- Fundo branco; laranja só em CTA, selos, números dos passos e linha do CTA final. Nenhum gradiente roxo. Nenhuma foto do Henrique como banner.

### Mockup do hero

Um único mockup, em browser frame (barra com três bolinhas; o produto é um ambiente web), alternando automaticamente a cada 4 segundos entre quatro telas, com `AnimatePresence mode="wait"` e transição diagonal (entra x+56 y+56, sai x-56 y-56). Pausa no hover e no toque.

| Tela | O que aparece | Conteúdo |
|---|---|---|
| Projetos na mesa | Um post do formulário fixo (segmento, etapa, o que trava) com o comentário da NID aparecendo abaixo com efeito typewriter | Segmento: "uma empresa de serviços de manutenção predial". Etapa: Valor. O que trava: "o cliente não tem o número da dor". Comentário da NID: "A régua da dor precisa vir da conversa: 25 visitas perdidas por mês por resposta atrasada, valor médio por visita. Volte ao canvas e refaça o campo 'custo' com ele." (conteúdo do caso conduzido do playbook, capítulo 7) |
| Agenda | Calendário do mês com as Mesas de Projetos, o Encontro de Método e o Caso NID, com o card "Reservar meu lugar" | Datas reais do trimestre publicado pelo `plataforma`; até lá, o mês em curso com os dias da semana certos (quarta, primeira terça) e sem números de dia |
| Trilhas | Grade dos sete minicursos com barra de progresso, três marcados como publicados | Nomes reais da trilha |
| NIDflow | Fluxo de arquitetura em cinco blocos aparecendo em cascata, com o selo "incluso na anuidade" | Mapa do atendimento → Construção do agente → Agenda e follow-up → Operação assistida → Operação e revisão mensal (caso conduzido do playbook) |

Indicador da tela ativa abaixo do mockup, com o nome da área. Elemento decorativo: quatro traços laranja atrás do mockup com parallax vinculado ao `scrollYProgress`. Quando o ambiente estiver montado, trocar as telas desenhadas por capturas reais do ambiente (mesmos quatro estados), sem dado pessoal de assinante.

### Vídeo da oferta

Abaixo do hero, no Modo B, o vídeo da oferta (texto em `produtos/plataforma/textos-do-ambiente.md`, seção 1) em player próprio com capa: Henrique dentro do ambiente, legenda "Henrique Leite, sócio da NID". No Modo A, o mesmo vídeo com a faixa "Próxima abertura: {mes_proxima_abertura}". No Modo C, sem vídeo.

### Animações (Framer Motion, ease padrão `[0.25, 0.46, 0.45, 0.94]`)

- Hero: headline linha a linha (`y: 110% → 0%`, stagger 0,08 s), depois subheadline e CTA em FadeUp.
- Todas as seções: FadeUp ao entrar no viewport, `once: true`.
- Cards de dor, encontros, trilhas, itens de "o que está incluso", colunas de "para quem é", FAQ: `staggerChildren` 0,08 s com `delayChildren` 0,1 s.
- A Mesa de Projetos: os cinco passos aparecem em cascata com uma linha conectora que se desenha (`pathLength` 0 → 1) e um pulso laranja percorrendo os passos; `once: false`.
- Mockup do hero: `once: false` (reativa ao voltar para a dobra).
- Trilhas: cards dos avançados com cadeado; hover mostra "primeira aula aberta como amostra".
- Botões e cards: `whileHover scale 1.02`, `whileTap scale 0.97`.
- Navbar: transparente no topo; após 40 px, fundo branco com blur e sombra leve; CTA do modo à direita.
- CTA final: fundo `#373737`, grid de pontos em `#4A4A4A`, linha de 4 px em `#F26522` no topo, headline em branco, CTA laranja.
- Contador animado (`AnimatedNumber`) só para o `[NÚMERO REAL]` da prova rápida, quando existir.

### Prova social

- Seção 9 preparada e oculta por flag (`provaSocialAtiva=false`). Ativar só com três depoimentos reais e autorizados de assinantes.
- Prova rápida do hero: a frase sobre a prática da NID é permitida pelo brief (seção 10.6) e entra desde o dia 1.
- Nenhum logo de cliente sem autorização registrada. Nenhum relato da comunidade sem autorização por escrito.

### Regras de conversão

- Um único destino de clique por modo: o checkout (Modo B e C) ou a lista de aviso (Modo A). Exceções: o link para a página do playbook e o WhatsApp para decisores (seção 12) e os links do rodapé.
- CTA com o mesmo texto em todas as ocorrências do mesmo modo (hero, card, CTA final, barra fixa, navbar).
- Garantia visível ao lado de todo CTA de compra.
- Preço sempre "R$ 980". Parcelamento sempre "em até 12 vezes no cartão", sem valor de parcela e sem "sem juros". Nenhum "vagas", nenhum desconto, nenhuma contagem regressiva fora dos dois últimos dias.
- Página carrega em menos de 2 segundos em 4G: imagens em WebP, mockup em SVG animado, fontes com `display: swap`, vídeo carregado sob demanda.
- UTMs preservadas até o checkout (`utm_campaign=F2-plataforma-lancamento-AAAAMM` nas sequências; orgânico conforme o `trafego`). Eventos de pixel `ViewContent` na carga e `InitiateCheckout` no clique do CTA de compra, nomeados pelo `automacao`; no Modo A, evento `Lead` na confirmação do e-mail.
- Formulário de e-mail do Modo A: um campo, validação em tempo real, confirmação na própria faixa, sem redirecionamento. Sem chave de API no cliente.
- Mobile-first: uma coluna abaixo de 768 px, mockup abaixo da headline, barra de CTA fixa no rodapé.
