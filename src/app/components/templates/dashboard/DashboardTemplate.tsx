import { Header } from '@/app/components/layouts/Header/header'
import { DashboardSidebar } from '@/app/components/organisms/sidebar/DashboardSidebar'
import { DashboardTemplateProps } from '@/app/types/dashboard'

export function DashboardTemplate({ 
  children, 
  headerProps, 
  navigationItems 
}: DashboardTemplateProps) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar navigationItems={navigationItems} />
      <div className="flex-1 p-8">
        <Header {...headerProps} />
        <main>{children}</main>
      </div>
    </div>
  )
} 