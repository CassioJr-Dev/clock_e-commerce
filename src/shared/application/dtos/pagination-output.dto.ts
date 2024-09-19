export type PaginationOutput<Item = any, Filter = string> = {
  items: Item[]
  total: number
  currentPage: number
  lastPage: number
  perPage: number
  filter: Filter | null
  filterField: string | null
}
