import { Controller, Get, UseGuards } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { GetDentistUseCase } from '@/dentist/use-cases/get-dentist.use-case'

@Controller(routes.dentist)
@UseGuards(JwtGuard)
export class GetDentistController {
  constructor(private readonly getDentistUseCase: GetDentistUseCase) {}

  @Get('/me')
  async handle(@CurrentAccount() account: CurrentAccountType) {
    const { accountId } = account
    const dentist = await this.getDentistUseCase.execute({
      accountId,
    })
    return dentist
  }
}
