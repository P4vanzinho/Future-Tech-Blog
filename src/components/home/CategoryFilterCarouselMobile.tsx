"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  ARTICLE_FILTER_CATEGORIES,
  type ArticleFilterCategory,
} from "@/constants/postCategories";

const DEFAULT_SELECTED: ArticleFilterCategory = "All";

export function CategoryFilterCarouselMobile() {
  const [selected, setSelected] =
    useState<ArticleFilterCategory>(DEFAULT_SELECTED);

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
          {ARTICLE_FILTER_CATEGORIES.map((label: ArticleFilterCategory) => {
            const isSelected = selected === label;
            return (
              <CarouselItem
                key={label}
                className="min-w-[9.375rem] shrink-0 basis-[9.375rem] pl-0"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={() => setSelected(label)}
                  className={`h-full w-[9.375rem] min-w-[9.375rem] rounded-lg border font-sans font-medium leading-[150%] tracking-[-0.03em] whitespace-nowrap text-sm ${
                    isSelected
                      ? "border-dark-20 bg-dark-10 text-white hover:bg-dark-10"
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
