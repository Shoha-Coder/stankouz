"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/product-card";
import { getProducts } from "@/entities/product/api/product.service";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { labProductsSwiperConfig } from "@/shared/config/swiper";
import { products as mockProducts } from "@/widgets/products/model/products";
import styles from "./lab-products-section.module.scss";
import { products } from "@/shared/mock/catalog";

function toProduct(item: (typeof mockProducts)[0]): Product {
  return {
    id: item.id,
    title: item.title,
    ts: item.ts ?? "Ts 21611802-017:2017",
    image: item.image,
  };
}

interface Props {
  title: string;
}

export function LabProductsSection({ title }: Props) {
  // const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const list = res.data ?? [];
        const mapped = list.slice(0, 12).map((p: any) => ({
          id: p.id,
          title: p.title,
          ts: p.ts ?? "Ts 21611802-017:2017",
          image: p.image,
        }));
        // setProducts(mapped);
      })
      .catch(() => {
        // setProducts(mockProducts.map(toProduct));
      });
  }, []);

  // if (products.length === 0) return null;

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.sliderWrap}>
        <Swiper
          modules={[Navigation]}
          {...labProductsSwiperConfig}
          className={styles.swiper}
        >
          {products.map((product: any) => (
            <SwiperSlide key={product.id} className={styles.slide}>
              <ProductCard product={product} />
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
