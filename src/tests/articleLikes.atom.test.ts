import { createStore } from "jotai";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  articleLikeStatesAtom,
  registerArticleLikesAtom,
  toggleArticleLikeAtom,
} from "@/atoms/articleLikes";
import type { Article } from "@/types/article";

const article: Article = {
  id: "shared-article",
  slug: "shared-article",
  title: "Shared article",
  image: "/article.png",
  imageAlt: "Article",
  category: "Technology",
  likes: 7,
  shares: 0,
  isLiked: false,
};

describe("articleLikes atoms", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("publishes an optimistic like state shared by every atom consumer", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ likes: 8, likedByOrigin: true }),
      })
    );
    const store = createStore();
    store.set(registerArticleLikesAtom, [article]);

    const request = store.set(toggleArticleLikeAtom, article);

    expect(store.get(articleLikeStatesAtom)[article.id]).toEqual({
      likes: 8,
      isLiked: true,
    });

    await request;
    expect(store.get(articleLikeStatesAtom)[article.id]).toEqual({
      likes: 8,
      isLiked: true,
    });
  });
});
