import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import {
  CreatePatientAccountBodySchema,
  createPatientAccountValidator,
} from '@/application/account/validators/create-patient-account.validator'
import { Routes } from '@/application/shared/constants/routes'
import { CreatePatientAccountUseCase } from '@/domain/account/use-cases/create-patient-account.use-case'

@Controller()
export class CreatePatientAccountController {
  constructor(
    private createPatientAccountUseCase: CreatePatientAccountUseCase,
  ) {}

  @Post(Routes.ACCOUNT.PATIENT.CREATE)
  @HttpCode(201)
  async handle(
    @Body(createPatientAccountValidator) data: CreatePatientAccountBodySchema,
  ) {
    const account = await this.createPatientAccountUseCase.execute(data)
    return account
  }
}
