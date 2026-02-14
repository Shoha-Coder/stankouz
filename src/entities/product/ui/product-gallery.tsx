"use client";

import { useState, useCallback } from "react";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import styles from "./product-gallery.module.scss";

interface Props {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const handleThumbClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      mainSwiper?.slideTo(index);
    },
    [mainSwiper]
  );

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.thumbnail} ${index === activeIndex ? styles.thumbnailActive : ""}`}
            onClick={() => handleThumbClick(index)}
            aria-label={`${alt} - ${index + 1}`}
            aria-pressed={index === activeIndex}
          >
            <ImageWithLoader
              src={src}
              alt={`${alt} - ${index + 1}`}
              width={108}
              height={78}
              className={styles.thumbnailImage}
              unoptimized
              fillWrapper
            />
          </button>
        ))}
      </div>

      <div className={styles.mainImageWrap}>
        <Swiper
          onSwiper={setMainSwiper}
          onSlideChange={handleSlideChange}
          spaceBetween={0}
          slidesPerView={1}
          initialSlide={0}
          className={styles.mainSwiper}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <ImageWithLoader
                src={src}
                alt={`${alt} - ${index + 1}`}
                width={537}
                height={384}
                className={styles.mainImage}
                priority={index === 0}
                unoptimized
                fillWrapper
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
