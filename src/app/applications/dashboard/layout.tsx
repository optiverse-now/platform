'use client'

import { DashboardTemplate } from "@/app/components/templates/dashboard/DashboardTemplate"
import { FileText, Plus, LayoutDashboard, Newspaper } from "lucide-react"
import { usePathname } from 'next/navigation'
import { NavigationItemType, TabItem } from '@/app/types/dashboard'

const navigationItems: NavigationItemType[] = [
  {
    icon: LayoutDashboard,
    label: "ダッシュボード",
    path: "/applications/dashboard"
  },
  {
    icon: Newspaper,
    label: "ブログ",
    path: "/applications/dashboard/blog/lists"
  }
]

const getBlogTabs = (): { items: TabItem[] } => ({
  items: [
    {
      value: "posts",
      label: "記事一覧",
      icon: <FileText className="w-4 h-4 mr-2" />,
      href: "/applications/dashboard/blog/lists"
    },
    {
      value: "create",
      label: "新規作成",
      icon: <Plus className="w-4 h-4 mr-2" />,
      href: "/applications/dashboard/blog/create"
    }
  ]
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const getHeaderProps = () => {
    if (pathname.includes('/blog')) {
      return {
        title: "ブログ管理",
        tabs: getBlogTabs()
      }
    }
    
    return {
      title: "プラットフォーム管理"
    }
  }

  return (
    <DashboardTemplate 
      headerProps={getHeaderProps()}
      navigationItems={navigationItems}
    >
      {children}
    </DashboardTemplate>
  )
} 