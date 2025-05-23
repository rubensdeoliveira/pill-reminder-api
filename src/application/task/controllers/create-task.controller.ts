import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'

import {
  CurrentAccount,
  CurrentAccountType,
} from '@/application/shared/decorators/current-account.decorator'
import { JwtGuard } from '@/application/shared/guards/jwt.guard'
import {
  CreateTaskBodySchema,
  createTaskValidator,
} from '@/application/task/validators/create-task.validator'
import { CreateTaskUseCase } from '@/domain/task/use-cases/create-task.use-case'

@Controller('/task')
@UseGuards(JwtGuard)
export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentAccount() account: CurrentAccountType,
    @Body(createTaskValidator) data: CreateTaskBodySchema,
  ) {
    const { accountId } = account
    const task = await this.createTaskUseCase.execute({
      ...data,
      accountId,
    })
    return task
  }
}
