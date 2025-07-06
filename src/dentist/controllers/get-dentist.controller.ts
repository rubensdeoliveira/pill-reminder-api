import { Controller, Get, UseGuards } from '@nestjs/common'

import { ROUTES } from '@/_shared/constants/routes'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { GetDentistUseCase } from '@/dentist/use-cases/get-dentist.use-case'

@Controller()
@UseGuards(JwtGuard)
export class GetDentistController {
  constructor(private readonly getDentistUseCase: GetDentistUseCase) {}

  @Get(ROUTES.DENTIST.ME)
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const getAccount = await this.getDentistUseCase.execute({
      accountId,
    })
    return getAccount
  }
}
