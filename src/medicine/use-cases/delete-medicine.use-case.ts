import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  DeleteMedicineUseCaseInput,
  DeleteMedicineUseCaseOutput,
} from '@/medicine/dtos/delete-medicine.dto'

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
