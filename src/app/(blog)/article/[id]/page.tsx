import { ArticlePageContent } from "@/components/article/ArticlePageContent";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  return <ArticlePageContent articleId={id} />;
}
