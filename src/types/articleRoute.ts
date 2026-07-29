export interface ArticleRouteProps {
  params: Promise<{
    slug: string;
  }>;
}
