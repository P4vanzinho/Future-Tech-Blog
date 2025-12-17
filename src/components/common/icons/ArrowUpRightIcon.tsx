import type { IconProps } from "../types/Icon.type";

export function ArrowUpRightIcon({
  className,
  fill = "#FFD11A",
  width = 24,
  height = 24,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
