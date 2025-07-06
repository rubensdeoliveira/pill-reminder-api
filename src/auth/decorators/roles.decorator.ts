import { SetMetadata } from '@nestjs/common'

import { AccountRoleType } from '@/_shared/gateways/jwt.gateway'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: AccountRoleType[]) =>
  SetMetadata(ROLES_KEY, roles)
