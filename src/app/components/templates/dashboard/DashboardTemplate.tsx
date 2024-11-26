'use client'

import { useState } from 'react'
import { Header } from '@/app/components/layouts/Header/header'
import { DashboardSidebar } from '@/app/components/organisms/sidebar/DashboardSidebar'
import { MenuButton } from '@/app/components/atoms/buttons/MenuButton'
import { DashboardTemplateProps } from '@/app/types/dashboard'

export function DashboardTemplate({ 
  children, 
  headerProps, 
  navigationItems 
}: DashboardTemplateProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen relative">
      {/* モバイルオーバーレイ */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* サイドバー */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <DashboardSidebar navigationItems={navigationItems} />
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 min-w-0">
        <div className="p-4 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Header {...headerProps} />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
} 