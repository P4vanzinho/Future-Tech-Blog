import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Media } from "./src/collections/Media";
import { Authors } from "./src/collections/Authors";
import { Categories } from "./src/collections/Categories";
import { Articles } from "./src/collections/Articles";
import { getPayloadSecret, getR2StorageConfig } from "./src/config/env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const adminAutoLoginEmail = process.env.PAYLOAD_ADMIN_AUTO_LOGIN_EMAIL;
const adminAutoLoginPassword = process.env.PAYLOAD_ADMIN_AUTO_LOGIN_PASSWORD;
const r2StorageConfig = getR2StorageConfig();

const r2StoragePlugin = r2StorageConfig
  ? s3Storage({
      bucket: r2StorageConfig.bucket,
      clientUploads: true,
      collections: {
        media: {
          prefix: "media",
          signedDownloads: true,
        },
      },
      config: {
        credentials: r2StorageConfig.credentials,
        endpoint: r2StorageConfig.endpoint,
        forcePathStyle: true,
        region: r2StorageConfig.region,
      },
    })
  : null;

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
  secret: getPayloadSecret(),
  plugins: r2StoragePlugin ? [r2StoragePlugin] : [],
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
