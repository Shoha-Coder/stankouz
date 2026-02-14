"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./news.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { news } from "./model/news";
import Image from "next/image";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

export function News() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  return (
    <section className={styles.news}>
      {/* HEADER */}
      <header className={styles.header}>
        <h2 className={styles.title}>Yangiliklar</h2>
        <p className={styles.subtitle}>
          Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga
          individual yondashuvni taklif etamiz.
        </p>
      </header>

      {/* SLIDER */}
      <div className={styles.sliderWrap}>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
            1024: { slidesPerView: 3, spaceBetween: 40, centeredSlides: false },
          }}
          navigation={{
            prevEl: ".news-prev",
            nextEl: ".news-next",
          }}
          pagination={{
            clickable: true,
            el: ".news-pagination",
          }}
        >
          {news.map((item, index) => (
            <SwiperSlide key={item.id}>
              <AnimatedItem index={index}>
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image src={item.image} alt={item.title} width={433} height={256} />
                </div>

                <span className={styles.date}>{item.date}</span>

                <h3 className={styles.cardTitle}>{item.title}</h3>

                <Link href={{ pathname: `/${locale}/news/${item.id}` }} className={styles.link}>Batafsil</Link>
              </article>
              </AnimatedItem>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAVIGATION */}
          <button className={`${styles.navBtn} ${styles.prev} news-prev`}>
            <ArrowRight />
          </button>

          <button className={`${styles.navBtn} ${styles.next} news-next`}>
            <ArrowRight />
          </button>
      </div>

      {/* PAGINATION */}
      <div className={`${styles.pagination} news-pagination`} />

      {/* ACTION */}
      <div className={styles.actions}>
        <Link href={{ pathname: `/${locale}/news` }} className={styles.outlineBtn}>
          <span>Barchasini o‘qish</span>
          <span className={styles.iconCircle}>
            <ArrowRight />
          </span>
        </Link>
      </div>
    </section>
  );
}
