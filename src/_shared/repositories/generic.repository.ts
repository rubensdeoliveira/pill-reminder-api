import { ListPaginatedInput, ListPaginatedOutput } from './types/list-options'

export abstract class GenericRepository {
  abstract listPaginated<T>({
    model,
    pagination,
    orderBy,
    where,
    select,
  }: ListPaginatedInput<T>): Promise<ListPaginatedOutput<T>>
}
