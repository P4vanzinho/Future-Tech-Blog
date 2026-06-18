import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

export const revalidateHomeAfterChange: CollectionAfterChangeHook = ({
  doc,
  context,
}) => {
  if (context.skipRevalidation === true) return doc;

  revalidatePath("/");
  revalidatePath("/article/[slug]", "page");
  return doc;
};

export const revalidateHomeAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  context,
}) => {
  if (context.skipRevalidation === true) return doc;

  revalidatePath("/");
  revalidatePath("/article/[slug]", "page");
  return doc;
};
