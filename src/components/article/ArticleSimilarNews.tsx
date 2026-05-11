import { ArticleCard } from "@/components/blog/ArticleCard";
import { LinkButton } from "@/components/blog/LinkButton";
import { Separator } from "@/components/common/Separator";
import type { ArticleSimilarNewsProps } from "./types";

export function ArticleSimilarNews({ articles }: ArticleSimilarNewsProps) {
  return (
    <section className="px-6 pt-10 pb-10 md:px-10 lg:px-20 lg:pt-20 lg:pb-5 2xl:px-40">
      <div className="mb-[1.875rem] flex items-center justify-between gap-4 lg:mb-0">
        <h2 className="text-[1.75rem] leading-[130%] tracking-[-0.03em] text-white">
          Similar News
        </h2>
        <LinkButton
          href="/news"
          text="View All News"
          variant="regular"
          className="max-w-[10rem]"
        />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
        {articles.map((article, index) => (
          <div key={article.id}>
            <ArticleCard article={article} />
            {index < articles.length - 1 && <Separator className="lg:hidden" />}
          </div>
        ))}
      </div>
    </section>
  );
}
