import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  CreateDentistRepositoryInput,
  CreateDentistRepositoryOutput,
  DentistRepository,
  FindByEmailDentistRepositoryInput,
  FindByEmailDentistRepositoryOutput,
  FindByIdDentistRepositoryInput,
  FindByIdDentistRepositoryOutput,
} from '@/dentist/repositories/dentist.repository'

@Injectable()
export class DentistPrismaRepository implements DentistRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateDentistRepositoryInput,
  ): Promise<CreateDentistRepositoryOutput> {
    const { id, name, email, phone, dob, role } =
      await this.prisma.account.create({
        data,
      })
    return { id, name, email, phone, dob, role }
  }

  async findByEmail(
    data: FindByEmailDentistRepositoryInput,
  ): Promise<FindByEmailDentistRepositoryOutput> {
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
    data: FindByIdDentistRepositoryInput,
  ): Promise<FindByIdDentistRepositoryOutput> {
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
