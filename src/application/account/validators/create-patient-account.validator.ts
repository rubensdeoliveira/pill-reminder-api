import { z } from 'zod'

import { ZodValidationPipe } from '@/application/shared/pipes/zod-validation.pipe'

const createPatientAccountBodySchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  phone: z.string().min(8),
  dob: z.date(),
})

export type CreatePatientAccountBodySchema = z.infer<
  typeof createPatientAccountBodySchema
>

export const createPatientAccountValidator = new ZodValidationPipe(
  createPatientAccountBodySchema,
)
