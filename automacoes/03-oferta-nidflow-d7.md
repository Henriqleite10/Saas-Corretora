# Oferta do NIDflow em D+7, lembretes e controle de acesso por assinatura

| Campo | Valor |
|---|---|
| Versão | 1.0 (Sprint 4) |
| Autor | Agente `automacao` |
| Status | Entregue ao coordenador |
| Fonte da verdade | `docs/00-brief-mestre.md` (seções 5, 6.4, 8.1, 12 decisões 3 e 4); `produtos/nidflow/01-plano-de-assinatura.md` (seções 5 a 10); `produtos/nidflow/02-onboarding.md` (seções 4 e 5); `produtos/nidflow/04-backlog-tecnico.md` (B-04, B-11); `produtos/nidflow/oferta/rascunho-oferta-d7.md`; decisão 4 do coordenador (controle de acesso próprio ligado ao webhook de assinatura) |
| Mensagens | Todas as mensagens deste arquivo são **rascunho funcional**. O argumento de cada toque vem do `rascunho-oferta-d7.md` do agente `nidflow`; a versão final é do agente `copy` |
| Pré-condição | Itens que bloqueiam a venda no backlog do NIDflow entregues (B-00 a B-08, B-11, B-13). Sem isso, a sequência fica desligada e o D+7 não dispara |

---

## 1. Condições de entrada e de saída

### 1.1 Entrada

| Condição | Regra |
|---|---|
| Quem entra | Contato com `F2-comprador-playbook` ou `F2-minicurso`, sem `F2-nidflow-ativo`, sem `F2-reembolso`, sem opt-out no canal do toque |
| Quando | D+7 contado da **primeira compra** (playbook ou mini curso), em dias corridos, às 10h do horário de Brasília. Se D+7 cair no domingo, vai para segunda às 10h e os lembretes mantêm a distância (D+10 e D+14 contados do novo D+7) |
| Segunda compra antes de D+7 | Não reinicia a contagem. Quem comprou o playbook em D0 e o mini curso em D+3 recebe a oferta em D+7 da compra do playbook |
| Flag de produto | A sequência só dispara com `nidflow_venda_liberada = sim` no orquestrador (o coordenador liga depois do checklist do backlog). Enquanto `nao`, os contatos que chegam a D+7 ficam em fila e recebem a oferta no dia em que a flag ligar, respeitando a ordem de chegada e o limite de envios diários |
| PDF | O texto menciona exportação em PDF só com `nidflow_pdf_disponivel = sim` (B-08 no ar). O `copy` entrega duas versões do toque principal (com e sem a linha do PDF) |

### 1.2 Saída (a qualquer momento, cancela os toques pendentes)

| Evento | Etiqueta | O que acontece depois |
|---|---|---|
| `subscription_created` do NIDflow (Cakto) / `compra_aprovada` de produto de assinatura (Kiwify) | `F2-nidflow-ativo` | Sai da oferta. Entra no fluxo de acesso (seção 3) e nas mensagens de ativação do `02-onboarding.md` |
| `refund` ou `chargeback` do playbook ou do mini curso | `F2-reembolso` | Sai de tudo |
| Opt-out de e-mail | `F2-optout-email` | Cancela os toques por e-mail; o WhatsApp de D+14 continua se não houver opt-out de WhatsApp |
| Opt-out de WhatsApp | `F2-optout-whatsapp` | Cancela D+14; os e-mails continuam |
| Compra da Plataforma NID (Sprint 6) | `F2-plataforma-ativo` | Sai da oferta (o NIDflow está incluso) |
| Fim da sequência sem assinar (após D+14) | `F2-nidflow-oferta-encerrada` | Entra no conteúdo contínuo (D+15 em diante). O link da oferta continua válido. O NIDflow só volta a ser oferecido: (a) dentro do conteúdo contínuo, no máximo uma menção por mês; (b) pelo CTA ao fim das aulas do mini curso; (c) pelo agente, se a pessoa perguntar |

---

## 2. Sequência da oferta (D+7, D+10, D+14)

Página de destino única para todos os toques: página da oferta do NIDflow (`copy` escreve; `nid-pages` implementa), com o vídeo de 60 a 90 segundos da ferramenta em uso, o preço "R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia" e o CTA oficial "Quero desenhar meu próximo projeto no NIDflow" apontando para o checkout de assinatura. UTMs: `utm_source=email|whatsapp`, `utm_medium=sequencia`, `utm_campaign=F2-nidflow-d7`, `utm_content=d7|d10|d14`.

| Código | Quando | Horário (Brasília) | Canal | Objetivo | Conteúdo funcional (argumento do `rascunho-oferta-d7.md`) | CTA único | Se não responder |
|---|---|---|---|---|---|---|---|
| N7 | D+7 | 10h | E-mail | Apresentar a ferramenta em uso, no arco completo | Assunto "Você já desenha o projeto. Agora desenhe e apresente na mesma tela". Dor: o desenho no papel virou lista no slide; cada proposta começa do zero; o cliente pediu para ver a arquitetura de novo. Solução: o lugar onde o projeto é desenhado e apresentado ao mesmo tempo; a ferramenta que a NID usa. Arquitetura: os seis itens da seção 2 do rascunho (templates prontos, preencher, apresentar, salvo na conta, primeiro projeto em 15 minutos, projetos ilimitados), em linguagem de uso. Vídeo (imagem com link). Valor: uma proposta perdida custa mais do que um ano de NIDflow; menos que um almoço por mês; R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia. Objeção "mais uma ferramenta" respondida em uma frase | "Quero desenhar meu próximo projeto no NIDflow" | Nada além do próximo toque. A abertura de e-mail não muda a sequência |
| N7w | D+7 | 10h15 | WhatsApp (modelo, marketing) | Espelho curto com o vídeo | "Aqui é a NID. Você já leu o método. Agora veja a ferramenta que a gente usa para desenhar e apresentar o projeto na mesma tela: {link}. R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia." | Link da página da oferta | Se a pessoa responder, o agente atende (origem `sequencia:D7_nidflow`), responde dúvidas com a base do NIDflow e devolve o link do checkout de assinatura |
| N10 | D+10 | 10h | E-mail | Dor e solução, uma objeção | Assunto "Do papel para a tela, com o mesmo método". Imagem 1 (antes e depois: template preenchido à mão e o mesmo projeto no fluxo de arquitetura). Só dor e solução. Objeção "já uso Canva ou PowerPoint" respondida: eles apresentam; não desenham o projeto com o método. Preço e garantia em uma linha | "Quero desenhar meu próximo projeto no NIDflow" | Próximo toque |
| N14 | D+14 | 10h | WhatsApp (modelo, marketing) | Valor e garantia; fim da sequência | "Última mensagem da NID sobre o NIDflow por aqui. R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia com reembolso sem pergunta. O link continua valendo: {link}." Imagem 3 (modo de apresentação com a ancoragem acima do investimento). Sem urgência falsa: só o fato de que a sequência termina | Link da página da oferta | Aplica `F2-nidflow-oferta-encerrada`. Nenhuma mensagem automática sobre o NIDflow depois, fora das regras da seção 1.2 |
| N14e | D+14 | 10h | E-mail | Mesma função de N14 para quem tem opt-out de WhatsApp ou não informou telefone | Assunto "Última mensagem sobre o NIDflow". Mesmo conteúdo de N14 em texto | "Quero desenhar meu próximo projeto no NIDflow" | Idem |
| N16 | D+16 | 8h às 10h | E-mail | Retomar o mini curso para quem não tem nenhum dos dois (só ramo A) | Assunto "Duas formas de continuar". Uma frase sobre as aulas (R$ 147) e uma sobre a ferramenta, com um único link para a página do mini curso (o NIDflow já teve a sua sequência). Última mensagem de oferta antes do conteúdo contínuo | "Quero as aulas por R$ 147" | Entra no conteúdo contínuo |

Regras dos toques:

- Cada toque tem um único link e um único CTA. N7 tem o vídeo como imagem clicável para a mesma página; conta como o mesmo link.
- O agente responde qualquer resposta ao WhatsApp N7w ou N14 com a base do NIDflow (`01`, seção 6.4). Se a pessoa pedir para assinar, o agente manda o link do checkout de assinatura, não da página.
- Quem clicou na página e não assinou não recebe toque extra. Não existe "vi que você abriu".
- Nenhum toque menciona desconto, plano anual, teste grátis, IA na ferramenta, link público ou aplicativo.
- Henrique não aparece na oferta do NIDflow (checklist do `rascunho-oferta-d7.md`).

---

## 3. Depois de assinar: acesso e controle por webhook (decisão 4 do coordenador)

O NIDflow em HTML único tem controle de acesso próprio, ligado ao webhook de assinatura da plataforma de checkout. A área de membros da plataforma não é usada para o NIDflow: ela hospeda o arquivo, não impede cópia nem encerra o acesso ao cancelar. A arquitetura é a do `04-backlog-tecnico.md` (Supabase, função de borda `webhook-checkout`, tabela `assinaturas`, RLS que nega escrita fora do status `ativa`).

### 3.1 Mapa de eventos → status → o que o assinante vê

| Evento da plataforma (Cakto; Kiwify entre parênteses) | Status na tabela `assinaturas` | Acesso no NIDflow | Ações do orquestrador | Etiqueta na base |
|---|---|---|---|---|
| `subscription_created` (Kiwify: `compra_aprovada` em produto de assinatura, primeira cobrança) | `ativa`, `periodo_fim` = data da próxima cobrança | Completo | Cria a conta se não existir (Supabase Auth, mesmo e-mail da compra); dispara o e-mail de acesso A1 com link mágico válido por 24 h; dispara o WhatsApp A1w; grava `conta_criada`; cancela a oferta D+7 pendente; agenda as mensagens de ativação e resgate do `02-onboarding.md` | `F2-nidflow-ativo` |
| `subscription_renewed` (Kiwify: `subscription_renewed`) | `ativa`, `periodo_fim` avança um mês | Completo | Nada visível. Grava evento. Se estava em `recusada` ou `inadimplente`, volta a `ativa` e cancela R6 pendentes | Mantém |
| `subscription_renewal_refused` (Kiwify: `subscription_late`, primeiro aviso) | `recusada` | Completo (regra do plano: nunca bloquear leitura no primeiro dia de recusa) | Dispara R6 (e-mail + WhatsApp "não conseguimos renovar") com link para atualizar o cartão na área do comprador; segundo aviso em D+3; último em D+6 | `F2-nidflow-recusada` |
| Retentativas esgotadas (Cakto: após as 3 tentativas, sem `subscription_renewed`; Kiwify: `subscription_late` mantido por 7 dias). Detecção: `recusada` há 7 dias sem renovação | `inadimplente` → `leitura`, `leitura_ate` = hoje + 30 dias | **Modo leitura**: abre, vê os projetos, exporta em PDF; não cria nem edita. Faixa na tela com "Atualizar pagamento" | E-mail R6c "Seu NIDflow entrou em modo leitura" com o prazo de exportação | `F2-nidflow-leitura` |
| `subscription_canceled` (Kiwify: `subscription_canceled`) | `cancelada` até `periodo_fim`; depois, `leitura` por 30 dias | Completo até o fim do período pago; depois, modo leitura com exportação em PDF por 30 dias | E-mail R7 "Seu NIDflow foi cancelado" no dia (sem insistência, sem desconto, pergunta opcional de motivo); e-mail R7b no dia em que entra em leitura, com a data limite da exportação; e-mails de aviso de exclusão em D+60 e D+83 após o fim do período (rotina do B-04) | `F2-nidflow-cancelado` |
| `refund` de assinatura (Kiwify: `compra_reembolsada`) dentro dos 7 dias | `reembolsada` → `leitura` por 30 dias | Modo leitura imediato (exportação liberada) | Confirmação de reembolso é da plataforma; o orquestrador manda só o R7b com o prazo de exportação | `F2-nidflow-cancelado` + `F2-reembolso` |
| `chargeback` de assinatura | `reembolsada` (mesmo regime) | Modo leitura | Tarefa `F2 · Financeiro` | Idem |
| Nova assinatura com e-mail que já tem conta (reativação em até 90 dias) | `ativa` | Completo, com todos os projetos | Não cria conta; reativa; e-mail A1 (link mágico) | `F2-nidflow-ativo` |
| Compra da Plataforma NID (Sprint 6, B-14) | `ativa` com `origem = plataforma_nid` | Completo | Se havia assinatura mensal, cancela na plataforma no mesmo dia e envia e-mail explicando (regra de não cobrança dupla do parecer, decisão 3) | `F2-plataforma-ativo` |
| Fim da anuidade da Plataforma sem renovação | `leitura` por 30 dias | Modo leitura | Oferta do NIDflow mensal avulso (uma vez, por e-mail) | `F2-nidflow-leitura` |

Regras técnicas do webhook (B-04): validação do segredo em toda chamada; idempotência por `id_externo` + tipo de evento (evento duplicado não cria conta nem e-mail duplicado); todo evento passa pela mesma função e muda só o campo `status`; o NIDflow lê o status ao abrir e a política de RLS nega escrita fora de `ativa`; webhook com assinatura inválida é rejeitado e registrado. Prazo entre pagamento e e-mail de acesso: menos de 2 minutos; se falhar, a fila da plataforma tenta de novo e o suporte recebe alerta.

### 3.2 Fluxo de acesso (do webhook ao primeiro projeto)

| Passo | Responsável | Tempo | O que acontece | Se falhar ou a pessoa não agir |
|---|---|---|---|---|
| 1 | Plataforma → função `webhook-checkout` | Até 1 min | `subscription_created` validado | Sem evento em 5 min: conciliação por API a cada 15 min |
| 2 | Função `webhook-checkout` | Imediato | Conta criada ou reativada; `assinaturas.status = ativa`; evento `conta_criada`; chamada ao webhook do orquestrador | Erro na criação: nova tentativa em 1 min (3 vezes); depois, alerta ao suporte e tarefa `F2 · Suporte` |
| 3 | NIDflow (função de e-mail) | Até 2 min após o pagamento | E-mail A1 "Seu acesso ao NIDflow" com link mágico (24 h). Remetente "NID" | Bounce: WhatsApp pede e-mail correto; humano corrige |
| 4 | Orquestrador | Até 2 min | WhatsApp A1w "Seu NIDflow está pronto" com o link | Sem telefone: nada |
| 5 | Assinante | Até 24 h esperado (marco M1) | Clica, entra sem senha, define senha opcional, responde o passo 2 (perguntas do Gatilho A, se ainda não respondidas na base) e cai no passo 3 (qual proposta você precisa apresentar esta semana) | 24 h sem login: R1 (e-mail + WhatsApp, link mágico renovado). 72 h: R1b (WhatsApp, o agente responde). Depois, R5 aos 14 dias sem login |
| 6 | NIDflow (telemetria B-11) → orquestrador | Até 1 min por evento | Marcos M1 a M5 chegam por webhook; o orquestrador dispara A2, A3, A4 e R2 a R5 conforme o `02-onboarding.md` (seção 5) | Sem evento, nenhum resgate dispara (regra: nunca supor) |

Os textos de A1 a A4 e R1 a R7 estão especificados pelo agente `nidflow` (`02-onboarding.md`, seção 5) e são finalizados pelo `copy`. O orquestrador é o responsável pelo disparo, pelas condições e pela saída (cancelamento encerra toda sequência no mesmo dia).

### 3.3 Mensagens de cobrança e bloqueio (rascunho funcional do que falta no `02-onboarding.md`)

> **Rascunho funcional.** R6 e R7 já têm argumento no `02-onboarding.md`. Os dois abaixo completam o regime de leitura.

| Código | Quando | Horário | Canal | Conteúdo funcional | CTA único |
|---|---|---|---|---|---|
| R6c | No dia em que a conta entra em modo leitura por inadimplência | 10h | E-mail | Assunto "Seu NIDflow entrou em modo leitura". Direto: as tentativas de cobrança não aprovaram; a conta abre e exporta, mas não edita; atualizar o pagamento devolve a edição na hora, com todos os projetos. Prazo de exportação em PDF: {data}. Sem culpa, sem desconto | "Atualizar meu pagamento" (área do comprador na plataforma) |
| R7b | No dia em que a conta cancelada entra em modo leitura (fim do período pago) ou no dia do reembolso | 10h | E-mail | Assunto "Seus projetos ficam disponíveis para exportar até {data}". Explica em três linhas: exportação em PDF por 30 dias; projetos guardados por 90 dias para reativar; depois, exclusão definitiva. Reativar é assinar de novo por R$ 29,90 por mês, com tudo no lugar | "Exportar meus projetos em PDF" |
| R8 | D+60 após o fim do acesso | 10h | E-mail | Assunto "Seus projetos serão excluídos em 30 dias". Uma linha com a data e a opção de reativar | "Reativar meu NIDflow" |
| R9 | D+83 após o fim do acesso | 10h | E-mail | Assunto "Última semana antes da exclusão". Idem, com a data exata | "Reativar meu NIDflow" |

Se B-08 (exportação em PDF) não estiver no ar no lançamento, R7b e R6c trocam a linha de exportação por "seus projetos ficam guardados por 90 dias para você reativar" (regra 4 da seção 13 do `01-plano-de-assinatura.md`).

---

## 4. Frequência, horários e opt-out desta etapa

| Regra | E-mail | WhatsApp |
|---|---|---|
| Toques de oferta | 2 (N7, N10) mais N14e para quem não tem WhatsApp; N16 só ramo A | 2 (N7w, N14) |
| Horário | 10h, segunda a sábado; domingo vai para segunda | 10h15 (N7w) e 10h (N14), segunda a sábado |
| Transacional (acesso, cobrança, bloqueio) | Qualquer hora (A1, R1) ou 10h (R6c, R7, R7b, R8, R9) | Qualquer hora (A1w, R1, R6), modelos de utilidade |
| Máximo diário por canal, contando as sequências do `02` | 1 de sequência (transacional não conta) | 1 de sequência |
| Opt-out | Rodapé de todo e-mail; imediato. Não afeta e-mails de acesso e cobrança de quem é assinante (são transacionais e a pessoa é cliente); afeta ofertas e conteúdo | "parar", "sair"; imediato. Idem para transacionais |
| Contato com tarefa humana aberta | E-mails continuam; WhatsApp automático pausa |

---

## 5. Eventos gravados nesta etapa

`F2_nidflow_oferta_enviada` (com `toque`), `F2_nidflow_clique_oferta`, `F2_nidflow_assinatura` (`subscription_created`), `F2_nidflow_conta_criada`, `F2_nidflow_m1` a `F2_nidflow_m5`, `F2_nidflow_renovada`, `F2_nidflow_recusada`, `F2_nidflow_leitura`, `F2_nidflow_cancelada`, `F2_nidflow_reembolso`, `F2_nidflow_reativada`, `F2_nidflow_oferta_encerrada`.

Métricas do brief (9.2) que saem daqui: conversão da oferta em D+7 (assinaturas ÷ contatos que receberam N7, em 14 dias), retenção mensal (renovadas ÷ ativas no início do mês), ativação (M3 e M4 em 7 dias ÷ contas criadas).

---

## 6. Checklist de aceite

- [ ] Contato de teste comprado em D0 recebe N7 às 10h de D+7 (fuso de Brasília) e N7w às 10h15; N10 e N14 nos dias certos; D+7 no domingo vai para segunda.
- [ ] Assinatura de teste em D+8 cancela N10 e N14 e dispara A1 em menos de 2 minutos com link mágico funcional.
- [ ] Os cinco eventos de assinatura (criada, renovada, recusada, cancelada, reembolsada) testados em modo de teste da plataforma mudam o status corretamente; evento duplicado não duplica conta nem e-mail.
- [ ] Conta em modo leitura abre, exporta e não salva; regularizar o pagamento devolve a edição em menos de 1 minuto.
- [ ] R6 (D0, D+3, D+6), R6c, R7, R7b, R8 e R9 disparam nos tempos certos; cancelamento encerra toda sequência de ativação no mesmo dia.
- [ ] Flag `nidflow_venda_liberada` desligada segura a fila; ligada, libera na ordem.
- [ ] Textos finais do `copy` para N7, N7w, N10, N14, N14e, N16, R6c, R7b, R8 e R9 em `automacoes/sequencias/`.
- [ ] Nenhum toque cita PDF com `nidflow_pdf_disponivel = nao`.
