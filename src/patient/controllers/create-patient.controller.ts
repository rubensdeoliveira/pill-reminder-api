import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { Routes } from '@/_shared/constants/routes'
import { CreatePatientUseCase } from '@/patient/use-cases/create-patient.use-case'
import {
  CreatePatientBodySchema,
  createPatientValidator,
} from '@/patient/validators/create-patient.validator'

@Controller()
export class CreatePatientController {
  constructor(private createPatientUseCase: CreatePatientUseCase) {}

  @Post(Routes.PATIENT.CREATE)
  @HttpCode(201)
  async handle(@Body(createPatientValidator) data: CreatePatientBodySchema) {
    const account = await this.createPatientUseCase.execute(data)
    return account
  }
}
