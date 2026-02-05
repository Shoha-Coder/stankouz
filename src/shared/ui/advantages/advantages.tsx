import styles from "./advantages.module.scss";
import { advantages } from "./model/advantages";

const Advantages = ({ title, text }: { title?: string; text?: string }) => {
  return (
    <div className={styles.advantages}>
      <header className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {text && <p className={styles.subtitle}>{text}</p>}
      </header>
      <div className={styles.cards}>
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
    </div>
  );
};

export default Advantages;
