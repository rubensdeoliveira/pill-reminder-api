import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/infra/app.module'
import { EnvGateway } from '@/infra/gateways/nest-env.gateway'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const configService = app.get(EnvGateway)
  console.log(configService.get('API_PORT'))
  const port = configService.get('API_PORT')

  await app.listen(port)
}
bootstrap()
