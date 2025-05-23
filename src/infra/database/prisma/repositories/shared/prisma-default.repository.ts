import { Injectable, InternalServerErrorException } from '@nestjs/common'

import {
  DefaultRepository,
  DefaultRepositoryFieldsToDelete,
} from '@/domain/shared/repositories/default.repository'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'

@Injectable()
export class PrismaDefaultRepository<T> implements DefaultRepository<T> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly model: string,
  ) {
    if (!this.model) {
      throw new InternalServerErrorException('Model is not defined.')
    }
  }

  protected get prisma() {
    return this.prismaService
  }

  async create(entity: Omit<T, DefaultRepositoryFieldsToDelete>): Promise<T> {
    const createdEntity = await this.prisma[this.model].create({
      data: entity,
    })
    return createdEntity
  }

  async list(): Promise<T[]> {
    const listEntities = await this.prisma[this.model].findMany()
    return listEntities
  }

  async findById(id: string): Promise<T | null> {
    const findedEntity = await this.prisma[this.model].findUnique({
      where: { id },
    })
    return findedEntity
  }

  async update(
    id: string,
    entity: Omit<T, DefaultRepositoryFieldsToDelete>,
  ): Promise<T> {
    const updatedEntity = await this.prisma[this.model].update({
      where: { id },
      data: entity,
    })
    return updatedEntity
  }

  async delete(id: string): Promise<void> {
    await this.prisma[this.model].delete({
      where: { id },
    })
  }
}
