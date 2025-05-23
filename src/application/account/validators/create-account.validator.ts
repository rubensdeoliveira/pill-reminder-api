import { z } from 'zod'

import { ZodValidationPipe } from '@/application/shared/pipes/zod-validation.pipe'

const createAccountBodySchema = z
  .object({
    name: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
      })
    }
  })

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

export const createAccountValidator = new ZodValidationPipe(
  createAccountBodySchema,
)
