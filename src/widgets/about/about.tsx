"use client";

import Advantages from "@/shared/ui/advantages/advantages";
import styles from "./about.module.scss";
import { stats } from "./model/stats";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { Button } from "@/shared/ui/button";
import { AnimatedCounter } from "@/shared/ui/animated-counter";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";

export function About() {
  const t = useTranslations("home");
  return (
    <section className={styles.about}>
      <AnimateOnScroll
        stagger
        rootMargin="0px 0px -60px 0px"
        threshold={0.5}
        className={styles.top}
      >
        {/* 1. Title */}
        <h2 className={`${styles.title} inter`}>{t("about")}</h2>

        {/* 2. Image */}
        <div className={styles.imageWrapper}>
          <ImageWithLoader
            src="/images/about-image.png"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Gidro Stanko Servis"
            wrapperClassName={styles.imageFill}
          />
        </div>

        {/* 3. Text */}
        <div className={styles.textContent}>
          <p className={`${styles.textPrimary} inter`}>
            Общество с Ограниченной Ответственностью «GIDRO STANKO SERVIS»
            создано в марте 2007 года на территории города Навоийской области с
            Уставным капиталом свыше 166,3 млн. сум.
          </p>
          <p className={`${styles.textSecondary} inter`}>
            Общество с Ограниченной Ответственностью «GIDRO STANKO SERVIS»
            создано в марте 2007 года на территории города Навоийской области с
            Уставным капиталом свыше 166,3 млн. сум.
          </p>
        </div>

        {/* 4. Stats */}
        <div className={styles.stats}>
          {stats.map((item) => (
            <div key={item.value} className={styles.stat}>
              <AnimatedCounter
                value={item.value}
                duration={1800}
                className={`${styles.statValue} inter`}
              />
              <span className={`${styles.statLabel} inter`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* 5. Actions */}
        <div className={styles.actions}>
          <Button outlinebutton textClassName={styles.btnText} circleClassName={styles.iconCircle}>
            {t("about-more")}
          </Button>
          <Button outlinebutton textClassName={styles.btnText} circleClassName={styles.iconCircle}>
            {t("certificates")}
          </Button>
        </div>
      </AnimateOnScroll>

      {/* ADVANTAGES */}
      <AnimateOnScroll
        rootMargin="0px 0px -60px 0px"
        threshold={0.5}
      >
        <Advantages
          title={t("team")}
          isStack
          text={t("team-text")}
        />
      </AnimateOnScroll>
    </section>
  );
}
