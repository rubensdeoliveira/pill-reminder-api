import { z } from 'zod'

import { ZodValidationPipe } from '@/application/shared/pipes/zod-validation.pipe'

const createTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
})

export type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>

export const createTaskValidator = new ZodValidationPipe(createTaskBodySchema)
