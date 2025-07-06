export abstract class GenericRepository {
  abstract listPaginated<T>({
    model,
    pagination,
    orderBy,
    where,
    select,
  }: ListPaginatedInput<T>): Promise<ListPaginatedOutput<T>>
}

export type ListPaginatedInput<T> = OptionalSelectFields<T> & {
  model: string
  pagination: ListPaginatedInputPagination
  orderBy?: OrderByFields<T>
  where?: WhereFields<T>
}

export type ListPaginatedOutput<T> = {
  items: T[]
  total: number
}

// Auxiliary types

export type SelectFields<T> = {
  [K in keyof T]: boolean
}

export type OptionalSelectFields<T> = {
  select?: SelectFields<T>
}

export type ListPaginatedInputPagination = {
  page?: number
  itemsPerPage?: number
}

export type OrderByFields<T> = {
  [K in keyof T]?: 'asc' | 'desc'
}

export type WhereFields<T> = {
  [K in keyof T]?: T[K] | null
}
