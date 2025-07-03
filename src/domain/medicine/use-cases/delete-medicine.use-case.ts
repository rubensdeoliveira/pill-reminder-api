import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/config/prisma.service'

type DeleteMedicineUseCaseInput = {
  id: string
}

type DeleteMedicineUseCaseOutput = {
  id: string
}

@Injectable()
export class DeleteMedicineUseCase {
  constructor(private prisma: PrismaService) {}

  async execute({
    id,
  }: DeleteMedicineUseCaseInput): Promise<DeleteMedicineUseCaseOutput> {
    await this.prisma.medicine.delete({
      where: { id },
    })

    return { id }
  }
}
