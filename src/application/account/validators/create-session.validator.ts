import { z } from 'zod'

import { ZodValidationPipe } from '@/application/shared/pipes/zod-validation.pipe'

const createSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateSessionBodySchema = z.infer<typeof createSessionBodySchema>

export const createSessionValidator = new ZodValidationPipe(
  createSessionBodySchema,
)
