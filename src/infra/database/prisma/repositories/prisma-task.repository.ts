import { Injectable } from '@nestjs/common'

import { TaskEntity } from '@/domain/task/repositories/entities/task.entity'
import { TaskRepository } from '@/domain/task/repositories/task.repository'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { PrismaDefaultRepository } from '@/infra/database/prisma/repositories/shared/prisma-default.repository'

@Injectable()
export class PrismaTaskRepository
  extends PrismaDefaultRepository<TaskEntity>
  implements TaskRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'task')
  }
}
