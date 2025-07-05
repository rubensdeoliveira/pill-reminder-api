import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  GetDentistUseCaseInput,
  GetDentistUseCaseOutput,
} from '@/dentist/dtos/get-dentist.dto'

@Injectable()
export class GetDentistUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    data: GetDentistUseCaseInput,
  ): Promise<GetDentistUseCaseOutput> {
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
