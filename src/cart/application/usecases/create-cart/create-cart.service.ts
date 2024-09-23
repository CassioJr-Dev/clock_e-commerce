import { CartRepository } from '@/cart/infrastructure/database/repository/cart.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { DateProviderService } from '@/shared/providers/date-provider/date-provider.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { CartInput } from '../../dtos/cart-input'
import { CartOutput } from '../../dtos/cart-output'

export namespace CreateCartService {
  export type Input = CartInput

  export type Output = CartOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartRepository: CartRepository) {}

    async execute(input: Input): Promise<Output> {
      const { userId } = input

      if (!userId) {
        throw new BadRequestException('Dados de entrada não fornecidos')
      }

      const cartId = randomUUID()

      const created_at = DateProviderService.toDate()

      const entity = {
        cartId,
        userId,
        created_at,
      }

      return await this.cartRepository.createCart(entity)
    }
  }
}
