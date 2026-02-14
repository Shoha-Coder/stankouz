import { VacancyCard } from "@/shared/ui/vacancy-card/vacancy-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import styles from "./vacancies.module.scss";
import { vacancies } from "./model/vacancies";
import { Button } from "@/shared/ui/button";

const Vacancies = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.vacancies}>
        {vacancies.map((vacancy, index) => (
          <AnimatedItem key={index} index={index}>
            <VacancyCard
              id={index + 1}
              date={vacancy.date}
              title={vacancy.title}
              description={vacancy.description}
            />
          </AnimatedItem>
        ))}
      </div>
      <Button
        className={styles.button}
        outlinebutton
        circleClassName={styles.buttonIcon}
      >
        Ko‘proq
      </Button>
    </div>
  );
};

export default Vacancies;
