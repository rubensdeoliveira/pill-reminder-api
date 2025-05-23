import { NestFactory } from '@nestjs/core'

import { EnvGateway } from '@/domain/account/gateways/env.gateway'
import { AppModule } from '@/infra/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const configService = app.get(EnvGateway)
  const port = configService.get('API_PORT')

  await app.listen(port)
}
bootstrap()
