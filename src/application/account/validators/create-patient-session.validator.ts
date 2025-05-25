import { z } from 'zod'

import { ZodValidationPipe } from '@/application/shared/pipes/zod-validation.pipe'

const createPatientSessionBodySchema = z.object({
  phone: z.string().min(8),
  dob: z.date(),
})

export type CreatePatientSessionBodySchema = z.infer<
  typeof createPatientSessionBodySchema
>

export const createPatientSessionValidator = new ZodValidationPipe(
  createPatientSessionBodySchema,
)
