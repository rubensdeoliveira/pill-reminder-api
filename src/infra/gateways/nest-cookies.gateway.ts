import { Injectable } from '@nestjs/common'

import { convertDaysInMiliSeconds } from '@/application/shared/helpers/convert-days-in-seconds.util'
import { EnvGateway } from '@/infra/gateways/nest-env.gateway'

export type CookiesModel = {
  REFRESH_TOKEN: string
  ACCESS_TOKEN: string
  COOKIE_OPTIONS: {
    httpOnly: boolean
    secure: boolean
    maxAge: number
    path: string
  }
}

@Injectable()
export class NestCookiesGateway {
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

export { NestCookiesGateway as CookiesGateway }
