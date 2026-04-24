import type { SVGProps } from "react";

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      {...(!props.className && {
        width: props.width ?? 16,
        height: props.height ?? 16,
      })}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M0.666504 8.00016C1.55551 5.31898 4.08554 3.3335 7.07988 3.3335C10.0742 3.3335 12.6042 5.31898 13.4932 8.00016C12.6042 10.6813 10.0742 12.6668 7.07988 12.6668C4.08554 12.6668 1.55551 10.6813 0.666504 8.00016Z"
        stroke={props.stroke ?? "#666666"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="7.07992"
        cy="8.00016"
        r="1.66667"
        stroke={props.stroke ?? "#666666"}
        strokeWidth="1.5"
      />
    </svg>
  );
}
