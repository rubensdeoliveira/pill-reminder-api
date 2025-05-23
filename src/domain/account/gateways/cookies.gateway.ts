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

export abstract class CookiesGateway {
  abstract get<T extends keyof CookiesModel>(key: T): CookiesModel[T]
}
