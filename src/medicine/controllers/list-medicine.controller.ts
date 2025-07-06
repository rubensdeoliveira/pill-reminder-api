import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import {
  PaginationBodySchema,
  paginationValidator,
} from '@/_shared/validators/pagination.validation'
import { Roles } from '@/auth/decorators/roles.decorator'
import { AccountRole } from '@/auth/gateways/jwt.gateway'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { ListMedicineUseCase } from '@/medicine/use-cases/list-medicine.use-case'

@Controller(routes.medicine)
@UseGuards(JwtGuard)
@Roles(AccountRole.ADMIN)
export class ListMedicineController {
  constructor(private listMedicineUseCase: ListMedicineUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Query(paginationValidator) query: PaginationBodySchema) {
    const medicine = await this.listMedicineUseCase.execute(query)
    return medicine
  }
}
