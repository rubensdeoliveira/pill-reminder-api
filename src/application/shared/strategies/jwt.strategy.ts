import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'

import { EnvGateway } from '@/domain/account/gateways/env.gateway'

const accountPayload = z.object({
  sub: z.string(),
})

type AccountPayload = z.infer<typeof accountPayload>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvGateway) {
    const jwtSecret = config.get('JWT_SECRET')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    })
  }

  async validate(payload: AccountPayload) {
    return accountPayload.parse(payload)
  }
}
