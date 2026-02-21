"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./hero.module.scss";
import { swiperPaginationConfig } from "@/shared/config/swiper";
import { ArrowRightIcon, DownloadIcon } from "@/shared/ui/icons";
import { useTranslations } from "next-intl";
import { useBanners } from "@/entities/banner/model/useBanners";
import { Skeleton } from "@/shared/ui/skeleton";
import type { Banner } from "@/entities/banner/model/types";
import { buildSrcSet, getFallbackImage } from "@/shared/lib/responsive-images";

function stripHtml(html: string): string {
  if (!html?.trim()) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function getBannerImage(banner: Banner): string {
  return getFallbackImage(banner.images) || "/images/hero.png";
}

function getVideoType(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase() ?? "";
  const types: Record<string, string> = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogv: "video/ogg",
    ogg: "video/ogg",
    mov: "video/quicktime",
  };
  return types[ext] ?? "video/mp4";
}

export function Hero() {
  const t = useTranslations("hero");
  const { data: banners, isPending } = useBanners("home");
  const primaryCta = t("primary");
  const secondaryCta = t("secondary");

  const showSkeleton = isPending || !banners?.length;
  const slides =
    !showSkeleton && banners
      ? banners.map((b) => ({
          id: b.id,
          title: b.title,
          subtitle: stripHtml(b.desc),
          image: getBannerImage(b),
          images: b.images,
          url: b.url,
          video: b.video,
          primaryCta,
          secondaryCta,
        }))
      : [];

  if (showSkeleton) {
    return (
      <section className={styles.hero}>
        <div className={styles.skeletonSlide}>
          <Skeleton className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <Skeleton className={styles.skeletonSubtitle} />
            <Skeleton className={styles.skeletonTitle} />
            <div className={styles.skeletonActions}>
              <Skeleton className={styles.skeletonBtn} />
              <Skeleton className={styles.skeletonBtn} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Pagination]}
        pagination={{ ...swiperPaginationConfig, clickable: true }}
        loop={slides.length > 1}
        className={styles.swiper}
      >
        {slides.map((slide) => {
          const srcSet =
            "images" in slide && slide.images
              ? buildSrcSet(slide.images, { widths: { sm: 640, md: 1024, lg: 1920 } })
              : undefined;
          const hasVideo = "video" in slide && slide.video;
          return (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            <div className={styles.slide}>
              {hasVideo ? (
                <video
                  className={styles.slideVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={slide.image}
                  aria-hidden
                >
                  {typeof slide.video === "string" ? (
                    <source src={slide.video} type={getVideoType(slide.video)} />
                  ) : (
                    ((slide.video as { src: string; type: string }[] | undefined) ?? []).map((s, i) => (
                      <source key={i} src={s.src} type={s.type} />
                    ))
                  )}
                </video>
              ) : srcSet ? (
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
                  <h1 className={`${styles.title} inter`}>{slide.title}</h1>

                  <p className={`${styles.subtitle} inter`}>{slide.subtitle}</p>

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
