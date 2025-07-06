import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { DateManipulatorGateway } from '@/_shared/gateways/date-manipulator.gateway'
import { EnvGateway } from '@/_shared/gateways/env.gateway'
import {
  JwtGateway,
  JwtGenerateAuthTokensInput,
  JwtGenerateAuthTokensOutput,
  JwtSignInput,
  JwtSignOutput,
  JwtVerifyInput,
  JwtVerifyOutput,
} from '@/auth/gateways/jwt.gateway'
import { AccountTokenRepository } from '@/auth/repositories/account-token.repository'

@Injectable()
export class JwtNestGateway implements JwtGateway {
  constructor(
    private jwt: JwtService,
    private dateManipulatorGateway: DateManipulatorGateway,
    private accountTokenRepository: AccountTokenRepository,
    private config: EnvGateway,
  ) {}

  sign({ expiresIn, payload }: JwtSignInput): JwtSignOutput {
    const token = this.jwt.sign(
      {
        sub: JSON.stringify(payload),
      },
      {
        expiresIn,
      },
    )
    return token
  }

  verify(token: JwtVerifyInput): JwtVerifyOutput {
    try {
      const payload = this.jwt.verify(token)
      return JSON.parse(payload.sub)
    } catch {
      throw new UnauthorizedException('Token is not valid')
    }
  }

  async generateAuthTokens(
    payload: JwtGenerateAuthTokensInput,
  ): Promise<JwtGenerateAuthTokensOutput> {
    const tokenExpiresIn = this.config.get('JWT_TOKEN_EXPIRES_IN')
    const refreshTokenExpiresInDays = this.config.get(
      'JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS',
    )

    const accessToken = this.sign({
      payload,
      expiresIn: tokenExpiresIn,
    })

    const refreshToken = this.sign({
      payload,
      expiresIn: `${refreshTokenExpiresInDays}d`,
    })

    const expiresDate = this.dateManipulatorGateway.addDays({
      date: new Date(),
      days: refreshTokenExpiresInDays,
    })

    await this.accountTokenRepository.create({
      accountId: payload.accountId,
      refreshToken,
      expiresDate,
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
