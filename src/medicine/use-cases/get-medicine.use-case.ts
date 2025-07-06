import { Injectable, NotFoundException } from '@nestjs/common'

import {
  GetMedicineUseCaseInput,
  GetMedicineUseCaseOutput,
} from '@/medicine/dtos/get-medicine.dto'
import { toMedicineOutput } from '@/medicine/mappers/medicine.mapper'
import { MedicineRepository } from '@/medicine/repositories/medicine.repository'

@Injectable()
export class GetMedicineUseCase {
  constructor(private medicineRepository: MedicineRepository) {}

  async execute({
    id,
  }: GetMedicineUseCaseInput): Promise<GetMedicineUseCaseOutput> {
    const medicine = await this.medicineRepository.findById({ id })

    if (!medicine) {
      throw new NotFoundException('Medicine not found')
    }

    return toMedicineOutput(medicine)
  }
}
