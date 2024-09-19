import { ProductRepository } from '@/product/infrastructure/database/repository/product.repository'
import { PaginationOutput } from '@/shared/application/dtos/pagination-output.dto'
import { SearchInput } from '@/shared/application/dtos/search-input.dto'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { SearchParams } from '@/shared/database/repositories/searchable.repository-contracts'
import { Injectable } from '@nestjs/common'

export namespace SearchProductService {
  export type Input = SearchInput
  export type Output = PaginationOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Output> {
      const params = new SearchParams(input)
      const searchResult = await this.productRepository.search(params)
      return searchResult
    }
  }
}
