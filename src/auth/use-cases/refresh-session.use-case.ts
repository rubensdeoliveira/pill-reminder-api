import { Injectable, UnauthorizedException } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import {
  RefreshSessionUseCaseInput,
  RefreshSessionUseCaseOutput,
} from '@/auth/dtos/refresh-session.dto'

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: RefreshSessionUseCaseInput,
  ): Promise<RefreshSessionUseCaseOutput> {
    const { token } = data

    const { accountId } = this.jwtGateway.verify(token)

    const accountToken = await this.prisma.accountToken.findUnique({
      where: {
        accountId,
        refreshToken: token,
      },
      include: {
        account: {
          select: {
            role: true,
          },
        },
      },
    })
    if (!accountToken) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    await this.prisma.accountToken.delete({
      where: {
        id: accountToken.id,
      },
    })

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId,
        role: accountToken.account.role,
      })

    return { refreshToken, accessToken }
  }
}
