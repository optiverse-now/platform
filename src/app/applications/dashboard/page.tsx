'use client'
import { withAuth } from '@/app/middleware'

const Dashboard = () => {
  return (
    <div>
      <h1>ダッシュボード</h1>
      {/* ダッシュボードのコンテンツ */}
    </div>
  )
}

export default withAuth(Dashboard)