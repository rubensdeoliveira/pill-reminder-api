import { Injectable } from '@nestjs/common'

import {
  CookiesGateway,
  CookiesModel,
} from '@/_shared/gateways/cookies.gateway'
import { EnvGateway } from '@/_shared/gateways/env.gateway'
import { convertDaysInMiliSeconds } from '@/_shared/helpers/convert-days-in-seconds.helper'

@Injectable()
export class CookiesNestGateway implements CookiesGateway {
  constructor(private config: EnvGateway) {}

  get<T extends keyof CookiesModel>(key: T): CookiesModel[T] {
    const appName = this.config.get('BACKEND_NAME')

    if (key === 'REFRESH_TOKEN') {
      return `${appName}_refresh_token` as CookiesModel[T]
    }

    if (key === 'ACCESS_TOKEN') {
      return `${appName}_access_token` as CookiesModel[T]
    }

    if (key === 'COOKIE_OPTIONS') {
      return {
        httpOnly: true,
        secure: true,
        maxAge: convertDaysInMiliSeconds(
          this.config.get('JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS'),
        ),
        path: '/',
      } as CookiesModel[T]
    }

    throw new Error(`Invalid cookie key: ${key}`)
  }
}
