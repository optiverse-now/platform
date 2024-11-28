'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/app/hooks/use-toast"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"

interface BlogPostFormProps {
  initialData?: {
    title: string
    content: string
    status: boolean
  }
  isEditing?: boolean
  postId?: number
}

export function BlogPostForm({ initialData, isEditing = false, postId }: BlogPostFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [status, setStatus] = useState<boolean>(initialData?.status || true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      const url = isEditing 
        ? `http://localhost:4000/api/blogs/${postId}`
        : 'http://localhost:4000/api/blogs'
      
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          status
        })
      })

      if (!res.ok) {
        throw new Error(isEditing ? '記事の更新に失敗しました' : '記事の作成に失敗しました')
      }

      toast({
        title: "成功",
        description: isEditing ? "記事を更新しました" : "記事を作成しました",
      })
      
      router.push('/applications/dashboard/blog/lists')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">内容</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={isLoading}
            rows={15}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">ステータス</Label>
          <select
            id="status"
            value={status.toString()}
            onChange={(e) => setStatus(e.target.value === 'true')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          >
            <option value="true">公開</option>
            <option value="false">下書き</option>
          </select>
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '保存中...' : (isEditing ? '更新する' : '作成する')}
      </Button>
    </form>
  )
} 