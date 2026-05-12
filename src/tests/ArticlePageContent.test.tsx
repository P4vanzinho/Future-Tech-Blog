import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticlePageContent } from "@/components/article/ArticlePageContent";

describe("ArticlePageContent", () => {
  it("renders article title, metadata, toc, content and similar news", () => {
    render(<ArticlePageContent articleId="1" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "The Rise of Artificial Intelligence in Healthcare",
      })
    ).toBeInTheDocument();

    expect(screen.getByText("Publication Date")).toBeInTheDocument();
    expect(screen.getByText("October 15, 2023")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
    expect(screen.getByText("Reading Time")).toBeInTheDocument();
    expect(screen.getByText("10 Min")).toBeInTheDocument();
    expect(screen.getByText("Author Name")).toBeInTheDocument();
    expect(screen.getByText("Dr. Emily Walker")).toBeInTheDocument();

    expect(
      screen.getByRole("navigation", { name: "Table of Contents" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Introduction/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "Introduction" })
    ).toBeInTheDocument();
    expect(screen.getByText("Similar News")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View All News" })
    ).toBeInTheDocument();
  });
});
