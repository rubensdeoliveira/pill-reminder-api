import { Controller, Get, UseGuards } from '@nestjs/common'

import { Routes } from '@/_shared/constants/routes'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { GetPatientUseCase } from '@/patient/use-cases/get-patient.use-case'

@Controller()
@UseGuards(JwtGuard)
export class GetPatientController {
  constructor(private readonly getPatientUseCase: GetPatientUseCase) {}

  @Get(Routes.PATIENT.ME)
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const getAccount = await this.getPatientUseCase.execute({
      accountId,
    })
    return getAccount
  }
}
