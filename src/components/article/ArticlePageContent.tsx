import { Separator } from "@/components/common/Separator";
import { ArticleHero } from "./ArticleHero";
import { ArticleSocialStats } from "./ArticleSocialStats";
import { ArticleBody } from "./ArticleBody";
import { ArticleSidebar } from "./ArticleSidebar";
import { ArticleSimilarNews } from "./ArticleSimilarNews";
import { ArticleRichContent } from "./ArticleRichContent";
import { ArticleEngagementInitializer } from "./ArticleEngagementInitializer";
import type { ArticlePageContentProps } from "./types";
import {
  addHeadingIdsToBlocks,
  calculateReadingTimeMinutes,
  extractArticleHeadings,
} from "@/utils/articleContent";

const publicationDateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function ArticlePageContent({ article }: ArticlePageContentProps) {
  const headings = extractArticleHeadings(article.body);
  const blocks = addHeadingIdsToBlocks(article.body);
  const metadata = {
    publicationDate: publicationDateFormatter.format(
      new Date(article.publicationDate)
    ),
    category: article.category,
    readingTime: `${calculateReadingTimeMinutes(article.body)} Min`,
    authorName: article.author ?? "Future Tech Editorial",
  };

  return (
    <article className="flex w-full flex-col">
      <ArticleEngagementInitializer article={article} />
      <ArticleHero
        image={article.image}
        imageAlt={article.imageAlt}
        title={article.title}
      />

      <div className="flex w-full flex-col">
        <Separator className="lg:hidden" />
        <ArticleSocialStats
          article={article}
          className="flex justify-center gap-[0.875rem] px-[3.375rem] py-5 md:px-6 lg:hidden"
          aria-label="Article social stats"
        />
        <Separator className="lg:hidden" />

        <section className="border-dark-15 grid overflow-x-clip border-t pt-10 pr-6 pb-10 pl-6 md:px-10 lg:grid-cols-[minmax(0,2.2636fr)_minmax(0,1fr)] lg:border-b lg:pt-0 lg:pr-0 lg:pb-20 lg:pl-20">
          <ArticleBody>
            <ArticleRichContent blocks={blocks} />
          </ArticleBody>
          <ArticleSidebar
            article={article}
            metadata={metadata}
            headings={headings}
          />
        </section>

        <Separator />
        <ArticleSimilarNews articles={article.relatedArticles} />
      </div>
    </article>
  );
}
