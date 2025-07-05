import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'

import { Routes } from '@/_shared/constants/routes'
import {
  ParamBodySchema,
  paramValidator,
} from '@/_shared/validators/param.validation'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { GetMedicineUseCase } from '@/medicine/use-cases/get-medicine.use-case'

@Controller()
@UseGuards(JwtGuard)
@Roles(Role.DENTIST, Role.ADMIN)
export class GetMedicineController {
  constructor(private getMedicineUseCase: GetMedicineUseCase) {}

  @Get(Routes.MEDICINE.GET)
  @HttpCode(200)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Param(paramValidator) param: ParamBodySchema,
  ) {
    const medicine = await this.getMedicineUseCase.execute(param)
    return medicine
  }
}
