"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./news.module.scss";
import { swiperPaginationConfig } from "@/shared/config/swiper";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { SlidingIcon } from "@/shared/ui/sliding-icon";
import slidingStyles from "@/shared/ui/sliding-icon/sliding-icon.module.scss";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { usePosts } from "@/entities/post";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/shared/ui/skeleton";

export function News() {
    const pathname = usePathname();
    const locale = getLocaleFromPath(pathname);
    const t = useTranslations("home");
    const { data, isPending } = usePosts({ page: 1 });
    const posts = data?.data;

    const showSkeleton = isPending || !posts?.length;

    if (showSkeleton) {
        return (
            <section className={styles.news}>
                <header className={styles.header}>
                    <h2 className={styles.title}>{t("news-title")}</h2>
                    <p className={styles.subtitle}>{t("news-des")}</p>
                </header>
                <div className={styles.sliderWrap}>
                    <div className={styles.skeletonGrid}>
                        {[1, 2, 3].map((i) => (
                            <article key={i} className={styles.card}>
                                <Skeleton className={styles.skeletonImage} />
                                <Skeleton className={styles.skeletonDate} />
                                <Skeleton className={styles.skeletonTitle} />
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.news}>
            <header className={styles.header}>
                <h2 className={styles.title}>{t("news-title")}</h2>
                <p className={styles.subtitle}>{t("news-des")}</p>
            </header>

            <div className={styles.sliderWrap}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    centeredSlides={true}
                    spaceBetween={16}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
                        1024: { slidesPerView: 3, spaceBetween: 40, centeredSlides: false },
                    }}
                    navigation={{
                        prevEl: ".news-prev",
                        nextEl: ".news-next",
                    }}
                    pagination={{
                        ...swiperPaginationConfig,
                        clickable: true,
                        el: ".news-pagination",
                    }}
                    className={styles.swiper}
                >
                    {posts!.slice(0, 12).map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <AnimatedItem index={index}>
                                <article className={styles.card}>
                                    <div className={styles.imageWrap}>
                                        <ImageWithLoader
                                            src={item.image}
                                            alt={item.title}
                                            width={433}
                                            height={256}
                                            fillWrapper
                                        />
                                    </div>
                                    <span className={styles.date}>{item.date}</span>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <Link
                                        href={`/${locale}/news/${item.slug}`}
                                        className={styles.link}
                                    >
                                        {t("details")}
                                    </Link>
                                </article>
                            </AnimatedItem>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button type="button" className={`${styles.navBtn} ${styles.prev} ${slidingStyles.slidingIconHover} news-prev`} aria-label="Oldingi">
                    <SlidingIcon>
                        <ArrowRight />
                    </SlidingIcon>
                </button>
                <button type="button" className={`${styles.navBtn} ${styles.next} ${slidingStyles.slidingIconHover} news-next`} aria-label="Keyingi">
                    <SlidingIcon>
                        <ArrowRight />
                    </SlidingIcon>
                </button>
            </div>

            <div className={`${styles.pagination} news-pagination`} />

            <div className={styles.actions}>
                <Link href={`/${locale}/news`} className={`${styles.outlineBtn} ${slidingStyles.slidingIconHover}`}>
                    <span>{t("more")}</span>
                    <span className={styles.iconCircle}>
                        <SlidingIcon>
                            <ArrowRight />
                        </SlidingIcon>
                    </span>
                </Link>
            </div>
        </section>
    );
}
