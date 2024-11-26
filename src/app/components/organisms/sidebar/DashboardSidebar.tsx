'use client'

import { usePathname, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Title } from '@/app/components/atoms/typography/Title'
import { NavigationList } from '@/app/components/molecules/navigation/NavigationList'
import { NavigationItemType } from '@/app/types/dashboard'
import { Button } from '@/app/components/ui/button'

type DashboardSidebarProps = {
  navigationItems: NavigationItemType[];
  onClose?: () => void;
}

export function DashboardSidebar({ navigationItems, onClose }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="h-full bg-white shadow-md">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <Title>管理ダッシュボード</Title>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden"
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
        <NavigationList
          items={navigationItems}
          currentPath={pathname}
          onNavigate={(path: string) => {
            router.push(path)
            onClose?.()
          }}
        />
      </div>
    </div>
  )
} 