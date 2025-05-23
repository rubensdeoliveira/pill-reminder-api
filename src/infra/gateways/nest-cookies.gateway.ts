import { Injectable } from '@nestjs/common'

import { convertDaysInMiliSeconds } from '@/application/shared/helpers/convert-days-in-seconds.util'
import {
  CookiesGateway,
  CookiesModel,
} from '@/domain/account/gateways/cookies.gateway'
import { EnvGateway } from '@/domain/account/gateways/env.gateway'

@Injectable()
export class NestCookiesGateway implements CookiesGateway {
  constructor(private config: EnvGateway) {}

  get<T extends keyof CookiesModel>(key: T): CookiesModel[T] {
    const appName = this.config.get('API_APP_NAME')

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
