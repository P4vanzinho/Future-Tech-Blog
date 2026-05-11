"use client";

import { Button } from "@/components/ui/button";
import type { ArticleCategoryFilterOption } from "@/services/types";

interface CategoryFilterButtonsRowProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categoryFilterOptions: ArticleCategoryFilterOption[];
}

export function CategoryFilterButtonsRow({
  selectedCategory,
  onCategorySelect,
  categoryFilterOptions,
}: CategoryFilterButtonsRowProps) {
  const options = [{ id: "all", label: "All" }, ...categoryFilterOptions];

  return (
    <div className="hidden w-full flex-wrap gap-[0.875rem] md:flex 2xl:gap-5">
      {options.map(({ id, label }) => {
        const isSelected = selectedCategory === label;
        return (
          <Button
            key={id}
            type="button"
            variant="outline"
            size="default"
            onClick={() => onCategorySelect(label)}
            className={`w-fit min-w-[9.375rem] rounded-lg border px-6 font-sans text-sm leading-[150%] font-medium tracking-[-0.03em] lg:py-6 2xl:py-[1.875rem] 2xl:text-[1.125rem] ${
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
