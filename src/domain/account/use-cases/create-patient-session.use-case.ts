import { ConflictException, Injectable } from '@nestjs/common'

import { JwtGateway } from '@/infra/gateways/nest-jwt.gateway'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { PatientAccountModel } from '@/domain/account/models/patient-account.model'
import { CreatePatientSessionBodySchema } from '@/application/account/validators/create-patient-session.validator'

type CreatePatientSessionUseCaseInput = CreatePatientSessionBodySchema

type CreatePatientSessionUseCaseOutput = {
  account: PatientAccountModel
  accessToken: string
  refreshToken: string
}

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
      })

    const { id, name, email } = account

    return {
      account: { email, id, name, phone, dob },
      accessToken,
      refreshToken,
    }
  }
}
