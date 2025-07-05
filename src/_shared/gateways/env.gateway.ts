export type AppConfigModel = {
  DATABASE_URL: string
  BACKEND_PORT: number
  JWT_SECRET: string
  JWT_TOKEN_EXPIRES_IN: string
  JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS: number
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_CLIENT_CALLBACK_URL: string
  BACKEND_NAME: string
  FRONTEND_URL: string
}

export abstract class EnvGateway {
  abstract get<T extends keyof AppConfigModel>(key: T): AppConfigModel[T]
}
