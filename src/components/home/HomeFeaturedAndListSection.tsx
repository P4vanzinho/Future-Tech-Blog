import { Separator } from "@/components/common/Separator";
import { LastFeaturedArticleSection } from "@/components/home/FeaturedArticleSection";
import { FeaturedArticlesListSection } from "@/components/home/ArticlesList";
import { getArticles } from "@/services/articles";
import { getLatestArticle, getOtherArticles } from "@/utils/articles";

export async function HomeFeaturedAndListSection() {
  const articles = await getArticles();
  const featuredArticle = getLatestArticle(articles) ?? null;
  const regularArticles = getOtherArticles(articles);

  return (
    <>
      <LastFeaturedArticleSection article={featuredArticle} />
      <Separator />
      <FeaturedArticlesListSection articles={regularArticles} />
    </>
  );
}
