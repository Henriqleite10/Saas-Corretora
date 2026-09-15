# -*- coding: utf-8 -*-
"""Conteúdo dos slides de apoio, aula por aula. Numeração = [SLIDE N] no roteiro."""

AULAS = {}

AULAS[1] = {"titulo": "Antes de entrar na sala", "slides": [
    {"tipo": "cover", "titulo": "Antes de entrar na sala",
     "sub": "Como a NID prepara a reunião de apresentação: quem decide, formato, agenda em quatro partes e ensaio."},
    {"tipo": "statement", "kicker": "A ideia",
     "texto": "A reunião de apresentação é o momento da [[decisão]]. Não é uma entrega."},
    {"tipo": "pain", "titulo": "Como a reunião se perde antes de começar", "itens": [
        "A proposta vai por e-mail antes da reunião. O cliente pula para o preço.",
        "Ninguém sabe quem decide. O projeto chega no decisor sem você na sala.",
        "O apresentador entra para \"mostrar a proposta\", sem data na cabeça. Termina em \"vou pensar\"."]},
    {"tipo": "list", "kicker": "O jeito NID", "titulo": "Cinco verificações antes de toda apresentação", "itens": [
        ("Quem decide e quem vai estar na sala", "Perguntado na hora de marcar. O decisor na reunião, ou você já sabe que não vem."),
        ("A proposta passou pelo checklist do playbook", "Dor nas palavras do cliente, tese sem entregável, desenho em uma página, preço só depois do valor, data na última página."),
        ("Formato e tela", "Online: você compartilha a tela, sempre. Presencial: o desenho impresso em uma página."),
        ("O próximo passo já tem data", "O que ele aprova, quando começa, o que você precisa dele na semana 1. Uma data e uma alternativa."),
        ("Ensaio cronometrado", "Ler a proposta em voz alta, do começo ao fim, com relógio. Uma vez.")]},
    {"tipo": "agenda", "kicker": "Os 45 minutos", "titulo": "O tempo segue a ordem do método", "itens": [
        (5, "Abertura", "Contrato de reunião", False), (5, "Dor", "\"Continua sendo isso?\"", False),
        (5, "Solução", "\"Faz sentido?\"", False), (15, "Arquitetura", "O desenho, bloco a bloco", True),
        (10, "Valor e investimento", "A régua e o número", False), (5, "Próximo passo", "A data", False)],
     "nota": "A arquitetura leva um terço do tempo. É o desenho que vende; ele precisa do tempo dele. Se a reunião encolhe, a proporção fica e a ordem não muda."},
    {"tipo": "quote", "kicker": "Na hora de marcar", "titulo": "A frase que traz o decisor",
     "texto": "\"Na próxima reunião eu te mostro o projeto desenhado, com o investimento. [[Quem mais precisa estar na sala para a gente conseguir decidir?]]\"",
     "nota": "Avisa que o preço vem na reunião e coloca a palavra \"decidir\" na mesa antes de a reunião existir. A resposta é o nome do decisor."},
    {"tipo": "grid", "kicker": "Antes da reunião", "titulo": "O que vai e o que não vai", "itens": [
        ("Vai: o convite com a agenda em quatro partes", "\"O problema como você me contou, o que precisa mudar, como funciona na ordem, o que vale perto do que custa.\"", "ok"),
        ("Vai: a confirmação de quem participa", "Um dia antes. Se o decisor caiu, você descobre com tempo.", "ok"),
        ("Não vai: o PDF da proposta", "\"Você recebe o documento completo no mesmo dia, logo depois da nossa conversa.\"", "no"),
        ("Não vai: o preço", "Nem número, nem faixa, nem \"a partir de\".", "no")]},
    {"tipo": "task", "titulo": "Checklist de reunião preenchido para a sua proposta", "itens": [
        "Quem decide e quem vai estar na sala",
        "A proposta passou pelo checklist do playbook",
        "Formato e quem controla a tela",
        "A data que você vai propor, com alternativa",
        "A hora do ensaio, marcada na agenda"],
     "proxima": "Os primeiros cinco minutos: o contrato de reunião que faz o cliente seguir a ordem do método."},
]}

AULAS[2] = {"titulo": "Os primeiros cinco minutos", "slides": [
    {"tipo": "cover", "titulo": "Os primeiros cinco minutos",
     "sub": "O contrato de reunião, quem está na sala e o que fazer quando o preço aparece cedo."},
    {"tipo": "pain", "kicker": "Onde a condução se perde", "titulo": "Três aberturas que entregam a reunião ao cliente", "itens": [
        "\"Quem somos\": cinco minutos falando de você para quem quer saber do projeto dele.",
        "\"Então, como eu falei na outra reunião\": o cliente não lembra. A régua sumiu.",
        "\"E aí, o que achou?\": a reunião começa pelo preço."]},
    {"tipo": "statement", "texto": "Nos primeiros cinco minutos, o cliente decide se vai te [[seguir]] ou te [[avaliar]].",
     "sub": "Toda abertura que fala de você coloca o cliente no modo de avaliação. Toda abertura que fala da reunião e do projeto dele coloca no modo de seguir."},
    {"tipo": "steps", "kicker": "O jeito NID", "titulo": "A abertura em três movimentos", "itens": [
        ("Contrato de reunião", "Trinta segundos: tempo, as quatro partes, onde está o preço, como termina."),
        ("Quem está na sala", "Entrou alguém novo? Apresentação de uma frase, dos dois lados."),
        ("Permissão para começar", "\"Pode ser assim?\" O \"sim\" aqui é o combinado para o resto da reunião.")]},
    {"tipo": "quote", "titulo": "O contrato de reunião",
     "texto": "\"A gente tem 45 minutos. Eu vou te mostrar o projeto desenhado em quatro partes: o problema, do jeito que você me contou; o que precisa mudar; como o projeto funciona, na ordem; e o que isso vale perto do que custa. O investimento está nessa última parte, [[e eu vou chegar nele]]. No fim, eu vou propor um próximo passo com data. [[Pode ser assim?]]\"",
     "nota": "Cinco informações: tempo, quatro partes, onde está o preço, como termina, a pergunta."},
    {"tipo": "list", "kicker": "Duas situações", "titulo": "Quando o preço aparece cedo e quando entra alguém novo", "itens": [
        ("\"Me diz logo quanto é\"", "\"Vou te dar o número, com certeza. Mas se eu te disser agora, você vai comparar com alguma coisa que não é este projeto. Me dá esses 40 minutos e o investimento aparece na estrutura do desenho. Combinado?\""),
        ("Se insistir uma segunda vez", "Faixa ampla e honesta, \"e o que define é o desenho\". Nunca o número exato."),
        ("Entrou alguém novo", "\"Eu sou o Henrique, da NID, e essa reunião é para mostrar o projeto desenhado a partir da conversa com o fulano. Você é?\"")]},
    {"tipo": "grid", "kicker": "Regra", "titulo": "O que a abertura nunca tem", "itens": [
        ("Logo em slide próprio", "Ela está na capa, pequena.", "no"),
        ("Histórico da empresa", "Quem é a sua empresa entra depois do próximo passo, em uma página, se entrar.", "no"),
        ("Portfólio", "Casos reais e autorizados entram na página de valor, como evidência do mecanismo.", "no"),
        ("Preço", "Nem número, nem faixa, nem \"a partir de\".", "no")]},
    {"tipo": "task", "titulo": "A sua abertura escrita no roteiro de apresentação", "itens": [
        "O contrato de reunião com as cinco informações, nas suas palavras",
        "A apresentação da reunião em uma frase, para quando entra alguém novo",
        "Lida em voz alta duas vezes. Se passar de um minuto, corte"],
     "proxima": "Os dois \"sim\": as páginas de dor e de solução, antes de qualquer página de arquitetura."},
]}

AULAS[3] = {"titulo": "Os dois \"sim\"", "slides": [
    {"tipo": "cover", "titulo": "Os dois \"sim\"",
     "sub": "As páginas de dor e de solução: ler, perguntar, silêncio, ajustar na frente do cliente."},
    {"tipo": "statement", "texto": "Antes de qualquer página de arquitetura, o cliente diz [[sim]] duas vezes.",
     "sub": "Uma na página da dor, outra na página da solução. Sem os dois, o desenho parece arbitrário e o preço parece caro."},
    {"tipo": "list", "kicker": "Página 2", "titulo": "A dor: quatro passos em cinco minutos", "itens": [
        ("Leia a frase inteira", "Sem resumir. Ela foi escrita com as palavras dele; ele vai reconhecer."),
        ("Pergunte \"continua sendo isso?\"", "Não \"você concorda?\". A pergunta é sobre a realidade dele, não sobre a sua opinião."),
        ("Silêncio", "Quem preenche o silêncio é o cliente. \"É isso\", \"piorou\" ou \"mudou uma coisa\": as três vêm dele."),
        ("Registre o que mudou", "Ajuste a frase ali, na frente dele. Frase ajustada com o cliente vale mais do que frase perfeita.")]},
    {"tipo": "quote", "titulo": "As duas perguntas da página da dor",
     "texto": "\"Hoje [a frase da dor, inteira]. [[Continua sendo isso?]]\"\n\nDepois do \"sim\": \"[[O que mudou desde a nossa conversa?]]\"",
     "nota": "Se alguma coisa mudou, é melhor descobrir na página 2 do que na página 8. Quase sempre, o que mudou fortalece a dor."},
    {"tipo": "pain", "kicker": "Cuidado", "titulo": "O que quebra o primeiro \"sim\"", "itens": [
        "Traduzir a frase do cliente: \"responde quando consegue\" vira \"baixa capacidade de resposta\".",
        "Explicar a conta em vez de mostrar. Ela foi feita com ele; está na página para ele ver.",
        "Emendar com o produto: \"então o que a gente faz é...\". Depois do \"sim\", só vire a página."]},
    {"tipo": "list", "kicker": "Página 3", "titulo": "A solução: quatro passos em cinco minutos", "itens": [
        ("Leia a frase de solução inteira", "\"Na nossa conversa a gente chegou nisso aqui juntos.\" A página é a confirmação por escrito do que ele já disse."),
        ("Pergunte \"faz sentido para você?\"", "E silêncio de novo."),
        ("Passe pelas premissas", "Uma frase por premissa, olhando para ele. As que vieram dele fazem a tese ficar dele."),
        ("Segure os entregáveis", "O campo \"o que a tese não é ainda\" existe para isso. Tudo o que está lá é componente da próxima página.")]},
    {"tipo": "steps", "kicker": "Se o cliente discorda da tese", "titulo": "Quatro movimentos, nesta ordem", "itens": [
        ("Pergunte", "\"O que você mudaria?\" Não defenda a tese."),
        ("Reescreva na frente dele", "Diga a frase nova inteira, em voz alta."),
        ("Confirme de novo", "\"Assim faz sentido?\""),
        ("Só então vire a página", "Se a tese mudou muito, o desenho não responde mais: redesenhe e apresente de novo.")],
     "nota": "Perder vinte minutos de reunião para redesenhar vale mais do que apresentar um projeto que não é mais o dele."},
    {"tipo": "quote", "kicker": "A transição", "titulo": "Com os dois \"sim\", uma frase leva ao desenho",
     "texto": "\"Então deixa eu te mostrar [[como isso funciona, do primeiro dia ao resultado]].\"",
     "nota": "É a pergunta-guia da arquitetura, dita em voz alta. Avisa que o que vem agora é sequência, não lista."},
    {"tipo": "task", "titulo": "Frase da dor e frase de solução revisadas", "itens": [
        "A frase da dor tem alguma palavra que o cliente nunca usou? Troque",
        "A frase de solução tem entregável, algo em que dá para colocar preço? Tire e leve para a arquitetura",
        "As premissas incluem as ressalvas do cliente? Acrescente",
        "As duas perguntas e a frase de transição escritas no roteiro, seções 2 e 3"],
     "proxima": "O desenho na tela: a arquitetura bloco a bloco, com o NIDflow."},
]}

AULAS[4] = {"titulo": "O desenho na tela", "slides": [
    {"tipo": "cover", "titulo": "O desenho na tela",
     "sub": "A arquitetura como sequência: uma frase por bloco, as três páginas e as perguntas respondidas com componentes."},
    {"tipo": "statement", "texto": "O cliente não compra a lista. Compra a [[sequência]].",
     "sub": "A sequência é a única coisa que ele não consegue comparar com o orçamento do concorrente, porque o concorrente não tem uma."},
    {"tipo": "pain", "kicker": "Onde o desenho vira catálogo", "titulo": "Três erros na sala", "itens": [
        "Ler os componentes: em dois minutos, o cliente está ouvindo uma lista de funcionalidades.",
        "Abrir pelo que você vende: \"implantação da nossa ferramenta\" como primeiro bloco.",
        "Explicar tudo de uma vez: a dúvida do bloco 2 fica presa e ele para de acompanhar no bloco 3."]},
    {"tipo": "steps", "kicker": "O jeito NID", "titulo": "Uma frase por bloco (caso conduzido)", "itens": [
        ("Mapa do atendimento", "Duas horas com o dono e a assistente. Entrega o roteiro de qualificação no papel. Semana 2."),
        ("Construção do agente", "Com o roteiro aprovado, o agente responde no WhatsApp e no site. Semanas 3 e 4."),
        ("Agenda e follow-up", "Com o agente aprovado, visita na agenda e follow-up de todo orçamento. Semana 5."),
        ("Operação assistida", "Duas semanas com a assistente revisando e o roteiro sendo ajustado. Semanas 6 e 7."),
        ("Operação e revisão", "Painel e reunião mensal. A partir da semana 8.")],
     "nota": "\"Primeiro a gente faz isto, que entrega aquilo. Com aquilo pronto, a gente faz o seguinte.\" Cinco frases, dois minutos, nenhum componente listado."},
    {"tipo": "list", "kicker": "Páginas 4, 5 e 6", "titulo": "As três páginas da arquitetura", "itens": [
        ("O desenho", "Blocos, setas, marco, responsável e prazo. A página em que você fica mais tempo, conduzida com uma frase por bloco."),
        ("Os entregáveis", "O que fica com ele ao fim de cada etapa. Você não lê; deixa ele ler por dez segundos."),
        ("As respostas", "Uma linha por preocupação: o que ele disse que teme ou já tentou e o componente que responde. Você lê inteira, olhando para ele.")]},
    {"tipo": "grid", "kicker": "No desenho", "titulo": "Quatro coisas que você aponta, sempre", "itens": [
        ("O marco de cada bloco", "\"Essa etapa acaba quando o roteiro está escrito e aprovado por você.\""),
        ("A responsabilidade do cliente", "Nomeada, em voz alta. Projeto em que o cliente não faz nada desperta desconfiança."),
        ("O primeiro resultado visível", "\"No fim da semana 2 você recebe o atendimento da sua empresa no papel.\""),
        ("O prazo por etapa", "\"Projeto de oito semanas\" não diz nada. Semana a semana diz tudo.")]},
    {"tipo": "list", "kicker": "Regra", "titulo": "Perguntas são respondidas com componentes", "itens": [
        ("\"E quem atende quando o agente não sabe?\"", "\"Regra de passagem para humano: qualquer coisa fora do roteiro vai para a Luciana na hora. Etapa 2.\""),
        ("\"E se vierem trinta de uma vez?\"", "\"O agente responde todos ao mesmo tempo, e o roteiro tem critério de urgência. Etapa 1 define, etapa 2 aplica.\""),
        ("\"Eu já tentei um chatbot e o síndico odiou\"", "Página das respostas: \"por isso a etapa 2 tem a rodada de testes de tom com você.\"")]},
    {"tipo": "two", "kicker": "Na tela", "titulo": "NIDflow: desenhar e apresentar na mesma tela",
     "texto": "É a ferramenta em que a NID desenha e apresenta os projetos que vende. Os templates do método já estão dentro, o fluxo é desenhado na tela e a apresentação sai do mesmo desenho, na ordem do roteiro de proposta.",
     "cardTitulo": "O que aparece na demonstração",
     "card": ["Os cinco templates, na ordem do método", "O fluxo de arquitetura com os cinco blocos, marcos, responsáveis e semanas", "O componente aberto no bloco quando o cliente pergunta", "O modo de apresentação: capa, dor, solução, arquitetura, valor, investimento, próximo passo"]},
    {"tipo": "quote", "kicker": "Página das respostas", "titulo": "A frase que mais fecha em comitê",
     "texto": "\"Você me disse que [[[o que ele teme ou já tentou]]]. Por isso o bloco [número] tem [[[o componente]]].\"",
     "nota": "Começa com a voz dele, termina com o componente. O decisor que não estava na reunião lê e entende por que este projeto é diferente do orçamento que chegou junto."},
    {"tipo": "task", "titulo": "Uma frase por bloco e a página das respostas conferida", "itens": [
        "Uma frase por bloco: o que a etapa faz e o que entrega. Em voz alta, com relógio; se passar de três minutos, tire componentes",
        "Página das respostas conferida contra o canvas de dor e o mapa de solução: cada receio tem um componente?",
        "A ordem das nove páginas conferida no modelo de proposta dos materiais"],
     "proxima": "Valor, investimento e o silêncio depois do número."},
]}

AULAS[5] = {"titulo": "Valor, investimento e o silêncio depois do número", "slides": [
    {"tipo": "cover", "titulo": "Valor, investimento e o silêncio depois do número",
     "sub": "Voltar à conta, o investimento na estrutura do desenho, a comparação em uma frase e parar de falar."},
    {"tipo": "statement", "texto": "O preço só existe [[depois da régua]].",
     "sub": "Sem a conta da dor na mesa, o número é comparado com outra coisa. Com ela, é comparado com o custo de não resolver."},
    {"tipo": "pain", "kicker": "Onde o preço perde", "titulo": "Quatro jeitos de o preço perder sozinho", "itens": [
        "Aparece na página 2. O resto vira justificativa.",
        "Vem solto, sem estrutura. O cliente negocia o todo.",
        "Vem com desconto antes de alguém pedir. O primeiro número deixa de ser o número.",
        "O apresentador continua falando depois do número. Negocia contra si mesmo."]},
    {"tipo": "steps", "kicker": "O jeito NID", "titulo": "Cinco passos, do playbook para a sala", "itens": [
        ("Voltar à conta", "A régua da dor, em voz alta, com os números dele."),
        ("Valor na mesma régua", "O que muda, na mesma unidade da dor. Sem prometer número."),
        ("Investimento na estrutura", "Setup nas etapas de construção, mensalidade nas de operação."),
        ("Comparação em uma frase", "Custo perto de valor. Nunca perto do concorrente."),
        ("Próximo passo com data", "E silêncio. Aula 7.")]},
    {"tipo": "quote", "kicker": "Passo 1", "titulo": "Voltar à conta",
     "texto": "\"Lá na nossa primeira conversa a gente chegou a [[[o custo da dor por período]]]. Lembra? [[Essa é a régua.]]\"",
     "nota": "O \"lembra?\" não é retórico. Ele confirma a régua pela terceira vez, e o número é dele, não seu."},
    {"tipo": "list", "kicker": "Passo 3", "titulo": "O investimento na estrutura do desenho", "itens": [
        ("Setup, pago uma vez", "Ligado às etapas de construção. No caso, etapas 1 a 3."),
        ("Mensalidade", "Ligada às etapas de operação. No caso, etapas 4 e 5, com prazo mínimo."),
        ("Incluso e não incluso", "O que cada parte cobre e o que fica fora, em nome do cliente."),
        ("O que fica com ele", "Roteiros, bases e documentos que permanecem mesmo que o projeto pare.")]},
    {"tipo": "quote", "kicker": "Passo 4", "titulo": "A comparação em uma frase. E depois, silêncio.",
     "texto": "\"Perto dos R$ 60 mil por mês que a gente calculou, a operação mensal se paga com poucas visitas recuperadas.\"\n\n[[Pare de falar. Conte até dez.]]",
     "nota": "Quem fala primeiro depois do número perde a régua. Se for você, vai justificar ou descontar. Se for ele, vai dizer o que está pensando."},
    {"tipo": "grid", "kicker": "Regra", "titulo": "O que nunca acontece na página de investimento", "itens": [
        ("Desconto sem pedido", "O primeiro número é o número. Se ele pedir, a resposta é o desenho.", "no"),
        ("Justificar o preço", "Se você está justificando, a régua não está na mesa. Volte para ela.", "no"),
        ("Comparar com concorrente", "A proposta compara custo com valor. Citar o concorrente é trazer ele para a sala.", "no"),
        ("Prometer número", "Sem dado real e autorizado, promessa sustenta desconfiança, não preço.", "no")]},
    {"tipo": "task", "titulo": "As três frases de valor escritas", "itens": [
        "A frase de voltar à conta, com o número da dor e o \"lembra?\"",
        "O investimento na estrutura do desenho, cada parte apontando para os blocos, com o que fica fora",
        "A comparação em uma frase, com os números do cliente",
        "Lidas em voz alta. Depois da terceira, dez segundos de silêncio, treinados"],
     "proxima": "Objeções: \"está caro\", \"vou pensar\", \"preciso levar para o sócio\" e as outras."},
]}

AULAS[6] = {"titulo": "Objeções", "slides": [
    {"tipo": "cover", "titulo": "Objeções",
     "sub": "Toda objeção é uma pergunta sobre uma página do projeto. Você não responde a objeção; volta para a página."},
    {"tipo": "statement", "texto": "Objeção é pergunta sobre uma página do projeto. [[Volte para a página.]]",
     "sub": "O orçamento não tem página para voltar. O projeto desenhado tem."},
    {"tipo": "steps", "kicker": "O jeito NID", "titulo": "Cinco passos para qualquer objeção", "itens": [
        ("Ouça até o fim", "Metade das objeções se explica sozinha quando o cliente termina a frase."),
        ("Devolva em pergunta", "\"Caro perto de quê?\" \"Pensar sobre qual parte?\""),
        ("Volte para a página", "Literalmente. Reapresente a página com os números dele."),
        ("Confirme", "\"Assim faz mais sentido?\""),
        ("Volte ao próximo passo", "\"Então, voltando: a gente consegue começar na terça?\"")]},
    {"tipo": "table", "titulo": "Preço, desconto e prazo", "colunas": ["Objeção", "Pergunta que devolve", "Página e frase"], "linhas": [
        ("\"Está caro\"", "\"Caro perto de quê?\"", "Valor. \"A gente calculou R$ 60 mil por mês. A operação é uma fração disso. O que eu não consigo é baixar o número sem tirar uma etapa.\""),
        ("\"Dá para tirar uma etapa?\"", "\"Qual?\"", "Desenho. \"Posso tirar a etapa 4. Mas aí a rotina não pega, e foi por isso que o CRM anterior não funcionou.\""),
        ("\"Demora demais\"", "\"Perto de quando você precisava ver algo acontecendo?\"", "Desenho. O primeiro resultado visível: \"no fim da semana 2 você já tem o roteiro.\"")]},
    {"tipo": "table", "titulo": "\"Vou pensar\", sócio e e-mail", "colunas": ["Objeção", "Pergunta que devolve", "Página e frase"], "linhas": [
        ("\"Vou pensar\"", "\"Pensar sobre qual parte?\"", "Próximo passo. \"Eu te mando o projeto hoje, você pensa até quinta, e na quinta às dez a gente fala por quinze minutos. Pode ser?\""),
        ("\"Preciso levar para o sócio\"", "\"O que ele vai querer saber?\"", "Decisor. \"Eu apresento para ele junto com você: vinte minutos, o desenho e a página de valor. Quando ele consegue?\""),
        ("\"Manda por e-mail\"", "\"Mando hoje. Ficou alguma página com dúvida?\"", "Próximo passo. \"O PDF não explica o desenho sozinho. Mando hoje, e na quinta a gente fala. Pode ser?\"")]},
    {"tipo": "table", "titulo": "\"Já tentei\", momento e concorrente", "colunas": ["Objeção", "Pergunta que devolve", "Página e frase"], "linhas": [
        ("\"Já tentei e não funcionou\"", "\"O que exatamente não funcionou?\"", "Respostas. \"Você me disse isso, e por isso a etapa 2 tem os testes de tom e a etapa 4 tem duas semanas com a Luciana revisando.\""),
        ("\"Não é o momento\"", "\"O que muda daqui a três meses?\"", "Dor. Se for concreto, data em três meses. Se for vago: \"cada mês nessa situação custa R$ 60 mil, pela conta que a gente fez juntos.\""),
        ("\"O concorrente cobra menos\"", "\"O que ele entrega nas oito semanas?\"", "Desenho. \"Se a proposta dele tem as etapas 4 e 5, são projetos parecidos. Se não tem, o mais barato é o que tem menos etapas.\"")]},
    {"tipo": "quote", "kicker": "A frase do desconto", "titulo": "Desconto sem tirar etapa não existe",
     "texto": "\"Posso tirar a etapa 4. Mas aí a rotina não pega, [[e foi por isso que o CRM anterior de vocês não funcionou]].\"",
     "nota": "O pedido de desconto vira uma decisão sobre o projeto. Só dá para dizer essa frase porque o projeto foi desenhado em etapas com marcos."},
    {"tipo": "list", "kicker": "Antes da reunião", "titulo": "E as objeções que são suas", "itens": [
        ("\"Já tenho meu jeito\"", "Mantenha o seu jeito na conversa. O método muda o que fica na mesa do cliente depois que você sai. Teste em uma conta."),
        ("\"Meu mercado é diferente\"", "O mercado é diferente; a decisão não. As quatro perguntas foram as mesmas em educação, saúde, indústria, varejo e serviços."),
        ("\"Não sou vendedor, sou técnico\"", "Então o desenho é a sua vantagem. Falta a régua antes e o preço na estrutura depois."),
        ("\"Não tenho tempo para montar apresentação\"", "A apresentação é o projeto desenhado, na ordem. Se você preencheu os templates, ela já existe.")]},
    {"tipo": "task", "titulo": "Banco de objeções com as três que você mais ouve", "itens": [
        "As nove desta aula já estão no banco, com pergunta, página e frase",
        "Acrescente as três que você mais ouve no seu mercado, nas suas palavras",
        "Para cada uma: a pergunta que devolve, a página da sua proposta que responde, a frase",
        "Se não existe página para alguma, o desenho tem um buraco. Descoberto antes da reunião"],
     "proxima": "Fechamento, próximo passo e o decisor que não está na sala."},
]}

AULAS[7] = {"titulo": "Fechamento, próximo passo e o decisor ausente", "slides": [
    {"tipo": "cover", "titulo": "Fechamento, próximo passo e o decisor ausente",
     "sub": "Fechar é propor uma data. As três respostas possíveis e o que fazer quando quem decide não está na sala."},
    {"tipo": "statement", "texto": "Fechar é propor uma [[data]]. O resto é silêncio.",
     "sub": "Não é convencer nem pressionar. É ler a última página em voz alta e fazer a pergunta com data."},
    {"tipo": "pain", "kicker": "Onde a reunião morre", "titulo": "Quatro frases que terminam em \"vou pensar\"", "itens": [
        "\"Fico à disposição.\" A bola está com o cliente, e ele tem trinta outras coisas.",
        "\"Qualquer dúvida me chama.\" Ele não vai ter dúvida; vai ter uma proposta na caixa de entrada.",
        "\"Vou mandar por e-mail e a gente se fala.\" Quando?",
        "Nenhuma pergunta. O silêncio sem pergunta na mesa vira constrangimento."]},
    {"tipo": "steps", "kicker": "O jeito NID", "titulo": "A página do próximo passo em cinco partes", "itens": [
        ("O que ele aprova", "A proposta, o contrato, o pagamento do setup. Diga qual."),
        ("Quando começa", "A etapa 1 do desenho, com data."),
        ("O que você precisa dele", "A primeira responsabilidade do cliente, que já está no desenho."),
        ("A pergunta com data", "\"Consigo agendar para a terça?\" Uma data concreta, com alternativa na cabeça."),
        ("Silêncio", "Conte até dez. Quem responde é ele.")]},
    {"tipo": "quote", "titulo": "A frase inteira",
     "texto": "\"Se fizer sentido, o próximo passo é a aprovação desta proposta e a sessão de mapa do atendimento, que é a etapa 1, na semana que vem. Eu preciso de duas horas suas e da Luciana, e do histórico do WhatsApp exportado. [[Consigo agendar para a terça?]]\"",
     "nota": "\"Fazer sentido\" vira uma pergunta de agenda. Quem responde \"terça não dá, quinta pode\" acabou de aprovar o projeto."},
    {"tipo": "list", "kicker": "Depois da pergunta", "titulo": "As três respostas possíveis", "itens": [
        ("\"Sim\"", "Confirme data e responsabilidade em voz alta. Não comemore, não fale mais do projeto. Sim é sim."),
        ("\"Sim, mas\"", "É uma objeção: ouça, devolva em pergunta, volte para a página, confirme, e de novo: \"então, terça?\""),
        ("\"Não agora\"", "Nunca saia sem um próximo passo menor com data: reunião com o decisor, conversa na quinta, etapa 1 como piloto, nova apresentação em três meses.")]},
    {"tipo": "pain", "kicker": "O segundo assunto", "titulo": "Quando o decisor não está na sala", "itens": [
        "Você descobre no fim: \"muito bom, vou levar para o meu sócio\".",
        "Você apresentou quarenta minutos para quem não decide.",
        "O projeto chega no decisor como PDF, junto com o orçamento do concorrente, aberto na última página."]},
    {"tipo": "steps", "kicker": "O jeito NID", "titulo": "Quatro movimentos com o decisor ausente", "itens": [
        ("Descubra antes", "A frase da aula 1, na hora de marcar. Resolve a maior parte dos casos."),
        ("Na sala: opção A ou B", "A: apresente até a solução e peça a reunião com o decisor para o desenho e o valor. B: apresente tudo e o próximo passo vira a reunião com ele, com data."),
        ("A proposta que sobrevive sem você", "Página do desenho e página das respostas: o decisor lê e entende sem ninguém na sala."),
        ("Prepare o interlocutor", "Dê a ele as três frases: a da dor, a de solução e a de comparação do investimento.")]},
    {"tipo": "quote", "kicker": "Na sala", "titulo": "A frase que abre a porta do decisor",
     "texto": "\"Quem mais precisa ver isso para a gente decidir? [[Consigo apresentar para ele junto com você na quinta?]] São vinte minutos: o desenho e a página de valor.\"",
     "nota": "Vinte minutos, não quarenta e cinco. E \"junto com você\": você leva o interlocutor, não passa por cima dele."},
    {"tipo": "task", "titulo": "Página do próximo passo com data e plano para o decisor ausente", "itens": [
        "O que ele aprova, quando começa, o que você precisa dele na semana 1",
        "A pergunta com uma data concreta e uma alternativa",
        "Quem é o decisor e se você usa a opção A ou a B se ele não estiver na sala",
        "As três frases que você deixa com o interlocutor"],
     "proxima": "Depois da reunião: a régua de follow-up da NID e o e-mail do mesmo dia."},
]}

AULAS[8] = {"titulo": "Depois da reunião", "slides": [
    {"tipo": "cover", "titulo": "Depois da reunião",
     "sub": "A régua de follow-up da NID, o e-mail do mesmo dia, o decisor que recebe a proposta sem você, e o que fazer agora."},
    {"tipo": "statement", "texto": "O follow-up não cobra resposta. [[Conduz a decisão que ficou combinada.]]",
     "sub": "Toda mensagem aponta para o próximo passo combinado na sala. Se não houve próximo passo, o follow-up não tem para onde apontar."},
    {"tipo": "pain", "kicker": "Onde a proposta esfria", "titulo": "Quatro jeitos de o follow-up matar a proposta", "itens": [
        "\"Conseguiu dar uma olhada?\" A pergunta que não tem resposta boa.",
        "O PDF reenviado sem contexto. Ele abre, vê o mesmo documento, fecha.",
        "O desconto no terceiro contato. Silêncio passa a gerar desconto.",
        "O silêncio de dez dias. Retomar parece começar de novo."]},
    {"tipo": "steps", "kicker": "O jeito NID", "titulo": "A régua depois da reunião: quatro toques, e para", "itens": [
        ("Mesmo dia", "O e-mail com o projeto: resumo do combinado, desenho, próximo passo com a data. Em até duas horas."),
        ("D+2", "Uma pergunta sobre uma página. A que gerou mais conversa na reunião. Conteúdo, não cobrança."),
        ("D+7", "A data proposta: \"combinamos terça às dez, continua de pé?\" Confirma a data, não cobra a decisão."),
        ("D+14", "Fechamento honesto: \"não vou insistir mais por aqui; a proposta vale até tal data.\" Sem culpa, sem desconto.")]},
    {"tipo": "quote", "kicker": "Mesmo dia, WhatsApp", "titulo": "A mensagem curta",
     "texto": "\"Foi bom apresentar o projeto hoje. Segue no e-mail o desenho completo e o que precisa ser aprovado. Como combinado, a sessão de mapa do atendimento fica para terça às dez, com você e a Luciana. Até lá eu preciso do histórico do WhatsApp exportado. [[Qualquer ajuste na data, me avisa por aqui.]]\"",
     "nota": "Quatro frases. A última é sobre a data, não sobre a decisão: a decisão já foi tomada na sala."},
    {"tipo": "list", "kicker": "Mesmo dia, e-mail", "titulo": "O e-mail que sobrevive sem você: cinco partes", "itens": [
        ("O diagnóstico em uma frase", "A mesma frase da página 2, copiada."),
        ("A tese", "A frase de solução, copiada."),
        ("O desenho, em uma página", "Se ele abrir só uma coisa, que seja o desenho."),
        ("O investimento na estrutura", "Setup e mensalidade ligados às etapas, com a comparação em uma frase. Nunca o número solto."),
        ("O próximo passo com a data combinada", "O que ele aprova, quando começa, o que você precisa dele. A proposta completa vai em anexo.")]},
    {"tipo": "grid", "kicker": "Decisor ausente", "titulo": "Três ajustes quando o decisor recebe a proposta sem você", "itens": [
        ("A página das respostas vai na frente", "No corpo do e-mail, logo depois do desenho: \"o que vocês já tentaram e o que neste projeto responde\"."),
        ("A oferta de vinte minutos, por escrito", "\"Se o seu sócio quiser, eu apresento o desenho e a página de valor para vocês dois em vinte minutos.\""),
        ("A pergunta objetiva no D+2", "\"Você conseguiu mostrar para o seu sócio? O que ele perguntou?\" A segunda pergunta diz para qual página voltar."),
        ("O que não muda", "Nenhuma linha sobre a sua empresa. Nenhum \"fico à disposição\". Termina na data.", "ok")]},
    {"tipo": "list", "kicker": "O que você faz agora", "titulo": "Três partes", "itens": [
        ("Apresente", "A proposta que passou pelas oito aulas está pronta. Marque com a frase da aula 1, use o roteiro e o checklist, e apresente."),
        ("Desenhe o próximo projeto no NIDflow", "Os cinco templates dentro, o fluxo na tela, o modo de apresentação na ordem do método. Primeiro projeto em menos de 15 minutos."),
        ("Continuidade", "A Plataforma NID, o ambiente da NID para praticar o método com continuidade, abre em datas definidas. Você vai saber por e-mail, com o valor, quando abrir.")]},
    {"tipo": "nidflow", "kicker": "A ferramenta da NID", "titulo": "Desenhe e apresente o projeto na mesma tela",
     "itens": ["Os cinco templates do método já dentro", "O fluxo de arquitetura desenhado na tela", "Modo de apresentação na ordem do método", "Primeiro projeto em menos de 15 minutos"],
     "destaque": "Menos que um almoço por mês", "destaqueSub": "E menos do que uma única proposta que morre no \"vou pensar\".",
     "cta": "Quero desenhar meu próximo projeto no NIDflow"},
    {"tipo": "final", "kicker": "Fim do mini curso", "titulo": "Quem desenha o projeto, conduz a venda.",
     "texto": "Você desenhou. Agora vai lá e apresenta. Henrique Leite, sócio da NID.",
     "frase": "Enquanto o mercado vende IA de prateleira,\na gente constrói a sua."},
]}
