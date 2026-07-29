import { z } from "zod";
import { SHARE_PROVIDERS } from "@/types/articleEngagement";

export const PersistArticleLikeInputSchema = z.object({
  articleId: z.string().min(1),
  delta: z
    .number()
    .int()
    .refine((value) => value !== 0),
});

export const PersistArticleLikeResponseSchema = z.object({
  likes: z.number().int().nonnegative(),
  likedByOrigin: z.boolean(),
});

export const ArticleEngagementResponseSchema = z.object({
  likes: z.number().int().nonnegative(),
  views: z.number().int().nonnegative(),
  shares: z.number().int().nonnegative(),
  likedByOrigin: z.boolean(),
  viewedByOrigin: z.boolean(),
  sharedProviders: z.array(z.enum(SHARE_PROVIDERS)),
});

export const ArticleViewResponseSchema = z.object({
  views: z.number().int().nonnegative(),
  viewedByOrigin: z.boolean(),
});

export const ArticleShareResponseSchema = z.object({
  shares: z.number().int().nonnegative(),
  provider: z.enum(SHARE_PROVIDERS),
  counted: z.boolean(),
});
