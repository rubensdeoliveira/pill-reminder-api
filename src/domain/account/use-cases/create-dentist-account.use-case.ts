import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/infra/gateways/bcrypt-encryption.gateway'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { CreateDentistAccountBodySchema } from '@/application/account/validators/create-dentist-account.validator'
import { DentistAccountModel } from '@/domain/account/models/dentist-account.model'

type CreateDentistAccountUseCaseInput = CreateDentistAccountBodySchema

type CreateDentistAccountUseCaseOutput = DentistAccountModel

@Injectable()
export class CreateDentistAccountUseCase {
  constructor(
    private prisma: PrismaService,
    private encryptionGateway: EncryptionGateway,
  ) {}

  async execute(
    data: CreateDentistAccountUseCaseInput,
  ): Promise<CreateDentistAccountUseCaseOutput> {
    const { email, name, password, phone, dob } = data

    const accountWithSameEmail = await this.prisma.account.findFirst({
      where: {
        email,
      },
    })
    if (accountWithSameEmail) {
      throw new ConflictException('Account with same email already exists')
    }

    const hashedPassword = await this.encryptionGateway.createHash(password)

    const { id } = await this.prisma.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        dob,
      },
    })

    return {
      phone,
      email,
      name,
      id,
      dob,
    }
  }
}
