import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { ContactSection } from "@/widgets/contact-section/contact-section";
import MapSection from "@/widgets/map-section/map-section";
import React from "react";

const items = [
    { label: "Home", href: "" },
    { label: "Contacts", href: "contacts" },
]

const page = () => {
  return (
    <>
      <Breadcrumb items={items} />
      <ContactSection />
      <MapSection />
    </>
  );
};

export default page;
