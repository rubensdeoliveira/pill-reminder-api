import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { SharedModule } from '@/_shared/shared.module'
import { CreateDentistSessionController } from '@/auth/controllers/create-dentist-session.controller'
import { CreateDentistSessionWithGoogleController } from '@/auth/controllers/create-dentist-session-with-google.controller'
import { CreatePatientSessionController } from '@/auth/controllers/create-patient-session.controller'
import { RefreshSessionController } from '@/auth/controllers/refresh-session.controller'
import { GoogleStrategy } from '@/auth/strategies/google.strategy'
import { JwtStrategy } from '@/auth/strategies/jwt.strategy'
import { CreateDentistSessionUseCase } from '@/auth/use-cases/create-dentist-session.use-case'
import { CreateDentistSessionWithGoogleUseCase } from '@/auth/use-cases/create-dentist-session-with-google.use-case'
import { CreatePatientSessionUseCase } from '@/auth/use-cases/create-patient-session.use-case'
import { RefreshSessionUseCase } from '@/auth/use-cases/refresh-session.use-case'
import { DentistModule } from '@/dentist/dentist.module'
import { PatientModule } from '@/patient/patient.module'

@Module({
  imports: [
    SharedModule,
    PassportModule,
    DentistModule,
    PatientModule,
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
  ],
})
export class AuthModule {}
