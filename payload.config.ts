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

const adminAutoLoginEmail = process.env.PAYLOAD_ADMIN_AUTO_LOGIN_EMAIL;
const adminAutoLoginPassword = process.env.PAYLOAD_ADMIN_AUTO_LOGIN_PASSWORD;

export default buildConfig({
  admin: {
    ...(adminAutoLoginEmail?.trim() && adminAutoLoginPassword
      ? {
          autoLogin: {
            email: adminAutoLoginEmail.trim(),
            password: adminAutoLoginPassword,
            prefillOnly: true,
          },
        }
      : {}),
  },
  collections: [Media, Authors, Categories, Articles],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "super-secret-key",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./payload.db",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    push: false,
  }),
  sharp,
});
