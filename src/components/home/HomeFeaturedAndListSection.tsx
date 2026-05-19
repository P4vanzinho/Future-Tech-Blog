import { Separator } from "@/components/common/Separator";
import { LastFeaturedArticleSection } from "@/components/home/FeaturedArticleSection";
import { FeaturedArticlesListSection } from "@/components/home/ArticlesList";
import { getLatestArticle, getOtherArticles } from "@/utils/articles";
import { getHomeArticles } from "@/services/homeData";

export async function HomeFeaturedAndListSection() {
  const articles = await getHomeArticles();
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
