import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import { CreatePatientSessionUseCase } from '@/auth/use-cases/create-patient-session.use-case'
import {
  CreatePatientSessionBodySchema,
  createPatientSessionValidator,
} from '@/auth/validators/create-patient-session.validator'

@Controller(routes.auth)
export class CreatePatientSessionController {
  constructor(
    private createPatientSessionUseCase: CreatePatientSessionUseCase,
  ) {}

  @Post('/patient')
  @HttpCode(200)
  async handle(
    @Body(createPatientSessionValidator) data: CreatePatientSessionBodySchema,
  ) {
    const session = await this.createPatientSessionUseCase.execute(data)
    return session
  }
}
