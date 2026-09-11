# NIDflow · Backlog técnico

| Campo | Valor |
|---|---|
| Versão | 1.0 (Sprint 4) |
| Status | Entregue ao coordenador. **Nada aqui é executado sem o coordenador liberar** |
| Pré-requisito | O arquivo HTML do NIDflow no repositório (`produtos/nidflow/`) ou o caminho indicado. Sem ele, só o item B-00 pode começar (e começa pela cobrança do arquivo) |
| Estimativas | Em dias de trabalho de uma pessoa. Revisadas após B-00 |

---

## 1. Arquitetura mínima proposta

Objetivo: transformar um HTML único em produto com login, cobrança e projetos na nuvem com o menor esforço e sem reescrever a ferramenta.

### 1.1 Princípio

O HTML atual continua sendo o front. Não migra para Next.js, não vira SPA com bundler, não troca de framework. Adiciona-se em volta dele:

1. **Supabase** (stack padrão da skill `nid-pages`) para autenticação, banco Postgres com RLS, storage de anexos e funções de borda (Edge Functions).
2. **Hospedagem estática** do HTML (Cloudflare Pages, Vercel ou Netlify; qualquer um, decisão do coordenador) com deploy a partir do repositório.
3. **Uma função de borda** que recebe os webhooks da plataforma de checkout e mantém a tabela de assinaturas.
4. **Um módulo JavaScript** carregado pelo HTML (`nidflow-conta.js`) que faz login, lê o status da assinatura, salva e carrega projetos e grava telemetria. O código de desenho e apresentação não muda.

```
Navegador do assinante
┌──────────────────────────────────────────────────────┐
│ index.html (ferramenta atual: desenho + apresentação) │
│   + nidflow-conta.js (login, status, salvar, eventos) │
└───────────────┬──────────────────────────────────────┘
                │ supabase-js (chave pública anon, RLS protege tudo)
                ▼
Supabase (região São Paulo)
┌──────────────┬──────────────┬────────────┬───────────────────────┐
│ Auth         │ Postgres+RLS │ Storage    │ Edge Functions        │
│ link mágico  │ contas       │ anexos     │ webhook-checkout      │
│ senha opc.   │ assinaturas  │ (200 MB)   │ reenviar-acesso       │
│              │ projetos     │            │ exportar-pdf (opc.)   │
│              │ eventos      │            │ rotina-exclusao (cron)│
└──────────────┴──────────────┴────────────┴───────────────────────┘
                ▲                                   ▲
                │ webhook assinado                  │ eventos (webhook ou consulta)
Plataforma de checkout (Cakto recomendada)     Automações do `automacao`
```

### 1.2 Modelo de dados mínimo

| Tabela | Campos principais | Regra de acesso (RLS) |
|---|---|---|
| `contas` | `id` (igual ao `auth.users.id`), `email`, `nome`, `perfil` (respostas do passo 2 do onboarding), `termos_aceitos_em`, `termos_versao`, `criada_em`, `ultimo_login_em` | A conta lê e edita só a própria linha |
| `assinaturas` | `id`, `conta_id`, `origem` (`nidflow_mensal` ou `plataforma_nid`), `id_externo` (id na plataforma de checkout), `status` (`ativa`, `recusada`, `inadimplente`, `leitura`, `cancelada`, `reembolsada`, `excluida`), `periodo_fim`, `leitura_ate`, `exclusao_em`, `atualizada_em` | A conta só lê a própria linha. Só a função de webhook escreve (chave de serviço) |
| `projetos` | `id`, `conta_id`, `nome`, `cliente`, `conteudo` (JSONB com as cinco etapas e o fluxo), `versao_schema`, `criado_em`, `atualizado_em`, `excluido_em` | A conta lê os próprios projetos sempre; escreve só se a assinatura estiver `ativa` (política checa a tabela `assinaturas`) |
| `eventos` | `id`, `conta_id`, `nome`, `metadados` (JSONB numérico ou enum, nunca texto livre do projeto), `criado_em` | A conta só insere. Leitura pela chave de serviço (painel e `automacao`) |
| `projeto_exemplo` | Uma linha global, somente leitura, com o caso do playbook | Leitura para qualquer conta autenticada |

Regra: o `conteudo` do projeto é o mesmo JSON que a ferramenta já usa hoje (a auditar). Se o HTML já serializa o projeto para salvar ou exportar, esse formato vira o `conteudo` com um campo `versao_schema`. Nenhuma lógica de desenho conhece o banco.

### 1.3 O que essa arquitetura não faz de propósito

- Não tem servidor próprio, fila nem container. Tudo o que roda no servidor é função de borda.
- Não gera PDF no servidor por padrão: a exportação usa a impressão do navegador com folha de estilo de impressão (B-08). Função de borda para PDF só se a auditoria mostrar que o canvas não imprime bem.
- Não tem painel administrativo próprio: o painel de ativação é uma consulta salva no Supabase (ou uma página estática que lê a tabela `eventos` com chave de serviço em função de borda).

### 1.4 Custo estimado de operação

Supabase Pro (cerca de US$ 25 por mês) mais hospedagem estática gratuita ou de baixo custo. Com 100 assinantes a R$ 26,86 líquidos (Cakto), a receita mensal é de R$ 2.686 e a infraestrutura fica abaixo de 6%. Números de infraestrutura são estimativa e devem ser confirmados no cadastro.

---

## 2. Backlog priorizado

Ordem de implementação. Cada item só começa quando o anterior da mesma trilha está aceito. "Bloqueia" indica se o item precisa estar pronto antes da primeira oferta em D+7.

| # | Item | Bloqueia | Estimativa | Depende de |
|---|---|---|---|---|
| B-00 | Auditoria do HTML atual | Sim | 1 dia | Receber o arquivo |
| B-01 | Limpeza de dados e projetos internos da NID | Sim | 0,5 a 1 dia | B-00 |
| B-02 | Infraestrutura, domínio e autenticação | Sim | 2 dias | B-00 |
| B-03 | Persistência dos projetos na nuvem | Sim | 2 a 3 dias | B-02 |
| B-04 | Cobrança: webhook, status da assinatura, modo leitura | Sim | 2 dias | B-02, decisão 5 do brief |
| B-05 | Os cinco templates do método dentro da ferramenta | Sim | 3 a 6 dias | B-00, B-03, `02-templates-fluxo.md` |
| B-06 | Onboarding guiado e reações ao travamento | Sim | 2 dias | B-05 |
| B-07 | Marca, créditos e identidade | Sim | 0,5 a 1 dia | B-00 |
| B-08 | Exportação em PDF | Sim | 1 a 2 dias | B-05 |
| B-11 | Telemetria mínima de ativação | Sim | 1 dia | B-02 |
| B-13 | Termos de uso, privacidade e rotina de exclusão | Sim | 1 dia (técnico) + texto do coordenador | B-02 |
| B-09 | Limites de uso e avisos em tela | Não | 0,5 dia | B-03 |
| B-10 | Suporte: perguntas frequentes e botão de ajuda | Não | 0,5 dia | B-07 |
| B-12 | Link público de apresentação | Não (sem data) | 2 dias | B-08 |
| B-14 | Inclusão via Plataforma NID | Não (só no Sprint 6) | 0,5 dia | B-04 |

Total dos itens que bloqueiam: **16 a 22 dias** de uma pessoa, contando a auditoria. Com dois desenvolvedores em trilhas paralelas (infra e cobrança de um lado; templates e onboarding do outro), cerca de 3 semanas corridas.

---

## 3. Itens detalhados com critério de aceite

### B-00 · Auditoria do HTML atual (1 dia)

Objetivo: substituir toda hipótese "a auditar" deste documento e do `03-interno-vs-produto.md` por fato, e recalibrar as estimativas.

Checklist objetivo do que verificar e registrar (o resultado vai em `produtos/nidflow/00-auditoria.md`):

1. **Tamanho e estrutura**: linhas do arquivo; CSS e JS inline ou externos; dependências de CDN (quais, versões fixadas ou não); frameworks ou bibliotecas de canvas (SVG puro, canvas 2D, biblioteca de diagramas).
2. **Modelo de dados do projeto**: como um projeto é representado em memória; se existe serialização (JSON) para salvar, exportar ou importar; se há noção de etapa, componente, ligação, nota; se há campos de texto livre por etapa.
3. **Persistência atual**: `localStorage`, `IndexedDB`, arquivo baixado, nada. Quantos projetos cabem. O que acontece ao recarregar a página.
4. **Modo de apresentação**: como é acionado; se é tela cheia; navegação (teclado, clique); se há ordem definida das telas; se mostra notas; se o investimento pode aparecer antes do valor.
5. **Exportação**: existe PDF, imagem ou impressão? Como fica a folha de impressão hoje?
6. **Dados internos da NID**: busca no arquivo por nomes de clientes, CNPJs, valores em reais, domínios, e-mails, comentários de código, projetos pré-carregados, logos. Lista tudo o que precisa sair (alimenta B-01).
7. **Marca**: título, favicon, logo, textos de interface, nomes que mencionam uso interno.
8. **Templates**: se existe algum template ou projeto-base; distância entre o que existe e os cinco templates do método.
9. **Dispositivos**: comportamento em 375 px, 768 px e 1280 px; toque no canvas; teclado.
10. **Segurança**: uso de `innerHTML` com texto do usuário; chaves ou URLs internas no código; recursos carregados por HTTP.
11. **Desempenho**: tempo de abertura; comportamento com 100 etapas no fluxo.
12. **Acessibilidade**: contraste da paleta atual; foco visível; textos alternativos.

Critério de aceite: `00-auditoria.md` publicado com os 12 pontos respondidos, lista de dados internos a remover, formato JSON do projeto documentado (ou a conclusão de que não existe) e estimativas de B-01 a B-08 revisadas com justificativa.

### B-01 · Limpeza de dados e projetos internos (0,5 a 1 dia)

- Remover todo dado listado no ponto 6 da auditoria.
- Criar o projeto de exemplo a partir do caso conduzido do capítulo 7 do `01-playbook.md` (empresa de serviços de manutenção predial, descrita por segmento, números do exercício), sem nome real.
- Adicionar ao processo de deploy uma verificação automática (script de busca por lista de termos proibidos: nomes de clientes, CNPJs, domínios) que falha o deploy se encontrar algo.

Critério de aceite: busca por qualquer termo da lista retorna zero ocorrências no HTML, nos assets e no banco inicial; o script de verificação roda no deploy e tem um teste que prova que ele barra um termo proibido.

### B-02 · Infraestrutura, domínio e autenticação (2 dias)

- Projeto Supabase na região São Paulo (`sa-east-1`), com ambientes de teste e produção.
- Hospedagem estática do HTML com deploy automático a partir da branch de produção; domínio próprio com HTTPS.
- Auth por link mágico (e-mail), senha opcional definida no primeiro acesso; sessão persistente; logout; limite de 2 sessões simultâneas (a mais antiga é encerrada).
- Página de login mínima na identidade do B-07: um campo (e-mail), um botão ("Receber meu link de acesso"), mensagem de confirmação.
- Função de borda `reenviar-acesso` com limite de taxa (3 por hora por e-mail), usada pelo suporte e pelo agente de IA.
- Chaves só em variáveis de ambiente; a chave anon é a única no front; RLS ativa em todas as tabelas antes de qualquer dado real.
- Backup diário do banco (recurso do Supabase) confirmado.

Critério de aceite: um e-mail de teste recebe o link em menos de 1 minuto, entra, define senha, sai, entra de novo com senha; uma terceira sessão derruba a primeira; nenhuma tabela responde a consulta sem token válido (teste automatizado com dois usuários provando isolamento, no mesmo espírito dos testes de RLS do radar-corretoras).

### B-03 · Persistência dos projetos na nuvem (2 a 3 dias)

- Tabela `projetos` com `conteudo` JSONB no formato documentado em B-00, mais `versao_schema`.
- Salvamento automático com debounce (2 segundos após a última alteração) e indicador discreto "salvo" na interface.
- Fila local (IndexedDB) para alterações feitas sem rede, sincronizadas ao reconectar; em conflito, a versão mais recente por `atualizado_em` vence e a outra fica em `conteudo_conflito` por 7 dias.
- Lista de projetos (nome, cliente, atualizado em, abrir, duplicar, excluir com confirmação simples).
- Migração: se o HTML atual guarda projetos no navegador, ao primeiro login o módulo importa o que encontrar e avisa ("importamos [n] projetos deste navegador").

Critério de aceite: criar projeto em um navegador, abrir em outro dispositivo com a mesma conta e ver o mesmo conteúdo; desligar a rede, editar, religar e ver a alteração sincronizada; conta B nunca vê projeto da conta A (teste automatizado); 200 projetos na lista abrem em menos de 2 segundos.

### B-04 · Cobrança: webhook, status e modo leitura (2 dias)

- Função de borda `webhook-checkout` para a plataforma escolhida (decisão 5 do brief): valida assinatura ou segredo do webhook, é idempotente por `id_externo` mais tipo de evento, mapeia eventos para `status` conforme a régua da seção 7 do `01-plano-de-assinatura.md`.
- Ao ativar: cria a conta se não existir, dispara o e-mail de acesso, insere evento `conta_criada` e chama o webhook do `automacao`.
- Modo leitura: política RLS nega escrita em `projetos` quando o status não é `ativa`; a interface mostra a faixa da seção 6 do plano com botão "Reativar" ou "Atualizar pagamento" (link para a plataforma de checkout).
- Rotina diária (cron do Supabase): passa `leitura` para `excluida` após 90 dias, encerra PDF após 30, envia os e-mails de D+60 e D+83 via `automacao`.
- Cancelamento dentro do NIDflow: botão que leva à área do comprador da plataforma (não se implementa cancelamento próprio, para não divergir da plataforma).

Critério de aceite: com a plataforma em modo de teste, os cinco eventos (ativa, recusada, inadimplente, cancelada, reembolsada) chegam e mudam o status corretamente; evento duplicado não cria conta nem e-mail duplicado; conta em `leitura` abre, exporta e não salva (a tentativa de salvar mostra a faixa, sem erro técnico); regularizar o pagamento devolve a escrita em menos de 1 minuto; webhook com assinatura inválida é rejeitado e registrado.

### B-05 · Os cinco templates do método (3 a 6 dias)

- Todo projeto novo nasce com as cinco seções na ordem: canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor, roteiro de proposta, com os campos exatos dos capítulos 3 a 6 e 8 do `produtos/playbook/01-playbook.md` (listados na seção 2 do `02-onboarding.md`) e os textos (pergunta-guia, exemplo em cinza, instrução) do `02-templates-fluxo.md` do agente `metodo`.
- Campos repetidos entre templates (diagnóstico em uma frase, dor em número) copiados automaticamente do template de origem, editáveis.
- Campos obrigatórios mínimos do primeiro projeto conforme a regra 5 da seção 2 do `02-onboarding.md`; os demais visíveis e opcionais.
- Navegação por etapa (1 de 4 mais o roteiro) no topo; ordem fixa; etapa vazia aparece marcada.
- O modo de apresentação segue as nove páginas do roteiro de proposta (capa, dor, solução, arquitetura em três páginas, valor, investimento, próximo passo), cada página lendo o template de origem; página de template opcional vazio é pulada.
- O fluxo de arquitetura usa o canvas de desenho atual: cada bloco carrega os sete campos por etapa do playbook (nome, objetivo, entra, sai, componentes, responsável, prazo) e o fluxo tem os três campos gerais (resultado final, primeiro resultado visível, riscos respondidos). As demais etapas são formulários com saída visual (diagnóstico em uma frase, frase de solução, tabela).
- A frase de diagnóstico e as linhas de ganho da tabela de valor são pré-montadas a partir dos campos anteriores e editáveis.
- Projeto de exemplo somente leitura, duplicável: o caso conduzido do capítulo 7 do playbook (automação comercial com IA para uma empresa de serviços de manutenção predial, descrita por segmento).
- Se a auditoria mostrar que o modelo atual é desenho livre: criar a camada de "projeto" que envolve o desenho (o fluxo vira uma das cinco seções) sem alterar o motor de desenho. É o que leva a estimativa a 6 dias.

Critério de aceite: um assinante de teste que leu o playbook reconhece os cinco templates pelo nome e pelos campos sem explicação; os nomes dos campos batem com o `01-playbook.md` e os textos com o `02-templates-fluxo.md` palavra por palavra; o modo de apresentação nunca exibe a página de investimento antes da de valor (teste manual com projeto que tem investimento preenchido e valor vazio); duplicar o exemplo gera projeto editável.

### B-06 · Onboarding guiado e reações ao travamento (2 dias)

- Implementa os passos 1 a 8 da seção 3 do `02-onboarding.md` e as reações da seção 6.
- Aparece só até o primeiro `projeto_completo`; depois some.
- Perguntas do passo 2 gravadas em `contas.perfil` e enviadas como evento `perfil_respondido`.

Critério de aceite: cronômetro de um assinante de teste do e-mail ao modo de apresentação em menos de 15 minutos sem ajuda (três pessoas diferentes, nenhuma da NID); fechar a aba em qualquer passo e voltar retoma no mesmo ponto; nenhuma tela apresenta funcionalidade inexistente.

### B-07 · Marca, créditos e identidade (0,5 a 1 dia)

- Título `NIDflow`, favicon, logo da NID, paleta do brief, tipografia da skill `nid-pages` com fallback carregado, rodapé com razão social e links para termos e privacidade, remoção de qualquer texto de uso interno.
- Modo de apresentação: marca discreta do NIDflow no canto (o assinante pode ocultar nas configurações do projeto, porque a apresentação é dele para o cliente dele).

Critério de aceite: nenhuma ocorrência de texto interno; contraste do texto sobre `#F26522` e sobre `#373737` aprovado em AA; a apresentação com marca oculta não mostra nada da NID.

### B-08 · Exportação em PDF (1 a 2 dias)

- Folha de estilo de impressão que gera o PDF do projeto completo na ordem do roteiro, uma etapa por página, fluxo de arquitetura em página paisagem, com nome e logo do assinante (opcionais) e sem marca de água.
- Botão "Exportar em PDF" no projeto e no modo leitura (30 dias).
- Se o canvas não imprimir de forma legível (auditoria), função de borda com renderização em navegador sem interface para gerar o PDF; nesse caso a estimativa vai para 3 dias.

Critério de aceite: PDF de um projeto com 12 etapas abre legível em qualquer leitor, o fluxo não corta, o investimento aparece depois do valor; exportação funciona em conta em modo leitura dentro dos 30 dias e não funciona depois.

### B-09 · Limites de uso e avisos (0,5 dia)

- Limites da seção 3 do plano em variáveis de configuração; avisos em tela a 80% de anexos e a 100 etapas por fluxo (aviso, não bloqueio).

Critério de aceite: mudar a variável muda o aviso sem deploy do HTML; o aviso de 100 etapas aparece na etapa 101 e permite continuar.

### B-10 · Suporte (0,5 dia)

- Página de perguntas frequentes dentro do NIDflow (dez perguntas iniciais, texto do `copy`); botão "Ajuda" que abre o WhatsApp da NID com mensagem pré-preenchida contendo o e-mail da conta; e-mail de suporte no rodapé.

Critério de aceite: o botão abre o WhatsApp no celular e no computador com a mensagem correta; as dez perguntas cobrem acesso, cobrança, cancelamento, templates, PDF e apresentação.

### B-11 · Telemetria mínima de ativação (1 dia)

- Tabela `eventos` com os nomes fixos: `acesso_enviado`, `primeiro_login`, `perfil_respondido`, `projeto_criado`, `etapa_preenchida` (com `etapa` no metadado), `arquitetura_min_3_etapas`, `projeto_completo`, `apresentacao_aberta`, `pdf_exportado`, `projeto_editado_novo_dia`, `conta_criada`, `assinatura_status` (com o status).
- Nenhum metadado de texto livre. Só números, enums e ids.
- Webhook para o `automacao` a cada evento de marco (M1 a M5) e consulta salva no Supabase com o funil de ativação (contas por marco, por semana de entrada).

Critério de aceite: o funil mostra, para um grupo de contas de teste, quantas atingiram cada marco; o `automacao` recebe o webhook de `projeto_completo` em menos de 1 minuto; uma revisão da tabela confirma que nenhum campo contém conteúdo de projeto.

### B-12 · Link público de apresentação (2 dias, sem data)

- Link somente leitura, com expiração opcional, que abre o modo de apresentação de um projeto sem login. Só entra na oferta quando tiver data de entrega definida pelo coordenador.

Critério de aceite: o link abre em navegador anônimo, não permite edição, expira na data definida e pode ser revogado.

### B-13 · Termos, privacidade e rotina de exclusão (1 dia técnico)

- Aceite dos termos no primeiro login com versão e data em `contas`; nova versão exige novo aceite.
- Páginas de termos e privacidade publicadas no domínio.
- Rotina de exclusão definitiva (B-04) com registro de execução.
- Endpoint interno para o suporte atender pedido de exclusão antecipada em até 15 dias.

Critério de aceite: conta sem aceite não abre a ferramenta; exclusão remove `contas`, `projetos`, `eventos`, anexos e o usuário do Auth, mantendo só um registro anônimo de que a exclusão ocorreu; texto revisado pelo coordenador com a skill `nid-contratos`.

### B-14 · Inclusão via Plataforma NID (0,5 dia, Sprint 6)

- O webhook da Plataforma NID cria ou reativa a assinatura com `origem = plataforma_nid`; o fim da anuidade leva ao mesmo regime de leitura.

Critério de aceite: compra de teste da Plataforma cria a conta do NIDflow; assinante mensal que compra a Plataforma passa a `plataforma_nid` sem perder projetos.

---

## 4. O que a auditoria pode mudar neste backlog

| Achado possível na auditoria | Consequência |
|---|---|
| O HTML já serializa o projeto em JSON | B-03 cai para 2 dias; B-05 fica em 3 a 4 dias |
| Desenho livre sem noção de etapa | B-05 vai para 6 dias e ganha a camada de "projeto" |
| Canvas não imprime | B-08 vai para 3 dias com função de borda |
| Bibliotecas de CDN sem versão fixada | B-02 ganha 0,5 dia para fixar versões e servir localmente |
| Modo de apresentação sem ordem definida | B-05 ganha 1 dia para o roteiro de proposta comandar a ordem |
| Muitos dados internos espalhados no código | B-01 vai para 1 dia e a verificação automática ganha mais termos |
