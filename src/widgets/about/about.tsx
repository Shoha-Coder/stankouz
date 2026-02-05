import styles from "./about.module.scss";
import { stats } from "./model/stats";
import { advantages } from "./model/advantages";

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
                <span className={`${styles.statValue} inter`}>{item.value}</span>
                <span className={`${styles.statLabel} inter`}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.outlineBtn}>
              Sertifikatlar
              <span className={styles.iconCircle}>→</span>
            </button>

            <button className={styles.outlineBtn}>
              Biz haqimizda batafsil
              <span className={styles.iconCircle}>→</span>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.imageWrapper}>
          <img src="/images/about-image.png" alt="Gidro Stanko Servis" />
        </div>
      </div>

      {/* ADVANTAGES */}
      <div className={styles.advantages}>
        {advantages.map((item) => (
          <div
            key={item.id}
            className={`${styles.card} ${
              item.variant === "accent" ? styles.accent : styles.light
            }`}
          >
            <div className={styles.cardTop}>
              <h3 className={`${styles.cardTitle} inter`}>{item.title}</h3>
              <p className={`${styles.cardText} inter`}>{item.text}</p>
            </div>

            <span className={`${styles.cardIndex} inter`}>{item.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
