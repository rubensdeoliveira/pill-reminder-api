import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/config/prisma.service'

type UpdateMedicineUseCaseInput = {
  id: string
  name?: string
}

type UpdateMedicineUseCaseOutput = {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
}

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
