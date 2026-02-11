import type { SVGProps } from "react";

interface LikeIconProps extends SVGProps<SVGSVGElement> {
  filled?: boolean;
}

export function LikeIcon({ filled = false, ...props }: LikeIconProps) {
  const strokeColor = filled ? "#FF6B35" : (props.stroke ?? "#666666");
  const fillColor = filled ? "#FF6B35" : "none";

  return (
    <svg
      {...props}
      {...(!props.className && {
        width: props.width ?? 18,
        height: props.height ?? 17,
      })}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M8.57914 15.6755L8.5737 15.6726L8.55482 15.6624C8.53875 15.6537 8.51576 15.6411 8.48631 15.6246C8.42743 15.5918 8.3427 15.5437 8.2358 15.4808C8.02208 15.355 7.71931 15.1699 7.35712 14.9291C6.63395 14.4484 5.66768 13.7417 4.69883 12.8386C2.78151 11.0513 0.75 8.39592 0.75 5.125C0.75 2.68495 2.803 0.75 5.28125 0.75C6.73865 0.75 8.0436 1.41591 8.875 2.45966C9.7064 1.41591 11.0113 0.75 12.4688 0.75C14.947 0.75 17 2.68495 17 5.125C17 8.39592 14.9685 11.0513 13.0512 12.8386C12.0823 13.7417 11.116 14.4484 10.3929 14.9291C10.0307 15.1699 9.72792 15.355 9.5142 15.4808C9.4073 15.5437 9.32257 15.5918 9.26369 15.6246C9.23424 15.6411 9.21125 15.6537 9.19518 15.6624L9.1763 15.6726L9.17086 15.6755L9.16856 15.6768C8.98526 15.7741 8.76474 15.7741 8.58144 15.6768L8.57914 15.6755Z"
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
