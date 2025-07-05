import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import { EncryptionGateway } from '@/_shared/gateways/encryption.gateway'
import {
  CreateDentistUseCaseInput,
  CreateDentistUseCaseOutput,
} from '@/dentist/dtos/create-dentist.dto'

@Injectable()
export class CreateDentistUseCase {
  constructor(
    private prisma: PrismaService,
    private encryptionGateway: EncryptionGateway,
  ) {}

  async execute(
    data: CreateDentistUseCaseInput,
  ): Promise<CreateDentistUseCaseOutput> {
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
