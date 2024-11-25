'use client'

import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useRouter } from 'next/navigation'
import { HeaderProps } from './types'

export function Header({ title, tabs }: HeaderProps) {
  const router = useRouter()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {tabs && (
        <Tabs defaultValue={tabs.items[0].value}>
          <TabsList className="mb-4">
            {tabs.items.map((tab) => (
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
      )}
    </div>
  )
}