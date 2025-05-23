import { Module } from '@nestjs/common'

import { CreateTaskController } from '@/application/task/controllers/create-task.controller'
import { CreateTaskUseCase } from '@/domain/task/use-cases/create-task.use-case'
import { DatabaseModule } from '@/infra/modules/shared/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateTaskController],
  providers: [CreateTaskUseCase],
})
export class TaskModule {}
