import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "Role",
      required: true,
      options: [
        { label: "Editor", value: "editor" },
        { label: "Staff writer", value: "staff_writer" },
        { label: "Contributor", value: "contributor" },
        { label: "Guest", value: "guest" },
      ],
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};
