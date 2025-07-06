import { Injectable } from '@nestjs/common'

import { GenericRepository } from '@/_shared/repositories/generic.repository'
import {
  ListMedicineInput,
  ListMedicineOutput,
  ListMedicineOutputItem,
} from '@/medicine/dtos/list-medicine.dto'

@Injectable()
export class ListMedicineUseCase {
  constructor(private genericRepository: GenericRepository) {}

  async execute({
    itemsPerPage,
    page,
  }: ListMedicineInput): Promise<ListMedicineOutput> {
    const medicineListPaginated =
      await this.genericRepository.listPaginated<ListMedicineOutputItem>({
        model: 'medicine',
        pagination: {
          itemsPerPage,
          page,
        },
        select: {
          id: true,
          name: true,
        },
      })
    return medicineListPaginated
  }
}
