import type { Article } from "@/types/article";
import type {
  ArticleContentBlock,
  ArticleDetail,
  ArticleLexicalState,
} from "@/types/articleDetail";
import {
  AuthorSchema,
  CategorySchema,
  MediaSchema,
  PayloadArticleSchema,
  PayloadArticleDetailSchema,
} from "@/utils/mappers/article.schema";

export function mapPayloadArticle(rawEntry: unknown): Article {
  const data = PayloadArticleSchema.parse(rawEntry);
  const parsedCover = MediaSchema.safeParse(data.coverImage);
  const cover = parsedCover.success ? parsedCover.data : undefined;
  const parsedAuthor = AuthorSchema.safeParse(data.author);
  const author = parsedAuthor.success ? parsedAuthor.data : undefined;
  const parsedCategory = CategorySchema.safeParse(data.category);
  const category = parsedCategory.success ? parsedCategory.data : undefined;
  const parsedAvatar = MediaSchema.safeParse(author?.avatar);
  const avatar = parsedAvatar.success ? parsedAvatar.data : undefined;

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.excerpt,
    image: cover?.url ?? "",
    imageAlt: cover?.alt ?? "",
    category: category?.title ?? "",
    author: author?.name,
    authorImage: avatar?.url ?? undefined,
    likes: data.stats.likes,
    views: data.stats.views,
    shares: data.stats.shares,
    publicationDate: data.publishedAt ?? "",
    isLiked: false,
    isFeatured: data.isFeatured,
  };
}

export function mapPayloadArticleDetail(rawEntry: unknown): ArticleDetail {
  const data = PayloadArticleDetailSchema.parse(rawEntry);
  const summary = mapPayloadArticle(data);
  const relatedArticles = (data.relatedPosts ?? []).flatMap((entry) =>
    typeof entry === "number" ? [] : [mapPayloadArticle(entry)]
  );
  const body = (data.body ?? []).flatMap<ArticleContentBlock>(
    (block, index) => {
      const id = block.id ?? `article-block-${index + 1}`;

      if (block.blockType === "richTextBlock") {
        return [
          {
            id,
            type: "richText" as const,
            content: block.content as unknown as ArticleLexicalState,
          },
        ];
      }

      const parsedImage = MediaSchema.safeParse(block.image);
      if (!parsedImage.success || !parsedImage.data.url) {
        return [];
      }

      return [
        {
          id,
          type: "image" as const,
          image: parsedImage.data.url,
          imageAlt: parsedImage.data.alt ?? "",
          caption: block.caption ?? undefined,
        },
      ];
    }
  );

  return {
    ...summary,
    description: data.excerpt,
    publicationDate: data.publishedAt ?? "",
    body,
    relatedArticles,
    tags: (data.tags ?? []).map(({ name }) => name),
  };
}
