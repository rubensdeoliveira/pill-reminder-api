import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  CreateMedicineUseCaseInput,
  CreateMedicineUseCaseOutput,
} from '@/medicine/dtos/create-medicine.dto'

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
