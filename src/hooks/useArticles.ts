"use client";

import { useCallback, useEffect, useState } from "react";
import type { Article } from "@/types/article";
import { mockArticles } from "@/data/mocks/articles";
import { getLatestArticle, getOtherArticles } from "@/utils/articles";

const SIMULATED_LOADING_DELAY = 1000;

function toggleArticleLike(articles: Article[], articleId: string): Article[] {
  return articles.map((item) =>
    item.id === articleId
      ? {
          ...item,
          isLiked: !item.isLiked,
          likes: item.likes + (item.isLiked ? -1 : 1),
        }
      : item
  );
}

export function useArticles() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Article[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([...mockArticles]);
      setIsLoading(false);
    }, SIMULATED_LOADING_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const toggleLike = useCallback((articleId: string) => {
    setData((prev) => (prev ? toggleArticleLike(prev, articleId) : null));
  }, []);

  return { data, isLoading, error: null, toggleLike };
}

export function useFeaturedArticle() {
  const { data: articles, isLoading, toggleLike } = useArticles();
  const latest = getLatestArticle(articles || []) || null;
  return { data: latest, isLoading, error: null, toggleLike };
}

export function useRegularArticles() {
  const { data: articles, isLoading, toggleLike } = useArticles();
  const others = getOtherArticles(articles || []);
  return { data: others, isLoading, error: null, toggleLike };
}
