import { ArrowRightIcon, ShareIcon } from "@/shared/ui/icons";
import styles from "./vacancy-actions.module.scss";

export function VacancyActions() {
  return (
    <div className={styles.actions}>
      <button className={styles.share}>
        <span>Ulashish</span>
        <ShareIcon />
      </button>

      <button className={styles.apply}>
        <span>Ariza qoldirish</span>
        <span className={styles.arrow}>
          <ArrowRightIcon />
        </span>
      </button>
    </div>
  );
}
