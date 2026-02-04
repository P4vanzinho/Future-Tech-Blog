import { LinkButton } from "../blog/LinkButton";

export function WelcomeToOurNewHub() {
  return (
    <section className="bg-dark-10 -mx-4 py-10 md:-mx-5 lg:-mx-20 lg:py-[3.75rem] 2xl:-mx-40 2xl:py-[5rem]">
      <div className="flex flex-col px-4 py-10 lg:flex-row lg:px-20 lg:py-20 2xl:px-40 2xl:py-30">
        <div className="flex w-full flex-col justify-center gap-[30px] lg:flex-row lg:justify-between lg:gap-0">
          <div className="flex flex-col gap-[10px] 2xl:gap-4">
            <div className="bg-dark-20 max-w-[187px] rounded-md px-1 py-2 lg:max-w-[211px] 2xl:max-w-[264px] 2xl:px-[10px] 2xl:py-[6px]">
              <h2 className="text-center font-sans text-sm leading-[150%] font-medium tracking-[-0.05rem] text-white lg:text-[16px] 2xl:text-[20px]">
                Welcome to Our News Hub
              </h2>
            </div>
            <h1 className="font-display text-[28px] leading-[130%] font-medium tracking-[-0.03rem] text-white lg:text-[44px] 2xl:text-[58px]">
              Discover the World of Headlines
            </h1>
          </div>
          <div className="flex w-full items-center justify-center lg:max-w-[153px] 2xl:max-w-[193px]">
            <LinkButton variant="regular" text="View All News" />
          </div>
        </div>
      </div>
    </section>
  );
}
