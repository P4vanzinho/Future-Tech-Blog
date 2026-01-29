import { ReactNode } from "react";

interface SocialStatButtonProps {
  icon: ReactNode;
  value: string;
}

export function SocialStatButton({ icon, value }: SocialStatButtonProps) {
  return (
    <div className="bg-dark-10 border-dark-15 flex items-center gap-1 rounded-full border px-[0.875rem] py-[0.375rem] 2xl:px-[1rem] 2xl:py-[0.5rem]">
      {icon}
      <span className="text-grey-60 font-display text-[0.875rem] leading-[150%] 2xl:text-[1.125rem]">
        {value}
      </span>
    </div>
  );
}
