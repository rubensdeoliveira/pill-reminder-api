import { Injectable } from '@nestjs/common'

import { AccountRepository } from '@/domain/account/repositories/account.repository'
import { AccountEntity } from '@/domain/account/repositories/entities/account.entity'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { PrismaDefaultRepository } from '@/infra/database/prisma/repositories/shared/prisma-default.repository'

@Injectable()
export class PrismaAccountRepository
  extends PrismaDefaultRepository<AccountEntity>
  implements AccountRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'account')
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findUnique({
      where: {
        email,
      },
    })
    return account
  }
}
