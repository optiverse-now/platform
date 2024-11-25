'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/app/types/blog'
import { BlogTableRow } from '@/app/components/molecules/tables/BlogTableRow'
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/app/components/ui/table"

export function BlogTable() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([
    { id: 1, title: "React Hooksの基本", content: "", status: "published" },
    { id: 2, title: "Next.jsで始めるSSR", content: "", status: "draft" },
    { id: 3, title: "TypeScriptの型システム", content: "", status: "published" },
  ])

  const handleEdit = (id: number) => {
    router.push(`/applications/dashboard/blog/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>タイトル</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead className="text-right">アクション</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <BlogTableRow
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </TableBody>
    </Table>
  )
} 