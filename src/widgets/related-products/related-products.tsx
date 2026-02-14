"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { getProducts } from "@/entities/product/api/product.service";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { KoproqButton } from "@/shared/ui/koproq-button";
import { relatedProductsSwiperConfig } from "@/shared/config/swiper";
import { products as mockProducts, products } from "@/widgets/products/model/products";
import styles from "./related-products.module.scss";

function toProduct(item: (typeof mockProducts)[0]): Product {
  return {
    id: item.id,
    title: item.title,
    ts: item.ts ?? "Ts 21611802-017:2017",
    image: item.image,
  };
}

interface Props {
  excludeId?: number;
  isLab?: boolean;
}

export function RelatedProducts({ excludeId, isLab }: Props) {
  // const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const list = res.data ?? [];
        const mapped = list
          .filter((p) => p.id !== excludeId)
          .slice(0, 12)
          .map((p) => ({
            id: p.id,
            title: p.title,
            ts: p.ts ?? "Ts 21611802-017:2017",
            image: p.image,
          }));
        // setProducts(mapped);
      })
      .catch(() => {
        const filtered = excludeId
          ? mockProducts.filter((p) => p.id !== excludeId)
          : mockProducts;
        // setProducts(filtered.map(toProduct));
      });
  }, [excludeId]);

  // if (products.length === 0) return null;

  return (
    <section className={`${styles.root} ${isLab ? styles.lab : ''}`}>
      <header className={styles.header}>
        <h2 className={styles.title}>{isLab ? 'Boshqa laboratoriya stanoklari' : 'Mahsulotlar'}</h2>
        {!isLab && (
          <KoproqButton />
        )}
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
