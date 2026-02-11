import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WelcomeToOurNewHubSection } from "../components/home/WelcomeToOurNewHub";

describe("Welcome to Our News Hub Section", () => {
  it("should render the section", () => {
    render(<WelcomeToOurNewHubSection />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Discover the World of Headlines",
    });
    const section = heading.closest("section");

    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe("SECTION");
  });

  it("should render the badge with text 'Welcome to Our News Hub'", () => {
    render(<WelcomeToOurNewHubSection />);

    const badge = screen.getByText("Welcome to Our News Hub", {
      selector: "h2",
    });

    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toBe("Welcome to Our News Hub");
  });

  it("should render the main heading 'Discover the World of Headlines'", () => {
    render(<WelcomeToOurNewHubSection />);

    const heading = screen.getByText("Discover the World of Headlines", {
      selector: "h1",
    });

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Discover the World of Headlines");
  });

  it("should render the View All News link button", () => {
    render(<WelcomeToOurNewHubSection />);

    const linkText = screen.getByText("View All News");
    const link = linkText.closest("a");

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("View All News");
  });

  it("should have full-bleed section classes (negative margins)", () => {
    render(<WelcomeToOurNewHubSection />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Discover the World of Headlines",
    });
    const section = heading.closest("section");

    expect(section).toHaveClass("-mx-4", "md:-mx-5", "lg:-mx-20", "2xl:-mx-40");
  });

  it("should have correct layout structure: badge, title, and button", () => {
    render(<WelcomeToOurNewHubSection />);

    expect(
      screen.getByText("Welcome to Our News Hub", { selector: "h2" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Discover the World of Headlines"
    );
    expect(screen.getByText("View All News").closest("a")).toBeInTheDocument();
  });
});
