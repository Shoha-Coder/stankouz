"use client";

import { useState } from "react";
import styles from "./services.module.scss";
import { useServices } from "@/entities/service";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { useTranslations } from "next-intl";
import ScrollStack, { ScrollStackItem } from "@/shared/ui/scroll-stack/scroll-stack";
import { Skeleton } from "@/shared/ui/skeleton";

const TRUNCATE_LENGTH = 250;

export function Services() {
    const t = useTranslations("home");
    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
    const { data, isPending } = useServices();
    const services = data?.data;

    const showSkeleton = isPending || !services?.length;

    if (showSkeleton) {
        return (
            <section className={styles.services}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t("service")}</h2>
                    <p className={styles.subtitle}>{t("service-title")}</p>
                </div>
                <div className={styles.skeletonList}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={styles.row}>
                            <Skeleton className={styles.skeletonImage} />
                            <div className={styles.textBlock}>
                                <Skeleton className={styles.skeletonTitle} />
                                <Skeleton className={styles.skeletonShort} />
                            </div>
                            <div className={styles.descBlock}>
                                <Skeleton className={styles.skeletonLine} />
                                <Skeleton className={styles.skeletonLineShort} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className={styles.services}>
            <div className={styles.header}>
                <h2 className={styles.title}>{t("service")}</h2>
                <p className={styles.subtitle}>{t("service-title")}</p>
            </div>

            <ScrollStack className={styles.list} useWindowScroll itemDistance={80} itemStackDistance={24}>
                {services.map((item) => (
                    <ScrollStackItem key={item.id} itemClassName={styles.row}>
                        <div className={styles.imageWrapper}>
                            <ImageWithLoader
                                src={item.image}
                                alt={item.title}
                                className={styles.image}
                                fill
                                fillWrapper
                                sizes="(max-width: 1024px) 100vw, 433px"
                            />
                        </div>
                        <div className={styles.textBlock}>
                            <h3 className={styles.rowTitle}>{item.title}</h3>
                            <p className={styles.rowShort}>{item.subtitle}</p>
                        </div>
                        <div className={styles.descBlock}>
                            <p className={styles.rowText}>
                                {expandedIds.has(item.id)
                                    ? item.description
                                    : item.description.slice(0, TRUNCATE_LENGTH)}
                                {item.description.length > TRUNCATE_LENGTH && (
                                    <>
                                        {!expandedIds.has(item.id) && "..."}
                                        {" "}
                                        <button
                                            type="button"
                                            className={styles.expandBtn}
                                            onClick={() =>
                                                setExpandedIds((prev) => {
                                                    const next = new Set(prev);
                                                    if (next.has(item.id)) next.delete(item.id);
                                                    else next.add(item.id);
                                                    return next;
                                                })
                                            }
                                        >
                                            {expandedIds.has(item.id) ? t("less-button") : t("more-button")}
                                        </button>
                                    </>
                                )}
                            </p>
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    );
}
