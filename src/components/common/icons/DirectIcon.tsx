import type { SVGProps } from "react";

export function DirectIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M6.12726 9.27085L1.23851 7.04869C0.565704 6.74287 0.594409 5.77756 1.2842 5.51226L13.5119 0.809316C14.1858 0.550104 14.848 1.2123 14.5888 1.88625L9.88585 14.1139C9.62054 14.8037 8.65524 14.8324 8.34942 14.1596L6.12726 9.27085ZM6.12726 9.27085L9.78121 5.61701"
        stroke={props.stroke ?? "#666666"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
