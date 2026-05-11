import { createHmac } from "node:crypto";

export function getLikeCookieName(articleId: string | number): string {
  return `liked_${articleId}`;
}

function createLikeCookieSignature(
  articleId: string | number,
  state: "liked",
  secret: string
): string {
  return createHmac("sha256", secret)
    .update(`${articleId}:${state}`)
    .digest("hex");
}

export function createSignedLikeCookieValue(
  articleId: string | number,
  secret: string
): string {
  const state = "liked";
  const signature = createLikeCookieSignature(articleId, state, secret);
  return `${state}.${signature}`;
}

export function hasValidLikedCookieValue(
  cookieValue: string | undefined,
  articleId: string | number,
  secret: string
): boolean {
  if (!cookieValue) {
    return false;
  }

  const [state, signature] = cookieValue.split(".");
  if (state !== "liked" || !signature) {
    return false;
  }

  return createLikeCookieSignature(articleId, "liked", secret) === signature;
}

export function readCookieValueFromHeader(
  rawCookieHeader: string | null,
  cookieName: string
): string | undefined {
  return rawCookieHeader
    ?.split(";")
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.startsWith(`${cookieName}=`))
    ?.split("=")[1];
}
