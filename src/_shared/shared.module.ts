import { Module } from '@nestjs/common'

import { PrismaService } from '@/_shared/database/prisma/config/prisma.service'
import { CookiesGateway } from '@/_shared/gateways/cookies.gateway'
import { DateManipulatorGateway } from '@/_shared/gateways/date-manipulator.gateway'
import { EncryptionGateway } from '@/_shared/gateways/encryption.gateway'
import { EnvGateway } from '@/_shared/gateways/env.gateway'
import { CookiesNestGateway } from '@/_shared/gateways/implementations/cookies-nest.gateway'
import { DateManipulatorDateFnsGateway } from '@/_shared/gateways/implementations/date-manipulator-date-fns.gateway'
import { EncryptionBcryptGateway } from '@/_shared/gateways/implementations/encryption-bcrypt.gateway'
import { EnvNestGateway } from '@/_shared/gateways/implementations/env-nest.gateway'
import { JwtNestGateway } from '@/_shared/gateways/implementations/jwt-nest.gateway'
import { JwtGateway } from '@/_shared/gateways/jwt.gateway'

@Module({
  providers: [
    {
      provide: CookiesGateway,
      useClass: CookiesNestGateway,
    },
    {
      provide: EncryptionGateway,
      useClass: EncryptionBcryptGateway,
    },
    {
      provide: JwtGateway,
      useClass: JwtNestGateway,
    },
    {
      provide: DateManipulatorGateway,
      useClass: DateManipulatorDateFnsGateway,
    },
    {
      provide: EnvGateway,
      useClass: EnvNestGateway,
    },
    PrismaService,
  ],
  exports: [
    CookiesGateway,
    EncryptionGateway,
    JwtGateway,
    DateManipulatorGateway,
    EnvGateway,
    PrismaService,
  ],
})
export class SharedModule {}
