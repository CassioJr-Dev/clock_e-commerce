import { ProductRepository } from '@/product/infrastructure/database/repository/product.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { DateProviderService } from '@/shared/providers/date-provider/date-provider.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { ProductInput } from '../../dtos/product-input.dto'
import { ProductOutput } from '../../dtos/product-output.dto'

export namespace CreateProductService {
  export type Input = ProductInput
  export type Output = ProductOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(input: Input): Promise<Output> {
      const {
        name,
        description,
        price,
        oldPrice,
        stock,
        image,
        category,
        adminId,
      } = input
      if (!name || !price || !stock || !image || !category || !adminId) {
        throw new BadRequestException('Dados de entrada não fornecidos')
      }

      const productId = randomUUID()

      const created_at = DateProviderService.toDate()

      const entity = {
        productId,
        name,
        description,
        price,
        oldPrice,
        stock,
        image,
        category,
        adminId,
        created_at,
      }

      return await this.productRepository.insert(entity)
    }
  }
}
