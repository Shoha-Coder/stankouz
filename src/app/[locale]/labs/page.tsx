import React from 'react'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { LabContent } from '@/widgets/lab-content/lab-content'
import { Products } from '@/widgets/products/products'
import styles from './labs.module.scss'
import { Partners } from '@/widgets/partners/partners'

const items = [
    { label: 'Home', href: '/' },
    { label: 'Lab', href: '/lab' },
]

const page = () => {
  return (
    <div className={styles.root}>
      <Breadcrumb items={items} />
      <LabContent />
      <Products isLab={true} />
      <Partners isLab={true} />
    </div>
  )
}

export default page