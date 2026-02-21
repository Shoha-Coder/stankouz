import styles from "./vacancy-section.module.scss";
import { VacancyDetail } from "@/shared/ui/vacancy-detail/vacancy-detail";
import { VacancyActions } from "@/entities/vacancy/ui/vacancy-actions";
import type { VacancyDetail as VacancyDetailType } from "@/entities/vacancy";

type Props = {
  vacancy?: VacancyDetailType | null;
};

export function VacancySection({ vacancy }: Props) {
  if (!vacancy) return null;

  return (
    <section className={styles.wrapper}>
      <VacancyDetail
        title={vacancy.title}
        content={vacancy.content.length > 0 ? vacancy.content : [vacancy.description]}
        updatedAt={vacancy.date || undefined}
      />

      <VacancyActions vacancyId={vacancy.id} vacancyTitle={vacancy.title} />
    </section>
  );
}
