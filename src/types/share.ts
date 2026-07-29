import type { Article } from "@/types/article";

export interface ShareLinks {
  x: string;
  twitter: string;
  linkedIn: string;
}

export interface SharePopoverProps {
  article: Article;
}
