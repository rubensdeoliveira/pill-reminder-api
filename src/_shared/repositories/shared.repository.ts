export type ListPaginatedInput = {
  page?: number
  itemsPerPage?: number
}

export type ListPaginatedOutput<T> = {
  items: T[]
  total: number
}

export abstract class SharedRepository {
  abstract listPaginated<T>(
    model: string,
    input: ListPaginatedInput,
    orderBy?: Record<string, 'asc' | 'desc'>,
    where?: Record<string, any>,
  ): Promise<ListPaginatedOutput<T>>
}
