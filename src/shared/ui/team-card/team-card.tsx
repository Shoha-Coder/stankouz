"use client";

import styles from "./team-card.module.scss";

type TeamCardProps = {
  image: string;
  name: string;
  position: string;
};

export function TeamCard({ image, name, position }: TeamCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={name} />
      </div>

      <h3 className={styles.name}>{name}</h3>
      <p className={styles.position}>{position}</p>
    </article>
  );
}
