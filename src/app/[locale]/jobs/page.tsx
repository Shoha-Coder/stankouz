import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import Vacancies from '@/widgets/vacancies/vacancies'
import React from 'react'
import { useTranslations } from 'next-intl'

const Page = () => {
  const tBreadcrumb = useTranslations("breadcrumbs");
  const BREADCRUMB_ITEMS = [
    { label: tBreadcrumb("home"), href: "" },
    { label: tBreadcrumb("vacancies"), href: "jobs" },
  ];
  return (
    <div>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <Vacancies />
    </div>
  )
}

export default Page