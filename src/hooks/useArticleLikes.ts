"use client";

import { useEffect, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  articleLikeStatesAtom,
  registerArticleLikesAtom,
  toggleArticleLikeAtom,
} from "@/atoms/articleLikes";
import type { Article } from "@/types/article";
import { hydrateArticlesLikedState } from "@/utils/likesCookieClient";

export function useArticleLikes(articles: Article[]) {
  const likeStates = useAtomValue(articleLikeStatesAtom);
  const registerArticleLikes = useSetAtom(registerArticleLikesAtom);
  const toggleArticleLike = useSetAtom(toggleArticleLikeAtom);

  useEffect(() => {
    registerArticleLikes(hydrateArticlesLikedState(articles));
  }, [articles, registerArticleLikes]);

  const syncedArticles = useMemo(
    () =>
      articles.map((article) => ({
        ...article,
        ...likeStates[article.id],
      })),
    [articles, likeStates]
  );

  return { articles: syncedArticles, toggleArticleLike };
}
