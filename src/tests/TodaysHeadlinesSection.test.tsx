import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../components/home/HeroSection";

describe("Today's Headlines Section", () => {
  describe("Mobile Version", () => {
    it("should render the mobile title with correct text", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });

      expect(mobileTitle).toBeInTheDocument();
      expect(mobileTitle.textContent).toBe("Today's Headlines: Stay Informed");
    });

    it("should render the mobile title with correct typography classes", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });

      expect(mobileTitle).toHaveClass(
        "font-display",
        "text-[1.75rem]",
        "leading-[130%]",
        "font-medium",
        "text-white",
        "lg:text-[3.438rem]"
      );
    });

    it("should render the mobile description with correct text", () => {
      render(<HeroSection />);

      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );
      const mobileDescription = descriptions[0];

      expect(mobileDescription).toBeInTheDocument();
      expect(mobileDescription.textContent).toContain(
        "Explore the latest news from around the world"
      );
      expect(mobileDescription.textContent).toContain(
        "up-to-the-minute updates"
      );
      expect(mobileDescription.textContent).toContain(
        "Discover the world through our news coverage"
      );
    });

    it("should render the mobile description as a paragraph element", () => {
      render(<HeroSection />);

      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );
      const mobileDescription = descriptions[0];

      expect(mobileDescription.tagName).toBe("P");
    });

    it("should render the mobile description with correct typography classes", () => {
      render(<HeroSection />);

      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );
      const mobileDescription = descriptions[0];

      expect(mobileDescription).toHaveClass(
        "text-grey-60",
        "font-sans",
        "text-[0.875rem]",
        "leading-[150%]"
      );
    });

    it("should have correct container structure for mobile version", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });
      const mobileContainer = mobileTitle.parentElement;

      expect(mobileContainer).toBeInTheDocument();
      expect(mobileContainer?.tagName).toBe("DIV");
    });

    it("should have correct layout classes for mobile container", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });
      const mobileContainer = mobileTitle.parentElement;

      expect(mobileContainer).toHaveClass(
        "flex",
        "flex-col",
        "gap-[0.875rem]",
        "py-10",
        "lg:pt-20",
        "2xl:pt-[8.125rem]"
      );
    });

    it("should be hidden on large screens (lg:hidden)", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });
      const mobileContainer = mobileTitle.parentElement;

      expect(mobileContainer).toHaveClass("lg:hidden");
    });
  });

  describe("Desktop Version", () => {
    it("should render the desktop title first part with correct text", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");

      expect(desktopTitlePart1).toBeInTheDocument();
      expect(desktopTitlePart1.textContent).toBe("Today's Headlines: Stay");
    });

    it("should render the desktop title first part as a span element", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");

      expect(desktopTitlePart1.tagName).toBe("SPAN");
    });

    it("should render the desktop title first part with correct typography classes", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");

      expect(desktopTitlePart1).toHaveClass(
        "font-display",
        "text-[3.438rem]",
        "leading-[130%]",
        "font-medium",
        "text-white",
        "2xl:text-[5rem]"
      );
    });

    it("should render the desktop title second part with correct text", () => {
      render(<HeroSection />);

      const desktopTitlePart2 = screen.getByText("Informed");

      expect(desktopTitlePart2).toBeInTheDocument();
      expect(desktopTitlePart2.textContent).toBe("Informed");
    });

    it("should render the desktop title second part as a span element", () => {
      render(<HeroSection />);

      const desktopTitlePart2 = screen.getByText("Informed");

      expect(desktopTitlePart2.tagName).toBe("SPAN");
    });

    it("should render the desktop title second part with correct typography classes", () => {
      render(<HeroSection />);

      const desktopTitlePart2 = screen.getByText("Informed");

      expect(desktopTitlePart2).toHaveClass(
        "font-display",
        "text-[3.438rem]",
        "leading-[130%]",
        "font-medium",
        "text-white",
        "2xl:text-[5rem]"
      );
    });

    it("should render the desktop description with correct text", () => {
      render(<HeroSection />);

      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );
      const desktopDescription = descriptions[1];

      expect(desktopDescription).toBeInTheDocument();
      expect(desktopDescription.textContent).toContain(
        "Explore the latest news from around the world"
      );
    });

    it("should render the desktop description as a span element", () => {
      render(<HeroSection />);

      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );
      const desktopDescription = descriptions[1];

      expect(desktopDescription.tagName).toBe("SPAN");
    });

    it("should render the desktop description with correct typography classes", () => {
      render(<HeroSection />);

      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );
      const desktopDescription = descriptions[1];

      expect(desktopDescription).toHaveClass(
        "text-grey-60",
        "font-sans",
        "text-base",
        "leading-[150%]",
        "font-normal",
        "tracking-tighter",
        "2xl:text-[1.125rem]"
      );
    });

    it("should have correct container structure for desktop version", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");
      const desktopContainer = desktopTitlePart1.parentElement;

      expect(desktopContainer).toBeInTheDocument();
      expect(desktopContainer?.tagName).toBe("DIV");
    });

    it("should have correct layout classes for desktop container", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");
      const desktopContainer = desktopTitlePart1.parentElement;

      expect(desktopContainer).toHaveClass(
        "hidden",
        "w-full",
        "flex-col",
        "gap-5",
        "pb-[6.25rem]",
        "lg:flex"
      );
    });

    it("should have correct spacing classes for desktop container", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");
      const desktopContainer = desktopTitlePart1.parentElement;

      expect(desktopContainer).toHaveClass("lg:pt-20", "2xl:pt-[8.125rem]");
    });

    it("should have correct layout structure for desktop title section", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");
      const desktopContainer = desktopTitlePart1.parentElement;

      expect(desktopContainer?.children).toHaveLength(2);
      expect(desktopContainer?.children[0]).toBe(desktopTitlePart1);
    });

    it("should have correct flex layout for desktop title and description container", () => {
      render(<HeroSection />);

      const desktopTitlePart2 = screen.getByText("Informed");
      const flexContainer = desktopTitlePart2.parentElement;

      expect(flexContainer).toHaveClass(
        "flex",
        "items-center",
        "gap-[3.75rem]",
        "2xl:gap-[5rem]"
      );
    });

    it("should contain both title parts and description in the flex container", () => {
      render(<HeroSection />);

      const desktopTitlePart2 = screen.getByText("Informed");
      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );
      const desktopDescription = descriptions[1];
      const flexContainer = desktopTitlePart2.parentElement;

      expect(flexContainer).toContainElement(desktopTitlePart2);
      expect(flexContainer).toContainElement(desktopDescription);
      expect(flexContainer?.children).toHaveLength(2);
    });
  });

  describe("Responsive Behavior", () => {
    it("should render both mobile and desktop versions simultaneously", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });
      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");

      expect(mobileTitle).toBeInTheDocument();
      expect(desktopTitlePart1).toBeInTheDocument();
    });

    it("should have mobile version hidden on large screens", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });
      const mobileContainer = mobileTitle.parentElement;

      expect(mobileContainer).toHaveClass("lg:hidden");
    });

    it("should have desktop version hidden on small screens", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");
      const desktopContainer = desktopTitlePart1.parentElement;

      expect(desktopContainer).toHaveClass("hidden", "lg:flex");
    });
  });

  describe("Content Accuracy", () => {
    it("should render the exact title text in mobile version", () => {
      render(<HeroSection />);

      const mobileTitle = screen.getByText("Today's Headlines: Stay Informed", {
        selector: "h1",
      });

      expect(mobileTitle.textContent).toBe("Today's Headlines: Stay Informed");
    });

    it("should split the title correctly in desktop version", () => {
      render(<HeroSection />);

      const desktopTitlePart1 = screen.getByText("Today's Headlines: Stay");
      const desktopTitlePart2 = screen.getByText("Informed");

      expect(desktopTitlePart1.textContent).toBe("Today's Headlines: Stay");
      expect(desktopTitlePart2.textContent).toBe("Informed");
    });

    it("should render the same description text in both versions", () => {
      render(<HeroSection />);

      const descriptions = screen.getAllByText(
        /Explore the latest news from around the world/i
      );

      expect(descriptions).toHaveLength(2);
      expect(descriptions[0].textContent).toBe(descriptions[1].textContent);
    });
  });
});
