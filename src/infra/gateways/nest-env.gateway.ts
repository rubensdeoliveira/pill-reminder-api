import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvGateway, EnvModel } from '@/domain/account/gateways/env.gateway'

@Injectable()
export class NestEnvGateway implements EnvGateway {
  constructor(private configService: ConfigService<EnvModel, true>) {}

  get<T extends keyof EnvModel>(key: T): EnvModel[T] {
    return this.configService.get(key, { infer: true })
  }
}
