import { Injectable } from '@nestjs/common'

import { SharedRepository } from '@/_shared/repositories/shared.repository'
import {
  ListMedicineInput,
  ListMedicineOutput,
} from '@/medicine/dtos/list-medicine.dto'
import { MedicineEntity } from '@/medicine/entities/medicine.entity'

@Injectable()
export class ListMedicineUseCase {
  constructor(private sharedRepository: SharedRepository) {}

  async execute(input: ListMedicineInput): Promise<ListMedicineOutput> {
    const medicineList =
      await this.sharedRepository.listPaginated<MedicineEntity>(
        'medicine',
        input,
      )
    return medicineList
  }
}
