import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

import { ROLES_KEY } from '@/application/shared/decorators/roles.decorator'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )
    if (isPublic) return true

    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    const can = (await super.canActivate(context)) as boolean
    if (!can) return false

    const request = context.switchToHttp().getRequest()
    const { sub } = request.user
    const accountInfo = JSON.parse(sub)

    console.log(roles, accountInfo.role)

    if (!roles || roles.length === 0) return true

    const hasRole = roles.includes(accountInfo.role)
    if (!hasRole) {
      throw new ForbiddenException('Acesso negado: role insuficiente')
    }

    return true
  }
}
