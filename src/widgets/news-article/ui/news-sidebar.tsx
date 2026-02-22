"use client";

import styles from "../news-article.module.scss";
import { NewsItem } from "../model/types";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { SlidingIcon } from "@/shared/ui/sliding-icon";
import slidingStyles from "@/shared/ui/sliding-icon/sliding-icon.module.scss";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";

type Props = {
  items: NewsItem[];
};

export function NewsSidebar({ items }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  return (
    <div className={styles.sidebarBox}>
      <h3 className={styles.sidebarTitle}>Boshqa yangiliklar</h3>

      <ul className={styles.sidebarList}>
        {items.map((item, index) => (
          <li key={item.id} className={styles.sidebarItem}>
            <AnimateOnScroll
              rootMargin="-30px"
              threshold={0.01}
              animationDelay={index * 0.04}
            >
              <Link href={`/${locale}/news/${item.slug}`} className={styles.sidebarLink}>
                {item.title}
              </Link>
              <time className={styles.sidebarDate}>{item.date}</time>
            </AnimateOnScroll>
          </li>
        ))}
      </ul>

      <Link href={{ pathname: `/${locale}/news` }} className={`${styles.moreBtn} ${slidingStyles.slidingIconHover}`}>
        Ko‘proq xabarlar
        <span className={styles.moreIcon}>
          <SlidingIcon>
            <ArrowRightIcon />
          </SlidingIcon>
        </span>
      </Link>
    </div>
  );
}
