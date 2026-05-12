"use client";

import { useMemo, useState } from "react";
import type { ArticleTableOfContentsProps } from "./types";

export function ArticleTableOfContents({
  headings,
}: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  const headingIds = useMemo(
    () => new Set(headings.map((heading) => heading.id)),
    [headings]
  );

  const handleAnchorClick = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Table of Contents"
      className="flex flex-col gap-3 lg:px-10 lg:pt-[50px] 2xl:px-20"
    >
      <h3 className="text-[1rem] leading-[150%] tracking-[-0.03em] text-white">
        Table of Contents
      </h3>
      <ul className="bg-dark-10 flex flex-col gap-4 rounded-[0.625rem] px-[1.125rem] py-[1.125rem]">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={() => handleAnchorClick(heading.id)}
              className={`w-full cursor-pointer text-left text-[0.875rem] leading-[150%] tracking-[-0.03em] transition-colors ${
                activeId === heading.id
                  ? "text-white"
                  : "text-grey-60 hover:text-grey-90"
              }`}
              aria-current={activeId === heading.id ? "true" : undefined}
              disabled={!headingIds.has(heading.id)}
            >
              • {heading.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
