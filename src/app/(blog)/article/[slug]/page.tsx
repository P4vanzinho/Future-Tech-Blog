import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageContent } from "@/components/article/ArticlePageContent";
import {
  getArticleDetailBySlug,
  getPublishedArticleSlugs,
} from "@/services/articles";
import type { ArticleRouteProps } from "@/types/articleRoute";
import { getArticleUrl } from "@/utils/articles";
import { createArticleJsonLd } from "@/utils/articleMetadata";
import { getSiteUrl } from "@/config/env";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleDetailBySlug(slug);
  if (!article) return {};

  const url = getArticleUrl(article.slug, getSiteUrl());
  const image = typeof article.image === "string" ? article.image : undefined;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.publicationDate,
      authors: article.author ? [article.author] : undefined,
      images: image ? [{ url: image, alt: article.imageAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = await getArticleDetailBySlug(slug);
  if (!article) notFound();

  const url = getArticleUrl(article.slug, getSiteUrl());
  const jsonLd = createArticleJsonLd(article, url);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ArticlePageContent article={article} />
    </main>
  );
}
