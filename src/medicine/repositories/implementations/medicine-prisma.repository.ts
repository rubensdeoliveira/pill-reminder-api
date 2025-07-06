import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  CreateMedicineRepositoryInput,
  CreateMedicineRepositoryOutput,
  DeleteMedicineRepositoryInput,
  DeleteMedicineRepositoryOutput,
  FindByIdMedicineRepositoryInput,
  FindByIdMedicineRepositoryOutput,
  MedicineRepository,
  UpdateMedicineRepositoryInput,
  UpdateMedicineRepositoryOutput,
} from '@/medicine/repositories/medicine.repository'

@Injectable()
export class MedicinePrismaRepository implements MedicineRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateMedicineRepositoryInput,
  ): Promise<CreateMedicineRepositoryOutput> {
    const medicine = await this.prisma.medicine.create({
      data,
    })
    return medicine
  }

  async findById({
    id,
  }: FindByIdMedicineRepositoryInput): Promise<FindByIdMedicineRepositoryOutput> {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
    })
    return medicine
  }

  async update(
    data: UpdateMedicineRepositoryInput,
  ): Promise<UpdateMedicineRepositoryOutput> {
    const medicine = await this.prisma.medicine.update({
      where: { id: data.id },
      data,
    })
    return medicine
  }

  async delete({
    id,
  }: DeleteMedicineRepositoryInput): Promise<DeleteMedicineRepositoryOutput> {
    await this.prisma.medicine.delete({
      where: { id },
    })
  }
}
