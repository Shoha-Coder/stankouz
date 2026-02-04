interface CheckmarkIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export default function CheckmarkIcon({ className, width = 22, height = 22 }: CheckmarkIconProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M15.75 2.08782C14.2791 1.23697 12.5714 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75C20.75 9.51868 20.5275 8.33934 20.1204 7.25M5.75 8.75L9.27642 11.5711C10.1037 12.233 11.3036 12.1348 12.0124 11.3473L19.75 2.75"
                stroke="#005AC2"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
