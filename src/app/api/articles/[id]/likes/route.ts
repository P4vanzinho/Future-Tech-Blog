import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  createSignedLikeCookieValue,
  getLikeCookieName,
  hasValidLikedCookieValue,
  readCookieValueFromHeader,
} from "@/utils/likesCookie";
import { getPayloadSecret, isProductionEnv } from "@/config/env";
import {
  LikeDeltaBodySchema,
  LikeRouteParamsSchema,
  PayloadArticleLikesSchema,
} from "./schemas";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const LIKE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const rateLimitStore = new Map<string, number[]>();

function getRequestOriginFingerprint(
  request: Request,
  articleId: number
): string {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown-ip";
  const userAgent = request.headers.get("user-agent") ?? "unknown-ua";
  return `${articleId}:${ip}:${userAgent}`;
}

function checkAndTrackRateLimit(fingerprint: string): {
  isLimited: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const currentWindowEntries =
    rateLimitStore
      .get(fingerprint)
      ?.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS) ?? [];

  if (currentWindowEntries.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestTimestamp = currentWindowEntries[0] ?? now;
    const retryAfterMs = Math.max(
      0,
      RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp)
    );
    return {
      isLimited: true,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  currentWindowEntries.push(now);
  rateLimitStore.set(fingerprint, currentWindowEntries);
  return {
    isLimited: false,
    retryAfterSeconds: 0,
  };
}

function readCurrentLikes(article: { stats?: { likes?: number } }): number {
  return article.stats?.likes ?? 0;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const rawParams = await context.params;
  const parsedParams = LikeRouteParamsSchema.safeParse(rawParams);
  if (!parsedParams.success) {
    return NextResponse.json(
      { message: "Invalid article id." },
      { status: 400 }
    );
  }
  const articleId = Number.parseInt(parsedParams.data.id, 10);

  const rawBody = await request.json().catch(() => null);
  const parsedBody = LikeDeltaBodySchema.safeParse(rawBody);
  if (!parsedBody.success) {
    return NextResponse.json(
      { message: "Invalid likes delta." },
      { status: 400 }
    );
  }
  const { delta } = parsedBody.data;

  const fingerprint = getRequestOriginFingerprint(request, articleId);
  const rateLimitResult = checkAndTrackRateLimit(fingerprint);
  if (rateLimitResult.isLimited) {
    console.warn("[likes-abuse] rate-limit", {
      articleId,
      fingerprint,
      retryAfterSeconds: rateLimitResult.retryAfterSeconds,
    });
    return NextResponse.json(
      { message: "Too many like requests. Try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      }
    );
  }

  const secret = getPayloadSecret();
  const likedCookieName = getLikeCookieName(articleId);
  const likedCookieValue = readCookieValueFromHeader(
    request.headers.get("cookie"),
    likedCookieName
  );
  const hasLikedByOrigin = hasValidLikedCookieValue(
    likedCookieValue,
    articleId,
    secret
  );

  if (delta === 1 && hasLikedByOrigin) {
    console.warn("[likes-abuse] repeated-like", {
      articleId,
      fingerprint,
    });
    return NextResponse.json(
      { message: "Article already liked by this browser." },
      { status: 409 }
    );
  }

  if (delta === -1 && !hasLikedByOrigin) {
    console.warn("[likes-abuse] invalid-unlike", {
      articleId,
      fingerprint,
    });
    return NextResponse.json(
      { message: "Cannot remove like before liking this article." },
      { status: 409 }
    );
  }

  const payload = await getPayload({ config });
  const rawArticle = await payload.findByID({
    collection: "articles",
    id: articleId,
    depth: 0,
    select: {
      stats: true,
    },
  });
  const parsedArticle = PayloadArticleLikesSchema.safeParse(rawArticle);

  if (!parsedArticle.success) {
    return NextResponse.json(
      { message: "Article not found." },
      { status: 404 }
    );
  }
  const article = parsedArticle.data;

  const nextLikes = Math.max(0, readCurrentLikes(article) + delta);

  const rawUpdatedArticle = await payload.update({
    collection: "articles",
    id: articleId,
    data: {
      stats: {
        likes: nextLikes,
      },
    },
    depth: 0,
    overrideAccess: true,
    select: {
      stats: true,
    },
  });
  const updatedArticle = PayloadArticleLikesSchema.parse(rawUpdatedArticle);

  const response = NextResponse.json({
    likes: readCurrentLikes(updatedArticle),
    likedByOrigin: delta === 1,
  });

  if (delta === 1) {
    response.cookies.set(
      likedCookieName,
      createSignedLikeCookieValue(articleId, secret),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: isProductionEnv(),
        path: "/",
        maxAge: LIKE_COOKIE_MAX_AGE_SECONDS,
      }
    );
  } else {
    response.cookies.delete(likedCookieName);
  }

  return response;
}
