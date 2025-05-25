import { z } from 'zod'

import { ZodValidationPipe } from '@/application/shared/pipes/zod-validation.pipe'

const createDentistAccountBodySchema = z
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

export type CreateDentistAccountBodySchema = z.infer<
  typeof createDentistAccountBodySchema
>

export const createDentistAccountValidator = new ZodValidationPipe(
  createDentistAccountBodySchema,
)
