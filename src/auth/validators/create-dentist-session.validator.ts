import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const createDentistSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateDentistSessionBodySchema = z.infer<
  typeof createDentistSessionBodySchema
>

export const createDentistSessionValidator = new ZodValidationPipe(
  createDentistSessionBodySchema,
)
