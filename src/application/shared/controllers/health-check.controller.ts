import { Controller, Get, HttpCode } from '@nestjs/common'

@Controller('/')
export class HealthCheckController {
  constructor() {}

  @Get()
  @HttpCode(200)
  async handle() {
    return { message: 'API is running' }
  }
}
