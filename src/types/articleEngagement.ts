import type { Article } from "@/types/article";

export const SHARE_PROVIDERS = ["x", "linkedin", "native", "copy"] as const;

export type ShareProvider = (typeof SHARE_PROVIDERS)[number];

export interface ArticleEngagementState {
  views: number;
  shares: number;
  sharedProviders: ShareProvider[];
}

export interface ArticleEngagementResponse extends ArticleEngagementState {
  likes: number;
  likedByOrigin: boolean;
  viewedByOrigin: boolean;
}

export interface ArticleViewResponse {
  views: number;
  viewedByOrigin: boolean;
}

export interface ArticleShareResponse {
  shares: number;
  provider: ShareProvider;
  counted: boolean;
}

export interface ArticleEngagementInitializerProps {
  article: Article;
}
