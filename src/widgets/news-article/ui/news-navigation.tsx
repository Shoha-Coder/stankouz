import { ArrowRightIcon, ShareIcon } from "@/shared/ui/icons";
import styles from "../news-article.module.scss";
import Link from "next/link";

export function NewsNavigation() {
  return (
    <div className={styles.nav}>
      <div className={styles.top}>
        <button className={styles.share}>
          <ShareIcon />
          Do‘stlarga ulashish
        </button>
        <div className={styles.tags}>
          <p>#yangiliklar</p>
          <p>#toshkent</p>
          <p>#gidro</p>
        </div>
      </div>

      <div className={styles.navButtons}>
        <Link href="#" className={styles.navBtn}>
          <ArrowRightIcon className={styles.circle} />
          Oldingi xabar
        </Link>

        <Link href="#" className={styles.navBtn}>
          Keyingi xabar
          <ArrowRightIcon className={styles.circle} />
        </Link>
      </div>
    </div>
  );
}
