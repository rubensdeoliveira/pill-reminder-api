import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from '@/_shared/config/env/env'
import { SharedModule } from '@/_shared/shared.module'
import { AuthModule } from '@/auth/auth.module'
import { DentistModule } from '@/dentist/dentist.module'
import { MedicineModule } from '@/medicine/medicine.module'
import { PatientModule } from '@/patient/patient.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    SharedModule,
    AuthModule,
    DentistModule,
    MedicineModule,
    PatientModule,
  ],
})
export class AppModule {}
