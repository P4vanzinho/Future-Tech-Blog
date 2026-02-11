import { ReactNode } from "react";

interface SocialStatButtonProps {
  icon: ReactNode;
  value: string;
  /** When true, background and border are transparent (e.g. for like button when not liked). */
  transparent?: boolean;
  /** When provided, renders as button and calls on click. */
  onClick?: () => void;
}

export function SocialStatButton({
  icon,
  value,
  transparent = false,
  onClick,
}: SocialStatButtonProps) {
  const baseClasses = `flex items-center gap-1 rounded-full border px-[0.875rem] py-[0.375rem] 2xl:px-[1rem] 2xl:py-[0.5rem] ${
    transparent
      ? "border-transparent bg-transparent"
      : "border-dark-15 bg-dark-10"
  }`;

  const interactiveClasses = onClick
    ? "cursor-pointer transition-opacity hover:opacity-80"
    : "";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${interactiveClasses}`}
        aria-pressed={!transparent}
      >
        {icon}
        <span className="text-grey-60 font-display text-[0.875rem] leading-[150%] xl:text-[1.125rem]">
          {value}
        </span>
      </button>
    );
  }

  return (
    <div className={baseClasses}>
      {icon}
      <span className="text-grey-60 font-display text-[0.875rem] leading-[150%] xl:text-[1.125rem]">
        {value}
      </span>
    </div>
  );
}
