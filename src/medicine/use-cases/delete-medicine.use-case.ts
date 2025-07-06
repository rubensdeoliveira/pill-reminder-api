import { Injectable } from '@nestjs/common'

import { DeleteMedicineUseCaseInput } from '@/medicine/dtos/delete-medicine.dto'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class DeleteMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute(input: DeleteMedicineUseCaseInput): Promise<void> {
    const medicine = await this.medicineRepository.findById(input)

    if (!medicine) {
      throw new Error('Medicine not found')
    }

    await this.medicineRepository.delete(input)
  }
}
