import { Injectable, NotFoundException } from '@nestjs/common'

import {
  UpdateMedicineUseCaseInput,
  UpdateMedicineUseCaseOutput,
} from '@/medicine/dtos/update-medicine.dto'
import { toMedicineOutput } from '@/medicine/mappers/medicine.mapper'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class UpdateMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute({
    id,
    activeIngredient,
    dosage,
    pharmaceuticalForm,
    administrationRoute,
    posology,
  }: UpdateMedicineUseCaseInput): Promise<UpdateMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.findById({ id })

    if (!medicine) {
      throw new NotFoundException('Medicine not found')
    }

    const medicineByActiveIngredient =
      await this.medicineRepository.findByActiveIngredient({
        activeIngredient,
      })

    if (medicineByActiveIngredient) {
      throw new NotFoundException('Medicine already exists')
    }

    const updatedMedicine = await this.medicineRepository.update({
      id,
      activeIngredient,
      dosage,
      pharmaceuticalForm,
      administrationRoute,
      posology,
    })

    return toMedicineOutput(updatedMedicine)
  }
}
