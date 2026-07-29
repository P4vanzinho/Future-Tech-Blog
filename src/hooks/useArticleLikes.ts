"use client";

import { useCallback, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import {
  toggleArticleLikeAtom,
  articleLikeStatesAtom,
} from "@/atoms/articleLikes";
import type { Article } from "@/types/article";
import {
  articleEngagementQueryKey,
  articleEngagementQueryOptions,
} from "@/services/articleEngagement";

export function useArticleLikes(articles: Article[]) {
  const likeStates = useAtomValue(articleLikeStatesAtom);
  const persistToggleArticleLike = useSetAtom(toggleArticleLikeAtom);
  const queryClient = useQueryClient();

  const engagementQueries = useQueries({
    queries: articles.map(({ id }) => articleEngagementQueryOptions(id)),
  });

  const toggleArticleLike = useCallback(
    async (article: Article) => {
      await persistToggleArticleLike(article);
      await queryClient.invalidateQueries({
        queryKey: articleEngagementQueryKey(article.id),
      });
    },
    [persistToggleArticleLike, queryClient]
  );

  const syncedArticles = useMemo(
    () =>
      articles.map((article, index) => {
        const engagement = engagementQueries[index]?.data;

        return {
          ...article,
          ...(engagement
            ? {
                likes: engagement.likes,
                isLiked: engagement.likedByOrigin,
              }
            : {}),
          ...likeStates[article.id],
        };
      }),
    [articles, engagementQueries, likeStates]
  );

  return { articles: syncedArticles, toggleArticleLike };
}
