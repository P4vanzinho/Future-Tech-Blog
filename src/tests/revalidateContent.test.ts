import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockRevalidatePath } = vi.hoisted(() => ({
  mockRevalidatePath: vi.fn(),
}));

vi.mock("next/cache", () => ({ revalidatePath: mockRevalidatePath }));

import { revalidateHomeAfterChange } from "@/hooks/revalidateHome";

describe("content revalidation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("revalidates home and article pages for editorial updates", () => {
    revalidateHomeAfterChange({
      doc: { id: 1 },
      context: {},
    } as unknown as Parameters<typeof revalidateHomeAfterChange>[0]);

    expect(mockRevalidatePath).toHaveBeenCalledWith("/");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/article/[slug]", "page");
  });

  it("skips revalidation for metric-only updates", () => {
    revalidateHomeAfterChange({
      doc: { id: 1 },
      context: { skipRevalidation: true },
    } as unknown as Parameters<typeof revalidateHomeAfterChange>[0]);

    expect(mockRevalidatePath).not.toHaveBeenCalled();
  });
});
