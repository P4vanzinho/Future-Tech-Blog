"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  articleEngagementStatesAtom,
  recordArticleShareAtom,
  registerArticleEngagementAtom,
} from "@/atoms/articleEngagement";
import type { Article } from "@/types/article";

export function useArticleEngagement(article: Article) {
  const states = useAtomValue(articleEngagementStatesAtom);
  const register = useSetAtom(registerArticleEngagementAtom);
  const recordShare = useSetAtom(recordArticleShareAtom);

  useEffect(() => {
    register([article]);
  }, [article, register]);

  return {
    state: states[article.id] ?? {
      views: article.views,
      shares: article.shares,
      sharedProviders: [],
    },
    recordShare,
  };
}
