import type { Article } from "@/types/article";

export const RELATED_ARTICLES_LIMIT = 3;

export function selectRelatedArticles(
  currentArticleId: string,
  explicitArticles: Article[],
  fallbackArticles: Article[],
  limit = RELATED_ARTICLES_LIMIT
): Article[] {
  const seenIds = new Set([currentArticleId]);
  const selected: Article[] = [];

  for (const article of [...explicitArticles, ...fallbackArticles]) {
    if (seenIds.has(article.id)) {
      continue;
    }

    seenIds.add(article.id);
    selected.push(article);

    if (selected.length === limit) {
      break;
    }
  }

  return selected;
}
