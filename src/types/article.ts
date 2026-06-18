import type { StaticImageData } from "next/image";

export interface ArticleHeading {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
}

export interface ArticleMetadata {
  publicationDate: string;
  category: string;
  readingTime: string;
  authorName: string;
}

export interface ArticleSocialStats {
  likes: number;
  views: number;
  shares: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image: string | StaticImageData;
  imageAlt: string;
  category: string;
  publicationDate?: string;
  author?: string;
  authorImage?: string | StaticImageData;
  likes: number;
  views: number;
  comments?: number;
  shares: number;
  isLiked?: boolean;
  isFeatured?: boolean;
}
