"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import styles from "./logos-carousel.module.scss";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { buildSrcSet } from "@/shared/lib/responsive-images";
import type { ResponsiveImages } from "@/shared/lib/responsive-images";

export interface LogosCarouselItem {
  id: number;
  logo: string;
  images?: ResponsiveImages;
  alt?: string;
  link?: string;
}

function LogoCard({ item }: { item: LogosCarouselItem }) {
  const src = item.logo || "";
  const srcSet = item.images ? buildSrcSet(item.images) : undefined;
  const useResponsive = Boolean(src && srcSet);
  const content = useResponsive ? (
    <div className={styles.image}>
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 640px) 200px, (max-width: 1024px) 600px, 1000px"
        alt={item.alt ?? ""}
      />
    </div>
  ) : src ? (
    <ImageWithLoader
      src={src}
      alt={item.alt ?? ""}
      width={433}
      height={256}
      fillWrapper
      wrapperClassName={styles.image}
    />
  ) : null;
  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        {content}
      </a>
    );
  }
  return <div className={styles.card}>{content}</div>;
}

type Props = {
  title?: string;
  subtitle?: string;
  items: LogosCarouselItem[];
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
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 10 },
        }}
        loop
        freeMode
        speed={15000}
        autoplay={{
          delay: 0,
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id}>
            <AnimatedItem index={index}>
              <LogoCard item={item} />
            </AnimatedItem>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 10 },
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
        {items.map((item, index) => (
          <SwiperSlide key={item.id}>
            <AnimatedItem index={index + items.length}>
              <LogoCard item={item} />
            </AnimatedItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
