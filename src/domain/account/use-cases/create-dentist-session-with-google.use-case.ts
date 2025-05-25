import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { JwtGateway } from '@/infra/gateways/nest-jwt.gateway'
import { DentistAccountModel } from '@/domain/account/models/dentist-account.model'

type CreateDentistSessionWithGoogleUseCaseInput = {
  email: string
  name: string
}

export type CreateDentistSessionWithGoogleUseCaseOutput = {
  account: DentistAccountModel
  accessToken: string
  refreshToken: string
}

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
      })

    const { id } = account

    return {
      account: { email, id, name, phone: account.phone, dob: account.dob },
      accessToken,
      refreshToken,
    }
  }
}
