import { describe, it, expect } from "vitest";
import { Media } from "../collections/Media";
import { Authors } from "../collections/Authors";
import { Categories } from "../collections/Categories";
import { Articles } from "../collections/Articles";
import { Users } from "../collections/Users";

describe("Payload CMS Collections Schema", () => {
  it("should have correct slugs for all collections", () => {
    expect(Media.slug).toBe("media");
    expect(Authors.slug).toBe("authors");
    expect(Categories.slug).toBe("categories");
    expect(Articles.slug).toBe("articles");
    expect(Users.slug).toBe("users");
  });

  it("should have required fields in Authors collection", () => {
    const fieldNames = Authors.fields.map((f) => ("name" in f ? f.name : ""));
    expect(fieldNames).toContain("name");
    expect(fieldNames).toContain("role");
    expect(fieldNames).toContain("avatar");
  });

  it("should have tabs in Articles collection", () => {
    const hasTabs = Articles.fields.some((f) => f.type === "tabs");
    expect(hasTabs).toBe(true);
  });

  it("should have upload enabled for Media collection", () => {
    expect(Media.upload).toBe(true);
  });
});
