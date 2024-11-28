'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/app/hooks/use-toast"
import { BlogPostForm } from '@/app/components/organisms/forms/BlogPostForm'
import { BlogPost } from '@/app/types/blog'

export default function BlogEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:4000/api/blogs/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!res.ok) {
          throw new Error('記事の取得に失敗しました')
        }

        const data = await res.json()
        setPost(data.post)
      } catch (error) {
        console.error('Error fetching post:', error)
        toast({
          title: "エラー",
          description: "記事の取得に失敗しました",
          variant: "destructive",
        })
        router.push('/applications/dashboard/blog/lists')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id, router, toast])

  if (isLoading) {
    return <div>読み込み中...</div>
  }

  if (!post) {
    return <div>記事が見つかりません</div>
  }

  return (
    <BlogPostForm 
      initialData={{
        title: post.title,
        content: post.content,
        status: post.status === "published"
      }}
      isEditing={true}
      postId={Number(params.id)}
    />
  )
}
