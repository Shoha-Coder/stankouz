"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { useProducts } from "@/entities/product/model/useProducts";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { labProductsSwiperConfig } from "@/shared/config/swiper";
import styles from "./lab-products-section.module.scss";

interface Props {
    title: string;
    categoryId?: number;
}

export function LabProductsSection({ title, categoryId }: Props) {
    const { data } = useProducts({ category_id: categoryId, page: 1 });
    const products = (data?.data ?? []).slice(0, 12);

    if (products.length === 0) return null;

    return (
        <section className={styles.root}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.sliderWrap}>
                <Swiper
                    modules={[Navigation]}
                    {...labProductsSwiperConfig}
                    className={styles.swiper}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={product.id} className={styles.slide}>
                            <AnimatedItem index={index}>
                                <ProductCard product={product} />
                            </AnimatedItem>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.prev} lab-products-prev`}
                    aria-label="Oldingi"
                >
                    <ArrowRight />
                </button>

                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.next} lab-products-next`}
                    aria-label="Keyingi"
                >
                    <ArrowRight />
                </button>
            </div>
        </section>
    );
}
