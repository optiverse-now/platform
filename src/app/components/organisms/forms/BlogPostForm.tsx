'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormInput } from '@/app/components/atoms/forms/FormInput'
import { FormTextarea } from '@/app/components/atoms/forms/FormTextarea'
import { ActionButton } from '@/app/components/atoms/buttons/ActionButton'
import { useToast } from '@/app/hooks/use-toast'

type BlogFormData = {
  title: string;
  content: string;
  authorId: number;
  status: boolean;
}

export function BlogPostForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    authorId: 2,
    status: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:4000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      await response.json()
      
      toast({
        title: "投稿成功",
        description: "ブログ記事が正常に投稿されました。",
      })

      router.push('/applications/dashboard/blog/lists')
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: "エラー",
        description: "投稿に失敗しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            タイトル
          </label>
          <FormInput
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            内容
          </label>
          <FormTextarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <ActionButton
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          キャンセル
        </ActionButton>
        <ActionButton
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? '投稿中...' : '投稿する'}
        </ActionButton>
      </div>
    </form>
  )
} 