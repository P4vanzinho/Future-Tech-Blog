import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSignedEngagementCookieValue,
  getShareCookieName,
  getViewCookieName,
} from "@/utils/engagementCookie";

const { mockIncrementMetric, mockReadMetrics } = vi.hoisted(() => ({
  mockIncrementMetric: vi.fn(),
  mockReadMetrics: vi.fn(),
}));

vi.mock("@/services/server/articleMetrics", () => ({
  incrementPublishedArticleMetric: mockIncrementMetric,
  readPublishedArticleMetrics: mockReadMetrics,
}));

vi.mock("@/config/env", () => ({
  getPayloadSecret: () => "test-secret",
  isProductionEnv: () => false,
}));

import { POST as registerView } from "@/app/api/articles/[id]/views/route";
import { POST as registerShare } from "@/app/api/articles/[id]/shares/route";

const context = { params: Promise.resolve({ id: "7" }) };

describe("article metric routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIncrementMetric.mockResolvedValue({ likes: 1, views: 11, shares: 6 });
    mockReadMetrics.mockResolvedValue({ likes: 1, views: 11, shares: 6 });
  });

  it("counts the first view and sets a signed cookie", async () => {
    const response = await registerView(
      new Request("http://localhost/api/articles/7/views", { method: "POST" }),
      context
    );

    expect(response.status).toBe(200);
    expect(mockIncrementMetric).toHaveBeenCalledWith(7, "views");
    expect(response.headers.get("set-cookie")).toContain(getViewCookieName(7));
  });

  it("does not count a view again with a valid cookie", async () => {
    const value = createSignedEngagementCookieValue(7, "view", "test-secret");
    await registerView(
      new Request("http://localhost/api/articles/7/views", {
        method: "POST",
        headers: { cookie: `${getViewCookieName(7)}=${value}` },
      }),
      context
    );

    expect(mockIncrementMetric).not.toHaveBeenCalled();
    expect(mockReadMetrics).toHaveBeenCalledWith(7);
  });

  it("counts each share provider once", async () => {
    const firstResponse = await registerShare(
      new Request("http://localhost/api/articles/7/shares", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ provider: "linkedin" }),
      }),
      context
    );
    expect(mockIncrementMetric).toHaveBeenCalledWith(7, "shares");
    expect(firstResponse.headers.get("set-cookie")).toContain(
      getShareCookieName(7, "linkedin")
    );

    vi.clearAllMocks();
    const value = createSignedEngagementCookieValue(
      7,
      "share:linkedin",
      "test-secret"
    );
    await registerShare(
      new Request("http://localhost/api/articles/7/shares", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: `${getShareCookieName(7, "linkedin")}=${value}`,
        },
        body: JSON.stringify({ provider: "linkedin" }),
      }),
      context
    );
    expect(mockIncrementMetric).not.toHaveBeenCalled();
    expect(mockReadMetrics).toHaveBeenCalledWith(7);
  });
});
