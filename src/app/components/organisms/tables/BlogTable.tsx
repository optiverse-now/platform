'use client'

import { useState, useEffect, useCallback } from 'react'
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
import { useToast } from "@/app/hooks/use-toast"

export function BlogTable() {
  const router = useRouter()
  const { toast } = useToast()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // データ取得関数をuseCallbackでメモ化
  const fetchPosts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:4000/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('ブログ記事の取得に失敗しました')
      }

      const data = await res.json()
      setPosts(data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast({
        title: "エラー",
        description: "ブログ記事の取得に失敗しました",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleEdit = useCallback((id: number) => {
    router.push(`/applications/dashboard/blog/edit/${id}`)
  }, [router])

  const handleDelete = useCallback(async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:4000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('記事の削除に失敗しました')
      }

      setPosts(prev => prev.filter(post => post.id !== id))
      toast({
        title: "成功",
        description: "記事を削除しました",
      })
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: "エラー",
        description: "記事の削除に失敗しました",
        variant: "destructive",
      })
    }
  }, [toast])

  if (isLoading) {
    return <div>読み込み中...</div>
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
        {posts.length === 0 ? (
          <TableRow>
            <td colSpan={3} className="text-center py-4">
              記事がありません
            </td>
          </TableRow>
        ) : (
          posts.map((post) => (
            <BlogTableRow
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </TableBody>
    </Table>
  )
} 