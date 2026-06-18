import { NextResponse } from "next/server";
import { ArticleMetricRouteParamsSchema } from "../engagementSchemas";
import { readPublishedArticleMetrics } from "@/services/server/articleMetrics";
import {
  getShareCookieName,
  getViewCookieName,
  hasValidEngagementCookieValue,
} from "@/utils/engagementCookie";
import {
  getLikeCookieName,
  hasValidLikedCookieValue,
  readCookieValueFromHeader,
} from "@/utils/likesCookie";
import { getPayloadSecret } from "@/config/env";
import { SHARE_PROVIDERS } from "@/types/articleEngagement";

export async function GET(
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
  const metrics = await readPublishedArticleMetrics(articleId);
  if (!metrics) {
    return NextResponse.json(
      { message: "Article not found." },
      { status: 404 }
    );
  }

  const cookieHeader = request.headers.get("cookie");
  const secret = getPayloadSecret();
  const likedByOrigin = hasValidLikedCookieValue(
    readCookieValueFromHeader(cookieHeader, getLikeCookieName(articleId)),
    articleId,
    secret
  );
  const viewedByOrigin = hasValidEngagementCookieValue(
    readCookieValueFromHeader(cookieHeader, getViewCookieName(articleId)),
    articleId,
    "view",
    secret
  );
  const sharedProviders = SHARE_PROVIDERS.filter((provider) =>
    hasValidEngagementCookieValue(
      readCookieValueFromHeader(
        cookieHeader,
        getShareCookieName(articleId, provider)
      ),
      articleId,
      `share:${provider}`,
      secret
    )
  );

  return NextResponse.json({
    ...metrics,
    likedByOrigin,
    viewedByOrigin,
    sharedProviders,
  });
}
