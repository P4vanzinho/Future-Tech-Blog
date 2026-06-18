"use client";

import type { Article } from "@/types/article";
import { Separator } from "@/components/common/Separator";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { toast } from "sonner";
import { useArticleLikes } from "@/hooks/useArticleLikes";

interface FeaturedArticlesListSectionProps {
  articles: Article[];
}

export function FeaturedArticlesListSection({
  articles: initialArticles,
}: FeaturedArticlesListSectionProps) {
  const { articles, toggleArticleLike } = useArticleLikes(initialArticles);

  const handleToggleLike = async (articleId: string) => {
    const article = articles.find((item) => item.id === articleId);
    if (!article) return;

    try {
      await toggleArticleLike(article);
    } catch {
      toast.error("Nao foi possivel atualizar o like.");
    }
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
