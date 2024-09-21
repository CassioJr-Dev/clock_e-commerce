import { SearchProductService } from '@/product/application/usecases/search-product/search-product.service'
import { SortDirection } from '@/shared/database/repositories/searchable.repository-contracts'

export class ListProductsDto implements SearchProductService.Input {
  page?: number

  perPage?: number

  sort?: string

  sortDir?: SortDirection

  filter?: string

  filterField?: string
}
