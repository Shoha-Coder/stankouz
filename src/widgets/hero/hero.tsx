"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./hero.module.scss";
import { Button } from "@/shared/ui/button";
import { ArrowRightIcon, DownloadIcon } from "@/shared/ui/icons";
import { heroSlides } from "./model/slides";

export function Hero() {
  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop
        className={styles.swiper}
      >
        {heroSlides.map((slide, _) => (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            <div className={styles.slide}>
              <div className={styles.overlay}>
                <div className={styles.content}>
                  <p className={`${styles.subtitle} inter`}>{slide.subtitle}</p>

                  <h1 className={`${styles.title} inter`}>{slide.title}</h1>

                  <div className={styles.actions}>
                    <button className={`${styles.primaryBtn} inter`}>
                      <span className={styles.btnText}>{slide.primaryCta}</span>
                      <span className={styles.iconCircle}>
                        <ArrowRightIcon className={styles.icon} />
                      </span>
                    </button>

                    <button className={styles.secondaryBtn}>
                      <span className={styles.btnText}>{slide.secondaryCta}</span>
                      <span className={styles.iconCircle}>
                        <DownloadIcon />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
