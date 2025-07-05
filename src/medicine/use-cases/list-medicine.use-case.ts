import { Injectable } from '@nestjs/common'

import { PaginationInput } from '@/_shared/dtos/pagination.dto'
import { PaginationUseCase } from '@/_shared/use-cases/pagination.use-case'
import { ListMedicineOutput } from '@/medicine/dtos/list-medicine.dto'

@Injectable()
export class ListMedicineUseCase {
  constructor(private paginationUseCase: PaginationUseCase) {}

  async execute(input: PaginationInput): Promise<ListMedicineOutput> {
    return this.paginationUseCase.execute('medicine', input)
  }
}
