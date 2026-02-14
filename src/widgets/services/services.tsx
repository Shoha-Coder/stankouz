"use client";

import styles from "./services.module.scss";
import { services } from "./model/services";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "@/shared/ui/scroll-stack/scroll-stack";

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

      {/* LIST - ScrollStack: cards pin and stack as you scroll */}
      <ScrollStack
        itemDistance={0}
        itemStackDistance={70}
        baseScale={1}
        stackPosition="25%"
        scaleEndPosition="15%"
      >
        <div className={styles.list}>
          {services.map((item) => (
            <ScrollStackItem itemClassName={styles.row} key={item.id}>
              <Image src={item.image} alt={item.title} className={styles.image} width={433} height={256} />

              <div className={styles.textBlock}>
                <h3 className={styles.rowTitle}>{item.title}</h3>
                <p className={styles.rowShort}>{item.short}</p>
              </div>

              <p className={styles.rowText}>{item.text}</p>
            </ScrollStackItem>
          ))}
        </div>
      </ScrollStack>
    </section>
  );
}
