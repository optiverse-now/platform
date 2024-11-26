import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { prisma } from '../lib/prismaClient'
import { Bindings } from '../types'

const blogRouter = new Hono<{ Bindings: Bindings }>()

const createBlogSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "内容は必須です"),
  authorId: z.number(),
  status: z.boolean().default(true)
})

type BlogPost = z.infer<typeof createBlogSchema>

// ブログ記事一覧の取得
blogRouter.get('/', async (c) => {
  try {
    const posts = await prisma.article.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createAt: 'desc' }
    })
    return c.json({ posts })
  } catch (err) {
    console.error('Error fetching posts:', err)
    return c.json({ error: 'Failed to fetch blog posts' }, 500)
  }
})

// ブログ記事の作成
blogRouter.post('/', zValidator('json', createBlogSchema), async (c) => {
  try {
    const data = await c.req.valid('json') as BlogPost
    const post = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        status: data.status,
        authorId: data.authorId
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    return c.json({ post }, 201)
  } catch (err) {
    console.error('Error creating post:', err)
    return c.json({ error: 'Failed to create blog post' }, 500)
  }
})

// ブログ記事の削除
blogRouter.delete('/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'))
    await prisma.article.delete({
      where: { id }
    })
    return c.json({ message: 'Blog post deleted successfully' })
  } catch (err) {
    console.error('Error deleting post:', err)
    return c.json({ error: 'Failed to delete blog post' }, 500)
  }
})

// ブログ記事の更新
blogRouter.patch('/:id', zValidator('json', createBlogSchema), async (c) => {
  try {
    const id = Number(c.req.param('id'))
    const data = await c.req.valid('json') as BlogPost
    
    const updated = await prisma.article.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        status: data.status,
        authorId: data.authorId
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return c.json({ post: updated })
  } catch (err) {
    console.error('Error updating post:', err)
    return c.json({ error: 'Failed to update blog post' }, 500)
  }
})

export { blogRouter }
