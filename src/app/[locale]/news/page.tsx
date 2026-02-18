"use client";

import { useState } from "react";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { AnimatedItem } from "@/shared/ui/animated-item";
import styles from "./news.module.scss";
import { usePosts } from "@/entities/post";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { Pagination } from "@/shared/ui/pagination";
import { useTranslations } from "next-intl";

export default function NewsPage() {
    const tBreadcrumb = useTranslations("breadcrumbs");
    const BREADCRUMB_ITEMS = [
        { label: tBreadcrumb("home"), href: "" },
        { label: tBreadcrumb("news"), href: "news" },
    ];
    const pathname = usePathname();
    const locale = getLocaleFromPath(pathname);
    const [page, setPage] = useState(1);
    const { data, isPending } = usePosts({ page });

    const posts = data?.data ?? [];
    const totalPages = data?.meta?.last_page ?? 1;

    return (
        <div className={styles.page}>
            <Breadcrumb items={BREADCRUMB_ITEMS} />
            {isPending && posts.length === 0 ? (
                <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
                    Yuklanmoqda...
                </p>
            ) : (
                <>
                    <div className={styles.cards}>
                        {posts.map((item, index) => (
                            <AnimatedItem key={item.id} index={index}>
                                <article className={styles.card}>
                                    <div className={styles.imageWrap}>
                                        <ImageWithLoader
                                            src={item.image}
                                            alt={item.title}
                                            width={433}
                                            height={256}
                                            className={styles.image}
                                            fillWrapper
                                        />
                                    </div>
                                    <span className={styles.date}>{item.date}</span>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <Link
                                        href={`/${locale}/news/${item.slug}`}
                                        className={styles.link}
                                    >
                                        Batafsil
                                    </Link>
                                </article>
                            </AnimatedItem>
                        ))}
                    </div>

                    <div className={styles.paginationWrapper}>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
