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
import { AccountTokenRepository } from '@/_shared/repositories/account-token.repository'
import { GenericRepository } from '@/_shared/repositories/generic.repository'
import { AccountTokenPrismaRepository } from '@/_shared/repositories/implementations/account-token-prisma.repository'
import { GenericPrismaRepository } from '@/_shared/repositories/implementations/generic-prisma.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CookiesGateway,
      useClass: CookiesNestGateway,
    },
    {
      provide: DateManipulatorGateway,
      useClass: DateManipulatorDateFnsGateway,
    },
    {
      provide: EncryptionGateway,
      useClass: EncryptionBcryptGateway,
    },
    {
      provide: EnvGateway,
      useClass: EnvNestGateway,
    },
    {
      provide: JwtGateway,
      useClass: JwtNestGateway,
    },
    {
      provide: AccountTokenRepository,
      useClass: AccountTokenPrismaRepository,
    },
    {
      provide: GenericRepository,
      useClass: GenericPrismaRepository,
    },
  ],
  exports: [
    PrismaService,
    CookiesGateway,
    DateManipulatorGateway,
    EncryptionGateway,
    EnvGateway,
    JwtGateway,
    AccountTokenRepository,
    GenericRepository,
  ],
})
export class SharedModule {}
