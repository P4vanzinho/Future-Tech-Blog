import type { z } from "zod";
import {
  PersistArticleLikeInputSchema,
  PersistArticleLikeResponseSchema,
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
