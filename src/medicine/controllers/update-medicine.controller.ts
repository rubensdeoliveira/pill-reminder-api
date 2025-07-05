import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
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
import { UpdateMedicineUseCase } from '@/medicine/use-cases/update-medicine.use-case'
import {
  UpdateMedicineBodySchema,
  updateMedicineValidator,
} from '@/medicine/validators/update-medicine.validator'

@Controller()
@UseGuards(JwtGuard)
@Roles(Role.DENTIST, Role.ADMIN)
export class UpdateMedicineController {
  constructor(private updateMedicineUseCase: UpdateMedicineUseCase) {}

  @Put(Routes.MEDICINE.UPDATE)
  @HttpCode(200)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Param(paramValidator) param: ParamBodySchema,
    @Body(updateMedicineValidator) data: UpdateMedicineBodySchema,
  ) {
    const medicine = await this.updateMedicineUseCase.execute({
      ...param,
      ...data,
    })
    return medicine
  }
}
