import { Controller, Get, UseGuards } from '@nestjs/common'

import {
  CurrentAccount,
  CurrentAccountType,
} from '@/application/shared/decorators/current-account.decorator'
import { JwtGuard } from '@/application/shared/guards/jwt.guard'
import { ShowDentistAccountUseCase } from '@/domain/account/use-cases/show-dentist-account.use-case'
import { Routes } from '@/application/shared/constants/routes'

@Controller()
@UseGuards(JwtGuard)
export class ShowDentistAccountController {
  constructor(
    private readonly showDentistAccountUseCase: ShowDentistAccountUseCase,
  ) {}

  @Get(Routes.ACCOUNT.DENTIST.GET)
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const getAccount = await this.showDentistAccountUseCase.execute({
      accountId,
    })
    return getAccount
  }
}
