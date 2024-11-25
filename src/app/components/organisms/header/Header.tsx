'use client'

import { Heading } from '@/app/components/atoms/typography/Heading'
import { NavigationTab } from '@/app/components/molecules/tabs/NavigationTab'
import { HeaderProps } from '@/app/components/layouts/Header/types'

export function Header({ title, tabs }: HeaderProps) {
  return (
    <div className="mb-6">
      <Heading>{title}</Heading>
      {tabs && <NavigationTab items={tabs.items} />}
    </div>
  )
} 