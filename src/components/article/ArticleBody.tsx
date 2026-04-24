"use client";

import { ArrowDownIcon } from "@/components/common/icons/ArrowDownIcon";
import type { ArticleSection } from "@/types/article";

interface ArticleBodyProps {
  sections: ArticleSection[];
  isExpanded: boolean;
  onExpand: () => void;
}

export function ArticleBody({
  sections,
  isExpanded,
  onExpand,
}: ArticleBodyProps) {
  return (
    <div className="order-2 min-w-0 lg:order-1">
      <div
        className={`relative ${!isExpanded ? "max-h-[49rem] overflow-hidden lg:max-h-none lg:overflow-visible" : ""}`}
      >
        <div className="flex flex-col gap-10">
          {sections.map((section, index) => (
            <div key={section.id}>
              <article
                id={section.id}
                className={`scroll-mt-28 lg:pr-20 lg:pl-20 ${index === 0 ? "pt-20 lg:pb-20" : ""}`}
              >
                <h2 className="text-[1.125rem] leading-[150%] font-medium tracking-[-0.03em] text-white">
                  {section.title}
                </h2>
                <p className="text-grey-60 mt-4 text-[0.875rem] leading-[150%] tracking-[-0.03em]">
                  {section.content}
                </p>
              </article>
              {index === 0 && (
                <div
                  aria-hidden="true"
                  className="bg-dark-15 mt-0 mb-10 h-px w-full lg:-ml-20 lg:w-[calc(100%+5rem)]"
                />
              )}
            </div>
          ))}
        </div>

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
                onClick={onExpand}
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
