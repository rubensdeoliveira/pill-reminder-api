import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const createPatientBodySchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  phone: z.string().min(8),
  dob: z.date(),
})

export type CreatePatientBodySchema = z.infer<typeof createPatientBodySchema>

export const createPatientValidator = new ZodValidationPipe(
  createPatientBodySchema,
)
