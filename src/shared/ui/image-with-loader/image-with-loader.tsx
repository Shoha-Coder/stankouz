"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import styles from "./image-with-loader.module.scss";

type BaseProps = {
    wrapperClassName?: string;
    /** When true, wrapper fills its container (for aspect-ratio parents, etc) */
    fillWrapper?: boolean;
};

type Props = ImageProps & BaseProps & {
    /** When provided with srcSet, uses native img for responsive images */
    srcSet?: string;
    sizes?: string;
};

export default function ImageWithLoader({
    wrapperClassName,
    className,
    fillWrapper = false,
    srcSet,
    sizes,
    ...props
}: Props) {
    const [isLoading, setIsLoading] = useState(true);

    const shouldFill = Boolean(props.fill) || fillWrapper || wrapperClassName;

    if (srcSet) {
        const srcStr = typeof props.src === "string" ? props.src : (props.src as { src: string }).src;
        return (
            <div
                className={`${styles.wrapper} ${shouldFill ? styles.wrapperFill : ""} ${wrapperClassName || ""}`}
            >
                {isLoading && (
                    <div className={styles.loader}>
                        <div className={styles.spinner} />
                    </div>
                )}
                <img
                    src={srcStr}
                    alt={props.alt ?? ""}
                    srcSet={srcSet}
                    sizes={sizes}
                    width={props.width}
                    height={props.height}
                    className={`${className ?? ""} ${isLoading ? styles.imageLoading : styles.imageLoaded}`}
                    onLoad={() => setIsLoading(false)}
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <div
            className={`${styles.wrapper} ${shouldFill ? styles.wrapperFill : ""} ${wrapperClassName || ""}`}
        >
            {isLoading && (
                <div className={styles.loader}>
                    <div className={styles.spinner} />
                </div>
            )}

            <Image
                {...props}
                alt={props.alt ?? ""}
                className={`${className} ${isLoading ? styles.imageLoading : styles.imageLoaded}`}
                onLoadingComplete={() => setIsLoading(false)}
            />
        </div>
    );
}