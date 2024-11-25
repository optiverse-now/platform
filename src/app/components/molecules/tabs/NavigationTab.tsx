'use client'

import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useRouter } from 'next/navigation'
import { NavigationTabProps } from './types'

export function NavigationTab({ items, defaultValue }: NavigationTabProps) {
  const router = useRouter()

  return (
    <Tabs defaultValue={defaultValue || items[0].value}>
      <TabsList className="mb-4">
        {items.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => router.push(tab.href)}
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
} 