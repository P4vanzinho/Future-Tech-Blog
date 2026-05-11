import { ArticlesPreviewByCategorySection } from "@/components/home/ArticlesPreviewByCategorySection";
import { getArticleCategoryFilterOptions } from "@/services/categories";
import { getHomeArticles } from "@/services/homeData";

export async function HomeCategoryPreviewSection() {
  const [articles, categoryFilterOptions] = await Promise.all([
    getHomeArticles(),
    getArticleCategoryFilterOptions(),
  ]);

  return (
    <ArticlesPreviewByCategorySection
      articles={articles}
      categoryFilterOptions={categoryFilterOptions}
    />
  );
}
