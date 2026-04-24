export function PostSkeleton() {
  return (
    <div className="flex flex-col py-10 lg:h-full lg:py-[3.75rem] 2xl:py-[5rem]">
      <div className="bg-dark-15 h-[13.3125rem] w-full animate-pulse rounded-lg lg:h-[13.3125rem] lg:flex-shrink-0" />
      <div className="flex flex-col gap-2 pt-4 pb-1">
        <div className="bg-dark-15 h-6 w-3/4 animate-pulse rounded" />
      </div>
      <div className="flex gap-5 pb-[1.125rem]">
        <div className="bg-dark-15 h-4 w-20 animate-pulse rounded" />
      </div>
      <div className="flex items-center justify-between gap-[50px] lg:mt-auto">
        <div className="flex items-center gap-2 2xl:gap-[50px]">
          <div className="bg-dark-15 h-8 w-16 animate-pulse rounded-full lg:h-8 lg:w-[4.5rem] 2xl:h-10 2xl:w-20" />
          <div className="bg-dark-15 h-8 w-12 animate-pulse rounded-full lg:h-8 lg:w-[3.5rem] 2xl:h-10 2xl:w-16" />
        </div>
        <div className="bg-dark-15 h-10 w-[7.5rem] animate-pulse rounded-lg whitespace-nowrap lg:h-[0.90625rem] lg:w-[13.625rem] 2xl:h-[1.125rem] 2xl:w-[19.375rem]" />
      </div>
    </div>
  );
}
