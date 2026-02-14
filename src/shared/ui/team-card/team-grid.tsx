"use client";

import styles from "./team-grid.module.scss";
import { TeamCard } from "./team-card";
import Heading from "../heading/heading";
import { Button } from "../button";

type Member = {
  id: number;
  image: string;
  name: string;
  position: string;
};

type Props = {
  members: Member[];
};

export function TeamGrid({ members }: Props) {
  return (
    <div className={styles.wrapper}>
      <Heading
        title="Bizning jamoa"
        text="Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga individual yondashuvni taklif etamiz."
      />
      <section className={styles.grid}>
        {members.map((m) => (
          <TeamCard
            key={m.id}
            image={m.image}
            name={m.name}
            position={m.position}
          />
        ))}
      </section>
      <div className={styles.buttonWrap}>
        <Button
          outlinebutton
          circleClassName={styles.buttonIcon}
          className={styles.button}
        >
          Ko‘proq
        </Button>
      </div>
    </div>
  );
}
