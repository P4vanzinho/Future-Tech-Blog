import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { StaticImageData } from "next/image";
import type { Article, ArticleHeading, ArticleMetadata } from "@/types/article";
import type { ArticleDetail } from "@/types/articleDetail";

export type HeadingLevel = "h2" | "h3" | "h4" | "h5" | "h6";

export interface ArticleHeroProps {
  image: string | StaticImageData;
  imageAlt: string;
  title: string;
}

export interface ArticleBodyProps {
  children: ReactNode;
}

export interface ArticlePageContentProps {
  article: ArticleDetail;
}

export interface ArticleSocialStatsProps extends ComponentPropsWithoutRef<"div"> {
  article: Article;
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
  article: Article;
  metadata: ArticleMetadata;
  headings: ArticleHeading[];
}

export interface ArticleSimilarNewsProps {
  articles: Article[];
}
