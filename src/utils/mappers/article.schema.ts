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
  id: z
    .union([z.number(), z.string()])
    .transform((value) => String(value))
    .optional(),
  title: z.string(),
  slug: z.string(),
});

export const StatsSchema = z.object({
  likes: NumberWithZeroFallbackSchema,
  views: NumberWithZeroFallbackSchema,
  shares: NumberWithZeroFallbackSchema,
});

export const PayloadArticleSchema = z.object({
  id: z.union([z.number(), z.string()]).transform((value) => String(value)),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  createdAt: z.string(),
  publishedAt: z.string().nullable().optional(),
  isFeatured: z.preprocess((value) => value ?? false, z.boolean()),
  coverImage: z.union([z.number(), MediaSchema]),
  author: z.union([z.number(), AuthorSchema]),
  category: z.union([z.number(), CategorySchema]),
  stats: z.preprocess(
    (value) => value ?? { likes: 0, views: 0, shares: 0 },
    StatsSchema
  ),
});

export type ParsedPayloadArticle = z.infer<typeof PayloadArticleSchema>;

const LexicalEditorStateSchema = z
  .object({
    root: z
      .object({
        type: z.string(),
        children: z.array(z.record(z.string(), z.unknown())),
      })
      .passthrough(),
  })
  .passthrough();

const RichTextBlockSchema = z.object({
  id: z.string().nullable().optional(),
  blockType: z.literal("richTextBlock"),
  content: LexicalEditorStateSchema,
});

const ImageBlockSchema = z.object({
  id: z.string().nullable().optional(),
  blockType: z.literal("imageBlock"),
  image: z.union([z.number(), MediaSchema]),
  caption: z.string().nullable().optional(),
});

export const PayloadArticleDetailSchema = PayloadArticleSchema.extend({
  body: z
    .array(
      z.discriminatedUnion("blockType", [RichTextBlockSchema, ImageBlockSchema])
    )
    .nullable()
    .optional(),
  relatedPosts: z
    .array(z.union([z.number(), PayloadArticleSchema]))
    .nullable()
    .optional(),
  tags: z
    .array(z.object({ name: z.string() }))
    .nullable()
    .optional(),
});
