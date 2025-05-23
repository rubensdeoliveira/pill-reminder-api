import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from '@/infra/config/env/env'
import { AccountModule } from '@/infra/modules/account.module'
import { HealthCheckModule } from '@/infra/modules/shared/health-check.module'
import { TaskModule } from '@/infra/modules/task.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    AccountModule,
    TaskModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
