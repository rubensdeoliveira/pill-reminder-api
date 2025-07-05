import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const paginationBodySchema = z.object({
  page: z.number().optional(),
  itemsPerPage: z.number().optional(),
})

export type PaginationBodySchema = z.infer<typeof paginationBodySchema>

export const paginationValidator = new ZodValidationPipe(paginationBodySchema)
