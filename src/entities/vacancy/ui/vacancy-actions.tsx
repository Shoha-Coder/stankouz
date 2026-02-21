"use client";

import { useState } from "react";
import { ArrowRightIcon, ShareIcon } from "@/shared/ui/icons";
import { ApplicationFormModal } from "@/widgets/application-form";
import styles from "./vacancy-actions.module.scss";
import { usePathname } from "next/navigation";

interface VacancyActionsProps {
  vacancyId?: number;
  vacancyTitle?: string;
}

export function VacancyActions({ vacancyId, vacancyTitle }: VacancyActionsProps) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://stanko.shoha-coder.uz/${pathname}`);
  };

  return (
    <div className={styles.actions}>
      <button className={styles.share} onClick={handleCopy}>
        <span>Ulashish</span>
        <ShareIcon />
      </button>

      <button
        className={styles.apply}
        onClick={() => setModalOpen(true)}
      >
        <span>Ariza qoldirish</span>
        <span className={styles.arrow}>
          <ArrowRightIcon />
        </span>
      </button>

      <ApplicationFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        vacancyId={vacancyId}
        vacancyTitle={vacancyTitle}
        page="vacancy"
      />
    </div>
  );
}
