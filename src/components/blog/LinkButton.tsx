import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/icons/ArrowRightIcon";

interface LinkButtonProps {
  href?: string;
  variant?: "featured" | "regular";
  className?: string;
  text?: string;
}

export function LinkButton({
  href = "",
  variant = "featured",
  className = "",
  text = "Read More",
}: LinkButtonProps) {
  const isRegular = variant === "regular";

  if (isRegular) {
    return (
      <Link
        href={href}
        className={`bg-dark-08 border-dark-15 flex flex-1 items-center justify-center gap-1 rounded-lg border px-4 py-[0.875rem] whitespace-nowrap lg:py-[0.90625rem] xl:gap-1 2xl:gap-[0.625rem] 2xl:py-[1.125rem] ${className}`.trim()}
      >
        <span className="text-grey-60 font-sans text-[0.875rem] leading-[150%] 2xl:text-[1.125rem]">
          {text}
        </span>
        <ArrowRightIcon className="h-5 w-5 2xl:h-6 2xl:w-6" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`bg-dark-08 border-dark-15 flex items-center justify-center rounded-lg border px-[1.875rem] py-[0.875rem] whitespace-nowrap lg:px-5 lg:py-[0.875rem] 2xl:px-[1.5rem] 2xl:py-[1.125rem] ${className}`.trim()}
    >
      <span className="text-grey-60 font-sans text-[0.875rem] leading-[150%] 2xl:text-[1.125rem]">
        {text}
      </span>
    </Link>
  );
}
