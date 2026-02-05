import styles from "./products.module.scss";
import { products } from "./model/products";
import ArrowRight from "@/shared/ui/icons/arrow-right";

export function Products() {
  return (
    <section className={styles.products}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Mahsulotlarimiz</h2>
        <p className={styles.subtitle}>
          Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga
          individual yondashuvni taklif etamiz.
        </p>
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {products.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <span className={styles.badge}>{item.category}</span>
              <img src={item.image} alt={item.title} />
            </div>

            <h3 className={styles.cardTitle}>{item.title}</h3>

            <p className={styles.cardText}>{item.description}</p>

            <a href="#" className={styles.details}>
              Batafsil
            </a>
          </div>
        ))}
      </div>

      {/* ACTION */}
      <div className={styles.action}>
        <button className={styles.outlineBtn}>
          Katalogni ko‘rish
          <div className={styles.iconCircle}>
            <ArrowRight />
          </div>
        </button>
      </div>
    </section>
  );
}
