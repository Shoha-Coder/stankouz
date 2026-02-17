"use client";

import styles from "./html-content.module.scss";

type Props = {
  /** Single HTML string or array of HTML blocks (e.g. paragraphs) */
  content: string | string[];
  className?: string;
};

export function HtmlContent({ content, className = "" }: Props) {
  const blocks = Array.isArray(content) ? content : [content].filter(Boolean);

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      {blocks.map((html, i) => (
        <div
          key={i}
          className={styles.block}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </div>
  );
}
