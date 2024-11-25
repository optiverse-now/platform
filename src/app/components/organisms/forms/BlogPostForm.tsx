'use client'

import { useState } from 'react'
import { BlogFormData } from '@/app/types/blog'
import { FormInput } from '@/app/components/atoms/forms/FormInput'
import { FormTextarea } from '@/app/components/atoms/forms/FormTextarea'
import { ActionButton } from '@/app/components/atoms/buttons/ActionButton'

export function BlogPostForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) throw new Error('Failed to create post')
      
      setFormData({ title: '', content: '' })
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <ActionButton onClick={() => {}}>投稿する</ActionButton>
    </form>
  )
} 