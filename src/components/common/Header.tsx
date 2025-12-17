import { PlusIcon } from "./icons/PlusIcon";

export function Header() {
  return (
    <header className="w-full pb-5 flex flex-col gap ">
      <div className="flex items-center justify-center gap-2 lg:gap-3 bg-dark-10 py-5 lg:pl-20 lg:justify-start">
        <PlusIcon className="w-[2.188rem] h-[2.188rem] lg:w-10 lg:h-10 2xl:w-[3.125rem] 2xl:h-[3.125rem]" />
        <span className="text-white font-display text-xs font-bold lg:text-sm 2xl:text-[1.125rem]">
          FutureTech
        </span>
      </div>
    </header>
  );
}
