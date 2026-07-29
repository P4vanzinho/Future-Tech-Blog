import { describe, expect, it } from "vitest";
import {
  createArticleBodyContent,
  createLexicalDocument,
  heading,
  paragraph,
} from "@/seed/utils/lexical";

describe("seed lexical helpers", () => {
  it("builds a lexical document with headings and paragraphs", () => {
    const document = createLexicalDocument([
      heading("h2", "Section"),
      paragraph("Body copy"),
      heading("h3", "Subsection"),
    ]);

    expect(document.root.children).toHaveLength(3);
    expect(document.root.children[0]).toMatchObject({
      type: "heading",
      tag: "h2",
    });
    expect(document.root.children[2]).toMatchObject({
      type: "heading",
      tag: "h3",
    });
  });

  it("creates article body content with multiple sections", () => {
    const document = createArticleBodyContent();

    expect(document.root.children.length).toBeGreaterThanOrEqual(5);
    expect(
      document.root.children.some(
        (node) => node.type === "heading" && node.tag === "h2"
      )
    ).toBe(true);
  });
});
