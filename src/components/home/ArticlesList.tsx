"use client";

import { useState } from "react";
import { useRef } from "react";
import type { Article } from "@/types/article";
import { Separator } from "@/components/common/Separator";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { persistArticleLike } from "@/services/articleLikes";
import { toast } from "sonner";

interface FeaturedArticlesListSectionProps {
  articles: Article[];
}

export function FeaturedArticlesListSection({
  articles: initialArticles,
}: FeaturedArticlesListSectionProps) {
  const [articles, setArticles] = useState(initialArticles);
  const pendingDeltaByIdRef = useRef<Map<string, number>>(new Map());
  const inFlightLikeIdsRef = useRef<Set<string>>(new Set());
  const confirmedArticleByIdRef = useRef<Map<string, Article>>(
    new Map(initialArticles.map((article) => [article.id, article]))
  );

  const flushPendingLikeDelta = async (articleId: string) => {
    if (inFlightLikeIdsRef.current.has(articleId)) {
      return;
    }

    inFlightLikeIdsRef.current.add(articleId);
    try {
      while (true) {
        const delta = pendingDeltaByIdRef.current.get(articleId) ?? 0;
        if (delta === 0) {
          break;
        }

        pendingDeltaByIdRef.current.set(articleId, 0);

        const result = await persistArticleLike({
          articleId,
          delta,
        });

        setArticles((previousArticles) =>
          previousArticles.map((article) => {
            if (article.id !== articleId) {
              return article;
            }

            const nextArticle = {
              ...article,
              likes: result.likes,
            };
            confirmedArticleByIdRef.current.set(articleId, nextArticle);
            return nextArticle;
          })
        );
      }
    } catch {
      pendingDeltaByIdRef.current.set(articleId, 0);
      const confirmedArticle = confirmedArticleByIdRef.current.get(articleId);
      if (confirmedArticle) {
        setArticles((previousArticles) =>
          previousArticles.map((article) =>
            article.id === articleId ? confirmedArticle : article
          )
        );
      }
      toast.error("Nao foi possivel atualizar o like.");
    } finally {
      inFlightLikeIdsRef.current.delete(articleId);
    }
  };

  const handleToggleLike = async (articleId: string) => {
    const currentArticle = articles.find((article) => article.id === articleId);
    if (!currentArticle) {
      return;
    }

    const delta = currentArticle.isLiked ? -1 : 1;
    const currentPendingDelta = pendingDeltaByIdRef.current.get(articleId) ?? 0;
    pendingDeltaByIdRef.current.set(articleId, currentPendingDelta + delta);

    setArticles((previousArticles) =>
      previousArticles.map((article) => {
        if (article.id !== articleId) {
          return article;
        }

        return {
          ...article,
          isLiked: !article.isLiked,
          likes: article.likes + delta,
        };
      })
    );

    await flushPendingLikeDelta(articleId);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
      {articles.map((article, index) => (
        <div key={article.id} className="min-w-0">
          <ArticleCard article={article} onLike={handleToggleLike} />
          {index < articles.length - 1 && <Separator className="lg:hidden" />}
        </div>
      ))}
    </section>
  );
}
