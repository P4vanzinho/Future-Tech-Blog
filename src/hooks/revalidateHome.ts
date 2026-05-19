import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

export const revalidateHomeAfterChange: CollectionAfterChangeHook = ({
  doc,
}) => {
  revalidatePath("/");
  return doc;
};

export const revalidateHomeAfterDelete: CollectionAfterDeleteHook = ({
  doc,
}) => {
  revalidatePath("/");
  return doc;
};
