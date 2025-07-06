import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import { CreateDentistSessionUseCase } from '@/auth/use-cases/create-dentist-session.use-case'
import {
  CreateDentistSessionBodySchema,
  createDentistSessionValidator,
} from '@/auth/validators/create-dentist-session.validator'

@Controller(routes.auth)
export class CreateDentistSessionController {
  constructor(
    private createDentistSessionUseCase: CreateDentistSessionUseCase,
  ) {}

  @Post('/dentist')
  @HttpCode(200)
  async handle(
    @Body(createDentistSessionValidator) data: CreateDentistSessionBodySchema,
  ) {
    const session = await this.createDentistSessionUseCase.execute(data)
    return session
  }
}
