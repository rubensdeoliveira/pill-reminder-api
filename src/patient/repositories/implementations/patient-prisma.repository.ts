import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  CreatePatientRepositoryInput,
  CreatePatientRepositoryOutput,
  FindByIdPatientRepositoryInput,
  FindByIdPatientRepositoryOutput,
  FindByPhoneAndDobPatientRepositoryInput,
  FindByPhoneAndDobPatientRepositoryOutput,
  PatientRepository,
} from '@/patient/repositories/patient.repository'

@Injectable()
export class PatientPrismaRepository implements PatientRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreatePatientRepositoryInput,
  ): Promise<CreatePatientRepositoryOutput> {
    const { id, name, email, phone, dob, role } =
      await this.prisma.account.create({
        data,
      })
    return { id, name, email, phone, dob, role }
  }

  async findByPhoneAndDob(
    data: FindByPhoneAndDobPatientRepositoryInput,
  ): Promise<FindByPhoneAndDobPatientRepositoryOutput> {
    const account = await this.prisma.account.findFirst({
      where: data,
    })
    if (!account) {
      return null
    }
    const { id, name, email, phone, dob, role, password } = account
    return { id, name, email, phone, dob, role, password }
  }

  async findById(
    data: FindByIdPatientRepositoryInput,
  ): Promise<FindByIdPatientRepositoryOutput> {
    const account = await this.prisma.account.findUnique({
      where: data,
    })
    if (!account) {
      return null
    }
    const { id, name, email, phone, dob, role } = account
    return { id, name, email, phone, dob, role }
  }
}
