"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { useProducts } from "@/entities/product/model/useProducts";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { SlidingIcon } from "@/shared/ui/sliding-icon";
import slidingStyles from "@/shared/ui/sliding-icon/sliding-icon.module.scss";
import { labProductsSwiperConfig } from "@/shared/config/swiper";
import styles from "./lab-products-section.module.scss";
import { Skeleton } from "@/shared/ui/skeleton";

interface Props {
    title: string;
    categoryId?: number;
}

export function LabProductsSection({ title, categoryId }: Props) {
    const { data, isPending } = useProducts({ category_id: categoryId, page: 1 });
    const products = data?.data?.slice(0, 12);

    const showSkeleton = isPending || !products?.length;

    if (showSkeleton) {
        return (
            <section className={styles.root}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.skeletonRow}>
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className={styles.skeletonCard} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className={styles.root}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.sliderWrap}>
                <Swiper
                    modules={[Navigation]}
                    {...labProductsSwiperConfig}
                    className={styles.swiper}
                >
                    {products!.map((product, index) => (
                        <SwiperSlide key={product.id} className={styles.slide}>
                            <AnimatedItem index={index}>
                                <ProductCard product={product} />
                            </AnimatedItem>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.prev} ${slidingStyles.slidingIconHover} lab-products-prev`}
                    aria-label="Oldingi"
                >
                    <SlidingIcon>
                        <ArrowRight />
                    </SlidingIcon>
                </button>

                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.next} ${slidingStyles.slidingIconHover} lab-products-next`}
                    aria-label="Keyingi"
                >
                    <SlidingIcon>
                        <ArrowRight />
                    </SlidingIcon>
                </button>
            </div>
        </section>
    );
}
