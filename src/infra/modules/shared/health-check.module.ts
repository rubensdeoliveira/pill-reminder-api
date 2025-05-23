import { Module } from '@nestjs/common'

import { HealthCheckController } from '@/application/shared/controllers/health-check.controller'

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
