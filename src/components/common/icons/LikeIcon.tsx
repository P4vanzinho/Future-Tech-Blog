import type { SVGProps } from "react";

export function LikeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      {...(!props.className && {
        width: props.width ?? 20,
        height: props.height ?? 20,
      })}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M9.99935 5.08672C10.5416 4.45703 11.4798 3.75 12.9082 3.75C15.4063 3.75 17.0827 6.07813 17.0827 8.24609C17.0827 12.7781 11.3987 16.25 9.99935 16.25C8.6 16.25 2.91602 12.7781 2.91602 8.24609C2.91602 6.07813 4.5924 3.75 7.09046 3.75C8.51893 3.75 9.45708 4.45703 9.99935 5.08672Z"
        stroke={props.stroke ?? "#666666"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
