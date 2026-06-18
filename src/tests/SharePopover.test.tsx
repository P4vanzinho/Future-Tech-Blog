import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SharePopover } from "@/components/blog/SharePopover";
import type { Article } from "@/types/article";

const article: Article = {
  id: "42",
  slug: "test-article",
  title: "Test Article",
  description: "Test description",
  image: "/test.png",
  imageAlt: "Test",
  category: "Technology",
  likes: 1,
  views: 2,
  shares: 3,
};

describe("SharePopover", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ shares: 4, provider: "x", counted: true }),
      })
    );
  });

  it("renders the current count and all supported providers", async () => {
    render(<SharePopover article={article} />);
    fireEvent.click(
      screen.getByRole("button", { name: /share this article/i })
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /share on x/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /share on linkedin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /share with another app/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /copy link/i })
    ).toBeInTheDocument();
  });

  it("opens the X composer and records the provider", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    render(<SharePopover article={article} />);
    fireEvent.click(
      screen.getByRole("button", { name: /share this article/i })
    );
    fireEvent.click(await screen.findByRole("button", { name: /share on x/i }));

    expect(open).toHaveBeenCalledWith(
      expect.stringContaining("https://x.com/intent/tweet"),
      "_blank"
    );
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/articles/42/shares",
        expect.objectContaining({ method: "POST" })
      )
    );
  });

  it("counts copy only after the clipboard succeeds", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<SharePopover article={article} />);
    fireEvent.click(
      screen.getByRole("button", { name: /share this article/i })
    );
    fireEvent.click(await screen.findByRole("button", { name: /copy link/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });
});
