import type { CollectionConfig } from "payload";
import {
  revalidateHomeAfterChange,
  revalidateHomeAfterDelete,
} from "@/hooks/revalidateHome";

export const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateHomeAfterChange],
    afterDelete: [revalidateHomeAfterDelete],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
