"use client";
import styles from "./machines.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function Machines() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = useTranslations("home");
  return (
    <section className={styles.machines}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t("stanok-block-title")}</h2>
        <p className={styles.subtitle}>{t("stanok-block-des")}</p>
      </header>

      <div className={styles.cards}>
        {/* LEFT CARD */}
        <article className={styles.card}>
          <ImageWithLoader src="/images/stanok1.png" alt="Laboratoriya" width={433} height={256} fillWrapper />
          <div className={styles.overlay}>
            <div>
              <h3>{t("stanok-card-text")}</h3>
              <p>{t("products-title")}</p>
            </div>

            <Link href={{ pathname: `/${locale}/labs` }} className={styles.cardBtn}>
              <span>{t("details")}</span>
              <span className={styles.icon}>
                <ArrowRight />
              </span>
            </Link>
          </div>
        </article>

        {/* RIGHT CARD */}
        <article className={styles.card}>
          <ImageWithLoader src="/images/stanok2.png" alt="Stanoklar" width={433} height={256} fillWrapper />
          <div className={styles.overlay}>
            <div>
              <h3>{t("stanok-card-text-2")}</h3>
              <p>{t("products-title")}</p>
            </div>

            <Link href={{ pathname: `/${locale}/products` }} className={styles.cardBtn}>
              <span>{t("details")}</span>
              <span className={styles.icon}>
                <ArrowRight />
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
