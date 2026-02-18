"use client";

import { useState, useEffect } from "react";
import styles from "./advantages.module.scss";
import { advantages } from "./model/advantages";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { useTranslations } from "next-intl";
import ScrollStack, { ScrollStackItem } from "@/shared/ui/scroll-stack/scroll-stack";

const MOBILE_BREAKPOINT = 640; /* Match grid cols 1 breakpoint */

interface AdvantagesProps {
  title?: string;
  text?: string;
  className?: string;
  /** Use ScrollStack for vertical stacking effect on mobile (1-col) only */
  isStack?: boolean;
}

const Advantages = ({ title, text, className, isStack = true }: AdvantagesProps) => {
  const t = useTranslations("home");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const useStack = isStack && isMobile;

  return (
    <div className={`${styles.advantages} ${className}`}>
      <header className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {text && <p className={styles.subtitle}>{text}</p>}
      </header>
      {useStack ? (
        <ScrollStack
          className={styles.cardsStack}
          useWindowScroll
          itemDistance={60}
          itemStackDistance={20}
        >
          {advantages.map((item, index) => (
            <ScrollStackItem key={item.id} itemClassName={styles.card}>
              <div className={styles.cardTop}>
                <h3 className={`${styles.cardTitle} inter`}>{t(`adv-title${index + 1}`)}</h3>
                <p className={`${styles.cardText} inter`}>{t(`adv-des${index + 1}`)}</p>
              </div>
              <span className={`${styles.cardIndex} inter`}>{item.id}</span>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      ) : (
        <div className={styles.cards}>
          {advantages.map((item, index) => (
            <AnimatedItem key={item.id} index={index}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <h3 className={`${styles.cardTitle} inter`}>{t(`adv-title${index + 1}`)}</h3>
                  <p className={`${styles.cardText} inter`}>{t(`adv-des${index + 1}`)}</p>
                </div>
                <span className={`${styles.cardIndex} inter`}>{item.id}</span>
              </div>
            </AnimatedItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default Advantages;
