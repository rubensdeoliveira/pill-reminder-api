import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/config/prisma.service'

type ShowMedicineUseCaseInput = {
  id: string
}

type ShowMedicineUseCaseOutput = {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
}

@Injectable()
export class ShowMedicineUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    id,
  }: ShowMedicineUseCaseInput): Promise<ShowMedicineUseCaseOutput> {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
    })

    if (!medicine) {
      throw new Error('Medicine not found')
    }

    return medicine
  }
}
