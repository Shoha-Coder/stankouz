import styles from "../news-article.module.scss";
import { NewsItem } from "../model/types";
import { ArrowRightIcon } from "@/shared/ui/icons";

type Props = {
  items: NewsItem[];
};

export function NewsSidebar({ items }: Props) {
  return (
    <div className={styles.sidebarBox}>
      <h3 className={styles.sidebarTitle}>Boshqa yangiliklar</h3>

      <ul className={styles.sidebarList}>
        {items.map((item) => (
          <li key={item.id} className={styles.sidebarItem}>
            <a href={item.href} className={styles.sidebarLink}>
              {item.title}
            </a>
            <time className={styles.sidebarDate}>{item.date}</time>
          </li>
        ))}
      </ul>

      <a href="/news" className={styles.moreBtn}>
        Ko‘proq xabarlar
        <ArrowRightIcon className={styles.moreIcon} />
      </a>
    </div>
  );
}
