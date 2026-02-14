import React from "react";

const HamburgerIcon = ({
  className,
  open,
}: {
  className?: string;
  open?: boolean;
}) => {
  return (
    <>
      {!open ? (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <g clip-path="url(#clip0_626_1843)">
            <path d="M5.33337 8H26.6667" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.33337 16H26.6667" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.3334 24H26.6667" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_626_1843">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <g clip-path="url(#clip0_630_2481)">
            <path d="M24 8L8 24" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 8L24 24" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_630_2481">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
};

export default HamburgerIcon;
