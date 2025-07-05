export type PaginationInput = {
  page?: number
  itemsPerPage?: number
}

export type PaginationOutput<T> = {
  items: T[]
  total: number
}
