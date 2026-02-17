"use client";

import { ArrowRightIcon, ShareIcon } from "@/shared/ui/icons";
import styles from "../news-article.module.scss";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

type Props = {
  prevArticle?: { title: string; slug: string } | null;
  nextArticle?: { title: string; slug: string } | null;
  currentSlug?: string;
};

export function NewsNavigation({ prevArticle, nextArticle, currentSlug }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  return (
    <div className={styles.nav}>
      <div className={styles.top}>
        <button className={styles.share}>
          <ShareIcon />
          Do&apos;stlarga ulashish
        </button>
        <div className={styles.tags}>
          <p>#yangiliklar</p>
          <p>#toshkent</p>
          <p>#gidro</p>
        </div>
      </div>

      <div className={styles.navButtons}>
        {prevArticle && prevArticle.slug !== currentSlug ? (
          <Link
            href={`/${locale}/news/${prevArticle.slug}`}
            className={styles.navBtn}
          >
            <ArrowRightIcon className={styles.circle} />
            {prevArticle.title}
          </Link>
        ) : (
          <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
            <ArrowRightIcon className={styles.circle} />
            Oldingi xabar
          </span>
        )}

        {nextArticle && nextArticle.slug !== currentSlug ? (
          <Link
            href={`/${locale}/news/${nextArticle.slug}`}
            className={styles.navBtn}
          >
            {nextArticle.title}
            <ArrowRightIcon className={styles.circle} />
          </Link>
        ) : (
          <span className={`${styles.navBtn} ${styles.navBtnDisabled}`}>
            Keyingi xabar
            <ArrowRightIcon className={styles.circle} />
          </span>
        )}
      </div>
    </div>
  );
}
