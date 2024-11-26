import { sign, verify } from 'jsonwebtoken'
import { JWTPayload } from '../types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const generateToken = (payload: JWTPayload): string => {
  return sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

export const verifyToken = (token: string): JWTPayload => {
  return verify(token, JWT_SECRET) as JWTPayload
}
