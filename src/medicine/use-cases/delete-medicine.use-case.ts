import { Injectable, NotFoundException } from '@nestjs/common'

import {
  DeleteMedicineUseCaseInput,
  DeleteMedicineUseCaseOutput,
} from '@/medicine/dtos/delete-medicine.dto'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class DeleteMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute({
    id,
  }: DeleteMedicineUseCaseInput): Promise<DeleteMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.findById({ id })

    if (!medicine) {
      throw new NotFoundException('Medicine not found')
    }

    await this.medicineRepository.delete({ id })
  }
}
