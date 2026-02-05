"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

import styles from "./logos-carousel.module.scss";

type Props = {
  title?: string;
  subtitle?: string;
  items: { id: number; logo: string; alt?: string }[];
};

export function LogosCarousel({ title, subtitle, items }: Props) {
  return (
    <section className={styles.root}>
      {title && (
        <header className={styles.header}>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </header>
      )}

      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={40}
        loop
        freeMode
        speed={6000}
        autoplay={{
          delay: 0,
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.card}>
              <img src={item.logo} alt={item.alt ?? ""} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        spaceBetween={40}
        loop
        freeMode
        speed={6000}
        autoplay={{
          delay: 0,
          reverseDirection: true,
        }}
        style={{ marginTop: "30px" }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.card}>
              <img src={item.logo} alt={item.alt ?? ""} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
