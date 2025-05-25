import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { DentistAccountModel } from '@/domain/account/models/dentist-account.model'

type ShowDentistAccountUseCaseInput = { accountId: string }

type ShowDentistAccountUseCaseOutput = DentistAccountModel

@Injectable()
export class ShowDentistAccountUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    data: ShowDentistAccountUseCaseInput,
  ): Promise<ShowDentistAccountUseCaseOutput> {
    const { accountId } = data
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
    })
    if (!account || !account.email) {
      throw new NotFoundException('Account does not exists')
    }
    const { email, id, name, phone, dob } = account
    return { email, id, name, phone, dob }
  }
}
