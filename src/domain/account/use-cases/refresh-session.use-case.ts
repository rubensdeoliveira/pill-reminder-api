import { Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtGateway } from '@/domain/account/gateways/jwt.gateway'
import { AccountTokenRepository } from '@/domain/account/repositories/account-token.repository'

type RefreshSessionUseCaseRequest = { token: string }

type RefreshSessionUseCaseResponse = {
  accessToken: string
  refreshToken: string
}

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    private readonly accountTokenRepository: AccountTokenRepository,
    private readonly jwtGateway: JwtGateway,
  ) {}

  async execute(
    data: RefreshSessionUseCaseRequest,
  ): Promise<RefreshSessionUseCaseResponse> {
    const { token } = data

    const { accountId } = this.jwtGateway.verify(token)

    const accountToken =
      await this.accountTokenRepository.findByAccountIdAndRefreshToken({
        accountId,
        refreshToken: token,
      })
    if (!accountToken) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    await this.accountTokenRepository.delete(accountToken.id)

    const { accessToken, refreshToken } =
      await this.jwtGateway.generateAuthTokens({
        accountId,
      })

    return { refreshToken, accessToken }
  }
}
