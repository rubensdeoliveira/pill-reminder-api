import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/modules/shared/database.module'
import { EncryptionGateway } from '@/infra/gateways/bcrypt-encryption.gateway'
import { DateManipulatorGateway } from '@/infra/gateways/date-fns-date-manipulator.gateway'
import { CookiesGateway } from '@/infra/gateways/nest-cookies.gateway'
import { EnvGateway } from '@/infra/gateways/nest-env.gateway'
import { JwtGateway } from '@/infra/gateways/nest-jwt.gateway'

@Module({
  imports: [DatabaseModule],
  providers: [
    EncryptionGateway,
    JwtGateway,
    DateManipulatorGateway,
    EnvGateway,
    CookiesGateway,
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
