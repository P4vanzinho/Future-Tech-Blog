"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import {
  hydrateArticleEngagementAtom,
  recordArticleViewAtom,
  registerArticleEngagementAtom,
} from "@/atoms/articleEngagement";
import type { ArticleEngagementInitializerProps } from "@/types/articleEngagement";

export function ArticleEngagementInitializer({
  article,
}: ArticleEngagementInitializerProps) {
  const register = useSetAtom(registerArticleEngagementAtom);
  const hydrate = useSetAtom(hydrateArticleEngagementAtom);
  const recordView = useSetAtom(recordArticleViewAtom);

  useEffect(() => {
    register([article]);
    void hydrate(article.id)
      .catch((error: unknown) => {
        console.warn("Unable to hydrate article engagement.", error);
      })
      .finally(() =>
        recordView(article.id).catch((error: unknown) => {
          console.warn("Unable to register article view.", error);
        })
      );
  }, [article, hydrate, recordView, register]);

  return null;
}
