import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkButton } from "../components/blog/LinkButton";

describe("LinkButton", () => {
  function getLink(container: HTMLElement) {
    return container.querySelector("a");
  }

  describe("default (featured) variant", () => {
    it("should render a link with default text 'Read More'", () => {
      const { container } = render(<LinkButton />);

      const link = getLink(container);
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("Read More");
    });

    it("should render with custom text when provided", () => {
      const { container } = render(<LinkButton text="View All News" />);

      const link = getLink(container);
      expect(link).toHaveTextContent("View All News");
    });

    it("should have href attribute", () => {
      const { container } = render(<LinkButton href="/news" />);

      const link = getLink(container);
      expect(link).toHaveAttribute("href", "/news");
    });

    it("should have empty href by default", () => {
      const { container } = render(<LinkButton />);

      const link = getLink(container);
      expect(link).toHaveAttribute("href", "");
    });

    it("should not render arrow icon in featured variant", () => {
      const { container } = render(<LinkButton />);

      const link = getLink(container);
      expect(link?.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("regular variant", () => {
    it("should render a link with default text 'Read More'", () => {
      const { container } = render(<LinkButton variant="regular" />);

      const link = getLink(container);
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("Read More");
    });

    it("should render with custom text when provided", () => {
      const { container } = render(<LinkButton variant="regular" text="View All News" />);

      const link = getLink(container);
      expect(link).toHaveTextContent("View All News");
    });

    it("should render arrow icon", () => {
      const { container } = render(<LinkButton variant="regular" />);

      const link = getLink(container);
      expect(link?.querySelector("svg")).toBeInTheDocument();
    });

    it("should have flex and gap classes for icon + text layout", () => {
      const { container } = render(<LinkButton variant="regular" />);

      const link = getLink(container);
      expect(link).toHaveClass("flex", "flex-1", "items-center", "justify-center", "gap-1");
    });

    it("should have href attribute", () => {
      const { container } = render(<LinkButton variant="regular" href="/all-news" />);

      const link = getLink(container);
      expect(link).toHaveAttribute("href", "/all-news");
    });
  });

  describe("className prop", () => {
    it("should merge custom className", () => {
      const { container } = render(<LinkButton className="custom-class" />);

      const link = getLink(container);
      expect(link).toHaveClass("custom-class");
    });
  });
});
