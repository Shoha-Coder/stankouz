import { ArrowRightIcon, ShareIcon } from "@/shared/ui/icons";
import styles from "../news-article.module.scss";

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
        <a href="#" className={styles.navBtn}>
          <ArrowRightIcon className={styles.circle} />
          Oldingi xabar
        </a>

        <a href="#" className={styles.navBtn}>
          Keyingi xabar
          <ArrowRightIcon className={styles.circle} />
        </a>
      </div>
    </div>
  );
}
