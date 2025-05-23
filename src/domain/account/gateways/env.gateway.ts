export type EnvModel = {
  DATABASE_URL: string
  API_PORT: number
  JWT_SECRET: string
  JWT_TOKEN_EXPIRES_IN: string
  JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS: number
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_CLIENT_CALLBACK_URL: string
  API_APP_NAME: string
  WEB_APP_URL: string
}

export abstract class EnvGateway {
  abstract get<T extends keyof EnvModel>(key: T): EnvModel[T]
}
