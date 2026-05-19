"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { ArticleCategoryFilterOption } from "@/services/types";

interface CategoryFilterCarouselMobileProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categoryFilterOptions: ArticleCategoryFilterOption[];
}

export function CategoryFilterCarouselMobile({
  selectedCategory,
  onCategorySelect,
  categoryFilterOptions,
}: CategoryFilterCarouselMobileProps) {
  const options = [{ id: "all", label: "All" }, ...categoryFilterOptions];

  return (
    <div className="w-full md:hidden">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0 gap-[0.875rem]">
          {options.map(({ id, label }) => {
            const isSelected = selectedCategory === label;
            return (
              <CarouselItem
                key={id}
                className="min-w-[9.375rem] shrink-0 basis-[9.375rem] pl-0"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={() => onCategorySelect(label)}
                  className={`h-full w-[9.375rem] min-w-[9.375rem] rounded-lg border font-sans text-sm leading-[150%] font-medium tracking-[-0.03em] whitespace-nowrap ${
                    isSelected
                      ? "border-dark-20 bg-dark-10 hover:bg-dark-10 text-white"
                      : "border-dark-20 bg-dark-15 text-grey-60 hover:bg-dark-20"
                  }`}
                >
                  {label}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
