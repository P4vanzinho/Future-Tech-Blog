# PRD — Página estática de artigo integrada ao Payload CMS

## Problem Statement

O blog possui uma página visual de artigo, mas ela ainda funciona como um protótipo baseado em dados mockados, conteúdo fixo e seleção por identificador. Isso impede que artigos administrados no Payload CMS sejam publicados como páginas reais, indexáveis e geradas durante o build.

A experiência também não integra corretamente as métricas do artigo. Likes já possuem uma arquitetura otimista baseada em estado global, API e cookie assinado na Home, mas a página do artigo ainda não consome essa mesma fonte de verdade. Views e compartilhamentos existem apenas como números de apresentação, sem rastreamento ou proteção contra repetição. Consequentemente, interações feitas na Home, no artigo principal ou nos artigos relacionados podem divergir visualmente.

A solução precisa preservar a geração estática do conteúdo editorial sem congelar métricas interativas. Também precisa manter responsabilidades bem separadas, tipos em módulos próprios, componentes pequenos, funções utilitárias testáveis e integrações externas encapsuladas.

## Solution

Implementar a rota pública de artigo baseada em slug e gerar, durante o build, uma página estática para cada artigo publicado no Payload CMS. A rota será composta majoritariamente por Server Components, que consultarão a Local API do Payload diretamente, mapearão os documentos para modelos próprios da aplicação e renderizarão título, imagem, metadados, corpo Lexical, sumário e artigos relacionados.

Somente as partes interativas serão Client Components: expansão do corpo em telas menores, navegação do sumário, likes, registro de view e compartilhamento. Dados editoriais permanecerão estáticos; métricas serão hidratadas no navegador por uma API específica. Nenhum cookie, header ou dado da requisição será lido durante a geração da página, preservando sua classificação estática.

O estado de likes existente continuará sendo a fonte global de verdade por identificador de artigo. Home, artigo principal e cards relacionados registrarão e consumirão o mesmo estado Jotai. Views e compartilhamentos seguirão a mesma arquitetura de estado global por artigo, persistência validada no servidor e atualização otimista apenas quando segura.

Uma view será registrada uma única vez por navegador e artigo por meio de cookie assinado. Um compartilhamento será contabilizado uma única vez por navegador, artigo e provedor. X, LinkedIn, compartilhamento nativo e cópia de link serão suportados. Os compositores externos serão abertos com os dados aceitos por cada plataforma; a publicação final continuará dependendo da confirmação do usuário.

O Payload terá fluxo de rascunho e publicação. Somente artigos publicados serão consultados para geração estática e exposição pública. Alterações editoriais e mudanças de publicação revalidarão as páginas afetadas. Atualizações de métricas não provocarão regeneração do conteúdo estático.

## User Stories

1. Como leitor, quero acessar um artigo por uma URL baseada em slug, para que a URL seja legível e compartilhável.
2. Como leitor, quero receber uma página pré-renderizada, para que o conteúdo apareça rapidamente e possa ser indexado.
3. Como leitor, quero ver somente artigos publicados, para que rascunhos não sejam expostos.
4. Como leitor, quero receber uma página 404 para um slug inexistente, para que o erro seja claro e correto.
5. Como editor, quero salvar um artigo como rascunho, para que ele possa ser preparado sem ficar público.
6. Como editor, quero publicar um artigo, para que uma página pública seja criada ou revalidada.
7. Como editor, quero despublicar ou excluir um artigo, para que sua página pública deixe de estar disponível.
8. Como editor, quero definir título, slug, resumo, autor, categoria e imagem de capa, para que o artigo tenha todas as informações de apresentação.
9. Como editor, quero compor o corpo com rich text Lexical, para que eu possa usar títulos, parágrafos, listas, links e formatação.
10. Como editor, quero inserir blocos de imagem com legenda, para que o artigo suporte conteúdo visual contextualizado.
11. Como leitor, quero ver o título e a imagem de capa do artigo, para identificar imediatamente o conteúdo.
12. Como leitor, quero ver autor, categoria e data de publicação, para entender a origem e o contexto do artigo.
13. Como leitor, quero ver um tempo de leitura calculado automaticamente, para estimar o esforço necessário.
14. Como editor, não quero preencher manualmente o tempo de leitura, para evitar dados inconsistentes com o conteúdo.
15. Como leitor, quero um sumário gerado pelos títulos de nível dois e três, para navegar por artigos extensos.
16. Como leitor, quero que cada item do sumário leve à seção correta, para encontrar rapidamente uma informação.
17. Como usuário de teclado, quero que o sumário seja navegável e tenha foco visível, para usar a página sem mouse.
18. Como leitor, quero que títulos repetidos recebam âncoras únicas, para que todos os links do sumário funcionem.
19. Como leitor, quero expandir o conteúdo em layouts que o apresentem resumido inicialmente, para controlar a quantidade de conteúdo visível.
20. Como leitor, quero que imagens e rich text mantenham estrutura semântica, para obter uma leitura acessível.
21. Como leitor, quero ver artigos relacionados definidos pelo editor, para continuar explorando conteúdo relevante.
22. Como leitor, quero que vagas restantes de relacionados sejam preenchidas por artigos da mesma categoria, para sempre receber recomendações úteis.
23. Como leitor, não quero ver o artigo atual na lista de relacionados, para evitar uma recomendação redundante.
24. Como leitor, quero ver no máximo três artigos relacionados, para manter a seção objetiva.
25. Como leitor, quero que cards relacionados usem o mesmo padrão visual da Home, para ter uma experiência consistente.
26. Como leitor, quero curtir o artigo principal, para registrar minha reação.
27. Como leitor, quero remover minha curtida, para poder desfazer a reação.
28. Como leitor, quero que a contagem de likes seja atualizada imediatamente, para receber feedback da interação.
29. Como leitor, quero que uma falha ao salvar o like reverta o estado otimista, para não visualizar um resultado falso.
30. Como leitor, quero que um like feito na Home apareça ao navegar para o artigo, para que o estado permaneça consistente.
31. Como leitor, quero que a remoção de like no artigo apareça ao voltar para a Home, para que ambas as telas compartilhem a mesma fonte de verdade.
32. Como leitor, quero curtir um artigo relacionado, para interagir sem precisar abri-lo primeiro.
33. Como leitor, quero que o like dado em um relacionado apareça em qualquer outro card desse artigo, para evitar estados contraditórios.
34. Como leitor, quero que meu estado de like seja restaurado após recarregar a página, para manter a interação entre sessões.
35. Como mantenedor, quero reutilizar o atom de likes existente, para evitar duas implementações concorrentes da mesma regra.
36. Como operador, quero impedir likes repetidos pelo mesmo navegador, para reduzir manipulação trivial da métrica.
37. Como leitor, quero que minha primeira entrada em um artigo registre uma view, para que a métrica represente seu alcance.
38. Como leitor, não quero que recarregamentos sucessivos gerem novas views, para que a métrica não seja inflada pelo mesmo navegador.
39. Como leitor, quero que a view registrada seja refletida nos componentes que mostram o mesmo artigo, para manter a interface sincronizada.
40. Como operador, quero proteger o registro de views com cookie assinado e limitação de requisições, para reduzir abuso.
41. Como leitor, quero compartilhar um artigo no X, para iniciar uma publicação com texto e URL preenchidos.
42. Como leitor, quero compartilhar um artigo no LinkedIn, para abrir seu fluxo oficial com a URL do conteúdo.
43. Como leitor, quero usar o compartilhamento nativo do dispositivo, para escolher um aplicativo instalado.
44. Como leitor, quero copiar o link do artigo, para compartilhá-lo manualmente.
45. Como leitor, quero que título, descrição, imagem e URL estejam presentes nos metadados sociais, para que previews externos representem corretamente o artigo.
46. Como leitor, quero confirmar a publicação no compositor da rede, para manter controle sobre o que será publicado em minha conta.
47. Como operador, quero contar um compartilhamento quando o fluxo de compartilhamento for iniciado com sucesso, para acompanhar engajamento.
48. Como operador, quero contar no máximo um compartilhamento por navegador, artigo e provedor, para limitar repetição artificial sem impedir o uso de redes diferentes.
49. Como leitor, quero que um compartilhamento já contabilizado no X não impeça o compartilhamento no LinkedIn, para usar mais de um canal legitimamente.
50. Como leitor, quero receber feedback quando copiar ou compartilhar falhar, para saber que a ação não foi concluída.
51. Como leitor, não quero que o contador aumente quando uma ação falhar antes de abrir ou entregar o compartilhamento, para que o feedback seja coerente.
52. Como operador, quero que métricas atuais sejam consultadas após a hidratação, para não depender dos números presentes no último build.
53. Como leitor, quero acessar conteúdo editorial mesmo se a consulta de métricas falhar, para que uma falha secundária não derrube o artigo.
54. Como operador, quero que atualizações de likes, views e shares não revalidem a página estática, para evitar builds ou invalidações desnecessárias.
55. Como editor, quero que uma alteração editorial revalide o artigo alterado, para publicar conteúdo atualizado sem novo deploy completo.
56. Como editor, quero que alterações relevantes também revalidem listagens e artigos que o exibem como relacionado, para evitar conteúdo editorial obsoleto.
57. Como mantenedor, quero modelos de resumo, detalhe, métricas e contratos de API separados, para que cada módulo dependa apenas dos dados necessários.
58. Como mantenedor, quero tipos declarados em módulos próprios e importados pelos consumidores, para evitar contratos escondidos dentro de componentes.
59. Como mantenedor, quero validação dos dados vindos do CMS e das APIs, para detectar contratos inválidos nas fronteiras do sistema.
60. Como mantenedor, quero componentes de apresentação sem acesso direto ao CMS, para separar obtenção de dados de renderização.
61. Como mantenedor, quero serviços de consulta independentes da UI, para poder testá-los isoladamente.
62. Como mantenedor, quero regras de relacionados, tempo de leitura, âncoras e compartilhamento em funções puras, para facilitar testes unitários.
63. Como mantenedor, quero constantes de limites, provedores, velocidade de leitura e configurações de cookies centralizadas, para evitar valores mágicos.
64. Como mantenedor, quero conversores Lexical isolados por tipo de nó ou bloco, para estender o conteúdo sem tornar um único componente complexo.
65. Como mantenedor, quero Client Components restritos às ilhas realmente interativas, para reduzir JavaScript enviado ao navegador.
66. Como mantenedor, quero erros de CMS, conteúdo ausente e métricas indisponíveis tratados explicitamente, para evitar fallbacks silenciosos para artigos incorretos.
67. Como responsável por SEO, quero metadata específica por artigo, para melhorar indexação e previews sociais.
68. Como responsável por SEO, quero URL canônica baseada no slug, para evitar conteúdo duplicado.
69. Como responsável por SEO, quero dados estruturados de artigo quando houver dados suficientes, para fornecer contexto aos mecanismos de busca.
70. Como responsável por qualidade, quero testes unitários para mapeamento, relacionados, leitura, âncoras e métricas, para proteger regras de negócio.
71. Como responsável por qualidade, quero testes de componentes para corpo, sumário, cards, likes e compartilhamento, para validar comportamento e acessibilidade.
72. Como responsável por qualidade, quero testes das rotas de métricas para cookies, repetição, entradas inválidas e rate limit, para proteger os contratos públicos.
73. Como responsável por qualidade, quero um teste de integração da página com dados do Payload, para garantir que mocks não sejam usados na rota final.
74. Como responsável por qualidade, quero executar lint, testes e verificação de tipos, para impedir regressões básicas.
75. Como responsável por entrega, quero executar o build de produção com dados publicados, para comprovar que todos os slugs são gerados durante o build.
76. Como responsável por entrega, quero falhar a validação se a rota do artigo aparecer como dinâmica no relatório do build, para tornar o requisito estático verificável.
77. Como responsável por entrega, quero confirmar que slugs publicados aparecem na lista de páginas geradas, para validar a integração entre Payload e Next.js.

## Implementation Decisions

- A URL canônica do artigo será baseada em slug. Identificadores internos continuarão sendo usados para métricas e relacionamentos.
- Todas as rotas de artigos publicados serão enumeradas durante o build. Parâmetros não enumerados serão rejeitados e artigos ausentes usarão a resposta 404 do framework.
- A geração estática consultará o Payload pela Local API no servidor, sem uma chamada HTTP intermediária.
- A consulta de parâmetros estáticos buscará somente slugs de artigos publicados e usará seleção mínima de campos.
- A consulta de detalhe buscará somente os campos necessários para hero, metadata, corpo, métricas iniciais e relacionados.
- O Payload terá suporte a rascunhos e publicação. Consultas públicas filtrarão explicitamente pelo estado publicado, mesmo quando a Local API permitir contornar access control por padrão.
- A data exibida será a data efetiva de publicação. O modelo editorial deverá preservá-la em republicações e distingui-la das datas técnicas de criação e atualização.
- Alterações editoriais, publicação, despublicação, exclusão, mudança de slug e alterações em relacionamentos dispararão revalidação das rotas editoriais afetadas.
- Mutações exclusivas de métricas serão identificadas e não executarão hooks de revalidação editorial.
- O conteúdo editorial será renderizado por Server Components. Componentes clientes não receberão o documento bruto do Payload.
- Um modelo de resumo atenderá Home e cards. Um modelo de detalhe adicionará corpo, views, relacionados, tags e dados necessários à metadata.
- Tipos de domínio, propriedades de componentes, contratos de serviço e contratos de API ficarão em módulos próprios e serão importados nos locais de uso.
- Tipos gerados pelo Payload serão tratados como tipos de infraestrutura e não substituirão os modelos de domínio da aplicação.
- Dados externos serão validados na fronteira antes do mapeamento. O restante da aplicação consumirá modelos normalizados.
- O corpo suportará inicialmente apenas rich text Lexical e imagem com legenda. Blocos desconhecidos serão tratados de forma segura e observável, sem quebrar toda a página.
- A renderização Lexical usará os conversores React mantidos para o ecossistema Payload, com conversores próprios apenas para comportamento ou estilo específico do blog.
- O sumário será derivado de headings de nível dois e três do conteúdo Lexical, preservando a ordem editorial.
- A mesma função determinística gerará IDs tanto na extração do sumário quanto na renderização dos headings. Colisões receberão sufixos incrementais.
- O tempo de leitura será calculado a partir do texto extraído do conteúdo renderizável. A velocidade de leitura será uma constante configurável e o resultado mínimo será um minuto.
- Artigos relacionados explícitos terão prioridade e manterão a ordem definida pelo editor. Vagas restantes serão preenchidas por artigos publicados da mesma categoria, ordenados dos mais recentes para os mais antigos.
- O artigo atual e duplicatas serão excluídos. A lista final terá no máximo três itens.
- A metadata incluirá título, resumo, canonical, Open Graph e Twitter Card com imagem. Dados estruturados usarão o tipo Article e somente valores disponíveis e válidos.
- A arquitetura de likes existente será reutilizada. O estado continuará indexado pelo identificador do artigo e será consumido pelo artigo principal, Home e relacionados.
- O registro inicial de um artigo no estado global nunca sobrescreverá uma interação mais recente já presente no atom.
- O estado global permanecerá no mesmo React tree da navegação do blog, preservando sincronização durante transições client-side.
- Após reload, o estado do navegador será reconciliado com cookies assinados e com as métricas atuais devolvidas pelo servidor.
- Será fornecida uma leitura client-side de métricas atuais. Essa leitura não consultará cookies no Server Component e, portanto, não tornará a página dinâmica.
- Likes manterão semântica de alternância e atualização otimista. Falhas reverterão para o último estado confirmado.
- Uma view será registrada no cliente após a página estar hidratada. O servidor verificará o cookie assinado antes de incrementar e devolverá o valor atual mesmo quando a view já tiver sido contabilizada.
- O cookie de view será específico por artigo e terá duração definida em constante. A assinatura impedirá que o cliente fabrique um estado válido.
- Provedores de compartilhamento iniciais: X, LinkedIn, compartilhamento nativo e cópia de link. Medium fica excluído porque não oferece suporte confiável para novas integrações com preenchimento/publicação.
- X usará seu Web Intent com texto e URL. LinkedIn usará seu fluxo oficial de compartilhamento e obterá título, descrição e imagem pelos metadados da URL.
- O compartilhamento nativo usará título, resumo e URL quando suportado pelo navegador, com fallback para opções explícitas.
- O sistema não armazenará tokens sociais nem publicará sem confirmação. Integrações OAuth de escrita não fazem parte desta entrega.
- Para provedores externos, “compartilhado” significa que o compositor foi aberto com sucesso; navegadores não permitem confirmar que a publicação foi concluída. Para compartilhamento nativo, será considerado sucesso quando a API resolver. Para cópia, quando a área de transferência confirmar a operação.
- O contador de shares aceitará no máximo um incremento por navegador, artigo e provedor. Cookies assinados representarão cada combinação já contabilizada.
- Uma nova tentativa no mesmo provedor continuará abrindo o fluxo para o usuário, mas não incrementará novamente. Outro provedor poderá incrementar normalmente.
- Likes, views e shares terão validação de entrada, limites de delta definidos pelo servidor, cookies assinados, logs de abuso e rate limiting.
- A persistência de métricas será atômica no nível suportado pelo adaptador de banco para reduzir perda de incrementos concorrentes. A implementação não deverá depender de ler e gravar sem proteção quando houver alternativa transacional.
- Respostas de métricas terão contratos validados e devolverão o estado canônico necessário para reconciliar a UI.
- Falhas de métricas serão isoladas do conteúdo editorial. A página continuará legível e apresentará feedback somente na interação afetada.
- Componentes de apresentação receberão dados e callbacks por propriedades. Eles não importarão Payload, cookies, fetch ou atoms diretamente, exceto containers interativos explicitamente responsáveis por orquestrar estado.
- Funções de normalização de slug, extração de texto, geração de âncora, cálculo de leitura, seleção de relacionados e criação de URLs sociais serão puras.
- Limites, nomes de provedores, mensagens reutilizadas, tempos de cookie, velocidade de leitura e quantidade de relacionados serão constantes nomeadas.
- O build de produção será parte obrigatória da validação. O relatório deverá classificar as páginas de artigo como pré-renderizadas e listar os slugs produzidos.
- A validação será executada com pelo menos um artigo publicado no banco usado pelo build. Um build sem artigos não comprova a geração de páginas reais.
- Testes cobrirão navegação Home → artigo → Home para likes, interação com relacionado, persistência após reload, view única e share único por provedor.

## Out of Scope

- Publicação direta em contas sociais por OAuth.
- Armazenamento, renovação ou revogação de tokens de redes sociais.
- Integração com Medium, cuja API não aceita novas integrações e não é mais suportada.
- Comentários de leitores.
- Autenticação de leitores ou sincronização de métricas entre diferentes navegadores do mesmo usuário.
- Contagem de pessoas únicas; o limite por cookie representa um navegador, não uma identidade humana garantida.
- Confirmação de que uma publicação foi efetivamente enviada em um compositor externo.
- Analytics avançado, dashboards, funis ou atribuição de origem do compartilhamento.
- Novos blocos editoriais além de rich text e imagem com legenda.
- Live Preview do Payload.
- Busca, paginação ou página completa de listagem de notícias.
- Migração para exportação HTML totalmente desacoplada de servidor. As APIs de métricas e o Payload continuam exigindo runtime de servidor.

## Further Notes

- A documentação do Next.js define `generateStaticParams` como o mecanismo para gerar segmentos dinâmicos no build. A configuração de parâmetros dinâmicos deve impedir fallback em runtime para manter a regra de publicação explícita: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- A Local API do Payload é apropriada para React Server Components e evita latência HTTP intermediária: https://payloadcms.com/docs/local-api/overview
- A renderização do rich text deve seguir os conversores Lexical do Payload: https://payloadcms.com/posts/guides/how-to-render-rich-text-from-payload-in-a-nextjs-frontend
- O relatório do `next build` será a evidência primária para diferenciar páginas estáticas de rotas renderizadas sob demanda: https://nextjs.org/docs/api-reference/cli
- Web Intents do X abrem o compositor para decisão final do usuário e não exigem credenciais da aplicação: https://docs.x.com/x-for-websites/web-intents/overview
- A Web Share API exige ação explícita do usuário e pode receber título, texto e URL: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
- A API do Medium está arquivada, não aceita novas integrações e não é recomendada: https://github.com/Medium/medium-api-docs
- Contadores de compartilhamento externo representam intenção iniciada, não publicação confirmada. Essa distinção deve aparecer nos nomes internos, testes e documentação operacional.
