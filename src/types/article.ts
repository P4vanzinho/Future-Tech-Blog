export interface ArticleHeading {
  id: string;
  title: string;
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
  likes: string;
  views: string;
  shares: string;
}

export interface ArticlePageContentProps {
  articleId: string;
}
