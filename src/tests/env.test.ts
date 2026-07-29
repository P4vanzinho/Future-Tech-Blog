import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getPayloadSecret,
  getR2StorageConfig,
  getValidatedEnv,
} from "../config/env";

describe("environment configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses local storage by default", () => {
    vi.stubEnv("MEDIA_STORAGE", "local");

    expect(getValidatedEnv().MEDIA_STORAGE).toBe("local");
    expect(getR2StorageConfig()).toBeNull();
  });

  it("requires every R2 setting when R2 storage is enabled", () => {
    vi.stubEnv("MEDIA_STORAGE", "r2");
    vi.stubEnv("R2_BUCKET", "");
    vi.stubEnv("R2_ENDPOINT", "");
    vi.stubEnv("R2_ACCESS_KEY_ID", "");
    vi.stubEnv("R2_SECRET_ACCESS_KEY", "");

    expect(() => getValidatedEnv()).toThrow(
      "MEDIA_STORAGE=r2 requires R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY"
    );
  });

  it("returns the R2 adapter configuration", () => {
    vi.stubEnv("MEDIA_STORAGE", "r2");
    vi.stubEnv("R2_BUCKET", "future-tech-blog-media-dev");
    vi.stubEnv("R2_ENDPOINT", "https://account-id.r2.cloudflarestorage.com");
    vi.stubEnv("R2_ACCESS_KEY_ID", "access-key");
    vi.stubEnv("R2_SECRET_ACCESS_KEY", "secret-key");

    expect(getR2StorageConfig()).toEqual({
      bucket: "future-tech-blog-media-dev",
      endpoint: "https://account-id.r2.cloudflarestorage.com",
      region: "auto",
      credentials: {
        accessKeyId: "access-key",
        secretAccessKey: "secret-key",
      },
    });
  });

  it("does not allow the development Payload secret fallback in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("PAYLOAD_SECRET", "");

    expect(() => getPayloadSecret()).toThrow(
      "PAYLOAD_SECRET is required in production"
    );
  });

  it("allows local storage in production while R2 is opt-in", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("PAYLOAD_SECRET", "production-secret");
    vi.stubEnv("MEDIA_STORAGE", "local");

    expect(getValidatedEnv().MEDIA_STORAGE).toBe("local");
    expect(getR2StorageConfig()).toBeNull();
  });
});
