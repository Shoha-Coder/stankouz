"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./hero.module.scss";
import { ArrowRightIcon, DownloadIcon } from "@/shared/ui/icons";
import { heroSlides } from "./model/slides";
import { useTranslations } from "next-intl";
import { useBanners } from "@/entities/banner/model/useBanners";
import type { Banner } from "@/entities/banner/model/types";
import { buildSrcSet, getFallbackImage } from "@/shared/lib/responsive-images";

function stripHtml(html: string): string {
  if (!html?.trim()) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function getBannerImage(banner: Banner): string {
  return getFallbackImage(banner.images) || "/images/hero.png";
}

export function Hero() {
  const t = useTranslations("hero");
  const { data: banners = [], isPending } = useBanners("home");
  const primaryCta = t("primary");
  const secondaryCta = t("secondary");

  const slides =
    !isPending && banners.length > 0
      ? banners.map((b) => ({
          id: b.id,
          title: b.title,
          subtitle: stripHtml(b.desc) || t("subtitle"),
          image: getBannerImage(b),
          images: b.images,
          url: b.url,
          primaryCta,
          secondaryCta,
        }))
      : heroSlides.map((s) => ({ ...s, primaryCta, secondaryCta }));

  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={slides.length > 1}
        className={styles.swiper}
      >
        {slides.map((slide) => {
          const srcSet =
            "images" in slide && slide.images
              ? buildSrcSet(slide.images, { widths: { sm: 640, md: 1024, lg: 1920 } })
              : undefined;
          return (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            <div className={styles.slide}>
              {srcSet ? (
                <img
                  src={slide.image}
                  srcSet={srcSet}
                  sizes="100vw"
                  alt=""
                  className={styles.slideImage}
                  aria-hidden
                />
              ) : (
                <div
                  className={styles.slideBg}
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              )}
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
          );
        })}
      </Swiper>
    </section>
  );
}
