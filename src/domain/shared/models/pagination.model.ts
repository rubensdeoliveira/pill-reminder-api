export type PaginationInput = {
  page?: number
  limit?: number
}

export type PaginationOutput<T> = {
  items: T[]
  total: number
}
