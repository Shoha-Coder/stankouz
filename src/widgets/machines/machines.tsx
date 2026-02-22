"use client";

import styles from "./machines.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { SlidingIcon } from "@/shared/ui/sliding-icon";
import slidingStyles from "@/shared/ui/sliding-icon/sliding-icon.module.scss";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCategoryBySlug } from "@/entities/category/model/useCategoryBySlug";
import { getFallbackImage } from "@/shared/lib/responsive-images";

const LAB_SLUG = "laboratoriia";
const STANKI_SLUG = "stanki";

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 120);
}

export function Machines() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = useTranslations("home");
  const tMain = useTranslations("main");

  const { data: labCategory } = useCategoryBySlug(LAB_SLUG);
  const { data: stankiCategory } = useCategoryBySlug(STANKI_SLUG);

  const labImage = labCategory?.images ? getFallbackImage(labCategory.images) : "";
  const labTitle = labCategory?.name?.trim() ?? "";
  const labDesc = tMain("lab-block-sub-text");

  const stankiImage = stankiCategory?.images ? getFallbackImage(stankiCategory.images) : "";
  const stankiTitle = stankiCategory?.name?.trim() ?? "";
  const stankiDesc = stankiCategory?.desc?.trim() ? stripHtml(stankiCategory.desc) : "";

  return (
    <section className={styles.machines}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t("stanok-block-title")}</h2>
        <p className={styles.subtitle}>{t("stanok-block-des")}</p>
      </header>

      <div className={styles.cards}>
        {/* LEFT CARD - laboratoriia */}
        <article className={styles.card}>
          {labImage && <ImageWithLoader src={labImage} alt={labTitle} width={433} height={256} fillWrapper />}
          <div className={styles.overlay}>
            <div>
              <h3>{labTitle}</h3>
              <p>{labDesc}</p>
            </div>

            <Link href={`/${locale}/labs`} className={`${styles.cardBtn} ${slidingStyles.slidingIconHover}`}>
              <span>{t("details")}</span>
              <span className={styles.icon}>
                <SlidingIcon>
                  <ArrowRight />
                </SlidingIcon>
              </span>
            </Link>
          </div>
        </article>

        {/* RIGHT CARD - stanki */}
        <article className={styles.card}>
          {stankiImage && <ImageWithLoader src={stankiImage} alt={stankiTitle} width={433} height={256} fillWrapper />}
          <div className={styles.overlay}>
            <div>
              <h3>{stankiTitle}</h3>
              <p>{stankiDesc}</p>
            </div>

            <Link href={`/${locale}/products`} className={`${styles.cardBtn} ${slidingStyles.slidingIconHover}`}>
              <span>{t("details")}</span>
              <span className={styles.icon}>
                <SlidingIcon>
                  <ArrowRight />
                </SlidingIcon>
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
