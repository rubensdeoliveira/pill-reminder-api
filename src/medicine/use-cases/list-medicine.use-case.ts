import { Injectable } from '@nestjs/common'

import { GenericRepository } from '@/_shared/repositories/generic.repository'
import {
  ListMedicineInput,
  ListMedicineOutput,
} from '@/medicine/dtos/list-medicine.dto'
import { MedicineOutput } from '@/medicine/dtos/medicine.dto'

@Injectable()
export class ListMedicineUseCase {
  constructor(private genericRepository: GenericRepository) {}

  async execute({
    itemsPerPage,
    page,
  }: ListMedicineInput): Promise<ListMedicineOutput> {
    const medicineListPaginated =
      await this.genericRepository.listPaginated<MedicineOutput>({
        model: 'medicine',
        pagination: {
          itemsPerPage,
          page,
        },
        select: {
          id: true,
          activeIngredient: true,
          dosage: true,
          pharmaceuticalForm: true,
          administrationRoute: true,
          posology: true,
        },
      })
    return medicineListPaginated
  }
}
