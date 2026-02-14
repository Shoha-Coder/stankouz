"use client";

import { useState } from "react";
import styles from "./certificates-carousel.module.scss";
import Heading from "../heading/heading";
import { ArrowRightIcon } from "../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CertificatePreview } from "./certificate-preview";

export type CertificateItem = { 
  id: number;
  image: string;
  alt?: string;
};

type Props = {
  items: CertificateItem[];
};

export function CertificatesCarousel({ items }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.root}>
      <Heading
        title="Sertifikatlar"
        text="Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga individual yondashuvni taklif etamiz."
      />

      <div className={styles.sliderWrap}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.1}
          pagination={{
            clickable: true,
            el: ".certs-pagination",
          }}
          navigation={{
            prevEl: ".certs-prev",
            nextEl: ".certs-next",
          }}
          breakpoints={{
            320: { spaceBetween: 16, slidesPerView: 1.1 },
            640: { spaceBetween: 20, slidesPerView: 2 },
            1024: { spaceBetween: 40, slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className={styles.card}
              onClick={() => {
                const idx = items.findIndex((i) => i.id === item.id);
                setSelectedIndex(idx >= 0 ? idx : 0);
                setOpen(true);
              }}
              style={{ backgroundImage: `url(${item.image})`, backgroundPosition: "center", backgroundSize: "cover" }}
            >
              {/* <img src={item.image} alt={item.alt ?? ""} /> */}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAV */}
        <button
          className={`${styles.navBtn} ${styles.prev} certs-prev`}
          aria-label="Previous"
        >
          <ArrowRightIcon />
        </button>

        <button
          className={`${styles.navBtn} ${styles.next} certs-next`}
          aria-label="Next"
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className={`certs-pagination ${styles.pagination}`} />

      <CertificatePreview
        open={open}
        items={items}
        currentIndex={selectedIndex}
        onClose={() => setOpen(false)}
        onPrev={() => setSelectedIndex((i) => Math.max(0, i - 1))}
        onNext={() => setSelectedIndex((i) => Math.min(items.length - 1, i + 1))}
      />
    </section>
  );
}
