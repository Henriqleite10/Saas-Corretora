# NIDflow · O que muda entre o uso interno da NID e o produto vendido

| Campo | Valor |
|---|---|
| Versão | 1.0 (Sprint 4) |
| Status | Entregue ao coordenador |
| Estado atual | **A auditar ao receber o HTML.** O arquivo do NIDflow não está no repositório. Nenhuma linha abaixo descreve o código; descreve o que o brief afirma e o que o produto vendido exige |
| Esforço | P: até 1 dia. M: 2 a 4 dias. G: 5 dias ou mais. Estimativas de uma pessoa, revisadas após a auditoria (B-00) |
| Bloqueia a venda | "Sim" significa que o NIDflow não pode ser oferecido em D+7 sem isso. "Não" significa que pode ser lançado sem e entregue depois |

---

## 1. Tabela

| # | Área | Estado atual | Estado necessário no produto vendido | Esforço | Bloqueia a venda | Item do backlog |
|---|---|---|---|---|---|---|
| 1 | **Autenticação e contas** | A auditar. Hipótese: HTML único aberto no navegador, sem login, uma pessoa da NID por vez, sem noção de "conta" | Login por e-mail (link mágico) com senha opcional; uma conta por assinante; sessão persistente; logout; recuperação de acesso por reenvio do link; limite de 2 sessões simultâneas. Nenhum acesso à ferramenta sem assinatura ativa ou em modo leitura | M | Sim | B-01 |
| 2 | **Cobrança e bloqueio por inadimplência** | A auditar. Hipótese: não existe | Assinatura recorrente na plataforma de checkout do playbook; webhooks de ativa, recusada, inadimplente, cancelada, reembolsada; campo `status` da assinatura lido ao abrir; modo leitura ao ficar inadimplente ou ao fim do período; reativação automática ao regularizar; régua da seção 7 do `01-plano-de-assinatura.md` | M | Sim | B-01 |
| 3 | **Persistência dos projetos** | A auditar. Hipótese: projetos no `localStorage` do navegador ou em arquivo local exportado e importado à mão | Projetos salvos na nuvem, por conta, com salvamento automático, acesso de qualquer dispositivo e isolamento total entre assinantes (RLS). Fila local para quando a rede cair | M | Sim | B-03 |
| 4 | **Remoção de dados e projetos internos da NID** | A auditar. Hipótese: o HTML carrega projetos de clientes reais da NID, nomes, valores, logos e comentários internos | Nenhum dado de cliente da NID no código, nos dados iniciais, nos exemplos, nos comentários ou nos assets. Um único projeto de exemplo, o caso do playbook, sem nome real. Verificação por checklist antes da primeira publicação e a cada deploy (busca por nomes, CNPJs, valores e domínios) | P | Sim | B-02 |
| 5 | **Marca e créditos** | A auditar. Hipótese: título genérico, sem logo, ou logo e textos de uso interno ("Projetos NID", "interno") | Nome `NIDflow` no título da aba, no cabeçalho e no modo de apresentação; logo da NID (`assets/logo_nid.png` da skill `nid-apresentacoes`); paleta do brief (`#F26522`, `#373737`, `#F5F4F2`, `#E4E2DE`); tipografia web conforme a skill `nid-pages`; rodapé com "NID - Núcleo de Inteligência Digital LTDA" e link para termos e privacidade; ícone de favicon; nenhum texto de uso interno | P | Sim | B-06 |
| 6 | **Templates padrão** | A auditar. Hipótese: a ferramenta desenha fluxo livre, sem os cinco templates nomeados do playbook | Todo projeto novo nasce com canvas de dor, mapa de solução, fluxo de arquitetura, tabela de valor e roteiro de proposta, na ordem do método, com pergunta-guia, exemplo em cinza e saída visível, conforme o `02-templates-fluxo.md` do agente `metodo`; projeto de exemplo somente leitura, duplicável | M a G (depende de quanto o modelo de dados atual já separa etapas e componentes) | Sim | B-04 |
| 7 | **Exportação e apresentação** | Modo de apresentação: existe (brief), a auditar como funciona. Exportação em PDF: a auditar | Modo de apresentação em tela cheia na ordem do roteiro de proposta, com notas do apresentador, navegação por teclado, nunca mostrando o investimento antes do valor; exportação em PDF do projeto completo com a marca do assinante (nome e logo opcionais) e sem marca de água da NID; PDF disponível também em modo leitura por 30 dias | M | Sim (PDF sustenta a política de cancelamento) | B-07 |
| 8 | **Limites de uso** | A auditar. Hipótese: nenhum | Projetos ilimitados; 1 usuário; 2 sessões; 200 MB de anexos se houver anexos; aviso em tela a 80%; 100 etapas ou componentes por fluxo com aviso, sem bloqueio. Limites configuráveis por variável, não no código | P | Não (pode lançar sem os avisos de anexo; os demais são configuração) | B-10 |
| 9 | **Suporte** | Inexistente como processo (uso interno resolve na conversa) | Página de perguntas frequentes dentro da ferramenta; botão "Ajuda" que abre o WhatsApp da NID com o e-mail da conta preenchido; e-mail de suporte; prazo de 1 dia útil; procedimento de acesso a projeto do assinante só a pedido, com registro | P | Não (o WhatsApp da NID já existe; a página de perguntas frequentes pode entrar na primeira semana) | B-11 |
| 10 | **Termos de uso e privacidade (LGPD)** | Inexistentes | Termos de uso e política de privacidade publicados e aceitos no primeiro login (checkbox com data e versão registradas); dados hospedados no Brasil; base legal, guarda de 90 dias após o fim do acesso, canal de privacidade, papel de operadora quanto ao conteúdo dos projetos; exclusão definitiva por rotina automática; pedido de exclusão antecipada atendido em até 15 dias; nenhum dado de pagamento no NIDflow | P (texto pelo coordenador com a skill `nid-contratos`) + P (aceite e rotina de exclusão) | Sim | B-09 |
| 11 | **Telemetria mínima para medir ativação** | A auditar. Hipótese: nenhuma | Tabela de eventos com os marcos M1 a M5 do `02-onboarding.md` e os eventos de assinatura; só id da conta, nome do evento, data e metadados numéricos (número de etapas, número do projeto); nunca o conteúdo dos projetos; leitura pelo `automacao` por API ou webhook para disparar as mensagens de resgate; painel simples de ativação para o coordenador | P a M | Sim (sem isso não existe onboarding medido nem resgate) | B-08 |
| 12 | **Hospedagem, domínio e deploy** | A auditar. Hipótese: arquivo aberto localmente ou hospedado em endereço interno | Domínio próprio (sugestão: subdomínio do domínio da NID, por exemplo `flow.` ou `app.`), HTTPS, deploy automático a partir do repositório, ambiente de teste separado do de produção, backup diário do banco | P | Sim | B-01 |
| 13 | **Segurança** | A auditar. Hipótese: sem superfície de ataque relevante por ser local | Chaves só em variáveis de ambiente do servidor; RLS em todas as tabelas por conta; webhook validado por chave compartilhada; sanitização de todo texto do assinante antes de renderizar (o modo de apresentação e o PDF renderizam texto livre); limite de taxa no endpoint do webhook e no envio de link mágico; sem dependência externa carregada de CDN não fixada em versão | P a M | Sim | B-01 |
| 14 | **Acessibilidade e dispositivos** | A auditar. Hipótese: feito para a tela da NID (notebook, projetor) | Leitura e apresentação funcionam no celular; edição do fluxo garantida em telas a partir de 768 px; contraste da paleta conforme WCAG AA no texto sobre laranja; navegação por teclado no modo de apresentação | P | Não | B-05 |

---

## 2. Leitura rápida para o coordenador

Bloqueiam a venda (precisam estar prontos antes da primeira oferta em D+7): linhas 1, 2, 3, 4, 5, 6, 7, 10, 11, 12 e 13. Somadas, ficam entre 14 e 22 dias de trabalho de uma pessoa, conforme a auditoria (detalhe no `04-backlog-tecnico.md`).

Podem entrar depois do lançamento: linhas 8, 9 e 14.

O maior risco está na linha 6 (templates). Se o modelo de dados atual for um desenho livre sem noção de etapa do método, o esforço vai para G e pode exigir reescrever a camada de dados. A auditoria (B-00) responde isso no primeiro dia.
