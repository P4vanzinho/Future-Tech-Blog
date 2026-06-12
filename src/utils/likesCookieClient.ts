import type { Article } from "@/types/article";

function getLikeCookieName(articleId: string | number): string {
  return `liked_${articleId}`;
}

function readCookieValue(cookieName: string): string | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  return document.cookie
    .split(";")
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.startsWith(`${cookieName}=`))
    ?.split("=")[1];
}

export function hasLikedCookie(articleId: string | number): boolean {
  const value = readCookieValue(getLikeCookieName(articleId));
  return value?.startsWith("liked.") ?? false;
}

export function hydrateArticleLikedState(article: Article): Article {
  return {
    ...article,
    isLiked: hasLikedCookie(article.id),
  };
}

export function hydrateArticlesLikedState(articles: Article[]): Article[] {
  return articles.map(hydrateArticleLikedState);
}
