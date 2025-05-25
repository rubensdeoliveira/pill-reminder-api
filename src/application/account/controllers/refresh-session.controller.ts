import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import {
  RefreshSessionBodySchema,
  refreshSessionValidator,
} from '@/application/account/validators/refresh-session.validator'
import { RefreshSessionUseCase } from '@/domain/account/use-cases/refresh-session.use-case'
import { Routes } from '@/application/shared/constants/routes'

@Controller()
export class RefreshSessionController {
  constructor(private readonly refreshSessionUseCase: RefreshSessionUseCase) {}

  @Post(Routes.SESSION.REFRESH)
  @HttpCode(200)
  async handle(@Body(refreshSessionValidator) data: RefreshSessionBodySchema) {
    const session = await this.refreshSessionUseCase.execute(data)
    return session
  }
}
