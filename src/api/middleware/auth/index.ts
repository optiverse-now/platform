import { Context, Next } from 'hono'
import { verifyToken } from '../../utils/jwt'
import type { AuthMiddlewareContext } from './types'

export const authMiddleware = async (c: Context<{ Variables: AuthMiddlewareContext }>, next: Next) => {
  const token = c.req.header('Authorization')?.split(' ')[1]
  
  if (!token) {
    return c.json({ message: '認証が必要です' }, 401)
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return c.json({ message: 'トークンが無効です' }, 401)
  }

  c.set('userId', decoded.userId)
  await next()
} 