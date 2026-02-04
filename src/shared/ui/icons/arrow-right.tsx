import React from "react";

const ArrowRight = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_425_59)">
        <path
          d="M5 12L19 12"
          stroke="#0863AD"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13 6L19 12"
          stroke="#0863AD"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13 18L19 12"
          stroke="#0863AD"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_425_59">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(1.04907e-06 24) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRight;
