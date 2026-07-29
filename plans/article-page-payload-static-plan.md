# Plan: Página estática de artigo integrada ao Payload CMS

> Source PRD: [article-page-payload-static.md](./article-page-payload-static.md)

## Architectural decisions

- **Execution workflow**: todas as fases serão implementadas na branch atual. Nenhum commit será criado durante a execução deste plano.
- **Routes**: artigos públicos usarão `/article/[slug]`. Slugs publicados serão enumerados no build e parâmetros não enumerados responderão com 404, sem fallback dinâmico.
- **Static boundary**: título, autoria, categoria, imagem, corpo, relacionados e metadata serão pré-renderizados. Cookies e métricas atuais serão tratados somente após a hidratação ou em endpoints de mutação, sem introduzir dependência de request-time na página.
- **CMS access**: Server Components e geração de parâmetros consultarão a Local API do Payload. Somente documentos publicados serão expostos, com seleção mínima de campos e validação na fronteira.
- **Schema**: Article terá rascunho/publicação, data efetiva de publicação, slug único, conteúdo em blocos rich text ou imagem, relacionados, tags e grupo de métricas.
- **Key models**: resumo de artigo, detalhe de artigo, bloco editorial, heading de sumário, metadata editorial, estado de likes, estado de métricas e provedor de compartilhamento serão contratos distintos.
- **Types**: tipos de domínio, propriedades de componentes e contratos de API ficarão em módulos próprios. Tipos gerados pelo Payload permanecerão restritos à camada de infraestrutura e mapeamento.
- **Rendering**: a página será composta majoritariamente por Server Components. Somente expansão, sumário interativo, likes, views e compartilhamento formarão ilhas clientes.
- **Rich text**: o conteúdo Lexical será renderizado com conversores compatíveis com Payload. O sumário usará headings `h2` e `h3`, com IDs determinísticos e colisões resolvidas.
- **Related articles**: relacionamentos definidos pelo editor terão prioridade. Até três vagas serão completadas por artigos publicados da mesma categoria, sem artigo atual ou duplicatas.
- **Engagement state**: o atom existente de likes continuará sendo a fonte global por `article.id`. Views e shares seguirão o mesmo princípio de estado compartilhado e reconciliação com o servidor.
- **Metric persistence**: likes, views e shares terão validação server-side, cookies assinados e rate limiting. Incrementos concorrentes usarão a garantia atômica disponível no adaptador de banco.
- **Views**: uma view será contabilizada uma única vez por navegador e artigo. O registro ocorrerá no cliente depois da hidratação.
- **Shares**: X, LinkedIn, compartilhamento nativo e cópia de link serão suportados. Cada navegador poderá incrementar uma vez por artigo e provedor; abrir novamente o mesmo provedor continuará permitido, mas sem novo incremento.
- **Social boundary**: redes externas abrirão compositores ou mecanismos nativos com dados preenchidos. Não haverá OAuth, armazenamento de tokens ou publicação direta.
- **Revalidation**: alterações editoriais e de publicação revalidarão as páginas afetadas. Mutações exclusivas de métricas não executarão revalidação editorial.
- **Verification**: cada fase incluirá testes proporcionais ao comportamento entregue. A conclusão exige lint, testes, verificação de tipos e build com pelo menos um artigo publicado; a saída do build deve comprovar pré-renderização por slug.

---

## Phase 1: Artigo publicado e estático por slug

**User stories**: 1–8, 11–12, 57–61, 65–66, 73, 75–77

### What to build

Entregar o primeiro caminho vertical entre um artigo publicado no Payload e uma página pública mínima em `/article/[slug]`. O editor poderá manter rascunhos fora do site, publicar um artigo com os dados essenciais e obter uma página pré-renderizada com hero e metadata editorial básica. O serviço público normalizará e validará o documento antes da apresentação, slugs inexistentes responderão com 404 e o build enumerará artigos publicados reais.

### Acceptance criteria

- [ ] O modelo editorial aceita rascunho, publicação, data efetiva de publicação e os dados essenciais do artigo.
- [ ] Rascunhos não aparecem nas consultas públicas nem na enumeração de rotas estáticas.
- [ ] Cada artigo publicado possui uma página acessível em `/article/[slug]` com título, capa, autor, categoria e data de publicação.
- [ ] A rota não usa mocks nem seleciona artigos por fallback silencioso.
- [ ] Slug vazio, inválido, não publicado ou inexistente produz 404.
- [ ] Dados vindos do Payload são validados e mapeados para um modelo de detalhe próprio antes de chegar à apresentação.
- [ ] Tipos de rota, domínio, serviço e apresentação ficam separados dos componentes consumidores.
- [ ] Testes comprovam filtro de publicação, mapeamento, consulta por slug, 404 e renderização mínima.
- [ ] O build é executado com ao menos um artigo publicado e lista seu slug como conteúdo pré-renderizado, não como rota dinâmica.

---

## Phase 2: Conteúdo editorial completo, sumário e SEO

**User stories**: 9–20, 45, 62–71

### What to build

Expandir a página estática para renderizar o corpo editorial completo com rich text e imagens, derivando do mesmo conteúdo o sumário e o tempo de leitura. A página receberá metadata específica, canonical, preview social e dados estruturados. A interação de expansão e navegação permanecerá isolada no cliente, enquanto o conteúdo semântico continuará presente no HTML pré-renderizado.

### Acceptance criteria

- [ ] Blocos rich text Lexical são renderizados com parágrafos, headings, listas, links e formatação semanticamente corretos.
- [ ] Blocos de imagem exibem imagem, texto alternativo apropriado e legenda quando disponível.
- [ ] Blocos desconhecidos não derrubam a página e produzem diagnóstico observável.
- [ ] O sumário contém headings `h2` e `h3` na ordem do conteúdo.
- [ ] IDs de heading são determinísticos, únicos e idênticos entre sumário e corpo, inclusive para títulos repetidos.
- [ ] A navegação do sumário funciona com mouse e teclado, mantém foco visível e respeita semântica de navegação.
- [ ] O tempo de leitura é calculado a partir do texto editorial usando uma constante nomeada e nunca resulta em menos de um minuto.
- [ ] A expansão em layouts aplicáveis não remove o conteúdo do HTML estático nem prejudica acessibilidade.
- [ ] Metadata inclui título, resumo, canonical, Open Graph, Twitter Card e imagem do artigo.
- [ ] Dados estruturados do tipo Article incluem somente valores disponíveis e válidos.
- [ ] Funções de texto, leitura e âncoras têm testes unitários; corpo, sumário e metadata têm testes de integração ou componente.
- [ ] O build continua classificando os slugs como pré-renderizados.

---

## Phase 3: Artigos relacionados

**User stories**: 21–25, 57–63, 70–71

### What to build

Entregar recomendações estáticas no final do artigo. A seleção respeitará a ordem dos relacionamentos editoriais e completará até três posições com artigos publicados da mesma categoria. Os resultados usarão o modelo resumido e o padrão visual compartilhado com a Home, mantendo links por slug e evitando duplicatas.

### Acceptance criteria

- [ ] Relacionados escolhidos pelo editor aparecem primeiro e preservam sua ordem.
- [ ] Vagas restantes são preenchidas por artigos publicados da mesma categoria, do mais recente para o mais antigo.
- [ ] O artigo atual, rascunhos e artigos duplicados nunca aparecem na lista.
- [ ] A seção apresenta no máximo três itens e se comporta corretamente quando não há candidatos.
- [ ] Cards utilizam o modelo resumido e o padrão visual compartilhado com a Home.
- [ ] Cada card aponta para `/article/[slug]` e possui conteúdo acessível.
- [ ] A regra de seleção é uma função isolada e coberta para relacionamentos parciais, duplicatas e ausência de fallback.
- [ ] Consultas buscam apenas campos necessários e não introduzem renderização dinâmica.
- [ ] Testes de componente comprovam ordem, limite, exclusões e navegação.

---

## Phase 4: Likes sincronizados em toda a aplicação

**User stories**: 26–36, 52–54, 70–72

### What to build

Conectar o artigo principal e os cards relacionados à arquitetura de likes já utilizada na Home. Todos os consumidores registrarão artigos no mesmo estado global por identificador, preservarão interações mais recentes durante navegações e reconciliarão cookies e resposta canônica do servidor após reload. A mutação continuará otimista, reversível e protegida contra repetição.

### Acceptance criteria

- [ ] O artigo principal exibe contagem e estado de like vindos da mesma fonte global utilizada pela Home.
- [ ] Cards relacionados permitem curtir e descurtir sem abrir o artigo.
- [ ] Dar like na Home e navegar para o artigo preserva contagem e estado preenchido.
- [ ] Descurtir no artigo e voltar para a Home atualiza todos os consumidores do mesmo artigo.
- [ ] Interagir com um relacionado atualiza qualquer outra representação desse artigo no React tree.
- [ ] O registro inicial de dados estáticos nunca sobrescreve uma interação mais recente presente no atom.
- [ ] Reload restaura o estado de like válido e reconcilia a contagem atual do servidor.
- [ ] Atualização otimista é revertida para o último estado confirmado quando a persistência falha.
- [ ] Repetição inválida é recusada por cookie assinado e limitação de requisições.
- [ ] A mutação de like não dispara revalidação do conteúdo editorial.
- [ ] Falha na leitura ou mutação de métricas não impede a renderização do artigo.
- [ ] Testes cobrem atom, rollback, hidratação, artigo principal, relacionados e navegação Home → artigo → Home.

---

## Phase 5: Views únicas e métricas atuais

**User stories**: 37–40, 52–54, 59, 63, 66, 70, 72

### What to build

Adicionar uma ilha de engajamento que, após a hidratação da página estática, consulte métricas atuais e registre a primeira view daquele navegador para o artigo. O servidor devolverá o estado canônico tanto para uma nova view quanto para uma visita já conhecida, permitindo sincronizar todos os consumidores sem ler cookies durante a pré-renderização.

### Acceptance criteria

- [ ] A primeira entrada do navegador em um artigo publicado incrementa views exatamente uma vez.
- [ ] Reload e novas visitas no mesmo navegador não incrementam novamente enquanto o cookie for válido.
- [ ] O cookie de view é específico por artigo, assinado e configurado por constantes nomeadas.
- [ ] Artigo inválido ou não publicado não recebe view.
- [ ] A resposta sempre devolve a contagem canônica e informa se a visita já havia sido contabilizada.
- [ ] Métricas atuais substituem valores obsoletos do build somente após hidratação, sem alterar o conteúdo editorial.
- [ ] A nova contagem é refletida em outros consumidores ativos do mesmo artigo.
- [ ] A rota valida parâmetros, aplica rate limit e trata concorrência sem perder incrementos suportados pelo banco.
- [ ] Falha de métricas mantém a página utilizável e gera feedback ou diagnóstico apropriado.
- [ ] O registro de view não executa revalidação editorial.
- [ ] Testes cobrem primeira visita, repetição, cookie adulterado, artigo inexistente, rate limit e falha de persistência.
- [ ] O build confirma que a leitura client-side e o registro de view não tornaram `/article/[slug]` dinâmico.

---

## Phase 6: Compartilhamento social contabilizado

**User stories**: 41–54, 59, 62–63, 66, 70–72

### What to build

Entregar compartilhamento por X, LinkedIn, mecanismo nativo e cópia de link, usando título, resumo e URL canônica do artigo dentro dos limites de cada provedor. Uma iniciação bem-sucedida reconciliará a contagem de shares com o servidor. Cada combinação navegador, artigo e provedor poderá incrementar uma vez, sem impedir que o usuário abra novamente o compositor.

### Acceptance criteria

- [ ] X abre seu Web Intent com texto e URL codificados corretamente.
- [ ] LinkedIn abre o fluxo oficial com a URL canônica, cuja preview possui metadata completa.
- [ ] Compartilhamento nativo recebe título, resumo e URL quando suportado e possui fallback quando indisponível.
- [ ] Copiar link usa a URL canônica e fornece feedback de sucesso ou falha.
- [ ] Nenhum provedor publica sem confirmação, solicita OAuth ou armazena tokens sociais.
- [ ] Um fluxo externo aberto com sucesso pode incrementar shares; falha anterior à abertura não incrementa.
- [ ] Compartilhamento nativo só incrementa quando a API resolve, e cópia só incrementa após confirmação da área de transferência.
- [ ] Cada provedor incrementa no máximo uma vez por navegador e artigo mediante cookie assinado.
- [ ] Reabrir o mesmo provedor permanece permitido sem novo incremento; usar outro provedor pode incrementar.
- [ ] Estado e contador de shares são reconciliados globalmente para o artigo.
- [ ] Parâmetros e provedores são validados, e a rota aplica rate limit e persistência segura.
- [ ] Mutação de shares não dispara revalidação editorial nem altera a classificação estática da página.
- [ ] Funções de criação de URLs sociais e regras de contabilização têm testes unitários.
- [ ] Testes de componente e rota cobrem todos os provedores, repetição, cancelamento, erro, cookies adulterados e rate limit.

---

## Phase 7: Ciclo editorial e revalidação seletiva

**User stories**: 5–7, 54–56, 66, 72–77

### What to build

Completar o ciclo entre alterações editoriais no Payload e o conteúdo estático publicado. Publicação, edição, mudança de slug, relacionamentos, despublicação e exclusão invalidarão apenas as páginas e listagens editoriais afetadas. Mutações de engajamento permanecerão fora desse fluxo. A fase encerra com validação integrada do comportamento editorial, das métricas e do build de produção.

### Acceptance criteria

- [ ] Publicar um rascunho torna seu slug elegível à geração e disponibilização pública.
- [ ] Alterar conteúdo editorial revalida o artigo e as superfícies que exibem seu resumo.
- [ ] Alterar relacionados revalida o artigo atual e demais páginas cuja recomendação possa ser afetada.
- [ ] Mudar o slug invalida o caminho anterior e disponibiliza o novo caminho sem manter conteúdo duplicado.
- [ ] Despublicar ou excluir remove o artigo das consultas públicas, listagens e páginas relacionadas.
- [ ] Hooks distinguem alterações editoriais de mutações exclusivas de likes, views ou shares.
- [ ] Nenhuma operação de métrica executa revalidação de página ou listagem.
- [ ] Falhas de revalidação são observáveis e não corrompem o documento editorial.
- [ ] Testes cobrem publicação, edição, mudança de slug, relacionados, despublicação, exclusão e exclusão de métricas do fluxo editorial.
- [ ] Lint, testes unitários, testes de integração e verificação de tipos passam.
- [ ] O build de produção passa usando ao menos um artigo publicado.
- [ ] A saída do build comprova que os slugs publicados foram pré-renderizados e que `/article/[slug]` não é server-renderizado sob demanda.
- [ ] O trabalho permanece na branch atual e nenhum commit é criado.
