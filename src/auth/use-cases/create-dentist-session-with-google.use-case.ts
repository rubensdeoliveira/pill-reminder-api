import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import {
  CreateDentistSessionWithGoogleUseCaseInput,
  CreateDentistSessionWithGoogleUseCaseOutput,
} from '@/auth/dtos/create-dentist-session-with-google.dto'

@Injectable()
export class CreateDentistSessionWithGoogleUseCase {
  constructor(
    private prisma: PrismaService,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: CreateDentistSessionWithGoogleUseCaseInput,
  ): Promise<CreateDentistSessionWithGoogleUseCaseOutput> {
    const { email, name } = data

    let account = await this.prisma.account.findFirst({
      where: {
        email,
      },
    })
    if (!account) {
      account = await this.prisma.account.create({
        data: {
          email,
          name,
          password: null,
        },
      })
    }

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId: account.id,
        role: account.role,
      })

    const { id } = account

    return {
      account: { email, id, name, phone: account.phone, dob: account.dob },
      accessToken,
      refreshToken,
    }
  }
}
