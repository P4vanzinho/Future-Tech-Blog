import type {
  PersistArticleLikeInput,
  PersistArticleLikeResponse,
} from "@/services/types";
import {
  PersistArticleLikeInputSchema,
  PersistArticleLikeResponseSchema,
} from "@/services/schemas";

export async function persistArticleLike({
  articleId,
  delta,
}: PersistArticleLikeInput): Promise<PersistArticleLikeResponse> {
  const parsedInput = PersistArticleLikeInputSchema.safeParse({
    articleId,
    delta,
  });
  if (!parsedInput.success) {
    throw new Error("Invalid likes payload.");
  }

  const response = await fetch(`/api/articles/${articleId}/likes`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ delta }),
  });

  if (!response.ok) {
    throw new Error("Failed to persist article like.");
  }

  const json = await response.json();
  return PersistArticleLikeResponseSchema.parse(json);
}
