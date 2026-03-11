import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useShareLinks } from "../hooks/useShareLinks";

describe("useShareLinks", () => {
  const mockUrl = "https://example.com/posts/test-article";
  const mockTitle = "Test Article Title";

  it("should return twitter and linkedIn links", () => {
    const { result } = renderHook(() => useShareLinks(mockUrl, mockTitle));

    expect(result.current).toHaveProperty("twitter");
    expect(result.current).toHaveProperty("linkedIn");
  });

  it("should generate correct Twitter share URL", () => {
    const { result } = renderHook(() => useShareLinks(mockUrl, mockTitle));

    expect(result.current.twitter).toContain("twitter.com/intent/tweet");
    expect(result.current.twitter).toContain("url=");
    expect(result.current.twitter).toContain("text=");
  });

  it("should generate correct LinkedIn share URL", () => {
    const { result } = renderHook(() => useShareLinks(mockUrl, mockTitle));

    expect(result.current.linkedIn).toContain(
      "linkedin.com/sharing/share-offsite"
    );
    expect(result.current.linkedIn).toContain("url=");
  });

  it("should encode URL and title properly", () => {
    const urlWithSpecialChars = "https://example.com/posts/hello world&test";
    const titleWithSpecialChars = "Hello & World: A Test!";

    const { result } = renderHook(() =>
      useShareLinks(urlWithSpecialChars, titleWithSpecialChars)
    );

    expect(result.current.twitter).not.toContain(" ");
    expect(result.current.twitter).not.toContain("&test");
    expect(result.current.twitter).toContain(
      encodeURIComponent(urlWithSpecialChars)
    );
    expect(result.current.twitter).toContain(
      encodeURIComponent(titleWithSpecialChars)
    );
  });

  it("should memoize links when inputs do not change", () => {
    const { result, rerender } = renderHook(() =>
      useShareLinks(mockUrl, mockTitle)
    );

    const firstLinks = result.current;
    rerender();
    const secondLinks = result.current;

    expect(firstLinks).toBe(secondLinks);
  });

  it("should update links when url changes", () => {
    const { result, rerender } = renderHook(
      ({ url, title }) => useShareLinks(url, title),
      { initialProps: { url: mockUrl, title: mockTitle } }
    );

    const firstTwitter = result.current.twitter;

    rerender({
      url: "https://example.com/posts/new-article",
      title: mockTitle,
    });

    expect(result.current.twitter).not.toBe(firstTwitter);
    expect(result.current.twitter).toContain("new-article");
  });

  it("should update links when title changes", () => {
    const { result, rerender } = renderHook(
      ({ url, title }) => useShareLinks(url, title),
      { initialProps: { url: mockUrl, title: mockTitle } }
    );

    const firstTwitter = result.current.twitter;

    rerender({ url: mockUrl, title: "New Title" });

    expect(result.current.twitter).not.toBe(firstTwitter);
    expect(result.current.twitter).toContain(encodeURIComponent("New Title"));
  });
});
