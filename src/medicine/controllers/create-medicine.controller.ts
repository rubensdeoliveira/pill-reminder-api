import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'

import { Routes } from '@/_shared/constants/routes'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { CreateMedicineUseCase } from '@/medicine/use-cases/create-medicine.use-case'
import {
  CreateMedicineBodySchema,
  createMedicineValidator,
} from '@/medicine/validators/create-medicine.validator'

@Controller()
@UseGuards(JwtGuard)
@Roles(Role.DENTIST, Role.ADMIN)
export class CreateMedicineController {
  constructor(private createMedicineUseCase: CreateMedicineUseCase) {}

  @Post(Routes.MEDICINE.CREATE)
  @HttpCode(201)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Body(createMedicineValidator) data: CreateMedicineBodySchema,
  ) {
    const medicine = await this.createMedicineUseCase.execute(data)
    return medicine
  }
}
