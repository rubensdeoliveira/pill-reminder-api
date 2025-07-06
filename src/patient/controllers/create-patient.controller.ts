import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import { CreatePatientUseCase } from '@/patient/use-cases/create-patient.use-case'
import {
  CreatePatientBodySchema,
  createPatientValidator,
} from '@/patient/validators/create-patient.validator'

@Controller(routes.patient)
export class CreatePatientController {
  constructor(private createPatientUseCase: CreatePatientUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(createPatientValidator) data: CreatePatientBodySchema) {
    const patient = await this.createPatientUseCase.execute(data)
    return patient
  }
}
