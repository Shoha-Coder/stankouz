"use client";

import styles from "./lab-detail-info.module.scss";

interface Props {
  title: string;
  description: string;
}

export function LabDetailInfo({ title, description }: Props) {
  const paragraphs = description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.description}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
