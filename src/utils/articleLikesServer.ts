import type { Article } from "@/types/article";
import { getPayloadSecret } from "@/config/env";
import {
  getLikeCookieName,
  hasValidLikedCookieValue,
  readCookieValueFromHeader,
} from "@/utils/likesCookie";

function hydrateLikedArticle(
  article: Article,
  cookieHeader: string | null
): Article {
  const secret = getPayloadSecret();
  const likedCookie = readCookieValueFromHeader(
    cookieHeader,
    getLikeCookieName(article.id)
  );

  return hasValidLikedCookieValue(likedCookie, article.id, secret)
    ? { ...article, isLiked: true }
    : article;
}

export function hydrateArticlesLikedStateFromCookies(
  articles: Article[],
  cookieHeader: string | null
): Article[] {
  return articles.map((article) => hydrateLikedArticle(article, cookieHeader));
}

export function hydrateArticleLikedStateFromCookies(
  article: Article,
  cookieHeader: string | null
): Article {
  return hydrateLikedArticle(article, cookieHeader);
}
