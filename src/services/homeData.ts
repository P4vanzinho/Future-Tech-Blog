import type { Article } from "@/types/article";
import { getArticles } from "@/services/articles";

export async function getHomeArticles(): Promise<Article[]> {
  return getArticles();
}
