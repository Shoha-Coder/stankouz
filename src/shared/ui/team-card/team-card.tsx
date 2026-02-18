"use client";

import styles from "./team-card.module.scss";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";

type TeamCardProps = {
  image: string;
  name: string;
  position: string;
  srcSet?: string;
};

export function TeamCard({ image, name, position, srcSet }: TeamCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <ImageWithLoader
          src={image}
          alt={name}
          width={433}
          height={256}
          fillWrapper
          srcSet={srcSet}
        />
      </div>

      <h3 className={styles.name}>{name}</h3>
      <p className={styles.position}>{position}</p>
    </article>
  );
}
