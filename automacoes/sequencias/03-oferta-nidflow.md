# Sequência 03 · Oferta do NIDflow (D+7 a D+16) e o que vem depois

| Campo | Valor |
|---|---|
| Fluxo de origem | `automacoes/03-oferta-nidflow-d7.md` (seções 1, 2 e 3.3). Códigos, momentos, canais e condições são os do fluxo |
| Códigos do fluxo `03` | N7, N7w, N10, N14, N14e, N16, R6c, R7b, R8, R9 |
| Onde está o texto final de cada um | **N7, N7w, N10, N14 e N14e**: `produtos/nidflow/oferta/oferta-d7.md` (seções 2 a 6), já finalizados pelo `copy`, com as duas versões de N7 (com e sem a linha de exportação em PDF). **R6c, R7b, R8 e R9**: `produtos/nidflow/mensagens-onboarding.md` (parte 2), junto com A1 a A4 e R1 a R7 do onboarding. **N16**: este arquivo. Nenhum texto é duplicado aqui: a versão que vale é a do arquivo indicado |
| Nota sobre N1 e N2 | O pedido do coordenador listou "N1, N2, N16" para este arquivo. N1 e N2 são as mensagens de **pagamento recusado** do fluxo `02` (seção 6.3), não do fluxo `03`. Elas ficam em `07-reengajamento.md`, com a recuperação de checkout e o Pix pendente, conforme o cabeçalho de `01-entrega-playbook.md` |
| Quem recebe | Contato com `F2-comprador-playbook` ou `F2-minicurso`, sem `F2-nidflow-ativo`, sem `F2-reembolso`, sem `F2-plataforma-ativo`, sem opt-out no canal do toque. Só com `nidflow_venda_liberada = sim` |
| O que oferece | NIDflow por R$ 29,90 por mês, cancela quando quiser, 7 dias de garantia com reembolso sem pergunta. Sem período gratuito, sem plano anual, sem desconto |
| Remetente | E-mail: "NID". WhatsApp: número oficial da NID. Henrique não aparece em nenhuma mensagem do NIDflow |
| Autor | Agente `copy` |
| Status | Entregue ao coordenador. Passa pelo `estrategia` antes de ser dada como pronta |

---

## 1. Índice dos toques (D+7 a D+16), com a condição de cada um

| Código | Momento | Canal | Condição | CTA único | Texto final |
|---|---|---|---|---|---|
| N7 | D+7, 10h | E-mail | Todos os elegíveis | "Quero desenhar meu próximo projeto no NIDflow" | `oferta-d7.md`, seção 2 (duas versões: com e sem PDF) |
| N7w | D+7, 10h15 | WhatsApp (marketing) | Telefone informado, sem opt-out de WhatsApp, sem tarefa humana aberta | Link da página da oferta | `oferta-d7.md`, seção 3 |
| N10 | D+10, 10h | E-mail | Ainda sem `F2-nidflow-ativo` | "Quero desenhar meu próximo projeto no NIDflow" | `oferta-d7.md`, seção 4 |
| N14 | D+14, 10h | WhatsApp (marketing) | Idem; telefone e sem opt-out | Link da página da oferta | `oferta-d7.md`, seção 5 |
| N14e | D+14, 10h | E-mail | Idem; só para quem não tem WhatsApp ou fez opt-out de WhatsApp | "Quero desenhar meu próximo projeto no NIDflow" | `oferta-d7.md`, seção 6 |
| N16 | D+16, 8h às 10h | E-mail | Ramo A: sem `F2-minicurso` **e** sem `F2-nidflow-ativo` | "Quero as aulas por R$ 147" | Seção 2 deste arquivo |

Regras dos toques (do fluxo): um link e um CTA por toque; quem clicou e não assinou não recebe toque extra; nenhum toque cita desconto, plano anual, teste grátis, IA na ferramenta, link público ou aplicativo; a linha de exportação em PDF só entra com `nidflow_pdf_disponivel = sim`.

Respostas ao WhatsApp N7w e N14: o agente atende com a base do NIDflow (`06-agente-direct-whatsapp.md`, seção 5). Se a pessoa pedir para assinar, o agente manda o link do checkout de assinatura, não da página.

---

## 2. N16 · Duas formas de continuar

**Código**: N16
**Momento**: D+16, entre 8h e 10h (Brasília)
**Canal**: e-mail
**Condição**: ramo A (sem `F2-minicurso`) e sem `F2-nidflow-ativo`. Última mensagem de oferta antes do conteúdo contínuo
**Assunto**: Duas formas de continuar
**Pré-cabeçalho**: As aulas e a ferramenta continuam disponíveis. Uma frase sobre cada uma, e um único link.

**Corpo**

Olá, {primeiro_nome}.

Faz pouco mais de duas semanas que o playbook chegou. A partir de agora, o que você recebe da NID é conteúdo: um pedaço do método por vez, aplicado, sem oferta no meio. Antes disso, uma última mensagem sobre os dois degraus que ficaram abertos.

As aulas do Mini curso NID · Apresente para Fechar mostram a reunião inteira, de antes de entrar na sala até o follow-up, do jeito que a NID faz, com a proposta na tela. R$ 147, 7 dias de garantia.

A ferramenta, o NIDflow, é onde a NID desenha e apresenta os projetos dela, com os cinco templates do playbook já dentro. R$ 29,90 por mês, cancela quando quiser. A apresentação dela já passou por aqui; se quiser rever, é só responder a este e-mail que a gente reenvia o link.

Se a próxima reunião de apresentação já está marcada, comece pelas aulas: o checklist de reunião e a aula de objeções cabem no tempo que falta até ela.

[Botão] Quero as aulas por R$ 147
{link_pagina_minicurso}?utm_source=email&utm_medium=sequencia&utm_campaign=F2-minicurso&utm_content=n16

7 dias de garantia, reembolso sem pergunta.

NID · Consultoria de Performance Comercial

{link_descadastro}

**CTA único**: "Quero as aulas por R$ 147". O NIDflow é citado sem link, porque já teve a sequência dele; quem responder pedindo o link recebe do agente ou do humano a página da oferta (`{link_pagina_oferta}` com `utm_content=n16`).

---

## 3. Depois de assinar: acesso, ativação, cobrança e leitura

Texto final já entregue em `produtos/nidflow/mensagens-onboarding.md`:

| Código | O que é | Momento |
|---|---|---|
| A1, A1w | Acesso (e-mail com link mágico e WhatsApp) | Até 2 minutos após `subscription_created` |
| A2 | Primeiro projeto desenhado | Até 10 minutos após o marco M3 |
| A3 | "Como foi a apresentação?" (pergunta P5, sinal do Gatilho B) | 7 dias após o acesso, só quem atingiu M4 |
| A4 | Um mês de NIDflow (duas versões: com e sem projeto) | 30 dias após o acesso |
| R1, R1b | Não entrou (24 h e 72 h) | Conforme o fluxo |
| R2, R3, R4, R5 | Entrou sem projeto; arquitetura vazia; nunca apresentou; sem login há 14 dias | Conforme o fluxo |
| R6 (D0, D+3, D+6) | Cobrança recusada | Conforme o fluxo |
| R6c | Conta em modo leitura por inadimplência | 10h do dia da mudança |
| R7 | Cancelou | No dia do cancelamento |
| R7b | Conta cancelada entrou em modo leitura, ou reembolso | 10h do dia |
| R8, R9 | Avisos de exclusão (D+60 e D+83 após o fim do acesso) | 10h |

Nenhuma dessas mensagens é reescrita aqui. Alteração de texto passa por aquele arquivo e por este índice.

---

## 4. Mensagens do fluxo `03` que ainda não têm texto (dependem do Sprint 6)

| Situação (seção 3.1 do fluxo) | O que falta | Depende de |
|---|---|---|
| Compra da Plataforma NID por quem já assina o NIDflow mensal: "cancela na plataforma no mesmo dia e envia e-mail explicando" | E-mail de encerramento da mensalidade sem cobrança dupla | Sprint 6 (`plataforma`), decisão 3 do brief aprovada |
| Fim da anuidade da Plataforma sem renovação: "oferta do NIDflow mensal avulso (uma vez, por e-mail)" | E-mail único de oferta | Sprint 6 |

Os dois entram na sequência da Plataforma NID, com a página de lançamento, quando o Sprint 6 abrir.

---

## Checklist de coerência deste arquivo

- [x] Nenhum texto duplicado: N7 a N14e valem pelo `oferta-d7.md`; R6c a R9 pelo `mensagens-onboarding.md`
- [x] N16 com um único link (mini curso) e o NIDflow citado sem link, conforme o fluxo
- [x] Preços só como `R$ 29,90` (por mês) e `R$ 147`; nenhum desconto, plano anual ou teste grátis
- [x] Henrique ausente das mensagens do NIDflow
- [x] Sem emoji em e-mail, sem travessão, sem "pra" ou "pro", sem termo interno
