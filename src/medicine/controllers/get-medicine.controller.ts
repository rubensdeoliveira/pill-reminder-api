import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import {
  ParamBodySchema,
  paramValidator,
} from '@/_shared/validators/param.validation'
import { Roles } from '@/auth/decorators/roles.decorator'
import { AccountRole } from '@/auth/gateways/jwt.gateway'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { GetMedicineUseCase } from '@/medicine/use-cases/get-medicine.use-case'

@Controller(routes.medicine)
@UseGuards(JwtGuard)
@Roles(AccountRole.ADMIN)
export class GetMedicineController {
  constructor(private getMedicineUseCase: GetMedicineUseCase) {}

  @Get(':id')
  @HttpCode(200)
  async handle(@Param(paramValidator) param: ParamBodySchema) {
    const medicine = await this.getMedicineUseCase.execute(param)
    return medicine
  }
}
