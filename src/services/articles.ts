import { getPayload } from "payload";
import config from "@payload-config";
import {
  mapPayloadArticle,
  mapPayloadArticleDetail,
} from "@/utils/mappers/article";
import type { Article } from "@/types/article";
import type { ArticleDetail } from "@/types/articleDetail";
import { selectRelatedArticles } from "@/utils/relatedArticles";
import { isValidArticleSlug, normalizeArticleSlug } from "@/utils/articleSlug";

const defaultArticlesLimit = 30;

const publishedWhere = {
  _status: {
    equals: "published" as const,
  },
};

export async function getArticles(
  limit = defaultArticlesLimit
): Promise<Article[]> {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    where: publishedWhere,
    sort: "-createdAt",
    depth: 2,
    limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      createdAt: true,
      publishedAt: true,
      isFeatured: true,
      stats: {
        likes: true,
        views: true,
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
  const normalizedSlug = normalizeArticleSlug(slug);

  if (!isValidArticleSlug(normalizedSlug)) {
    return null;
  }

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "articles",
    where: {
      ...publishedWhere,
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
      publishedAt: true,
      isFeatured: true,
      stats: {
        likes: true,
        views: true,
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

export async function getPublishedArticleSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "articles",
    where: publishedWhere,
    depth: 0,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  });

  return result.docs
    .map(({ slug }) => normalizeArticleSlug(slug))
    .filter(isValidArticleSlug);
}

export async function getArticleDetailBySlug(
  slug: string
): Promise<ArticleDetail | null> {
  const normalizedSlug = normalizeArticleSlug(slug);
  if (!isValidArticleSlug(normalizedSlug)) {
    return null;
  }

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "articles",
    where: {
      ...publishedWhere,
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
      publishedAt: true,
      isFeatured: true,
      stats: {
        likes: true,
        views: true,
        shares: true,
      },
      category: true,
      coverImage: true,
      author: true,
      body: true,
      relatedPosts: true,
      tags: true,
    },
  });
  const document = result.docs[0];
  if (!document) {
    return null;
  }

  const detail = mapPayloadArticleDetail(document);
  const categoryId =
    typeof document.category === "number"
      ? document.category
      : document.category.id;
  const fallbackResult = await payload.find({
    collection: "articles",
    where: {
      and: [
        publishedWhere,
        { category: { equals: categoryId } },
        { id: { not_equals: document.id } },
      ],
    },
    sort: "-publishedAt",
    depth: 2,
    limit: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      createdAt: true,
      publishedAt: true,
      isFeatured: true,
      stats: {
        likes: true,
        views: true,
        shares: true,
      },
      category: true,
      coverImage: true,
      author: true,
    },
  });

  return {
    ...detail,
    relatedArticles: selectRelatedArticles(
      detail.id,
      detail.relatedArticles,
      fallbackResult.docs.map(mapPayloadArticle)
    ),
  };
}
