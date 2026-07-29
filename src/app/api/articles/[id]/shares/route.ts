import { NextResponse } from "next/server";
import {
  ArticleMetricRouteParamsSchema,
  ArticleShareBodySchema,
} from "../engagementSchemas";
import {
  incrementPublishedArticleMetric,
  readPublishedArticleMetrics,
} from "@/services/server/articleMetrics";
import {
  createSignedEngagementCookieValue,
  getShareCookieName,
  hasValidEngagementCookieValue,
} from "@/utils/engagementCookie";
import { readCookieValueFromHeader } from "@/utils/likesCookie";
import { getPayloadSecret, isProductionEnv } from "@/config/env";
import { ENGAGEMENT_COOKIE_MAX_AGE_SECONDS } from "@/constants/engagement";
import {
  consumeEngagementRateLimit,
  getRequestFingerprint,
} from "@/utils/engagementRateLimit";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const parsedParams = ArticleMetricRouteParamsSchema.safeParse(
    await context.params
  );
  const parsedBody = ArticleShareBodySchema.safeParse(
    await request.json().catch(() => null)
  );
  if (!parsedParams.success || !parsedBody.success) {
    return NextResponse.json(
      { message: "Invalid share request." },
      { status: 400 }
    );
  }

  const articleId = Number.parseInt(parsedParams.data.id, 10);
  const { provider } = parsedBody.data;
  const rateLimit = consumeEngagementRateLimit(
    getRequestFingerprint(request, `share:${articleId}:${provider}`)
  );
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "Too many requests." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  const secret = getPayloadSecret();
  const kind = `share:${provider}` as const;
  const cookieName = getShareCookieName(articleId, provider);
  const alreadyShared = hasValidEngagementCookieValue(
    readCookieValueFromHeader(request.headers.get("cookie"), cookieName),
    articleId,
    kind,
    secret
  );
  const metrics = alreadyShared
    ? await readPublishedArticleMetrics(articleId)
    : await incrementPublishedArticleMetric(articleId, "shares");

  if (!metrics) {
    return NextResponse.json(
      { message: "Article not found." },
      { status: 404 }
    );
  }

  const response = NextResponse.json({
    shares: metrics.shares,
    provider,
    counted: !alreadyShared,
  });
  if (!alreadyShared) {
    response.cookies.set(
      cookieName,
      createSignedEngagementCookieValue(articleId, kind, secret),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: isProductionEnv(),
        path: "/",
        maxAge: ENGAGEMENT_COOKIE_MAX_AGE_SECONDS,
      }
    );
  }

  return response;
}
