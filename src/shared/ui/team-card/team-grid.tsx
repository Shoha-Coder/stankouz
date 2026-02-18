"use client";

import { useState } from "react";
import styles from "./team-grid.module.scss";
import { TeamCard } from "./team-card";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import Heading from "../heading/heading";
import { Button } from "../button";

type Member = {
  id: number;
  image: string;
  name: string;
  position: string;
  srcSet?: string;
};

type Props = {
  members: Member[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
};

const INITIAL_COUNT = 8;

export function TeamGrid({ members, onLoadMore, hasMore = false, isLoadingMore = false }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayMembers = isExpanded ? members : members.slice(0, INITIAL_COUNT);
  const canShowLess = isExpanded && members.length > INITIAL_COUNT;
  const canShowMore = !isExpanded && hasMore;
  const showButton = canShowMore || canShowLess;

  const handleMoreClick = () => {
    onLoadMore?.();
    setIsExpanded(true);
  };

  return (
    <div className={styles.wrapper}>
      <Heading
        title="Bizning jamoa"
        text="Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga individual yondashuvni taklif etamiz."
      />
      <AnimateOnScroll
        stagger
        rootMargin="0px 0px -40px 0px"
        threshold={0.1}
        className={styles.grid}
      >
        {displayMembers.map((m) => (
          <TeamCard
            key={m.id}
            image={m.image}
            name={m.name}
            position={m.position}
            srcSet={m.srcSet}
          />
        ))}
      </AnimateOnScroll>
      {showButton && (
        <div className={styles.buttonWrap}>
          <Button
            outlinebutton
            circleClassName={canShowLess ? styles.buttonIconUp : styles.buttonIcon}
            className={styles.button}
            onClick={canShowLess ? () => setIsExpanded(false) : handleMoreClick}
            disabled={canShowMore && isLoadingMore}
          >
            {canShowMore && isLoadingMore
              ? "..."
              : canShowLess
                ? "Kamroq"
                : "Ko‘proq"}
          </Button>
        </div>
      )}
    </div>
  );
}
