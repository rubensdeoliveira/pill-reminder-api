import { DefaultRepository } from '@/domain/shared/repositories/default.repository'
import { TaskEntity } from '@/domain/task/repositories/entities/task.entity'

export abstract class TaskRepository extends DefaultRepository<TaskEntity> {}
