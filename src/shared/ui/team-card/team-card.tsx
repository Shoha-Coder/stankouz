"use client";

import styles from "./team-card.module.scss";
import Image from "next/image";

type TeamCardProps = {
  image: string;
  name: string;
  position: string;
};

export function TeamCard({ image, name, position }: TeamCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={image} alt={name} width={433} height={256} />
      </div>

      <h3 className={styles.name}>{name}</h3>
      <p className={styles.position}>{position}</p>
    </article>
  );
}
