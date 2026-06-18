"use client";

import { useState } from "react";
import { ArrowDownIcon } from "@/components/common/icons/ArrowDownIcon";
import type { ArticleBodyProps } from "./types";

export function ArticleBody({ children }: ArticleBodyProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="order-2 min-w-0 lg:order-1">
      <div
        className={`relative ${!isExpanded ? "max-h-[49rem] overflow-hidden lg:max-h-none lg:overflow-visible" : ""}`}
      >
        <div className="pt-20 lg:px-20 lg:pb-20">{children}</div>

        {!isExpanded && (
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-[13.4375rem]"
            style={{
              background:
                "linear-gradient(180deg, rgba(20, 20, 20, 0) -19.6%, var(--color-dark-08) 62.86%)",
            }}
          >
            <div className="pointer-events-auto absolute top-[6.125rem] right-0 left-0 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="bg-dark-08 border-dark-15 text-grey-60 hover:text-grey-90 inline-flex w-[10.125rem] items-center justify-center gap-1 rounded-lg border px-4 py-[0.875rem] text-[0.875rem] leading-[150%] transition-colors"
              >
                Read Full Blog
                <ArrowDownIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
