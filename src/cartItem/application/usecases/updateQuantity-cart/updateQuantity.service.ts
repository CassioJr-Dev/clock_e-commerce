import { CartItemRepository } from '@/cartItem/infrastructure/database/repository/cartItem.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { CartItemOutput } from '../../dtos/cartItem-output.dto'

export namespace UpdateItemService {
  export type Input = {
    itemId: string
    cartId: string
    userId: string
    quantity: number
  }
  export type Output = CartItemOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartItemRepository: CartItemRepository) {}

    async execute(input: Input): Promise<Output> {
      const userId = input.userId

      delete input.userId
      const item = await this.cartItemRepository.findItem(
        input.itemId,
        input.cartId,
      )

      if (input.quantity) item.quantity = input.quantity

      return await this.cartItemRepository.updateQuantity(item, userId)
    }
  }
}
