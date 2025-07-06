import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common'

import { Routes } from '@/_shared/constants/routes'
import { AccountRole } from '@/_shared/gateways/jwt.gateway'
import {
  PaginationBodySchema,
  paginationValidator,
} from '@/_shared/validators/pagination.validation'
import {
  CurrentAccount,
  CurrentAccountType,
} from '@/auth/decorators/current-account.decorator'
import { Roles } from '@/auth/decorators/roles.decorator'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { ListMedicineUseCase } from '@/medicine/use-cases/list-medicine.use-case'

@Controller()
@UseGuards(JwtGuard)
@Roles(AccountRole.DENTIST, AccountRole.ADMIN)
export class ListMedicineController {
  constructor(private listMedicineUseCase: ListMedicineUseCase) {}

  @Get(Routes.MEDICINE.LIST)
  @HttpCode(200)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Query(paginationValidator) pagination: PaginationBodySchema,
  ) {
    const medicine = await this.listMedicineUseCase.execute(pagination)
    return medicine
  }
}
