import { describe, expect, it } from "vitest";
import { selectRelatedArticles } from "@/utils/relatedArticles";
import type { Article } from "@/types/article";

const article = (id: string): Article => ({
  id,
  slug: id,
  title: id,
  image: "/image.png",
  imageAlt: id,
  category: "Tech",
  likes: 0,
  views: 0,
  shares: 0,
});

describe("selectRelatedArticles", () => {
  it("prioritizes explicit articles and removes current and duplicates", () => {
    expect(
      selectRelatedArticles(
        "current",
        [article("explicit"), article("current")],
        [article("explicit"), article("fallback-1"), article("fallback-2")]
      ).map(({ id }) => id)
    ).toEqual(["explicit", "fallback-1", "fallback-2"]);
  });
});
