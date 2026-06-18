# UseRef no fluxo de likes da Home

## Contexto

Na home, o fluxo de likes usa atualizacao otimista de UI, consolidacao de cliques rapidos e rollback em caso de erro da API.

Os `useRef` nesses componentes nao representam estado visual primario. Eles representam **estado operacional assíncrono** (fila, lock, snapshot confirmado), que precisa:

- persistir entre renders
- ser mutavel em callbacks async
- nao disparar render a cada mudanca interna

Arquivos envolvidos:

- `src/components/home/FeaturedArticleSection.tsx`
- `src/components/home/ArticlesList.tsx`
- `src/components/home/ArticlesPreviewByCategorySection.tsx`

---

## 1) `pendingDeltaRef` e `pendingDeltaByIdRef`

### O que guardam

- `FeaturedArticleSection`: um numero com o delta pendente para o artigo em destaque.
- `ArticlesList` e `ArticlesPreviewByCategorySection`: `Map<articleId, delta>` para varios artigos.

### Por que existem

Quando o usuario clica like/unlike rapidamente, o sistema acumula esses cliques enquanto uma persistencia anterior ainda esta em andamento. Isso evita requests desnecessarias e permite consolidar operacoes.

### Por que `useRef` e nao `useState`

- Cada alteracao de fila nao precisa rerender da UI.
- O valor precisa ser mutado e lido imediatamente dentro do loop async de flush.
- Com `useState`, haveria render extra e maior risco de lidar com valores desatualizados entre callbacks.

---

## 2) `isPersistingLikeRef` e `inFlightLikeIdsRef`

### O que guardam

- `isPersistingLikeRef`: lock booleano para impedir flush concorrente no artigo em destaque.
- `inFlightLikeIdsRef`: `Set<articleId>` para impedir flush concorrente por artigo nas listas.

### Por que existem

Sem lock, dois flushes podem rodar ao mesmo tempo para o mesmo artigo, causando race condition (ordem de resposta invertida, likes inconsistentes, rollback incorreto).

### Por que `useRef` e nao `useState`

- Lock de concorrencia e controle de fluxo, nao estado visual.
- Precisa de leitura/escrita sincronas no mesmo ciclo de execucao.
- `useState` adicionaria renders sem ganho de UI e tornaria o fluxo mais complexo.

---

## 3) `confirmedArticleRef` e `confirmedArticleByIdRef`

### O que guardam

- Ultimo snapshot confirmado pelo servidor:
  - `confirmedArticleRef` para artigo unico.
  - `confirmedArticleByIdRef` (`Map`) para listas.

### Por que existem

A UI faz update otimista ao clicar. Se a API falhar, o componente volta para o estado confirmado previamente para manter consistencia.

### Por que `useRef` e nao `useState`

- Snapshot de rollback nao precisa renderizar quando atualizado.
- Estado de backup deve estar sempre disponivel para leitura imediata no `catch`.
- `useState` para backup geraria renders desnecessarios.

---

## Por que nao trocar tudo por `useState`

`useState` e ideal para estado que afeta render. Neste fluxo, parte do estado e tecnico/operacional:

- fila de deltas
- lock de concorrencia
- snapshot de rollback

Se tudo isso virar `useState`, o custo e:

- mais renders
- mais ruido de atualizacao
- maior chance de bugs de concorrencia/stale state

---

## E Jotai resolveria?

Jotai pode ajudar a compartilhar estado de UI entre componentes, mas nao elimina a necessidade da logica operacional assincrona.

Mesmo com atom, ainda seria necessario controlar:

- fila pendente por artigo
- lock in-flight por artigo
- snapshot confirmado para rollback

Ou seja: Jotai pode substituir parte de `useState`, mas nao "apaga" o problema que os `useRef` estao resolvendo.

---

## Regra pratica usada aqui

- **Estado visual** (o que deve rerender): `useState`
- **Estado operacional assíncrono** (fila/lock/snapshot): `useRef`

Essa separacao e a principal razao de os `useRef` atuais serem apropriados nesse fluxo.
