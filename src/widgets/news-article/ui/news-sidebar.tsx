"use client";
import styles from "../news-article.module.scss";
import { NewsItem } from "../model/types";
import { ArrowRightIcon } from "@/shared/ui/icons";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

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
        {items.map((item) => (
          <li key={item.id} className={styles.sidebarItem}>
            <Link href={{ pathname: `/${locale}/news/${item.id}` }} className={styles.sidebarLink}>
              {item.title}
            </Link>
            <time className={styles.sidebarDate}>{item.date}</time>
          </li>
        ))}
      </ul>

      <Link href={{ pathname: `/${locale}/news` }} className={styles.moreBtn}>
        Ko‘proq xabarlar
        <ArrowRightIcon className={styles.moreIcon} />
      </Link>
    </div>
  );
}
