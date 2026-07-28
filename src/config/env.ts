import { z } from "zod";

const EnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),
    PAYLOAD_SECRET: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    MEDIA_STORAGE: z.enum(["local", "r2"]).default("local"),
    R2_BUCKET: z.string().min(1).optional(),
    R2_REGION: z.string().min(1).default("auto"),
    R2_ENDPOINT: z.url().optional(),
    R2_ACCESS_KEY_ID: z.string().min(1).optional(),
    R2_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "production" && !env.PAYLOAD_SECRET?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["PAYLOAD_SECRET"],
        message: "PAYLOAD_SECRET is required in production",
      });
    }

    if (env.NODE_ENV === "production" && env.MEDIA_STORAGE !== "r2") {
      ctx.addIssue({
        code: "custom",
        path: ["MEDIA_STORAGE"],
        message: "MEDIA_STORAGE=r2 is required in production",
      });
    }

    if (env.MEDIA_STORAGE !== "r2") {
      return;
    }

    const missingR2Settings = [
      ["R2_BUCKET", env.R2_BUCKET],
      ["R2_ENDPOINT", env.R2_ENDPOINT],
      ["R2_ACCESS_KEY_ID", env.R2_ACCESS_KEY_ID],
      ["R2_SECRET_ACCESS_KEY", env.R2_SECRET_ACCESS_KEY],
    ].filter(([, value]) => !value);

    if (missingR2Settings.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["MEDIA_STORAGE"],
        message:
          "MEDIA_STORAGE=r2 requires R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY",
      });
    }
  });

type R2StorageConfig = {
  bucket: string;
  endpoint: string;
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

export function getValidatedEnv() {
  return EnvSchema.parse(process.env);
}

export function getPayloadSecret(): string {
  const env = getValidatedEnv();

  if (env.PAYLOAD_SECRET?.trim()) {
    return env.PAYLOAD_SECRET;
  }

  if (env.NODE_ENV === "production") {
    throw new Error("PAYLOAD_SECRET is required in production");
  }

  return "super-secret-key";
}

export function getR2StorageConfig(): R2StorageConfig | null {
  const env = getValidatedEnv();

  if (env.MEDIA_STORAGE !== "r2") {
    return null;
  }

  if (
    !env.R2_BUCKET ||
    !env.R2_ENDPOINT ||
    !env.R2_ACCESS_KEY_ID ||
    !env.R2_SECRET_ACCESS_KEY
  ) {
    throw new Error(
      "MEDIA_STORAGE=r2 requires R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY"
    );
  }

  return {
    bucket: env.R2_BUCKET,
    endpoint: env.R2_ENDPOINT,
    region: env.R2_REGION,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  };
}

export function isProductionEnv(): boolean {
  return getValidatedEnv().NODE_ENV === "production";
}

export function getSiteUrl(): string {
  return getValidatedEnv().NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
