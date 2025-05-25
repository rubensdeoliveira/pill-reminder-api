import { Controller, Get, UseGuards } from '@nestjs/common'

import {
  CurrentAccount,
  CurrentAccountType,
} from '@/application/shared/decorators/current-account.decorator'
import { JwtGuard } from '@/application/shared/guards/jwt.guard'
import { ShowPatientAccountUseCase } from '@/domain/account/use-cases/show-patient-account.use-case'
import { Routes } from '@/application/shared/constants/routes'

@Controller()
@UseGuards(JwtGuard)
export class ShowPatientAccountController {
  constructor(
    private readonly showPatientAccountUseCase: ShowPatientAccountUseCase,
  ) {}

  @Get(Routes.ACCOUNT.PATIENT.GET)
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const getAccount = await this.showPatientAccountUseCase.execute({
      accountId,
    })
    return getAccount
  }
}
