import { ProductRepository } from '@/product/infrastructure/database/repository/product.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'

export namespace DeleteProductService {
  export type Input = {
    productId: string
    adminId: string
  }
  export type Output = void

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.productRepository.delete(input.productId, input.adminId)
    }
  }
}
