import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { CreateAccountController } from '@/application/account/controllers/create-account.controller'
import { CreateSessionController } from '@/application/account/controllers/create-session.controller'
import { CreateSessionWithGoogleController } from '@/application/account/controllers/create-session-with-google.controller'
import { GetAccountController } from '@/application/account/controllers/get-account.controller'
import { RefreshSessionController } from '@/application/account/controllers/refresh-session.controller'
import { GoogleStrategy } from '@/application/shared/strategies/google.strategy'
import { JwtStrategy } from '@/application/shared/strategies/jwt.strategy'
import { CreateAccountUseCase } from '@/domain/account/use-cases/create-account.use-case'
import { CreateSessionUseCase } from '@/domain/account/use-cases/create-session.use-case'
import { CreateSessionWithGoogleUseCase } from '@/domain/account/use-cases/create-session-with-google.use-case'
import { CreateSessionWithGoogleMobileUseCase } from '@/domain/account/use-cases/create-session-with-google-mobile.use-case'
import { GetAccountUseCase } from '@/domain/account/use-cases/get-account.use-case'
import { RefreshSessionUseCase } from '@/domain/account/use-cases/refresh-session.use-case'
import { DatabaseModule } from '@/infra/modules/shared/database.module'
import { GatewayModule } from '@/infra/modules/shared/gateway.module'

@Module({
  imports: [
    DatabaseModule,
    GatewayModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    GetAccountController,
    CreateAccountController,
    CreateSessionController,
    CreateSessionWithGoogleController,
    RefreshSessionController,
  ],
  providers: [
    JwtStrategy,
    GoogleStrategy,
    GetAccountUseCase,
    CreateAccountUseCase,
    CreateSessionUseCase,
    CreateSessionWithGoogleUseCase,
    CreateSessionWithGoogleMobileUseCase,
    RefreshSessionUseCase,
  ],
})
export class AccountModule {}
