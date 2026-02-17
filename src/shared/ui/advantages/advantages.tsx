"use client";

import styles from "./advantages.module.scss";
import { advantages } from "./model/advantages";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { useTranslations } from "next-intl";

const Advantages = ({ title, text, className }: { title?: string; text?: string; className?: string }) => {
  const t = useTranslations("home");
  return (
    <div className={`${styles.advantages} ${className}`}>
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
              <h3 className={`${styles.cardTitle} inter`}>{t(`adv-title${index + 1}`)}</h3>
              <p className={`${styles.cardText} inter`}>{t(`adv-des${index + 1}`)}</p>
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
