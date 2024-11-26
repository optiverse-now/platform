import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { blogRouter } from './routes/blog'
import { dashboardRouter } from './routes/dashboard'
import { Bindings } from './types'

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
}))

app.get('/', (c) => c.json({ status: 'ok' }))
app.route('/api/blogs', blogRouter)
app.route('/api/dashboard', dashboardRouter)

const port = process.env.PORT || 4000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})
