import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  AccountRepository,
  CreateAccountRepositoryInput,
  CreateAccountRepositoryOutput,
  FindByEmailAccountRepositoryInput,
  FindByEmailAccountRepositoryOutput,
  FindByIdAccountRepositoryInput,
  FindByIdAccountRepositoryOutput,
  FindByPhoneAndDobAccountRepositoryInput,
  FindByPhoneAndDobAccountRepositoryOutput,
} from '@/auth/repositories/account.repository'

@Injectable()
export class AccountPrismaRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateAccountRepositoryInput,
  ): Promise<CreateAccountRepositoryOutput> {
    const account = await this.prisma.account.create({
      data,
    })
    return account
  }

  async findByEmail({
    email,
  }: FindByEmailAccountRepositoryInput): Promise<FindByEmailAccountRepositoryOutput> {
    const account = await this.prisma.account.findFirst({
      where: { email },
    })
    return account
  }

  async findByPhoneAndDob({
    dob,
    phone,
  }: FindByPhoneAndDobAccountRepositoryInput): Promise<FindByPhoneAndDobAccountRepositoryOutput> {
    const account = await this.prisma.account.findFirst({
      where: { dob, phone },
    })
    return account
  }

  async findById({
    id,
  }: FindByIdAccountRepositoryInput): Promise<FindByIdAccountRepositoryOutput> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    })
    return account
  }
}
