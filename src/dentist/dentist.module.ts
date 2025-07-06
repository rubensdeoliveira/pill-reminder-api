import { Module } from '@nestjs/common'

import { SharedModule } from '@/_shared/shared.module'
import { CreateDentistController } from '@/dentist/controllers/create-dentist.controller'
import { GetDentistController } from '@/dentist/controllers/get-dentist.controller'
import { DentistRepository } from '@/dentist/repositories/dentist.repository'
import { DentistPrismaRepository } from '@/dentist/repositories/implementations/dentist-prisma.repository'
import { CreateDentistUseCase } from '@/dentist/use-cases/create-dentist.use-case'
import { GetDentistUseCase } from '@/dentist/use-cases/get-dentist.use-case'

@Module({
  imports: [SharedModule],
  controllers: [CreateDentistController, GetDentistController],
  providers: [
    CreateDentistUseCase,
    GetDentistUseCase,
    {
      provide: DentistRepository,
      useClass: DentistPrismaRepository,
    },
  ],
  exports: [DentistRepository],
})
export class DentistModule {}
