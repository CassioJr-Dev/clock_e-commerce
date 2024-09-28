import { ProductRepository } from '@/product/infrastructure/database/repository/product.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { ProductInput } from '../../dtos/product-input.dto'
import { ProductOutput } from '../../dtos/product-output.dto'

export namespace UpdateProductService {
  export type Input = Partial<ProductInput> & { productId: string }
  export type Output = ProductOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Output> {
      const {
        productId,
        name,
        description,
        price,
        oldPrice,
        stock,
        image,
        category,
        adminId,
      } = input

      const product = await this.productRepository.findById(productId, adminId)

      if (name) product.name = name
      if (description) product.description = description
      if (price) product.price = price
      if (oldPrice) product.oldPrice = oldPrice
      if (stock) product.stock = stock
      if (image) product.image = image
      if (category) product.category = category

      return await this.productRepository.update({ ...product })
    }
  }
}
