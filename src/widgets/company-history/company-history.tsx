"use client";

import { useState } from "react";
import styles from "./company-history.module.scss";
import type { HistoryItem } from "./model/history";

type Props = {
  title: string;
  items: HistoryItem[];
};

export function CompanyHistory({ title, items }: Props) {
  const [activeYear, setActiveYear] = useState(items[0].year);
  const activeItem = items.find((i) => i.year === activeYear)!;

  return (
    <section className={styles.root}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.layout}>
        {/* MAIN IMAGE */}
        <div className={styles.mainImage}>
          <img src={activeItem.image} alt={activeItem.title} />
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {/* THUMBNAILS */}
          <div className={styles.thumbs}>
            {items?.slice(0, 2)?.map((item) => (
              <button
                key={item.year}
                className={`${styles.thumb} ${
                  item.year === activeYear ? styles.activeThumb : ""
                }`}
                onClick={() => setActiveYear(item.year)}
                aria-label={`Show year ${item.year}`}
              >
                <img src={item.image} alt="" />
              </button>
            ))}
          </div>

          {/* YEARS */}
          <div className={styles.years}>
            {items.map((item) => (
              <button
                key={item.year}
                className={`${styles.year} ${
                  item.year === activeYear ? styles.activeYear : ""
                }`}
                onClick={() => setActiveYear(item.year)}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* TEXT */}
          <h3 className={styles.title}>{activeItem.title}</h3>
          <p className={styles.description}>{activeItem.description}</p>
        </div>
      </div>
    </section>
  );
}
