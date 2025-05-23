import { Injectable } from '@nestjs/common'

import { TaskRepository } from '@/domain/task/repositories/task.repository'

type CreateTaskUseCaseRequest = {
  title: string
  description: string
  accountId: string
}

type CreateTaskUseCaseResponse = {
  title: string
  description: string
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    accountId,
    ...data
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const { title, description } = await this.taskRepository.create({
      ...data,
      accountId,
    })

    return { title, description }
  }
}
