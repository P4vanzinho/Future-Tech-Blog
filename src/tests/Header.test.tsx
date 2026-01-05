import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../components/block/Header";

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("should render the logo svg", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const logoSvg = header.querySelector("svg");
    expect(logoSvg).toBeInTheDocument();
  });

  it("should have responsive classes for mobile", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const container = header.querySelector("div");

    expect(container).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "gap-2"
    );
  });

  it("should have responsive classes for large screens (lg)", () => {
    render(<Header />);

    const container = screen.getByRole("banner").querySelector("div");

    expect(container).toHaveClass("lg:gap-3", "lg:pl-20", "lg:justify-start");
  });

  it("should have responsive logo size classes", () => {
    render(<Header />);

    const icon = screen.getByRole("banner").querySelector("svg");

    expect(icon).toHaveClass(
      "h-[2.188rem]",
      "w-[7.875rem]",
      "lg:h-10",
      "lg:w-36",
      "2xl:h-[3.125rem]",
      "2xl:w-[11.25rem]"
    );
  });

  it("should have correct background color class", () => {
    render(<Header />);

    const container = screen.getByRole("banner").querySelector("div");

    expect(container).toHaveClass("bg-dark-10");
  });

  it("should have correct spacing classes", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const container = header.querySelector("div");

    expect(header).toHaveClass("w-full", "flex", "flex-col");
    expect(container).toHaveClass("py-5");
  });
});
