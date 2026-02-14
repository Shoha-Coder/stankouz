"use client";

import styles from "./lab-description.module.scss";

interface Props {
  text: string;
}

export function LabDescription({ text }: Props) {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={styles.root}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
