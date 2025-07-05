import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import {
  CreatePatientSessionUseCaseInput,
  CreatePatientSessionUseCaseOutput,
} from '@/auth/dtos/create-patient-session.dto'

@Injectable()
export class CreatePatientSessionUseCase {
  constructor(
    private prisma: PrismaService,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: CreatePatientSessionUseCaseInput,
  ): Promise<CreatePatientSessionUseCaseOutput> {
    const { phone, dob } = data

    const account = await this.prisma.account.findFirst({
      where: {
        phone,
        dob,
      },
    })
    if (!account || !account.phone || !account.dob) {
      throw new ConflictException('Patient account does not exists')
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
        role: account.role,
      })

    const { id, name, email } = account

    return {
      account: { email, id, name, phone, dob },
      accessToken,
      refreshToken,
    }
  }
}
