import type { SVGProps } from "react";

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke={props.stroke ?? "#FFD11A"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
