import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { CreateDentistAccountController } from '@/application/account/controllers/create-dentist-account.controller'
import { CreateDentistSessionController } from '@/application/account/controllers/create-dentist-session.controller'
import { CreateDentistSessionWithGoogleController } from '@/application/account/controllers/create-dentist-session-with-google.controller'
import { CreatePatientAccountController } from '@/application/account/controllers/create-patient-account.controller'
import { CreatePatientSessionController } from '@/application/account/controllers/create-patient-session.controller'
import { RefreshSessionController } from '@/application/account/controllers/refresh-session.controller'
import { GoogleStrategy } from '@/application/shared/strategies/google.strategy'
import { JwtStrategy } from '@/application/shared/strategies/jwt.strategy'
import { CreateDentistAccountUseCase } from '@/domain/account/use-cases/create-dentist-account.use-case'
import { CreateDentistSessionUseCase } from '@/domain/account/use-cases/create-dentist-session.use-case'
import { CreateDentistSessionWithGoogleUseCase } from '@/domain/account/use-cases/create-dentist-session-with-google.use-case'
import { CreatePatientAccountUseCase } from '@/domain/account/use-cases/create-patient-account.use-case'
import { CreatePatientSessionUseCase } from '@/domain/account/use-cases/create-patient-session.use-case'
import { ShowDentistAccountUseCase } from '@/domain/account/use-cases/show-dentist-account.use-case'
import { ShowPatientAccountUseCase } from '@/domain/account/use-cases/show-patient-account.use-case'
import { RefreshSessionUseCase } from '@/domain/account/use-cases/refresh-session.use-case'
import { DatabaseModule } from '@/infra/modules/shared/database.module'
import { GatewayModule } from '@/infra/modules/shared/gateway.module'
import { ShowDentistAccountController } from '@/application/account/controllers/show-dentist-account.controller'
import { ShowPatientAccountController } from '@/application/account/controllers/show-patient-account.controller'

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
    CreateDentistAccountController,
    CreateDentistSessionController,
    CreateDentistSessionWithGoogleController,
    CreatePatientAccountController,
    CreatePatientSessionController,
    RefreshSessionController,
    ShowDentistAccountController,
    ShowPatientAccountController,
  ],
  providers: [
    JwtStrategy,
    GoogleStrategy,
    ShowDentistAccountUseCase,
    ShowPatientAccountUseCase,
    CreateDentistAccountUseCase,
    CreateDentistSessionUseCase,
    CreateDentistSessionWithGoogleUseCase,
    CreatePatientAccountUseCase,
    CreatePatientSessionUseCase,
    RefreshSessionUseCase,
  ],
})
export class AccountModule {}
