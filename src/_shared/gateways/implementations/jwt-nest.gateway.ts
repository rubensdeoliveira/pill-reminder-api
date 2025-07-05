import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import { DateManipulatorGateway } from '@/_shared/gateways/date-manipulator.gateway'
import { EnvGateway } from '@/_shared/gateways/env.gateway'
import {
  JwtGateway,
  JwtGenerateAuthTokensRequest,
  JwtGenerateAuthTokensResponse,
  JwtSignRequest,
  JwtSignResponse,
  JwtVerifyRequest,
  JwtVerifyResponse,
} from '@/_shared/gateways/jwt.gateway'

@Injectable()
export class JwtNestGateway implements JwtGateway {
  constructor(
    private jwt: JwtService,
    private dateManipulatorGateway: DateManipulatorGateway,
    private prisma: PrismaService,
    private config: EnvGateway,
  ) {}

  sign({ expiresIn, payload }: JwtSignRequest): JwtSignResponse {
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

  verify(token: JwtVerifyRequest): JwtVerifyResponse {
    try {
      const payload = this.jwt.verify(token)
      return JSON.parse(payload.sub)
    } catch {
      throw new UnauthorizedException('Token is not valid')
    }
  }

  async generateAuthTokens(
    payload: JwtGenerateAuthTokensRequest,
  ): Promise<JwtGenerateAuthTokensResponse> {
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

    await this.prisma.accountToken.create({
      data: {
        expiresDate,
        refreshToken,
        accountId: payload.accountId,
      },
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
