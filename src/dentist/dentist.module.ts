import { Module } from '@nestjs/common'

import { SharedModule } from '@/_shared/shared.module'
import { AuthModule } from '@/auth/auth.module'
import { CreateDentistController } from '@/dentist/controllers/create-dentist.controller'
import { GetDentistController } from '@/dentist/controllers/get-dentist.controller'
import { CreateDentistUseCase } from '@/dentist/use-cases/create-dentist.use-case'
import { GetDentistUseCase } from '@/dentist/use-cases/get-dentist.use-case'

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [CreateDentistController, GetDentistController],
  providers: [CreateDentistUseCase, GetDentistUseCase],
})
export class DentistModule {}
