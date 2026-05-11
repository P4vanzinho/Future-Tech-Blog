import type { CollectionConfig } from "payload";
import {
  revalidateHomeAfterChange,
  revalidateHomeAfterDelete,
} from "@/hooks/revalidateHome";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateHomeAfterChange],
    afterDelete: [revalidateHomeAfterDelete],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Cover info",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "slug",
              type: "text",
              unique: true,
              required: true,
            },
            {
              name: "isFeatured",
              type: "checkbox",
              label: "Featured (Top Headlines)",
              defaultValue: false,
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "authors",
              required: true,
            },
            {
              name: "category",
              type: "relationship",
              relationTo: "categories",
              required: true,
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "excerpt",
              type: "textarea",
              label: "Card summary",
              required: true,
            },
          ],
        },
        {
          label: "Dynamic content",
          fields: [
            {
              name: "body",
              type: "blocks",
              blocks: [
                {
                  slug: "richTextBlock",
                  fields: [
                    {
                      name: "content",
                      type: "richText",
                      required: true,
                    },
                  ],
                },
                {
                  slug: "imageBlock",
                  fields: [
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                    {
                      name: "caption",
                      type: "text",
                      label: "Caption",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Metrics & related",
          fields: [
            {
              name: "relatedPosts",
              type: "relationship",
              relationTo: "articles",
              hasMany: true,
            },
            {
              name: "tags",
              type: "array",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "stats",
              type: "group",
              fields: [
                {
                  name: "likes",
                  type: "number",
                  defaultValue: 0,
                },
                {
                  name: "views",
                  type: "number",
                  defaultValue: 0,
                },
                {
                  name: "shares",
                  type: "number",
                  defaultValue: 0,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
