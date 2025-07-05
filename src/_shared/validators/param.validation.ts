import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const paramBodySchema = z.object({
  id: z.string().uuid(),
})

export type ParamBodySchema = z.infer<typeof paramBodySchema>

export const paramValidator = new ZodValidationPipe(paramBodySchema)
