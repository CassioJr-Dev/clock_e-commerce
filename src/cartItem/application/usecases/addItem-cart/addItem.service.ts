import { CartItemRepository } from '@/cartItem/infrastructure/database/repository/cartItem.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { DateProviderService } from '@/shared/providers/date-provider/date-provider.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CartItemInput } from '../../dtos/cartItem-input.dto'
import { CartItemOutput } from '../../dtos/cartItem-output.dto'

export namespace AddItemService {
  export type Input = CartItemInput & { userId: string }
  export type Output = CartItemOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartItemRepository: CartItemRepository) {}

    async execute(input: Input): Promise<Output> {
      const { cartId, productId, quantity = 1, userId } = input

      if (!cartId || !productId || !userId) {
        throw new BadRequestException('Dados de entrada não fornecidos')
      }

      const itemId = randomUUID()

      const created_at = DateProviderService.toDate()

      const entity = {
        itemId,
        cartId,
        productId,
        quantity,
        created_at,
      }

      return await this.cartItemRepository.addItemToCart(entity, userId)
    }
  }
}
