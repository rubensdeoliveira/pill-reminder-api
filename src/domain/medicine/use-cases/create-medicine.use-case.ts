import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/config/prisma.service'

type CreateMedicineUseCaseInput = {
  name: string
}

type CreateMedicineUseCaseOutput = {
  name: string
}

@Injectable()
export class CreateMedicineUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    ...data
  }: CreateMedicineUseCaseInput): Promise<CreateMedicineUseCaseOutput> {
    const { name } = await this.prisma.medicine.create({
      data,
    })

    return { name }
  }
}
