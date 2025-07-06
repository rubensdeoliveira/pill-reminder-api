import { Injectable } from '@nestjs/common'

import {
  GetMedicineUseCaseInput,
  GetMedicineUseCaseOutput,
} from '@/medicine/dtos/get-medicine.dto'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class GetMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute(
    input: GetMedicineUseCaseInput,
  ): Promise<GetMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.findById(input)

    if (!medicine) {
      throw new Error('Medicine not found')
    }

    return medicine
  }
}
