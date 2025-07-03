import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import {
  CreatePatientSessionBodySchema,
  createPatientSessionValidator,
} from '@/application/account/validators/create-patient-session.validator'
import { Routes } from '@/application/shared/constants/routes'
import { CreatePatientSessionUseCase } from '@/domain/account/use-cases/create-patient-session.use-case'

@Controller()
export class CreatePatientSessionController {
  constructor(
    private createPatientSessionUseCase: CreatePatientSessionUseCase,
  ) {}

  @Post(Routes.SESSION.PATIENT.CREATE)
  @HttpCode(200)
  async handle(
    @Body(createPatientSessionValidator) data: CreatePatientSessionBodySchema,
  ) {
    const session = await this.createPatientSessionUseCase.execute(data)
    return session
  }
}
