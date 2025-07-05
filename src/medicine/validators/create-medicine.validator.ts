import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const createMedicineBodySchema = z.object({
  name: z.string(),
})

export type CreateMedicineBodySchema = z.infer<typeof createMedicineBodySchema>

export const createMedicineValidator = new ZodValidationPipe(
  createMedicineBodySchema,
)
