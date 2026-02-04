interface PricingIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export default function PricingIcon({ className, width = 24, height = 24 }: PricingIconProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M28 7C30.5774 7 32.6667 9.08934 32.6667 11.6667L32.6667 44.3333C32.6667 46.9107 30.5774 49 28 49C25.4227 49 23.3334 46.9107 23.3334 44.3333L23.3334 11.6667C23.3334 9.08934 25.4227 7 28 7Z" fill="#005AC2" />
            <path opacity="0.4" d="M9.33329 28C11.9106 28 14 30.0893 14 32.6667L14 44.3333C14 46.9107 11.9106 49 9.33329 49C6.75596 49 4.66663 46.9107 4.66663 44.3333L4.66663 32.6667C4.66663 30.0893 6.75596 28 9.33329 28Z" fill="#005AC2" />
            <path opacity="0.4" d="M46.6667 18.6667C49.244 18.6667 51.3333 20.7561 51.3333 23.3334L51.3333 44.3334C51.3333 46.9107 49.244 49.0001 46.6667 49.0001C44.0893 49.0001 42 46.9107 42 44.3334L42 23.3334C42 20.7561 44.0893 18.6667 46.6667 18.6667Z" fill="#005AC2" />
        </svg>

    );
}

