"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { useProducts } from "@/entities/product/model/useProducts";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { KoproqButton } from "@/shared/ui/koproq-button";
import { relatedProductsSwiperConfig } from "@/shared/config/swiper";
import styles from "./related-products.module.scss";
import { useTranslations } from "next-intl";

interface Props {
    excludeId?: number;
    isLab?: boolean;
}

export function RelatedProducts({ excludeId, isLab }: Props) {
    const t = useTranslations("home");
    const { data } = useProducts({ page: 1 });
    const all = data?.data ?? [];
    const products = excludeId ? all.filter((p) => p.id !== excludeId).slice(0, 12) : all.slice(0, 12);

    if (products.length === 0) return null;

    return (
        <section className={`${styles.root} ${isLab ? styles.lab : ""}`}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    {isLab ? "Boshqa laboratoriya stanoklari" : t("products")}
                </h2>
                {!isLab && <KoproqButton />}
            </header>

            <div className={styles.sliderWrap}>
                <Swiper
                    modules={[Navigation]}
                    {...relatedProductsSwiperConfig}
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
                    className={`${styles.navBtn} ${styles.prev} related-products-prev`}
                    aria-label="Oldingi"
                >
                    <ArrowRight />
                </button>

                <button
                    type="button"
                    className={`${styles.navBtn} ${styles.next} related-products-next`}
                    aria-label="Keyingi"
                >
                    <ArrowRight />
                </button>
            </div>
        </section>
    );
}
