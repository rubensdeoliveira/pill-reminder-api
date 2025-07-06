import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'

import { ROUTES } from '@/_shared/constants/routes'
import { AccountRole } from '@/_shared/gateways/jwt.gateway'
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
  SaveMedicineBodySchema,
  saveMedicineValidator,
} from '@/medicine/validators/save-medicine.validator'

@Controller()
@UseGuards(JwtGuard)
@Roles(AccountRole.DENTIST, AccountRole.ADMIN)
export class UpdateMedicineController {
  constructor(private updateMedicineUseCase: UpdateMedicineUseCase) {}

  @Put(ROUTES.MEDICINE.UPDATE)
  @HttpCode(200)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
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
