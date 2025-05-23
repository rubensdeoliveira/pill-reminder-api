export type DefaultRepositoryFieldsToDelete = 'createdAt' | 'id'

export abstract class DefaultRepository<T> {
  abstract create(entity: Omit<T, DefaultRepositoryFieldsToDelete>): Promise<T>
  abstract list(): Promise<T[]>
  abstract findById(id: string): Promise<T | null>
  abstract update(
    id: string,
    entity: Omit<T, DefaultRepositoryFieldsToDelete>,
  ): Promise<T>

  abstract delete(id: string): Promise<void>
}
