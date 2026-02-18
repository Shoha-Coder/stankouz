import { ArrowRightIcon, ShareIcon } from "@/shared/ui/icons";
import styles from "./vacancy-actions.module.scss";
import { usePathname } from "next/navigation";

export function VacancyActions() {
  const pathname = usePathname();
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://stanko.shoha-coder.uz/${pathname}`);
  };
  return (
    <div className={styles.actions}>
      <button className={styles.share} onClick={handleCopy}>
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
