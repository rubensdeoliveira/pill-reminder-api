import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  UpdateMedicineUseCaseInput,
  UpdateMedicineUseCaseOutput,
} from '@/medicine/dtos/update-medicine.dto'

@Injectable()
export class UpdateMedicineUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    id,
    ...data
  }: UpdateMedicineUseCaseInput): Promise<UpdateMedicineUseCaseOutput> {
    const medicine = await this.prisma.medicine.update({
      where: { id },
      data,
    })

    if (!medicine) {
      throw new Error('Medicine not found')
    }

    return medicine
  }
}
