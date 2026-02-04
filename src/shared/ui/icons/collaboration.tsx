interface CollaborationIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export default function CollaborationIcon({ className, width = 24, height = 24 }: CollaborationIconProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle opacity="0.4" cx="35" cy="18.6667" r="7" fill="#005AC2" />
            <path d="M35.0005 30.333C42.7321 30.3331 49.0001 33.4672 49.0005 37.333C49.0005 40.7546 44.0902 43.6013 37.6011 44.2109C38.916 42.866 39.6664 41.3171 39.6665 39.667C39.6665 35.6971 35.3289 32.3081 29.2144 30.959C30.9779 30.5582 32.9371 30.333 35.0005 30.333Z" fill="#005AC2" />
            <ellipse opacity="0.4" cx="23.3333" cy="39.6666" rx="16.3333" ry="9.33333" fill="#005AC2" stroke="#005AC2" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="23.3333" cy="16.3333" r="9.33333" fill="#005AC2" stroke="#005AC2" strokeWidth="4" strokeLinejoin="round" />
        </svg>

    );
}

