import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const saveMedicineBodySchema = z.object({
  name: z.string(),
})

export type SaveMedicineBodySchema = z.infer<typeof saveMedicineBodySchema>

export const saveMedicineValidator = new ZodValidationPipe(
  saveMedicineBodySchema,
)
