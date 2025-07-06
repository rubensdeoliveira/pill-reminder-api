import { Injectable } from '@nestjs/common'

import {
  UpdateMedicineUseCaseInput,
  UpdateMedicineUseCaseOutput,
} from '@/medicine/dtos/update-medicine.dto'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class UpdateMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute(
    input: UpdateMedicineUseCaseInput,
  ): Promise<UpdateMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.findById({ id: input.id })

    if (!medicine) {
      throw new Error('Medicine not found')
    }

    const updatedMedicine = await this.medicineRepository.update(input)

    return updatedMedicine
  }
}
