"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import styles from "./logos-carousel.module.scss";
import Image from "next/image";

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
        slidesPerView={2}
        spaceBetween={6}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 14 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        loop
        freeMode
        speed={15000}
        autoplay={{
          delay: 0,
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.card}>
              <Image src={item.logo} alt={item.alt ?? ""} width={433} height={256} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={6}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 14 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        loop
        freeMode
        speed={15000}
        autoplay={{
          delay: 0,
          reverseDirection: true,
        }}
        style={{marginTop: "clamp(14px, 3vw, 20px)"}}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.card}>
              <Image src={item.logo} alt={item.alt ?? ""} width={433} height={256} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
