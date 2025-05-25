import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import {
  CreateDentistAccountBodySchema,
  createDentistAccountValidator,
} from '@/application/account/validators/create-dentist-account.validator'
import { Routes } from '@/application/shared/constants/routes'
import { CreateDentistAccountUseCase } from '@/domain/account/use-cases/create-dentist-account.use-case'

@Controller()
export class CreateDentistAccountController {
  constructor(
    private createDentistAccountUseCase: CreateDentistAccountUseCase,
  ) {}

  @Post(Routes.ACCOUNT.DENTIST.CREATE)
  @HttpCode(201)
  async handle(
    @Body(createDentistAccountValidator) data: CreateDentistAccountBodySchema,
  ) {
    const dentistaccount = await this.createDentistAccountUseCase.execute(data)
    return dentistaccount
  }
}
