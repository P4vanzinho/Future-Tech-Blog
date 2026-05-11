import { z } from "zod";

const NumberWithZeroFallbackSchema = z.preprocess(
  (value) => (value === null ? 0 : value),
  z.number().int().nonnegative()
);

export const MediaSchema = z.object({
  url: z.string().nullable().optional(),
  alt: z.string().nullable().optional(),
});

export const AuthorSchema = z.object({
  name: z.string(),
  avatar: z.union([z.number(), z.null(), MediaSchema]).optional(),
});

export const CategorySchema = z.object({
  title: z.string(),
  slug: z.string(),
});

export const StatsSchema = z.object({
  likes: NumberWithZeroFallbackSchema,
  shares: NumberWithZeroFallbackSchema,
});

export const PayloadArticleSchema = z.object({
  id: z.union([z.number(), z.string()]).transform((value) => String(value)),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  createdAt: z.string(),
  isFeatured: z.preprocess((value) => value ?? false, z.boolean()),
  coverImage: z.union([z.number(), MediaSchema]),
  author: z.union([z.number(), AuthorSchema]),
  category: z.union([z.number(), CategorySchema]),
  stats: z.preprocess((value) => value ?? { likes: 0, shares: 0 }, StatsSchema),
});

export type ParsedPayloadArticle = z.infer<typeof PayloadArticleSchema>;
