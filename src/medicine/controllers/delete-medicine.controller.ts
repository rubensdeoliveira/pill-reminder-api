import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'

import { routes } from '@/_shared/constants/routes'
import {
  ParamBodySchema,
  paramValidator,
} from '@/_shared/validators/param.validation'
import { Roles } from '@/auth/decorators/roles.decorator'
import { AccountRole } from '@/auth/gateways/jwt.gateway'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { DeleteMedicineUseCase } from '@/medicine/use-cases/delete-medicine.use-case'

@Controller(routes.medicine)
@UseGuards(JwtGuard)
@Roles(AccountRole.ADMIN)
export class DeleteMedicineController {
  constructor(private deleteMedicineUseCase: DeleteMedicineUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  async handle(@Param(paramValidator) param: ParamBodySchema) {
    await this.deleteMedicineUseCase.execute(param)
  }
}
