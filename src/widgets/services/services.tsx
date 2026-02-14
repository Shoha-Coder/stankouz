import styles from "./services.module.scss";
import { services } from "./model/services";
import Image from "next/image";

export function Services() {
  return (
    <section className={styles.services}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Bizning xizmatlar</h2>
        <p className={styles.subtitle}>
          Biz ilg&apos;or texnologiyalar yordamida ishlab chiqarilgan, eng yuqori
          sifat standartlariga javob beradigan keng turdagi mahsulotlarni taklif
          etamiz.
        </p>
      </div>

      {/* LIST */}
      <div className={styles.list}>
        {services.map((item) => (
          <div key={item.id} className={styles.row}>
            <Image src={item.image} alt={item.title} className={styles.image} width={433} height={256} />

            <div className={styles.textBlock}>
              <h3 className={styles.rowTitle}>{item.title}</h3>
              <p className={styles.rowShort}>{item.short}</p>
            </div>

            <p className={styles.rowText}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
