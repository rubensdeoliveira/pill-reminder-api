import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from '@/infra/config/env/env'
import { AccountModule } from '@/infra/modules/account.module'
import { MedicineModule } from '@/infra/modules/medicine.module'
import { HealthCheckModule } from '@/infra/modules/shared/health-check.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    AccountModule,
    MedicineModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
