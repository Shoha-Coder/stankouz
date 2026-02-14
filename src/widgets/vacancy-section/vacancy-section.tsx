import styles from "./vacancy-section.module.scss";
import { VacancyDetail } from "@/shared/ui/vacancy-detail/vacancy-detail";
import { VacancyActions } from "@/entities/vacancy/ui/vacancy-actions";

export function VacancySection() {
  return (
    <section className={styles.wrapper}>
      <VacancyDetail
        title="Bosh mutaxassis kerak"
        updatedAt="31.01.2026"
        descriptionBlocks={[
          {
            title: "Что нужно будет делать:",
            items: [
              "Разрабатывать и реализовывать стратегию продвижения в соцсетях",
              "Создавать фото- и видеоконтент",
              "Писать тексты для постов и сторис",
              "Взаимодействовать с аудиторией",
              "Анализировать метрики",
            ],
          },
          {
            title: "Наши ожидания:",
            items: [
              "Опыт работы от 1 года",
              "Готовность сниматься в видео-контенте",
              "Грамотная письменная и устная речь",
              "Ответственность и инициативность",
            ],
          },
          {
            title: "Мы предлагаем:",
            items: [
              "Доход: 300 000 000 сум на руки",
              "Оформление по ГПХ или в штат",
              "Поддержка команды",
              "Рост вместе с брендом",
            ],
          },
        ]}
      />

      <VacancyActions />
    </section>
  );
}
