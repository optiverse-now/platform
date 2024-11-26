import { z } from 'zod'

export const blogs = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
  status: z.enum(['draft', 'published']),
  createdAt: z.string(),
  updatedAt: z.string()
}) 