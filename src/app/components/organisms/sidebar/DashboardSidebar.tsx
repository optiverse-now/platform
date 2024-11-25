'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Title } from '@/app/components/atoms/typography/Title'
import { NavigationList } from '@/app/components/molecules/navigation/NavigationList'
import { NavigationItemType } from '@/app/types/dashboard'

type DashboardSidebarProps = {
  navigationItems: NavigationItemType[];
}

export function DashboardSidebar({ navigationItems }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-4">
        <Title>管理ダッシュボード</Title>
        <NavigationList
          items={navigationItems}
          currentPath={pathname}
          onNavigate={(path: string) => router.push(path)}
        />
      </div>
    </div>
  )
} 