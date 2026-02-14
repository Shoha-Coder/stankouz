import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { VacancySection } from "@/widgets/vacancy-section/vacancy-section";
import React from "react";

const items = [
  { label: "Home", href: "/" },
  { label: "Ish o‘rinlari", href: "/jobs" },
];

const page = () => {
  return (
    <div>
      <Breadcrumb items={items} />
      <VacancySection />
    </div>
  );
};

export default page;
