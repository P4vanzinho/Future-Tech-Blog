import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";

const MetricsDocumentSchema = z.object({
  _status: z.enum(["draft", "published"]).optional(),
  stats: z
    .object({
      likes: z.number().int().nonnegative().nullish(),
      views: z.number().int().nonnegative().nullish(),
      shares: z.number().int().nonnegative().nullish(),
    })
    .nullish(),
});

export interface ArticleMetrics {
  likes: number;
  views: number;
  shares: number;
}

function normalizeMetrics(document: z.infer<typeof MetricsDocumentSchema>) {
  return {
    likes: document.stats?.likes ?? 0,
    views: document.stats?.views ?? 0,
    shares: document.stats?.shares ?? 0,
  };
}

export async function readPublishedArticleMetrics(
  articleId: number
): Promise<ArticleMetrics | null> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "articles",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      and: [
        {
          id: {
            equals: articleId,
          },
        },
        {
          _status: {
            equals: "published",
          },
        },
      ],
    },
    select: {
      _status: true,
      stats: true,
    },
  });

  const document = result.docs[0];
  if (!document) return null;

  return normalizeMetrics(MetricsDocumentSchema.parse(document));
}

export async function incrementPublishedArticleMetric(
  articleId: number,
  metric: "views" | "shares"
): Promise<ArticleMetrics | null> {
  const current = await readPublishedArticleMetrics(articleId);
  if (!current) return null;

  const payload = await getPayload({ config });
  const updated = MetricsDocumentSchema.parse(
    await payload.update({
      collection: "articles",
      id: articleId,
      data: {
        stats: {
          ...current,
          [metric]: current[metric] + 1,
        },
      },
      depth: 0,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
      select: {
        _status: true,
        stats: true,
      },
    })
  );

  return normalizeMetrics(updated);
}
