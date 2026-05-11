import type { Article } from "@/types/article";

export function getArticleUrl(slug: string, baseUrl?: string): string {
  const origin =
    baseUrl ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${origin}/article/${slug}`;
}

const sortArticlesByDate = (articles: Article[]): Article[] => {
  return [...articles].sort((a, b) => {
    const dateA = new Date(a.publicationDate ?? 0).getTime();
    const dateB = new Date(b.publicationDate ?? 0).getTime();
    return dateB - dateA;
  });
};

export const getLatestArticle = (articles: Article[]): Article | undefined => {
  const sorted = sortArticlesByDate(articles);
  return sorted[0];
};

export const getOtherArticles = (articles: Article[]): Article[] => {
  const sorted = sortArticlesByDate(articles);
  return sorted.slice(1);
};
