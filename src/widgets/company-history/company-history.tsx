"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import styles from "./company-history.module.scss";
import type { HistoryItem } from "./model/history";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { swiperPaginationConfig } from "@/shared/config/swiper";
import { HtmlContent } from "@/shared/ui/html-content";

type Props = {
  title: string;
  items: HistoryItem[];
};

export function CompanyHistory({ title, items }: Props) {
  const [activeYear, setActiveYear] = useState(items[0]?.year);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const activeItem = items.find((i) => i.year === activeYear);
  const yearsRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleYearsPointerDown = useCallback((e: React.PointerEvent) => {
    if (!yearsRef.current) return;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = e.clientX;
    scrollLeftRef.current = yearsRef.current.scrollLeft;
    yearsRef.current.setAttribute("data-grabbing", "true");
    yearsRef.current.setPointerCapture(e.pointerId);
  }, []);

  const handleYearsPointerMove = useCallback((e: React.PointerEvent) => {
    if (!yearsRef.current || !isPointerDownRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 5) isDraggingRef.current = true;
    yearsRef.current.scrollLeft = scrollLeftRef.current - dx;
  }, []);

  const handleYearsPointerUp = useCallback((e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    yearsRef.current?.removeAttribute("data-grabbing");
    yearsRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  if (!items.length) return null;

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

  useEffect(() => {
    if (items.length) {
      setActiveYear(items[0].year);
    }
  }, [items]);

  return (
    <section className={styles.root}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.layout}>
        {/* MAIN IMAGE SWIPER */}
        <div className={styles.mainImage}>
          <Swiper
            modules={[Pagination]}
            onSwiper={setMainSwiper}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            spaceBetween={0}
            initialSlide={0}
            pagination={
              items.length > 1
                ? { ...swiperPaginationConfig, clickable: true, el: ".history-main-pagination" }
                : false
            }
            className={styles.mainSwiper}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id ?? item.year}>
                <ImageWithLoader src={item.image} alt={item.title} width={433} height={256} fillWrapper />
              </SwiperSlide>
            ))}
          </Swiper>
          {items.length > 1 && (
            <div className={`${styles.mainPagination} history-main-pagination`} />
          )}
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {/* THUMBNAILS */}
          <div className={styles.thumbs}>
            {items?.slice(0, 2)?.map((item) => (
              <button
                key={item.id ?? item.year}
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
          <div
            ref={yearsRef}
            className={styles.years}
            onPointerDown={handleYearsPointerDown}
            onPointerMove={handleYearsPointerMove}
            onPointerUp={handleYearsPointerUp}
            onPointerCancel={handleYearsPointerUp}
            onPointerLeave={handleYearsPointerUp}
          >
            {items.map((item) => (
              <button
                key={item.id ?? item.year}
                className={`${styles.year} ${
                  item.year === activeYear ? styles.activeYear : ""
                }`}
                onClick={() => {
                  if (!isDraggingRef.current) {
                    goToIndex(items.findIndex((i) => i.year === item.year));
                  }
                }}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* TEXT */}
          {activeItem && (
            <>
              <h3 className={styles.title}>{activeItem.title}</h3>
              <p className={styles.description}><HtmlContent content={activeItem.description} /></p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
