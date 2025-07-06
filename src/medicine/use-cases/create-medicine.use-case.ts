import { Injectable } from '@nestjs/common'

import {
  CreateMedicineUseCaseInput,
  CreateMedicineUseCaseOutput,
} from '@/medicine/dtos/create-medicine.dto'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class CreateMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute({
    name,
  }: CreateMedicineUseCaseInput): Promise<CreateMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.create({
      name,
    })

    return medicine
  }
}
