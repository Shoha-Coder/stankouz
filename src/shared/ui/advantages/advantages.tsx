import styles from "./advantages.module.scss";
import { advantages } from "./model/advantages";
import { AnimatedItem } from "@/shared/ui/animated-item";

const Advantages = ({ title, text }: { title?: string; text?: string }) => {
  return (
    <div className={styles.advantages}>
      <header className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {text && <p className={styles.subtitle}>{text}</p>}
      </header>
      <div className={styles.cards}>
        {advantages.map((item, index) => (
          <AnimatedItem key={item.id} index={index}>
          <div
            className={`${styles.card}`}
          >
            <div className={styles.cardTop}>
              <h3 className={`${styles.cardTitle} inter`}>{item.title}</h3>
              <p className={`${styles.cardText} inter`}>{item.text}</p>
            </div>

            <span className={`${styles.cardIndex} inter`}>{item.id}</span>
          </div>
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
