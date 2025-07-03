import { Injectable } from '@nestjs/common'

import {
  PaginationInput,
  PaginationOutput,
} from '@/domain/shared/models/pagination.model'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'

@Injectable()
export class PaginationUseCase {
  constructor(private prisma: PrismaService) {}

  async execute<T>(
    model: string,
    input: PaginationInput,
    orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
    where?: Record<string, any>,
  ): Promise<PaginationOutput<T>> {
    const { page = 1, limit = 10 } = input
    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      this.prisma[model].findMany({
        skip,
        take: limit,
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
