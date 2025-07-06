import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import {
  AccountTokenRepository,
  CreateAccountTokenRepositoryInput,
  CreateAccountTokenRepositoryOutput,
  DeleteByIdAccountTokenRepositoryInput,
  DeleteByIdAccountTokenRepositoryOutput,
  FindByAccountIdAndRefreshTokenAccountTokenRepositoryInput,
  FindByAccountIdAndRefreshTokenAccountTokenRepositoryOutput,
} from '@/auth/repositories/account-token.repository'

@Injectable()
export class AccountTokenPrismaRepository implements AccountTokenRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateAccountTokenRepositoryInput,
  ): Promise<CreateAccountTokenRepositoryOutput> {
    const accountToken = await this.prisma.accountToken.create({
      data,
    })
    return accountToken
  }

  async deleteById(
    data: DeleteByIdAccountTokenRepositoryInput,
  ): Promise<DeleteByIdAccountTokenRepositoryOutput> {
    await this.prisma.accountToken.delete({
      where: data,
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
    return accountToken
  }
}
