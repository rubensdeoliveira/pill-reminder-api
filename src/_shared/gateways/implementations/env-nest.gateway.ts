import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppConfigModel, EnvGateway } from '@/_shared/gateways/env.gateway'

@Injectable()
export class EnvNestGateway implements EnvGateway {
  constructor(private configService: ConfigService<AppConfigModel, true>) {}

  get<T extends keyof AppConfigModel>(key: T): AppConfigModel[T] {
    return this.configService.get(key, { infer: true })
  }
}
