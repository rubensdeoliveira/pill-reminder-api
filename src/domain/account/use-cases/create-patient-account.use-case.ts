import { ConflictException, Injectable } from '@nestjs/common'

import { CreatePatientAccountBodySchema } from '@/application/account/validators/create-patient-account.validator'
import { PatientAccountModel } from '@/domain/account/models/patient-account.model'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { EncryptionGateway } from '@/infra/gateways/bcrypt-encryption.gateway'

type CreatePatientAccountUseCaseInput = CreatePatientAccountBodySchema

type CreatePatientAccountUseCaseOutput = PatientAccountModel

@Injectable()
export class CreatePatientAccountUseCase {
  constructor(
    private prisma: PrismaService,
    private encryptionGateway: EncryptionGateway,
  ) {}

  async execute(
    data: CreatePatientAccountUseCaseInput,
  ): Promise<CreatePatientAccountUseCaseOutput> {
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
