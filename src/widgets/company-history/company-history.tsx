"use client";

import { useState, useCallback } from "react";
import styles from "./company-history.module.scss";
import type { HistoryItem } from "./model/history";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

type Props = {
  title: string;
  items: HistoryItem[];
};

export function CompanyHistory({ title, items }: Props) {
  const [activeYear, setActiveYear] = useState(items[0].year);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const activeItem = items.find((i) => i.year === activeYear)!;

  const goToIndex = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        setActiveYear(item.year);
        mainSwiper?.slideTo(index);
      }
    },
    [mainSwiper, items]
  );

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const item = items[swiper.activeIndex];
      if (item) setActiveYear(item.year);
    },
    [items]
  );

  return (
    <section className={styles.root}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.layout}>
        {/* MAIN IMAGE SWIPER */}
        <div className={styles.mainImage}>
          <Swiper
            onSwiper={setMainSwiper}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            spaceBetween={0}
            initialSlide={0}
            pagination={
              items.length > 1
                ? { clickable: true, el: ".history-main-pagination" }
                : false
            }
            className={styles.mainSwiper}
          >
            {items.map((item) => (
              <SwiperSlide key={item.year}>
                <ImageWithLoader src={item.image} alt={item.title} width={433} height={256} fillWrapper />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {/* THUMBNAILS */}
          <div className={styles.thumbs}>
            {items?.slice(0, 2)?.map((item) => (
              <button
                key={item.year}
                className={`${styles.thumb} ${
                  item.year === activeYear ? styles.activeThumb : ""
                }`}
                onClick={() => goToIndex(items.findIndex((i) => i.year === item.year))}
                aria-label={`Show year ${item.year}`}
              >
                <ImageWithLoader src={item.image} alt="" width={433} height={256} fillWrapper />
              </button>
            ))}
          </div>

          {/* YEARS */}
          <div className={styles.years}>
            {items.map((item) => (
              <button
                key={item.year}
                className={`${styles.year} ${
                  item.year === activeYear ? styles.activeYear : ""
                }`}
                onClick={() => goToIndex(items.findIndex((i) => i.year === item.year))}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* TEXT */}
          <h3 className={styles.title}>{activeItem.title}</h3>
          <p className={styles.description}>{activeItem.description}</p>
        </div>
      </div>
    </section>
  );
}
