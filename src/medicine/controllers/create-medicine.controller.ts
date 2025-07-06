import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'

import { ROUTES } from '@/_shared/constants/routes'
import { AccountRole } from '@/_shared/gateways/jwt.gateway'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { CreateMedicineUseCase } from '@/medicine/use-cases/create-medicine.use-case'
import {
  SaveMedicineBodySchema,
  saveMedicineValidator,
} from '@/medicine/validators/save-medicine.validator'

@Controller()
@UseGuards(JwtGuard)
@Roles(AccountRole.DENTIST, AccountRole.ADMIN)
export class CreateMedicineController {
  constructor(private createMedicineUseCase: CreateMedicineUseCase) {}

  @Post(ROUTES.MEDICINE.CREATE)
  @HttpCode(201)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Body(saveMedicineValidator) data: SaveMedicineBodySchema,
  ) {
    const medicine = await this.createMedicineUseCase.execute(data)
    return medicine
  }
}
