interface MetadataItemProps {
  label: string;
  value?: string;
}

export function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <div className="flex flex-col lg:gap-1">
      <span className="text-grey-60 font-sans text-[0.875rem] leading-[150%] lg:text-[1rem] 2xl:text-[1.125rem]">
        {label}
      </span>
      <span className="font-sans text-[0.875rem] leading-[150%] text-white lg:text-[1rem] 2xl:text-[1.125rem]">
        {value}
      </span>
    </div>
  );
}
