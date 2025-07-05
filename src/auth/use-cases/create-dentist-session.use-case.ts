import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import { EncryptionGateway } from '@/_shared/gateways/encryption.gateway'
import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import {
  CreateDentistSessionUseCaseInput,
  CreateDentistSessionUseCaseOutput,
} from '@/auth/dtos/create-dentist-session.dto'

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
        role: account.role,
      })

    const { id, name, phone, dob } = account

    return {
      account: { email, id, name, phone, dob },
      accessToken,
      refreshToken,
    }
  }
}
