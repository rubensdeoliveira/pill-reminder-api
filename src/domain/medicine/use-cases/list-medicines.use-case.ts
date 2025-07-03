import { Injectable } from '@nestjs/common'

import {
  PaginationInput,
  PaginationOutput,
} from '@/domain/shared/models/pagination.model'
import { PaginationUseCase } from '@/domain/shared/use-cases/pagination.use-case'

@Injectable()
export class ListMedicinesUseCase {
  constructor(private paginationUseCase: PaginationUseCase) {}

  async execute(input: PaginationInput): Promise<
    PaginationOutput<{
      id: string
      name: string
      createdAt: Date | null
      updatedAt: Date | null
    }>
  > {
    return this.paginationUseCase.execute('medicine', input)
  }
}
