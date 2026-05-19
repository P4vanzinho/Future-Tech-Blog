import { cookies } from "next/headers";
import type { Article } from "@/types/article";
import { getArticles } from "@/services/articles";
import {
  getLikeCookieName,
  hasValidLikedCookieValue,
} from "@/utils/likesCookie";
import { getPayloadSecret } from "@/config/env";

const homeSecret = getPayloadSecret();

export async function getHomeArticles(): Promise<Article[]> {
  const [articles, cookieStore] = await Promise.all([getArticles(), cookies()]);
  const secret = homeSecret;

  return articles.map((article) => {
    const cookieValue = cookieStore.get(getLikeCookieName(article.id))?.value;
    const isLiked = hasValidLikedCookieValue(cookieValue, article.id, secret);

    return {
      ...article,
      isLiked,
    };
  });
}
