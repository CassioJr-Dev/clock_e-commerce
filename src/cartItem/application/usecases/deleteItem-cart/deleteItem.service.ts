import { CartItemRepository } from '@/cartItem/infrastructure/database/repository/cartItem.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'

export namespace DeleteItemService {
  export type Input = {
    itemId: string
    cartId: string
    userId: string
  }
  export type Output = void

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartItemRepository: CartItemRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.cartItemRepository.removeItemFromCart(
        input.itemId,
        input.cartId,
        input.userId,
      )
    }
  }
}
