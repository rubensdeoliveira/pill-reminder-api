import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  GenericRepository,
  ListPaginatedInput,
  ListPaginatedOutput,
} from '@/_shared/repositories/generic.repository'

@Injectable()
export class GenericPrismaRepository implements GenericRepository {
  constructor(private prisma: PrismaService) {}

  async listPaginated<T>({
    model,
    pagination,
    orderBy,
    where,
    select,
  }: ListPaginatedInput<T>): Promise<ListPaginatedOutput<T>> {
    const { page = 1, itemsPerPage = 10 } = pagination
    const skip = (page - 1) * itemsPerPage

    const [items, total] = await Promise.all([
      this.prisma[model].findMany({
        skip,
        take: itemsPerPage,
        orderBy,
        where,
        select,
      }),
      this.prisma[model].count({ where }),
    ])

    return {
      items,
      total,
    }
  }
}
