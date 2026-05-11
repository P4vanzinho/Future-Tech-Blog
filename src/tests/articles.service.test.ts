import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockFind, mockGetPayload, mockMapPayloadArticle } = vi.hoisted(() => ({
  mockFind: vi.fn(),
  mockGetPayload: vi.fn(),
  mockMapPayloadArticle: vi.fn(),
}));

vi.mock("payload", () => ({
  getPayload: mockGetPayload,
}));

vi.mock("@payload-config", () => ({
  default: {},
}));

vi.mock("@/utils/mappers/article", () => ({
  mapPayloadArticle: mockMapPayloadArticle,
}));

import { getArticleBySlug, getArticles } from "@/services/articles";

describe("articles service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetPayload.mockResolvedValue({
      find: mockFind,
    });
  });

  it("fetches articles sorted by newest and maps each document", async () => {
    mockFind.mockResolvedValue({
      docs: [{ id: 1 }, { id: 2 }],
    });
    mockMapPayloadArticle
      .mockReturnValueOnce({ id: "1", title: "A" })
      .mockReturnValueOnce({ id: "2", title: "B" });

    const result = await getArticles();

    expect(mockFind).toHaveBeenCalledWith({
      collection: "articles",
      sort: "-createdAt",
      depth: 2,
      limit: 30,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        isFeatured: true,
        stats: {
          likes: true,
          shares: true,
        },
        category: true,
        coverImage: true,
        author: true,
      },
    });
    expect(mockMapPayloadArticle).toHaveBeenCalledTimes(2);
    expect(result).toEqual([
      { id: "1", title: "A" },
      { id: "2", title: "B" },
    ]);
  });

  it("returns null without querying when slug is empty", async () => {
    const result = await getArticleBySlug("   ");

    expect(result).toBeNull();
    expect(mockGetPayload).not.toHaveBeenCalled();
    expect(mockFind).not.toHaveBeenCalled();
  });

  it("returns mapped article when slug exists", async () => {
    mockFind.mockResolvedValue({
      docs: [{ id: 10, slug: "my-article" }],
    });
    mockMapPayloadArticle.mockReturnValue({ id: "10", slug: "my-article" });

    const result = await getArticleBySlug("my-article");

    expect(mockFind).toHaveBeenCalledWith({
      collection: "articles",
      where: {
        slug: {
          equals: "my-article",
        },
      },
      depth: 2,
      limit: 1,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        isFeatured: true,
        stats: {
          likes: true,
          shares: true,
        },
        category: true,
        coverImage: true,
        author: true,
      },
    });
    expect(result).toEqual({ id: "10", slug: "my-article" });
  });

  it("returns null when slug is not found", async () => {
    mockFind.mockResolvedValue({
      docs: [],
    });

    const result = await getArticleBySlug("missing-article");

    expect(result).toBeNull();
    expect(mockMapPayloadArticle).not.toHaveBeenCalled();
  });
});
