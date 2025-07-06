import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { ROUTES } from '@/_shared/constants/routes'
import { CreateDentistUseCase } from '@/dentist/use-cases/create-dentist.use-case'
import {
  CreateDentistBodySchema,
  createDentistValidator,
} from '@/dentist/validators/create-dentist.validator'

@Controller()
export class CreateDentistController {
  constructor(private createDentistUseCase: CreateDentistUseCase) {}

  @Post(ROUTES.DENTIST.CREATE)
  @HttpCode(201)
  async handle(@Body(createDentistValidator) data: CreateDentistBodySchema) {
    const dentist = await this.createDentistUseCase.execute(data)
    return dentist
  }
}
