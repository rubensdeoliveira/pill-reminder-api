import { Injectable } from '@nestjs/common'

import {
  AccountTokenRepository,
  FindByAccountIdAndRefreshTokenParams,
} from '@/domain/account/repositories/account-token.repository'
import { AccountTokenEntity } from '@/domain/account/repositories/entities/account-token.entity'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { PrismaDefaultRepository } from '@/infra/database/prisma/repositories/shared/prisma-default.repository'

@Injectable()
export class PrismaAccountTokenRepository
  extends PrismaDefaultRepository<AccountTokenEntity>
  implements AccountTokenRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'accountToken')
  }

  async findByAccountIdAndRefreshToken(
    params: FindByAccountIdAndRefreshTokenParams,
  ): Promise<AccountTokenEntity | null> {
    const { refreshToken, accountId } = params
    const token = await this.prisma.accountToken.findFirst({
      where: { refreshToken, accountId },
    })
    return token
  }
}
