import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { ContactSection } from "@/widgets/contact-section/contact-section";
import MapSection from "@/widgets/map-section/map-section";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const tBreadcrumb = useTranslations("breadcrumbs");
  const BREADCRUMB_ITEMS = [
    { label: tBreadcrumb("home"), href: "" },
    { label: tBreadcrumb("contacts"), href: "contacts" },
  ];
  return (
    <>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <ContactSection />
      <MapSection />
    </>
  );
};

export default Page;
