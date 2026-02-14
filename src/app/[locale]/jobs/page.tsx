import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import Vacancies from '@/widgets/vacancies/vacancies'
import React from 'react'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Vacancies', href: '/jobs' },
]

const page = () => {
  return (
    <div>
      <Breadcrumb items={items} />
      <Vacancies />
    </div>
  )
}

export default page