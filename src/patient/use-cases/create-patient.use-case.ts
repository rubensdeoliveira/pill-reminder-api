import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  CreatePatientUseCaseInput,
  CreatePatientUseCaseOutput,
} from '@/patient/dtos/create-patient.dto'

@Injectable()
export class CreatePatientUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(
    data: CreatePatientUseCaseInput,
  ): Promise<CreatePatientUseCaseOutput> {
    const { email, name, dob, phone } = data

    const accountWithSameEmail = await this.prisma.account.findFirst({
      where: {
        email,
      },
    })
    if (accountWithSameEmail) {
      throw new ConflictException('Account with same email already exists')
    }

    const { id } = await this.prisma.account.create({
      data: {
        email,
        name,
        phone,
        dob,
      },
    })

    return {
      email,
      name,
      id,
      phone,
      dob,
    }
  }
}
