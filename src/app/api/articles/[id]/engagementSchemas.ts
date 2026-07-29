import { z } from "zod";
import { SHARE_PROVIDERS } from "@/types/articleEngagement";

export const ArticleMetricRouteParamsSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

export const ArticleShareBodySchema = z.object({
  provider: z.enum(SHARE_PROVIDERS),
});
