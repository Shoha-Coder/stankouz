"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import styles from "./image-with-loader.module.scss";

type Props = ImageProps & {
    wrapperClassName?: string;
    /** When true, wrapper fills its container (for aspect-ratio parents, etc) */
    fillWrapper?: boolean;
};

export default function ImageWithLoader({
    wrapperClassName,
    className,
    fillWrapper = false,
    ...props
}: Props) {
    const [isLoading, setIsLoading] = useState(true);

    const shouldFill = Boolean(props.fill) || fillWrapper || wrapperClassName;
    return (
        <div
            className={`${styles.wrapper} ${shouldFill ? styles.wrapperFill : ''} ${wrapperClassName || ''}`}
        >
            {isLoading && (
                <div className={styles.loader}>
                    <div className={styles.spinner} />
                </div>
            )}

            <Image
                {...props}
                className={`${className} ${isLoading ? styles.imageLoading : styles.imageLoaded}`}
                onLoadingComplete={() => setIsLoading(false)}
            />
        </div>
    );
}