# Article Page — Desktop Layout

> Leia este documento antes de implementar o layout desktop da Article Page.
> O mobile já está implementado. O objetivo desta fase é evoluir o mesmo componente para breakpoints maiores, sem reescrever a estrutura existente.

---

## Estado atual (mobile ✅)

- Rota: `src/app/(blog)/article/[id]/page.tsx`
- Componente principal: `src/components/article/ArticlePageContent.tsx`
- TOC: `src/components/article/ArticleTableOfContents.tsx`
- Layout e footer: `src/app/(blog)/layout.tsx`
- Tipos de artigo devem viver em: `src/types/article.ts` (ver seção de tipos abaixo)

---

## Layout desktop (a implementar)

### Visão geral

O desktop muda a arquitetura da página de **1 coluna (mobile)** para **2 colunas (editorial)**:

```
┌──────────────────────────────────────────────────────────────────┐
│                        HERO FULL WIDTH                           │
│              imagem + overlay + título sobre a imagem            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────┬───────────────────────────────┐
│         CONTEÚDO (esquerda)      │       SIDEBAR (direita)        │
│                                  │                                │
│  Introduction                    │  ❤ 24.5k  👁 50k  ➤ 206      │
│  Lorem ipsum...                  │                                │
│                                  │  Publication Date  Category    │
│  AI in Healthcare                │  October 15, 2023  Healthcare  │
│  Lorem ipsum...                  │                                │
│                                  │  Reading Time  Author Name     │
│  Predictive Analytics...         │  10 Min        Dr. Emily Walker│
│  Lorem ipsum...                  │                                │
│                                  │  Table of Contents             │
│  [fade + Read Full Blog]         │  ┌────────────────────────┐    │
│                                  │  │ • Introduction          │    │
│                                  │  │ • AI in Healthcare      │    │
│                                  │  │ • Predictive Analytics  │    │
│                                  │  │ ...                     │    │
│                                  │  └────────────────────────┘    │
└──────────────────────────────────┴───────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  Similar News                              View All News ↗        │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   [image]    │  │   [image]    │  │   [image]    │           │
│  │  title       │  │  title       │  │  title       │           │
│  │  category    │  │  category    │  │  category    │           │
│  │  ❤ 2.2k ➤60 │  │  ❤ 6k ➤92  │  │  ❤ 10k ➤124 │           │
│  │  Read More ↗ │  │  Read More ↗ │  │  Read More ↗ │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                          FOOTER                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Implementação por seção

### 1. Hero

- **Mobile**: `h-[17.5625rem]` (281px)
- **Tablet** (`md`): `h-[21rem]` (336px)
- **Desktop** (`lg`): `h-[30rem]` (480px)
- Overlay: `linear-gradient(180deg, rgba(20,20,20,0) -19.6%, rgba(20,20,20,0.88) 62.86%)`
- Título: `text-[1.75rem]` mobile → `text-[2.5rem]` lg, `font-semibold`, `tracking-[-0.03em]`
- Título ancorado a `bottom-5` mobile, `bottom-8` lg, com `px-[5rem]` lg

### 2. Social Stats (likes/views/shares)

- Mobile: `flex` em linha centralizado, `py-5`, `px-[3.375rem]`
- Desktop: migra para o **topo da sidebar** (não é mais uma seção separada)
- Separador horizontal entre hero e conteúdo deve sumir em desktop (`hidden lg:hidden`)

### 3. Conteúdo + Sidebar (grid 2 colunas)

Grid a usar no container:

```
mobile:  grid-cols-1
lg:      grid-cols-[minmax(0,2fr)_minmax(0,1fr)]
gap:     lg:gap-16
padding: px-6 py-10 md:px-10 lg:px-20 2xl:px-40
```

**Coluna esquerda (conteúdo):**

- Seções de artigo com `h2` + `p` (já existente)
- Fade + "Read Full Blog" (já existente)
- Sem mudança de estrutura; só o padding/grid muda

**Coluna direita (sidebar):**

- Stats (`SocialStatButton`) no topo — `flex gap-[0.875rem]`
- Metadata em grid 2×2 (`grid grid-cols-2 gap-x-8 gap-y-4`) — já existente no mobile
- TOC (`ArticleTableOfContents`) — já existente
- No desktop a sidebar deve ser **sticky** (`lg:sticky lg:top-8 lg:self-start`) para acompanhar o scroll do conteúdo

Em mobile: stats ficam numa seção separada acima; metadata + TOC ficam abaixo do conteúdo.
Em desktop: tudo vai para a sidebar à direita.

### 4. Similar News

- Mobile: `flex-col` (já existente)
- Desktop (`lg`): `grid grid-cols-3 gap-8`
- Header da seção: `flex justify-between items-center` (já existente)
- Separadores entre cards devem sumir em desktop

---

## Tipos a criar (antes de implementar)

Crie o ficheiro `src/types/article.ts` com os tipos separados dos componentes:

```ts
export interface ArticleHeading {
  id: string;
  title: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
}

export interface ArticleMetadata {
  publicationDate: string;
  category: string;
  readingTime: string;
  authorName: string;
}

export interface ArticleSocialStats {
  likes: string;
  views: string;
  shares: string;
}

export interface ArticlePageContentProps {
  articleId: string;
}
```

Após criar, remova os `interface` inline de `ArticlePageContent.tsx` e `ArticleTableOfContents.tsx` e importe de `@/types/article`.

---

## Boas práticas a seguir

- **Não duplicar classes mobile** — usar prefixos `lg:` para sobrescrever apenas o que muda
- **Sidebar sticky**: `lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto`
- **Stats no desktop**: não é uma `<section>` isolada; é parte da sidebar — condicionalmente renderizar conforme breakpoint via CSS (`hidden lg:flex`) **não via JS**
- **Similar News grid**: o componente `Post` já existe e não deve ser modificado para funcionar em grid; o grid é responsabilidade do container pai
- **Separadores**: `<Separator className="lg:hidden" />` para os que só existem no mobile

---

## Ordem de implementação sugerida

1. Criar `src/types/article.ts` e refatorar imports
2. Ajustar hero (altura + padding do título)
3. Montar grid de 2 colunas para conteúdo + sidebar
4. Mover stats + metadata para sidebar (usar `hidden lg:flex` / `lg:hidden`)
5. Aplicar sticky na sidebar
6. Converter similar news para 3 colunas no desktop
7. Rodar testes + lint

---

## Componentes existentes que serão reutilizados

| Componente               | Localização                                         | Uso no desktop                      |
| ------------------------ | --------------------------------------------------- | ----------------------------------- |
| `Post`                   | `src/components/blog/Post.tsx`                      | Cards de similar news (grid 3 cols) |
| `SocialStatButton`       | `src/components/blog/SocialStatButton.tsx`          | Stats na sidebar                    |
| `LinkButton`             | `src/components/blog/LinkButton.tsx`                | "View All News"                     |
| `ArticleTableOfContents` | `src/components/article/ArticleTableOfContents.tsx` | Sidebar sticky                      |
| `Separator`              | `src/components/common/Separator.tsx`               | Oculto em desktop com `lg:hidden`   |
| `Header`                 | `src/components/block/Header.tsx`                   | Já no layout                        |
| `Footer`                 | `src/components/block/Footer.tsx`                   | Já no layout                        |
