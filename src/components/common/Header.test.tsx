import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("should display the FutureTech logo text", () => {
    render(<Header />);

    const logo = screen.getByText("FutureTech");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("text-white", "font-display", "font-bold");
  });

  it("should render the PlusIcon", () => {
    render(<Header />);

    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should have responsive classes for mobile", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const container = header.querySelector("div");

    expect(container).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "gap-2",
    );
  });

  it("should have responsive classes for large screens (lg)", () => {
    render(<Header />);

    const container = screen.getByRole("banner").querySelector("div");

    expect(container).toHaveClass("lg:gap-3", "lg:pl-20", "lg:justify-start");
  });

  it("should have responsive text size classes", () => {
    render(<Header />);

    const logo = screen.getByText("FutureTech");

    expect(logo).toHaveClass("text-xs", "lg:text-sm", "2xl:text-[1.125rem]");
  });

  it("should have responsive icon size classes", () => {
    render(<Header />);

    const icon = document.querySelector("svg");

    expect(icon).toHaveClass(
      "w-[2.188rem]",
      "h-[2.188rem]",
      "lg:w-10",
      "lg:h-10",
      "2xl:w-[3.125rem]",
      "2xl:h-[3.125rem]",
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

    expect(header).toHaveClass("w-full", "pb-5", "flex", "flex-col");
    expect(container).toHaveClass("py-5");
  });
});
