import Advantages from "@/shared/ui/advantages/advantages";
import styles from "./about.module.scss";
import { stats } from "./model/stats";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { AnimatedCounter } from "@/shared/ui/animated-counter";

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
                <AnimatedCounter
                  value={item.value}
                  duration={1800}
                  className={`${styles.statValue} inter`}
                />
                <span className={`${styles.statLabel} inter`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Button outlinebutton textClassName={styles.btnText} circleClassName={styles.iconCircle}>
              Biz haqimizda batafsil
            </Button>
            <Button outlinebutton textClassName={styles.btnText} circleClassName={styles.iconCircle}>
              Sertifikatlar
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/about-image.png"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Gidro Stanko Servis"
          />
        </div>
      </div>

      {/* ADVANTAGES */}
      <Advantages />
    </section>
  );
}
