import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
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
import { DeleteMedicineUseCase } from '@/medicine/use-cases/delete-medicine.use-case'

@Controller()
@UseGuards(JwtGuard)
@Roles(Role.DENTIST, Role.ADMIN)
export class DeleteMedicineController {
  constructor(private deleteMedicineUseCase: DeleteMedicineUseCase) {}

  @Delete(Routes.MEDICINE.DELETE)
  @HttpCode(201)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Param(paramValidator) param: ParamBodySchema,
  ) {
    await this.deleteMedicineUseCase.execute(param)
  }
}
