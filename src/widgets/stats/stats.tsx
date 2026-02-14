import styles from "./stats.module.scss";
import { AnimatedCounter } from "@/shared/ui/animated-counter";
import { AnimatedItem } from "@/shared/ui/animated-item";

type StatItem = {
  value: string;
  title: string;
  description: string;
};

type Props = {
  items: StatItem[];
};

export function Stats({ items }: Props) {
  return (
    <section className={styles.stats}>
      {items.map((item, i) => (
        <AnimatedItem key={i} index={i}>
        <div className={styles.card}>
          <AnimatedCounter
            value={item.value}
            duration={1800}
            className={styles.value}
          />
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.description}</p>
        </div>
        </AnimatedItem>
      ))}
    </section>
  );
}
