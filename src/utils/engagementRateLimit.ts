import {
  ENGAGEMENT_RATE_LIMIT_MAX_REQUESTS,
  ENGAGEMENT_RATE_LIMIT_WINDOW_MS,
} from "@/constants/engagement";

const requestTimestamps = new Map<string, number[]>();

export function getRequestFingerprint(request: Request, scope: string) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown-ip";
  const userAgent = request.headers.get("user-agent") ?? "unknown-ua";
  return `${scope}:${ip}:${userAgent}`;
}

export function consumeEngagementRateLimit(fingerprint: string) {
  const now = Date.now();
  const entries = (requestTimestamps.get(fingerprint) ?? []).filter(
    (timestamp) => now - timestamp < ENGAGEMENT_RATE_LIMIT_WINDOW_MS
  );

  if (entries.length >= ENGAGEMENT_RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterMs = Math.max(
      0,
      ENGAGEMENT_RATE_LIMIT_WINDOW_MS - (now - (entries[0] ?? now))
    );
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  entries.push(now);
  requestTimestamps.set(fingerprint, entries);
  return { allowed: true, retryAfterSeconds: 0 };
}
