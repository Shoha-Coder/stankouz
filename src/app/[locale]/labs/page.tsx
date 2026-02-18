import React from 'react'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { LabContent } from '@/widgets/lab-content/lab-content'
import { Products } from '@/widgets/products/products'
import styles from './labs.module.scss'
import { Partners } from '@/widgets/partners/partners'
import { useTranslations } from 'next-intl'

const page = () => {
  const tBreadcrumb = useTranslations("breadcrumbs");
  const BREADCRUMB_ITEMS = [
    { label: tBreadcrumb("home"), href: "" },
    { label: tBreadcrumb("labs"), href: "labs" },
  ];
  return (
    <div className={styles.root}>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <LabContent />
      <Products isLab={true} />
      <Partners isLab={true} />
    </div>
  )
}

export default page