'use client'

import { Button } from "@/app/components/ui/button"
import { LayoutDashboard, Newspaper } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export function DashboardSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">管理ダッシュボード</h1>
        <nav className="space-y-2">
          <Button
            variant={pathname === '/applications/dashboard' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => router.push('/applications/dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            ダッシュボード
          </Button>
          <Button
            variant={pathname.includes('/blog') ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => router.push('/applications/dashboard/blog/lists')}
          >
            <Newspaper className="mr-2 h-4 w-4" />
            ブログ
          </Button>
        </nav>
      </div>
    </div>
  )
} 