import type { ElementType } from "react";
import type { ArticleMetadataProps, MetadataFieldProps } from "./types";

function MetadataField({
  label,
  value,
  valueHeadingLevel,
}: MetadataFieldProps) {
  const ValueHeadingTag = valueHeadingLevel as ElementType;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-grey-60 text-[0.875rem] leading-[150%] tracking-[-0.03em]">
        {label}
      </span>
      <ValueHeadingTag className="text-[0.875rem] leading-[150%] font-medium tracking-[-0.03em] text-white">
        {value}
      </ValueHeadingTag>
    </div>
  );
}

export function ArticleMetadata({
  metadata,
  className = "",
  valueHeadingLevel = "h3",
}: ArticleMetadataProps) {
  return (
    <div className={`grid grid-cols-2 gap-x-8 gap-y-4 ${className}`}>
      <MetadataField
        label="Publication Date"
        value={metadata.publicationDate}
        valueHeadingLevel={valueHeadingLevel}
      />
      <MetadataField
        label="Category"
        value={metadata.category}
        valueHeadingLevel={valueHeadingLevel}
      />
      <MetadataField
        label="Reading Time"
        value={metadata.readingTime}
        valueHeadingLevel={valueHeadingLevel}
      />
      <MetadataField
        label="Author Name"
        value={metadata.authorName}
        valueHeadingLevel={valueHeadingLevel}
      />
    </div>
  );
}
