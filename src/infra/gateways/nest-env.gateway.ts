import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export type AppConfig = {
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

@Injectable()
class NestEnvGateway {
  constructor(private configService: ConfigService<AppConfig, true>) {}

  get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    return this.configService.get(key, { infer: true })
  }
}

export { NestEnvGateway as EnvGateway }
