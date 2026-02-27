import { LinkButton } from "../blog/LinkButton";

export function WelcomeToOurNewHubSection() {
  return (
    <section className="bg-dark-10 -mx-4 md:-mx-5 lg:-mx-20 2xl:-mx-40">
      <div className="flex flex-col px-4 py-10 lg:flex-row lg:px-20 lg:py-20 2xl:px-40 2xl:py-30">
        <div className="flex w-full flex-col justify-center gap-[1.875rem] lg:flex-row lg:justify-between lg:gap-0">
          <div className="flex flex-col gap-[0.625rem] 2xl:gap-4">
            <div className="bg-dark-20 max-w-[11.6875rem] rounded-md px-1 py-2 lg:max-w-[13.1875rem] 2xl:max-w-[16.5rem] 2xl:px-[0.625rem] 2xl:py-[0.375rem]">
              <h2 className="text-center font-sans text-sm leading-[150%] font-medium tracking-[-0.05rem] text-white lg:text-[1rem] 2xl:text-[1.25rem]">
                Welcome to Our News Hub
              </h2>
            </div>
            <h1 className="font-display text-[1.75rem] leading-[130%] font-medium tracking-[-0.03rem] text-white lg:text-[2.75rem] 2xl:text-[3.625rem]">
              Discover the World of Headlines
            </h1>
          </div>
          <div className="flex w-full items-center justify-center lg:max-w-[9.5625rem] 2xl:max-w-[12.0625rem]">
            <LinkButton variant="regular" text="View All News" href="/news" />
          </div>
        </div>
      </div>
    </section>
  );
}
