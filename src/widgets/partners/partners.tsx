"use client";

import { LogosCarousel } from "@/shared/ui/logos-carousel";
import { useTranslations } from "next-intl";
import { usePartners } from "@/entities/partner/model/usePartners";
import { toCarouselItems } from "@/entities/partner/model/mappers";

interface PartnersProps {
  isLab?: boolean;
}

export function Partners({ isLab }: PartnersProps) {
  const t = useTranslations("home");
  const { data: partners = [], isPending, isError } = usePartners();
  const items = toCarouselItems(partners);

  if (isPending || isError || items.length === 0) {
    return null;
  }

  return (
    <LogosCarousel
      title={t("partners")}
      subtitle={t("partners-title")}
      items={items}
    />
  );
}
