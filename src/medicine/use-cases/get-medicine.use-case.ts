import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  GetMedicineUseCaseInput,
  GetMedicineUseCaseOutput,
} from '@/medicine/dtos/get-medicine.dto'

@Injectable()
export class GetMedicineUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    id,
  }: GetMedicineUseCaseInput): Promise<GetMedicineUseCaseOutput> {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
    })

    if (!medicine) {
      throw new Error('Medicine not found')
    }

    return medicine
  }
}
