import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  GetPatientUseCaseInput,
  GetPatientUseCaseOutput,
} from '@/patient/dtos/get-patient.dto'

@Injectable()
export class GetPatientUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    data: GetPatientUseCaseInput,
  ): Promise<GetPatientUseCaseOutput> {
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
