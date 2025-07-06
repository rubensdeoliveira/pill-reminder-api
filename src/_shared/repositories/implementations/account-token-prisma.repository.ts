import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  AccountTokenRepository,
  CreateAccountTokenRepositoryInput,
  DeleteByIdAccountTokenRepositoryInput,
  FindByAccountIdAndRefreshTokenAccountTokenRepositoryInput,
  FindByAccountIdAndRefreshTokenAccountTokenRepositoryOutput,
} from '@/_shared/repositories/account-token.repository'

@Injectable()
export class AccountTokenPrismaRepository implements AccountTokenRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAccountTokenRepositoryInput): Promise<void> {
    await this.prisma.accountToken.create({
      data,
    })
  }

  async findByAccountIdAndRefreshToken(
    data: FindByAccountIdAndRefreshTokenAccountTokenRepositoryInput,
  ): Promise<FindByAccountIdAndRefreshTokenAccountTokenRepositoryOutput> {
    const accountToken = await this.prisma.accountToken.findUnique({
      where: data,
      include: {
        account: {
          select: {
            role: true,
          },
        },
      },
    })
    if (!accountToken) {
      return null
    }
    const { id, account } = accountToken
    return { id, account }
  }

  async deleteById(data: DeleteByIdAccountTokenRepositoryInput): Promise<void> {
    await this.prisma.accountToken.delete({
      where: data,
    })
  }
}
