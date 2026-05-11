import { getPayload } from "payload";
import config from "@payload-config";
import { mapPayloadArticle } from "@/utils/mappers/article";
import type { Article } from "@/types/article";

const defaultArticlesLimit = 30;

export async function getArticles(
  limit = defaultArticlesLimit
): Promise<Article[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    sort: "-createdAt",
    depth: 2,
    limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      createdAt: true,
      isFeatured: true,
      stats: {
        likes: true,
        shares: true,
      },
      category: true,
      coverImage: true,
      author: true,
    },
  });

  return result.docs.map(mapPayloadArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    where: {
      slug: {
        equals: normalizedSlug,
      },
    },
    depth: 2,
    limit: 1,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      createdAt: true,
      isFeatured: true,
      stats: {
        likes: true,
        shares: true,
      },
      category: true,
      coverImage: true,
      author: true,
    },
  });

  const article = result.docs[0];

  return article ? mapPayloadArticle(article) : null;
}
