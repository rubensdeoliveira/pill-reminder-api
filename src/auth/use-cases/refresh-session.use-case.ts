import { Injectable, UnauthorizedException } from '@nestjs/common'

import {
  RefreshSessionUseCaseInput,
  RefreshSessionUseCaseOutput,
} from '@/auth/dtos/refresh-session.dto'
import { JwtGateway } from '@/auth/gateways/jwt.gateway'
import { AccountTokenRepository } from '@/auth/repositories/account-token.repository'

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    private readonly accountTokenRepository: AccountTokenRepository,
    private readonly jwtGateway: JwtGateway,
  ) {}

  async execute({
    token,
  }: RefreshSessionUseCaseInput): Promise<RefreshSessionUseCaseOutput> {
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
