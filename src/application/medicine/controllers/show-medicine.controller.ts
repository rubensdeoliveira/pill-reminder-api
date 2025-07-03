import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'

import {
  CreateMedicineBodySchema,
  createMedicineValidator,
} from '@/application/medicine/validators/create-medicine.validator'
import { Routes } from '@/application/shared/constants/routes'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/application/shared/decorators/current-account.decorator'
import { Roles } from '@/application/shared/decorators/roles.decorator'
import { JwtGuard } from '@/application/shared/guards/jwt.guard'
import { CreateMedicineUseCase } from '@/domain/medicine/use-cases/create-medicine.use-case'

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
    const medicine = await this.createMedicineUseCase.execute({
      ...data,
    })
    return medicine
  }
}
