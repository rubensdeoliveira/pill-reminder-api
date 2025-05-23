import { Module } from '@nestjs/common'

import { CookiesGateway } from '@/domain/account/gateways/cookies.gateway'
import { DateManipulatorGateway } from '@/domain/account/gateways/date-manipulator.gateway'
import { EncryptionGateway } from '@/domain/account/gateways/encryption.gateway'
import { EnvGateway } from '@/domain/account/gateways/env.gateway'
import { JwtGateway } from '@/domain/account/gateways/jwt.gateway'
import { BcryptEncryptionGateway } from '@/infra/gateways/bcrypt-encryption.gateway'
import { DateFnsDateManipulatorGateway } from '@/infra/gateways/date-fns-date-manipulator.gateway'
import { NestCookiesGateway } from '@/infra/gateways/nest-cookies.gateway'
import { NestEnvGateway } from '@/infra/gateways/nest-env.gateway'
import { NestJwtGateway } from '@/infra/gateways/nest-jwt.gateway'
import { DatabaseModule } from '@/infra/modules/shared/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: EncryptionGateway,
      useClass: BcryptEncryptionGateway,
    },
    {
      provide: JwtGateway,
      useClass: NestJwtGateway,
    },
    {
      provide: DateManipulatorGateway,
      useClass: DateFnsDateManipulatorGateway,
    },
    {
      provide: EnvGateway,
      useClass: NestEnvGateway,
    },
    {
      provide: CookiesGateway,
      useClass: NestCookiesGateway,
    },
  ],
  exports: [
    EncryptionGateway,
    JwtGateway,
    EnvGateway,
    CookiesGateway,
    DateManipulatorGateway,
  ],
})
export class GatewayModule {}
