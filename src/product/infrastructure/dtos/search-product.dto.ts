import { SearchProductService } from '@/product/application/usecases/search-product/search-product.service'
import { SortDirection } from '@/shared/database/repositories/searchable.repository-contracts'
import { IsOptional } from 'class-validator'

export class SearchProductsDto implements SearchProductService.Input {
  @IsOptional()
  page?: number

  @IsOptional()
  perPage?: number

  @IsOptional()
  sort?: string

  @IsOptional()
  sortDir?: SortDirection

  @IsOptional()
  filter?: string

  @IsOptional()
  filterField?: string
}
