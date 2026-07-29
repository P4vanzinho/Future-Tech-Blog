import type { Article } from "@/types/article";

export interface ArticleLexicalNode {
  type: string;
  text?: string;
  tag?: string;
  children?: ArticleLexicalNode[];
  [key: string]: unknown;
}

export interface ArticleLexicalState {
  root: ArticleLexicalNode & {
    children: ArticleLexicalNode[];
  };
}

export interface ArticleRichTextBlock {
  id: string;
  type: "richText";
  content: ArticleLexicalState;
}

export interface ArticleImageBlock {
  id: string;
  type: "image";
  image: string;
  imageAlt: string;
  caption?: string;
}

export type ArticleContentBlock = ArticleRichTextBlock | ArticleImageBlock;

export interface ArticleDetail extends Article {
  description: string;
  publicationDate: string;
  body: ArticleContentBlock[];
  relatedArticles: Article[];
  tags: string[];
}
