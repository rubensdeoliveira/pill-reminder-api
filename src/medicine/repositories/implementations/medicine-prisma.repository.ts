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
    const { id, name } = await this.prisma.medicine.create({
      data,
    })
    return { id, name }
  }

  async findById(
    data: FindByIdMedicineRepositoryInput,
  ): Promise<FindByIdMedicineRepositoryOutput> {
    const medicine = await this.prisma.medicine.findUnique({
      where: data,
    })
    if (!medicine) {
      return null
    }
    const { id, name } = medicine
    return { id, name }
  }

  async update(
    data: UpdateMedicineRepositoryInput,
  ): Promise<UpdateMedicineRepositoryOutput> {
    const medicine = await this.prisma.medicine.update({
      where: { id: data.id },
      data,
    })
    const { id, name } = medicine
    return { id, name }
  }

  async delete(
    data: DeleteMedicineRepositoryInput,
  ): Promise<DeleteMedicineRepositoryOutput> {
    await this.prisma.medicine.delete({
      where: data,
    })
  }
}
