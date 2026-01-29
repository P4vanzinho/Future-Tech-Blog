export function FeaturedPostSkeleton() {
  return (
    <div className="flex flex-col gap-6 py-10 lg:flex-row lg:items-stretch lg:gap-8 lg:py-[3.75rem] 2xl:justify-between 2xl:py-[5rem]">
      <div className="w-full lg:w-[30rem] lg:flex-shrink-0 2xl:w-[34%]">
        <div className="bg-dark-15 h-[13.3125rem] w-full animate-pulse rounded-lg lg:h-full" />
      </div>
      <div className="flex w-full flex-1 flex-col lg:gap-10 2xl:gap-[3.125rem]">
        <div>
          <div className="flex flex-col gap-[0.875rem] py-[1.875rem] lg:py-0 lg:pt-5 lg:pb-10 2xl:gap-[1.875rem] 2xl:pb-[3.125rem]">
            <div className="bg-dark-15 h-6 w-3/4 animate-pulse rounded lg:h-7 2xl:h-8" />
            <div className="bg-dark-15 h-4 w-full animate-pulse rounded lg:h-5 2xl:h-5" />
            <div className="bg-dark-15 h-4 w-5/6 animate-pulse rounded lg:h-5 2xl:h-5" />
          </div>
          <div className="flex gap-5 pb-[1.875rem] md:pb-0 lg:gap-[1.875rem] 2xl:gap-[3.125rem]">
            <div className="flex flex-col gap-2">
              <div className="bg-dark-15 h-4 w-16 animate-pulse rounded lg:w-20 2xl:w-24" />
              <div className="bg-dark-15 h-4 w-20 animate-pulse rounded lg:w-24 2xl:w-28" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-dark-15 h-4 w-24 animate-pulse rounded lg:w-28 2xl:w-32" />
              <div className="bg-dark-15 h-4 w-28 animate-pulse rounded lg:w-32 2xl:w-36" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-dark-15 h-4 w-16 animate-pulse rounded lg:w-20 2xl:w-24" />
              <div className="bg-dark-15 h-4 w-24 animate-pulse rounded lg:w-28 2xl:w-32" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 2xl:gap-[0.625rem]">
            <div className="bg-dark-15 h-8 w-16 animate-pulse rounded-full lg:h-8 lg:w-[4.5rem] 2xl:h-10 2xl:w-20" />
            <div className="bg-dark-15 h-8 w-12 animate-pulse rounded-full lg:h-8 lg:w-[3.5rem] 2xl:h-10 2xl:w-16" />
          </div>
          <div className="bg-dark-15 h-10 w-24 animate-pulse rounded-lg lg:h-10 lg:w-20 2xl:h-11 2xl:w-24" />
        </div>
      </div>
    </div>
  );
}
