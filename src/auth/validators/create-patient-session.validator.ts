import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const createPatientSessionBodySchema = z.object({
  phone: z.string().min(8),
  dob: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: 'Invalid date',
    })
    .transform((val) => new Date(val)),
})

export type CreatePatientSessionBodySchema = z.infer<
  typeof createPatientSessionBodySchema
>

export const createPatientSessionValidator = new ZodValidationPipe(
  createPatientSessionBodySchema,
)
