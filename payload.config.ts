import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Media } from "./src/collections/Media";
import { Authors } from "./src/collections/Authors";
import { Categories } from "./src/collections/Categories";
import { Articles } from "./src/collections/Articles";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    autoLogin: {
      email: "dev@futuretech.com",
      password: "test",
      prefillOnly: true,
    },
  },
  collections: [Media, Authors, Categories, Articles],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: "file:./payload.db",
    },
  }),
  sharp,
});
