import { NestFactory } from '@nestjs/core'

import { EnvGateway } from '@/_shared/gateways/env.gateway'
import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const configService = app.get(EnvGateway)
  const port = configService.get('BACKEND_PORT')

  await app.listen(port)
}
bootstrap()
