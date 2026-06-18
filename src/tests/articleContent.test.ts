import { describe, expect, it } from "vitest";
import {
  addHeadingIdsToBlocks,
  calculateReadingTimeMinutes,
  extractArticleHeadings,
} from "@/utils/articleContent";
import type { ArticleContentBlock } from "@/types/articleDetail";

const blocks: ArticleContentBlock[] = [
  {
    id: "body",
    type: "richText",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "heading",
            tag: "h2",
            children: [{ type: "text", text: "AI & Saúde" }],
          },
          {
            type: "heading",
            tag: "h3",
            children: [{ type: "text", text: "AI & Saúde" }],
          },
          {
            type: "paragraph",
            children: [{ type: "text", text: "one two three" }],
          },
        ],
      },
    },
  },
];

describe("article content utilities", () => {
  it("extracts unique ordered h2 and h3 anchors", () => {
    expect(extractArticleHeadings(blocks)).toEqual([
      { id: "ai-saude", title: "AI & Saúde", level: 2 },
      { id: "ai-saude-2", title: "AI & Saúde", level: 3 },
    ]);

    const annotated = addHeadingIdsToBlocks(blocks);
    if (annotated[0]?.type !== "richText")
      throw new Error("Expected rich text");
    expect(annotated[0].content.root.children[0]?.anchorId).toBe("ai-saude");
    expect(annotated[0].content.root.children[1]?.anchorId).toBe("ai-saude-2");
  });

  it("returns at least one minute of reading time", () => {
    expect(calculateReadingTimeMinutes(blocks)).toBe(1);
  });
});
