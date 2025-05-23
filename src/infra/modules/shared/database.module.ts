import { Module } from '@nestjs/common'

import { AccountRepository } from '@/domain/account/repositories/account.repository'
import { AccountTokenRepository } from '@/domain/account/repositories/account-token.repository'
import { TaskRepository } from '@/domain/task/repositories/task.repository'
import { PrismaService } from '@/infra/database/prisma/config/prisma.service'
import { PrismaAccountRepository } from '@/infra/database/prisma/repositories/prisma-account.repository'
import { PrismaAccountTokenRepository } from '@/infra/database/prisma/repositories/prisma-account-token.repository'
import { PrismaTaskRepository } from '@/infra/database/prisma/repositories/prisma-task.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
    {
      provide: AccountTokenRepository,
      useClass: PrismaAccountTokenRepository,
    },
  ],
  exports: [
    PrismaService,
    AccountRepository,
    TaskRepository,
    AccountTokenRepository,
  ],
})
export class DatabaseModule {}
