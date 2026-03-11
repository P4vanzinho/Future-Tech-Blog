import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SharePopover } from "../components/blog/SharePopover";

describe("SharePopover", () => {
  const defaultProps = {
    url: "https://example.com/posts/test-article",
    title: "Test Article Title",
    shareCount: 42,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the share button with correct count", () => {
    render(<SharePopover {...defaultProps} />);

    expect(screen.getByText("42")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /share this article/i })
    ).toBeInTheDocument();
  });

  it("should have correct aria-label on trigger button", () => {
    render(<SharePopover {...defaultProps} />);

    const triggerButton = screen.getByRole("button", {
      name: /share this article/i,
    });
    expect(triggerButton).toHaveAttribute("aria-label", "Share this article");
  });

  it("should open popover and show share options on click (desktop)", async () => {
    render(<SharePopover {...defaultProps} />);

    const triggerButton = screen.getByRole("button", {
      name: /share this article/i,
    });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText("Twitter / X")).toBeInTheDocument();
      expect(screen.getByText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByText("Copy Link")).toBeInTheDocument();
    });
  });

  it("should have correct Twitter share link", async () => {
    render(<SharePopover {...defaultProps} />);

    const triggerButton = screen.getByRole("button", {
      name: /share this article/i,
    });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const twitterLink = screen.getByRole("link", {
        name: /share on twitter/i,
      });
      expect(twitterLink).toHaveAttribute(
        "href",
        expect.stringContaining("twitter.com/intent/tweet")
      );
      expect(twitterLink).toHaveAttribute(
        "href",
        expect.stringContaining("url=")
      );
      expect(twitterLink).toHaveAttribute(
        "href",
        expect.stringContaining("text=")
      );
      expect(twitterLink).toHaveAttribute("target", "_blank");
      expect(twitterLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("should have correct LinkedIn share link", async () => {
    render(<SharePopover {...defaultProps} />);

    const triggerButton = screen.getByRole("button", {
      name: /share this article/i,
    });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const linkedInLink = screen.getByRole("link", {
        name: /share on linkedin/i,
      });
      expect(linkedInLink).toHaveAttribute(
        "href",
        expect.stringContaining("linkedin.com/shareArticle")
      );
      expect(linkedInLink).toHaveAttribute("target", "_blank");
      expect(linkedInLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("should copy link to clipboard when copy button is clicked", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(<SharePopover {...defaultProps} />);

    const triggerButton = screen.getByRole("button", {
      name: /share this article/i,
    });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      const copyButton = screen.getByRole("button", { name: /copy link/i });
      fireEvent.click(copyButton);
    });

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(defaultProps.url);
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });
  });

  it("should have accessible labels on all share options", async () => {
    render(<SharePopover {...defaultProps} />);

    const triggerButton = screen.getByRole("button", {
      name: /share this article/i,
    });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /share on twitter/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /share on linkedin/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /copy link/i })
      ).toBeInTheDocument();
    });
  });
});
