export function HeroSection() {
  return (
    <>
      <div className="flex flex-col gap-[0.875rem] py-10 lg:hidden lg:pt-20 2xl:pt-[8.125rem]">
        <h1 className="font-display text-[1.75rem] leading-[130%] font-medium text-white lg:text-[3.438rem]">
          Today&apos;s Headlines: Stay Informed
        </h1>
        <p className="text-grey-60 font-sans text-[0.875rem] leading-[150%]">
          Explore the latest news from around the world. We bring you
          up-to-the-minute updates on the most significant events, trends, and
          stories. Discover the world through our news coverage.
        </p>
      </div>
      <div className="hidden w-full flex-col gap-5 pb-[6.25rem] lg:flex lg:pt-20 2xl:pt-[8.125rem]">
        <span className="font-display text-[3.438rem] leading-[130%] font-medium text-white 2xl:text-[5rem]">
          Today&apos;s Headlines: Stay
        </span>
        <div className="flex items-center gap-[3.75rem] 2xl:gap-[5rem]">
          <span className="font-display text-[3.438rem] leading-[130%] font-medium text-white 2xl:text-[5rem]">
            Informed
          </span>
          <span className="text-grey-60 font-sans text-base leading-[150%] font-normal tracking-tighter 2xl:text-[1.125rem]">
            Explore the latest news from around the world. We bring you
            up-to-the-minute updates on the most significant events, trends, and
            stories. Discover the world through our news coverage.
          </span>
        </div>
      </div>
    </>
  );
}
