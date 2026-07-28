import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider as JotaiProvider } from "jotai";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useArticleLikes } from "@/hooks/useArticleLikes";
import type { Article } from "@/types/article";

const article: Article = {
  id: "article-42",
  slug: "article-42",
  title: "Article 42",
  image: "/article.png",
  imageAlt: "Article 42",
  category: "Technology",
  likes: 7,
  views: 20,
  shares: 1,
};

function ArticleLikesProbe() {
  const { articles } = useArticleLikes([article]);
  const currentArticle = articles[0] ?? article;

  return (
    <output data-testid="like-state">
      {`${currentArticle.likes}:${String(currentArticle.isLiked)}`}
    </output>
  );
}

function renderProbe() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ArticleLikesProbe />
      </JotaiProvider>
    </QueryClientProvider>
  );
}

describe("useArticleLikes", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("hydrates the like state from the server engagement response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        likes: 8,
        views: 20,
        shares: 1,
        likedByOrigin: true,
        viewedByOrigin: false,
        sharedProviders: [],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderProbe();

    await waitFor(() => {
      expect(screen.getByTestId("like-state")).toHaveTextContent("8:true");
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/articles/article-42/engagement",
      {
        cache: "no-store",
        credentials: "same-origin",
      }
    );
  });
});
