import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticlePageContent } from "@/components/article/ArticlePageContent";
import type { ArticleDetail } from "@/types/articleDetail";

vi.mock("@/components/article/ArticleEngagementInitializer", () => ({
  ArticleEngagementInitializer: () => null,
}));

const article: ArticleDetail = {
  id: "1",
  slug: "ai-in-healthcare",
  title: "The Rise of Artificial Intelligence in Healthcare",
  description: "How AI is changing healthcare.",
  image: "/mocks/Todays_mock_1.png",
  imageAlt: "AI in healthcare",
  category: "Healthcare",
  publicationDate: "2023-10-15T00:00:00.000Z",
  author: "Dr. Emily Walker",
  likes: 24500,
  views: 50000,
  shares: 206,
  body: [
    {
      id: "content",
      type: "richText",
      content: {
        root: {
          type: "root",
          version: 1,
          children: [
            {
              type: "heading",
              tag: "h2",
              version: 1,
              direction: null,
              format: "",
              indent: 0,
              children: [
                {
                  type: "text",
                  text: "Introduction",
                  version: 1,
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              direction: null,
              format: "",
              indent: 0,
              textFormat: 0,
              textStyle: "",
              children: [
                {
                  type: "text",
                  text: "Artificial intelligence is transforming patient care.",
                  version: 1,
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                },
              ],
            },
          ],
        },
      },
    },
  ],
  relatedArticles: [],
  tags: ["AI"],
};

describe("ArticlePageContent", () => {
  it("renders CMS article title, metadata, table of contents and content", () => {
    render(<ArticlePageContent article={article} />);

    expect(
      screen.getByRole("heading", { level: 1, name: article.title })
    ).toBeInTheDocument();
    expect(screen.getByText("October 15, 2023")).toBeInTheDocument();
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
    expect(screen.getByText("Dr. Emily Walker")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Table of Contents" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Introduction" })
    ).toHaveAttribute("id", "introduction");
  });
});
