# Explicação da página do artigo

Esta página foi estruturada para ser gerada estaticamente pelo Next, mas ainda assim puxar os dados reais do CMS Payload. A ideia foi separar responsabilidades com clareza: busca de dados em serviços, transformação em tipos próprios, renderização em componentes e geração de metadata no próprio arquivo da rota.

## O que esta rota faz

A rota `src/app/(blog)/article/[slug]/page.tsx` é a entrada da página do artigo. Ela não contém lógica de interface complexa; sua função é coordenar tudo:

- buscar o artigo pelo `slug`
- gerar a lista de slugs estáticos na build
- montar metadata para SEO e compartilhamento
- injetar JSON-LD para buscadores
- renderizar o componente visual principal da página

## Por que ela é estática

As linhas abaixo são o ponto principal da estratégia:

```ts
export const dynamic = "force-static";
export const dynamicParams = false;
```

Isso diz ao Next que:

- a rota deve ser gerada como conteúdo estático
- apenas os slugs retornados em `generateStaticParams` são válidos
- o build precisa conhecer os artigos publicados antes de publicar a página

Na prática, isso evita que a página dependa de renderização dinâmica por request, o que é importante para performance e para a arquitetura que você pediu.

## Como os slugs são gerados

```ts
export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

Essa função é executada no build. Ela consulta o CMS e devolve apenas os artigos publicados.

O resultado é usado pelo Next para pré-gerar páginas como:

- `/article/amanda-post`
- `/article/test-article`

## Como o metadata funciona

```ts
export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata>;
```

Essa função monta o metadata da página com base no artigo correspondente ao slug.

Ela retorna:

- `title`
- `description`
- `canonical`
- `openGraph`
- `twitter`

Isso é o que faz o artigo ter preview correto em buscadores e redes sociais.

### `metadataBase`

`metadataBase: new URL(getSiteUrl())` define a URL base que o Next usa para resolver links e imagens do metadata. Isso evita que previews usem uma base errada quando o site roda em ambientes diferentes.

### `alternates.canonical`

O canonical aponta para a URL oficial do artigo. Isso evita duplicidade de indexação quando a página pode ser acessada por mais de uma rota ou ambiente.

### Open Graph e Twitter

Esses blocos informam como a página deve aparecer quando alguém compartilha o link.

- `type: "article"` identifica o conteúdo como artigo
- `publishedTime` informa quando foi publicado
- `authors` ajuda a enriquecer o preview
- `images` define a imagem principal do card

## Como o conteúdo é renderizado

```ts
export default async function ArticlePage({ params }: ArticleRouteProps);
```

Esse é o componente principal da página.

Fluxo:

1. recebe o `slug`
2. busca o artigo completo no serviço
3. chama `notFound()` se não existir
4. gera o JSON-LD
5. renderiza `ArticlePageContent`

## O que é o JSON-LD

```ts
const jsonLd = createArticleJsonLd(article, url);
```

JSON-LD é um formato de dados estruturados que os buscadores entendem melhor do que HTML puro.

Ele ajuda o Google e outros crawlers a reconhecerem:

- que a página é um artigo
- qual é o título
- quem é o autor
- qual é a data de publicação
- qual é a imagem do conteúdo

O script é inserido assim:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

O `replace(/</g, "\\u003c")` evita quebrar o HTML com caracteres especiais dentro do JSON.

## Onde a interface vive

```tsx
<ArticlePageContent article={article} />
```

Esse componente concentra a interface da página:

- hero
- estatísticas
- corpo do artigo
- sidebar
- artigos relacionados

A página em si só coordena dados e metadata. A renderização fica isolada em componentes específicos, seguindo a separação de responsabilidades.

## Relação com o CMS

O artigo vem do Payload por meio dos serviços em `src/services/articles.ts`.

Os tipos e mappers foram separados para:

- evitar tipos espalhados
- manter a transformação de dados centralizada
- facilitar manutenção e testes

## Resumo

Essa página foi desenhada para ser:

- estática na build
- segura para SEO
- compatível com o CMS
- modular
- fácil de manter

O arquivo da rota coordena tudo, mas não concentra responsabilidade de negócio nem de apresentação. Cada parte do fluxo ficou em seu lugar:

- serviço busca dados
- utilitários montam URL e JSON-LD
- componente renderiza a UI
- Next usa `generateStaticParams` e `generateMetadata` para fechar a página como SSG
