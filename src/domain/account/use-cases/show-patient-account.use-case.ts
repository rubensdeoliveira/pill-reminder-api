import { Injectable, NotFoundException } from '@nestjs/common'

import { PatientAccountModel } from '@/domain/account/models/patient-account.model'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'

type ShowPatientAccountUseCaseInput = { accountId: string }

type ShowPatientAccountUseCaseOutput = PatientAccountModel

@Injectable()
export class ShowPatientAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    data: ShowPatientAccountUseCaseInput,
  ): Promise<ShowPatientAccountUseCaseOutput> {
    const { accountId } = data
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
    })
    if (!account || !account.phone || !account.dob) {
      throw new NotFoundException('Account does not exists')
    }
    const { email, id, name, phone, dob } = account
    return { email, id, name, phone, dob }
  }
}
