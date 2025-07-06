import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import {
  ParamBodySchema,
  paramValidator,
} from '@/_shared/validators/param.validation'
import { Roles } from '@/auth/decorators/roles.decorator'
import { AccountRole } from '@/auth/gateways/jwt.gateway'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { UpdateMedicineUseCase } from '@/medicine/use-cases/update-medicine.use-case'
import {
  SaveMedicineBodySchema,
  saveMedicineValidator,
} from '@/medicine/validators/save-medicine.validator'

@Controller(routes.medicine)
@UseGuards(JwtGuard)
@Roles(AccountRole.ADMIN)
export class UpdateMedicineController {
  constructor(private updateMedicineUseCase: UpdateMedicineUseCase) {}

  @Put(':id')
  @HttpCode(200)
  async handle(
    @Param(paramValidator) param: ParamBodySchema,
    @Body(saveMedicineValidator) data: SaveMedicineBodySchema,
  ) {
    const medicine = await this.updateMedicineUseCase.execute({
      ...param,
      ...data,
    })
    return medicine
  }
}
