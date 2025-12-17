import { describe, it, expect } from "vitest";
import { add, formatTitle } from "./utils/example.js";

describe("example utility functions", () => {
  describe("add", () => {
    it("should add two numbers correctly", () => {
      expect(add(2, 3)).toBe(5);
      expect(add(-1, 1)).toBe(0);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe("formatTitle", () => {
    it("should format text as title case", () => {
      expect(formatTitle("hello world")).toBe("Hello World");
      expect(formatTitle("  BLOG FUTURE TECH  ")).toBe("Blog Future Tech");
      expect(formatTitle("test")).toBe("Test");
    });
  });
});
