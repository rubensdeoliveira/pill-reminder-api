import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const createDentistBodySchema = z
  .object({
    name: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    phone: z.string().min(11),
    dob: z.date(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
      })
    }
  })

export type CreateDentistBodySchema = z.infer<typeof createDentistBodySchema>

export const createDentistValidator = new ZodValidationPipe(
  createDentistBodySchema,
)
