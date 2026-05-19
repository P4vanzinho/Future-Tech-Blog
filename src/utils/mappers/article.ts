import type { Article } from "@/types/article";
import {
  AuthorSchema,
  CategorySchema,
  MediaSchema,
  PayloadArticleSchema,
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
    shares: data.stats.shares,
    publicationDate: data.createdAt,
    isLiked: false,
    isFeatured: data.isFeatured,
  };
}
