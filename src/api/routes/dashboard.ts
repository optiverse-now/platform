import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { prisma } from '../lib/prismaClient'
import { generateToken } from '../utils/jwt'
import { Bindings } from '../types'
// import * as bcrypt from 'bcrypt
import { verifyToken } from '../utils/jwt'


const dashboardRouter = new Hono<{ Bindings: Bindings }>()

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(4, "パスワードは6文字以上必要です")
})

dashboardRouter.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = await c.req.valid('json')

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !(await password === user.password)) {
    // if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    return c.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// 保護されたユーザー情報取得エンドポイントを追加
dashboardRouter.get('/protected/user', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ error: 'Authorization header is missing' }, 401)
    }

    const token = authHeader.split(' ')[1]
    // トークンの検証処理
    const decoded = verifyToken(token)
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    })

    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }

    return c.json({ user })
  } catch (error) {
    console.error('Protected route error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

export { dashboardRouter }