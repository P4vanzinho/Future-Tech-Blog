import type { SVGProps } from "react";

export function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      {...(!props.className && {
        width: props.width ?? 18,
        height: props.height ?? 18,
      })}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M9 3.75V14.25M9 14.25L4.5 9.75M9 14.25L13.5 9.75"
        stroke={props.stroke ?? "#666666"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
