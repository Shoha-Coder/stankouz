"use client";
import styles from "../news-article.module.scss";
import { NewsItem } from "../model/types";
import { ArrowRightIcon } from "@/shared/ui/icons";
import Link from "next/link";
import { motion } from "framer-motion";
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
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            className={styles.sidebarItem}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.35,
              delay: index * 0.04,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Link href={{ pathname: `/${locale}/news/${item.id}` }} className={styles.sidebarLink}>
              {item.title}
            </Link>
            <time className={styles.sidebarDate}>{item.date}</time>
          </motion.li>
        ))}
      </ul>

      <Link href={{ pathname: `/${locale}/news` }} className={styles.moreBtn}>
        Ko‘proq xabarlar
        <ArrowRightIcon className={styles.moreIcon} />
      </Link>
    </div>
  );
}
