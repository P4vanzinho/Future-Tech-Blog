import type { z } from "zod";
import {
  PersistArticleLikeInputSchema,
  PersistArticleLikeResponseSchema,
  ArticleEngagementResponseSchema,
  ArticleShareResponseSchema,
  ArticleViewResponseSchema,
} from "@/services/schemas";

export interface ArticleCategoryFilterOption {
  id: string;
  label: string;
}

export type PersistArticleLikeInput = z.infer<
  typeof PersistArticleLikeInputSchema
>;
export type PersistArticleLikeResponse = z.infer<
  typeof PersistArticleLikeResponseSchema
>;
export type ArticleEngagementServiceResponse = z.infer<
  typeof ArticleEngagementResponseSchema
>;
export type ArticleViewServiceResponse = z.infer<
  typeof ArticleViewResponseSchema
>;
export type ArticleShareServiceResponse = z.infer<
  typeof ArticleShareResponseSchema
>;
