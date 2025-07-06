import { Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtGateway } from '@/_shared/gateways/jwt.gateway'
import { AccountTokenRepository } from '@/_shared/repositories/account-token.repository'
import {
  RefreshSessionUseCaseInput,
  RefreshSessionUseCaseOutput,
} from '@/auth/dtos/refresh-session.dto'

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    private readonly accountTokenRepository: AccountTokenRepository,
    private readonly jwtGateway: JwtGateway,
  ) {}

  async execute(
    input: RefreshSessionUseCaseInput,
  ): Promise<RefreshSessionUseCaseOutput> {
    const token = input.token
    const { accountId } = this.jwtGateway.verify(token)

    const accountToken =
      await this.accountTokenRepository.findByAccountIdAndRefreshToken({
        accountId,
        refreshToken: token,
      })
    if (!accountToken) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    await this.accountTokenRepository.deleteById({
      id: accountToken.id,
    })

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId,
        role: accountToken.account.role,
      })

    return { refreshToken, accessToken }
  }
}
