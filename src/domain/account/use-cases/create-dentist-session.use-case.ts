import { ConflictException, Injectable } from '@nestjs/common'

import { EncryptionGateway } from '@/infra/gateways/bcrypt-encryption.gateway'
import { JwtGateway } from '@/infra/gateways/nest-jwt.gateway'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { DentistAccountModel } from '@/domain/account/models/dentist-account.model'
import { CreateDentistSessionBodySchema } from '@/application/account/validators/create-dentist-session.validator'

type CreateDentistSessionUseCaseInput = CreateDentistSessionBodySchema

type CreateDentistSessionUseCaseOutput = {
  account: DentistAccountModel
  accessToken: string
  refreshToken: string
}

@Injectable()
export class CreateDentistSessionUseCase {
  constructor(
    private prisma: PrismaService,
    private encryptionGateway: EncryptionGateway,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: CreateDentistSessionUseCaseInput,
  ): Promise<CreateDentistSessionUseCaseOutput> {
    const { email, password } = data

    const account = await this.prisma.account.findFirst({
      where: {
        email,
      },
    })
    if (!account || !account.password) {
      throw new ConflictException('Email/password does not matches')
    }

    const passwordIsMatched = await this.encryptionGateway.validateHash({
      hashedValue: account.password,
      value: password,
    })
    if (!passwordIsMatched) {
      throw new ConflictException('Email/password does not matches')
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
      })

    const { id, name, phone, dob } = account

    return {
      account: { email, id, name, phone, dob },
      accessToken,
      refreshToken,
    }
  }
}
