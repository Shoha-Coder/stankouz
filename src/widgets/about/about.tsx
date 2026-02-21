"use client";

import { useState } from "react";
import Advantages from "@/shared/ui/advantages/advantages";
import styles from "./about.module.scss";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { Button } from "@/shared/ui/button";
import { AnimatedCounter } from "@/shared/ui/animated-counter";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import { useSiteInfo, getLocalizedSiteInfo } from "@/entities/siteinfo";
import { HtmlContent } from "@/shared/ui/html-content";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

const TRUNCATE_LENGTH = 350;

function stripHtml(html: string): string {
  if (!html?.trim()) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

const ANIM_DURATION = 350;

export function About() {
  const t = useTranslations("home");
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data: siteInfo, isPending } = useSiteInfo(locale);
  const localized = getLocalizedSiteInfo(siteInfo ?? null, locale);

  const stats = localized
    ? [
        { value: localized.completed_projects, labelKey: "stats-completed-projects" as const },
        { value: localized.years_of_experience, labelKey: "stats-years-experience" as const },
        { value: localized.investment_profit, labelKey: "stats-investment-profit" as const },
      ]
    : null;

  const showSkeleton = isPending || !siteInfo;
  const hasStats = stats && (stats[0].value || stats[1].value || stats[2].value);
  const hasDesc = !!localized?.desc;
  const hasTitle = !!localized?.title;

  return (
    <section className={styles.about}>
      <AnimateOnScroll
        stagger
        rootMargin="0px 0px -60px 0px"
        threshold={0.5}
        className={styles.top}
      >
        {/* 1. Title */}
        {showSkeleton || !hasTitle ? (
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} aria-hidden />
        ) : (
          <h2 className={`${styles.title} inter`}>{localized.title}</h2>
        )}

        {/* 2. Image */}
        <div className={styles.imageWrapper}>
          {showSkeleton ? (
            <div className={`${styles.skeleton} ${styles.skeletonImage}`} aria-hidden />
          ) : (
            <ImageWithLoader
              src="/images/about-image.png"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Gidro Stanko Servis"
              wrapperClassName={styles.imageFill}
            />
          )}
        </div>

        {/* 3. Text */}
        <div className={styles.textContent}>
          {showSkeleton || !hasDesc ? (
            <div className={styles.skeletonText}>
              <div className={`${styles.skeleton} ${styles.skeletonTextLine}`} aria-hidden />
              <div className={`${styles.skeleton} ${styles.skeletonTextLine}`} aria-hidden />
              <div className={`${styles.skeleton} ${styles.skeletonTextLine} ${styles.skeletonTextLineShort}`} aria-hidden />
            </div>
          ) : localized?.desc ? (
            <div className={`${styles.textPrimary} inter`}>
              {!isDescExpanded && !isCollapsing && stripHtml(localized.desc).length > TRUNCATE_LENGTH ? (
                <>
                  {stripHtml(localized.desc).slice(0, TRUNCATE_LENGTH)}
                  {"... "}
                  <button
                    type="button"
                    className={styles.expandBtn}
                    onClick={() => setIsDescExpanded(true)}
                  >
                    {t("more-button")}
                  </button>
                </>
              ) : (isDescExpanded || isCollapsing) && stripHtml(localized.desc).length > TRUNCATE_LENGTH ? (
                <div
                  className={`${styles.expandedContent} ${isCollapsing ? styles.expandedContentCollapsing : ""}`}
                >
                  <HtmlContent content={localized.desc} />
                  {" "}
                  <button
                    type="button"
                    className={styles.expandBtn}
                    onClick={() => {
                      if (isCollapsing) return;
                      setIsCollapsing(true);
                      setTimeout(() => {
                        setIsDescExpanded(false);
                        setIsCollapsing(false);
                      }, ANIM_DURATION);
                    }}
                  >
                    {t("less-button")}
                  </button>
                </div>
              ) : (
                <HtmlContent content={localized.desc} />
              )}
            </div>
          ) : null}
        </div>

        {/* 4. Stats */}
        <div className={styles.stats}>
          {showSkeleton || !hasStats ? (
            <div className={styles.skeletonStats}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonStat}>
                  <div className={`${styles.skeleton} ${styles.skeletonStatValue}`} aria-hidden />
                  <div className={`${styles.skeleton} ${styles.skeletonStatLabel}`} aria-hidden />
                </div>
              ))}
            </div>
          ) : (
            stats!.map((item) => (
              <div key={item.labelKey} className={styles.stat}>
                <AnimatedCounter
                  value={item.value}
                  duration={1800}
                  className={`${styles.statValue} inter`}
                />
                <span className={`${styles.statLabel} inter`}>
                  {t(item.labelKey)}
                </span>
              </div>
            ))
          )}
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
