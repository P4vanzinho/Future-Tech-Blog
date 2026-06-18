import { createHmac } from "node:crypto";
import type { ShareProvider } from "@/types/articleEngagement";

type EngagementKind = "view" | `share:${ShareProvider}`;

function createSignature(
  articleId: string | number,
  kind: EngagementKind,
  secret: string
) {
  return createHmac("sha256", secret)
    .update(`${articleId}:${kind}:recorded`)
    .digest("hex");
}

function getCookieName(articleId: string | number, kind: EngagementKind) {
  const normalizedKind = kind.replace(":", "_");
  return `article_${normalizedKind}_${articleId}`;
}

export function getViewCookieName(articleId: string | number) {
  return getCookieName(articleId, "view");
}

export function getShareCookieName(
  articleId: string | number,
  provider: ShareProvider
) {
  return getCookieName(articleId, `share:${provider}`);
}

export function createSignedEngagementCookieValue(
  articleId: string | number,
  kind: EngagementKind,
  secret: string
) {
  return `recorded.${createSignature(articleId, kind, secret)}`;
}

export function hasValidEngagementCookieValue(
  value: string | undefined,
  articleId: string | number,
  kind: EngagementKind,
  secret: string
) {
  if (!value) return false;
  const [state, signature] = value.split(".");
  return (
    state === "recorded" &&
    Boolean(signature) &&
    signature === createSignature(articleId, kind, secret)
  );
}
