import type { ArticleDetail } from "@/types/articleDetail";

export function createArticleJsonLd(article: ArticleDetail, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: typeof article.image === "string" ? article.image : undefined,
    datePublished: article.publicationDate,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author,
        }
      : undefined,
    mainEntityOfPage: url,
  };
}
