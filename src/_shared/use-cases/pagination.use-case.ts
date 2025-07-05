import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  PaginationInput,
  PaginationOutput,
} from '@/_shared/dtos/pagination.dto'

@Injectable()
export class PaginationUseCase {
  constructor(private prisma: PrismaService) {}

  async execute<T>(
    model: string,
    input: PaginationInput,
    orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
    where?: Record<string, any>,
  ): Promise<PaginationOutput<T>> {
    const { page = 1, itemsPerPage = 10 } = input
    const skip = (page - 1) * itemsPerPage

    const [items, total] = await Promise.all([
      this.prisma[model].findMany({
        skip,
        take: itemsPerPage,
        orderBy,
        where,
      }),
      this.prisma[model].count({ where }),
    ])

    return {
      items,
      total,
    }
  }
}
