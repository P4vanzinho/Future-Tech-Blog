"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ARTICLE_FILTER_CATEGORIES,
  type ArticleFilterCategory,
} from "@/constants/postCategories";

const DEFAULT_SELECTED: ArticleFilterCategory = "All";

export function CategoryFilterButtonsRow() {
  const [selected, setSelected] =
    useState<ArticleFilterCategory>(DEFAULT_SELECTED);

  return (
    <div className="hidden w-full flex-nowrap gap-[0.875rem] md:flex 2xl:gap-5">
      {ARTICLE_FILTER_CATEGORIES.map((label) => {
        const isSelected = selected === label;
        return (
          <Button
            key={label}
            type="button"
            variant="outline"
            size="default"
            onClick={() => setSelected(label)}
            className={`min-w-0 flex-1 rounded-lg border font-sans text-sm leading-[150%] font-medium tracking-[-0.03em] lg:py-6 2xl:py-[1.875rem] 2xl:text-[1.125rem] ${
              isSelected
                ? "border-dark-20 bg-dark-10 hover:bg-dark-10 text-white"
                : "border-dark-20 bg-dark-15 text-grey-60 hover:bg-dark-20"
            }`}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
