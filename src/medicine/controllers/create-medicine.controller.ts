import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import { Roles } from '@/auth/decorators/roles.decorator'
import { AccountRole } from '@/auth/gateways/jwt.gateway'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { CreateMedicineUseCase } from '@/medicine/use-cases/create-medicine.use-case'
import {
  SaveMedicineBodySchema,
  saveMedicineValidator,
} from '@/medicine/validators/save-medicine.validator'

@Controller(routes.medicine)
@UseGuards(JwtGuard)
@Roles(AccountRole.ADMIN)
export class CreateMedicineController {
  constructor(private createMedicineUseCase: CreateMedicineUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(saveMedicineValidator) data: SaveMedicineBodySchema) {
    const medicine = await this.createMedicineUseCase.execute(data)
    return medicine
  }
}
