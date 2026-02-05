import Advantages from "@/shared/ui/advantages/advantages";
import styles from "./about.module.scss";
import { stats } from "./model/stats";
import Image from "next/image";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/button";

export function About() {
  return (
    <section className={styles.about}>
      <div className={styles.top}>
        {/* LEFT */}
        <div className={styles.content}>
          <h2 className={`${styles.title} inter`}>Biz haqimizda</h2>

          <p className={`${styles.textPrimary} inter`}>
            Общество с Ограниченной Ответственностью «GIDRO STANKO SERVIS»
            создано в марте 2007 года на территории города Навоийской области с
            Уставным капиталом свыше 166,3 млн. сум.
          </p>

          <p className={`${styles.textSecondary} inter`}>
            Общество с Ограниченной Ответственностью «GIDRO STANKO SERVIS»
            создано в марте 2007 года на территории города Навоийской области с
            Уставным капиталом свыше 166,3 млн. сум.
          </p>

          <div className={styles.stats}>
            {stats.map((item) => (
              <div key={item.value} className={styles.stat}>
                <span className={`${styles.statValue} inter`}>
                  {item.value}
                </span>
                <span className={`${styles.statLabel} inter`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Button outlineButton textClassName={styles.btnText}>
              Biz haqimizda batafsil
            </Button>
            <Button outlineButton textClassName={styles.btnText}>
              Sertifikatlar
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/about-image.png"
            width={665}
            height={437}
            alt="Gidro Stanko Servis"
          />
        </div>
      </div>

      {/* ADVANTAGES */}
      <Advantages />
    </section>
  );
}
