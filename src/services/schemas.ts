import { z } from "zod";

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
