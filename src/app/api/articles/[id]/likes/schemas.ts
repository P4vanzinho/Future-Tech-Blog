import { z } from "zod";

export const LikeRouteParamsSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

export const LikeDeltaBodySchema = z.object({
  delta: z.union([z.literal(1), z.literal(-1)]),
});

export const PayloadArticleLikesSchema = z.object({
  _status: z.enum(["draft", "published"]).optional(),
  stats: z
    .object({
      likes: z.number().int().nonnegative().optional(),
    })
    .optional(),
});
