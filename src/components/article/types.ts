import type { ComponentPropsWithoutRef } from "react";
import type { StaticImageData } from "next/image";
import type {
  Article,
  ArticleHeading,
  ArticleMetadata,
  ArticleSection,
  ArticleSocialStats,
} from "@/types/article";

export type HeadingLevel = "h2" | "h3" | "h4" | "h5" | "h6";

export interface ArticleHeroProps {
  image: string | StaticImageData;
  imageAlt: string;
  title: string;
}

export interface ArticleBodyProps {
  sections: ArticleSection[];
  isExpanded: boolean;
  onExpand: () => void;
}

export interface ArticleSocialStatsProps extends ComponentPropsWithoutRef<"div"> {
  stats: ArticleSocialStats;
}

export interface ArticleMetadataProps {
  metadata: ArticleMetadata;
  className?: string;
  valueHeadingLevel?: HeadingLevel;
}

export interface MetadataFieldProps {
  label: string;
  value: string;
  valueHeadingLevel: HeadingLevel;
}

export interface ArticleTableOfContentsProps {
  headings: ArticleHeading[];
}

export interface ArticleSidebarProps {
  stats: ArticleSocialStats;
  metadata: ArticleMetadata;
  headings: ArticleHeading[];
}

export interface ArticleSimilarNewsProps {
  articles: Article[];
}
