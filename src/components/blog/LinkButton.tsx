import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
import { ArrowRightIcon } from "@/components/common/icons/ArrowRightIcon";
import { cn } from "@/lib/utils";

interface LinkButtonProps
  extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "featured" | "regular";
  text?: string;
}

export function LinkButton({
  variant = "featured",
  className,
  text = "Read More",
  children,
  ...props
}: LinkButtonProps) {
  const isRegular = variant === "regular";

  return (
    <Link
      className={cn(
        "bg-dark-08 border-dark-15 flex flex-1 items-center justify-center gap-1 rounded-lg border px-4 py-[0.875rem] whitespace-nowrap lg:py-[0.90625rem] xl:gap-1 2xl:gap-[0.625rem] 2xl:py-[1.125rem]",
        className
      )}
      {...props}
    >
      <span className="text-grey-60 font-sans text-[0.875rem] leading-[150%] 2xl:text-[1.125rem]">
        {children || text}
      </span>
      {isRegular && <ArrowRightIcon className="h-5 w-5 2xl:h-6 2xl:w-6" />}
    </Link>
  );
}
