import styles from "./machines.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";

export function Machines() {
  return (
    <section className={styles.machines}>
      <header className={styles.header}>
        <h2 className={styles.title}>Bizning stanoklar</h2>
        <p className={styles.subtitle}>
          Bizning yuqori darajadagi sifatli va zamonaviy stanoklarimiz bilan
          batafsil tanishib chiqishingiz mumkin.
        </p>
      </header>

      <div className={styles.cards}>
        {/* LEFT CARD */}
        <article className={styles.card}>
          <img src="/images/stanok1.png" alt="Laboratoriya" />
          <div className={styles.overlay}>
            <div>
              <h3>Laboratoriya</h3>
              <p>
                Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga
                individual yondashuvni taklif etamiz.
              </p>
            </div>

            <button className={styles.cardBtn}>
              <span>Batafsil</span>
              <span className={styles.icon}>
                <ArrowRight />
              </span>
            </button>
          </div>
        </article>

        {/* RIGHT CARD */}
        <article className={styles.card}>
          <img src="/images/stanok2.png" alt="Stanoklar" />
          <div className={styles.overlay}>
            <div>
              <h3>Stanoklar</h3>
              <p>
                Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga
                individual yondashuvni taklif etamiz.
              </p>
            </div>

            <button className={styles.cardBtn}>
              <span>Batafsil</span>
              <span className={styles.icon}>
                <ArrowRight />
              </span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
