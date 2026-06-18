import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  PAYLOAD_SECRET: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

export function getValidatedEnv() {
  return EnvSchema.parse(process.env);
}

export function getPayloadSecret(): string {
  return getValidatedEnv().PAYLOAD_SECRET ?? "super-secret-key";
}

export function isProductionEnv(): boolean {
  return getValidatedEnv().NODE_ENV === "production";
}

export function getSiteUrl(): string {
  return getValidatedEnv().NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
