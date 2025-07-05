import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { Routes } from '@/_shared/constants/routes'
import { RefreshSessionUseCase } from '@/auth/use-cases/refresh-session.use-case'
import {
  RefreshSessionBodySchema,
  refreshSessionValidator,
} from '@/auth/validators/refresh-session.validator'

@Controller()
export class RefreshSessionController {
  constructor(private readonly refreshSessionUseCase: RefreshSessionUseCase) {}

  @Post(Routes.AUTH.REFRESH_SESSION)
  @HttpCode(200)
  async handle(@Body(refreshSessionValidator) data: RefreshSessionBodySchema) {
    const session = await this.refreshSessionUseCase.execute(data)
    return session
  }
}
