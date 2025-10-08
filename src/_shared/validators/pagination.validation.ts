import { z } from 'zod'

import { ZodValidationPipe } from '@/_shared/pipes/zod-validation.pipe'

const paginationBodySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  itemsPerPage: z.coerce.number().min(1).optional().default(10),
})

export type PaginationBodySchema = z.infer<typeof paginationBodySchema>

export const paginationValidator = new ZodValidationPipe(paginationBodySchema)
