import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { SharedModule } from '@/_shared/shared.module'
import { CreateDentistSessionController } from '@/auth/controllers/create-dentist-session.controller'
import { CreateDentistSessionWithGoogleController } from '@/auth/controllers/create-dentist-session-with-google.controller'
import { CreatePatientSessionController } from '@/auth/controllers/create-patient-session.controller'
import { RefreshSessionController } from '@/auth/controllers/refresh-session.controller'
import { JwtNestGateway } from '@/auth/gateways/implementations/jwt-nest.gateway'
import { JwtGateway } from '@/auth/gateways/jwt.gateway'
import { AccountRepository } from '@/auth/repositories/account.repository'
import { AccountTokenRepository } from '@/auth/repositories/account-token.repository'
import { AccountPrismaRepository } from '@/auth/repositories/implementations/account-prisma.repository'
import { AccountTokenPrismaRepository } from '@/auth/repositories/implementations/account-token-prisma.repository'
import { GoogleStrategy } from '@/auth/strategies/google.strategy'
import { JwtStrategy } from '@/auth/strategies/jwt.strategy'
import { CreateDentistSessionUseCase } from '@/auth/use-cases/create-dentist-session.use-case'
import { CreateDentistSessionWithGoogleUseCase } from '@/auth/use-cases/create-dentist-session-with-google.use-case'
import { CreatePatientSessionUseCase } from '@/auth/use-cases/create-patient-session.use-case'
import { RefreshSessionUseCase } from '@/auth/use-cases/refresh-session.use-case'

@Module({
  imports: [
    SharedModule,
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
    CreateDentistSessionController,
    CreateDentistSessionWithGoogleController,
    CreatePatientSessionController,
    RefreshSessionController,
  ],
  providers: [
    JwtStrategy,
    GoogleStrategy,
    CreateDentistSessionUseCase,
    CreateDentistSessionWithGoogleUseCase,
    CreatePatientSessionUseCase,
    RefreshSessionUseCase,
    {
      provide: JwtGateway,
      useClass: JwtNestGateway,
    },
    {
      provide: AccountTokenRepository,
      useClass: AccountTokenPrismaRepository,
    },
    {
      provide: AccountRepository,
      useClass: AccountPrismaRepository,
    },
  ],
  exports: [AccountTokenRepository, AccountRepository, JwtGateway],
})
export class AuthModule {}
