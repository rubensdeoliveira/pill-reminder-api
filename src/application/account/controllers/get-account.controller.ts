import { Controller, Get, UseGuards } from '@nestjs/common'

import {
  CurrentAccount,
  CurrentAccountType,
} from '@/application/shared/decorators/current-account.decorator'
import { JwtGuard } from '@/application/shared/guards/jwt.guard'
import { GetAccountUseCase } from '@/domain/account/use-cases/get-account.use-case'

@Controller('/account')
@UseGuards(JwtGuard)
export class GetAccountController {
  constructor(private readonly getAccountUseCase: GetAccountUseCase) {}

  @Get('/me')
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const getAccount = await this.getAccountUseCase.execute({
      accountId,
    })
    return getAccount
  }
}
