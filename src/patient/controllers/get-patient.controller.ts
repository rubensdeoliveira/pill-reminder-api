import { Controller, Get, UseGuards } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { GetPatientUseCase } from '@/patient/use-cases/get-patient.use-case'

@Controller(routes.patient)
@UseGuards(JwtGuard)
export class GetPatientController {
  constructor(private readonly getPatientUseCase: GetPatientUseCase) {}

  @Get('/me')
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const patient = await this.getPatientUseCase.execute({
      accountId,
    })
    return patient
  }
}
