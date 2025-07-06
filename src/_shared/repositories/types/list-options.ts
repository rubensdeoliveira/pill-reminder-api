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

export type ListPaginatedInput<T> = {
  model: string
  pagination: ListPaginatedInputPagination
  orderBy?: Record<string, 'asc' | 'desc'>
  where?: Record<string, any>
} & OptionalSelectFields<T>

export type ListPaginatedOutput<T> = {
  items: T[]
  total: number
}
