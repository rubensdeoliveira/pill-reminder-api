import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  ListPaginatedInput,
  ListPaginatedOutput,
  SharedRepository,
} from '@/_shared/repositories/shared.repository'

@Injectable()
export class SharedPrismaRepository implements SharedRepository {
  constructor(private prisma: PrismaService) {}

  async listPaginated<T>(
    model: string,
    input: ListPaginatedInput,
    orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
    where?: Record<string, any>,
  ): Promise<ListPaginatedOutput<T>> {
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
