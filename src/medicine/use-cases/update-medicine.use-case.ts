import { Injectable, NotFoundException } from '@nestjs/common'

import {
  UpdateMedicineUseCaseInput,
  UpdateMedicineUseCaseOutput,
} from '@/medicine/dtos/update-medicine.dto'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class UpdateMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute({
    id,
    name,
  }: UpdateMedicineUseCaseInput): Promise<UpdateMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.findById({ id })

    if (!medicine) {
      throw new NotFoundException('Medicine not found')
    }

    const updatedMedicine = await this.medicineRepository.update({
      id,
      name,
    })

    return updatedMedicine
  }
}
