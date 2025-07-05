import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const updateMedicineBodySchema = z.object({
  name: z.string(),
})

export type UpdateMedicineBodySchema = z.infer<typeof updateMedicineBodySchema>

export const updateMedicineValidator = new ZodValidationPipe(
  updateMedicineBodySchema,
)
