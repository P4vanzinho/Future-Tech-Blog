import type { ArticleMetadata as ArticleMetadataType } from "@/types/article";

interface ArticleMetadataProps {
  metadata: ArticleMetadataType;
  className?: string;
}

function MetadataField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-grey-60 text-[0.875rem] leading-[150%] tracking-[-0.03em]">
        {label}
      </span>
      <span className="text-[0.875rem] leading-[150%] font-medium tracking-[-0.03em] text-white">
        {value}
      </span>
    </div>
  );
}

export function ArticleMetadata({
  metadata,
  className = "",
}: ArticleMetadataProps) {
  return (
    <div className={`grid grid-cols-2 gap-x-8 gap-y-4 ${className}`}>
      <MetadataField
        label="Publication Date"
        value={metadata.publicationDate}
      />
      <MetadataField label="Category" value={metadata.category} />
      <MetadataField label="Reading Time" value={metadata.readingTime} />
      <MetadataField label="Author Name" value={metadata.authorName} />
    </div>
  );
}
