import {
  ArticleEngagementResponseSchema,
  ArticleShareResponseSchema,
  ArticleViewResponseSchema,
} from "@/services/schemas";
import type {
  ArticleEngagementServiceResponse,
  ArticleShareServiceResponse,
  ArticleViewServiceResponse,
} from "@/services/types";
import type { ShareProvider } from "@/types/articleEngagement";

export async function getArticleEngagement(
  articleId: string
): Promise<ArticleEngagementServiceResponse> {
  const response = await fetch(`/api/articles/${articleId}/engagement`);
  if (!response.ok) throw new Error("Failed to load article engagement.");
  return ArticleEngagementResponseSchema.parse(await response.json());
}

export async function registerArticleView(
  articleId: string
): Promise<ArticleViewServiceResponse> {
  const response = await fetch(`/api/articles/${articleId}/views`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to register article view.");
  return ArticleViewResponseSchema.parse(await response.json());
}

export async function registerArticleShare(
  articleId: string,
  provider: ShareProvider
): Promise<ArticleShareServiceResponse> {
  const response = await fetch(`/api/articles/${articleId}/shares`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider }),
  });
  if (!response.ok) throw new Error("Failed to register article share.");
  return ArticleShareResponseSchema.parse(await response.json());
}
