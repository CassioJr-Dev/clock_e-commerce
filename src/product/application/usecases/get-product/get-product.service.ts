import { ProductRepository } from '@/product/infrastructure/database/repository/product.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { ProductOutput } from '../../dtos/product-output.dto'

export namespace GetProductService {
  export type Input = {
    productId: string
  }
  export type Output = ProductOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Output> {
      return this.productRepository.findById(input.productId)
    }
  }
}
