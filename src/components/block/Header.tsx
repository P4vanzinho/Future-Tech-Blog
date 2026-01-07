import { FutureTechIcon } from "@/components/common/icons/FutureTechIcon";

export function Header() {
  return (
    <header className="flex w-full flex-col">
      <div className="bg-dark-10 flex items-center justify-center gap-2 py-5 lg:justify-start lg:gap-3 lg:pl-20 2xl:pl-[10rem]">
        <FutureTechIcon className="h-[2.188rem] w-[7.875rem] lg:h-10 lg:w-36 2xl:h-[3.125rem] 2xl:w-[11.25rem]" />
      </div>
    </header>
  );
}
