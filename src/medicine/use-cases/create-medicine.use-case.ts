import { Injectable, NotFoundException } from '@nestjs/common'

import {
  CreateMedicineUseCaseInput,
  CreateMedicineUseCaseOutput,
} from '@/medicine/dtos/create-medicine.dto'
import { toMedicineOutput } from '@/medicine/mappers/medicine.mapper'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class CreateMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute({
    activeIngredient,
    dosage,
    pharmaceuticalForm,
    administrationRoute,
    posology,
  }: CreateMedicineUseCaseInput): Promise<CreateMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.findByActiveIngredient({
      activeIngredient,
    })

    if (medicine) {
      throw new NotFoundException('Medicine already exists')
    }

    const createdMedicine = await this.medicineRepository.create({
      activeIngredient,
      dosage,
      pharmaceuticalForm,
      administrationRoute,
      posology,
    })

    return toMedicineOutput(createdMedicine)
  }
}
