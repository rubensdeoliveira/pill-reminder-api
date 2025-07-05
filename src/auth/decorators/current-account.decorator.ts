import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type CurrentAccountType = {
  accountId: string
}

export const CurrentAccount = createParamDecorator(
  (_, context: ExecutionContext): CurrentAccountType => {
    const request = context.switchToHttp().getRequest()
    const { sub } = request.user
    return JSON.parse(sub)
  },
)
