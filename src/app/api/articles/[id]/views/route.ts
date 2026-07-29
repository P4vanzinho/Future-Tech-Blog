import { NextResponse } from "next/server";
import { ArticleMetricRouteParamsSchema } from "../engagementSchemas";
import {
  incrementPublishedArticleMetric,
  readPublishedArticleMetrics,
} from "@/services/server/articleMetrics";
import {
  createSignedEngagementCookieValue,
  getViewCookieName,
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
  if (!parsedParams.success) {
    return NextResponse.json(
      { message: "Invalid article id." },
      { status: 400 }
    );
  }

  const articleId = Number.parseInt(parsedParams.data.id, 10);
  const rateLimit = consumeEngagementRateLimit(
    getRequestFingerprint(request, `view:${articleId}`)
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
  const cookieName = getViewCookieName(articleId);
  const alreadyViewed = hasValidEngagementCookieValue(
    readCookieValueFromHeader(request.headers.get("cookie"), cookieName),
    articleId,
    "view",
    secret
  );
  const metrics = alreadyViewed
    ? await readPublishedArticleMetrics(articleId)
    : await incrementPublishedArticleMetric(articleId, "views");

  if (!metrics) {
    return NextResponse.json(
      { message: "Article not found." },
      { status: 404 }
    );
  }

  const response = NextResponse.json({
    views: metrics.views,
    viewedByOrigin: true,
  });
  if (!alreadyViewed) {
    response.cookies.set(
      cookieName,
      createSignedEngagementCookieValue(articleId, "view", secret),
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
