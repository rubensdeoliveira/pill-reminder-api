import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import {
  CreateDentistSessionBodySchema,
  createDentistSessionValidator,
} from '@/application/account/validators/create-dentist-session.validator'
import { Routes } from '@/application/shared/constants/routes'
import { CreateDentistSessionUseCase } from '@/domain/account/use-cases/create-dentist-session.use-case'

@Controller()
export class CreateDentistSessionController {
  constructor(
    private createDentistSessionUseCase: CreateDentistSessionUseCase,
  ) {}

  @Post(Routes.SESSION.DENTIST.CREATE)
  @HttpCode(200)
  async handle(
    @Body(createDentistSessionValidator) data: CreateDentistSessionBodySchema,
  ) {
    const session = await this.createDentistSessionUseCase.execute(data)
    return session
  }
}
