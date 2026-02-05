"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./news.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { news } from "./model/news";

export function News() {
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
          slidesPerView={3}
          spaceBetween={40}
          navigation={{
            prevEl: ".news-prev",
            nextEl: ".news-next",
          }}
          pagination={{
            clickable: true,
            el: ".news-pagination",
          }}
        >
          {news.map((item) => (
            <SwiperSlide key={item.id}>
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={item.image} alt={item.title} />
                </div>

                <span className={styles.date}>{item.date}</span>

                <h3 className={styles.cardTitle}>{item.title}</h3>

                <a className={styles.link}>Batafsil</a>
              </article>
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
        <button className={styles.outlineBtn}>
          <span>Barchasini o‘qish</span>
          <span className={styles.iconCircle}>
            <ArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
}
