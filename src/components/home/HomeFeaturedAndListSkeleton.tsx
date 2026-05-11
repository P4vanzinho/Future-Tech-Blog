import { Separator } from "@/components/common/Separator";
import { FeaturedArticleSkeleton } from "@/components/blog/FeaturedArticleSkeleton";
import { ArticleCardSkeleton } from "@/components/blog/ArticleCardSkeleton";

export function HomeFeaturedAndListSkeleton() {
  return (
    <>
      <FeaturedArticleSkeleton />
      <Separator />
      <section className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <ArticleCardSkeleton />
        <Separator className="lg:hidden" />
        <ArticleCardSkeleton />
        <Separator className="lg:hidden" />
        <ArticleCardSkeleton />
      </section>
    </>
  );
}
