import { Context } from 'hono'

export type Bindings = {
  JWT_SECRET: string
}

export type HonoContext = Context<{ Bindings: Bindings }>

export type JWTPayload = {
  userId: number
  email: string
} 