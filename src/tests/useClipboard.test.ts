import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useClipboard } from "../hooks/useClipboard";

describe("useClipboard", () => {
  const mockWriteText = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => useClipboard());

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.buttonText).toBe("Copy Link");
  });

  it("should copy text to clipboard successfully", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copyToClipboard("test text");
    });

    expect(mockWriteText).toHaveBeenCalledWith("test text");
    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should return true on successful copy", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboard());

    let success: boolean = false;
    await act(async () => {
      success = await result.current.copyToClipboard("test text");
    });

    expect(success).toBe(true);
  });

  it("should show 'Copied!' as buttonText after successful copy", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copyToClipboard("test text");
    });

    expect(result.current.buttonText).toBe("Copied!");
  });

  it("should reset copied state after delay", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboard(1000));

    await act(async () => {
      await result.current.copyToClipboard("test text");
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.buttonText).toBe("Copy Link");
  });

  it("should handle clipboard error", async () => {
    mockWriteText.mockRejectedValue(new Error("Clipboard access denied"));

    const { result } = renderHook(() => useClipboard());

    let success: boolean = true;
    await act(async () => {
      success = await result.current.copyToClipboard("test text");
    });

    expect(success).toBe(false);
    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBe("Clipboard access denied");
  });

  it("should show 'Failed!' as buttonText on error", async () => {
    mockWriteText.mockRejectedValue(new Error("Clipboard access denied"));

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copyToClipboard("test text");
    });

    expect(result.current.buttonText).toBe("Failed!");
  });

  it("should clear error on successful copy after previous error", async () => {
    mockWriteText.mockRejectedValueOnce(new Error("First error"));

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copyToClipboard("test text");
    });

    expect(result.current.error).toBe("First error");

    mockWriteText.mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.copyToClipboard("test text");
    });

    expect(result.current.error).toBeNull();
    expect(result.current.copied).toBe(true);
  });

  it("should use custom reset delay", async () => {
    mockWriteText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboard(5000));

    await act(async () => {
      await result.current.copyToClipboard("test text");
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });
});
