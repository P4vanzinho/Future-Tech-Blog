import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { LinkButton } from "../components/blog/LinkButton";

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("LinkButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default text 'Read More' and featured variant", () => {
    const { container } = render(<LinkButton />);

    const link = screen.getByText("Read More").closest("a") ?? container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Read More");
    expect(link).toHaveAttribute("href", "");
  });

  it("renders with custom text when provided", () => {
    const { container } = render(<LinkButton text="View All News" />);

    const link = screen.getByText("View All News").closest("a") ?? container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("View All News");
  });

  it("renders regular variant with arrow icon", () => {
    const { container } = render(<LinkButton variant="regular" />);

    const link = screen.getByText("Read More").closest("a") ?? container.querySelector("a");
    const icon = link?.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renders featured variant without arrow icon", () => {
    const { container } = render(<LinkButton variant="featured" />);

    const link = screen.getByText("Read More").closest("a") ?? container.querySelector("a");
    expect(link).toHaveTextContent("Read More");
    expect(link?.querySelector("svg")).toBeNull();
  });

  it("uses custom href when provided", () => {
    render(<LinkButton href="/news" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/news");
  });

  it("applies custom className", () => {
    const { container } = render(<LinkButton className="custom-class" />);

    const link = screen.getByText("Read More").closest("a") ?? container.querySelector("a");
    expect(link).toHaveClass("custom-class");
  });

  it("regular variant has flex layout classes", () => {
    const { container } = render(<LinkButton variant="regular" />);

    const link = screen.getByText("Read More").closest("a") ?? container.querySelector("a");
    expect(link).toHaveClass("flex", "items-center", "justify-center");
  });
});
