import { ArticleSocialStats } from "./ArticleSocialStats";
import { ArticleMetadata } from "./ArticleMetadata";
import { ArticleTableOfContents } from "./ArticleTableOfContents";
import type {
  ArticleHeading,
  ArticleMetadata as ArticleMetadataType,
  ArticleSocialStats as ArticleSocialStatsType,
} from "@/types/article";

interface ArticleSidebarProps {
  stats: ArticleSocialStatsType;
  metadata: ArticleMetadataType;
  headings: ArticleHeading[];
}

export function ArticleSidebar({
  stats,
  metadata,
  headings,
}: ArticleSidebarProps) {
  return (
    <aside
      className="lg:border-dark-15 order-1 mb-8 min-w-0 lg:order-2 lg:-mb-20 lg:border-l lg:pb-20"
      aria-label="Article sidebar"
    >
      <div className="flex min-w-0 flex-col gap-[1.875rem] lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:gap-0 lg:overflow-y-auto lg:pr-0 lg:pl-0">
        <ArticleSocialStats
          stats={stats}
          className="border-dark-15 hidden gap-[0.875rem] lg:flex lg:flex-wrap lg:border-b lg:px-10 lg:py-[50px] 2xl:px-20"
        />
        <ArticleMetadata
          metadata={metadata}
          className="lg:px-10 lg:pt-20 2xl:px-20"
        />
        <ArticleTableOfContents headings={headings} />
      </div>
    </aside>
  );
}
