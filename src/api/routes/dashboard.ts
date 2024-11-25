import { Hono } from 'hono'
// import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'
import { authMiddleware } from '../middleware/auth'
import { prisma } from '../lib/prismaClient'

type Variables = {
  userId: number;
};

const dashboard = new Hono<{ Variables: Variables }>()

dashboard.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json()

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true
      }
    })


    if (!user) {
      return c.json({ 
        success: false,
        message: 'メールアドレスまたはパスワードが間違っています' 
      }, 401)
    }

    // const isValid = await bcrypt.compare(password, user.password)
    const isValid = password === user.password

    if (!isValid) {
      return c.json({ 
        success: false,
        message: 'メールアドレスまたはパスワードが間違っています' 
      }, 401)
    }

    const token = generateToken(user.id)
    return c.json({ 
      success: true,
      token, 
      userId: user.id 
    })

  } catch (error) {
    console.error('Login error:', error)
    return c.json({ 
      success: false,
      message: 'ログイン処理中にエラーが発生しました' 
    }, 500)
  }
})

dashboard.use('/protected/*', authMiddleware)

dashboard.get('/protected/user', async (c) => {
  const userId = c.get('userId')
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      createAt: true
    }
  })

  if (!user) {
    return c.json({ message: 'ユーザーが見つかりません' }, 404)
  }

  return c.json(user)
})

export { dashboard }
