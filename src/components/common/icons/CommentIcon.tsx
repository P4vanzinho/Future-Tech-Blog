import type { SVGProps } from "react";

export function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      {...(!props.className && {
        width: props.width ?? 15,
        height: props.height ?? 15,
      })}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M4.48817 13.4073C5.37214 13.8403 6.36602 14.0833 7.41667 14.0833C11.0986 14.0833 14.0833 11.0986 14.0833 7.41667C14.0833 3.73477 11.0986 0.75 7.41667 0.75C3.73477 0.75 0.75 3.73477 0.75 7.41667C0.75 8.78345 1.1613 10.0542 1.86688 11.1117M4.48817 13.4073L0.75 14.0833L1.86688 11.1117M4.48817 13.4073L4.49359 13.4064M1.86688 11.1117L1.86795 11.109"
        stroke={props.stroke ?? "#666666"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
