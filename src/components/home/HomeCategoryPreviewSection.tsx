import { ArticlesPreviewByCategorySection } from "@/components/home/ArticlesPreviewByCategorySection";
import { getArticles } from "@/services/articles";
import { getArticleCategoryFilterOptions } from "@/services/categories";

export async function HomeCategoryPreviewSection() {
  const [articles, categoryFilterOptions] = await Promise.all([
    getArticles(),
    getArticleCategoryFilterOptions(),
  ]);

  return (
    <ArticlesPreviewByCategorySection
      articles={articles}
      categoryFilterOptions={categoryFilterOptions}
    />
  );
}
